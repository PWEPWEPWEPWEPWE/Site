"use client";

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from "@/components/ui/navbar";
import AetherFlowHero from "@/components/ui/aether-flow-hero";
import FeaturesSection from "@/components/ui/features-section";
import BotSystemsSection from "@/components/ui/bot-systems-section";
import EsportsShowcase from "@/components/ui/esports-showcase";
import LogosForSale from "@/components/ui/logos-for-sale";
import PricingSection from "@/components/ui/pricing-section";
import SpecialDesignSection from "@/components/ui/special-design-section";
import PaymentGatewaySection from "@/components/ui/payment-gateway-section";
import FaqSection from "@/components/ui/faq-section";
import Footer from "@/components/ui/footer";
// Stok bıraktığımız Yükleme Ekranı Bileşenini içe aktarıyoruz
import Component from "@/components/ui/ai-loader";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Animasyonun oynayabilmesi için 2.5 saniye (2500ms) ekranda kalmasını sağlıyoruz
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); 

    // Ekran yüklenirken sayfanın aşağı kaydırılmasını engelle
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => clearTimeout(timer);
  }, [isLoading]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="ai-loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }} // 0.8 saniyede yumuşakça kaybolarak ana siteyi gösterir
            className="fixed inset-0 z-[9999] flex min-h-screen items-center justify-center bg-black"
          >
            <Component />
          </motion.div>
        )}
      </AnimatePresence>

      <main className="App min-h-screen relative selection:bg-purple-500/30">
        <Navbar />
        <AetherFlowHero />
        <FeaturesSection />
        <BotSystemsSection />
        <EsportsShowcase />
        <LogosForSale />
        <PaymentGatewaySection />
        <PricingSection />
        <SpecialDesignSection />
        <FaqSection />
        <Footer />
      </main>
    </>
  );
}

