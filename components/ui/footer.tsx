"use client";

import React from 'react';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="relative w-full border-t border-white/10 bg-transparent py-16 px-6 md:px-12 z-10 mt-10">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-12 md:gap-16">

                {/* Sol Kısım - Büyütülmüş Logo ve Açıklama */}
                <div className="max-w-xl flex flex-col items-center md:items-start text-center md:text-left">
                    <Link href="/" className="inline-block mb-8 group">
                        <img 
                            src="/Aurax_20261109_044639_0000.svg" 
                            alt="AuraX Studio" 
                            /* Logo boyutunu w-56 (Mobil) ve w-72 (Masaüstü) olarak devasa şekilde artırdık */
                            className="w-56 md:w-72 h-auto object-contain rounded-xl shadow-[0_0_30px_rgba(168,85,247,0.25)] transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_40px_rgba(168,85,247,0.4)]" 
                        />
                    </Link>
                    <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-8 max-w-md">
                        Markanızı dijital dünyada bir adım öne taşıyan, modern arayüzler ve unutulmaz kurumsal kimlikler üreten premium tasarım stüdyosu.
                    </p>

                    {/* YASAL METİNLER MENÜSÜ */}
                    <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-4">
                        <Link href="/gizlilik-politikasi" className="text-xs md:text-sm text-purple-400 hover:text-purple-300 transition-colors underline underline-offset-4">Gizlilik Politikası</Link>
                        <Link href="/kullanim-kosullari" className="text-xs md:text-sm text-purple-400 hover:text-purple-300 transition-colors underline underline-offset-4">Kullanım Koşulları</Link>
                        <Link href="/teslimat-ve-iade" className="text-xs md:text-sm text-purple-400 hover:text-purple-300 transition-colors underline underline-offset-4">Teslimat ve İade</Link>
                        <Link href="/mesafeli-satis-sozlesmesi" className="text-xs md:text-sm text-purple-400 hover:text-purple-300 transition-colors underline underline-offset-4">Mesafeli Satış</Link>
                        <Link href="/cerez-politikasi" className="text-xs md:text-sm text-purple-400 hover:text-purple-300 transition-colors underline underline-offset-4">Çerez Politikası</Link>
                        <Link href="/acik-riza-metni" className="text-xs md:text-sm text-purple-400 hover:text-purple-300 transition-colors underline underline-offset-4">Açık Rıza Metni</Link>
                    </div>
                </div>

                {/* Sağ Kısım - Yasal Uyarı ve Kutu Tasarımı */}
                <div className="max-w-lg md:border-l border-white/10 md:pl-10 flex flex-col items-center md:items-start text-center md:text-left mt-4 md:mt-0">
                    <h4 className="text-white font-bold text-sm md:text-base uppercase tracking-wider mb-4">
                        Yasal Uyarı & Telif Hakları
                    </h4>
                    <p className="text-gray-500 text-xs md:text-sm leading-relaxed mb-8">
                        AuraX Studio'ya ait tüm grafik, logo ve arayüzler 5846 sayılı Fikir ve Sanat Eserleri Kanunu kapsamında güvence altındadır. İçeriklerin izinsiz kopyalanması veya ticari faaliyete alet edilmesi kesinlikle yasaktır.
                    </p>
                    
                    {/* Siberpunk / Neon Çerçeveli Telif Yazısı */}
                    <div className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-purple-900/10 border border-purple-500/30">
                        <p className="text-purple-400 font-mono text-xs md:text-sm font-semibold tracking-wide">
                            © 2026 AURAX STUDIO
                        </p>
                    </div>
                </div>

            </div>
        </footer>
    );
}

