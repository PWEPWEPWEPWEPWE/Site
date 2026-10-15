"use client";
import React, { createContext, useContext, useState } from "react";
export type Language = "tr" | "en" | "de";

type Translations = {
  [key in Language]: {
    navServices: string; navProjects: string; navStore: string; navPricing: string; navPayment: string; navFaq: string;
    contactBtn: string; exploreBtn: string; customBtn: string; notifyBtn: string; notifiedText: string; addToCart: string;
    backBtn: string; legalTextTitle: string; lastUpdate: string;
    heroBadge: string; heroTitle1: string; heroTitle2: string; heroDesc: string;
    servicesBadge: string; servicesTitle1: string; servicesTitle2: string; servicesDesc: string;
    serv1Title: string; serv1Desc: string; serv2Title: string; serv2Desc: string; serv3Title: string; serv3Desc: string; serv4Title: string; serv4Desc: string;
    esportsBadge: string; esportsTitle1: string; esportsTitle2: string; esp1Title: string; esp2Title: string; esp3Title: string; esp4Title: string;
    conceptsBadge: string; conceptsTitle1: string; conceptsTitle2: string;
    logo1: string; logo2: string; logo3: string; logo4: string; category1: string; category2: string; category3: string; category4: string;
    paymentBadge: string; paymentTitle1: string; paymentTitle2: string; paymentDesc: string;
    pricingBadge: string; pricingTitle1: string; pricingTitle2: string; pricingDesc: string;
    plan1Name: string; plan1Desc: string; plan2Name: string; plan2Desc: string; mostPopular: string;
    feat1: string; feat2: string; feat3: string; feat4: string; feat5: string; feat6: string; feat7: string; feat8: string; feat9: string; feat10: string;
    faqBadge: string; faqTitle1: string; faqTitle2: string; faqDesc: string;
    faq1Q: string; faq1A: string; faq2Q: string; faq2A: string; faq3Q: string; faq3A: string; faq4Q: string; faq4A: string;
    footerDesc: string; footerLegalTitle: string; footerLegalText: string;
    privacyPolicy: string; termsOfUse: string; deliveryReturn: string; distanceSelling: string; cookiePolicy: string; explicitConsent: string;
    priv1Title: string; priv1Desc: string; priv2Title: string; priv2Desc: string; priv3Title: string; priv3Desc: string; priv4Title: string; priv4Desc: string;
    term1Title: string; term1Desc: string; term2Title: string; term2Desc: string; term3Title: string; term3Desc: string; term4Title: string; term4Desc: string;
    del1Title: string; del1Desc: string; del2Title: string; del2Desc: string; del3Title: string; del3Desc: string;
    dist1Title: string; dist1Desc: string; dist2Title: string; dist2Desc: string; dist3Title: string; dist3Desc: string; dist4Title: string; dist4Desc: string;
    cook1Title: string; cook1Desc: string; cook2Title: string; cook2Desc: string; cook3Title: string; cook3Desc: string;
    exp1Title: string; exp1Desc: string; exp2Title: string; exp2Desc: string; exp3Title: string; exp3Desc: string;
    cookieBannerTitle: string; cookieBannerDesc: string; cookieAccept: string; cookieDecline: string;
  };
};

