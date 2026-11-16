import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';

function getDB() {
  try {
    return (getRequestContext() as any)?.env?.DB || (process.env as any)?.DB;
  } catch {
    return (process.env as any)?.DB;
  }
}

export async function GET() {
  try {
    const DB = getDB();
    if (!DB) return new Response(JSON.stringify({ error: "Veritabanı bağlantısı yok" }), { status: 500, headers: { 'content-type': 'application/json' } });

    const { results } = await DB.prepare("SELECT id, username, status, role FROM admin_users").all();
    return new Response(JSON.stringify({ users: results }), {
      headers: { 'content-type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { 'content-type': 'application/json' } });
  }
}

export async function POST(request: Request) {
  try {
    const { action, username, password, id, status } = await request.json();
    const DB = getDB();
    if (!DB) return new Response(JSON.stringify({ error: "Veritabanı bağlantısı yok" }), { status: 500, headers: { 'content-type': 'application/json' } });

    if (action === 'create') {
      if (!username || !password) {
        return new Response(JSON.stringify({ success: false, message: "Kullanıcı adı ve şifre gerekli" }), { status: 400, headers: { 'content-type': 'application/json' } });
      }
      const normalizedUsername = username.trim().toLowerCase();
      await DB.prepare("INSERT INTO admin_users (username, password, status, role) VALUES (?, ?, 'active', 'admin')")
        .bind(normalizedUsername, password)
        .run();
      return new Response(JSON.stringify({ success: true, message: "Yeni yönetici eklendi" }), { headers: { 'content-type': 'application/json' } });
    }

    if (action === 'toggle_status') {
      await DB.prepare("UPDATE admin_users SET status = ? WHERE id = ?")
        .bind(status, id)
        .run();
      return new Response(JSON.stringify({ success: true, message: "Hesap durumu güncellendi" }), { headers: { 'content-type': 'application/json' } });
    }

    if (action === 'delete') {
      await DB.prepare("DELETE FROM admin_users WHERE id = ?")
        .bind(id)
        .run();
      return new Response(JSON.stringify({ success: true, message: "Yönetici hesabı silindi" }), { headers: { 'content-type': 'application/json' } });
    }

    return new Response(JSON.stringify({ success: false, message: "Geçersiz işlem" }), { status: 400, headers: { 'content-type': 'application/json' } });
  } catch (err: any) {
    return new Response(JSON.stringify({ success: false, error: err.message }), { status: 500, headers: { 'content-type': 'application/json' } });
  }
}
