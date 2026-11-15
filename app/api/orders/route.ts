import { getRequestContext } from '@cloudflare/next-on-pages';

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
    const body = await request.json();
    const { customer_info, items, total } = body;

    const DB = getDB();
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
    const DB = getDB();
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
