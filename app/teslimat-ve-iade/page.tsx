"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCw } from 'lucide-react';
import PolicyPageLayout from '@/components/ui/policy-page-layout';

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export default function DeliveryAndReturnPage() {
    return (
        <PolicyPageLayout title="Teslimat ve İade" icon={<RefreshCw size={26} />}>
            <motion.section variants={itemVariants}>
                <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                    1. Dijital Teslimat Şartları
                </h2>
                <p>AuraX Studio üzerinden satın aldığınız tüm hizmetler "Dijital Ürün" statüsündedir. Herhangi bir fiziksel kargo veya nakliye işlemi yapılmaz. Projeleriniz tamamlandığında, kaynak dosyalarıyla birlikte E-posta veya Discord üzerinden dijital olarak teslim edilir.</p>
            </motion.section>

            <motion.section variants={itemVariants}>
                <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                    2. Teslimat Süreleri
                </h2>
                <p>Standart hazır konsept logolar genellikle aynı iş günü içinde, özel çizim gerektiren VIP tasarımlar veya paketler ise projenin zorluğuna göre tarafınıza önceden bildirilen sürede teslim edilir (Ortalama 3-7 İş Günü).</p>
            </motion.section>

            <motion.section variants={itemVariants}>
                <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                    3. İade ve Cayma Hakkı
                </h2>
                <p className="mb-2">T.C. Mesafeli Sözleşmeler Yönetmeliği uyarınca, "Elektronik ortamda anında ifa edilen hizmetler veya tüketiciye anında teslim edilen gayrimaddi mallar" cayma hakkının istisnaları arasındadır.</p>
                <ul className="list-disc pl-5 space-y-2 text-gray-400 mt-2">
                    <li>Özel tasarım sürecine (çizime) başlanmış projelerde ücret iadesi yapılamaz.</li>
                    <li>Hazır konsept logolarda satın alım tamamlanıp dosya teslim edildikten sonra iade kabul edilmez.</li>
                    <li>Siparişi verdikten sonra, projeye <strong className="text-white">henüz başlanmamışsa</strong> koşulsuz olarak iptal ve tam iade talebinde bulunabilirsiniz.</li>
                </ul>
            </motion.section>
        </PolicyPageLayout>
    );
}
