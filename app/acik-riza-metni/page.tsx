"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function ExplicitConsentPage() {
    return (
        <main className="min-h-screen bg-black relative text-gray-300">
            <div className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black pointer-events-none"></div>
            <Navbar />
            <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 pt-32 pb-20">
                <div className="mb-10 flex items-center gap-4">
                    <Link href="/" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors border border-white/10">
                        <ArrowLeft size={18} className="text-white" />
                    </Link>
                    <span className="text-purple-400 font-mono text-xs uppercase tracking-widest">Yasal Metinler</span>
                </div>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-zinc-950/80 backdrop-blur-md border border-white/10 rounded-[32px] p-8 md:p-12 shadow-[0_0_50px_rgba(168,85,247,0.05)]">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400"><CheckCircle2 size={26} /></div>
                        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">Açık Rıza Metni</h1>
                    </div>
                    <p className="text-sm text-gray-400 mb-8 font-mono">Son Güncelleme Tarihi: 2026</p>
                    <div className="space-y-8 text-sm md:text-base leading-relaxed">
                        <section>
                            <h2 className="text-xl font-bold text-white mb-3">1. Verilerin İşlenmesi Onayı</h2>
                            <p>6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") kapsamında, AuraX Studio tarafından sunulan dijital hizmetler, e-spor tasarımları, web arayüzleri ve bildirim hizmetleri çerçevesinde kimlik ve iletişim verilerimin işlenmesine onay veriyorum.</p>
                        </section>
                        <section>
                            <h2 className="text-xl font-bold text-white mb-3">2. İletişim ve Bilgilendirme</h2>
                            <p>Kampanyalar, yenilikler, özel tasarım indirimleri ve ödeme altyapısı güncellemeleri hakkında tarafımla elektronik iletişim kurulmasına ve bilgilendirme mailleri gönderilmesine rıza gösteriyorum.</p>
                        </section>
                        <section>
                            <h2 className="text-xl font-bold text-white mb-3">3. Hakların Kullanımı</h2>
                            <p>Açık rızanızı dilediğiniz zaman kurumsal iletişim adresimiz üzerinden geri çekme hakkına sahipsiniz.</p>
                        </section>
                    </div>
                </motion.div>
            </div>
            <Footer />
        </main>
    );
}

