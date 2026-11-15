"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Scale } from 'lucide-react';
import PolicyPageLayout from '@/components/ui/policy-page-layout';

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export default function DistanceSellingPage() {
    return (
        <PolicyPageLayout title="Mesafeli Satış Sözleşmesi" icon={<Scale size={26} />} scrollable={true}>
            <motion.section variants={itemVariants}>
                <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                    Madde 1 - Taraflar
                </h2>
                <p><strong>Satıcı:</strong> AuraX Studio Dijital Tasarım Ajansı<br/>
                <strong>Alıcı:</strong> Siteden sipariş veren müşteri. (Alıcının bilgileri ödeme esnasında beyan edilen bilgilerdir.)</p>
            </motion.section>

            <motion.section variants={itemVariants}>
                <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                    Madde 2 - Sözleşmenin Konusu
                </h2>
                <p>İşbu sözleşmenin konusu, ALICI'nın SATICI'ya ait auraxstudio.com internet sitesinden elektronik ortamda siparişini yaptığı, sitede nitelikleri ve satış fiyatı belirtilen ürünün (dijital tasarım hizmetinin) satışı ve teslimi ile ilgili olarak 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği hükümleri gereğince tarafların hak ve yükümlülüklerinin saptanmasıdır.</p>
            </motion.section>

            <motion.section variants={itemVariants}>
                <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                    Madde 3 - Ürün veya Hizmetin Teslimi
                </h2>
                <p>Hizmet veya ürün fiziksel bir mal içermediğinden dijital ortamda (E-posta veya Discord gibi iletişim araçlarıyla) teslim edilir. Kargo bedeli veya fiziki nakliyat süreci yoktur. Dosyalar, alıcının onayından sonra gönderilen indirme bağlantılarıyla ifa edilir.</p>
            </motion.section>

            <motion.section variants={itemVariants}>
                <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                    Madde 4 - Cayma Hakkı
                </h2>
                <p>Alıcı'nın istekleri veya açıkça onun kişisel ihtiyaçları doğrultusunda hazırlanan, doğası gereği geri gönderilmeye elverişli olmayan veya bilgisayar ortamında anında teslim edilen yazılım, logo veya grafik tasarımları için <strong>cayma hakkı bulunmamaktadır.</strong> İşlem başladıktan ve alıcıya örnek sunulduktan sonra ücret iadesi yapılmaz.</p>
            </motion.section>

            <motion.section variants={itemVariants}>
                <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                    Madde 5 - Yetkili Mahkeme
                </h2>
                <p>İşbu sözleşmenin uygulanmasında, Gümrük ve Ticaret Bakanlığınca ilan edilen değere kadar Alıcı'nın mal veya hizmeti satın aldığı veya ikametgahının bulunduğu yerdeki Tüketici Hakem Heyetleri ile Tüketici Mahkemeleri yetkilidir.</p>
            </motion.section>
        </PolicyPageLayout>
    );
}
