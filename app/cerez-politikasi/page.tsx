"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Cookie } from 'lucide-react';
import PolicyPageLayout from '@/components/ui/policy-page-layout';

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export default function CookiePolicyPage() {
    return (
        <PolicyPageLayout title="Çerez Politikası" icon={<Cookie size={26} />}>
            <motion.section variants={itemVariants}>
                <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                    1. Çerez (Cookie) Nedir?
                </h2>
                <p>Çerezler, web sitemizi ziyaret ettiğinizde tarayıcınız aracılığıyla cihazınıza (bilgisayar, telefon vb.) kaydedilen küçük metin dosyalarıdır. Sitemizin düzgün çalışmasını sağlamak ve deneyiminizi kişiselleştirmek amacıyla kullanılırlar.</p>
            </motion.section>

            <motion.section variants={itemVariants}>
                <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                    2. Hangi Çerezleri Kullanıyoruz?
                </h2>
                <ul className="list-disc pl-5 space-y-2 text-gray-400">
                    <li><strong className="text-white">Zorunlu Çerezler:</strong> Web sitesinin çalışması ve özelliklerinin (örneğin sepet altyapısı ve dil seçimi) kullanılabilmesi için kesinlikle gerekli olan çerezlerdir.</li>
                    <li><strong className="text-white">Tercih Çerezleri:</strong> Dil seçiminiz veya çerezleri kabul edip etmediğiniz gibi tercihlerinizi hatırlamamızı sağlar (Örn: <code className="bg-white/10 px-1 py-0.5 rounded text-purple-300">aurax_cookie_consent</code>).</li>
                </ul>
            </motion.section>

            <motion.section variants={itemVariants}>
                <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                    3. Çerezlerin Yönetimi
                </h2>
                <p>Tarayıcınızın ayarlarını değiştirerek çerezlere ilişkin tercihlerinizi kişiselleştirme imkanına sahipsiniz. Çerezleri tamamen reddederseniz sitemizdeki bazı özellikler (örneğin dil tercihlerinin kaydedilmesi) düzgün çalışmayabilir.</p>
            </motion.section>
        </PolicyPageLayout>
    );
}
