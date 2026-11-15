"use client";

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface Duyuru {
  id: number;
  baslik: string;
  ozet?: string;
  icerik: string;
  tarih: string;
  yazar: string;
  gorsel?: string | null;
  kategori: string;
}

interface DuyurularClientProps {
  duyurular: Duyuru[];
}

export default function DuyurularClient({ duyurular }: DuyurularClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('Tümü');
  const [activeModalDuyuru, setActiveModalDuyuru] = useState<Duyuru | null>(null);

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = Array.from(new Set(duyurular.map((d) => d.kategori)));
    return ['Tümü', ...cats];
  }, [duyurular]);

  // Filtered duyurular
  const filteredDuyurular = useMemo(() => {
    if (selectedCategory === 'Tümü') return duyurular;
    return duyurular.filter((d) => d.kategori === selectedCategory);
  }, [duyurular, selectedCategory]);

  // Featured (pinned) is the first item in the list or filtered list
  const featuredDuyuru = duyurular[0];
  const remainingDuyurular = filteredDuyurular.filter(
    (d) => selectedCategory === 'Tümü' ? d.id !== featuredDuyuru?.id : true
  );

  return (
    <div className="min-h-screen bg-black pt-32 pb-24 px-6 md:px-12 relative overflow-hidden">
      {/* Arka Plan Parlamaları */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-purple-900/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-fuchsia-900/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Başlık ve Açıklama */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center md:text-left mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-4">
            Duyurular & <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-500">Güncellemeler</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl">
            AuraX Studio cephesindeki en son gelişmeleri, sürüm notlarını ve duyuruları buradan takip edin.
          </p>
        </motion.div>

        {/* Kategori Filtresi */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap items-center gap-3 mb-12 border-b border-white/10 pb-6"
        >
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`relative px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? 'text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]'
                    : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeFilterBg"
                    className="absolute inset-0 bg-gradient-to-r from-purple-600 to-fuchsia-600 rounded-xl -z-10"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                {cat}
              </button>
            );
          })}
        </motion.div>

        {/* Öne Çıkan (Sabitlenmiş) Duyuru Kartı (Sadece 'Tümü' seçiliyken veya filtrelenmiş listede ilk elemansa gösterilebilir) */}
        {selectedCategory === 'Tümü' && featuredDuyuru && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -4 }}
            onClick={() => setActiveModalDuyuru(featuredDuyuru)}
            className="group relative cursor-pointer bg-white/[0.04] backdrop-blur-2xl border border-purple-500/40 rounded-3xl p-8 md:p-10 mb-12 shadow-[0_0_40px_rgba(168,85,247,0.15)] hover:border-purple-400/60 transition-all duration-300 overflow-hidden"
          >
            {/* Arka plan gradyan parıltısı */}
            <div className="absolute -right-20 -top-20 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none group-hover:bg-purple-600/20 transition-all duration-500" />
            
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="px-3.5 py-1.5 bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg shadow-purple-500/30 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                Yeni / Öne Çıkan
              </span>
              <span className="px-3.5 py-1.5 bg-white/10 border border-white/10 text-purple-300 text-xs font-bold uppercase tracking-wider rounded-full">
                {featuredDuyuru.kategori}
              </span>
              <span className="text-gray-400 text-sm font-medium flex items-center gap-2 ml-auto">
                <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                {featuredDuyuru.tarih}
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight group-hover:text-purple-300 transition-colors">
              {featuredDuyuru.baslik}
            </h2>

            <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-8 line-clamp-3">
              {featuredDuyuru.ozet || featuredDuyuru.icerik}
            </p>

            <div className="flex items-center justify-between pt-6 border-t border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300 font-bold text-sm">
                  {featuredDuyuru.yazar.charAt(0)}
                </div>
                <div>
                  <p className="text-xs text-gray-400">Yazar</p>
                  <p className="text-sm font-semibold text-white">{featuredDuyuru.yazar}</p>
                </div>
              </div>

              <span className="inline-flex items-center gap-2 text-sm font-semibold text-purple-400 group-hover:text-purple-300 transition-colors">
                Devamını Oku
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </span>
            </div>
          </motion.div>
        )}

        {/* Diğer Duyurular Grid Düzeni */}
        {remainingDuyurular.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {remainingDuyurular.map((duyuru, index) => (
              <motion.article
                key={duyuru.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4 }}
                onClick={() => setActiveModalDuyuru(duyuru)}
                className="group cursor-pointer bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 hover:border-purple-500/40 hover:shadow-[0_0_30px_rgba(168,85,247,0.1)] transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                    <span className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-bold uppercase tracking-wider rounded-full">
                      {duyuru.kategori}
                    </span>
                    <span className="text-gray-400 text-xs font-medium flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                      {duyuru.tarih}
                    </span>
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3 leading-tight group-hover:text-purple-300 transition-colors">
                    {duyuru.baslik}
                  </h3>

                  <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-6 line-clamp-3">
                    {duyuru.ozet || duyuru.icerik}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between mt-auto">
                  <span className="text-xs text-gray-400 font-medium">
                    Yazar: <span className="text-gray-200">{duyuru.yazar}</span>
                  </span>
                  <span className="text-xs font-semibold text-purple-400 group-hover:text-purple-300 flex items-center gap-1">
                    Detaylar
                    <svg className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                  </span>
                </div>
              </motion.article>
            ))}
          </div>
        ) : (
          // Boş Durum (Empty State)
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20 bg-white/[0.02] border border-white/10 rounded-3xl backdrop-blur-xl"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path></svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Bu Kategoride Duyuru Bulunamadı</h3>
            <p className="text-gray-400 text-sm mb-6">Seçtiğiniz kategoride henüz bir paylaşım yapılmamıştır.</p>
            <button
              onClick={() => setSelectedCategory('Tümü')}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white font-medium text-sm shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all"
            >
              Tüm Duyuruları Göster
            </button>
          </motion.div>
        )}
      </div>

      {/* Detay Penceresi (Modal) */}
      <AnimatePresence>
        {activeModalDuyuru && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 overflow-y-auto">
            {/* Arka Plan Karartması */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModalDuyuru(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal İçeriği */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', duration: 0.5, bounce: 0.1 }}
              className="relative w-full max-w-2xl bg-neutral-950/90 border border-white/15 rounded-3xl p-6 md:p-8 backdrop-blur-2xl shadow-2xl shadow-purple-950/50 z-10 overflow-hidden max-h-[90vh] flex flex-col"
            >
              {/* Üst Kısım & Kapatma Butonu */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-bold uppercase tracking-wider rounded-full">
                    {activeModalDuyuru.kategori}
                  </span>
                  <span className="text-gray-400 text-xs">{activeModalDuyuru.tarih}</span>
                </div>
                <button
                  onClick={() => setActiveModalDuyuru(null)}
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
              </div>

              {/* Scroll Edilebilir İçerik */}
              <div className="overflow-y-auto pr-1 space-y-6">
                <h2 className="text-2xl md:text-3xl font-extrabold text-white leading-tight">
                  {activeModalDuyuru.baslik}
                </h2>

                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-300 font-bold text-xs">
                    {activeModalDuyuru.yazar.charAt(0)}
                  </div>
                  <span>Yayınlayan: <strong className="text-white">{activeModalDuyuru.yazar}</strong></span>
                </div>

                <p className="text-gray-300 text-base md:text-lg leading-relaxed whitespace-pre-wrap">
                  {activeModalDuyuru.icerik}
                </p>

                {activeModalDuyuru.gorsel && (
                  <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_30px_rgba(168,85,247,0.2)] mt-6">
                    <Image
                      src={activeModalDuyuru.gorsel}
                      alt={activeModalDuyuru.baslik}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 700px"
                    />
                  </div>
                )}
              </div>

              {/* Alt Kısım Kapat Butonu */}
              <div className="pt-6 border-t border-white/10 mt-6 flex justify-end">
                <button
                  onClick={() => setActiveModalDuyuru(null)}
                  className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-medium text-sm border border-white/10 transition-all"
                >
                  Kapat
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
