"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, ShoppingBag, ArrowLeft, Send, CheckCircle2, ShoppingCart } from 'lucide-react';
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

        setTimeout(() => setSubmitted(false), 4000);
    };

    return (
        <main className="min-h-screen bg-black text-white pt-32 pb-20 px-6 md:px-12 relative overflow-hidden">
            {/* Arka Plan Işığı */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-purple-600/20 blur-[200px] pointer-events-none rounded-full"></div>

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 border-b border-white/5 pb-10">
                    <div>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-mono uppercase tracking-widest font-bold mb-6 shadow-[0_0_20px_rgba(168,85,247,0.1)]">
                            <ShoppingBag size={16} /> Alışveriş Sepeti
                        </div>
                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter">
                            Sipariş <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-400">Özeti</span>
                        </h1>
                    </div>
                    <Button asChild variant="outline" className="rounded-xl h-12 border-white/10 bg-white/[0.03] hover:bg-white/10">
                        <Link href="/">
                            <ArrowLeft size={18} className="mr-2" /> {t?.backBtn || "Ana Sayfa"}
                        </Link>
                    </Button>
                </div>

                {submitted ? (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative rounded-[32px] p-[1px] bg-gradient-to-b from-green-500/50 to-transparent shadow-[0_0_50px_rgba(34,197,94,0.15)] max-w-lg mx-auto">
                        <div className="bg-zinc-950/90 backdrop-blur-3xl rounded-[31px] p-12 text-center space-y-4 border border-white/[0.05]">
                            <div className="w-20 h-20 bg-green-500/20 border border-green-500/40 rounded-2xl flex items-center justify-center text-green-400 mx-auto shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                                <CheckCircle2 size={40} />
                            </div>
                            <h3 className="text-3xl font-extrabold tracking-tight">Sipariş Alındı!</h3>
                            <p className="text-sm text-gray-400">Talebiniz bize ulaştı. Ekibimiz en kısa sürede sizinle iletişime geçecektir.</p>
                            <Button asChild className="mt-6 w-full">
                                <Link href="/">Ana Sayfaya Dön</Link>
                            </Button>
                        </div>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Sol Taraf - Ürün Listesi */}
                        <div className="lg:col-span-2 space-y-4">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold tracking-tight">Ürünleriniz ({cart.length})</h2>
                                {cart.length > 0 && (
                                    <span className="px-4 py-2 bg-white/[0.03] border border-white/[0.08] text-purple-400 rounded-xl text-sm font-bold shadow-inner backdrop-blur-xl">
                                        Toplam: {cartTotal} ₺
                                    </span>
                                )}
                            </div>

                            {cart.length === 0 ? (
                                <Empty className="py-20 bg-white/[0.03] backdrop-blur-xl border border-white/[0.05] rounded-[32px]">
                                    <EmptyHeader>
                                        <div className="w-16 h-16 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-2xl flex items-center justify-center mb-4 mx-auto shadow-[0_0_20px_rgba(168,85,247,0.2)]">
                                            <ShoppingCart size={32} />
                                        </div>
                                        <EmptyTitle className="text-xl font-bold text-white">Sepetiniz Boş</EmptyTitle>
                                        <EmptyDescription className="text-gray-400 text-sm max-w-sm mx-auto mt-2">
                                            Şu anda sepetinizde herhangi bir hizmet veya ürün bulunmuyor. Keşfetmeye başlayın.
                                        </EmptyDescription>
                                    </EmptyHeader>
                                    <EmptyContent className="mt-6">
                                        <Button asChild className="bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl px-6">
                                            <Link href="/#services">Hizmetleri İncele</Link>
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
                                                className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.05] rounded-[24px] p-5 flex items-center justify-between gap-4 shadow-[0_0_30px_rgba(0,0,0,0.3)] hover:border-purple-500/30 transition-all duration-300"
                                            >
                                                <div className="flex items-center gap-5">
                                                    {item.image ? (
                                                        <img src={item.image} alt={item.title} className="w-20 h-20 rounded-2xl object-cover border border-white/10 shadow-lg" />
                                                    ) : (
                                                        <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-purple-400">
                                                            <ShoppingBag size={24} />
                                                        </div>
                                                    )}
                                                    <div>
                                                        <h4 className="font-extrabold text-white text-lg tracking-tight">{item.title}</h4>
                                                        <p className="text-sm text-purple-400 font-mono mt-1 font-bold">{item.price} ₺</p>
                                                    </div>
                                                </div>
                                                <button onClick={() => removeFromCart(item.cartId)} className="w-12 h-12 rounded-2xl bg-red-500/10 hover:bg-red-500/20 text-red-400 flex items-center justify-center border border-red-500/20 transition-colors" title="Sil">
                                                    <Trash2 size={20} />
                                                </button>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>
                            )}
                        </div>

                        {/* Sağ Taraf - Ödeme / Teslimat Formu (lg:sticky) */}
                        <div className="lg:sticky lg:top-28 h-fit">
                            <div className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.05] rounded-[32px] p-8 shadow-[0_0_40px_rgba(0,0,0,0.4)]">
                                <h2 className="text-2xl font-extrabold mb-2 tracking-tight">Teslimat Bilgileri</h2>
                                <p className="text-sm text-gray-400 mb-8">İletişim adresinizi bırakın, size ulaşalım.</p>

                                <form onSubmit={handleCheckout} className="space-y-5">
                                    <div>
                                        <label className="text-xs text-gray-400 block mb-2 font-mono uppercase tracking-wider">Ad Soyad</label>
                                        <input type="text" required placeholder="Adınız Soyadınız" value={fullName} onChange={e => setFullName(e.target.value)} className="w-full px-5 py-4 bg-black/50 border border-white/10 rounded-2xl text-sm text-white focus:border-purple-500 outline-none transition-colors shadow-inner" />
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-400 block mb-2 font-mono uppercase tracking-wider">Discord veya E-posta</label>
                                        <input type="text" required placeholder="İletişim Adresiniz" value={contact} onChange={e => setContact(e.target.value)} className="w-full px-5 py-4 bg-black/50 border border-white/10 rounded-2xl text-sm text-white focus:border-purple-500 outline-none transition-colors shadow-inner" />
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-400 block mb-2 font-mono uppercase tracking-wider">Ek Notlar</label>
                                        <textarea rows={3} placeholder="Varsa özel istekleriniz..." value={notes} onChange={e => setNotes(e.target.value)} className="w-full px-5 py-4 bg-black/50 border border-white/10 rounded-2xl text-sm text-white focus:border-purple-500 outline-none resize-none transition-colors shadow-inner"></textarea>
                                    </div>

                                    <Button
                                        type="submit"
                                        disabled={cart.length === 0 || isSubmitting}
                                        className="w-full mt-4 bg-purple-600 hover:bg-purple-500 text-white font-bold py-4 rounded-2xl transition-all shadow-[0_0_20px_rgba(168,85,247,0.3)] h-14"
                                    >
                                        {isSubmitting ? (
                                            <span className="flex items-center gap-2 justify-center">
                                                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" /> Sipariş Gönderiliyor...
                                            </span>
                                        ) : (
                                            <span className="flex items-center justify-center gap-2">
                                                <Send size={18} /> Siparişi Tamamla
                                            </span>
                                        )}
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
