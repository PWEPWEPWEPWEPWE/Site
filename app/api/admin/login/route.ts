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
      return new Response(JSON.stringify({ success: true, user: user.username, role: user.role }), {
        headers: { 'content-type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: false, message: "Hatalı kullanıcı adı veya şifre" }), { status: 401, headers: { 'content-type': 'application/json' } });
  } catch (err: any) {
    return new Response(JSON.stringify({ success: false, error: err.message }), { status: 500, headers: { 'content-type': 'application/json' } });
  }
}
