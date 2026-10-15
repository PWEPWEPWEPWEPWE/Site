"use client";

import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check, Star, Zap, Crown, Gamepad2, MonitorPlay, Diamond } from 'lucide-react';
import { useCart } from '@/context/cart-context';
import { useLanguage } from "@/context/language-context"; // 🌐 GLOBAL DİL KANCASI EKLENDİ

const PricingCard = ({ plan, index }: { plan: any, index: number }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const { lang } = useLanguage(); // "Seçildi", "Satın Al" vb. statik ufak kelimeler için

    const { addToCart } = useCart();
    const [isAdded, setIsAdded] = useState(false);

    const isInView = useInView(cardRef, { once: true, margin: "0px 0px -10% 0px" });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleBuyClick = () => {
        addToCart({
            id: `PAKET-${plan.name}`,
            title: plan.name,
            price: parseInt(plan.price),
            image: "",
            category: "Tasarım Paketi"
        });
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    const Icon = plan.icon;
    const hasBadge = plan.badge !== null && plan.badge !== undefined;
    // Badge "VIP" veya benzeri premium bir kelimeyse özel stil uygula
    const isVip = plan.badge === "VIP";
    const isPopular = hasBadge && !isVip;

    const buyText = lang === "tr" ? "Satın Al" : lang === "de" ? "Kaufen" : "Buy Now";
    const selectedText = lang === "tr" ? "Seçildi" : lang === "de" ? "Ausgewählt" : "Selected";

    return (
        <motion.div
            ref={cardRef} initial={{ opacity: 0, y: 50, scale: 0.95 }} animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.95 }} transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1], delay: index * 0.1 }} onMouseMove={handleMouseMove} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}
            className={`relative w-full rounded-[32px] overflow-hidden backdrop-blur-md transition-all duration-500 hover:-translate-y-2 flex flex-col ${
                isPopular ? 'bg-zinc-950 border border-purple-500/50 shadow-[0_0_40px_rgba(168,85,247,0.15)]' : isVip ? 'bg-zinc-950 border border-amber-500/50 shadow-[0_0_40px_rgba(245,158,11,0.15)]' : 'bg-zinc-950/80 border border-white/10 hover:border-white/20'
            }`}
        >
            <div className="absolute inset-0 z-0 transition-opacity duration-300 pointer-events-none" style={{ opacity: isHovering ? 1 : 0, background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, ${isVip ? 'rgba(245, 158, 11, 0.15)' : 'rgba(147, 51, 234, 0.15)'}, transparent 40%)` }} />
            <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent ${isVip ? 'via-amber-500/50' : 'via-purple-500/50'} to-transparent transition-opacity duration-500 ${hasBadge ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />

            {hasBadge && (
                <div className="absolute top-0 left-0 w-full flex justify-center z-20">
                    <div className={`text-white text-xs font-bold uppercase tracking-wider py-1 px-5 rounded-b-xl shadow-lg ${isVip ? 'bg-gradient-to-r from-amber-500 to-orange-600' : 'bg-gradient-to-r from-purple-600 to-fuchsia-600'}`}>
                        {plan.badge}
                    </div>
                </div>
            )}

            <div className={`relative z-10 p-8 md:p-10 flex flex-col h-full ${hasBadge ? 'pt-12' : ''}`}>
                <div className="flex justify-between items-center mb-8">
                    <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border shadow-lg ${isPopular ? 'bg-purple-500/20 border-purple-500/30 text-purple-400' : isVip ? 'bg-amber-500/20 border-amber-500/30 text-amber-400' : 'bg-white/5 border-white/10 text-gray-400'}`}>
                        <Icon size={24} />
                    </div>
                </div>

                <div className="mb-8 flex items-start gap-1">
                    <span className="text-2xl font-bold text-gray-400 mt-1">{plan.currency}</span>
                    <span className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">{plan.price}</span>
                </div>

                <div className="w-full h-[1px] bg-white/10 mb-8"></div>

                <ul className="flex flex-col gap-4 mb-10 flex-grow">
                    {plan.features.map((feature: string, fIndex: number) => (
                        <li key={fIndex} className="flex items-center gap-3 text-gray-300 text-sm md:text-base font-medium">
                            <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${isVip ? 'bg-amber-500/20' : 'bg-purple-500/20'}`}>
                                <Check size={12} className={isVip ? 'text-amber-400' : 'text-purple-400'} strokeWidth={3} />
                            </div>
                            <span>{feature}</span>
                        </li>
                    ))}
                </ul>

                <button
                    onClick={handleBuyClick}
                    disabled={isAdded}
                    className={`w-full py-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 mt-auto ${
                    isAdded ? 'bg-emerald-600 text-white' : hasBadge ? 'bg-white text-black hover:bg-gray-200 hover:scale-[1.02]' : 'bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-white/20'
                }`}>
                    {isAdded ? <><Check size={18} /> {selectedText}</> : buyText}
                </button>
            </div>
        </motion.div>
    );
};

export default function PricingSection() {
    const { t, lang } = useLanguage(); // 🌐 DİL SÖZLÜĞÜNÜ ÇEKİYORUZ

    // Dinamik Paket Listesi
    const pricingPlans = [
        { name: t.plan1Name, currency: "₺", price: "500", icon: Star, badge: null, features: [t.feat1, t.feat2, t.feat3] },
        { name: lang === "tr" ? "Gelişmiş" : lang === "de" ? "Fortgeschritten" : "Advanced", currency: "₺", price: "1200", icon: Zap, badge: t.mostPopular, features: [t.feat6, t.feat7, t.feat4] },
        { name: t.plan2Name, currency: "₺", price: "2500", icon: Crown, badge: null, features: [t.feat8, t.feat9, t.feat10] },
        { name: lang === "tr" ? "E-Spor & Yayıncı" : lang === "de" ? "E-Sport & Streamer" : "Esports & Streamer", currency: "₺", price: "2000", icon: Gamepad2, badge: null, features: [t.feat1, t.feat7, t.feat4] },
        { name: lang === "tr" ? "Animasyon Paketi" : lang === "de" ? "Animationspaket" : "Animation Pack", currency: "₺", price: "1800", icon: MonitorPlay, badge: null, features: [t.feat8, t.feat2, t.feat5] },
        { name: "AuraX Ultimate", currency: "₺", price: "4500", icon: Diamond, badge: "VIP", features: [t.feat6, t.feat9, t.feat10] }
    ];

    return (
        <section id="fiyatlandirma" className="relative w-full py-20 px-6 md:px-12 bg-transparent z-10">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, filter: "blur(20px)", scale: 0.9 }}
                    whileInView={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="flex flex-col items-start lg:items-center text-left lg:text-center mb-20"
                >
                    <h2 className="text-5xl md:text-7xl font-extrabold text-white tracking-tighter leading-tight mb-4">
                        {t.navPricing}
                    </h2>
                    <p className="text-gray-400 text-lg md:text-xl">
                        {t.pricingDesc}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 pb-20 items-stretch">
                    {pricingPlans.map((plan, index) => (
                        <PricingCard key={index} plan={plan} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}

