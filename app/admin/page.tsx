
'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { 
  Mail, Lock, Eye, EyeClosed, ArrowRight, ShieldAlert,
  LayoutDashboard, ShoppingBag, Package, Settings, Trash2, 
  CheckCircle2, Clock, Search, ArrowLeft, User, LogOut, Save, UserPlus, Shield 
} from 'lucide-react';

import { cn } from "@/lib/utils";

// --- 1. GİRİŞ EKRANI İÇİN ÖZEL INPUT BİLEŞENİ ---
function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  );
}

// --- 2. TİPLER (SİPARİŞ VE KULLANICI) ---
type Order = {
  id: string;
  planName: string;
  fullName: string;
  contact: string;
  notes: string;
  date: string;
  status: "bekliyor" | "tamamlandi";
  total: number;
};

type UserAccount = {
  id: string;
  username: string;
  role: "founder" | "manager";
  isActive: boolean;
};

// --- 3. ANA BİLEŞEN ---
export default function AdminDashboard() {
  const [isMounted, setIsMounted] = useState(false);
  
  // -- DASHBOARD STATELERİ --
  const [activeTab, setActiveTab] = useState("dashboard");
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  // -- KİMLİK DOĞRULAMA STATELERİ --
  const [users, setUsers] = useState<UserAccount[]>([]);
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(null);
  const [loginUser, setLoginUser] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // -- 3D GİRİŞ EKRANI STATELERİ --
  const [showPassword, setShowPassword] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-300, 300], [10, -10]); 
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]); 

  // -- AYARLAR STATELERİ --
  const [newManagerUser, setNewManagerUser] = useState("");
  const [newManagerPass, setNewManagerPass] = useState("");
  const [ownPassword, setOwnPassword] = useState("");
  const [settingsMessage, setSettingsMessage] = useState("");

  // ==========================================
  // == BAŞLANGIÇ YÜKLEMESİ (USEEFFECT)      ==
  // ==========================================
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // ==========================================
  // == VERİTABANI ÇEKME İŞLEMLERİ (API)     ==
  // ==========================================
  const loadOrders = async () => {
    try {
      const res = await fetch('/api/orders');
      const data = await res.json();
      if (data.orders) {
        const formattedOrders = data.orders.map((o: any) => {
          let items = [];
          let customerInfo: any = {};
          try { items = JSON.parse(o.items || '[]'); } catch(e){}
          try { customerInfo = JSON.parse(o.customer_info || '{}'); } catch(e){}
          return {
            id: o.id.toString(),
            planName: items.map((i:any) => i.title || i.name).join(', ') || 'Ürün',
            fullName: customerInfo.fullName || 'Bilinmeyen Müşteri',
            contact: customerInfo.contact || '',
            notes: customerInfo.notes || '',
            date: new Date(o.created_at).toLocaleString('tr-TR'),
            status: "bekliyor",
            total: o.total
          };
        });
        setOrders(formattedOrders);
      }
    } catch (err) {
      console.error("Siparişler çekilemedi:", err);
    }
  };

  const loadUsers = async () => {
    try {
      const res = await fetch('/api/admin/users');
      const data = await res.json();
      if (data.users) {
        const formattedUsers = data.users.map((u: any) => ({
          id: u.id.toString(),
          username: u.username,
          role: u.role,
          isActive: u.status === 'active'
        }));
        setUsers(formattedUsers);
      }
    } catch (err) {
      console.error("Kullanıcılar çekilemedi:", err);
    }
  };

  // ==========================================
  // == GİRİŞ - ÇIKIŞ MANTIĞI                ==
  // ==========================================
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError("");

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: loginUser, password: loginPass }),
      });
      const data = await res.json();
      
      if (data.success) {
        setCurrentUser({ id: data.user, username: data.user, role: data.role, isActive: true });
        loadOrders();
        loadUsers();
      } else {
        setLoginError(data.message || 'Hatalı yönetici bilgileri!');
      }
    } catch (err) {
      setLoginError("Sunucu bağlantı hatası!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setLoginUser("");
    setLoginPass("");
  };

  // ==========================================
  // == HESAP & SİPARİŞ YÖNETİM MANTIĞI      ==
  // ==========================================
  const handleAddManager = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'create', username: newManagerUser, password: newManagerPass }),
      });
      const data = await res.json();
      if (data.success) {
        setSettingsMessage("Yeni yönetici başarıyla oluşturuldu.");
        setNewManagerUser("");
        setNewManagerPass("");
        loadUsers();
      } else {
        setSettingsMessage(data.message || "Hata oluştu.");
      }
    } catch (err) {
      setSettingsMessage("Bağlantı hatası.");
    }
    setTimeout(() => setSettingsMessage(""), 3000);
  };

  const toggleUserStatus = async (id: string, currentStatus: boolean) => {
    try {
      await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'toggle_status', id: parseInt(id), status: currentStatus ? 'frozen' : 'active' }),
      });
      loadUsers();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteUser = async (id: string) => {
    if (!confirm('Bu yöneticiyi silmek istediğinize emin misiniz?')) return;
    try {
      await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete', id: parseInt(id) }),
      });
      loadUsers();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteOrder = (id: string) => {
    // Sadece arayüzden gizle (Gerçek veritabanı silme API'si eklenene kadar)
    setOrders(orders.filter(o => o.id !== id));
  };

  const handleChangeOwnPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setSettingsMessage("Şifre güncelleme özelliği şu an bakımda.");
    setTimeout(() => setSettingsMessage(""), 3000);
  };

  // -- FİLTRELER VE HESAPLAMALAR --
  const filteredOrders = orders.filter(
    (o) => o.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || o.contact.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const pendingCount = orders.filter((o) => o.status === "bekliyor").length;
  const completedCount = orders.filter((o) => o.status === "tamamlandi").length;

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  // ==========================================
  // == GÖRÜNÜM 1: 3D GİRİŞ EKRANI (LOGIN)   ==
  // ==========================================
  if (!currentUser) {
    return (
      <div className="min-h-screen w-screen bg-black relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/40 via-purple-700/50 to-black" />
        <div className="absolute inset-0 opacity-[0.03] mix-blend-soft-light" 
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`, backgroundSize: '200px 200px' }}
        />

        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[120vh] h-[60vh] rounded-b-[50%] bg-purple-400/20 blur-[80px]" />
        <motion.div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[100vh] h-[60vh] rounded-b-full bg-purple-300/20 blur-[60px]" animate={{ opacity: [0.15, 0.3, 0.15], scale: [0.98, 1.02, 0.98] }} transition={{ duration: 8, repeat: Infinity, repeatType: "mirror" }} />
        <motion.div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[90vh] h-[90vh] rounded-t-full bg-purple-400/20 blur-[60px]" animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.1, 1] }} transition={{ duration: 6, repeat: Infinity, repeatType: "mirror", delay: 1 }} />

        <div className="absolute left-1/4 top-1/4 w-96 h-96 bg-white/5 rounded-full blur-[100px] animate-pulse opacity-40" />
        <div className="absolute right-1/4 bottom-1/4 w-96 h-96 bg-white/5 rounded-full blur-[100px] animate-pulse delay-1000 opacity-40" />

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="w-full max-w-sm relative z-10" style={{ perspective: 1500 }}>
          <motion.div className="relative" style={{ rotateX, rotateY }} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} whileHover={{ z: 10 }}>
            <div className="relative group">
              <motion.div className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-70 transition-opacity duration-700" animate={{ boxShadow: ["0 0 10px 2px rgba(255,255,255,0.03)", "0 0 15px 5px rgba(255,255,255,0.05)", "0 0 10px 2px rgba(255,255,255,0.03)"], opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" }} />

              <div className="absolute -inset-[1px] rounded-2xl overflow-hidden">
                <motion.div className="absolute top-0 left-0 h-[3px] w-[50%] bg-gradient-to-r from-transparent via-white to-transparent opacity-70" initial={{ filter: "blur(2px)" }} animate={{ left: ["-50%", "100%"], opacity: [0.3, 0.7, 0.3], filter: ["blur(1px)", "blur(2.5px)", "blur(1px)"] }} transition={{ left: { duration: 2.5, ease: "easeInOut", repeat: Infinity, repeatDelay: 1 }, opacity: { duration: 1.2, repeat: Infinity, repeatType: "mirror" }, filter: { duration: 1.5, repeat: Infinity, repeatType: "mirror" } }} />
                <motion.div className="absolute top-0 right-0 h-[50%] w-[3px] bg-gradient-to-b from-transparent via-white to-transparent opacity-70" initial={{ filter: "blur(2px)" }} animate={{ top: ["-50%", "100%"], opacity: [0.3, 0.7, 0.3], filter: ["blur(1px)", "blur(2.5px)", "blur(1px)"] }} transition={{ top: { duration: 2.5, ease: "easeInOut", repeat: Infinity, repeatDelay: 1, delay: 0.6 }, opacity: { duration: 1.2, repeat: Infinity, repeatType: "mirror", delay: 0.6 }, filter: { duration: 1.5, repeat: Infinity, repeatType: "mirror", delay: 0.6 } }} />
                <motion.div className="absolute bottom-0 right-0 h-[3px] w-[50%] bg-gradient-to-r from-transparent via-white to-transparent opacity-70" initial={{ filter: "blur(2px)" }} animate={{ right: ["-50%", "100%"], opacity: [0.3, 0.7, 0.3], filter: ["blur(1px)", "blur(2.5px)", "blur(1px)"] }} transition={{ right: { duration: 2.5, ease: "easeInOut", repeat: Infinity, repeatDelay: 1, delay: 1.2 }, opacity: { duration: 1.2, repeat: Infinity, repeatType: "mirror", delay: 1.2 }, filter: { duration: 1.5, repeat: Infinity, repeatType: "mirror", delay: 1.2 } }} />
                <motion.div className="absolute bottom-0 left-0 h-[50%] w-[3px] bg-gradient-to-b from-transparent via-white to-transparent opacity-70" initial={{ filter: "blur(2px)" }} animate={{ bottom: ["-50%", "100%"], opacity: [0.3, 0.7, 0.3], filter: ["blur(1px)", "blur(2.5px)", "blur(1px)"] }} transition={{ bottom: { duration: 2.5, ease: "easeInOut", repeat: Infinity, repeatDelay: 1, delay: 1.8 }, opacity: { duration: 1.2, repeat: Infinity, repeatType: "mirror", delay: 1.8 }, filter: { duration: 1.5, repeat: Infinity, repeatType: "mirror", delay: 1.8 } }} />
                
                <motion.div className="absolute top-0 left-0 h-[5px] w-[5px] rounded-full bg-white/40 blur-[1px]" animate={{ opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }} />
                <motion.div className="absolute top-0 right-0 h-[8px] w-[8px] rounded-full bg-white/60 blur-[2px]" animate={{ opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 2.4, repeat: Infinity, repeatType: "mirror", delay: 0.5 }} />
                <motion.div className="absolute bottom-0 right-0 h-[8px] w-[8px] rounded-full bg-white/60 blur-[2px]" animate={{ opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 2.2, repeat: Infinity, repeatType: "mirror", delay: 1 }} />
                <motion.div className="absolute bottom-0 left-0 h-[5px] w-[5px] rounded-full bg-white/40 blur-[1px]" animate={{ opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 2.3, repeat: Infinity, repeatType: "mirror", delay: 1.5 }} />
              </div>

              <div className="absolute -inset-[0.5px] rounded-2xl bg-gradient-to-r from-white/3 via-white/7 to-white/3 opacity-0 group-hover:opacity-70 transition-opacity duration-500" />
              
              <div className="relative bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-white/[0.05] shadow-2xl overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `linear-gradient(135deg, white 0.5px, transparent 0.5px), linear-gradient(45deg, white 0.5px, transparent 0.5px)`, backgroundSize: '30px 30px' }} />

                <div className="text-center space-y-1 mb-5">
                  <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", duration: 0.8 }} className="mx-auto w-10 h-10 rounded-full border border-white/10 flex items-center justify-center relative overflow-hidden">
                    <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">A</span>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50" />
                  </motion.div>

                  <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">
                    AuraX Yönetim
                  </motion.h1>
                  
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-white/60 text-xs">
                    Güvenli alana erişmek için kimliğinizi doğrulayın.
                  </motion.p>
                </div>

                {loginError && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-4 flex items-center justify-center gap-2 p-2 rounded bg-red-500/10 border border-red-500/20 text-red-400 text-xs text-center font-bold">
                    <ShieldAlert className="w-4 h-4 flex-shrink-0" />
                    <span>{loginError}</span>
                  </motion.div>
                )}

                <form onSubmit={handleLogin} className="space-y-4">
                  <motion.div className="space-y-3">
                    <motion.div className={`relative ${focusedInput === "email" ? 'z-10' : ''}`} whileFocus={{ scale: 1.02 }} whileHover={{ scale: 1.01 }} transition={{ type: "spring", stiffness: 400, damping: 25 }}>
                      <div className="absolute -inset-[0.5px] bg-gradient-to-r from-white/10 via-white/5 to-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300" />
                      <div className="relative flex items-center overflow-hidden rounded-lg">
                        <Mail className={`absolute left-3 w-4 h-4 transition-all duration-300 ${focusedInput === "email" ? 'text-white' : 'text-white/40'}`} />
                        <Input
                          type="text"
                          placeholder="Yönetici Kullanıcı Adı"
                          required
                          value={loginUser}
                          onChange={(e) => setLoginUser(e.target.value)}
                          onFocus={() => setFocusedInput("email")}
                          onBlur={() => setFocusedInput(null)}
                          className="w-full bg-white/5 border-transparent focus:border-white/20 text-white placeholder:text-white/30 h-10 transition-all duration-300 pl-10 pr-3 focus:bg-white/10"
                        />
                        {focusedInput === "email" && <motion.div layoutId="input-highlight" className="absolute inset-0 bg-white/5 -z-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} />}
                      </div>
                    </motion.div>

                    <motion.div className={`relative ${focusedInput === "password" ? 'z-10' : ''}`} whileFocus={{ scale: 1.02 }} whileHover={{ scale: 1.01 }} transition={{ type: "spring", stiffness: 400, damping: 25 }}>
                      <div className="absolute -inset-[0.5px] bg-gradient-to-r from-white/10 via-white/5 to-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300" />
                      <div className="relative flex items-center overflow-hidden rounded-lg">
                        <Lock className={`absolute left-3 w-4 h-4 transition-all duration-300 ${focusedInput === "password" ? 'text-white' : 'text-white/40'}`} />
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Güvenlik Anahtarı (Şifre)"
                          required
                          value={loginPass}
                          onChange={(e) => setLoginPass(e.target.value)}
                          onFocus={() => setFocusedInput("password")}
                          onBlur={() => setFocusedInput(null)}
                          className="w-full bg-white/5 border-transparent focus:border-white/20 text-white placeholder:text-white/30 h-10 transition-all duration-300 pl-10 pr-10 focus:bg-white/10"
                        />
                        <div onClick={() => setShowPassword(!showPassword)} className="absolute right-3 cursor-pointer">
                          {showPassword ? <Eye className="w-4 h-4 text-white/40 hover:text-white transition-colors"/> : <EyeClosed className="w-4 h-4 text-white/40 hover:text-white transition-colors"/>}
                        </div>
                        {focusedInput === "password" && <motion.div layoutId="input-highlight" className="absolute inset-0 bg-white/5 -z-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} />}
                      </div>
                    </motion.div>
                  </motion.div>

                  <motion.button type="submit" disabled={isLoading} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full relative group mt-2">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg blur opacity-40 group-hover:opacity-70 transition duration-300" />
                    <div className="relative flex items-center justify-center gap-2 w-full bg-black/80 border border-white/10 py-2.5 rounded-lg text-white font-medium hover:bg-black transition-colors disabled:opacity-50 text-sm">
                      {isLoading ? (
                        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full" />
                      ) : (
                        <>Sisteme Giriş <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform"/></>
                      )}
                    </div>
                  </motion.button>
                </form>

                <div className="mt-5 text-center flex flex-col gap-2 relative z-10">
                  <Link href="/" className="text-xs text-white/40 hover:text-white transition-colors">
                    &larr; Ana Sayfaya Dön
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  // ==========================================
  // == GÖRÜNÜM 2: YÖNETİM PANELİ (DASHBOARD)==
  // ==========================================
  return (
    <div className="min-h-screen bg-black text-white flex overflow-hidden">
      {/* Sol Menü */}
      <aside className="w-64 bg-zinc-950/80 border-r border-white/10 backdrop-blur-3xl flex-col hidden md:flex z-20 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        <div className="p-8 border-b border-white/5">
          <Link href="/" className="inline-flex items-center text-xs text-gray-500 hover:text-purple-400 mb-4 transition-colors">
            <ArrowLeft className="mr-1" size={14} /> Siteye Dön
          </Link>
          <h1 className="text-2xl font-extrabold tracking-tighter">
            AuraX <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-400">Admin</span>
          </h1>
          <div className="inline-flex items-center gap-1 mt-2 px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] font-mono text-gray-400 tracking-widest uppercase">
            {currentUser.role === 'founder' ? <Shield className="text-purple-400" size={12} /> : <User size={12} />}
            {currentUser.role === 'founder' ? 'Kurucu' : 'Yönetici'}
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button onClick={() => setActiveTab("dashboard")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${activeTab === "dashboard" ? "bg-purple-600/20 text-purple-400 border border-purple-500/20" : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"}`}>
            <LayoutDashboard size={18} /> Genel Bakış
          </button>
          <button onClick={() => setActiveTab("orders")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${activeTab === "orders" ? "bg-purple-600/20 text-purple-400 border border-purple-500/20" : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"}`}>
            <ShoppingBag size={18} /> Siparişler
            {pendingCount > 0 && <span className="ml-auto bg-purple-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">{pendingCount}</span>}
          </button>
          <button onClick={() => setActiveTab("products")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${activeTab === "products" ? "bg-purple-600/20 text-purple-400 border border-purple-500/20" : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"}`}>
            <Package size={18} /> Ürün Yönetimi
          </button>
          <button onClick={() => setActiveTab("settings")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${activeTab === "settings" ? "bg-purple-600/20 text-purple-400 border border-purple-500/20" : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"}`}>
            <Settings size={18} /> Ayarlar & Profil
          </button>
        </nav>
        <div className="p-4 border-t border-white/5">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all font-medium text-sm">
            <LogOut size={18} /> Çıkış Yap
          </button>
        </div>
      </aside>

      {/* Ana İçerik */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-600/10 blur-[200px] pointer-events-none rounded-full z-0"></div>

        <header className="h-20 bg-zinc-950/50 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-6 md:px-8 z-10">
          <div className="relative w-full max-w-xs">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
            <input type="text" placeholder="Sipariş veya müşteri ara..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-2xl py-2.5 pl-11 pr-4 text-sm text-white focus:border-purple-500 outline-none transition-colors shadow-inner" />
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/10">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${currentUser.role === 'founder' ? 'bg-gradient-to-br from-purple-500 to-indigo-500' : 'bg-gradient-to-br from-gray-600 to-gray-800'}`}>
                {currentUser.role === 'founder' ? <Shield className="text-white" size={10} /> : <User className="text-white" size={10} />}
              </div>
              <span className="text-sm font-bold text-white capitalize">{currentUser.username}</span>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 md:p-8 z-10">
          <AnimatePresence mode="wait">
            
            {activeTab === "dashboard" && (
              <motion.div key="dashboard" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                <h2 className="text-3xl font-extrabold tracking-tight mb-8">Genel Bakış</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                  <div className="bg-zinc-950/60 backdrop-blur-xl border border-white/10 rounded-[24px] p-6 flex items-center gap-6 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                    <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400"><ShoppingBag size={24} /></div>
                    <div><p className="text-gray-400 text-sm font-medium mb-1">Toplam Sipariş</p><h3 className="text-3xl font-extrabold">{orders.length}</h3></div>
                  </div>
                  <div className="bg-zinc-950/60 backdrop-blur-xl border border-white/10 rounded-[24px] p-6 flex items-center gap-6 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                    <div className="w-14 h-14 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400"><Clock size={24} /></div>
                    <div><p className="text-gray-400 text-sm font-medium mb-1">Bekleyen İşler</p><h3 className="text-3xl font-extrabold">{pendingCount}</h3></div>
                  </div>
                  <div className="bg-zinc-950/60 backdrop-blur-xl border border-white/10 rounded-[24px] p-6 flex items-center gap-6 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                    <div className="w-14 h-14 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400"><CheckCircle2 size={24} /></div>
                    <div><p className="text-gray-400 text-sm font-medium mb-1">Kazanım (TL)</p><h3 className="text-3xl font-extrabold">{orders.reduce((acc, o) => acc + (o.total || 0), 0)} ₺</h3></div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "orders" && (
              <motion.div key="orders" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                <div className="flex justify-between items-end mb-8"><h2 className="text-3xl font-extrabold tracking-tight">Sipariş Yönetimi</h2></div>
                <div className="bg-zinc-950/60 backdrop-blur-xl border border-white/10 rounded-[24px] overflow-x-auto shadow-[0_0_40px_rgba(0,0,0,0.5)]">
                  {filteredOrders.length === 0 ? (
                    <div className="p-16 text-center text-gray-500">Gösterilecek sipariş bulunamadı.</div>
                  ) : (
                    <table className="w-full text-left border-collapse min-w-[800px]">
                      <thead>
                        <tr className="border-b border-white/5 bg-white/5">
                          <th className="p-5 text-xs font-mono text-gray-400 uppercase tracking-widest font-bold">Müşteri</th>
                          <th className="p-5 text-xs font-mono text-gray-400 uppercase tracking-widest font-bold">İletişim</th>
                          <th className="p-5 text-xs font-mono text-gray-400 uppercase tracking-widest font-bold">Ürün / Not</th>
                          <th className="p-5 text-xs font-mono text-gray-400 uppercase tracking-widest font-bold">Durum</th>
                          <th className="p-5 text-xs font-mono text-gray-400 uppercase tracking-widest font-bold text-right">İşlem</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredOrders.map((order) => (
                          <tr key={order.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                            <td className="p-5"><p className="font-bold text-white">{order.fullName}</p><p className="text-xs text-gray-500 mt-1">{order.date}</p></td>
                            <td className="p-5 text-sm text-gray-300">{order.contact}</td>
                            <td className="p-5"><p className="text-sm text-purple-300 font-bold mb-1">{order.planName}</p><p className="text-xs text-gray-400 max-w-xs truncate">{order.notes}</p></td>
                            <td className="p-5">
                              <button className="px-3 py-1.5 text-xs font-bold rounded-lg border transition-colors bg-orange-500/10 text-orange-400 border-orange-500/20">
                                {order.status === 'tamamlandi' ? 'Tamamlandı' : 'Bekliyor'}
                              </button>
                            </td>
                            <td className="p-5 text-right">
                              <button onClick={() => deleteOrder(order.id)} className="w-10 h-10 inline-flex items-center justify-center rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors border border-red-500/20">
                                <Trash2 size={18} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === "products" && (
              <motion.div key="products" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                <h2 className="text-3xl font-extrabold tracking-tight mb-8">Ürün Yönetimi</h2>
                <div className="bg-zinc-950/60 backdrop-blur-xl border border-white/10 rounded-[32px] p-16 text-center shadow-[0_0_40px_rgba(0,0,0,0.5)]">
                  <div className="w-20 h-20 bg-purple-500/10 border border-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.2)]"><Package size={32} /></div>
                  <h3 className="text-xl font-bold text-white mb-2">Bu Modül Geliştirme Aşamasında</h3>
                  <p className="text-gray-500 text-sm">Vitrindeki ürünleri ekleme/çıkarma paneli yakında aktif edilecek.</p>
                </div>
              </motion.div>
            )}

            {activeTab === "settings" && (
              <motion.div key="settings" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                <h2 className="text-3xl font-extrabold tracking-tight mb-8">Profil ve Yetkilendirme</h2>
                {settingsMessage && (
                  <div className="mb-6 p-4 bg-purple-500/10 border border-purple-500/30 text-purple-300 rounded-2xl font-bold flex items-center justify-center">
                    {settingsMessage}
                  </div>
                )}
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-zinc-950/60 backdrop-blur-xl border border-white/10 rounded-[24px] p-8 shadow-[0_0_40px_rgba(0,0,0,0.5)] h-fit">
                    <div className="flex items-center gap-4 mb-8 border-b border-white/5 pb-6">
                      <div className="w-12 h-12 bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center rounded-2xl"><Lock size={24} /></div>
                      <div>
                        <h3 className="text-xl font-bold text-white">Güvenlik Ayarları</h3>
                        <p className="text-xs text-gray-500">Kendi hesap şifrenizi güncelleyin</p>
                      </div>
                    </div>
                    <form onSubmit={handleChangeOwnPassword} className="space-y-5">
                      <div>
                        <label className="text-xs text-gray-400 font-mono uppercase tracking-widest ml-1 mb-2 block">Kullanıcı Adınız</label>
                        <input type="text" disabled value={currentUser.username} className="w-full bg-black/30 border border-white/5 rounded-2xl py-3 px-4 text-sm text-gray-500 cursor-not-allowed" />
                      </div>
                      <div>
                        <label className="text-xs text-gray-400 font-mono uppercase tracking-widest ml-1 mb-2 block">Yeni Şifreniz</label>
                        <input type="text" value={ownPassword} onChange={(e) => setOwnPassword(e.target.value)} required className="w-full bg-black/50 border border-white/10 rounded-2xl py-3 px-4 text-sm text-white focus:border-purple-500 outline-none transition-colors" />
                      </div>
                      <button type="submit" className="w-full mt-4 bg-purple-600 hover:bg-purple-500 text-white font-bold py-3.5 rounded-2xl transition-all shadow-[0_0_20px_rgba(168,85,247,0.3)] flex items-center justify-center gap-2">
                        <Save size={18} /> Şifreyi Kaydet
                      </button>
                    </form>
                  </div>

                  {currentUser.role === "founder" ? (
                    <div className="space-y-8">
                      <div className="bg-zinc-950/60 backdrop-blur-xl border border-white/10 rounded-[24px] p-8 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
                        <div className="flex items-center gap-4 mb-8 border-b border-white/5 pb-6">
                          <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center rounded-2xl"><UserPlus size={24} /></div>
                          <div>
                            <h3 className="text-xl font-bold text-white">Yeni Yönetici Ekle</h3>
                            <p className="text-xs text-gray-500">Ekibinize panele erişim yetkisi verin</p>
                          </div>
                        </div>
                        <form onSubmit={handleAddManager} className="space-y-5">
                          <div>
                            <input type="text" placeholder="Yönetici Kullanıcı Adı" value={newManagerUser} onChange={(e) => setNewManagerUser(e.target.value)} required className="w-full bg-black/50 border border-white/10 rounded-2xl py-3 px-4 text-sm text-white focus:border-blue-500 outline-none transition-colors" />
                          </div>
                          <div>
                            <input type="text" placeholder="Geçici Şifre" value={newManagerPass} onChange={(e) => setNewManagerPass(e.target.value)} required className="w-full bg-black/50 border border-white/10 rounded-2xl py-3 px-4 text-sm text-white focus:border-blue-500 outline-none transition-colors" />
                          </div>
                          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-2xl transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] flex items-center justify-center gap-2">
                            <UserPlus size={18} /> Hesabı Oluştur
                          </button>
                        </form>
                      </div>

                      <div className="bg-zinc-950/60 backdrop-blur-xl border border-white/10 rounded-[24px] p-8 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
                        <h3 className="text-xl font-bold text-white mb-6">Mevcut Hesaplar</h3>
                        <div className="space-y-3">
                          {users.map(u => (
                            <div key={u.id} className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-2xl">
                              <div>
                                <p className="font-bold text-white flex items-center gap-2">
                                  {u.username} 
                                  {u.role === 'founder' && <ShieldAlert className="text-purple-400" size={14} />}
                                </p>
                                <p className="text-xs text-gray-500 capitalize">{u.role === 'founder' ? 'Kurucu (Yetki Sınırı Yok)' : 'Yönetici'}</p>
                              </div>
                              {u.role !== 'founder' && (
                                <div className="flex gap-2">
                                  <button onClick={() => toggleUserStatus(u.id, u.isActive)} className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-colors ${u.isActive ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-orange-500/10 text-orange-400 border-orange-500/20'}`}>
                                    {u.isActive ? 'Aktif' : 'Donduruldu'}
                                  </button>
                                  <button onClick={() => deleteUser(u.id)} className="w-8 h-8 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 flex items-center justify-center border border-red-500/20">
                                    <Trash2 size={14} />
                                  </button>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-zinc-950/60 backdrop-blur-xl border border-white/10 rounded-[24px] p-8 shadow-[0_0_40px_rgba(0,0,0,0.5)] opacity-50 flex flex-col items-center justify-center text-center">
                      <ShieldAlert className="text-gray-500 mb-4" size={48} />
                      <h3 className="text-xl font-bold text-white mb-2">Yetkisiz Alan</h3>
                      <p className="text-sm text-gray-400">Diğer hesapları yönetme yetkisi sadece Kurucu hesabına aittir.</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

        
