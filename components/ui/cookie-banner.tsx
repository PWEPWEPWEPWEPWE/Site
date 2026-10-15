"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Cookie, X } from 'lucide-react';

export default function CookieBanner() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Kullanıcı daha önce seçim yaptıysa banner'ı gösterme
        const consent = localStorage.getItem('aurax_cookie_consent');
        if (!consent) {
            // Biraz gecikmeli çıksın ki sayfa yüklenir yüklenmez rahatsız etmesin
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('aurax_cookie_consent', 'accepted');
        setIsVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem('aurax_cookie_consent', 'declined');
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 150, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 150, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:bottom-8 md:max-w-sm z-[100]"
                >
                    <div className="bg-zinc-950/90 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-[0_10px_50px_rgba(168,85,247,0.15)] relative overflow-hidden">
                        
                        {/* Kapatma İkonu */}
                        <button onClick={handleDecline} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors">
                            <X size={16} />
                        </button>

                        <div className="flex items-start gap-4 mb-4">
                            <div className="w-10 h-10 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center flex-shrink-0 text-purple-400">
                                <Cookie size={20} />
                            </div>
                            <div>
                                <h4 className="text-white font-bold text-sm mb-1">Çerez Tercihleri</h4>
                                <p className="text-gray-400 text-xs leading-relaxed">
                                    Size daha iyi bir deneyim sunabilmek için çerezleri kullanıyoruz. Detaylı bilgi için <Link href="/cerez-politikasi" className="text-purple-400 underline hover:text-purple-300">Çerez Politikamızı</Link> inceleyebilirsiniz.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 mt-5">
                            <button 
                                onClick={handleDecline}
                                className="flex-1 py-2.5 rounded-xl text-xs font-bold text-gray-400 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white transition-all"
                            >
                                Reddet
                            </button>
                            <button 
                                onClick={handleAccept}
                                className="flex-1 py-2.5 rounded-xl text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all"
                            >
                                Kabul Et
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

