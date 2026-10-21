"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function AuraXLogo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Arka plan neon parlaması (Aura Efekti) */}
      <motion.div 
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 bg-gradient-to-tr from-purple-600 to-fuchsia-500 blur-md rounded-full"
      />
      
      {/* Keskin Fütüristik A Geometrisi */}
      <svg 
        viewBox="0 0 40 40" 
        className="relative z-10 w-full h-full drop-shadow-[0_0_8px_rgba(232,121,249,0.5)]" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M20 4L4 32H12L20 18L28 32H36L20 4Z" 
          fill="url(#aura-gradient)" 
        />
        <path 
          d="M14 25H26" 
          stroke="url(#aura-gradient)" 
          strokeWidth="3.5" 
          strokeLinecap="round" 
        />
        <defs>
          <linearGradient id="aura-gradient" x1="4" y1="4" x2="36" y2="32" gradientUnits="userSpaceOnUse">
            <stop stopColor="#c084fc" /> {/* Tailwind purple-400 */}
            <stop offset="1" stopColor="#e879f9" /> {/* Tailwind fuchsia-400 */}
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

