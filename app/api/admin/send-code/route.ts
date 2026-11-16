import { getRequestContext } from '@cloudflare/next-on-pages';
import { sendEmail } from '@/lib/resend';
import { getOTPEmailTemplate } from '@/lib/email-templates';

export const runtime = 'edge';

function getEnv() {
  try {
    return (getRequestContext() as any)?.env || (process.env as any);
  } catch {
    return (process.env as any);
  }
}

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    const env = getEnv();
    const DB = env?.DB;

    if (!DB) {
      return new Response(JSON.stringify({ success: false, message: "Veritabanı bağlantısı yok" }), { status: 500, headers: { 'content-type': 'application/json' } });
    }

    const normalizedEmail = email?.trim().toLowerCase();
    const adminEmail = (env?.ADMIN_EMAIL || "").trim().toLowerCase();

    if (!normalizedEmail) {
      return new Response(JSON.stringify({ success: false, message: "E-posta adresi gerekli" }), { status: 400, headers: { 'content-type': 'application/json' } });
    }

    // Check if user exists in admin_users or matches ADMIN_EMAIL
    const { results } = await DB.prepare(
      "SELECT * FROM admin_users WHERE username = ? OR username = ?"
    ).bind(normalizedEmail, adminEmail).all();

    if ((!results || results.length === 0) && normalizedEmail !== adminEmail) {
      return new Response(JSON.stringify({ success: false, message: "Bu e-posta adresiyle kayıtlı yönetici bulunamadı" }), { status: 401, headers: { 'content-type': 'application/json' } });
    }

    const user = results?.[0] as any;
    if (user && user.status === 'frozen') {
      return new Response(JSON.stringify({ success: false, message: "Bu yönetici hesabı dondurulmuştur!" }), { status: 403, headers: { 'content-type': 'application/json' } });
    }

    // Generate 6 digit OTP
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 5 * 60 * 1000; // 5 mins

    // Save to admin_otps table
    await DB.prepare("CREATE TABLE IF NOT EXISTS admin_otps (email TEXT PRIMARY KEY, code TEXT, expires_at INTEGER)").run();
    await DB.prepare("INSERT OR REPLACE INTO admin_otps (email, code, expires_at) VALUES (?, ?, ?)").bind(normalizedEmail, code, expiresAt).run();

    // Send email via Resend
    const { html, text } = getOTPEmailTemplate(code);
    const emailResult = await sendEmail({
      to: normalizedEmail,
      subject: `[AuraX] Giriş Doğrulama Kodu: ${code}`,
      html,
      text
    });

    if (!emailResult.success) {
      return new Response(JSON.stringify({ success: false, message: "E-posta gönderilemedi", error: emailResult.error }), { status: 500, headers: { 'content-type': 'application/json' } });
    }

    return new Response(JSON.stringify({ success: true, message: "Doğrulama kodu gönderildi" }), {
      headers: { 'content-type': 'application/json' },
    });

  } catch (err: any) {
    return new Response(JSON.stringify({ success: false, error: err.message }), { status: 500, headers: { 'content-type': 'application/json' } });
  }
}
