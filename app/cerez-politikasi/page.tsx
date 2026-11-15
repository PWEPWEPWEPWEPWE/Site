import React from 'react';
import { Metadata } from 'next';
import { Cookie } from 'lucide-react';
import PolicyPageLayout from '@/components/ui/policy-page-layout';
import { StaggerContainer, StaggerItem } from '@/components/MotionPrimitives';

export const metadata: Metadata = {
    title: "Çerez Politikası | AuraX Studio",
    description: "AuraX Studio çerez politikası ve çerez kullanım yönetimi.",
};

export default function CookiePolicyPage() {
    return (
        <PolicyPageLayout title="Çerez Politikası" icon={<Cookie size={26} />}>
            <StaggerContainer className="space-y-8">
                <StaggerItem>
                    <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                        1. Çerez (Cookie) Nedir?
                    </h2>
                    <p>Çerezler, web sitemizi ziyaret ettiğinizde tarayıcınız aracılığıyla cihazınıza (bilgisayar, telefon vb.) kaydedilen küçük metin dosyalarıdır. Sitemizin düzgün çalışmasını sağlamak ve deneyiminizi kişiselleştirmek amacıyla kullanılırlar.</p>
                </StaggerItem>

                <StaggerItem>
                    <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                        2. Hangi Çerezleri Kullanıyoruz?
                    </h2>
                    <ul className="list-disc pl-5 space-y-2 text-gray-400">
                        <li><strong className="text-white">Zorunlu Çerezler:</strong> Web sitesinin çalışması ve özelliklerinin (örneğin sepet altyapısı ve dil seçimi) kullanılabilmesi için kesinlikle gerekli olan çerezlerdir.</li>
                        <li><strong className="text-white">Tercih Çerezleri:</strong> Dil seçiminiz veya çerezleri kabul edip etmediğiniz gibi tercihlerinizi hatırlamamızı sağlar (Örn: <code className="bg-white/10 px-1 py-0.5 rounded text-purple-300">aurax_cookie_consent</code>).</li>
                    </ul>
                </StaggerItem>

                <StaggerItem>
                    <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                        3. Çerezlerin Yönetimi
                    </h2>
                    <p>Tarayıcınızın ayarlarını değiştirerek çerezlere ilişkin tercihlerinizi kişiselleştirme imkanına sahipsiniz. Çerezleri tamamen reddederseniz sitemizdeki bazı özellikler (örneğin dil tercihlerinin kaydedilmesi) düzgün çalışmayabilir.</p>
                </StaggerItem>
            </StaggerContainer>
        </PolicyPageLayout>
    );
}
