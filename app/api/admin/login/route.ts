import { getRequestContext } from '@cloudflare/next-on-pages';
import { sendEmail } from '@/lib/resend';
import { getOTPEmailTemplate } from '@/lib/email-templates';

export const runtime = 'edge';

function getDB() {
  try {
    return (getRequestContext() as any)?.env?.DB || (process.env as any)?.DB;
  } catch {
    return (process.env as any)?.DB;
  }
}

export async function POST(request: Request) {
  try {
    const { email, password, otp } = await request.json();

    const DB = getDB();
    if (!DB) {
      return new Response(JSON.stringify({ success: false, message: "Veritabanı bağlantısı yok" }), { status: 500, headers: { 'content-type': 'application/json' } });
    }

    // Normalizasyon
    const normalizedEmail = email?.trim().toLowerCase();
    const adminEmail = (getRequestContext() as any)?.env?.ADMIN_EMAIL?.trim().toLowerCase() || (process.env as any)?.ADMIN_EMAIL?.trim().toLowerCase() || "";

    if (!normalizedEmail) {
      return new Response(JSON.stringify({ success: false, message: "E-posta adresi gerekli" }), { status: 400, headers: { 'content-type': 'application/json' } });
    }

    // 1. ADIM: E-posta ve Şifre Doğrulama (Eğer OTP henüz gönderilmemişse)
    if (!otp) {
      // Önce ADMIN_EMAIL ile eşleşiyor mu bak (Vercel/Cloudflare Env)
      // Şifre kontrolü için DB'den kullanıcıyı çek (username email olarak kullanılıyor varsayıyoruz)
      const { results } = await DB.prepare(
        "SELECT * FROM admin_users WHERE (username = ? OR username = ?) AND password = ?"
      ).bind(normalizedEmail, adminEmail, password).all();

      if (!results || results.length === 0) {
        return new Response(JSON.stringify({ success: false, message: "Hatalı e-posta veya şifre" }), { status: 401, headers: { 'content-type': 'application/json' } });
      }

      const user = results[0] as any;
      if (user.status === 'frozen') {
        return new Response(JSON.stringify({ success: false, message: "Bu yönetici hesabı dondurulmuştur!" }), { status: 403, headers: { 'content-type': 'application/json' } });
      }

      // OTP Oluştur
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      const expiresAt = Date.now() + 5 * 60 * 1000; // 5 dakika

      // OTP'yi DB'ye kaydet (Tablo yoksa oluştur)
      await DB.prepare("CREATE TABLE IF NOT EXISTS admin_otps (email TEXT PRIMARY KEY, code TEXT, expires_at INTEGER)").run();
      await DB.prepare("INSERT OR REPLACE INTO admin_otps (email, code, expires_at) VALUES (?, ?, ?)").bind(normalizedEmail, code, expiresAt).run();

      // E-posta gönder
      const { html, text } = getOTPEmailTemplate(code);
      await sendEmail({
        to: normalizedEmail,
        subject: `[AuraX] Giriş Doğrulama Kodu: ${code}`,
        html,
        text
      });

      return new Response(JSON.stringify({ success: true, step: 'otp_sent' }), {
        headers: { 'content-type': 'application/json' },
      });
    }

    // 2. ADIM: OTP Doğrulama
    const { results: otpResults } = await DB.prepare(
      "SELECT * FROM admin_otps WHERE email = ? AND code = ? AND expires_at > ?"
    ).bind(normalizedEmail, otp, Date.now()).all();

    if (!otpResults || otpResults.length === 0) {
      return new Response(JSON.stringify({ success: false, message: "Hatalı veya süresi dolmuş doğrulama kodu" }), { status: 401, headers: { 'content-type': 'application/json' } });
    }

    // Doğrulama başarılı, OTP'yi sil
    await DB.prepare("DELETE FROM admin_otps WHERE email = ?").bind(normalizedEmail).run();

    // Kullanıcı bilgilerini tekrar çek
    const { results: userResults } = await DB.prepare(
      "SELECT * FROM admin_users WHERE username = ? OR username = ?"
    ).bind(normalizedEmail, adminEmail).all();

    const user = userResults[0] as any;

    return new Response(JSON.stringify({ success: true, user: user.username, role: user.role }), {
      headers: { 'content-type': 'application/json' },
    });

  } catch (err: any) {
    return new Response(JSON.stringify({ success: false, error: err.message }), { status: 500, headers: { 'content-type': 'application/json' } });
  }
}
