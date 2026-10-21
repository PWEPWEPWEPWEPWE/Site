"use client";

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/language-context';
import AuraXLogo from '@/components/AuraXLogo'; // Logomuzun dosya yolu

export default function Footer() {
    const { t, lang } = useLanguage(); // Dil verilerini ve aktif dili alıyoruz

    // Çeviri dosyasında olmayan çok detaylı yasal telif metnini her dilde koruyoruz
    const legalNoticeText = {
        tr: "AuraX Studio'ya ait tüm grafik, logo ve arayüzler 5846 sayılı Fikir ve Sanat Eserleri Kanunu kapsamında güvence altındadır. İçeriklerin izinsiz kopyalanması veya ticari faaliyete alet edilmesi kesinlikle yasaktır.",
        en: "All graphics, logos, and interfaces belonging to AuraX Studio are protected under copyright laws. Unauthorized copying or commercial use is strictly prohibited.",
        de: "Alle Grafiken, Logos und Schnittstellen von AuraX Studio sind urheberrechtlich geschützt. Unbefugtes Kopieren oder die kommerzielle Nutzung ist strengstens untersagt."
    };

    const copyrightText = {
        tr: "© 2026 AURAX STUDIO. Tüm hakları saklıdır.",
        en: "© 2026 AURAX STUDIO. All rights reserved.",
        de: "© 2026 AURAX STUDIO. Alle Rechte vorbehalten."
    };

    return (
        <footer className="relative w-full border-t border-white/10 bg-transparent py-16 px-6 md:px-12 z-10 mt-10">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">

                {/* Sol Kısım */}
                <div className="max-w-xl">
                    <Link href="/" className="inline-flex items-center gap-3 mb-4 group">
                        {/* 3D ve Neon animasyonlu AuraX Logomuz */}
                        <AuraXLogo className="w-9 h-9" />
                        <span className="text-2xl font-bold tracking-tighter text-white">
                            AURAX <span className="text-purple-500 font-serif italic">STUDIO</span>
                        </span>
                    </Link>
                    <p className="text-gray-400 text-sm leading-relaxed mb-8">
                        {t.footerDesc}
                    </p>

                    {/* YASAL METİNLER MENÜSÜ */}
                    <div className="flex flex-wrap gap-x-6 gap-y-3">
                        <Link href="/gizlilik-politikasi" className="text-xs text-purple-400 hover:text-purple-300 transition-colors underline underline-offset-4">
                            {t.privacyPolicy}
                        </Link>
                        <Link href="/kullanim-kosullari" className="text-xs text-purple-400 hover:text-purple-300 transition-colors underline underline-offset-4">
                            {t.termsOfUse}
                        </Link>
                        <Link href="/teslimat-ve-iade" className="text-xs text-purple-400 hover:text-purple-300 transition-colors underline underline-offset-4">
                            {t.deliveryReturn}
                        </Link>
                        <Link href="/mesafeli-satis-sozlesmesi" className="text-xs text-purple-400 hover:text-purple-300 transition-colors underline underline-offset-4">
                            {t.distanceSelling}
                        </Link>
                        <Link href="/cerez-politikasi" className="text-xs text-purple-400 hover:text-purple-300 transition-colors underline underline-offset-4">
                            {t.cookiePolicy}
                        </Link>
                        <Link href="/acik-riza-metni" className="text-xs text-purple-400 hover:text-purple-300 transition-colors underline underline-offset-4">
                            {t.explicitConsent}
                        </Link>
                    </div>
                </div>

                {/* Sağ Kısım */}
                <div className="max-w-lg border-l border-white/10 pl-6 md:pl-8">
                    <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-2">
                        {t.footerLegalTitle}
                    </h4>
                    <p className="text-gray-500 text-xs leading-relaxed mb-6">
                        {legalNoticeText[lang] || legalNoticeText.tr}
                    </p>
                    <p className="text-purple-400 font-mono text-xs font-semibold">
                        {copyrightText[lang] || copyrightText.tr}
                    </p>
                </div>

            </div>
        </footer>
    );
}

