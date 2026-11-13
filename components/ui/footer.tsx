"use client";

import React from 'react';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="relative bg-[#030303] pt-24 pb-8 mt-20 border-t border-white/5 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                
                {/* ÜST KISIM: 3 SÜTUNLU KESKİN GRID YAPISI */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 border-b border-white/10 pb-16">
                    
                    {/* 1. Sütun: Marka ve Logo (En Geniş Alan) */}
                    <div className="md:col-span-5 flex flex-col items-start">
                        <Link href="/" className="mb-8 hover:opacity-80 transition-opacity duration-300">
                            <img 
                                src="/Aurax_20261109_044639_0000.svg" 
                                alt="AuraX Studio" 
                                className="w-56 md:w-64 h-auto rounded-xl border border-white/10 shadow-lg" 
                            />
                        </Link>
                        <p className="text-gray-400/90 text-sm leading-relaxed max-w-sm mb-8 font-light">
                            Markanızı dijital dünyada bir adım öne taşıyan, modern arayüzler ve unutulmaz kurumsal kimlikler üreten premium tasarım stüdyosu.
                        </p>
                        
                        {/* Teknik Sistem Göstergesi ve HQ Konumu */}
                        <div className="flex items-center gap-3 text-xs font-mono text-gray-500 uppercase tracking-widest bg-white/[0.03] px-4 py-2 rounded-full border border-white/5">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            HQ • SİVAS, TR
                        </div>
                    </div>

                    {/* 2. Sütun: Temiz, Dikey Menü */}
                    <div className="md:col-span-4 flex flex-col md:pl-8">
                        <h3 className="text-white text-xs font-bold tracking-[0.2em] uppercase mb-8">
                            Yasal Belgeler
                        </h3>
                        <ul className="flex flex-col gap-5">
                            {[
                                ['Gizlilik Politikası', '/gizlilik-politikasi'],
                                ['Kullanım Koşulları', '/kullanim-kosullari'],
                                ['Teslimat ve İade', '/teslimat-ve-iade'],
                                ['Mesafeli Satış Sözleşmesi', '/mesafeli-satis-sozlesmesi'],
                                ['Çerez Politikası', '/cerez-politikasi'],
                                ['Açık Rıza Metni', '/acik-riza-metni']
                            ].map(([title, url]) => (
                                <li key={url}>
                                    <Link href={url} className="text-sm text-gray-500 hover:text-white transition-colors duration-300 font-light tracking-wide">
                                        {title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 3. Sütun: Telif ve Bilgi */}
                    <div className="md:col-span-3 flex flex-col">
                        <h3 className="text-white text-xs font-bold tracking-[0.2em] uppercase mb-8">
                            Telif Hakları
                        </h3>
                        <p className="text-gray-500 text-xs leading-relaxed mb-auto font-light">
                            AuraX Studio'ya ait tüm grafik, logo ve arayüzler 5846 sayılı Fikir ve Sanat Eserleri Kanunu kapsamında güvence altındadır. İzinsiz kopyalanamaz.
                        </p>
                        
                        <div className="mt-12 pt-6 border-t border-white/10">
                            <p className="text-white/60 font-mono text-xs tracking-wider">
                                © 2026 AURAX STUDIO
                            </p>
                        </div>
                    </div>
                </div>

                {/* ALT KISIM: DEV TİPOGRAFİ (WATERMARK) */}
                <div className="mt-8 flex justify-center items-center opacity-[0.02] select-none pointer-events-none overflow-hidden">
                    <h1 className="text-[15vw] font-black tracking-tighter text-white uppercase leading-none">
                        AURAX
                    </h1>
                </div>
                
            </div>
        </footer>
    );
}

