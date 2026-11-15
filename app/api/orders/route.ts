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
    const customer = customer_info || {};
    const orderItems = Array.isArray(items) ? items : [];
    const itemsHtml = orderItems.map((item: any) => `<li>${item.title || item.name || 'Ürün'} - ${item.price || 0} ₺</li>`).join('');

    await sendEmail({
      to: 'iletisim@auraxstudio.com.tr',
      subject: `[Yeni Sipariş] ${customer.name || customer.email || 'Müşteri'} - ${total || 0} ₺`,
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #0f0f13; color: #f3f4f6; padding: 30px; border-radius: 12px; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #a855f7; border-bottom: 1px solid #374151; padding-bottom: 10px; margin-top: 0;">Yeni Sipariş Alındı!</h2>
          
          <h3 style="color: #e5e7eb; margin-bottom: 5px;">Müşteri Bilgileri</h3>
          <p style="margin: 4px 0;"><strong>Ad Soyad:</strong> ${customer.name || '-'}</p>
          <p style="margin: 4px 0;"><strong>E-posta:</strong> ${customer.email || '-'}</p>
          <p style="margin: 4px 0;"><strong>Telefon:</strong> ${customer.phone || '-'}</p>
          <p style="margin: 4px 0;"><strong>Discord:</strong> ${customer.discord || '-'}</p>
          <p style="margin: 4px 0;"><strong>Notlar:</strong> ${customer.notes || '-'}</p>

          <h3 style="color: #e5e7eb; margin-top: 20px; margin-bottom: 5px;">Sipariş Edilen Ürünler / Hizmetler</h3>
          <ul style="padding-left: 20px; margin-top: 5px;">
            ${itemsHtml || '<li>Ürün detayı bulunamadı</li>'}
          </ul>

          <div style="background-color: #1f2937; padding: 15px; border-radius: 8px; margin-top: 20px; display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 16px; font-weight: bold;">Toplam Tutar:</span>
            <span style="font-size: 20px; font-weight: bold; color: #a855f7;">${total || 0} ₺</span>
          </div>

          <p style="color: #9ca3af; font-size: 12px; margin-top: 30px; text-align: center;">auraxstudio.com.tr otomatik sipariş bildirim sistemidir.</p>
        </div>
      `,
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
