export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customer_info, items, total, turnstileToken } = body;
    
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
        return new Response(JSON.stringify({ success: false, error: "Bot doğrulaması başarısız oldu!" }), { status: 400, headers: { 'content-type': 'application/json' } });
      }
    } else {
      return new Response(JSON.stringify({ success: false, error: "Bot doğrulaması eksik!" }), { status: 400, headers: { 'content-type': 'application/json' } });
    }

    const { DB } = (process.env as unknown) as { DB?: any };
    if (!DB) {
      return new Response(JSON.stringify({ error: "Veritabanı bağlantısı bulunamadı" }), { status: 500, headers: { 'content-type': 'application/json' } });
    }

    await DB.prepare(
      "INSERT INTO orders (customer_info, items, total) VALUES (?, ?, ?)"
    ).bind(
      JSON.stringify(customer_info || {}),
      JSON.stringify(items || []),
      total || 0
    ).run();

    return new Response(JSON.stringify({ success: true, message: "Sipariş veritabanına eklendi" }), {
      headers: { 'content-type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { 'content-type': 'application/json' } });
  }
}

export async function GET() {
  try {
    const { DB } = (process.env as unknown) as { DB?: any };
    if (!DB) {
      return new Response(JSON.stringify({ error: "Veritabanı bağlantısı bulunamadı" }), { status: 500, headers: { 'content-type': 'application/json' } });
    }

    const { results } = await DB.prepare("SELECT * FROM orders ORDER BY created_at DESC").all();

    return new Response(JSON.stringify({ orders: results }), {
      headers: { 'content-type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { 'content-type': 'application/json' } });
  }
}
