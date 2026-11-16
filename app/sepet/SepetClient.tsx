"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, ShoppingBag, ArrowLeft, Send, CheckCircle2, ShoppingCart, User, Mail, Phone, MessageSquare, Sparkles, Plus, Minus, Zap, Lock, Clock, CreditCard, ChevronRight } from 'lucide-react';
import { useCart } from '@/context/cart-context';
import { useLanguage } from '@/context/language-context';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function SepetClient() {
    const { cart, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
    const { t } = useLanguage();

    const [fullName, setFullName] = useState('');
    const [contact, setContact] = useState('');
    const [phone, setPhone] = useState('');
    const [notes, setNotes] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleCheckout = async (e: React.FormEvent) => {
        e.preventDefault();
        if (cart.length === 0) return;
        setIsSubmitting(true);

        try {
            const res = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    customer_info: { 
                        fullName, 
                        contact, 
                        phone,
                        notes 
                    },
                    items: cart,
                    total: cartTotal
                })
            });
            const data = await res.json();
            if (!res.ok || !data.success) {
                throw new Error(data.error || data.message || 'Sipariş verilemedi');
            }

            setSubmitted(true);
            clearCart();
            
        } catch (error: any) {
            console.error("Sipariş gönderilirken hata oluştu:", error);
            alert(error.message || "Siparişiniz gönderilirken bir sorun oluştu. Lütfen tekrar deneyin.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const totalItemCount = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);

    return (
        <main className="min-h-screen bg-[#07070b] text-[#fafafa] pt-28 pb-24 px-4 sm:px-6 lg:px-12 relative overflow-hidden font-sans">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-purple-600/10 blur-[200px] pointer-events-none rounded-full" />
            <div className="absolute top-1/3 left-10 w-[400px] h-[400px] bg-indigo-600/10 blur-[180px] pointer-events-none rounded-full" />
            <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-fuchsia-600/10 blur-[200px] pointer-events-none rounded-full" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* 1. Minimalist Üst Adım Çubuğu (Checkout Header) */}
                <motion.div 
                    initial={{ opacity: 0, y: -15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12 border-b border-white/[0.08] pb-8"
                >
                    <div className="space-y-2">
                        {/* İnce Breadcrumb */}
                        <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                            <Link href="/" className="hover:text-purple-400 transition-colors">Ana Sayfa</Link>
                            <span className="text-zinc-600">/</span>
                            <span className="text-purple-400 font-medium">Sepet & Ödeme</span>
                        </div>
                        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
                            Hızlı <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-400 to-indigo-400">Checkout</span>
                        </h1>
                    </div>

                    {/* 3 Adımlı Görsel Süreç Göstergesi */}
                    <div className="hidden md:flex items-center gap-3 bg-[#0b0b12]/90 border border-white/[0.08] px-5 py-3 rounded-2xl backdrop-blur-xl">
                        <div className="flex items-center gap-2 text-xs font-mono">
                            <span className="w-6 h-6 rounded-lg bg-purple-500 text-white font-bold flex items-center justify-center shadow-[0_0_12px_rgba(168,85,247,0.4)]">01</span>
                            <span className="text-purple-300 font-semibold">Hizmet Seçimi</span>
                        </div>
                        <ChevronRight size={14} className="text-zinc-600" />
                        <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                            <span className="w-6 h-6 rounded-lg bg-white/[0.06] border border-white/10 flex items-center justify-center">02</span>
                            <span>Müşteri Bilgileri</span>
                        </div>
                        <ChevronRight size={14} className="text-zinc-600" />
                        <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                            <span className="w-6 h-6 rounded-lg bg-white/[0.06] border border-white/10 flex items-center justify-center">03</span>
                            <span>Onay & Teslimat</span>
                        </div>
                    </div>

                    {/* Sağda "Sepeti Temizle" ve Geri Dön */}
                    <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
                        {cart.length > 0 && (
                            <button 
                                onClick={clearCart} 
                                className="px-4 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-red-400 text-xs font-medium transition-all flex items-center gap-2"
                            >
                                <Trash2 size={14} /> Sepeti Temizle
                            </button>
                        )}
                        <Button asChild variant="outline" className="rounded-xl h-10 px-5 border-white/10 bg-white/[0.03] hover:bg-white/10 text-white text-xs font-medium transition-all">
                            <Link href="/">
                                <ArrowLeft size={14} className="mr-2" /> Ana Sayfa
                            </Link>
                        </Button>
                    </div>
                </motion.div>

                {submitted ? (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }} 
                        animate={{ opacity: 1, scale: 1 }} 
                        className="relative rounded-[32px] p-[1px] bg-gradient-to-b from-green-500/50 via-purple-500/30 to-transparent shadow-[0_0_80px_rgba(34,197,94,0.15)] max-w-xl mx-auto my-12"
                    >
                        <div className="bg-[#0b0b12]/95 backdrop-blur-3xl rounded-[31px] p-12 text-center space-y-6 border border-white/[0.06]">
                            <div className="w-20 h-20 bg-green-500/20 border border-green-500/40 rounded-3xl flex items-center justify-center text-green-400 mx-auto shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                                <CheckCircle2 size={40} />
                            </div>
                            <div className="space-y-3">
                                <h3 className="text-3xl font-extrabold tracking-tight text-white">Siparişiniz Başarıyla Alındı!</h3>
                                <p className="text-sm text-zinc-400 leading-relaxed max-w-md mx-auto">
                                    Talebiniz başarıyla veritabanımıza kaydedildi. Ekibimiz en kısa sürede sizinle iletişime geçecektir.
                                </p>
                            </div>
                            <div className="pt-4">
                                <Button asChild className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold h-12 rounded-xl shadow-[0_0_25px_rgba(168,85,247,0.35)]">
                                    <Link href="/">Ana Sayfaya Dön</Link>
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                ) : cart.length === 0 ? (
                    /* Boş Sepet Durumu */
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-xl mx-auto my-12 bg-[#0b0b12]/90 backdrop-blur-2xl border border-white/[0.08] rounded-[32px] p-12 text-center shadow-[0_0_50px_rgba(0,0,0,0.5)]"
                    >
                        <div className="w-20 h-20 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-3xl flex items-center justify-center mb-6 mx-auto shadow-[0_0_35px_rgba(168,85,247,0.2)]">
                            <ShoppingCart size={36} />
                        </div>
                        <h2 className="text-2xl font-extrabold text-white tracking-tight">Sepetiniz Boş</h2>
                        <p className="text-zinc-400 text-sm max-w-sm mx-auto mt-2 leading-relaxed">
                            Vitrindeki özel yazılım çözümleri, bot sistemleri veya tasarımları inceleyerek sepetinizi doldurmaya başlayın.
                        </p>
                        <div className="mt-8">
                            <Button asChild className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-xl px-8 h-12 shadow-[0_0_25px_rgba(168,85,247,0.3)]">
                                <Link href="/#services">Hizmetleri İncele</Link>
                            </Button>
                        </div>
                    </motion.div>
                ) : (
                    /* 2 Sütunlu Düzen */
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        {/* Sol Sütun (`lg:col-span-7`) — 21st.dev Tarzı İnteraktif Hizmet Listesi */}
                        <div className="lg:col-span-7 space-y-4">
                            <div className="flex justify-between items-center bg-[#0b0b12]/95 border border-white/[0.08] px-5 py-3.5 rounded-2xl backdrop-blur-xl">
                                <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold flex items-center gap-2">
                                    <ShoppingBag size={14} className="text-purple-400" /> Seçili Hizmetler ({totalItemCount})
                                </span>
                                <span className="text-xs font-mono text-purple-400">Anlık Hesaplama</span>
                            </div>

                            <div className="space-y-3">
                                <AnimatePresence initial={false} mode="popLayout">
                                    {cart.map((item) => {
                                        const qty = item.quantity || 1;
                                        const itemTotal = item.price * qty;
                                        return (
                                            <motion.div
                                                key={item.id}
                                                layout
                                                initial={{ opacity: 0, scale: 0.96, y: 15 }}
                                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                                exit={{ opacity: 0, scale: 0.96, y: -15 }}
                                                transition={{ opacity: { duration: 0.2 }, layout: { duration: 0.2 } }}
                                                className={cn(
                                                    "group",
                                                    "bg-[#0b0b12]/95 border border-white/[0.08]",
                                                    "hover:border-purple-500/50 rounded-2xl p-4",
                                                    "flex items-center justify-between gap-4",
                                                    "backdrop-blur-xl transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
                                                )}
                                            >
                                                {/* Sol: Mor gradient çerçeveli hizmet ikonu, başlık, kategori rozeti, birim fiyat */}
                                                <div className="flex items-center gap-4 min-w-0">
                                                    {item.image ? (
                                                        <div className="relative w-14 h-14 rounded-xl overflow-hidden border border-white/10 flex-shrink-0 bg-zinc-900">
                                                            <img src={item.image} alt={item.title} className="object-cover w-full h-full" />
                                                        </div>
                                                    ) : (
                                                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500/20 to-indigo-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400 flex-shrink-0 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
                                                            <Sparkles size={20} />
                                                        </div>
                                                    )}
                                                    <div className="min-w-0">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <span className="text-[10px] font-mono text-purple-400 uppercase tracking-widest font-bold bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                                                                {item.category || 'Özel Hizmet'}
                                                            </span>
                                                        </div>
                                                        <h3 className="font-bold text-white text-sm sm:text-base tracking-tight truncate">{item.title}</h3>
                                                        <div className="text-xs text-zinc-400 font-mono mt-0.5">
                                                            Birim Fiyat: <span className="text-purple-300 font-semibold">{item.price} ₺</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Sağ: Yay animasyonlu - / + adet hapı, tabular-nums toplam tutar, silme */}
                                                <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
                                                    {/* Yay animasyonlu - / + adet hapı */}
                                                    <div className="flex items-center gap-1 bg-white/[0.04] border border-white/10 rounded-xl p-1 shadow-inner">
                                                        <motion.button
                                                            whileHover={{ scale: 1.1 }}
                                                            whileTap={{ scale: 0.95 }}
                                                            onClick={() => updateQuantity(item.id, -1)}
                                                            className="w-7 h-7 rounded-lg bg-white/5 hover:bg-purple-500/20 flex items-center justify-center text-zinc-300 hover:text-purple-300 transition-colors"
                                                            title="Azalt"
                                                        >
                                                            <Minus size={12} />
                                                        </motion.button>
                                                        <motion.span
                                                            layout
                                                            className="w-7 text-center font-mono font-bold text-xs tabular-nums text-white"
                                                        >
                                                            {qty}
                                                        </motion.span>
                                                        <motion.button
                                                            whileHover={{ scale: 1.1 }}
                                                            whileTap={{ scale: 0.95 }}
                                                            onClick={() => updateQuantity(item.id, 1)}
                                                            className="w-7 h-7 rounded-lg bg-white/5 hover:bg-purple-500/20 flex items-center justify-center text-zinc-300 hover:text-purple-300 transition-colors"
                                                            title="Arttır"
                                                        >
                                                            <Plus size={12} />
                                                        </motion.button>
                                                    </div>

                                                    {/* Kalem Toplam Tutar */}
                                                    <div className="text-right min-w-[70px]">
                                                        <div className="text-[10px] font-mono text-zinc-500 uppercase">Toplam</div>
                                                        <div className="text-sm font-mono font-extrabold text-white tabular-nums">{itemTotal} ₺</div>
                                                    </div>

                                                    {/* Kırmızı hover efektli silme butonu */}
                                                    <motion.button 
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        onClick={() => removeFromCart(item.id)} 
                                                        className="w-9 h-9 rounded-xl bg-red-500/10 hover:bg-red-500/25 text-red-400 flex items-center justify-center border border-red-500/20 transition-all duration-200"
                                                        title="Kaldır"
                                                    >
                                                        <Trash2 size={15} />
                                                    </motion.button>
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </AnimatePresence>
                            </div>

                            {/* Liste altında kesikli çerçeveli "+ Yeni Hizmet Ekle" yönlendirme satırı */}
                            <Link 
                                href="/#services"
                                className="w-full border border-dashed border-white/15 hover:border-purple-500/50 bg-[#0b0b12]/60 hover:bg-[#0b0b12] rounded-2xl p-4 flex items-center justify-center gap-2 text-zinc-400 hover:text-purple-300 transition-all duration-300 text-xs font-mono font-medium group"
                            >
                                <Plus size={16} className="text-purple-400 group-hover:rotate-90 transition-transform duration-300" /> + Yeni Hizmet Ekle & Vitrini İncele
                            </Link>
                        </div>

                        {/* Sağ Sütun (`lg:col-span-5`, `lg:sticky lg:top-24`) — Dijital Fatura & Hızlı Sipariş Kartı */}
                        <div className="lg:col-span-5 lg:sticky lg:top-24">
                            <motion.div 
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3 }}
                                className="bg-[#0b0b12]/95 backdrop-blur-3xl border border-white/[0.08] rounded-[32px] p-6 sm:p-8 shadow-[0_0_60px_rgba(0,0,0,0.6)] relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

                                <h2 className="text-xl font-extrabold mb-1 tracking-tight">Dijital Fatura & Sipariş</h2>
                                <p className="text-xs text-zinc-400 mb-6">Bilgilerinizi girerek işlemi tamamlayın.</p>

                                {/* Üst bölümde dijital makbuz / fatura görünümü */}
                                <div className="bg-black/40 border border-white/[0.06] rounded-2xl p-5 mb-6 space-y-3">
                                    <div className="flex justify-between items-center text-xs text-zinc-400 font-mono">
                                        <span>Hizmet Kalemleri ({totalItemCount})</span>
                                        <span className="text-white">{cartTotal} ₺</span>
                                    </div>
                                    <div className="flex justify-between items-center text-xs text-zinc-400 font-mono">
                                        <span>KDV & İşlem Ücreti</span>
                                        <span className="text-green-400 font-bold uppercase bg-green-500/10 px-2 py-0.5 rounded">Dahil / Ücretsiz</span>
                                    </div>

                                    {/* Kesikli ayırıcı çizgi */}
                                    <div className="border-t border-dashed border-white/10 my-2" />

                                    <div className="flex justify-between items-center pt-1">
                                        <span className="text-sm font-extrabold text-white">Ödenecek Toplam</span>
                                        <motion.span 
                                            key={cartTotal}
                                            initial={{ scale: 1.05 }}
                                            animate={{ scale: 1 }}
                                            className="font-mono text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-400 to-indigo-400 tabular-nums"
                                        >
                                            {cartTotal} ₺
                                        </motion.span>
                                    </div>
                                </div>

                                {/* Alt bölümde kompakt form */}
                                <form onSubmit={handleCheckout} className="space-y-4">
                                    {/* Ad Soyad ve Telefon / Discord yan yana (grid-cols-2 gap-3) */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <div className="space-y-1.5">
                                            <label className="text-xs text-zinc-300 font-mono uppercase tracking-wider flex items-center gap-1.5">
                                                <User size={12} className="text-purple-400" /> Ad Soyad <span className="text-purple-400">*</span>
                                            </label>
                                            <input 
                                                type="text" 
                                                required 
                                                placeholder="Adınız Soyadınız" 
                                                value={fullName} 
                                                onChange={e => setFullName(e.target.value)} 
                                                className="w-full px-3.5 py-3 bg-black/40 border border-white/10 focus:border-purple-500 rounded-xl text-xs text-white placeholder:text-zinc-600 outline-none transition-all shadow-inner" 
                                            />
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-xs text-zinc-300 font-mono uppercase tracking-wider flex items-center gap-1.5">
                                                <Mail size={12} className="text-purple-400" /> İletişim / Discord <span className="text-purple-400">*</span>
                                            </label>
                                            <input 
                                                type="text" 
                                                required 
                                                placeholder="Discord veya E-posta" 
                                                value={contact} 
                                                onChange={e => setContact(e.target.value)} 
                                                className="w-full px-3.5 py-3 bg-black/40 border border-white/10 focus:border-purple-500 rounded-xl text-xs text-white placeholder:text-zinc-600 outline-none transition-all shadow-inner" 
                                            />
                                        </div>
                                    </div>

                                    {/* E-posta ve kısa Proje Notu alanı */}
                                    <div className="space-y-1.5">
                                        <label className="text-xs text-zinc-300 font-mono uppercase tracking-wider flex items-center gap-1.5">
                                            <Phone size={12} className="text-purple-400" /> Telefon Numarası
                                        </label>
                                        <input 
                                            type="tel" 
                                            placeholder="05XX XXX XX XX" 
                                            value={phone} 
                                            onChange={e => setPhone(e.target.value)} 
                                            className="w-full px-3.5 py-3 bg-black/40 border border-white/10 focus:border-purple-500 rounded-xl text-xs text-white placeholder:text-zinc-600 outline-none transition-all shadow-inner" 
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-xs text-zinc-300 font-mono uppercase tracking-wider flex items-center gap-1.5">
                                            <MessageSquare size={12} className="text-purple-400" /> Proje Notu
                                        </label>
                                        <input 
                                            type="text" 
                                            placeholder="Eklemek istediğiniz detaylar..." 
                                            value={notes} 
                                            onChange={e => setNotes(e.target.value)} 
                                            className="w-full px-3.5 py-3 bg-black/40 border border-white/10 focus:border-purple-500 rounded-xl text-xs text-white placeholder:text-zinc-600 outline-none transition-all shadow-inner" 
                                        />
                                    </div>

                                    {/* En altta parlak mor-indigo gradient, hover parlamalı tam genişlik "Siparişi Onayla & Gönder" butonu */}
                                    <div className="pt-2">
                                        <Button
                                            type="submit"
                                            disabled={cart.length === 0 || isSubmitting}
                                            className="w-full bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold py-4 rounded-xl transition-all shadow-[0_0_30px_rgba(168,85,247,0.35)] hover:shadow-[0_0_40px_rgba(168,85,247,0.5)] h-14 disabled:opacity-50 text-sm tracking-wide"
                                        >
                                            {isSubmitting ? (
                                                <span className="flex items-center gap-2 justify-center">
                                                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" /> Sipariş Gönderiliyor...
                                                </span>
                                            ) : (
                                                <span className="flex items-center justify-center gap-2">
                                                    <CreditCard size={16} /> Siparişi Onayla & Gönder
                                                </span>
                                            )}
                                        </Button>
                                    </div>
                                </form>

                                {/* Güven Rozetleri */}
                                <div className="grid grid-cols-3 gap-2 mt-6 pt-6 border-t border-white/[0.06] text-center">
                                    <div className="flex flex-col items-center gap-1">
                                        <Zap size={14} className="text-purple-400" />
                                        <span className="text-[10px] text-zinc-400 font-medium">Hızlı Teslim</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-1">
                                        <Clock size={14} className="text-purple-400" />
                                        <span className="text-[10px] text-zinc-400 font-medium">7/24 Destek</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-1">
                                        <Lock size={14} className="text-purple-400" />
                                        <span className="text-[10px] text-zinc-400 font-medium">Güvenli İşlem</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
