"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, ShoppingBag, ArrowLeft, Send, CheckCircle2, ShoppingCart, User, Mail, FileText, Sparkles, ShieldCheck } from 'lucide-react';
import { useCart } from '@/context/cart-context';
import { useLanguage } from '@/context/language-context';
import Link from 'next/link';

import { Button } from "@/components/ui/button";
import { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyContent } from "@/components/ui/empty";

export default function SepetClient() {
    const { cart, removeFromCart, clearCart, cartTotal } = useCart();
    const { t } = useLanguage();

    const [fullName, setFullName] = useState('');
    const [contact, setContact] = useState('');
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
                        fullName: fullName, 
                        contact: contact, 
                        notes: notes 
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

        setTimeout(() => setSubmitted(false), 5000);
    };

    return (
        <main className="min-h-screen bg-black text-white pt-32 pb-24 px-6 md:px-12 relative overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-purple-600/15 blur-[220px] pointer-events-none rounded-full" />
            <div className="absolute top-1/3 left-10 w-[400px] h-[400px] bg-indigo-600/10 blur-[180px] pointer-events-none rounded-full" />

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 border-b border-white/5 pb-10">
                    <div>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-mono uppercase tracking-widest font-bold mb-6 shadow-[0_0_20px_rgba(168,85,247,0.15)]">
                            <Sparkles size={14} /> Güvenli Alışveriş Sepeti
                        </div>
                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter">
                            Sipariş ve <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-400">Teslimat</span>
                        </h1>
                    </div>
                    <Button asChild variant="outline" className="rounded-xl h-12 border-white/10 bg-white/[0.03] hover:bg-white/10 text-white">
                        <Link href="/">
                            <ArrowLeft size={18} className="mr-2" /> {t?.backBtn || "Ana Sayfa"}
                        </Link>
                    </Button>
                </div>

                {submitted ? (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative rounded-[32px] p-[1px] bg-gradient-to-b from-green-500/50 via-purple-500/30 to-transparent shadow-[0_0_80px_rgba(34,197,94,0.15)] max-w-lg mx-auto">
                        <div className="bg-zinc-950/90 backdrop-blur-3xl rounded-[31px] p-12 text-center space-y-6 border border-white/[0.05]">
                            <div className="w-20 h-20 bg-green-500/20 border border-green-500/40 rounded-2xl flex items-center justify-center text-green-400 mx-auto shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                                <CheckCircle2 size={40} />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-3xl font-extrabold tracking-tight">Siparişiniz Başarıyla Alındı!</h3>
                                <p className="text-sm text-gray-400 leading-relaxed">Talebiniz ekibimize iletildi. Discord veya e-posta adresiniz üzerinden en kısa sürede sizinle iletişime geçeceğiz.</p>
                            </div>
                            <div className="pt-2">
                                <Button asChild className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold h-12 rounded-xl shadow-[0_0_20px_rgba(168,85,247,0.3)]">
                                    <Link href="/">Ana Sayfaya Dön</Link>
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        {/* Sol Taraf - Ürün Listesi */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="flex justify-between items-center bg-white/[0.02] border border-white/5 px-6 py-4 rounded-2xl backdrop-blur-xl">
                                <span className="text-sm font-bold text-gray-300">Sepetteki Hizmetler ({cart.length})</span>
                                {cart.length > 0 && (
                                    <span className="px-4 py-1.5 bg-purple-500/10 border border-purple-500/25 text-purple-400 rounded-xl text-sm font-mono font-bold shadow-inner">
                                        Toplam: {cartTotal} ₺
                                    </span>
                                )}
                            </div>

                            {cart.length === 0 ? (
                                <Empty className="py-24 bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-[32px]">
                                    <EmptyHeader>
                                        <div className="w-20 h-20 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-3xl flex items-center justify-center mb-6 mx-auto shadow-[0_0_30px_rgba(168,85,247,0.2)]">
                                            <ShoppingCart size={36} />
                                        </div>
                                        <EmptyTitle className="text-2xl font-bold text-white tracking-tight">Sepetiniz Şu An Boş</EmptyTitle>
                                        <EmptyDescription className="text-gray-400 text-sm max-w-md mx-auto mt-2 leading-relaxed">
                                            Vitrindeki profesyonel yazılım çözümleri, özel tasarımlar veya bot sistemlerini inceleyerek sepetinizi doldurmaya başlayın.
                                        </EmptyDescription>
                                    </EmptyHeader>
                                    <EmptyContent className="mt-8">
                                        <Button asChild className="bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl px-8 h-12 shadow-[0_0_20px_rgba(168,85,247,0.3)]">
                                            <Link href="/#services">Hizmetleri Keşfet</Link>
                                        </Button>
                                    </EmptyContent>
                                </Empty>
                            ) : (
                                <div className="space-y-4">
                                    <AnimatePresence>
                                        {cart.map((item: any, index: number) => (
                                            <motion.div
                                                key={item.cartId || index}
                                                layout
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, x: -50 }}
                                                transition={{ duration: 0.3 }}
                                                className="bg-zinc-950/60 backdrop-blur-xl border border-white/[0.08] rounded-[24px] p-6 flex items-center justify-between gap-6 shadow-[0_0_30px_rgba(0,0,0,0.4)] hover:border-purple-500/30 transition-all duration-300 group"
                                            >
                                                <div className="flex items-center gap-5">
                                                    {item.image ? (
                                                        <img src={item.image} alt={item.title} className="w-20 h-20 rounded-2xl object-cover border border-white/10 shadow-lg group-hover:scale-105 transition-transform duration-300" />
                                                    ) : (
                                                        <div className="w-20 h-20 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shadow-inner">
                                                            <ShoppingBag size={24} />
                                                        </div>
                                                    )}
                                                    <div>
                                                        <span className="text-[10px] font-mono text-purple-400 uppercase tracking-widest font-bold bg-purple-500/10 px-2.5 py-1 rounded-md">{item.category || 'Hizmet'}</span>
                                                        <h4 className="font-extrabold text-white text-lg tracking-tight mt-2">{item.title}</h4>
                                                        <p className="text-sm text-gray-300 font-mono mt-1 font-bold">{item.price} ₺</p>
                                                    </div>
                                                </div>
                                                <button 
                                                    onClick={() => removeFromCart(item.cartId)} 
                                                    className="w-12 h-12 rounded-2xl bg-red-500/10 hover:bg-red-500/20 text-red-400 flex items-center justify-center border border-red-500/20 transition-all duration-200 hover:scale-105" 
                                                    title="Ürünü Kaldır"
                                                >
                                                    <Trash2 size={20} />
                                                </button>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>
                            )}

                            {cart.length > 0 && (
                                <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl flex items-center gap-4 text-xs text-gray-400">
                                    <ShieldCheck className="text-purple-400 flex-shrink-0" size={24} />
                                    <span>Siparişiniz iletildiğinde ön ödeme veya gizli ücret talep edilmez. Tüm detaylar uzman ekibimiz tarafından sizinle teyit edilir.</span>
                                </div>
                            )}
                        </div>

                        {/* Sağ Taraf - İletişim ve Sipariş Formu (lg:sticky) */}
                        <div className="lg:sticky lg:top-28 h-fit">
                            <div className="bg-zinc-950/80 backdrop-blur-3xl border border-white/10 rounded-[32px] p-8 shadow-[0_0_50px_rgba(0,0,0,0.6)] relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

                                <h2 className="text-2xl font-extrabold mb-2 tracking-tight">Sipariş Bilgileri</h2>
                                <p className="text-sm text-gray-400 mb-8">İletişim bilgilerinizi girerek sepetinizi onaylayın.</p>

                                <form onSubmit={handleCheckout} className="space-y-5">
                                    <div className="space-y-2">
                                        <label className="text-xs text-gray-400 font-mono uppercase tracking-wider flex items-center gap-2">
                                            <User size={14} className="text-purple-400" /> Ad Soyad
                                        </label>
                                        <input 
                                            type="text" 
                                            required 
                                            placeholder="Adınız Soyadınız" 
                                            value={fullName} 
                                            onChange={e => setFullName(e.target.value)} 
                                            className="w-full px-5 py-3.5 bg-black/60 border border-white/10 rounded-2xl text-sm text-white placeholder:text-gray-600 focus:border-purple-500 outline-none transition-colors shadow-inner" 
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs text-gray-400 font-mono uppercase tracking-wider flex items-center gap-2">
                                            <Mail size={14} className="text-purple-400" /> Discord / E-posta
                                        </label>
                                        <input 
                                            type="text" 
                                            required 
                                            placeholder="örn: kullanici#0001 veya e-posta" 
                                            value={contact} 
                                            onChange={e => setContact(e.target.value)} 
                                            className="w-full px-5 py-3.5 bg-black/60 border border-white/10 rounded-2xl text-sm text-white placeholder:text-gray-600 focus:border-purple-500 outline-none transition-colors shadow-inner" 
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs text-gray-400 font-mono uppercase tracking-wider flex items-center gap-2">
                                            <FileText size={14} className="text-purple-400" /> Özel İstek / Notlar
                                        </label>
                                        <textarea 
                                            rows={3} 
                                            placeholder="Projeniz hakkında eklemek istedikleriniz..." 
                                            value={notes} 
                                            onChange={e => setNotes(e.target.value)} 
                                            className="w-full px-5 py-3.5 bg-black/60 border border-white/10 rounded-2xl text-sm text-white placeholder:text-gray-600 focus:border-purple-500 outline-none resize-none transition-colors shadow-inner" 
                                        />
                                    </div>

                                    <div className="pt-2">
                                        <div className="flex justify-between items-center mb-4 px-2 text-sm">
                                            <span className="text-gray-400">Toplam Tutar:</span>
                                            <span className="font-extrabold text-xl text-purple-400 font-mono">{cartTotal} ₺</span>
                                        </div>

                                        <Button
                                            type="submit"
                                            disabled={cart.length === 0 || isSubmitting}
                                            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold py-4 rounded-2xl transition-all shadow-[0_0_30px_rgba(168,85,247,0.35)] h-14 disabled:opacity-50"
                                        >
                                            {isSubmitting ? (
                                                <span className="flex items-center gap-2 justify-center">
                                                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" /> Sipariş Gönderiliyor...
                                                </span>
                                            ) : (
                                                <span className="flex items-center justify-center gap-2">
                                                    <Send size={18} /> Siparişi Tamamla
                                                </span>
                                            )}
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
