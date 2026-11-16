import { getRequestContext } from '@cloudflare/next-on-pages';
import { SignJWT } from 'jose';

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
    const { email, code, rememberMe } = await request.json();
    const env = getEnv();
    const DB = env?.DB;

    if (!DB) {
      return new Response(JSON.stringify({ success: false, message: "Veritabanı bağlantısı yok" }), { status: 500, headers: { 'content-type': 'application/json' } });
    }

    const normalizedEmail = email?.trim().toLowerCase();
    const adminEmail = (env?.ADMIN_EMAIL || "").trim().toLowerCase();

    if (!normalizedEmail || !code) {
      return new Response(JSON.stringify({ success: false, message: "E-posta ve doğrulama kodu gerekli" }), { status: 400, headers: { 'content-type': 'application/json' } });
    }

    // Verify OTP from D1
    const { results: otpResults } = await DB.prepare(
      "SELECT * FROM admin_otps WHERE email = ? AND code = ? AND expires_at > ?"
    ).bind(normalizedEmail, code, Date.now()).all();

    if (!otpResults || otpResults.length === 0) {
      return new Response(JSON.stringify({ success: false, message: "Hatalı veya süresi dolmuş doğrulama kodu" }), { status: 401, headers: { 'content-type': 'application/json' } });
    }

    // Delete OTP record
    await DB.prepare("DELETE FROM admin_otps WHERE email = ?").bind(normalizedEmail).run();

    // Fetch user details from admin_users (or fallback)
    const { results: userResults } = await DB.prepare(
      "SELECT * FROM admin_users WHERE username = ? OR username = ?"
    ).bind(normalizedEmail, adminEmail).all();

    let user = userResults?.[0] as any;
    if (!user && normalizedEmail === adminEmail) {
      user = { username: adminEmail, role: 'founder' };
    }

    if (!user) {
      return new Response(JSON.stringify({ success: false, message: "Yönetici bulunamadı" }), { status: 401, headers: { 'content-type': 'application/json' } });
    }

    // Generate JWT with jose
    const secretKey = new TextEncoder().encode(env?.JWT_SECRET || 'aurax-default-super-secret-key-2026');
    const token = await new SignJWT({ username: user.username, role: user.role || 'admin' })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime(rememberMe ? '30d' : '24h')
      .sign(secretKey);

    // Build cookie header
    let cookieString = `admin_token=${token}; HttpOnly; Secure; SameSite=Strict; Path=/`;
    if (rememberMe) {
      const maxAge = 30 * 24 * 60 * 60; // 30 days in seconds
      cookieString += `; Max-Age=${maxAge}`;
    }

    return new Response(JSON.stringify({ success: true, user: user.username, role: user.role || 'admin' }), {
      headers: {
        'content-type': 'application/json',
        'Set-Cookie': cookieString,
      },
    });

  } catch (err: any) {
    return new Response(JSON.stringify({ success: false, error: err.message }), { status: 500, headers: { 'content-type': 'application/json' } });
  }
}
