import React from 'react';
import { Metadata } from 'next';
import { FileText } from 'lucide-react';
import PolicyPageLayout from '@/components/ui/policy-page-layout';
import { StaggerContainer, StaggerItem } from '@/components/MotionPrimitives';

export const metadata: Metadata = {
    title: "Kullanım Koşulları | AuraX Studio",
    description: "AuraX Studio hizmet kullanım koşulları ve fikri mülkiyet hakları.",
};

export default function TermsOfUsePage() {
    return (
        <PolicyPageLayout title="Kullanım Koşulları" icon={<FileText size={26} />}>
            <StaggerContainer className="space-y-8">
                <StaggerItem>
                    <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                        1. Kabul Edilme
                    </h2>
                    <p>AuraX Studio web sitesini ziyaret ederek ve hizmetlerimizden yararlanarak bu kullanım koşullarını kabul etmiş sayılırsınız. Şartları kabul etmiyorsanız lütfen siteyi kullanmayınız.</p>
                </StaggerItem>

                <StaggerItem>
                    <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                        2. Hizmet Kapsamı
                    </h2>
                    <p>AuraX Studio; Discord sunucuları, E-Spor takımları ve web projeleri için dijital tasarım çözümleri sunar. Satın alınan tüm ürünler dijital ortamda teslim edilir.</p>
                </StaggerItem>

                <StaggerItem>
                    <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                        3. Fikri Mülkiyet
                    </h2>
                    <p>Ödemesi tamamlanıp tarafınıza teslim edilen logoların ve tasarımların ticari kullanım hakkı size aittir. Ancak AuraX Studio, projeleri kendi referans portföyünde sergileme hakkını saklı tutar.</p>
                </StaggerItem>

                <StaggerItem>
                    <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                        4. Site Kullanımı
                    </h2>
                    <p>Sitemizin kodlarına sızmaya çalışmak, haksız kazanç sağlamak amacıyla açıklardan faydalanmak veya tasarımları izinsiz kopyalamak kesinlikle yasaktır.</p>
                </StaggerItem>
            </StaggerContainer>
        </PolicyPageLayout>
    );
}
