"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import { ArrowLeft, RefreshCw } from 'lucide-react';

export default function DeliveryAndReturnPage() {
    return (
        <main className="min-h-screen bg-black relative selection:bg-purple-500/30 text-gray-300">
            <div className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black pointer-events-none"></div>
            <Navbar />
            <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 pt-32 pb-20">
                <div className="mb-10 flex items-center gap-4">
                    <Link href="/" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors border border-white/10">
                        <ArrowLeft size={18} className="text-white" />
                    </Link>
                    <span className="text-purple-400 font-mono text-xs uppercase tracking-widest">Yasal Metinler</span>
                </div>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="bg-zinc-950/80 backdrop-blur-md border border-white/10 rounded-[32px] p-8 md:p-12 shadow-[0_0_50px_rgba(168,85,247,0.05)]">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400"><RefreshCw size={26} /></div>
                        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">Teslimat ve İade</h1>
                    </div>
                    <p className="text-sm text-gray-400 mb-8 font-mono">Son Güncelleme Tarihi: 2026</p>
                    <div className="space-y-8 text-sm md:text-base leading-relaxed">
                        <section>
                            <h2 className="text-xl font-bold text-white mb-3">1. Dijital Teslimat Şartları</h2>
                            <p>AuraX Studio üzerinden satın aldığınız tüm hizmetler "Dijital Ürün" statüsündedir. Herhangi bir fiziksel kargo veya nakliye işlemi yapılmaz. Projeleriniz tamamlandığında, kaynak dosyalarıyla birlikte E-posta veya Discord üzerinden dijital olarak teslim edilir.</p>
                        </section>
                        <section>
                            <h2 className="text-xl font-bold text-white mb-3">2. Teslimat Süreleri</h2>
                            <p>Standart hazır konsept logolar genellikle aynı iş günü içinde, özel çizim gerektiren VIP tasarımlar veya paketler ise projenin zorluğuna göre tarafınıza önceden bildirilen sürede teslim edilir (Ortalama 3-7 İş Günü).</p>
                        </section>
                        <section>
                            <h2 className="text-xl font-bold text-white mb-3">3. İade ve Cayma Hakkı</h2>
                            <p className="mb-2">T.C. Mesafeli Sözleşmeler Yönetmeliği uyarınca, "Elektronik ortamda anında ifa edilen hizmetler veya tüketiciye anında teslim edilen gayrimaddi mallar" cayma hakkının istisnaları arasındadır.</p>
                            <ul className="list-disc pl-5 space-y-2 text-gray-400 mt-2">
                                <li>Özel tasarım sürecine (çizime) başlanmış projelerde ücret iadesi yapılamaz.</li>
                                <li>Hazır konsept logolarda satın alım tamamlanıp dosya teslim edildikten sonra iade kabul edilmez.</li>
                                <li>Siparişi verdikten sonra, projeye **henüz başlanmamışsa** koşulsuz olarak iptal ve tam iade talebinde bulunabilirsiniz.</li>
                            </ul>
                        </section>
                    </div>
                </motion.div>
            </div>
            <Footer />
        </main>
    );
}

