"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trash2, ShoppingBag, ArrowLeft, Send, CheckCircle2, ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/cart-context';
import { useLanguage } from '@/context/language-context';
import Link from 'next/link';

// Özelleştirilmiş Shadcn Bileşenleri
import { Button } from "@/components/ui/button";
import { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyContent } from "@/components/ui/empty";

export default function SepetPage() {
    const { cart, removeFromCart, clearCart, cartTotal } = useCart();
    const { t } = useLanguage();

    const [fullName, setFullName] = useState('');
    const [contact, setContact] = useState('');
    const [notes, setNotes] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false); // Butona basılınca bekleme animasyonu için eklendi

    const handleCheckout = async (e: React.FormEvent) => {
        e.preventDefault();
        if (cart.length === 0) return;
        setIsSubmitting(true);

        try {
            // Sepetteki verileri doğrudan Cloudflare D1 veritabanına (Buluta) yolluyoruz
            await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    customer_info: { 
                        fullName: fullName, 
                        contact: contact, 
                        notes: notes 
                    },
                    items: cart, // Sepetteki tüm ürünlerin listesi
                    total: cartTotal // Toplam ödenecek tutar
                })
            });

            // İşlem başarılıysa ekranı "Sipariş Alındı" sayfasına çevir ve sepeti temizle
            setSubmitted(true);
            clearCart();
            
        } catch (error) {
            console.error("Sipariş gönderilirken hata oluştu:", error);
            alert("Siparişiniz gönderilirken bir sorun oluştu. Lütfen tekrar deneyin.");
        } finally {
            setIsSubmitting(false);
        }

        // 4 Saniye sonra onay ekranını kapatır
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
                    <Button asChild variant="outline" className="rounded-xl h-12">
                        <Link href="/">
                            <ArrowLeft size={18} className="mr-2" /> {t.backBtn}
                        </Link>
                    </Button>
                </div>

                {submitted ? (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative rounded-[32px] p-[1px] bg-gradient-to-b from-green-500/50 to-transparent shadow-[0_0_50px_rgba(34,197,94,0.15)] max-w-lg mx-auto">
                        <div className="bg-zinc-950/90 backdrop-blur-3xl rounded-[31px] p-12 text-center space-y-4">
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
                                    <span className="px-4 py-2 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-xl text-sm font-bold shadow-inner">
                                        Toplam: {cartTotal} ₺
                                    </span>
                                )}
                            </div>

                            {cart.length === 0 ? (
                                <Empty className="py-20 bg-white/[0.01]">
                                    <EmptyHeader>
                                        <div className="w-16 h-16 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-2xl flex items-center justify-center mb-4 mx-auto shadow-[0_0_20px_rgba(168,85,247,0.2)]">
                                            <ShoppingCart size={32} />
                                        </div>
                                        <EmptyTitle>Sepetiniz Boş</EmptyTitle>
                                        <EmptyDescription>
                                            Şu anda sepetinizde herhangi bir hizmet veya ürün bulunmuyor. Keşfetmeye başlayın.
                                        </EmptyDescription>
                                    </EmptyHeader>
                                    <EmptyContent>
                                        <Button asChild>
                                            <Link href="/#services">Hizmetleri İncele</Link>
                                        </Button>
                                    </EmptyContent>
                                </Empty>
                            ) : (
                                <div className="space-y-4">
                                    {cart.map((item: any, index: number) => (
                                        <motion.div
                                            key={item.cartId}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="relative rounded-[24px] p-[1px] bg-gradient-to-b from-white/10 to-transparent hover:from-purple-500/30 transition-all duration-300 shadow-[0_0_30px_rgba(0,0,0,0.3)]"
                                        >
                                            <div className="bg-zinc-950/80 backdrop-blur-3xl rounded-[23px] p-5 flex items-center justify-between gap-4">
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
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Sağ Taraf - Ödeme / Teslimat Formu */}
                        <div className="relative rounded-[32px] p-[1px] bg-gradient-to-b from-purple-500/30 to-transparent h-fit shadow-[0_0_40px_rgba(168,85,247,0.15)] mt-12 lg:mt-0">
                            <div className="bg-zinc-950/90 backdrop-blur-3xl rounded-[31px] p-8">
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
                                        className="w-full mt-4"
                                        variant={cart.length === 0 ? "secondary" : "default"}
                                    >
                                        {isSubmitting ? (
                                            <span className="flex items-center gap-2">
                                                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" /> Sipariş Gönderiliyor...
                                            </span>
                                        ) : (
                                            <span className="flex items-center">
                                                <Send size={18} className="mr-2" /> Siparişi Tamamla
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
