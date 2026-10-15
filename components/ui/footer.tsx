"use client";

import React from 'react';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="relative w-full border-t border-white/10 bg-transparent py-16 px-6 md:px-12 z-10 mt-10">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
                
                {/* Sol Kısım */}
                <div className="max-w-xl">
                    <Link href="/" className="text-2xl font-bold tracking-tighter text-white inline-block mb-4">
                        AURAX <span className="text-purple-500 font-serif italic">STUDIO</span>
                    </Link>
                    <p className="text-gray-400 text-sm leading-relaxed mb-8">
                        Markanızı dijital dünyada bir adım öne taşıyan, modern arayüzler ve unutulmaz kurumsal kimlikler üreten premium tasarım stüdyosu.
                    </p>
                    
                    {/* YASAL METİNLER MENÜSÜ */}
                    <div className="flex flex-wrap gap-x-6 gap-y-3">
                        <Link href="/gizlilik-politikasi" className="text-xs text-purple-400 hover:text-purple-300 transition-colors underline underline-offset-4">
                            Gizlilik Politikası
                        </Link>
                        <Link href="/kullanim-kosullari" className="text-xs text-purple-400 hover:text-purple-300 transition-colors underline underline-offset-4">
                            Kullanım Koşulları
                        </Link>
                        <Link href="/teslimat-ve-iade" className="text-xs text-purple-400 hover:text-purple-300 transition-colors underline underline-offset-4">
                            Teslimat ve İade
                        </Link>
                        <Link href="/mesafeli-satis-sozlesmesi" className="text-xs text-purple-400 hover:text-purple-300 transition-colors underline underline-offset-4">
                            Mesafeli Satış
                        </Link>
                        <Link href="/cerez-politikasi" className="text-xs text-purple-400 hover:text-purple-300 transition-colors underline underline-offset-4">
                            Çerez Politikası
                        </Link>
                        <Link href="/acik-riza-metni" className="text-xs text-purple-400 hover:text-purple-300 transition-colors underline underline-offset-4">
                            Açık Rıza Metni
                        </Link>
                    </div>
                </div>

                {/* Sağ Kısım */}
                <div className="max-w-lg border-l border-white/10 pl-6 md:pl-8">
                    <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-2">
                        Yasal Uyarı & Telif Hakları
                    </h4>
                    <p className="text-gray-500 text-xs leading-relaxed mb-6">
                        AuraX Studio'ya ait tüm grafik, logo ve arayüzler 5846 sayılı Fikir ve Sanat Eserleri Kanunu kapsamında güvence altındadır. İçeriklerin izinsiz kopyalanması veya ticari faaliyete alet edilmesi kesinlikle yasaktır.
                    </p>
                    <p className="text-purple-400 font-mono text-xs font-semibold">
                        © 2026 AURAX STUDIO. Tüm hakları saklıdır.
                    </p>
                </div>

            </div>
        </footer>
    );
}


