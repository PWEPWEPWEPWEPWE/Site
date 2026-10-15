"use client";

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Sparkles, Compass, Fingerprint, Rocket, ArrowRight } from 'lucide-react';

const specialFeatures = [
    {
        title: "Birebir Konsept",
        description: "Vizyonunuzu dinliyor, markanızın ruhuna en uygun çizgiyi sıfırdan yaratıyoruz.",
        icon: Fingerprint
    },
    {
        title: "Sınırsız Özelleştirme",
        description: "Şablonlara bağlı kalmadan, her pikselin sizin kontrolünüzde olduğu bir süreç.",
        icon: Compass
    },
    {
        title: "Kapsamlı Marka Kimliği",
        description: "Logo, web, discord ve sosyal medya için uyumlu ve devasa bir tasarım dili.",
        icon: Rocket
    }
];

export default function SpecialDesignSection() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    return (
        <section id="ozel-tasarim" ref={sectionRef} className="relative w-full py-24 px-6 md:px-12 bg-transparent z-10">
            <div className="max-w-7xl mx-auto">
                
                {/* Geniş VIP Kart (Banner) */}
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.95 }}
                    animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.95 }}
                    transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
                    className="relative w-full rounded-[40px] bg-zinc-950/80 backdrop-blur-2xl border border-white/10 overflow-hidden flex flex-col lg:flex-row shadow-[0_0_50px_rgba(168,85,247,0.1)]"
                >
                    {/* Arka plan ışıkları (Loş bir aura) */}
                    <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden rounded-[40px]">
                        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-600/20 blur-[100px] rounded-full mix-blend-screen"></div>
                        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-fuchsia-600/10 blur-[100px] rounded-full mix-blend-screen"></div>
                    </div>

                    {/* SOL KISIM - Metin ve CTA (Harekete Geçirici Mesaj) */}
                    <div className="relative z-10 w-full lg:w-1/2 p-10 md:p-16 flex flex-col justify-center">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 mb-8 w-max">
                            <Sparkles className="h-4 w-4 text-purple-400" />
                            <span className="text-xs font-bold text-purple-300 uppercase tracking-widest">
                                VIP & Premium Hizmet
                            </span>
                        </div>

                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tighter leading-tight mb-6">
                            Size Özel <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-500 to-white">
                                Benzersiz Tasarım
                            </span>
                        </h2>

                        <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-md">
                            Hazır paketler projenizin vizyonunu yansıtmaya yetmiyorsa, hayalinizdeki konsepti sıfırdan inşa edelim. Tamamen size özgü, sınırları zorlayan dijital bir deneyim için detayları konuşalım.
                        </p>

                        <a 
                            href="mailto:iletisim@auraxstudio.com"
                            className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-all duration-300 w-max shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-105"
                        >
                            <span>Projeni Anlat</span>
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>

                    {/* SAĞ KISIM - Avantaj Kartları */}
                    <div className="relative z-10 w-full lg:w-1/2 p-10 md:p-16 bg-white/[0.02] border-l border-white/5 flex flex-col justify-center gap-6">
                        {specialFeatures.map((feature, index) => (
                            <motion.div 
                                key={index}
                                initial={{ opacity: 0, x: 30 }}
                                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                                transition={{ duration: 0.6, delay: 0.3 + (index * 0.15), ease: "easeOut" }}
                                className="group flex items-start gap-5 p-5 rounded-2xl hover:bg-white/[0.04] transition-colors border border-transparent hover:border-white/10"
                            >
                                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center group-hover:bg-purple-500/20 group-hover:scale-110 transition-all duration-300">
                                    <feature.icon size={24} className="text-purple-400" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-purple-200 transition-colors">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-400 text-sm leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                </motion.div>
            </div>
        </section>
    );
}

