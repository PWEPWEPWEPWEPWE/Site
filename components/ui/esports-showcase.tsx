"use client";

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import ProductCard from "@/components/ui/product-card";
import { useLanguage } from "@/context/language-context"; // 🌐 GLOBAL DİL KANCASI EKLENDİ

export default function EsportsShowcase() {
    const { t, lang } = useLanguage(); // 🌐 ÇEVİRİ SÖZLÜĞÜNÜ ÇEKTİK
    
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    // Rozet Çevirileri ("Yeni" ve "Popüler" için küçük lokal bir kurgu)
    const newBadgeText = lang === "tr" ? "Yeni" : lang === "de" ? "Neu" : "New";
    const popularBadgeText = lang === "tr" ? "Popüler" : lang === "de" ? "Beliebt" : "Popular";

    return (
        <section id="espor-vitrini" ref={sectionRef} className="relative w-full py-20 px-6 md:px-12 bg-transparent z-10">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, filter: "blur(20px)", scale: 0.9 }}
                    animate={isInView ? { opacity: 1, filter: "blur(0px)", scale: 1 } : { opacity: 0, filter: "blur(20px)", scale: 0.9 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="flex flex-col items-start lg:items-center text-left lg:text-center mb-16"
                >
                    <span className="text-purple-500 font-bold tracking-widest uppercase mb-4 text-sm flex items-center gap-2">
                        <span className="w-8 h-[2px] bg-purple-500 inline-block"></span>
                        {/* 🌐 Rozet Metni (Rekabetçi Ruh / Competitive Spirit) */}
                        {t.esportsBadge}
                        <span className="w-8 h-[2px] bg-purple-500 inline-block hidden lg:block"></span>
                    </span>
                    <h2 className="text-5xl md:text-7xl font-extrabold text-white tracking-tighter leading-tight">
                        {/* 🌐 Başlık Metni (Oyun & E-Spor Vitrini) */}
                        {t.esportsTitle1} <br className="lg:hidden" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-500 to-purple-600 ml-2">
                            {t.esportsTitle2}
                        </span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-20">
                    <ProductCard badge={newBadgeText} image="" price={800} rating={5} title={t.esp1Title} hideButton={true} />
                    <ProductCard image="" price={600} rating={4.5} title={t.esp2Title} hideButton={true} />
                    <ProductCard badge={popularBadgeText} image="" price={1500} originalPrice={1800} rating={5} title={t.esp3Title} hideButton={true} />
                    <ProductCard image="" price={400} rating={4.8} title={t.esp4Title} hideButton={true} />
                </div>
            </div>
        </section>
    );
}

