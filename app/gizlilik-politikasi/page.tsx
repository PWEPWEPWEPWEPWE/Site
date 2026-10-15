"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

export default function PrivacyPolicyPage() {
    return (
        <main className="min-h-screen bg-black relative selection:bg-purple-500/30 text-gray-300">
            {/* Arka plan ışık efekti */}
            <div className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black pointer-events-none"></div>
            
            <Navbar />

            <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 pt-32 pb-20">
                
                {/* Geri Dön Tuşu ve Başlık */}
                <div className="mb-10 flex items-center gap-4">
                    <Link href="/" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors border border-white/10">
                        <ArrowLeft size={18} className="text-white" />
                    </Link>
                    <span className="text-purple-400 font-mono text-xs uppercase tracking-widest">Yasal Metinler</span>
                </div>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-zinc-950/80 backdrop-blur-md border border-white/10 rounded-[32px] p-8 md:p-12 shadow-[0_0_50px_rgba(168,85,247,0.05)]"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                            <ShieldCheck size={26} />
                        </div>
                        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                            Gizlilik Politikası
                        </h1>
                    </div>

                    <p className="text-sm text-gray-400 mb-8 font-mono">
                        Son Güncelleme Tarihi: 2026
                    </p>

                    <div className="space-y-8 text-sm md:text-base leading-relaxed">
                        <section>
                            <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                                1. Giriş ve Kapsam
                            </h2>
                            <p>
                                AuraX Studio ("Biz", "Stüdyo") olarak gizliliğinize büyük önem veriyoruz. Bu Gizlilik Politikası, web sitemizi ziyaret ettiğinizde veya hizmetlerimizden faydalandığınızda kişisel verilerinizin nasıl toplandığını, kullanıldığını ve korunduğunu açıklar.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                                2. Toplanan Bilgiler
                            </h2>
                            <p className="mb-2">Sitemiz üzerinden doğrudan bir üyelik veya otomatik ödeme sistemi bulunmamaktadır. Ancak şu tür bilgileri işleyebiliriz:</p>
                            <ul className="list-disc pl-5 space-y-2 text-gray-400">
                                <strong className="text-white">İletişim Verileri:</strong> E-posta yoluyla bizimle iletişime geçtiğinizde paylaştığınız ad, soyad ve e-posta adresiniz.
                                <br />
                                <strong className="text-white">Sipariş / Sepet Bilgileri:</strong> Sepetinize eklediğiniz konseptler ve tasarım tercihlerinize dair geçici oturum verileri.
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                                3. Bilgilerin Kullanım Amacı
                            </h2>
                            <p>
                                Topladığımız bilgiler yalnızca size özel tasarım süreçlerini yürütmek, talep ettiğiniz projeler hakkında sizinle iletişime geçmek, sepet ve sipariş özetlerinizi yönetmek ve müşteri memnuniyetini artırmak amacıyla kullanılır. Üçüncü taraflarla asla paylaşılmaz.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                                4. Güvenlik
                            </h2>
                            <p>
                                Verilerinizin güvenliğini sağlamak amacıyla modern web standartları, şifreli bağlantılar (SSL) ve güvenli altyapılar kullanılmaktadır. İnternet üzerinden yapılan iletişimlerin hiçbir zaman %100 güvenli olamayacağı unutulmamalıdır.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                                5. İletişim
                            </h2>
                            <p>
                                Gizlilik politikamız hakkında herhangi bir soru sormak veya verilerinizle ilgili bilgi almak için bizimle <a href="mailto:iletisim@auraxstudio.com" className="text-purple-400 underline hover:text-purple-300">iletisim@auraxstudio.com</a> adresi üzerinden iletişime geçebilirsiniz.
                            </p>
                        </section>
                    </div>

                </motion.div>
            </div>

            <Footer />
        </main>
    );
}

