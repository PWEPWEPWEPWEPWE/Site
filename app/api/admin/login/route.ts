export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const { username, password, turnstileToken } = await request.json();
    
    // Verify Turnstile token
    const secretKey = process.env.TURNSTILE_SECRET_KEY || "1x0000000000000000000000000000000AA";
    if (turnstileToken) {
      const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          secret: secretKey,
          response: turnstileToken,
        }),
      });
      const verifyData = await verifyRes.json() as any;
      if (!verifyData.success) {
        return new Response(JSON.stringify({ success: false, message: "Bot doğrulaması başarısız oldu!" }), { status: 400, headers: { 'content-type': 'application/json' } });
      }
    } else {
      return new Response(JSON.stringify({ success: false, message: "Bot doğrulaması eksik!" }), { status: 400, headers: { 'content-type': 'application/json' } });
    }

    const { DB } = (process.env as unknown) as { DB?: any };
    if (!DB) {
      return new Response(JSON.stringify({ success: false, message: "Veritabanı bağlantısı yok" }), { status: 500, headers: { 'content-type': 'application/json' } });
    }

    const { results } = await DB.prepare(
      "SELECT * FROM admin_users WHERE username = ? AND password = ?"
    ).bind(username, password).all();

    if (results && results.length > 0) {
      const user = results[0];
      if (user.status === 'frozen') {
        return new Response(JSON.stringify({ success: false, message: "Bu yönetici hesabı dondurulmuştur!" }), { status: 403, headers: { 'content-type': 'application/json' } });
      }
      return new Response(JSON.stringify({ success: true, user: user.username, role: user.role }), {
        headers: { 'content-type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: false, message: "Hatalı kullanıcı adı veya şifre" }), { status: 401, headers: { 'content-type': 'application/json' } });
  } catch (err: any) {
    return new Response(JSON.stringify({ success: false, error: err.message }), { status: 500, headers: { 'content-type': 'application/json' } });
  }
}
