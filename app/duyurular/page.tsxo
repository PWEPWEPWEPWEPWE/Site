import React from 'react';
import Image from 'next/image';
import { duyurular } from '@/lib/duyurular';

export const metadata = {
  title: 'Duyurular | AuraX Studio',
  description: 'AuraX Studio hakkında en güncel duyurular ve sistem güncellemeleri.',
};

export default function DuyurularPage() {
  return (
    <div className="min-h-screen bg-black pt-32 pb-24 px-6 md:px-12 relative overflow-hidden">
      {/* Arka Plan Parlamaları */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-purple-900/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-fuchsia-900/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
          Duyurular & <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-500">Güncellemeler</span>
        </h1>
        <p className="text-gray-400 mb-12 text-lg">AuraX Studio cephesindeki son gelişmeleri buradan takip edebilirsiniz.</p>

        <div className="space-y-12">
          {duyurular.map((duyuru) => (
            <article 
              key={duyuru.id} 
              className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-md hover:border-purple-500/30 transition-colors"
            >
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <span className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-bold uppercase tracking-wider rounded-full">
                  {duyuru.kategori}
                </span>
                <span className="text-gray-400 text-sm font-medium flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                  {duyuru.tarih}
                </span>
                <span className="text-gray-400 text-sm font-medium flex items-center gap-2 border-l border-white/20 pl-4">
                  <svg className="w-4 h-4 text-fuchsia-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                  {duyuru.yazar}
                </span>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
                {duyuru.baslik}
              </h2>

              <p className="text-gray-300 leading-relaxed text-base md:text-lg mb-6 whitespace-pre-wrap">
                {duyuru.icerik}
              </p>

              {duyuru.gorsel && (
                <div className="relative w-full aspect-[4/5] md:aspect-video rounded-xl overflow-hidden mt-6 border border-white/10 shadow-[0_0_30px_rgba(232,121,249,0.15)]">
                  <Image 
                    src={duyuru.gorsel} 
                    alt={duyuru.baslik}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 800px"
                  />
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

