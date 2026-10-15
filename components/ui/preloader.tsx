"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const loadingLogs = [
    "SİSTEM ÇEKİRDEĞİ BAŞLATILIYOR...",
    "AETHER MOTORU DEVREYE ALINIYOR...",
    "VEKTÖREL GRAFİKLER RENDERLANIYOR...",
    "KULLANICI ARAYÜZÜ (UI) İNŞA EDİLİYOR...",
    "GÜVENLİK PROTOKOLLERİ AKTİF EDİLDİ...",
    "DİNAMİK ANİMASYONLAR YÜKLENİYOR...",
    "TÜM SİSTEMLER OPERASYONEL. GİRİŞ YAPILIYOR..."
];

export default function Preloader({ onComplete }: { onComplete: () => void }) {
    const [progress, setProgress] = useState(0);
    const [logIndex, setLogIndex] = useState(0);

    // AuraX harflerini ayırıyoruz
    const letters = ["A", "u", "r", "a", "X"];

    useEffect(() => {
        // Yükleme barı ve yüzdesi
        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    // %100 olduktan sonra kapanış animasyonunu bekle
                    setTimeout(onComplete, 800);
                    return 100;
                }
                return prev + Math.floor(Math.random() * 2) + 1;
            });
        }, 20);

        return () => clearInterval(progressInterval);
    }, [onComplete]);

    useEffect(() => {
        // Terminal logları
        const logInterval = setInterval(() => {
            setLogIndex((prev) => {
                if (prev === loadingLogs.length - 1) return prev;
                return Math.floor(progress / (100 / loadingLogs.length));
            });
        }, 50);

        return () => clearInterval(logInterval);
    }, [progress]);

    return (
        <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            // Çıkış animasyonu: Ekran sana doğru büyür ve siteye dalış yaparsın
            exit={{ 
                opacity: 0, 
                scale: 1.1, 
                filter: "blur(20px)",
                transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
            }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#030305] overflow-hidden"
        >
            {/* Arka plan ızgarası ve loş ışık */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 blur-[150px] rounded-full pointer-events-none"></div>

            <div className="relative z-10 flex flex-col items-center w-full max-w-lg px-8">
                
                {/* HARFLERİN BİRLEŞME ANİMASYONU */}
                <div className="flex justify-center items-center h-32 mb-2 relative">
                    {letters.map((char, i) => (
                        <motion.span
                            key={i}
                            // Harfler dışarıdan (sağdan ve soldan) geniş bir şekilde ortaya doğru toplanır
                            initial={{ 
                                opacity: 0, 
                                x: (i - 2) * 100, // Orta harf 0, kenardakiler uzak başlar
                                filter: "blur(20px)", 
                                scale: 1.5 
                            }}
                            animate={{ 
                                opacity: 1, 
                                x: 0, 
                                filter: "blur(0px)", 
                                scale: 1 
                            }}
                            transition={{
                                duration: 1.5,
                                ease: [0.16, 1, 0.3, 1],
                                delay: 0.1 // Sayfa açılır açılmaz başlar
                            }}
                            className={`text-6xl md:text-8xl font-extrabold tracking-tight ${
                                char === 'X' 
                                ? 'text-purple-500 font-serif italic drop-shadow-[0_0_25px_rgba(168,85,247,0.6)] ml-1' 
                                : 'text-white'
                            }`}
                        >
                            {char}
                        </motion.span>
                    ))}
                </div>

                {/* "STUDIO" Alt Başlığı (Harfler birleştikten sonra belirir) */}
                <motion.div
                    initial={{ opacity: 0, y: 10, filter: "blur(5px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 1, delay: 1.2 }}
                    className="mb-16 text-center"
                >
                    <span className="text-gray-400 tracking-[0.6em] uppercase text-sm font-light">
                        Studio
                    </span>
                </motion.div>

                {/* Yüzde Göstergesi (HUD Tarzı) */}
                <div className="w-full flex justify-between items-end mb-3">
                    <span className="text-gray-500 text-[10px] font-mono tracking-widest uppercase">
                        Sistem Yüklemesi
                    </span>
                    <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-black text-white font-mono tracking-tighter">
                            {progress}
                        </span>
                        <span className="text-purple-500 font-bold text-sm">%</span>
                    </div>
                </div>

                {/* Teknolojik Yükleme Çubuğu */}
                <div className="w-full h-[3px] bg-white/5 rounded-full relative overflow-hidden mb-5 backdrop-blur-sm">
                    {/* Dolum Efekti */}
                    <motion.div
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-900 via-purple-500 to-white"
                        style={{ width: `${progress}%` }}
                        layout
                    />
                    {/* Çubuğun ucundaki parlak lazer noktası */}
                    <motion.div 
                        className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full blur-sm shadow-[0_0_10px_rgba(255,255,255,1)]"
                        style={{ left: `calc(${progress}% - 8px)` }}
                        layout
                    />
                </div>

                {/* Terminal Logları (Değişen yazılar) */}
                <div className="h-4 overflow-hidden w-full text-center">
                    <motion.p
                        key={logIndex}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-purple-400/60 text-[10px] md:text-xs font-mono tracking-widest uppercase"
                    >
                        {loadingLogs[Math.min(logIndex, loadingLogs.length - 1)]}
                    </motion.p>
                </div>

            </div>
        </motion.div>
    );
}

