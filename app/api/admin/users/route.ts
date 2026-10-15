export const runtime = 'edge';

export async function GET() {
  try {
    // @ts-ignore
    const { DB } = process.env;
    if (!DB) return new Response(JSON.stringify({ error: "Veritabanı bağlantısı yok" }), { status: 500 });

    const { results } = await DB.prepare("SELECT id, username, status, role FROM admin_users").all();
    return new Response(JSON.stringify({ users: results }), {
      headers: { 'content-type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { action, username, password, id, status } = await request.json();
    // @ts-ignore
    const { DB } = process.env;
    if (!DB) return new Response(JSON.stringify({ error: "Veritabanı bağlantısı yok" }), { status: 500 });

    if (action === 'create') {
      if (!username || !password) {
        return new Response(JSON.stringify({ success: false, message: "Kullanıcı adı ve şifre gerekli" }), { status: 400 });
      }
      await DB.prepare("INSERT INTO admin_users (username, password, status, role) VALUES (?, ?, 'active', 'admin')")
        .bind(username, password)
        .run();
      return new Response(JSON.stringify({ success: true, message: "Yeni yönetici eklendi" }));
    }

    if (action === 'toggle_status') {
      await DB.prepare("UPDATE admin_users SET status = ? WHERE id = ?")
        .bind(status, id)
        .run();
      return new Response(JSON.stringify({ success: true, message: "Hesap durumu güncellendi" }));
    }

    if (action === 'delete') {
      await DB.prepare("DELETE FROM admin_users WHERE id = ?")
        .bind(id)
        .run();
      return new Response(JSON.stringify({ success: true, message: "Yönetici hesabı silindi" }));
    }

    return new Response(JSON.stringify({ success: false, message: "Geçersiz işlem" }), { status: 400 });
  } catch (err: any) {
    return new Response(JSON.stringify({ success: false, error: err.message }), { status: 500 });
  }
}
