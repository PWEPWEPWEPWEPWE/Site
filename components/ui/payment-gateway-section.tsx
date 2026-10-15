"use client";

import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Bell, Check, ArrowRight, Loader2 } from 'lucide-react';
import { useLanguage } from '@/context/language-context';

export default function PaymentGatewaySection() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
    const { t, lang } = useLanguage();
    
    // Form durumları
    const [openFormId, setOpenFormId] = useState<number | null>(null);
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const paymentCards = [
        { id: 1, title: "MasterCard", description: "Gelişmiş dolandırıcılık koruması ve yüksek işlem onay oranına sahip küresel ödeme ağı.", badge: "Yakında", logoUrl: "/mastercard.png" },
        { id: 2, title: "Visa Altyapısı", description: "Dünyanın en yaygın dijital ödeme ağı ile güvenli, hızlı ve global standartlarda tahsilat altyapısı.", badge: "Planlanıyor", logoUrl: "/visa.png" },
        { id: 3, title: "TROY (Yerli Ödeme)", description: "Türkiye'nin ödeme yöntemi TROY ile yerel bankacılık ağlarına tam uyumlu, komisyonsuz ve güvenli çözümler.", badge: "Entegre Ediliyor", logoUrl: "/troy.png" }
    ];

    const handleSubmit = async (cardId: number, cardTitle: string) => {
        if (!email || !email.includes('@')) return;
        
        setStatus('loading');
        try {
            // Yazdığımız arka plan API'sine veriyi yolluyoruz
            const res = await fetch('/api/notify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, method: cardTitle })
            });

            if (res.ok) {
                setStatus('success');
                setTimeout(() => {
                    setOpenFormId(null);
                    setStatus('idle');
                    setEmail("");
                }, 3000); // 3 saniye sonra formu kapat
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
    };

    // Dile göre Input placeholder'ı
    const emailPlaceholder = lang === 'en' ? "Your email address..." : lang === 'de' ? "Ihre E-Mail-Adresse..." : "E-posta adresiniz...";

    return (
        <section id="odeme-sistemi" ref={sectionRef} className="relative w-full py-20 px-6 md:px-12 bg-transparent z-10">
            <div className="max-w-7xl mx-auto">
                     
                {/* Başlık */}
                <motion.div 
                    initial={{ opacity: 0, filter: "blur(20px)", scale: 0.9 }}
                    animate={isInView ? { opacity: 1, filter: "blur(0px)", scale: 1 } : { opacity: 0, filter: "blur(20px)", scale: 0.9 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="flex flex-col items-start lg:items-center text-left lg:text-center mb-16"
                >
                    <span className="text-purple-500 font-bold tracking-widest uppercase mb-4 text-sm flex items-center gap-2">
                        <span className="w-8 h-[2px] bg-purple-500 inline-block"></span>
                        Altyapı Geliştirmesi
                        <span className="w-8 h-[2px] bg-purple-500 inline-block hidden lg:block"></span>
                    </span>
                    <h2 className="text-5xl md:text-7xl font-extrabold text-white tracking-tighter leading-tight mb-4">
                        Ödeme Sistemi <br className="lg:hidden" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-500 to-purple-600">
                            Ekleniyor!
                        </span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Güvenli, hızlı ve resmi ödeme altyapılarımız çok yakında aktif ediliyor.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12">
                    {paymentCards.map((card, index) => {
                        const isFormOpen = openFormId === card.id;
                        
                        return (
                            <motion.div key={card.id} initial={{ opacity: 0, y: 50 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }} transition={{ duration: 0.6, delay: index * 0.15 }} className="relative rounded-[32px] overflow-hidden bg-zinc-950/80 backdrop-blur-md border border-white/10 p-8 flex flex-col justify-between hover:border-purple-500/40 transition-all duration-500 group">
                                <div>
                                    <div className="flex justify-between items-center mb-6">
                                        <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400"><ShieldCheck size={26} /></div>
                                        <span className="text-xs font-mono text-purple-300 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20">{card.badge}</span>
                                    </div>
                                    <div className="relative w-full h-32 rounded-2xl bg-white/[0.05] border border-white/10 flex flex-col items-center justify-center text-center p-6 overflow-hidden mb-6 group-hover:border-purple-500/30 transition-colors">
                                        <div className="absolute inset-0 bg-white/5 opacity-50 blur-xl rounded-full scale-150"></div>
                                        <img src={card.logoUrl} alt={card.title} className="relative z-10 max-w-full max-h-[70%] object-contain group-hover:scale-110 transition-transform duration-500" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">{card.title}</h3>
                                    <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-8">{card.description}</p>
                                </div>
                                
                                <div className="h-14 relative w-full overflow-hidden rounded-xl">
                                    <AnimatePresence initial={false} mode="wait">
                                        {!isFormOpen ? (
                                            <motion.button 
                                                key="btn"
                                                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                                                onClick={() => { setOpenFormId(card.id); setStatus('idle'); setEmail(""); }} 
                                                className="absolute inset-0 w-full h-full font-bold transition-all duration-300 flex items-center justify-center gap-2 bg-white/5 hover:bg-purple-600 text-white border border-white/10"
                                            >
                                                <Bell size={18} /> {t.notifyBtn}
                                            </motion.button>
                                        ) : status === 'success' ? (
                                            <motion.div 
                                                key="success"
                                                initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
                                                className="absolute inset-0 w-full h-full bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 font-bold flex items-center justify-center gap-2"
                                            >
                                                <Check size={20} /> {t.notifiedText}
                                            </motion.div>
                                        ) : (
                                            <motion.div 
                                                key="form"
                                                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                                                className="absolute inset-0 w-full h-full flex items-center bg-zinc-900 border border-purple-500/50 rounded-xl overflow-hidden"
                                            >
                                                <input 
                                                    type="email" 
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    placeholder={emailPlaceholder}
                                                    className="w-full h-full bg-transparent text-white px-4 text-sm outline-none placeholder:text-gray-600"
                                                    autoFocus
                                                />
                                                <button 
                                                    onClick={() => handleSubmit(card.id, card.title)}
                                                    disabled={status === 'loading'}
                                                    className="h-full px-5 bg-purple-600 hover:bg-purple-500 text-white flex items-center justify-center transition-colors"
                                                >
                                                    {status === 'loading' ? <Loader2 size={18} className="animate-spin" /> : <ArrowRight size={18} />}
                                                </button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

