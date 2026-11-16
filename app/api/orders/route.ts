import { getRequestContext } from '@cloudflare/next-on-pages';
import { sendEmail } from '@/lib/resend';
import { getOrderNotificationTemplate } from '@/lib/email-templates';

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

    // Send order notification email via Resend using verified auraxstudio.com.tr domain
    const { html, text } = getOrderNotificationTemplate({ customer_info, items, total });
    const customer = customer_info || {};

    await sendEmail({
      to: 'iletisim@auraxstudio.com.tr',
      subject: `[Yeni Sipariş] ${customer.fullName || customer.name || customer.email || 'Müşteri'} - ${total || 0} ₺`,
      html,
      text,
    });

    return new Response(JSON.stringify({ success: true, message: "Sipariş veritabanına eklendi ve Resend bildirimi gönderildi" }), {
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
