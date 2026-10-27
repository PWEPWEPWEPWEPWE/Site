"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { duyurular } from '@/lib/duyurular';

export default function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const unreadCount = duyurular.length; // Şimdilik hepsini okunmamış varsayıyoruz

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-300 hover:text-white transition-colors focus:outline-none"
      >
        {/* Zil İkonu */}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        
        {/* Bildirim Sayısı Rozeti */}
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-purple-500 text-[10px] font-bold text-white shadow-[0_0_8px_rgba(168,85,247,0.8)]">
            {unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-3 w-80 rounded-xl border border-white/10 bg-black/90 backdrop-blur-xl shadow-2xl shadow-purple-900/20 z-50 overflow-hidden"
          >
            <div className="border-b border-white/10 bg-white/5 px-4 py-3 flex justify-between items-center">
              <h3 className="text-sm font-semibold text-white">Bildirimler</h3>
              <span className="text-xs text-purple-400 bg-purple-400/10 px-2 py-1 rounded-md">{unreadCount} Yeni</span>
            </div>
            
            <div className="max-h-[300px] overflow-y-auto">
              {duyurular.map((duyuru) => (
                <Link 
                  href="/duyurular" 
                  key={duyuru.id}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 border-b border-white/5 hover:bg-white/5 transition-colors"
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-fuchsia-400">{duyuru.kategori}</span>
                    <span className="text-[10px] text-gray-500">{duyuru.tarih}</span>
                  </div>
                  <p className="text-sm font-medium text-gray-200 mb-1 leading-snug">{duyuru.baslik}</p>
                  <p className="text-xs text-gray-400 line-clamp-2">{duyuru.ozet}</p>
                </Link>
              ))}
            </div>
            
            <div className="p-2 bg-black">
              <Link 
                href="/duyurular"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center text-xs text-purple-400 hover:text-purple-300 py-2 rounded-lg hover:bg-white/5 transition-colors"
              >
                Tüm Duyuruları Görüntüle
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

