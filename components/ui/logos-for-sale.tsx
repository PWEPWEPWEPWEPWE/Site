"use client";

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import ProductCard from "@/components/ui/product-card";
import { useCart } from '@/context/cart-context';
import { useLanguage } from "@/context/language-context"; // 🌐 GLOBAL DİL KANCASI EKLENDİ

export default function LogosForSale() {
    const { t, lang } = useLanguage(); // 🌐 DİL SÖZLÜĞÜNÜ ÇEKİYORUZ
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
    const { addToCart } = useCart();

    // Dil seçimine göre rozet (İndirim / Premium) çevirileri
    const discountBadge = lang === "tr" ? "İndirim" : lang === "de" ? "Rabatt" : "Sale";
    const premiumBadge = "Premium"; // Genelde evrensel kullanılır

    // Logoları dinamik hale getirdik (Kategoriler sözlükten çekiliyor)
    const logos = [
        { id: "L1", title: t.logo1, category: t.category1, price: 750, image: "" },
        { id: "L2", title: t.logo2, category: t.category2, price: 600, image: "" },
        { id: "L3", title: t.logo3, category: t.category3, price: 500, originalPrice: 800, badge: discountBadge, image: "" },
        { id: "L4", title: t.logo4, category: t.category4, price: 900, badge: premiumBadge, image: "" }
    ];

    return (
        <section id="satistaki-logolar" ref={sectionRef} className="relative w-full py-20 px-6 md:px-12 bg-transparent z-10">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, filter: "blur(20px)", scale: 0.9 }}
                    animate={isInView ? { opacity: 1, filter: "blur(0px)", scale: 1 } : { opacity: 0, filter: "blur(20px)", scale: 0.9 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="flex flex-col items-start lg:items-center text-left lg:text-center mb-16"
                >
                    <span className="text-purple-500 font-bold tracking-widest uppercase mb-4 text-sm flex items-center gap-2">
                        <span className="w-8 h-[2px] bg-purple-500 inline-block"></span>
                        {/* Hazır Konseptler */}
                        {t.conceptsBadge}
                        <span className="w-8 h-[2px] bg-purple-500 inline-block hidden lg:block"></span>
                    </span>
                    <h2 className="text-5xl md:text-7xl font-extrabold text-white tracking-tighter leading-tight">
                        {/* Satıştaki Logolar */}
                        {t.conceptsTitle1} <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-500 to-purple-600 ml-2">{t.conceptsTitle2}</span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-12">
                    {logos.map((logo) => (
                        <ProductCard
                            key={logo.id}
                            image={logo.image}
                            price={logo.price}
                            originalPrice={logo.originalPrice}
                            badge={logo.badge}
                            title={logo.title}
                            onAddToCart={() => addToCart({ id: logo.id, title: logo.title, price: logo.price, image: logo.image, category: logo.category })}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

