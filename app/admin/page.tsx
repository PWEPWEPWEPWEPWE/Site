'use client';

import { useState } from 'react';

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (data.success) {
        setIsLoggedIn(true);
        loadOrders();
      } else {
        setError(data.message || 'Giriş başarısız');
      }
    } catch (err) {
      setError('Giriş yapılırken bir hata oluştu.');
    }
  };

  const loadOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/orders');
      const data = await res.json();
      if (data.orders) {
        setOrders(data.orders);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4">
        <form onSubmit={handleLogin} className="bg-slate-900 p-6 rounded-xl border border-slate-800 w-full max-w-md space-y-4">
          <h1 className="text-xl font-bold text-center text-cyan-400">AuraX Studio - Yönetici Girişi</h1>
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          <div>
            <label className="block text-xs font-semibold mb-1 text-slate-300">Kullanıcı Adı</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
              placeholder="Kullanıcı Adı"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1 text-slate-300">Şifre</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
              placeholder="Şifre"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-semibold py-2 rounded text-sm transition"
          >
            Giriş Yap
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex justify-between items-center border-b border-slate-800 pb-4">
          <h1 className="text-2xl font-bold text-cyan-400">AuraX Admin - Siparişler</h1>
          <button
            onClick={() => setIsLoggedIn(false)}
            className="bg-red-600/20 text-red-400 border border-red-800 px-3 py-1 rounded text-sm hover:bg-red-600/30"
          >
            Çıkış Yap
          </button>
        </div>

        {loading ? (
          <p className="text-slate-400">Siparişler yükleniyor...</p>
        ) : orders.length === 0 ? (
          <p className="text-slate-400">Henüz kayıtlı sipariş bulunmuyor.</p>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              let items = [];
              let customerInfo: any = {};
              try { items = JSON.parse(order.items || '[]'); } catch (e) {}
              try { customerInfo = JSON.parse(order.customer_info || '{}'); } catch (e) {}
              
              return (
                <div key={order.id} className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
                  <div className="flex justify-between items-center text-sm text-slate-400">
                    <span>Sipariş #{order.id}</span>
                    <span>{new Date(order.created_at).toLocaleString('tr-TR')}</span>
                  </div>
                  
                  {customerInfo.fullName && (
                    <div className="text-sm text-slate-300 py-1">
                      <span className="font-semibold text-white">Müşteri:</span> {customerInfo.fullName} ({customerInfo.contact})
                    </div>
                  )}

                  <div className="font-semibold text-lg text-cyan-400">{order.total} TL</div>
                  <div className="text-xs text-slate-300">
                    {items.map((it: any, idx: number) => (
                      <div key={idx}>• {it.title || it.name || 'Ürün'} ({it.price} TL)</div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
