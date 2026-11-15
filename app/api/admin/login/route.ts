import { getRequestContext } from '@cloudflare/next-on-pages';
import { sendEmail } from '@/lib/resend';

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
    const { username, password } = await request.json();

    const DB = getDB();
    if (!DB) {
      return new Response(JSON.stringify({ success: false, message: "Veritabanı bağlantısı yok" }), { status: 500, headers: { 'content-type': 'application/json' } });
    }

    const { results } = await DB.prepare(
      "SELECT * FROM admin_users WHERE username = ? AND password = ?"
    ).bind(username, password).all();

    if (results && results.length > 0) {
      const user = results[0] as any;
      if (user.status === 'frozen') {
        return new Response(JSON.stringify({ success: false, message: "Bu yönetici hesabı dondurulmuştur!" }), { status: 403, headers: { 'content-type': 'application/json' } });
      }

      // Send admin login notification email via Resend using verified auraxstudio.com.tr domain
      await sendEmail({
        to: 'iletisim@auraxstudio.com.tr',
        subject: `[Admin Girişi] ${user.username} panele giriş yaptı`,
        html: `
          <div style="font-family: Arial, sans-serif; background-color: #0f0f13; color: #f3f4f6; padding: 30px; border-radius: 12px; max-width: 500px; margin: 0 auto;">
            <h2 style="color: #a855f7; margin-top: 0;">AuraX Studio - Admin Girişi</h2>
            <p><strong>Yönetici:</strong> ${user.username} (${user.role})</p>
            <p><strong>Zaman:</strong> ${new Date().toLocaleString('tr-TR', { timeZone: 'Europe/Istanbul' })}</p>
            <p style="color: #9ca3af; font-size: 12px; margin-top: 20px;">Bu bildirim auraxstudio.com.tr altyapısı üzerinden gönderilmiştir.</p>
          </div>
        `,
      });

      return new Response(JSON.stringify({ success: true, user: user.username, role: user.role }), {
        headers: { 'content-type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: false, message: "Hatalı kullanıcı adı veya şifre" }), { status: 401, headers: { 'content-type': 'application/json' } });
  } catch (err: any) {
    return new Response(JSON.stringify({ success: false, error: err.message }), { status: 500, headers: { 'content-type': 'application/json' } });
  }
}
