'use client';

import { useState } from 'react';

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'orders' | 'users'>('orders');
  
  const [orders, setOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  const [adminUsers, setAdminUsers] = useState<any[]>([]);
  const [newAdminUsername, setNewAdminUsername] = useState('');
  const [newAdminPassword, setNewAdminPassword] = useState('');

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
        loadAdminUsers();
      } else {
        setError(data.message || 'Giriş başarısız');
      }
    } catch (err) {
      setError('Giriş yapılırken bir hata oluştu.');
    }
  };

  const loadOrders = async () => {
    setLoadingOrders(true);
    try {
      const res = await fetch('/api/orders');
      const data = await res.json();
      if (data.orders) setOrders(data.orders);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingOrders(false);
    }
  };

  const loadAdminUsers = async () => {
    try {
      const res = await fetch('/api/admin/users');
      const data = await res.json();
      if (data.users) setAdminUsers(data.users);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'create', username: newAdminUsername, password: newAdminPassword }),
      });
      const data = await res.json();
      if (data.success) {
        setNewAdminUsername('');
        setNewAdminPassword('');
        loadAdminUsers();
      } else {
        alert(data.message || 'Hata oluştu');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleStatus = async (id: number, currentStatus: string) => {
    const nextStatus = currentStatus === 'active' ? 'frozen' : 'active';
    try {
      await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'toggle_status', id, status: nextStatus }),
      });
      loadAdminUsers();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteAdmin = async (id: number) => {
    if (!confirm('Bu yönetici hesabını silmek istediğinize emin misiniz?')) return;
    try {
      await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete', id }),
      });
      loadAdminUsers();
    } catch (err) {
      console.error(err);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4">
        <form onSubmit={handleLogin} className="bg-slate-900 p-6 rounded-xl border border-slate-800 w-full max-w-md space-y-4">
          <h1 className="text-xl font-bold text-center text-cyan-400">AuraX Studio - Kurucu/Admin Girişi</h1>
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          <div>
            <label className="block text-xs font-semibold mb-1 text-slate-300">Kullanıcı Adı</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-sm text-white outline-none focus:border-cyan-500"
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
              className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-sm text-white outline-none focus:border-cyan-500"
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
          <div className="flex items-center space-x-6">
            <h1 className="text-2xl font-bold text-cyan-400">AuraX Studio Yönetim Paneli</h1>
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveTab('orders')}
                className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition ${activeTab === 'orders' ? 'bg-cyan-600 text-white' : 'bg-slate-900 text-slate-400 hover:text-white'}`}
              >
                Siparişler
              </button>
              <button
                onClick={() => setActiveTab('users')}
                className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition ${activeTab === 'users' ? 'bg-cyan-600 text-white' : 'bg-slate-900 text-slate-400 hover:text-white'}`}
              >
                Yönetici Hesapları
              </button>
            </div>
          </div>
          <button
            onClick={() => setIsLoggedIn(false)}
            className="bg-red-600/20 text-red-400 border border-red-800 px-3 py-1 rounded text-sm hover:bg-red-600/30"
          >
            Çıkış Yap
          </button>
        </div>

        {activeTab === 'orders' ? (
          loadingOrders ? (
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
                  <div key={order.id} className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
                    <div className="flex justify-between items-center text-sm text-slate-400">
                      <span>Sipariş #{order.id}</span>
                      <span>{new Date(order.created_at).toLocaleString('tr-TR')}</span>
                    </div>
                    {customerInfo.fullName && (
                      <div className="text-sm text-slate-300">
                        <span className="font-semibold text-white">Müşteri:</span> {customerInfo.fullName} ({customerInfo.contact})
                      </div>
                    )}
                    <div className="font-semibold text-lg text-cyan-400">{order.total} TL</div>
                    <div className="text-xs text-slate-300 space-y-1">
                      {items.map((it: any, idx: number) => (
                        <div key={idx}>• {it.title || it.name || 'Ürün'} ({it.price} TL)</div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )
        ) : (
          <div className="space-y-6">
            <form onSubmit={handleAddAdmin} className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-4">
              <h2 className="text-lg font-bold text-cyan-400">Yeni Yönetici Ekle</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Kullanıcı Adı"
                  value={newAdminUsername}
                  onChange={(e) => setNewAdminUsername(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded px-3 py-2 text-sm text-white outline-none focus:border-cyan-500"
                  required
                />
                <input
                  type="password"
                  placeholder="Şifre"
                  value={newAdminPassword}
                  onChange={(e) => setNewAdminPassword(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded px-3 py-2 text-sm text-white outline-none focus:border-cyan-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-cyan-600 hover:bg-cyan-500 text-white font-semibold px-4 py-2 rounded text-sm transition"
              >
                Yöneticiyi Kaydet
              </button>
            </form>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-4">
              <h2 className="text-lg font-bold text-cyan-400">Kayıtlı Yöneticiler</h2>
              <div className="space-y-3">
                {adminUsers.map((u) => (
                  <div key={u.id} className="flex justify-between items-center bg-slate-950 p-3 rounded border border-slate-800">
                    <div>
                      <span className="font-semibold text-white">{u.username}</span>
                      <span className="ml-2 text-xs text-slate-400">({u.role === 'founder' ? 'Kurucu' : 'Yönetici'})</span>
                      <span className={`ml-3 px-2 py-0.5 text-xs rounded ${u.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                        {u.status === 'active' ? 'Aktif' : 'Donduruldu'}
                      </span>
                    </div>

                    {u.role !== 'founder' && (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleToggleStatus(u.id, u.status)}
                          className={`px-3 py-1 rounded text-xs font-semibold ${u.status === 'active' ? 'bg-amber-600/20 text-amber-400 border border-amber-800 hover:bg-amber-600/30' : 'bg-green-600/20 text-green-400 border border-green-800 hover:bg-green-600/30'}`}
                        >
                          {u.status === 'active' ? 'Dondur' : 'Aktif Et'}
                        </button>
                        <button
                          onClick={() => handleDeleteAdmin(u.id)}
                          className="bg-red-600/20 text-red-400 border border-red-800 px-3 py-1 rounded text-xs hover:bg-red-600/30 font-semibold"
                        >
                          Sil
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
