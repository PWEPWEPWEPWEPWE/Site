"use client";

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
    {
        question: "Ödeme yöntemleri nelerdir?",
        answer: "Banka havalesi, EFT ve FAST üzerinden güvenli bir şekilde ödeme alıyoruz. Proje büyüklüğüne göre başlangıçta kapora talep edilebilir."
    },
    {
        question: "Teslimat süresi ortalama ne kadardır?",
        answer: "Kapsama göre değişmekle birlikte; standart logolar ortalama 3-5 iş günü, kapsamlı arayüz tasarımları ise 1-2 hafta sürmektedir."
    },
    {
        question: "Revizyon (Düzenleme) hakkım var mı?",
        answer: "Evet, tasarımın ana konsepti tamamen değişmediği sürece renk, font, yerleşim ve detaylandırma gibi konularda içinize sinene kadar ücretsiz revizyon sağlıyoruz."
    },
    {
        question: "Telif hakları bana mı geçiyor?",
        answer: "Tasarım onaylanıp ödeme işlemi tamamlandıktan sonra, logoların ve tüm kaynak dosyalarının ticari kullanım hakları tamamen size devredilir."
    },
    {
        question: "Teslimat formatları nelerdir?",
        answer: "Logolarınız yüksek çözünürlüklü JPG/PNG, arka planı şeffaf (saydam) format ve istenildiği takdirde vektörel (SVG/AI) proje dosyalarıyla teslim edilir."
    },
    {
        question: "İptal ve iade politikanız nedir?",
        answer: "Tasarım sürecine başlanmadan önce iptal ederseniz kaporanız tam iade edilir. Çizim süreci başladıktan sonra iptal edilirse, harcanan emek bedeli kesilerek kısmi iade sağlanabilir."
    }
];

const FAQItem = ({ faq, index }: { faq: any, index: number }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="mb-4 relative z-10"
        >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full text-left px-6 py-5 rounded-2xl flex items-center justify-between transition-all duration-300 border backdrop-blur-md ${
                    isOpen 
                    ? 'bg-purple-900/10 border-purple-500/40 shadow-[0_0_20px_rgba(168,85,247,0.1)]' 
                    : 'bg-zinc-950/80 border-white/10 hover:border-white/20 hover:bg-zinc-900/80'
                }`}
            >
                <span className={`font-semibold md:text-lg tracking-tight transition-colors ${isOpen ? 'text-purple-300' : 'text-white'}`}>
                    {faq.question}
                </span>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-purple-500 text-white rotate-180 shadow-[0_0_10px_rgba(168,85,247,0.5)]' : 'bg-white/5 text-gray-400 border border-white/10'}`}>
                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                </div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="px-6 pb-6 pt-2 text-gray-400 leading-relaxed border-x border-b border-purple-500/20 rounded-b-2xl bg-purple-900/5 mx-4 -mt-2">
                            {faq.answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default function FaqSection() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    return (
        <section id="sss" ref={sectionRef} className="relative w-full py-24 px-6 md:px-12 bg-transparent z-10">
            <div className="max-w-4xl mx-auto">
                
                {/* Diğer bölümlerle uyumlu Sola Dayalı Başlık Alanı */}
                <motion.div 
                    initial={{ opacity: 0, filter: "blur(20px)", scale: 0.9 }}
                    animate={isInView ? { opacity: 1, filter: "blur(0px)", scale: 1 } : { opacity: 0, filter: "blur(20px)", scale: 0.9 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="flex flex-col items-start text-left mb-16"
                >
                    <span className="text-purple-500 font-bold tracking-widest uppercase mb-4 text-sm flex items-center gap-2">
                        <span className="w-8 h-[2px] bg-purple-500 inline-block"></span>
                        Bilgi Merkezi
                    <span className="w-8 h-[2px] bg-purple-500 inline-block hidden lg:block"></span>
                    </span>
                    <h2 className="text-5xl md:text-7xl font-extrabold text-white tracking-tighter leading-tight mb-4">
                        Sıkça Sorulan <br className="lg:hidden" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-500 to-purple-600">
                            Sorular
                        </span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl">
                        Sürecimiz, teslimat aşamaları, ödeme yöntemlerimiz ve yasal haklarınız hakkında bilmeniz gereken tüm temel detaylar.
                    </p>
                </motion.div>

                {/* Soru Listesi (Akordeon) */}
                <div className="relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[300px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none z-0"></div>
                    
                    {faqs.map((faq, index) => (
                        <FAQItem key={index} faq={faq} index={index} />
                    ))}
                </div>

            </div>
        </section>
    );
}


