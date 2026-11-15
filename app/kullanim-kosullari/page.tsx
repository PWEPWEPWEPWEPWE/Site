"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import PolicyPageLayout from '@/components/ui/policy-page-layout';

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export default function TermsOfUsePage() {
    return (
        <PolicyPageLayout title="Kullanım Koşulları" icon={<FileText size={26} />}>
            <motion.section variants={itemVariants}>
                <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                    1. Kabul Edilme
                </h2>
                <p>AuraX Studio web sitesini ziyaret ederek ve hizmetlerimizden yararlanarak bu kullanım koşullarını kabul etmiş sayılırsınız. Şartları kabul etmiyorsanız lütfen siteyi kullanmayınız.</p>
            </motion.section>

            <motion.section variants={itemVariants}>
                <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                    2. Hizmet Kapsamı
                </h2>
                <p>AuraX Studio; Discord sunucuları, E-Spor takımları ve web projeleri için dijital tasarım çözümleri sunar. Satın alınan tüm ürünler dijital ortamda teslim edilir.</p>
            </motion.section>

            <motion.section variants={itemVariants}>
                <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                    3. Fikri Mülkiyet
                </h2>
                <p>Ödemesi tamamlanıp tarafınıza teslim edilen logoların ve tasarımların ticari kullanım hakkı size aittir. Ancak AuraX Studio, projeleri kendi referans portföyünde sergileme hakkını saklı tutar.</p>
            </motion.section>

            <motion.section variants={itemVariants}>
                <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                    4. Site Kullanımı
                </h2>
                <p>Sitemizin kodlarına sızmaya çalışmak, haksız kazanç sağlamak amacıyla açıklardan faydalanmak veya tasarımları izinsiz kopyalamak kesinlikle yasaktır.</p>
            </motion.section>
        </PolicyPageLayout>
    );
}
