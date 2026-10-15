"use client";

import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Bot, MessageSquare, LayoutDashboard, MonitorPlay, Crown, BarChart3 } from 'lucide-react';

const botFeatures = [
    {
        title: "Gelişmiş Bot Kimliği",
        description: "Nexora ve benzeri çok fonksiyonlu bot projeleriniz için modern avatarlar, tanıtım afişleri ve sunucu karşılama görselleri.",
        icon: Bot
    },
    {
        title: "Embed & Mesaj Tasarımı",
        description: "Botunuzun Discord içinde göndereceği log mesajları, ticket sistemleri ve uyarı embedleri için profesyonel renk/düzen şablonları.",
        icon: MessageSquare
    },
    {
        title: "Dashboard UI / UX",
        description: "Web tabanlı yönetim panelleriniz için Glassmorphism (cam efekti) destekli, karanlık tema uyumlu arayüz tasarımları.",
        icon: LayoutDashboard
    },
    {
        title: "Animasyonlu Bannerlar",
        description: "Botunuzun oy platformlarındaki vitrini ve sunucu afişleri için hareketli, dikkat çekici tasarımlar.",
        icon: MonitorPlay
    },
    {
        title: "Premium Rol İkonları",
        description: "Discord sunucunuzun yetki hiyerarşisini görselleştiren, konseptinize özel çizilmiş ikon setleri.",
        icon: Crown
    },
    {
        title: "Panel Kapakları & İstatistik",
        description: "Bot istatistik kartları ve profil sistemleri için kullanıcı deneyimini zirveye taşıyan özel UI parçaları.",
        icon: BarChart3
    }
];

// --- ÖZEL KART BİLEŞENİ (Birebir Aynı Tasarım) ---
const SpotlightCard = ({ feature, index }: { feature: any, index: number }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    const isInView = useInView(cardRef, { once: true, margin: "0px 0px -20% 0px" });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    const Icon = feature.icon;
    const isMiddleColumn = index === 1 || index === 4;

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 100, scale: 0.9 }}
            transition={{ 
                duration: 0.7, 
                ease: [0.25, 1, 0.5, 1], 
                delay: index % 3 === 0 ? 0 : (index % 3) * 0.15 
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className={`relative w-full rounded-[32px] overflow-hidden bg-zinc-950/80 backdrop-blur-md border border-white/10 p-8 md:p-10 transition-transform duration-500 hover:-translate-y-2 ${
                isMiddleColumn ? 'lg:translate-y-16' : ''
            }`}
        >
            {/* SPOT IŞIĞI EFEKTİ */}
            <div
                className="absolute inset-0 z-0 transition-opacity duration-300 ease-in-out"
                style={{
                    opacity: isHovering ? 1 : 0,
                    background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(147, 51, 234, 0.15), transparent 40%)`,
                }}
            />

            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            <div className="relative z-10 flex flex-col h-full">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-transparent border border-purple-500/20 flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(168,85,247,0.1)]">
                    <Icon size={32} className="text-purple-400" />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">
                    {feature.title}
                </h3>
                
                <p className="text-gray-400 leading-relaxed">
                    {feature.description}
                </p>
            </div>
        </motion.div>
    );
};

// --- ANA BÖLÜM ---
export default function BotSystemsSection() {
    return (
        <section id="bot-arayuzleri" className="relative w-full py-20 px-6 md:px-12 bg-transparent z-10">
            <div className="max-w-7xl mx-auto">
                
                {/* Başlık Alanı */}
                <motion.div 
                    initial={{ opacity: 0, filter: "blur(20px)", scale: 0.9 }}
                    whileInView={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="flex flex-col items-start lg:items-center text-left lg:text-center mb-32"
                >
                    <span className="text-purple-500 font-bold tracking-widest uppercase mb-4 text-sm flex items-center gap-2">
                        <span className="w-8 h-[2px] bg-purple-500 inline-block"></span>
                        Discord & Web
                        <span className="w-8 h-[2px] bg-purple-500 inline-block hidden lg:block"></span>
                    </span>
                    <h2 className="text-5xl md:text-7xl font-extrabold text-white tracking-tighter leading-tight mb-6">
                        Bot & Sistem <br className="lg:hidden" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-500 to-purple-600">
                            Arayüzleri
                        </span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Discord projeleriniz ve kontrol panelleriniz (Dashboard) için modern tasarımlar.
                    </p>
                </motion.div>

                {/* Grid Düzeni */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 pb-20">
                    {botFeatures.map((feature, index) => (
                        <SpotlightCard key={index} feature={feature} index={index} />
                    ))}
                </div>

            </div>
        </section>
    );
}

