"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import { ArrowLeft } from 'lucide-react';

interface PolicyPageLayoutProps {
    title: string;
    icon: React.ReactNode;
    lastUpdated?: string;
    children: React.ReactNode;
    scrollable?: boolean;
}

export default function PolicyPageLayout({
    title,
    icon,
    lastUpdated = "Son Güncelleme Tarihi: 2026",
    children,
    scrollable = false,
}: PolicyPageLayoutProps) {
    return (
        <main className="min-h-screen bg-black relative selection:bg-purple-500/30 text-gray-300 overflow-x-hidden">
            {/* Arka plan ışık ve ızgara efekti */}
            <div className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/25 via-black to-black pointer-events-none"></div>
            <div className="fixed inset-0 z-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
            
            <Navbar />

            <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 pt-32 pb-20">
                
                {/* Geri Dön Tuşu ve Başlık Etiketi - Giriş Animasyonu */}
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-10 flex items-center gap-4"
                >
                    <Link 
                        href="/" 
                        className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 hover:border-purple-500/50 hover:scale-105 transition-all duration-300 border border-white/10 shadow-lg"
                    >
                        <ArrowLeft size={18} className="text-white" />
                    </Link>
                    <span className="text-purple-400 font-mono text-xs uppercase tracking-widest px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20">
                        Yasal Metinler & Politikalar
                    </span>
                </motion.div>

                {/* Ana Kart - Muhteşem Açılış / Giriş Animasyonu */}
                <motion.div 
                    initial={{ opacity: 0, y: 35, scale: 0.96, filter: "blur(12px)" }}
                    animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                    transition={{ 
                        duration: 0.7, 
                        ease: [0.16, 1, 0.3, 1],
                        delay: 0.1 
                    }}
                    className="bg-zinc-950/85 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 md:p-12 shadow-[0_0_60px_rgba(168,85,247,0.08)] relative overflow-hidden"
                >
                    {/* Üst Dekoratif Işık Çizgisi */}
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-75"></div>

                    {/* Başlık ve İkon */}
                    <motion.div 
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex items-center gap-4 mb-6"
                    >
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-900/40 border border-purple-500/30 flex items-center justify-center text-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.2)]">
                            {icon}
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                                {title}
                            </h1>
                            <p className="text-xs text-purple-400/80 font-mono mt-1">
                                {lastUpdated}
                            </p>
                        </div>
                    </motion.div>

                    <div className="w-full h-[1px] bg-white/10 mb-8"></div>

                    {/* İçerik Alanı (İsteğe bağlı scroll container veya akışkan) */}
                    <motion.div 
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: {
                                    staggerChildren: 0.08,
                                    delayChildren: 0.25
                                }
                            }
                        }}
                        className={`space-y-8 text-sm md:text-base leading-relaxed ${scrollable ? 'max-h-[520px] overflow-y-auto pr-4 custom-scrollbar' : ''}`}
                    >
                        {children}
                    </motion.div>
                </motion.div>
            </div>

            <Footer />
        </main>
    );
}
