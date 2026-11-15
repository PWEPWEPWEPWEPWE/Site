import React from 'react';
import { Metadata } from 'next';
import { CheckCircle2 } from 'lucide-react';
import PolicyPageLayout from '@/components/ui/policy-page-layout';
import { StaggerContainer, StaggerItem } from '@/components/MotionPrimitives';

export const metadata: Metadata = {
    title: "Açık Rıza Metni | AuraX Studio",
    description: "KVKK kapsamında açık rıza ve bilgilendirme metni.",
};

export default function ExplicitConsentPage() {
    return (
        <PolicyPageLayout title="Açık Rıza Metni" icon={<CheckCircle2 size={26} />}>
            <StaggerContainer className="space-y-8">
                <StaggerItem>
                    <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                        1. Verilerin İşlenmesi Onayı
                    </h2>
                    <p>6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") kapsamında, AuraX Studio tarafından sunulan dijital hizmetler, e-spor tasarımları, web arayüzleri ve bildirim hizmetleri çerçevesinde kimlik ve iletişim verilerimin işlenmesine onay veriyorum.</p>
                </StaggerItem>

                <StaggerItem>
                    <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                        2. İletişim ve Bilgilendirme
                    </h2>
                    <p>Kampanyalar, yenilikler, özel tasarım indirimleri ve ödeme altyapısı güncellemeleri hakkında tarafımla elektronik iletişim kurulmasına ve bilgilendirme mailleri gönderilmesine rıza gösteriyorum.</p>
                </StaggerItem>

                <StaggerItem>
                    <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                        3. Hakların Kullanımı
                    </h2>
                    <p>Açık rızanızı dilediğiniz zaman kurumsal iletişim adresimiz üzerinden geri çekme hakkına sahipsiniz.</p>
                </StaggerItem>
            </StaggerContainer>
        </PolicyPageLayout>
    );
}
