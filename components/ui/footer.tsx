"use client";

import React from 'react';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="relative w-full mt-20 overflow-hidden">
            
            {/* 1. ARKAPLAN ORTAM IŞIĞI (AMBIENT GLOW) */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-40 bg-purple-600/20 blur-[120px] -z-10 rounded-full pointer-events-none" />

            {/* BUZLU CAM ZEMİN */}
            <div className="relative border-t border-white/10 bg-black/40 backdrop-blur-2xl py-16 px-6 md:px-12 z-10">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-16">
                    
                    {/* SOL KISIM: GLOW EFEKTLİ LOGO VE LİNKLER */}
                    <div className="max-w-xl flex flex-col items-center md:items-start w-full">
                        
                        {/* Logo Kutusu - Üzerine gelince arkasından neon ışık sızar */}
                        <Link href="/" className="group relative inline-block mb-10">
                            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-fuchsia-600 rounded-2xl blur opacity-20 group-hover:opacity-60 transition duration-700"></div>
                            <img 
                                src="/Aurax_20261109_044639_0000.svg" 
                                alt="AuraX Studio" 
                                className="relative w-64 md:w-80 h-auto object-contain rounded-2xl border border-white/10 bg-black/60 shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]" 
                            />
                        </Link>

                        <p className="text-gray-400/80 text-sm leading-relaxed mb-10 text-center md:text-left font-light max-w-md">
                            Markanızı dijital dünyada bir adım öne taşıyan, modern arayüzler ve unutulmaz kurumsal kimlikler üreten <strong className="text-purple-400 font-medium">premium tasarım stüdyosu.</strong>
                        </p>

                        {/* Yasal Linkler - Profesyonel Grid ve Hover Noktaları */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-4 w-full">
                            {[
                                ['Gizlilik Politikası', '/gizlilik-politikasi'],
                                ['Kullanım Koşulları', '/kullanim-kosullari'],
                                ['Teslimat ve İade', '/teslimat-ve-iade'],
                                ['Mesafeli Satış', '/mesafeli-satis-sozlesmesi'],
                                ['Çerez Politikası', '/cerez-politikasi'],
                                ['Açık Rıza Metni', '/acik-riza-metni']
                            ].map(([title, url]) => (
                                <Link key={url} href={url} className="text-xs md:text-sm text-gray-500 hover:text-purple-300 transition-all duration-300 flex items-center gap-2 group/link">
                                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500/0 group-hover/link:bg-purple-500 transition-colors duration-300"></span>
                                    {title}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* SAĞ KISIM: NEON TELİF KUTUSU VE YASAL UYARI */}
                    <div className="w-full md:max-w-sm flex flex-col items-center md:items-end text-center md:text-right mt-4 md:mt-0">
                        {/* Cam Efektli Sağ Panel */}
                        <div className="p-8 rounded-3xl bg-gradient-to-b from-white/[0.04] to-transparent border border-white/[0.05] backdrop-blur-md w-full shadow-2xl">
                            <h4 className="text-white font-bold text-sm uppercase tracking-[0.2em] mb-4 flex items-center justify-center md:justify-end gap-3">
                                Yasal Uyarı
                                <div className="hidden md:block w-12 h-[1px] bg-gradient-to-r from-purple-500 to-transparent"></div>
                            </h4>
                            <p className="text-gray-500/80 text-xs leading-relaxed mb-8 font-light">
                                AuraX Studio'ya ait tüm grafik, logo ve arayüzler 5846 sayılı Fikir ve Sanat Eserleri Kanunu kapsamında güvence altındadır. İçeriklerin izinsiz kopyalanması kesinlikle yasaktır.
                            </p>
                            
                            {/* Canlı Sunucu Hissi Veren Pulse Efektli Telif Rozeti */}
                            <div className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-black/50 border border-purple-500/20 w-full justify-center shadow-[inset_0_0_20px_rgba(168,85,247,0.05)] transition-colors hover:border-purple-500/40">
                                <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse shadow-[0_0_10px_rgba(168,85,247,0.8)]"></div>
                                <p className="text-purple-300 font-mono text-xs font-semibold tracking-widest">
                                    © 2026 AURAX
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </footer>
    );
}

