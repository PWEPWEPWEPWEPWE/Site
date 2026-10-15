"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Hexagon, Menu, Globe, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage, Language } from "@/context/language-context";

const EXPAND_SCROLL_THRESHOLD = 80;

const containerVariants = {
  expanded: {
    y: 0,
    opacity: 1,
    left: "50%",
    x: "-50%",
    width: "auto",
    borderRadius: "9999px",
    borderRightWidth: "1px",
    transition: {
      left: { type: "spring", damping: 22, stiffness: 250 },
      x: { type: "spring", damping: 22, stiffness: 250 },
      borderRadius: { duration: 0.2 },
      borderRightWidth: { duration: 0.2 },
      opacity: { duration: 0.3 },
      y: { type: "spring", damping: 20, stiffness: 300 },
      width: { delay: 0.3, type: "spring", damping: 22, stiffness: 250 },
      delayChildren: 0.4,
      staggerChildren: 0.05,
    },
  },
  collapsed: {
    y: 0,
    opacity: 1,
    width: "3.5rem",
    left: "100%",
    x: "-100%",
    borderRadius: "9999px 0 0 9999px",
    borderRightWidth: "0px",
    transition: {
      when: "afterChildren",
      staggerChildren: 0.05,
      staggerDirection: -1,
      width: { type: "spring", damping: 22, stiffness: 250 },
      left: { delay: 0.35, type: "spring", damping: 22, stiffness: 250 },
      x: { delay: 0.35, type: "spring", damping: 22, stiffness: 250 },
      borderRadius: { delay: 0.35, duration: 0.2 },
      borderRightWidth: { delay: 0.35, duration: 0.2 },
    },
  },
  hoverCollapsed: {
    x: "-115%",
    transition: { type: "spring", damping: 20, stiffness: 300 }
  }
};

const logoVariants = {
  expanded: { opacity: 1, x: 0, rotate: 0, transition: { type: "spring", damping: 15 } },
  collapsed: { opacity: 0, x: -25, rotate: -180, transition: { duration: 0.3 } },
};

const itemVariants = {
  expanded: { opacity: 1, x: 0, scale: 1, transition: { type: "spring", damping: 15 } },
  collapsed: { opacity: 0, x: -20, scale: 0.95, transition: { duration: 0.2 } },
};

const collapsedIconVariants = {
  expanded: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
  collapsed: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", damping: 15, stiffness: 300, delay: 0.1 }
  },
};

