"use client";

import React from 'react';
import Link from 'next/link';

export default function Footer() {
    return (
        /* Ana kapsayıcı: Sayfa kenarlarından boşluklu, yüzen ada görünümü */
        <div className="w-full px-4 md:px-8 pb-8 pt-20">
            <footer className="relative w-full max-w-7xl mx-auto bg-[#080808] rounded-[3rem] border border-white/10 overflow-hidden shadow-[0_0_80px_rgba(168,85,247,0.07)]">
                
                {/* Dekoratif Işık Hüzmeleri (Tasarımın 0'dan yaratılan ruhu) */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50" />
                <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

                <div className="px-6 py-16 md:py-24 flex flex-col items-center text-center relative z-10">
                    
                    {/* DEV LOGO SUNUMU */}
                    <div className="mb-10 relative group cursor-pointer">
                        <div className="absolute inset-0 bg-fuchsia-500/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                        <img 
                            src="/Aurax_20261109_044639_0000.svg" 
                            alt="AuraX Studio" 
                            /* Logo boyutunu muazzam derecede büyüttük, odaktaki tek yıldız o */
                            className="w-72 md:w-[450px] h-auto relative z-10 transition-transform duration-700 group-hover:scale-105 drop-shadow-2xl"
                        />
                    </div>

                    {/* AuraX Sloganı */}
                    <h2 className="text-2xl md:text-4xl font-black text-white mb-6 tracking-tight">
                        Dijital Evrenin <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-500">Yeni Aurası.</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto mb-16 text-sm md:text-base font-light">
                        Sıradanlığı reddeden markalar için premium web arayüzleri, e-spor odaklı kurumsal kimlikler ve unutulmaz dijital deneyimler tasarlıyoruz.
                    </p>

                    {/* Kapsül İçinde Yasal Linkler */}
                    <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10 bg-white/[0.02] px-8 py-5 rounded-full border border-white/[0.05] mb-20 backdrop-blur-xl">
                        {[
                            ['Gizlilik', '/gizlilik-politikasi'],
                            ['Koşullar', '/kullanim-kosullari'],
                            ['İade', '/teslimat-ve-iade'],
                            ['Mesafeli Satış', '/mesafeli-satis-sozlesmesi'],
                            ['Çerez', '/cerez-politikasi'],
                            ['Açık Rıza', '/acik-riza-metni']
                        ].map(([title, url]) => (
                            <Link key={url} href={url} className="text-xs md:text-sm font-medium text-gray-400 hover:text-purple-400 transition-colors tracking-wide">
                                {title}
                            </Link>
                        ))}
                    </div>

                    {/* Alt Bilgi ve Telif Barı */}
                    <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6 px-4 md:px-12 border-t border-white/[0.05] pt-10">
                        <p className="text-gray-600 text-xs text-center md:text-left max-w-md font-light">
                            5846 sayılı Fikir ve Sanat Eserleri Kanunu kapsamında güvence altındadır. Tüm tasarımlar AuraX Studio mülkiyetindedir.
                        </p>
                        
                        <div className="flex items-center gap-4 bg-black/50 px-6 py-3 rounded-2xl border border-white/5">
                            <span className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_12px_rgba(168,85,247,0.8)] animate-pulse"></span>
                            <span className="text-gray-300 font-mono text-xs tracking-[0.2em] font-bold">
                                © 2026 AURAX STUDIO
                            </span>
                        </div>
                    </div>

                </div>
            </footer>
        </div>
    );
}

