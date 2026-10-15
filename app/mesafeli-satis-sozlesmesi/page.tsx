"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import { ArrowLeft, Scale } from 'lucide-react';

export default function DistanceSellingPage() {
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
                        <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400"><Scale size={26} /></div>
                        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">Mesafeli Satış Sözleşmesi</h1>
                    </div>
                    <p className="text-sm text-gray-400 mb-8 font-mono">Son Güncelleme Tarihi: 2026</p>
                    <div className="space-y-8 text-sm md:text-base leading-relaxed h-[500px] overflow-y-auto pr-4 custom-scrollbar">
                        <section>
                            <h2 className="text-xl font-bold text-white mb-3">Madde 1 - Taraflar</h2>
                            <p><strong>Satıcı:</strong> AuraX Studio Dijital Tasarım Ajansı<br/>
                            <strong>Alıcı:</strong> Siteden sipariş veren müşteri. (Alıcının bilgileri ödeme esnasında beyan edilen bilgilerdir.)</p>
                        </section>
                        <section>
                            <h2 className="text-xl font-bold text-white mb-3">Madde 2 - Sözleşmenin Konusu</h2>
                            <p>İşbu sözleşmenin konusu, ALICI'nın SATICI'ya ait auraxstudio.com internet sitesinden elektronik ortamda siparişini yaptığı, sitede nitelikleri ve satış fiyatı belirtilen ürünün (dijital tasarım hizmetinin) satışı ve teslimi ile ilgili olarak 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği hükümleri gereğince tarafların hak ve yükümlülüklerinin saptanmasıdır.</p>
                        </section>
                        <section>
                            <h2 className="text-xl font-bold text-white mb-3">Madde 3 - Ürün veya Hizmetin Teslimi</h2>
                            <p>Hizmet veya ürün fiziksel bir mal içermediğinden dijital ortamda (E-posta veya Discord gibi iletişim araçlarıyla) teslim edilir. Kargo bedeli veya fiziki nakliyat süreci yoktur. Dosyalar, alıcının onayından sonra gönderilen indirme bağlantılarıyla ifa edilir.</p>
                        </section>
                        <section>
                            <h2 className="text-xl font-bold text-white mb-3">Madde 4 - Cayma Hakkı</h2>
                            <p>Alıcı'nın istekleri veya açıkça onun kişisel ihtiyaçları doğrultusunda hazırlanan, doğası gereği geri gönderilmeye elverişli olmayan veya bilgisayar ortamında anında teslim edilen yazılım, logo veya grafik tasarımları için <strong>cayma hakkı bulunmamaktadır.</strong> İşlem başladıktan ve alıcıya örnek sunulduktan sonra ücret iadesi yapılmaz.</p>
                        </section>
                        <section>
                            <h2 className="text-xl font-bold text-white mb-3">Madde 5 - Yetkili Mahkeme</h2>
                            <p>İşbu sözleşmenin uygulanmasında, Gümrük ve Ticaret Bakanlığınca ilan edilen değere kadar Alıcı'nın mal veya hizmeti satın aldığı veya ikametgahının bulunduğu yerdeki Tüketici Hakem Heyetleri ile Tüketici Mahkemeleri yetkilidir.</p>
                        </section>
                    </div>
                </motion.div>
            </div>
            <Footer />
        </main>
    );
}