export default function Navbar() {
  const [isExpanded, setExpanded] = React.useState(true);
  const [isMounted, setIsMounted] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = React.useState(false);

  const { lang, setLang, t } = useLanguage();
  const pathname = usePathname();

  const { scrollY } = useScroll();
  const lastScrollY = React.useRef(0);
  const scrollPositionOnCollapse = React.useRef(0);

  const navItems = [
    { name: "AuraX", href: "/" },
    { name: t.navServices, href: "/#hizmetler" },
    { name: "E-Spor", href: "/#espor-vitrini" },
    { name: "Sepet", href: "/sepet" },
    { name: "SSS", href: "/sss" },
  ];

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  // Sayfa dışına tıklandığında masaüstü dil menüsünü kapat
  React.useEffect(() => {
    const handleClickOutside = () => setLangDropdownOpen(false);
    if (langDropdownOpen) {
      window.addEventListener("click", handleClickOutside);
    }
    return () => window.removeEventListener("click", handleClickOutside);
  }, [langDropdownOpen]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (!isMounted || mobileMenuOpen) return;
    const previous = lastScrollY.current;

    if (isExpanded && latest > previous && latest > 150) {
      setExpanded(false);
      scrollPositionOnCollapse.current = latest;
    }
    else if (!isExpanded && latest < previous && (scrollPositionOnCollapse.current - latest > EXPAND_SCROLL_THRESHOLD)) {
      setExpanded(true);
    }

    lastScrollY.current = latest;
  });

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setMobileMenuOpen(false);
    setLangDropdownOpen(false);

    if (href.startsWith("/#")) {
      const hashId = href.split("#")[1];
      if (pathname === "/") {
        e.preventDefault();
        const element = document.getElementById(hashId);
        if (element) {
          const offset = 80;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = element.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;

          window.scrollTo({ top: offsetPosition, behavior: "smooth" });
          window.history.pushState(null, "", `#${hashId}`);
        }
      }
    } else if (href === "/") {
      if (pathname === "/") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
        window.history.pushState(null, "", "/");
      }
    }
  };

  const handleNavClick = (e: React.MouseEvent) => {
    if (!isExpanded && !mobileMenuOpen) {
      e.preventDefault();
      setExpanded(true);
    }
  };

  if (!isMounted) {
    return <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] h-14 w-[300px] bg-transparent pointer-events-none" />;
  }

  return (
    <>
      {/* 1. MASAÜSTÜ & GENEL DİNAMİK NAVBAR */}
      <motion.nav
        initial={{ y: -80, opacity: 0, left: "50%", x: "-50%" }}
        animate={isExpanded ? "expanded" : "collapsed"}
        variants={containerVariants}
        whileHover={!isExpanded ? "hoverCollapsed" : { scale: 1.02 }}
        whileTap={!isExpanded ? { scale: 0.95, x: "-125%" } : { scale: 0.95 }}
        onClick={handleNavClick}
        className={cn(
          "fixed top-6 z-[100]",
          // overflow-hidden burada kaldırıldı, yerine overflow-visible eklendi
          "flex items-center overflow-visible rounded-full border border-white/10 bg-black/60 shadow-[0_0_30px_rgba(168,85,247,0.15)] backdrop-blur-xl h-14",
          !isExpanded && "cursor-pointer"
        )}
      >
        <motion.div variants={logoVariants} className="flex-shrink-0 flex items-center pl-5 pr-2">
          <Link href="/" onClick={(e: any) => handleLinkClick(e, "/")}>
            <Hexagon className="h-6 w-6 text-purple-500 fill-purple-500/20 hover:text-fuchsia-400 transition-colors" />
          </Link>
        </motion.div>

        {/* Masaüstü Menü Öğeleri */}
        <motion.div className={cn("hidden md:flex items-center pr-3", !isExpanded && "pointer-events-none")}>
          <div className="flex items-center gap-1 sm:gap-2 border-r border-white/10 pr-2 mr-2">
            {navItems.map((item) => (
              <motion.div key={item.name} variants={itemVariants}>
                <Link
                  href={item.href}
                  onClick={(e: any) => handleLinkClick(e, item.href)}
                  className="text-sm font-bold text-gray-400 hover:text-white hover:bg-white/5 transition-all px-3 py-2 rounded-full whitespace-nowrap block"
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Masaüstü Dil Açılır Menüsü */}
          <motion.div variants={itemVariants} className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLangDropdownOpen((prev) => !prev);
              }}
              className="flex items-center gap-1.5 text-sm font-bold text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 transition-all px-3 py-2 rounded-full whitespace-nowrap border border-white/5 focus:outline-none"
            >
              <Globe size={16} className="text-purple-400" />
              <span className="uppercase">{lang}</span>
              <ChevronDown size={14} className={`text-gray-400 transition-transform duration-200 ${langDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {langDropdownOpen && (
              <div 
                onClick={(e) => e.stopPropagation()} 
                className="absolute right-0 mt-3 w-32 bg-zinc-950/95 border border-white/10 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-2xl overflow-hidden py-1 z-[200]"
              >
                {(["tr", "en", "de"] as Language[]).map((l) => (
                  <button
                    key={l}
                    onClick={() => {
                      setLang(l);
                      setLangDropdownOpen(false);
                    }}
                    className={cn(
                      "w-full text-left px-4 py-2.5 text-xs font-bold uppercase transition-colors flex items-center justify-between",
                      lang === l ? "text-purple-400 bg-purple-500/20" : "text-gray-300 hover:text-white hover:bg-white/10"
                    )}
                  >
                    <span>{l === "tr" ? "Türkçe" : l === "en" ? "English" : "Deutsch"}</span>
                    {lang === l && <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,1)]"></span>}
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>

        {/* Mobil Ekran İçin Hamburger Tetikleyici */}
        <div className="flex md:hidden items-center pr-4 pl-2">
          <button
            onClick={(e) => { e.stopPropagation(); setMobileMenuOpen(true); }}
            className="p-1 text-purple-400 hover:text-white transition-colors"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div variants={collapsedIconVariants} animate={isExpanded ? "expanded" : "collapsed"}>
            <Menu className="h-6 w-6 text-purple-400" />
          </motion.div>
        </div>
      </motion.nav>

      {/* 2. MOBİL İÇİN TAM EKRAN AÇILIR MENÜ (SHEET / MODAL) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-2xl z-[250] flex flex-col p-6 md:hidden"
          >
            {/* Üst Kısım: Logo ve Kapatma Butonu */}
            <div className="flex items-center justify-between mb-10 border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <Hexagon className="h-8 w-8 text-purple-500 fill-purple-500/20" />
                <span className="text-lg font-extrabold tracking-tight text-white">AuraX Studio</span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Orta Kısım: Menü Linkleri */}
            <div className="flex flex-col space-y-4 mb-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={(e: any) => handleLinkClick(e, item.href)}
                  className="text-2xl font-bold text-gray-300 hover:text-purple-400 transition-colors py-2 border-b border-white/5 flex items-center justify-between"
                >
                  <span>{item.name}</span>
                  <span className="text-xs font-mono text-purple-500/50">/</span>
                </Link>
              ))}
            </div>

            {/* Alt Kısım: Dil Seçim Alanı */}
            <div className="mt-auto bg-zinc-900/60 border border-white/10 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-3 text-xs font-mono uppercase tracking-widest text-gray-400">
                <Globe size={14} className="text-purple-400" /> Dil / Language
              </div>
              <div className="grid grid-cols-3 gap-2">
                {(["tr", "en", "de"] as Language[]).map((l) => (
                  <button
                    key={l}
                    onClick={() => { setLang(l); setMobileMenuOpen(false); }}
                    className={cn(
                      "py-3 rounded-xl text-sm font-bold uppercase transition-all border",
                      lang === l
                        ? "bg-purple-600 text-white border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                        : "bg-white/5 text-gray-400 border-white/5 hover:text-white hover:bg-white/10"
                    )}
                  >
                    {l === "tr" ? "Türkçe" : l === "en" ? "English" : "Deutsch"}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

