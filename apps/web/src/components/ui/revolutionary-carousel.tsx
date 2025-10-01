"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type Slide = {
  image: string;
  title: string;
  subtitle: string;
  ctaPrimary?: { label: string; onClick: () => void };
  ctaSecondary?: { label: string; onClick: () => void };
  videoUrl?: string;
};

export default function RevolutionaryCarousel({ slides }: { slides: Slide[] }) {
  const [emblaRef, embla] = useEmblaCarousel({
    loop: true,
    duration: 24,
    align: "center",
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const total = slides.length;
  const [userPaused, setUserPaused] = useState(false);
  const lastRef = useRef<number>(0);
  const elapsedRef = useRef<number>(0);

  // Cores temáticas únicas para cada slide
  const getSlideTheme = (index: number) => {
    const themes = [
      {
        primary: "from-blue-600 to-cyan-500",
        secondary: "from-blue-400 to-cyan-300",
        accent: "from-blue-500 to-teal-400",
        particles: "blue-400",
        position: "left",
      },
      {
        primary: "from-purple-600 to-indigo-500",
        secondary: "from-purple-400 to-indigo-300",
        accent: "from-purple-500 to-blue-400",
        particles: "purple-400",
        position: "center",
      },
      {
        primary: "from-emerald-600 to-teal-500",
        secondary: "from-emerald-400 to-teal-300",
        accent: "from-emerald-500 to-cyan-400",
        particles: "emerald-400",
        position: "right",
      },
      {
        primary: "from-red-600 to-pink-500",
        secondary: "from-red-400 to-pink-300",
        accent: "from-red-500 to-rose-400",
        particles: "red-400",
        position: "center",
      },
      {
        primary: "from-orange-600 to-amber-500",
        secondary: "from-orange-400 to-amber-300",
        accent: "from-orange-500 to-yellow-400",
        particles: "orange-400",
        position: "left",
      },
      {
        primary: "from-slate-600 to-gray-500",
        secondary: "from-slate-400 to-gray-300",
        accent: "from-slate-500 to-zinc-400",
        particles: "slate-400",
        position: "center",
      },
    ];
    return themes[index % themes.length];
  };

  const scrollPrev = useCallback(() => embla?.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla?.scrollNext(), [embla]);

  useEffect(() => {
    if (!embla) return;
    const onSelect = () => {
      setSelectedIndex(embla.selectedScrollSnap());
      elapsedRef.current = 0;
    };
    const onScroll = () => {
      const progress = embla.scrollProgress();
      setProgress(progress);
    };
    embla.on("select", onSelect);
    embla.on("scroll", onScroll);
    onSelect();

    // Auto-play com pause inteligente
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf: number | null = null;
    const AUTOPLAY_MS = 8000; // 8 segundos por slide

    const tick = (timestamp: number) => {
      if (!userPaused && !media.matches) {
        const elapsed = timestamp - lastRef.current;
        elapsedRef.current += elapsed;

        if (elapsedRef.current >= AUTOPLAY_MS) {
          embla.scrollNext();
          elapsedRef.current = 0;
        }
      }
      lastRef.current = timestamp;
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    // Pausar no hover e quando não estiver visível
    const root = embla.rootNode();
    const start = () => {
      if (raf) cancelAnimationFrame(raf);
      setUserPaused(true);
    };
    const stop = () => setUserPaused(false);

    root.addEventListener("mouseenter", start);
    root.addEventListener("mouseleave", stop);

    const onVisibility = () => {
      if (document.hidden) setUserPaused(true);
      else setUserPaused(false);
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      root.removeEventListener("mouseenter", start);
      root.removeEventListener("mouseleave", stop);
      document.removeEventListener("visibilitychange", onVisibility);
      embla.off("select", onSelect);
      embla.off("scroll", onScroll);
    };
  }, [embla, userPaused]);

  // Renderizar partículas animadas para cada slide
  const renderParticles = (theme: any, index: number) => {
    if (typeof window === 'undefined') return null;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return null; // Não renderizar partículas se o usuário preferir reduzir animações
    
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`particle-${index}-${i}`}
            className={`absolute w-1 h-1 bg-${theme.particles}/30 rounded-full`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            initial={{
              x: 0,
              y: 0,
              scale: 0,
              opacity: 0,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
              scale: [0, 1, 0],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    );
  };

  // Renderizar linhas de energia
  const renderEnergyLines = (theme: any, index: number) => {
    if (typeof window === 'undefined') return null;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return null; // Não renderizar linhas de energia se o usuário preferir reduzir animações
    
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`line-${index}-${i}`}
            className={`absolute h-px bg-gradient-to-r from-transparent via-${theme.particles}/40 to-transparent`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 200 + 100}px`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
            initial={{
              x: 0,
              y: 0,
              opacity: 0,
            }}
            animate={{
              x: [0, Math.random() * 200 - 100],
              y: [0, Math.random() * 200 - 100],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    );
  };

  // Obter posicionamento do conteúdo
  const getContentPosition = (position: string) => {
    switch (position) {
      case "left":
        return "justify-start items-end text-left pl-4 sm:pl-8 md:pl-12 lg:pl-16 xl:pl-20";
      case "right":
        return "justify-end items-end text-right pr-4 sm:pr-8 md:pr-12 lg:pr-16 xl:pr-20";
      default:
        return "justify-center items-end text-center px-4 sm:px-8 md:px-12 lg:px-16";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      scrollPrev();
    } else if (e.key === 'ArrowRight') {
      scrollNext();
    }
  };

  return (
    <section 
      className="relative w-full h-[calc(100vh-120px)] overflow-hidden"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-label="Carrossel principal de destaques"
      role="region"
      aria-roledescription="carousel"
    >
      {/* Container principal do carrossel */}
      <div
        className="overflow-hidden rounded-none border-0 w-full h-full relative"
        ref={emblaRef}
        role="listbox"
        aria-atomic="false"
        aria-live={userPaused ? "polite" : "off"}
      >
        <div className="flex touch-pan-y -ml-px w-full h-full">
          {slides.map((slide, idx) => {
            const theme = getSlideTheme(idx);
            return (
              <div
                key={`${slide.title}-${idx}`}
                className="min-w-0 flex-[0_0_100%] px-px w-full h-full relative"
                role="option"
                aria-selected={idx === selectedIndex}
                aria-label={`Slide ${idx + 1} de ${total}: ${slide.title}`}
              >
                {/* Background com gradiente */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${theme.primary}`}
                />

                {/* Partículas animadas */}
                {renderParticles(theme, idx)}

                {/* Linhas de energia */}
                {renderEnergyLines(theme, idx)}

                {/* Overlay com gradiente */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

                {/* Conteúdo principal com melhor espaçamento para leitura esquerda-direita */}
                <div
                  className={`absolute inset-0 flex ${getContentPosition(theme.position)} p-6 sm:p-8 md:p-12 lg:p-16 pb-32`}
                >
                  <motion.div
                    className="max-w-4xl w-full"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    {/* Linha de destaque */}
                    <motion.div
                      className={`h-1 w-24 mb-6 sm:mb-8 bg-gradient-to-r ${theme.accent} rounded-full`}
                      initial={{ width: 0 }}
                      animate={{ width: 96 }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />

                    {/* Título principal */}
                    <motion.h1
                      className="mb-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-tight text-white max-w-3xl"
                      style={{
                        textShadow:
                          "0 4px 20px rgba(0,0,0,0.8), 0 0 4px rgba(0,0,0,0.9)",
                      }}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                    >
                      {slide.title}
                    </motion.h1>

                    {/* Subtítulo com melhor espaçamento para leitura */}
                    <motion.p
                      className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 mb-6 leading-relaxed max-w-2xl"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                    >
                      {slide.subtitle}
                    </motion.p>

                    {/* CTAs */}
                    {(slide.ctaPrimary || slide.ctaSecondary) && (
                      <motion.div
                        className="flex flex-col sm:flex-row gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.7 }}
                      >
                        {slide.ctaPrimary && (
                          <motion.button
                            onClick={slide.ctaPrimary.onClick}
                            className={`px-8 py-4 bg-gradient-to-r ${theme.secondary} text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            aria-label={`${slide.ctaPrimary.label} - ${slide.title}`}
                          >
                            {slide.ctaPrimary.label}
                          </motion.button>
                        )}

                        {slide.ctaSecondary && (
                          <motion.button
                            onClick={slide.ctaSecondary.onClick}
                            className="px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            aria-label={`${slide.ctaSecondary.label} - ${slide.title}`}
                          >
                            {slide.ctaSecondary.label}
                          </motion.button>
                        )}
                      </motion.div>
                    )}
                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Controles de navegação revolucionários */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-30">
        <div className="flex items-center space-x-4 bg-black/40 backdrop-blur-xl rounded-xl px-4 py-3 border border-white/20 shadow-2xl">
          {/* Botão Anterior */}
          <motion.button
            onClick={scrollPrev}
            className="p-3 sm:p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-300 group"
            whileHover={{ scale: 1.1, rotate: -5 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Slide anterior"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                scrollPrev();
              }
            }}
          >
            <svg
              className="w-5 h-5 text-white group-hover:text-cyan-300 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </motion.button>

          {/* Indicadores de posição */}
          <div className="flex items-center space-x-2">
            <span className="text-white text-xs font-medium min-w-[40px] text-center">
              {selectedIndex + 1} / {total}
            </span>

            {/* Barra de progresso circular */}
            <div className="relative w-8 h-8">
              <svg className="w-8 h-8 transform -rotate-90" viewBox="0 0 44 44">
                <circle
                  cx="22"
                  cy="22"
                  r="18"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="3"
                  fill="none"
                />
                <motion.circle
                  cx="22"
                  cy="22"
                  r="18"
                  stroke="url(#gradient)"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 18}`}
                  strokeDashoffset={`${2 * Math.PI * 18 * (1 - (selectedIndex + 1) / total)}`}
                  transition={{ duration: 0.5 }}
                />
                <defs>
                  <linearGradient
                    id="gradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white text-[10px] font-bold">
                  {Math.round(((selectedIndex + 1) / total) * 100)}%
                </span>
              </div>
            </div>
          </div>

          {/* Botão Próximo */}
          <motion.button
            onClick={scrollNext}
            className="p-3 sm:p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-300 group"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Próximo slide"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                scrollNext();
              }
            }}
          >
            <svg
              className="w-5 h-5 text-white group-hover:text-cyan-300 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </motion.button>
        </div>
      </div>

      {/* Indicadores de slides (dots) - Agora visíveis com melhor contraste */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-50" role="tablist" aria-label="Indicadores de slides">
        {slides.map((_, index) => (
          <motion.button
            key={`dot-${index}`}
            onClick={() => embla?.scrollTo(index)}
            className={`w-3 h-3 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${
              index === selectedIndex
                ? "bg-gradient-to-r from-purple-500 to-cyan-500 scale-125 shadow-lg"
                : "bg-white/40 hover:bg-white/60 hover:scale-110"
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
            aria-label={`Ir para slide ${index + 1}`}
            aria-selected={index === selectedIndex}
            role="tab"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                embla?.scrollTo(index);
              }
            }}
          />
        ))}
      </div>

      {/* Indicador de progresso linear no topo */}
      <div className="absolute top-0 left-0 w-full h-1 bg-black/20 z-30" aria-hidden="true">
        <motion.div
          className="h-full bg-gradient-to-r from-purple-500 via-cyan-500 to-purple-500"
          style={{ width: `${((selectedIndex + 1) / total) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </section>
  );
}
