import React from 'react';
import { Metadata } from 'next';
import { ShieldCheck } from 'lucide-react';
import PolicyPageLayout from '@/components/ui/policy-page-layout';
import { StaggerContainer, StaggerItem } from '@/components/MotionPrimitives';

export const metadata: Metadata = {
    title: "Gizlilik Politikası | AuraX Studio",
    description: "AuraX Studio gizlilik politikası ve kişisel verilerin korunması hakkında bilgilendirme.",
};

export default function PrivacyPolicyPage() {
    return (
        <PolicyPageLayout title="Gizlilik Politikası" icon={<ShieldCheck size={26} />}>
            <StaggerContainer className="space-y-8">
                <StaggerItem>
                    <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                        1. Giriş ve Kapsam
                    </h2>
                    <p>
                        AuraX Studio ("Biz", "Stüdyo") olarak gizliliğinize büyük önem veriyoruz. Bu Gizlilik Politikası, web sitemizi ziyaret ettiğinizde veya hizmetlerimizden faydalandığınızda kişisel verilerinizin nasıl toplandığını, kullanıldığını ve korunduğunu açıklar.
                    </p>
                </StaggerItem>

                <StaggerItem>
                    <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                        2. Toplanan Bilgiler
                    </h2>
                    <p className="mb-2">Sitemiz üzerinden doğrudan bir üyelik veya otomatik ödeme sistemi bulunmamaktadır. Ancak şu tür bilgileri işleyebiliriz:</p>
                    <ul className="list-disc pl-5 space-y-2 text-gray-400">
                        <li><strong className="text-white">İletişim Verileri:</strong> E-posta yoluyla bizimle iletişime geçtiğinizde paylaştığınız ad, soyad ve e-posta adresiniz.</li>
                        <li><strong className="text-white">Sipariş / Sepet Bilgileri:</strong> Sepetinize eklediğiniz konseptler ve tasarım tercihlerinize dair geçici oturum verileri.</li>
                    </ul>
                </StaggerItem>

                <StaggerItem>
                    <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                        3. Bilgilerin Kullanım Amacı
                    </h2>
                    <p>
                        Topladığımız bilgiler yalnızca size özel tasarım süreçlerini yürütmek, talep ettiğiniz projeler hakkında sizinle iletişime geçmek, sepet ve sipariş özetlerinizi yönetmek ve müşteri memnuniyetini artırmak amacıyla kullanılır. Üçüncü taraflarla asla paylaşılmaz.
                    </p>
                </StaggerItem>

                <StaggerItem>
                    <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                        4. Güvenlik
                    </h2>
                    <p>
                        Verilerinizin güvenliğini sağlamak amacıyla modern web standartları, şifreli bağlantılar (SSL) ve güvenli altyapılar kullanılmaktadır. İnternet üzerinden yapılan iletişimlerin hiçbir zaman %100 güvenli olamayacağı unutulmamalıdır.
                    </p>
                </StaggerItem>

                <StaggerItem>
                    <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                        5. İletişim
                    </h2>
                    <p>
                        Gizlilik politikamız hakkında herhangi bir soru sormak veya verilerinizle ilgili bilgi almak için bizimle <a href="mailto:iletisim@auraxstudio.com" className="text-purple-400 underline hover:text-purple-300">iletisim@auraxstudio.com</a> adresi üzerinden iletişime geçebilirsiniz.
                    </p>
                </StaggerItem>
            </StaggerContainer>
        </PolicyPageLayout>
    );
}
