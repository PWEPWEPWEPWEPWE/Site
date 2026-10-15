"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import { ArrowLeft, FileText } from 'lucide-react';

export default function TermsOfUsePage() {
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
                        <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400"><FileText size={26} /></div>
                        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">Kullanım Koşulları</h1>
                    </div>
                    <p className="text-sm text-gray-400 mb-8 font-mono">Son Güncelleme Tarihi: 2026</p>
                    <div className="space-y-8 text-sm md:text-base leading-relaxed">
                        <section>
                            <h2 className="text-xl font-bold text-white mb-3">1. Kabul Edilme</h2>
                            <p>AuraX Studio web sitesini ziyaret ederek ve hizmetlerimizden yararlanarak bu kullanım koşullarını kabul etmiş sayılırsınız. Şartları kabul etmiyorsanız lütfen siteyi kullanmayınız.</p>
                        </section>
                        <section>
                            <h2 className="text-xl font-bold text-white mb-3">2. Hizmet Kapsamı</h2>
                            <p>AuraX Studio; Discord sunucuları, E-Spor takımları ve web projeleri için dijital tasarım çözümleri sunar. Satın alınan tüm ürünler dijital ortamda teslim edilir.</p>
                        </section>
                        <section>
                            <h2 className="text-xl font-bold text-white mb-3">3. Fikri Mülkiyet</h2>
                            <p>Ödemesi tamamlanıp tarafınıza teslim edilen logoların ve tasarımların ticari kullanım hakkı size aittir. Ancak AuraX Studio, projeleri kendi referans portföyünde sergileme hakkını saklı tutar.</p>
                        </section>
                        <section>
                            <h2 className="text-xl font-bold text-white mb-3">4. Site Kullanımı</h2>
                            <p>Sitemizin kodlarına sızmaya çalışmak, haksız kazanç sağlamak amacıyla açıklardan faydalanmak veya tasarımları izinsiz kopyalamak kesinlikle yasaktır.</p>
                        </section>
                    </div>
                </motion.div>
            </div>
            <Footer />
        </main>
    );
}

