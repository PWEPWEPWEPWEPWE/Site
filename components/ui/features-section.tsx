"use client";

import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { PenTool, Clock, Sparkles, Users, Layers, Infinity } from 'lucide-react';
import { useLanguage } from "@/context/language-context"; // 🌐 GLOBAL DİL KANCASI EKLENDİ

// --- ÖZEL KART BİLEŞENİ (Fare takibi ve bağımsız animasyon için) ---
const SpotlightCard = ({ feature, index }: { feature: any, index: number }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    // Kartın ekrana girip girmediğini bağımsız olarak kontrol ediyoruz
    const isInView = useInView(cardRef, { once: true, margin: "0px 0px -20% 0px" });

    // Fare hareketini takip eden fonksiyon
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    const Icon = feature.icon;

    // Ortadaki kartları (index 1 ve 4) masaüstünde aşağıya kaydırarak asimetrik bir görünüm veriyoruz
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


// --- ANA BÖLÜM BİLEŞENİ ---
export default function FeaturesSection() {
    const { t, lang } = useLanguage(); // 🌐 DİL SÖZLÜĞÜNÜ ÇEKİYORUZ

    // 🌐 Özellikleri statik olmaktan çıkarıp dinamik sözlüğe bağlıyoruz.
    // Senin language-context dosyasındaki serv1Title, serv1Desc vb. değişkenlerini kullandım.
    // Eksik olan 2 ekstra kartı feat serisinden (feat9, feat10 vb.) dolduruyoruz.
    const translatedFeatures = [
        {
            title: t.serv1Title,
            description: t.serv1Desc,
            icon: PenTool
        },
        {
            title: t.serv4Title, // "Hızlı Teslimat"
            description: t.serv4Desc,
            icon: Clock
        },
        {
            title: t.serv2Title, // "Web Arayüzleri"
            description: t.serv2Desc,
            icon: Sparkles
        },
        {
            title: t.serv3Title, // "Kurumsal Kimlik"
            description: t.serv3Desc,
            icon: Users
        },
        {
            title: t.feat8, // "Vektörel Çizim / Vektörel Dosya"
            description: lang === "tr" ? "Logolarınız pikselleşmez. Telefonda da dev ekranlarda da keskin görünür." : lang === "de" ? "Ihre Logos verpixeln nicht. Sie sehen überall scharf aus." : "Your logos won't pixelate. They look sharp everywhere.",
            icon: Layers
        },
        {
            title: t.feat9, // "Sınırsız Revizyon"
            description: lang === "tr" ? "İçinize tam olarak sinene kadar tasarımı şekillendirmeye devam ediyoruz." : lang === "de" ? "Wir gestalten das Design weiter, bis Sie vollkommen zufrieden sind." : "We continue to shape the design until you are completely satisfied.",
            icon: Infinity
        }
    ];

    return (
        <section id="hizmetler" className="relative w-full py-40 px-6 md:px-12 bg-transparent z-10">
            <div className="max-w-7xl mx-auto">

                <motion.div
                    initial={{ opacity: 0, filter: "blur(20px)", scale: 0.9 }}
                    whileInView={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="flex flex-col items-start lg:items-center text-left lg:text-center mb-32"
                >
                    <span className="text-purple-500 font-bold tracking-widest uppercase mb-4 text-sm flex items-center gap-2">
                        <span className="w-8 h-[2px] bg-purple-500 inline-block"></span>
                        {/* 🌐 Rozet Başlığı (Örn: "Ne Yapıyoruz?") */}
                        {t.servicesBadge}
                        <span className="w-8 h-[2px] bg-purple-500 inline-block hidden lg:block"></span>
                    </span>
                    <h2 className="text-5xl md:text-7xl font-extrabold text-white tracking-tighter leading-tight">
                        {/* 🌐 Ana Başlık (Örn: "Premium Dijital Çözümler") */}
                        {t.servicesTitle1} <br className="lg:hidden" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-500 to-purple-600 ml-2">
                            {t.servicesTitle2}
                        </span>
                    </h2>
                    
                    {/* Alt Başlık Açıklaması eklendi (Senin sözlükte servicesDesc vardı) */}
                    <p className="mt-6 text-gray-400 text-lg max-w-2xl text-center">
                        {t.servicesDesc}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 pb-20">
                    {/* 🌐 Statik features yerine translatedFeatures dizisini haritalıyoruz */}
                    {translatedFeatures.map((feature, index) => (
                        <SpotlightCard key={index} feature={feature} index={index} />
                    ))}
                </div>

            </div>
        </section>
    );
}

