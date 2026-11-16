"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, ShoppingBag, ArrowLeft, Send, CheckCircle2, ShoppingCart, User, Mail, Phone, MessageSquare, Sparkles, Plus, Minus, Zap, Lock, Clock } from 'lucide-react';
import { useCart } from '@/context/cart-context';
import { useLanguage } from '@/context/language-context';
import Link from 'next/link';
import { Button } from "@/components/ui/button";

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
        <main className="min-h-screen bg-[#09090b] text-[#fafafa] pt-32 pb-24 px-6 md:px-12 relative overflow-hidden font-sans">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[650px] bg-purple-600/12 blur-[240px] pointer-events-none rounded-full" />
            <div className="absolute top-1/4 left-10 w-[450px] h-[450px] bg-indigo-600/10 blur-[200px] pointer-events-none rounded-full" />
            <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-fuchsia-600/10 blur-[220px] pointer-events-none rounded-full" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* 1. Üst Başlık ve Güven Şeridi */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 border-b border-white/[0.08] pb-10">
                    <div>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-mono uppercase tracking-widest font-bold mb-5 shadow-[0_0_20px_rgba(168,85,247,0.15)]">
                            <Sparkles size={14} /> HIZLI SİPARİŞ & İNTERAKTİF ÖDEME
                        </div>
                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter">
                            Sepet<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-400 to-indigo-400">iniz</span>
                        </h1>
                        <p className="text-gray-400 text-base mt-2 max-w-xl">
                            Seçtiğiniz profesyonel hizmetleri inceleyin, bilgilerinizi girerek siparişinizi güvenle tamamlayın.
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        {totalItemCount > 0 && (
                            <div className="px-5 py-3 rounded-2xl bg-[#0d0d14]/90 border border-white/10 backdrop-blur-xl flex items-center gap-3">
                                <div className="w-8 h-8 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400">
                                    <ShoppingBag size={16} />
                                </div>
                                <div>
                                    <div className="text-[10px] font-mono text-gray-400 uppercase">Seçili Hizmet</div>
                                    <div className="text-sm font-extrabold text-white font-mono">{totalItemCount} Kalem</div>
                                </div>
                            </div>
                        )}
                        <Button asChild variant="outline" className="rounded-2xl h-12 px-6 border-white/10 bg-white/[0.03] hover:bg-white/10 text-white font-medium transition-all duration-300">
                            <Link href="/">
                                <ArrowLeft size={18} className="mr-2" /> {t?.backBtn || "Ana Sayfa"}
                            </Link>
                        </Button>
                    </div>
                </div>

                {submitted ? (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }} 
                        animate={{ opacity: 1, scale: 1 }} 
                        className="relative rounded-[32px] p-[1px] bg-gradient-to-b from-green-500/50 via-purple-500/30 to-transparent shadow-[0_0_80px_rgba(34,197,94,0.15)] max-w-xl mx-auto my-12"
                    >
                        <div className="bg-[#0d0d14]/95 backdrop-blur-3xl rounded-[31px] p-12 text-center space-y-6 border border-white/[0.06]">
                            <div className="w-20 h-20 bg-green-500/20 border border-green-500/40 rounded-3xl flex items-center justify-center text-green-400 mx-auto shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                                <CheckCircle2 size={40} />
                            </div>
                            <div className="space-y-3">
                                <h3 className="text-3xl font-extrabold tracking-tight text-white">Siparişiniz Başarıyla Alındı!</h3>
                                <p className="text-sm text-gray-400 leading-relaxed max-w-md mx-auto">
                                    Talebiniz başarıyla veritabanımıza kaydedildi ve ekibimize e-posta ile bildirildi. En kısa sürede sizinle iletişime geçeceğiz.
                                </p>
                            </div>
                            <div className="pt-4">
                                <Button asChild className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold h-14 rounded-2xl shadow-[0_0_30px_rgba(168,85,247,0.35)]">
                                    <Link href="/">Ana Sayfaya Dön</Link>
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                ) : cart.length === 0 ? (
                    /* 3. Boş Sepet Ekranı (Empty State) */
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-xl mx-auto my-12 bg-[#0d0d14]/80 backdrop-blur-2xl border border-white/[0.08] rounded-[32px] p-12 text-center shadow-[0_0_50px_rgba(0,0,0,0.5)]"
                    >
                        <div className="w-24 h-24 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-[28px] flex items-center justify-center mb-6 mx-auto shadow-[0_0_35px_rgba(168,85,247,0.2)] animate-pulse">
                            <ShoppingCart size={42} />
                        </div>
                        <h2 className="text-2xl font-extrabold text-white tracking-tight">Sepetiniz Şu An Boş</h2>
                        <p className="text-gray-400 text-sm max-w-sm mx-auto mt-3 leading-relaxed">
                            Vitrindeki profesyonel yazılım çözümleri, özel tasarımlar veya bot sistemlerini inceleyerek sepetinizi doldurmaya başlayın.
                        </p>
                        <div className="mt-8">
                            <Button asChild className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-2xl px-8 h-14 shadow-[0_0_25px_rgba(168,85,247,0.3)]">
                                <Link href="/#services">Hizmetleri Keşfet</Link>
                            </Button>
                        </div>
                    </motion.div>
                ) : (
                    /* 2. Asimetrik 2 Sütunlu Yerleşim */
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        {/* Sol Sütun (lg:col-span-7) — Katmanlı Hizmet Kartları */}
                        <div className="lg:col-span-7 space-y-4">
                            <div className="flex justify-between items-center bg-[#0d0d14]/60 border border-white/[0.08] px-6 py-4 rounded-2xl backdrop-blur-xl">
                                <span className="text-xs font-mono uppercase tracking-wider text-gray-400 font-bold">
                                    Seçilen Hizmetler ({totalItemCount})
                                </span>
                                <button 
                                    onClick={clearCart} 
                                    className="text-xs text-red-400 hover:text-red-300 font-medium transition-colors hover:underline"
                                >
                                    Sepeti Temizle
                                </button>
                            </div>

                            <AnimatePresence>
                                {cart.map((item) => {
                                    const qty = item.quantity || 1;
                                    const itemTotal = item.price * qty;
                                    return (
                                        <motion.div
                                            key={item.id}
                                            layout
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 25 }}
                                            className="bg-[#0d0d15]/90 backdrop-blur-xl border border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.07)] hover:border-purple-500/40 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 group transition-all duration-300"
                                        >
                                            {/* Sol: Mor tonlu ikon kutusu + Bilgi */}
                                            <div className="flex items-center gap-4">
                                                {item.image ? (
                                                    <img 
                                                        src={item.image} 
                                                        alt={item.title} 
                                                        className="w-16 h-16 rounded-xl object-cover border border-white/10 shadow-md group-hover:scale-105 transition-transform duration-300 flex-shrink-0" 
                                                    />
                                                ) : (
                                                    <div className="w-16 h-16 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shadow-inner flex-shrink-0">
                                                        <ShoppingBag size={22} />
                                                    </div>
                                                )}
                                                <div>
                                                    <span className="text-[10px] font-mono text-purple-400 uppercase tracking-widest font-bold bg-purple-500/10 px-2.5 py-1 rounded-md border border-purple-500/20">
                                                        {item.category || 'Hizmet'}
                                                    </span>
                                                    <h4 className="font-extrabold text-white text-base tracking-tight mt-2">{item.title}</h4>
                                                    <div className="text-xs text-gray-400 font-mono mt-0.5">
                                                        Birim Fiyat: <span className="text-purple-300 font-bold">{item.price} ₺</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Sağ: Dokunsal adet kontrolü hapı, satır toplamı, silme */}
                                            <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 pt-3 sm:pt-0 border-t sm:border-t-0 border-white/5">
                                                <div className="text-right sm:mr-2">
                                                    <div className="text-[10px] font-mono text-gray-500 uppercase">Toplam</div>
                                                    <div className="text-sm font-mono font-extrabold text-white tabular-nums">{itemTotal} ₺</div>
                                                </div>

                                                {/* Dokunsal Adet Kontrolü Hapı */}
                                                <div className="flex items-center gap-1 bg-white/[0.04] border border-white/10 rounded-xl p-1 shadow-inner">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, -1)}
                                                        className="w-7 h-7 rounded-lg bg-white/5 hover:bg-purple-500/20 flex items-center justify-center text-gray-300 hover:text-purple-300 transition-colors"
                                                        title="Adet Azalt"
                                                    >
                                                        <Minus size={12} />
                                                    </button>
                                                    <span className="w-8 text-center font-mono font-bold text-xs tabular-nums">{qty}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, 1)}
                                                        className="w-7 h-7 rounded-lg bg-white/5 hover:bg-purple-500/20 flex items-center justify-center text-gray-300 hover:text-purple-300 transition-colors"
                                                        title="Adet Arttır"
                                                    >
                                                        <Plus size={12} />
                                                    </button>
                                                </div>

                                                <button 
                                                    onClick={() => removeFromCart(item.id)} 
                                                    className="w-10 h-10 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 flex items-center justify-center border border-red-500/20 transition-all duration-200 hover:scale-105" 
                                                    title="Ürünü Sepetten Kaldır"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </AnimatePresence>

                            <div className="pt-2">
                                <Link href="/#services" className="inline-flex items-center gap-2 text-xs font-mono text-purple-400 hover:text-purple-300 transition-colors">
                                    <ArrowLeft size={14} /> Alışverişe / Hizmetlere Devam Et
                                </Link>
                            </div>
                        </div>

                        {/* Sağ Sütun (lg:col-span-5) — lg:sticky lg:top-24 Kompakt Sipariş ve İletişim Kartı */}
                        <div className="lg:col-span-5 lg:sticky lg:top-24">
                            <div className="bg-[#0d0d14]/90 backdrop-blur-3xl border border-white/[0.08] rounded-[32px] p-8 shadow-[0_0_60px_rgba(0,0,0,0.6)] relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

                                <h2 className="text-2xl font-extrabold mb-1 tracking-tight">Sipariş Özeti</h2>
                                <p className="text-xs text-gray-400 mb-6">Bilgilerinizi girerek siparişinizi onaylayın.</p>

                                {/* Kalem kalem özet ve neon genel toplam */}
                                <div className="bg-black/50 border border-white/[0.06] rounded-2xl p-5 mb-6 space-y-3">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-400">Ara Toplam ({totalItemCount} Kalem)</span>
                                        <span className="font-mono font-medium text-white tabular-nums">{cartTotal} ₺</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-400">Kurulum & Danışmanlık</span>
                                        <span className="font-mono text-green-400 font-bold uppercase text-xs bg-green-500/10 px-2 py-0.5 rounded">Ücretsiz</span>
                                    </div>
                                    <div className="border-t border-white/[0.08] pt-3 flex justify-between items-center">
                                        <span className="text-sm font-extrabold text-white">Genel Toplam</span>
                                        <span className="font-mono text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-400 to-indigo-400 tabular-nums">
                                            {cartTotal} ₺
                                        </span>
                                    </div>
                                </div>

                                <form onSubmit={handleCheckout} className="space-y-4">
                                    {/* Kompakt 2'li Grid: Ad Soyad & E-posta/Telefon */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <label className="text-xs text-gray-300 font-mono uppercase tracking-wider flex items-center gap-1.5">
                                                <User size={12} className="text-purple-400" /> Ad Soyad <span className="text-purple-400">*</span>
                                            </label>
                                            <input 
                                                type="text" 
                                                required 
                                                placeholder="Adınız Soyadınız" 
                                                value={fullName} 
                                                onChange={e => setFullName(e.target.value)} 
                                                className="w-full px-3.5 py-2.5 bg-white/[0.03] border border-white/10 rounded-xl text-xs text-white placeholder:text-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all shadow-inner" 
                                            />
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-xs text-gray-300 font-mono uppercase tracking-wider flex items-center gap-1.5">
                                                <Mail size={12} className="text-purple-400" /> İletişim <span className="text-purple-400">*</span>
                                            </label>
                                            <input 
                                                type="text" 
                                                required 
                                                placeholder="Discord / E-posta" 
                                                value={contact} 
                                                onChange={e => setContact(e.target.value)} 
                                                className="w-full px-3.5 py-2.5 bg-white/[0.03] border border-white/10 rounded-xl text-xs text-white placeholder:text-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all shadow-inner" 
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <label className="text-xs text-gray-300 font-mono uppercase tracking-wider flex items-center gap-1.5">
                                                <Phone size={12} className="text-purple-400" /> Telefon
                                            </label>
                                            <input 
                                                type="tel" 
                                                placeholder="05XX XXX XX XX" 
                                                value={phone} 
                                                onChange={e => setPhone(e.target.value)} 
                                                className="w-full px-3.5 py-2.5 bg-white/[0.03] border border-white/10 rounded-xl text-xs text-white placeholder:text-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all shadow-inner" 
                                            />
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-xs text-gray-300 font-mono uppercase tracking-wider flex items-center gap-1.5">
                                                <MessageSquare size={12} className="text-purple-400" /> Not
                                            </label>
                                            <input 
                                                type="text" 
                                                placeholder="Proje notu..." 
                                                value={notes} 
                                                onChange={e => setNotes(e.target.value)} 
                                                className="w-full px-3.5 py-2.5 bg-white/[0.03] border border-white/10 rounded-xl text-xs text-white placeholder:text-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all shadow-inner" 
                                            />
                                        </div>
                                    </div>

                                    <div className="pt-2">
                                        <Button
                                            type="submit"
                                            disabled={cart.length === 0 || isSubmitting}
                                            className="w-full bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold py-4 rounded-xl transition-all shadow-[0_0_30px_rgba(168,85,247,0.35)] h-14 disabled:opacity-50 text-base"
                                        >
                                            {isSubmitting ? (
                                                <span className="flex items-center gap-2 justify-center">
                                                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" /> Sipariş Gönderiliyor...
                                                </span>
                                            ) : (
                                                <span className="flex items-center justify-center gap-2">
                                                    <Send size={18} /> Siparişi Onayla
                                                </span>
                                            )}
                                        </Button>
                                    </div>
                                </form>

                                {/* Güven Rozetleri */}
                                <div className="grid grid-cols-3 gap-2 mt-6 pt-6 border-t border-white/[0.06] text-center">
                                    <div className="flex flex-col items-center gap-1">
                                        <Zap size={16} className="text-purple-400" />
                                        <span className="text-[10px] text-gray-400 font-medium">Hızlı Teslimat</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-1">
                                        <Clock size={16} className="text-purple-400" />
                                        <span className="text-[10px] text-gray-400 font-medium">7/24 Destek</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-1">
                                        <Lock size={16} className="text-purple-400" />
                                        <span className="text-[10px] text-gray-400 font-medium">Güvenli İşlem</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
