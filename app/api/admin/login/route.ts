export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();
    
    // @ts-ignore
    const { DB } = process.env;
    if (!DB) {
      return new Response(JSON.stringify({ success: false, message: "Veritabanı bağlantısı yok" }), { status: 500 });
    }

    const { results } = await DB.prepare(
      "SELECT * FROM admin_users WHERE username = ? AND password = ?"
    ).bind(username, password).all();

    if (results && results.length > 0) {
      const user = results[0];
      if (user.status === 'frozen') {
        return new Response(JSON.stringify({ success: false, message: "Bu yönetici hesabı dondurulmuştur!" }), { status: 403 });
      }
      return new Response(JSON.stringify({ success: true, user: user.username, role: user.role }), {
        headers: { 'content-type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: false, message: "Hatalı kullanıcı adı veya şifre" }), { status: 401 });
  } catch (err: any) {
    return new Response(JSON.stringify({ success: false, error: err.message }), { status: 500 });
  }
}
