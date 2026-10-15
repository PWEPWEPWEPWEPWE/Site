"use client";

import { cn } from "@/lib/utils";
import SmoothButton from "@/components/ui/smooth-button";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useId, useState } from "react";
import { ShoppingBag, Check, Image as ImageIcon } from "lucide-react";

export interface ProductCardProps {
  badge?: string;
  className?: string;
  currency?: string;
  image: string;
  onAddToCart?: () => void;
  onWishlist?: () => void;
  originalPrice?: number;
  price: number;
  rating?: number;
  title: string;
  hideButton?: boolean; 
}

const SPRING = { bounce: 0.1, duration: 0.25, type: "spring" as const };
const SPRING_BOUNCY = { bounce: 0.2, duration: 0.3, type: "spring" as const };
const STAR_PATH = "M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.562.562 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z";

function StarIcon({ filled, half }: { filled: boolean; half?: boolean }) {
  const id = useId();
  if (half) {
    const gradientId = `half-star-${id}`;
    return (
      <svg aria-hidden="true" className="h-3.5 w-3.5 text-amber-400" viewBox="0 0 24 24">
        <defs><linearGradient id={gradientId}><stop offset="50%" stopColor="currentColor" /><stop offset="50%" stopColor="transparent" /></linearGradient></defs>
        <path d={STAR_PATH} fill={`url(#${gradientId})`} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
      </svg>
    );
  }
  return (
    <svg aria-hidden="true" className={cn("h-3.5 w-3.5", filled ? "text-amber-400" : "text-zinc-600")} fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth={filled ? 0 : 1.5} viewBox="0 0 24 24">
      <path d={STAR_PATH} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function RatingStars({ rating, title }: { rating: number; title: string }) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.25 && rating - fullStars < 0.75;
  const roundedUp = rating - fullStars >= 0.75;

  return (
    <div aria-label={`${rating} out of 5 stars`} className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => {
        const isFilled = i < fullStars || (roundedUp && i === fullStars);
        const isHalf = hasHalf && i === fullStars;
        return <StarIcon filled={isFilled} half={isHalf} key={`star-${title}-${i}`} />;
      })}
      <span className="ml-1 font-medium text-zinc-400 text-xs">{rating}</span>
    </div>
  );
}

export default function ProductCard({
  image, title, price, originalPrice, currency = "₺", rating, badge, onAddToCart, hideButton, className,
}: ProductCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const [isHoverDevice, setIsHoverDevice] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    setIsHoverDevice(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setIsHoverDevice(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const handleAddToCart = () => {
    setIsAdded(true);
    onAddToCart?.();
    setTimeout(() => setIsAdded(false), 2000);
  };

  const hasDiscount = originalPrice !== undefined && originalPrice > price;
  const discountPercent = hasDiscount ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  return (
    <motion.div
      aria-label={`${title} - ${currency}${price}`}
      className={cn(
        "group relative flex w-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/80 backdrop-blur-md shadow-sm transition-all duration-300",
        isHoverDevice && "hover:border-purple-500/40 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] hover:-translate-y-1",
        className,
      )}
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, transform: "translateY(20px) scale(0.97)" }}
      viewport={{ margin: "-50px", once: true }}
      whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, transform: "translateY(0px) scale(1)" }}
    >
      {/* Resim var mı yok mu kontrolü */}
      <div className="relative aspect-video md:aspect-square overflow-hidden bg-zinc-900 border-b border-white/5">
        {image ? (
            <>
                <img alt={title} className={cn("h-full w-full object-cover", !shouldReduceMotion && "transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]", isHoverDevice && !shouldReduceMotion && "group-hover:scale-105")} draggable={false} src={image} />
                <div className={cn("pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300", isHoverDevice && "group-hover:opacity-100")} />
            </>
        ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-950/50 group-hover:bg-zinc-900/50 transition-colors duration-500">
                <ImageIcon size={32} className="text-white/10 mb-3 group-hover:text-purple-400/50 group-hover:scale-110 transition-all duration-500" />
                <span className="text-[10px] text-white/30 font-mono tracking-widest uppercase px-4 text-center">
                    Görseller Daha Sonra Eklenecek
                </span>
            </div>
        )}

        {badge && (
          <motion.span
            className={cn("absolute top-3 left-3 rounded-full px-2.5 py-1 font-bold text-xs shadow-sm", badge.toLowerCase() === "indirim" ? "bg-red-500 text-white" : badge.toLowerCase() === "yeni" ? "bg-emerald-500 text-white" : "bg-purple-600 text-white")}
          >
            {badge}
          </motion.span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="line-clamp-1 font-bold text-white text-lg tracking-tight">{title}</h3>
        {rating !== undefined && <RatingStars rating={rating} title={title} />}

        <div className="flex items-baseline gap-2 mt-1">
          <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 text-2xl tracking-tight">
            {currency}{price}
          </span>
          {hasDiscount && (
            <>
              <span className="text-zinc-500 text-sm line-through">{currency}{originalPrice}</span>
              <span className="rounded-md bg-purple-500/20 px-1.5 py-0.5 font-semibold text-purple-400 text-xs">-{discountPercent}%</span>
            </>
          )}
        </div>

        {!hideButton && (
            <div className="mt-auto pt-4">
            <SmoothButton
                className={cn("w-full gap-2", isAdded && "bg-emerald-600 text-white hover:bg-emerald-600")}
                disabled={isAdded} onClick={handleAddToCart} size="default" variant="candy"
            >
                <AnimatePresence initial={false} mode="wait">
                {isAdded ? (
                    <motion.span key="added" animate={{ opacity: 1, transform: "scale(1)" }} exit={{ opacity: 0, transform: "scale(0.8)" }} initial={{ opacity: 0, transform: "scale(0.8)" }} className="flex items-center gap-2">
                    <Check size={16} /> Seçildi
                    </motion.span>
                ) : (
                    <motion.span key="cart" animate={{ opacity: 1, transform: "scale(1)" }} exit={{ opacity: 0, transform: "scale(0.8)" }} initial={{ opacity: 0, transform: "scale(0.8)" }} className="flex items-center gap-2">
                    <ShoppingBag size={16} /> Satın Al
                    </motion.span>
                )}
                </AnimatePresence>
            </SmoothButton>
            </div>
        )}
      </div>
    </motion.div>
  );
}