const translations: Translations = {
  tr: {
    navServices: "Hizmetler", navProjects: "Vitrini Keşfet", navStore: "Hazır Konseptler", navPricing: "Fiyatlandırma", navPayment: "Ödeme Altyapısı", navFaq: "SSS",
    contactBtn: "İletişime Geç", exploreBtn: "Hizmetleri İncele", customBtn: "Özel Proje Başlat", notifyBtn: "Beni Haberdar Et", notifiedText: "Haberdar Edileceksiniz", addToCart: "Sepete Ekle", backBtn: "Geri", legalTextTitle: "Yasal Metinler", lastUpdate: "Son Güncelleme Tarihi: 2026",
    heroBadge: "YENİ NESİL DİJİTAL AJANS", heroTitle1: "Geleceğin Dijital", heroTitle2: "Aurasını Tasarlayın", heroDesc: "AuraX Studio; Discord botları, web arayüzleri ve rekabetçi e-spor dünyası için sınırları zorlayan fütüristik tasarımlar üretir.",
    servicesBadge: "Ne Yapıyoruz?", servicesTitle1: "Premium Dijital", servicesTitle2: "Çözümler", servicesDesc: "Markanızı bir sonraki seviyeye taşıyacak, modern ve tamamen özelleştirilmiş tasarım hizmetleri sunuyoruz.",
    serv1Title: "Discord Botları", serv1Desc: "Sunucunuza özel, yüksek performanslı ve tamamen özelleştirilebilir Discord bot sistemleri.", serv2Title: "Web Arayüzleri", serv2Desc: "Modern, hızlı ve mobil uyumlu React tabanlı web tasarımları.", serv3Title: "Kurumsal Kimlik", serv3Desc: "E-spor takımları ve markalar için akılda kalıcı logo ve banner tasarımları.", serv4Title: "Hızlı Teslimat", serv4Desc: "Projelerinizi söz verilen sürede, kaliteden ödün vermeden teslim ediyoruz.",
    esportsBadge: "Rekabetçi Ruh", esportsTitle1: "Oyun & E-Spor", esportsTitle2: "Vitrini", esp1Title: "Takım Formaları", esp2Title: "Turnuva Afişleri", esp3Title: "Sunucu Kimliği", esp4Title: "Topluluk Rozetleri",
    conceptsBadge: "Hızlı Teslimat", conceptsTitle1: "Satıştaki", conceptsTitle2: "Logolar",
    logo1: "Apex Vanguard", logo2: "CyberNova", logo3: "Vortex Gaming", logo4: "Aether Syndicate", category1: "E-Spor", category2: "Futuristik", category3: "Topluluk", category4: "Minimal",
    paymentBadge: "Altyapı Geliştirmesi", paymentTitle1: "Ödeme Sistemi", paymentTitle2: "Ekleniyor!", paymentDesc: "Güvenli, hızlı ve resmi ödeme altyapılarımız çok yakında aktif ediliyor.",
    pricingBadge: "Şeffaf Maliyet", pricingTitle1: "Projeniz İçin", pricingTitle2: "Doğru Plan", pricingDesc: "İhtiyaçlarınıza en uygun paketi seçin ve dijital dönüşümünüze hemen başlayın.",
    plan1Name: "Başlangıç", plan1Desc: "Küçük topluluklar ve yayıncılar için ideal paket.", plan2Name: "Profesyonel", plan2Desc: "E-Spor takımları ve büyüyen markalar için tam paket.", mostPopular: "En Çok Tercih Edilen",
    feat1: "1 Adet Logo Tasarımı", feat2: "Temel Renk Paleti", feat3: "Şeffaf Arka Plan", feat4: "2 Revizyon Hakkı", feat5: "3 İş Günü Teslimat", feat6: "VIP Logo Tasarımı", feat7: "Sosyal Medya Kiti", feat8: "Vektörel Dosya", feat9: "Sınırsız Revizyon", feat10: "Öncelikli Destek",
    faqBadge: "Bilgi Merkezi", faqTitle1: "Sıkça Sorulan", faqTitle2: "Sorular", faqDesc: "Sürecimiz, ödeme yöntemlerimiz ve yasal haklarınız hakkında bilmeniz gerekenler.",
    faq1Q: "Ödeme yöntemleri nelerdir?", faq1A: "Banka havalesi, EFT ve FAST üzerinden güvenli ödeme alıyoruz.", faq2Q: "Teslimat süresi ne kadardır?", faq2A: "Standart logolar 3-5 iş günü, arayüzler 1-2 hafta sürmektedir.", faq3Q: "Revizyon hakkım var mı?", faq3A: "Evet, konsept değişmediği sürece ücretsiz revizyon sağlıyoruz.", faq4Q: "Telif hakları kime ait?", faq4A: "Ödeme tamamlandıktan sonra ticari kullanım hakları size devredilir.",
    footerDesc: "Markanızı dijital dünyada bir adım öne taşıyan, premium tasarım stüdyosu.", footerLegalTitle: "Yasal Uyarı & Telif Hakları", footerLegalText: "AuraX Studio'ya ait tüm içerikler koruma altındadır. İzinsiz kullanılamaz.",
    privacyPolicy: "Gizlilik Politikası", termsOfUse: "Kullanım Koşulları", deliveryReturn: "Teslimat ve İade", distanceSelling: "Mesafeli Satış", cookiePolicy: "Çerez Politikası", explicitConsent: "Açık Rıza Metni",
    priv1Title: "1. Giriş", priv1Desc: "Gizliliğinize büyük önem veriyoruz. Bu politika verilerinizin nasıl kullanıldığını açıklar.", priv2Title: "2. Toplanan Bilgiler", priv2Desc: "İletişim bilgileriniz ve geçici sepet verileriniz işlenebilir.", priv3Title: "3. Kullanım Amacı", priv3Desc: "Bilgiler sadece proje süreçlerini yönetmek için kullanılır, satılmaz.", priv4Title: "4. Güvenlik", priv4Desc: "Verileriniz modern SSL standartları ile korunmaktadır.",
    term1Title: "1. Kabul Edilme", term1Desc: "Sitemizi kullanarak şartlarımızı kabul etmiş sayılırsınız.", term2Title: "2. Hizmet Kapsamı", term2Desc: "Tüm tasarım ürünleri dijital ortamda teslim edilir.", term3Title: "3. Fikri Mülkiyet", term3Desc: "Stüdyo, projeleri portföyünde sergileme hakkını saklı tutar.", term4Title: "4. Site Kullanımı", term4Desc: "Kötü niyetli kullanım ve kopyalama kesinlikle yasaktır.",
    del1Title: "1. Dijital Teslimat", del1Desc: "Fiziksel kargo yoktur. Teslimat e-posta ile yapılır.", del2Title: "2. Süreler", del2Desc: "Projeler zorluğuna göre belirtilen sürede teslim edilir.", del3Title: "3. İade Hakkı", del3Desc: "Dijital ürünlerde sürece başlandıktan sonra iade yapılamaz.",
    dist1Title: "Madde 1 - Taraflar", dist1Desc: "Satıcı: AuraX Studio. Alıcı: Siteden hizmet alan kişi.", dist2Title: "Madde 2 - Konu", dist2Desc: "Dijital hizmet satışı hak ve yükümlülüklerinin saptanması.", dist3Title: "Madde 3 - Teslimat", dist3Desc: "Hizmet dijital iletişim araçlarıyla ifa edilir.", dist4Title: "Madde 4 - Cayma Hakkı", dist4Desc: "Anında ifa edilen dijital hizmetlerde cayma hakkı yoktur.",
    cook1Title: "1. Çerez Nedir?", cook1Desc: "Tarayıcınıza kaydedilen küçük tercih dosyalarıdır.", cook2Title: "2. Hangi Çerezler?", cook2Desc: "Sadece dil ve sepet gibi zorunlu çerezleri kullanıyoruz.", cook3Title: "3. Yönetim", cook3Desc: "Tarayıcı ayarlarınızdan çerezleri her zaman silebilirsiniz.",
    exp1Title: "1. Verilerin İşlenmesi Onayı", exp1Desc: "6698 sayılı KVKK kapsamında, AuraX Studio tarafından sunulan dijital hizmetler ve bildirimler çerçevesinde iletişim verilerimin işlenmesine onay veriyorum.",
    exp2Title: "2. İletişim ve Bilgilendirme", exp2Desc: "Kampanyalar, yenilikler ve ödeme altyapısı güncellemeleri hakkında tarafımla elektronik iletişim kurulmasına rıza gösteriyorum.",
    exp3Title: "3. Hakların Kullanımı", exp3Desc: "Açık rızanızı dilediğiniz zaman geri çekme hakkına sahipsiniz.",
    cookieBannerTitle: "Çerez Tercihleri", cookieBannerDesc: "Deneyiminizi iyileştirmek için çerez kullanıyoruz.", cookieAccept: "Kabul Et", cookieDecline: "Reddet"
  },
  en: {
    navServices: "Services", navProjects: "Showcase", navStore: "Concepts", navPricing: "Pricing", navPayment: "Gateway", navFaq: "FAQ",
    contactBtn: "Contact Us", exploreBtn: "Explore Services", customBtn: "Custom Project", notifyBtn: "Notify Me", notifiedText: "Will Notify", addToCart: "Add to Cart", backBtn: "Back", legalTextTitle: "Legal Pages", lastUpdate: "Last Update: 2026",
    heroBadge: "NEXT-GEN DIGITAL AGENCY", heroTitle1: "Design the Digital", heroTitle2: "Aura of the Future", heroDesc: "AuraX Studio creates boundary-pushing futuristic designs for Discord bots, web interfaces, and the competitive esports world.",
    servicesBadge: "What We Do", servicesTitle1: "Premium Digital", servicesTitle2: "Solutions", servicesDesc: "We offer modern, fully customized design services that will take your brand to the next level.",
    serv1Title: "Discord Bots", serv1Desc: "High-performance bot systems built specifically for your server.", serv2Title: "Web Interfaces", serv2Desc: "Modern, fast, and responsive React-based web designs.", serv3Title: "Corporate Identity", serv3Desc: "Memorable logo and banner designs for esports teams.", serv4Title: "Fast Delivery", serv4Desc: "We deliver your projects in the promised time without compromising quality.",
    esportsBadge: "Competitive Spirit", esportsTitle1: "Gaming & Esports", esportsTitle2: "Showcase", esp1Title: "Team Jerseys", esp2Title: "Tournament Banners", esp3Title: "Server Identity", esp4Title: "Community Badges",
    conceptsBadge: "Fast Delivery", conceptsTitle1: "Ready", conceptsTitle2: "Concepts",
    logo1: "Apex Vanguard", logo2: "CyberNova", logo3: "Vortex Gaming", logo4: "Aether Syndicate", category1: "Esports", category2: "Futuristic", category3: "Community", category4: "Minimal",
    paymentBadge: "Infrastructure", paymentTitle1: "Payment System", paymentTitle2: "Coming Soon!", paymentDesc: "Our secure and official payment infrastructures will be active soon.",
    pricingBadge: "Transparent Costs", pricingTitle1: "The Right Plan", pricingTitle2: "For Your Project", pricingDesc: "Choose the package that best suits your needs and start immediately.",
    plan1Name: "Starter", plan1Desc: "Ideal for small communities and streamers.", plan2Name: "Professional", plan2Desc: "Complete package for esports teams and growing brands.", mostPopular: "Most Popular",
    feat1: "1 Logo Design", feat2: "Basic Color Palette", feat3: "Transparent PNG", feat4: "2 Revisions", feat5: "3 Days Delivery", feat6: "VIP Logo Design", feat7: "Social Media Kit", feat8: "Vector File (AI)", feat9: "Unlimited Revisions", feat10: "Priority Support",
    faqBadge: "Info Center", faqTitle1: "Frequently Asked", faqTitle2: "Questions", faqDesc: "Everything you need to know about our process and legal rights.",
    faq1Q: "What are the payment methods?", faq1A: "We accept secure payments via bank transfer and EFT.", faq2Q: "What is the delivery time?", faq2A: "Standard logos take 3-5 days, interfaces take 1-2 weeks.", faq3Q: "Do I have revision rights?", faq3A: "Yes, we provide free revisions if the concept doesn't change.", faq4Q: "Who owns copyrights?", faq4A: "Commercial rights are transferred to you after payment.",
    footerDesc: "A premium design studio that takes your brand one step ahead in the digital world.", footerLegalTitle: "Legal Notice", footerLegalText: "All contents of AuraX Studio are protected. Unauthorized use is prohibited.",
    privacyPolicy: "Privacy Policy", termsOfUse: "Terms of Use", deliveryReturn: "Delivery & Returns", distanceSelling: "Distance Selling", cookiePolicy: "Cookie Policy", explicitConsent: "Explicit Consent",
    priv1Title: "1. Introduction", priv1Desc: "We value your privacy. This policy explains how data is used.", priv2Title: "2. Collected Info", priv2Desc: "Contact and temporary cart data may be processed.", priv3Title: "3. Purpose", priv3Desc: "Information is used only for project management, never sold.", priv4Title: "4. Security", priv4Desc: "Data is protected with modern SSL standards.",
    term1Title: "1. Acceptance", term1Desc: "By using our site, you agree to our terms.", term2Title: "2. Scope", term2Desc: "All design products are delivered digitally.", term3Title: "3. IP Rights", term3Desc: "The studio reserves the right to display projects in its portfolio.", term4Title: "4. Usage", term4Desc: "Malicious use and unauthorized copying are strictly prohibited.",
    del1Title: "1. Digital Delivery", del1Desc: "No physical shipping. Delivered via email.", del2Title: "2. Timing", del2Desc: "Projects are delivered within the stated timeframe.", del3Title: "3. Refunds", del3Desc: "No refunds can be made once the digital process has started.",
    dist1Title: "Article 1 - Parties", dist1Desc: "Seller: AuraX Studio. Buyer: Service recipient.", dist2Title: "Article 2 - Subject", dist2Desc: "Determination of digital service sales rights.", dist3Title: "Article 3 - Delivery", dist3Desc: "Fulfilled through digital communication tools.", dist4Title: "Article 4 - Withdrawal", dist4Desc: "No right of withdrawal for instantly fulfilled digital services.",
    cook1Title: "1. What is a Cookie?", cook1Desc: "Small preference files saved to your browser.", cook2Title: "2. Which Cookies?", cook2Desc: "We only use essential cookies like language and cart.", cook3Title: "3. Management", cook3Desc: "You can always delete cookies from your browser settings.",
    exp1Title: "1. Consent to Data Processing", exp1Desc: "I consent to the processing of my contact data for digital services and notifications.",
    exp2Title: "2. Communication", exp2Desc: "I consent to electronic communication regarding campaigns and updates.",
    exp3Title: "3. Exercise of Rights", exp3Desc: "You have the right to withdraw your explicit consent at any time.",
    cookieBannerTitle: "Cookie Preferences", cookieBannerDesc: "We use cookies to improve your experience.", cookieAccept: "Accept", cookieDecline: "Decline"
  },
  de: {
    navServices: "Dienste", navProjects: "Vitrine", navStore: "Konzepte", navPricing: "Preise", navPayment: "Zahlung", navFaq: "FAQ",
    contactBtn: "Kontakt", exploreBtn: "Dienste ansehen", customBtn: "Projekt starten", notifyBtn: "Benachrichtigen", notifiedText: "Benachrichtigt", addToCart: "In den Warenkorb", backBtn: "Zurück", legalTextTitle: "Rechtliche Seiten", lastUpdate: "Letztes Update: 2026",
    heroBadge: "DIGITALE AGENTUR DER NÄCHSTEN GEN", heroTitle1: "Gestalten Sie die", heroTitle2: "Aura der Zukunft", heroDesc: "AuraX Studio kreiert futuristische Designs für Discord-Bots, Weboberflächen und die kompetitive E-Sport-Welt.",
    servicesBadge: "Was Wir Tun", servicesTitle1: "Premium Digitale", servicesTitle2: "Lösungen", servicesDesc: "Wir bieten moderne, maßgeschneiderte Designdienstleistungen.",
    serv1Title: "Discord Bots", serv1Desc: "Leistungsstarke Bot-Systeme speziell für Ihren Server.", serv2Title: "Web-Oberflächen", serv2Desc: "Schnelle und responsive React-Webdesigns.", serv3Title: "Corporate Identity", serv3Desc: "Einprägsame Logo- und Bannerdesigns für E-Sport-Teams.", serv4Title: "Schnelle Lieferung", serv4Desc: "Wir liefern pünktlich und ohne Qualitätskompromisse.",
    esportsBadge: "Wettbewerbsgeist", esportsTitle1: "Gaming & E-Sports", esportsTitle2: "Vitrine", esp1Title: "Team-Trikots", esp2Title: "Turnierbanner", esp3Title: "Server-Identität", esp4Title: "Community-Abzeichen",
    conceptsBadge: "Schnelle Lieferung", conceptsTitle1: "Fertige", conceptsTitle2: "Konzepte",
    logo1: "Apex Vanguard", logo2: "CyberNova", logo3: "Vortex Gaming", logo4: "Aether Syndicate", category1: "Esports", category2: "Futuristisch", category3: "Community", category4: "Minimal",
    paymentBadge: "Infrastruktur", paymentTitle1: "Zahlungssystem", paymentTitle2: "Kommt Bald!", paymentDesc: "Unsere sicheren Zahlungsinfrastrukturen werden in Kürze aktiv sein.",
    pricingBadge: "Transparente Kosten", pricingTitle1: "Der richtige Plan", pricingTitle2: "für Ihr Projekt", pricingDesc: "Wählen Sie das Paket, das am besten zu Ihren Bedürfnissen passt.",
    plan1Name: "Starter", plan1Desc: "Ideal für kleine Communities.", plan2Name: "Professionell", plan2Desc: "Komplettpaket für Teams und Marken.", mostPopular: "Beliebteste",
    feat1: "1 Logo Design", feat2: "Grundfarbpalette", feat3: "Transparenter PNG", feat4: "2 Revisionen", feat5: "3 Tage Lieferung", feat6: "VIP Logo Design", feat7: "Social Media Kit", feat8: "Vektordatei (AI)", feat9: "Unbegrenzte Revisionen", feat10: "Premium-Support",
    faqBadge: "Informationszentrum", faqTitle1: "Häufig Gestellte", faqTitle2: "Fragen", faqDesc: "Alles, was Sie über unseren Prozess wissen müssen.",
    faq1Q: "Zahlungsmethoden?", faq1A: "Wir akzeptieren sichere Banküberweisungen.", faq2Q: "Lieferzeit?", faq2A: "Logos 3-5 Tage, Interfaces 1-2 Wochen.", faq3Q: "Revisionsrechte?", faq3A: "Ja, solange das Konzept nicht ändert.", faq4Q: "Urheberrechte?", faq4A: "Gehen nach Bezahlung auf Sie über.",
    footerDesc: "Ein Premium-Designstudio, das Ihre Marke voranbringt.", footerLegalTitle: "Rechtlicher Hinweis", footerLegalText: "Alle Inhalte sind geschützt. Unerlaubte Nutzung ist untersagt.",
    privacyPolicy: "Datenschutz", termsOfUse: "Nutzungsbedingungen", deliveryReturn: "Lieferung & Rückgabe", distanceSelling: "Fernabsatz", cookiePolicy: "Cookie-Richtlinie", explicitConsent: "Einwilligungserklärung",
    priv1Title: "1. Einführung", priv1Desc: "Wir schützen Ihre Privatsphäre.", priv2Title: "2. Daten", priv2Desc: "Kontakt- und Warenkorbdaten können verarbeitet werden.", priv3Title: "3. Zweck", priv3Desc: "Daten werden nur intern verwendet.", priv4Title: "4. Sicherheit", priv4Desc: "Geschützt durch moderne SSL-Standards.",
    term1Title: "1. Akzeptanz", term1Desc: "Nutzung bedeutet Zustimmung.", term2Title: "2. Umfang", term2Desc: "Alle Produkte werden digital geliefert.", term3Title: "3. Rechte", term3Desc: "Studio darf Projekte im Portfolio zeigen.", term4Title: "4. Nutzung", term4Desc: "Kopieren ist streng verboten.",
    del1Title: "1. Digitale Lieferung", del1Desc: "Kein physischer Versand.", del2Title: "2. Zeitplan", del2Desc: "Lieferung im vereinbarten Zeitrahmen.", del3Title: "3. Rückerstattung", del3Desc: "Keine Rückerstattung nach Beginn.",
    dist1Title: "Artikel 1", dist1Desc: "Verkäufer: AuraX Studio. Käufer: Kunde.", dist2Title: "Artikel 2", dist2Desc: "Digitale Dienstleistungsrechte.", dist3Title: "Artikel 3", dist3Desc: "Digitale Bereitstellung.", dist4Title: "Artikel 4", dist4Desc: "Kein Widerrufsrecht für digitale Güter.",
    cook1Title: "1. Was sind Cookies?", cook1Desc: "Kleine Präferenzdateien.", cook2Title: "2. Welche Cookies?", cook2Desc: "Nur wesentliche wie Sprache und Warenkorb.", cook3Title: "3. Verwaltung", cook3Desc: "Können im Browser gelöscht werden.",
    exp1Title: "1. Einwilligung zur Datenverarbeitung", exp1Desc: "Ich stimme der Verarbeitung meiner Kontaktdaten für digitale Dienste zu.",
    exp2Title: "2. Kommunikation", exp2Desc: "Ich stimme elektronischer Kommunikation über Kampagnen zu.",
    exp3Title: "3. Ausübung von Rechten", exp3Desc: "Sie können Ihre Einwilligung jederzeit widerrufen.",
    cookieBannerTitle: "Cookie-Präferenzen", cookieBannerDesc: "Wir nutzen Cookies für eine bessere Erfahrung.", cookieAccept: "Akzeptieren", cookieDecline: "Ablehnen"
  }
};

type LanguageContextType = {
  lang: Language; setLang: (lang: Language) => void; t: typeof translations["tr"];
};
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>("tr");
  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within a LanguageProvider");
  return context;
}
