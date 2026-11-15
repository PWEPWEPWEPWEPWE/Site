import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/cart-context";
import { StoreProvider } from '@/context/store-context';
import { LanguageProvider } from "@/context/language-context";
import CookieBanner from "@/components/ui/cookie-banner"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AuraX Studio",
  description: "Modern Dijital Deneyim",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="dark">
      <body className={inter.className}>
        {/* StoreProvider'ı buraya, tüm sistemin en dışına ekledik */}
        <StoreProvider>
          <LanguageProvider>
            <CartProvider>
              {children}
              <CookieBanner />
            </CartProvider>
          </LanguageProvider>
        </StoreProvider>
      </body>
    </html>
  );
}

