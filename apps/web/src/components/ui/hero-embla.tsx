"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export type Slide = {
  image: string;
  title: string;
  subtitle: string;
  ctaPrimary?: { label: string; onClick: () => void };
  ctaSecondary?: { label: string; onClick: () => void };
  videoUrl?: string;
};

export default function HeroEmbla({ slides }: { slides: Slide[] }) {
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

  // Advanced theme generator with unique backgrounds
  const getThemeForSlide = (title: string) => {
    const themes = {
      Suporte: {
        gradient: "from-blue-600 via-cyan-500 to-teal-600",
        accent: "from-blue-400 to-cyan-400",
        particles: "from-blue-400/30 to-cyan-400/30",
        lines: "from-blue-400/20 to-cyan-400/20",
        background: "support",
        titlePosition: "left",
      },
      Nuvem: {
        gradient: "from-purple-600 via-indigo-500 to-blue-600",
        accent: "from-purple-400 to-indigo-400",
        particles: "from-purple-400/30 to-indigo-400/30",
        lines: "from-purple-400/20 to-indigo-400/20",
        background: "cloud",
        titlePosition: "center",
      },
      Consultoria: {
        gradient: "from-emerald-600 via-teal-500 to-cyan-600",
        accent: "from-emerald-400 to-teal-400",
        particles: "from-emerald-400/30 to-teal-400/30",
        lines: "from-emerald-400/20 to-teal-400/20",
        background: "consulting",
        titlePosition: "right",
      },
      Cibersegurança: {
        gradient: "from-red-600 via-pink-500 to-rose-600",
        accent: "from-red-400 to-pink-400",
        particles: "from-red-400/30 to-pink-400/30",
        lines: "from-red-400/20 to-pink-400/20",
        background: "cybersecurity",
        titlePosition: "center", // Ajustado para center
      },
      Desenvolvimento: {
        gradient: "from-orange-600 via-amber-500 to-yellow-600",
        accent: "from-orange-400 to-amber-400",
        particles: "from-orange-400/30 to-amber-400/30",
        lines: "from-orange-400/20 to-amber-400/20",
        background: "development",
        titlePosition: "left", // Ajustado para left
      },
      Governança: {
        gradient: "from-slate-600 via-gray-500 to-zinc-600",
        accent: "from-slate-400 to-gray-400",
        particles: "from-slate-400/30 to-gray-400/30",
        lines: "from-slate-400/20 to-gray-400/20",
        background: "governance",
        titlePosition: "center", // Ajustado para center
      },
    };

    // Find matching theme based on title keywords
    for (const [keyword, theme] of Object.entries(themes)) {
      if (title.toLowerCase().includes(keyword.toLowerCase())) {
        return theme;
      }
    }

    // Default theme
    return {
      gradient: "from-purple-600 via-cyan-500 to-indigo-600",
      accent: "from-purple-400 to-cyan-400",
      particles: "from-purple-400/30 to-cyan-400/30",
      lines: "from-purple-400/20 to-cyan-400/20",
      background: "default",
      titlePosition: "center",
    };
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

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf: number | null = null;
    const AUTOPLAY_MS = 8000; // Aumentar tempo de transição para melhor experiência

    const tick = (timestamp: number) => {
      if (!userPaused && !media.matches) {
        const elapsed = timestamp - lastRef.current;
        elapsedRef.current += elapsed;
        const newProgress = Math.min(elapsedRef.current / AUTOPLAY_MS, 1);

        if (newProgress >= 1) {
          embla.scrollNext();
          elapsedRef.current = 0;
        }
      }
      lastRef.current = timestamp;
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

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

  // Prefetch da próxima imagem para troca suave
  useEffect(() => {
    if (typeof window === "undefined") return;
    const next = (selectedIndex + 1) % total;
    const url = slides[next]?.image;
    if (!url) return;
    const img = new window.Image();
    img.src = url;
  }, [selectedIndex, total, slides]);

  const renderUniqueBackground = (
    theme: {
      background: string;
      gradient: string;
      accent: string;
      particles: string;
      lines: string;
    },
    idx: number,
  ) => {
    switch (theme.background) {
      case "support":
        return (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-cyan-500 to-teal-600 opacity-90">
            {/* Support Icons Animation */}
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={`support-icon-${Math.random()}-${i}`}
                className="absolute text-blue-300/20 text-4xl"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  rotate: [0, 360, 0],
                  opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                  duration: 8 + Math.random() * 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {i % 4 === 0
                  ? "🔧"
                  : i % 4 === 1
                    ? "⚙️"
                    : i % 4 === 2
                      ? "🛠️"
                      : "🔩"}
              </motion.div>
            ))}
            {/* Floating Support Bubbles */}
            {Array.from({ length: 15 }).map((_, i) => (
              <motion.div
                key={`support-bubble-${Math.random()}-${i}`}
                className="absolute bg-blue-400/20 rounded-full blur-sm"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${Math.random() * 60 + 20}px`,
                  height: `${Math.random() * 60 + 20}px`,
                }}
                animate={{
                  x: [0, Math.random() * 100 - 50, 0],
                  y: [0, Math.random() * 100 - 50, 0],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 10 + Math.random() * 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        );

      case "cloud":
        return (
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-indigo-500 to-blue-600 opacity-90">
            {/* Cloud Particles */}
            {Array.from({ length: 25 }).map((_, i) => (
              <motion.div
                key={`cloud-particle-${Math.random()}-${i}`}
                className="absolute bg-purple-300/30 rounded-full blur-sm"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${Math.random() * 8 + 4}px`,
                  height: `${Math.random() * 8 + 4}px`,
                }}
                animate={{
                  x: [0, Math.random() * 200 - 100, 0],
                  y: [0, Math.random() * 200 - 100, 0],
                  scale: [0.5, 2, 0.5],
                  opacity: [0.2, 0.8, 0.2],
                }}
                transition={{
                  duration: 12 + Math.random() * 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
            {/* Cloud Formation */}
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={`cloud-formation-${Math.random()}-${i}`}
                className="absolute bg-purple-400/20 rounded-full blur-xl"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${Math.random() * 200 + 100}px`,
                  height: `${Math.random() * 100 + 50}px`,
                }}
                animate={{
                  x: [0, Math.random() * 300 - 150, 0],
                  y: [0, Math.random() * 100 - 50, 0],
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 15 + Math.random() * 10,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        );

      case "consulting":
        return (
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-teal-500 to-cyan-600 opacity-90">
            {/* Consulting Network */}
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={`consulting-node-${Math.random()}-${i}`}
                className="absolute bg-emerald-400/40 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${Math.random() * 6 + 4}px`,
                  height: `${Math.random() * 6 + 4}px`,
                }}
                animate={{
                  scale: [1, 2, 1],
                  opacity: [0.4, 0.8, 0.4],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
            {/* Network Lines */}
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={`network-line-${Math.random()}-${i}`}
                className="absolute h-px bg-emerald-400/30"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${Math.random() * 200 + 100}px`,
                  transform: `rotate(${Math.random() * 360}deg)`,
                }}
                animate={{
                  opacity: [0.1, 0.4, 0.1],
                  scaleX: [0.5, 1.5, 0.5],
                }}
                transition={{
                  duration: 4 + Math.random() * 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        );

      case "cybersecurity":
        return (
          <div className="absolute inset-0 bg-gradient-to-br from-red-600 via-pink-500 to-rose-600 opacity-90">
            {/* Security Shield Pattern */}
            {Array.from({ length: 18 }).map((_, i) => (
              <motion.div
                key={`security-shield-${Math.random()}-${i}`}
                className="absolute text-red-300/20 text-3xl"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 180, 360],
                  opacity: [0.1, 0.4, 0.1],
                }}
                transition={{
                  duration: 6 + Math.random() * 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                🛡️
              </motion.div>
            ))}
            {/* Alert Pulses */}
            {Array.from({ length: 10 }).map((_, i) => (
              <motion.div
                key={`alert-pulse-${Math.random()}-${i}`}
                className="absolute bg-red-400/30 rounded-full blur-lg"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${Math.random() * 100 + 50}px`,
                  height: `${Math.random() * 100 + 50}px`,
                }}
                animate={{
                  scale: [1, 2, 1],
                  opacity: [0.2, 0.6, 0.2],
                }}
                transition={{
                  duration: 2 + Math.random() * 1,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        );

      case "development":
        return (
          <div className="absolute inset-0 bg-gradient-to-br from-orange-600 via-amber-500 to-yellow-600 opacity-90">
            {/* Code Lines */}
            {Array.from({ length: 30 }).map((_, i) => (
              <motion.div
                key={`code-line-${Math.random()}-${i}`}
                className="absolute bg-orange-400/20 h-px"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${Math.random() * 300 + 100}px`,
                  transform: `rotate(${Math.random() * 45 - 22.5}deg)`,
                }}
                animate={{
                  x: [0, Math.random() * 200 - 100, 0],
                  opacity: [0.1, 0.4, 0.1],
                }}
                transition={{
                  duration: 5 + Math.random() * 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
            {/* Code Brackets */}
            {Array.from({ length: 15 }).map((_, i) => (
              <motion.div
                key={`code-bracket-${Math.random()}-${i}`}
                className="absolute text-orange-300/30 text-2xl font-mono"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  rotate: [0, 360],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: 8 + Math.random() * 4,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                {i % 3 === 0 ? "{" : i % 3 === 1 ? "}" : "()"}
              </motion.div>
            ))}
          </div>
        );

      case "governance":
        return (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-600 via-gray-500 to-zinc-600 opacity-90">
            {/* Governance Grid */}
            {Array.from({ length: 15 }).map((_, i) => (
              <motion.div
                key={`governance-grid-v-${Math.random()}-${i}`}
                className="absolute w-px bg-slate-400/20"
                style={{
                  left: `${i * 6.66}%`,
                  top: "0%",
                  height: "100%",
                }}
                animate={{
                  opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                  duration: 4,
                  delay: i * 0.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={`governance-grid-h-${Math.random()}-${i}`}
                className="absolute h-px bg-slate-400/20"
                style={{
                  left: "0%",
                  top: `${i * 5}%`,
                  width: "100%",
                }}
                animate={{
                  opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                  duration: 4,
                  delay: i * 0.1,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
            {/* Compliance Icons */}
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={`compliance-icon-${Math.random()}-${i}`}
                className="absolute text-slate-300/20 text-2xl"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {i % 4 === 0
                  ? "📋"
                  : i % 4 === 1
                    ? "✅"
                    : i % 4 === 2
                      ? "📊"
                      : "🔒"}
              </motion.div>
            ))}
          </div>
        );

      default:
        return (
          <div
            className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} opacity-90`}
          >
            {/* Default Particles */}
            {Array.from({ length: 15 }).map((_, i) => (
              <motion.div
                key={`default-particle-${Math.random()}-${idx}-${i}`}
                className={`absolute bg-gradient-to-r ${theme.particles} rounded-full blur-sm`}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${Math.random() * 4 + 2}px`,
                  height: `${Math.random() * 4 + 2}px`,
                }}
                animate={{
                  x: [0, Math.random() * 100 - 50, 0],
                  y: [0, Math.random() * 100 - 50, 0],
                  scale: [1, 2, 1],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 6 + Math.random() * 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        );
    }
  };

  const getContentPosition = (position: string) => {
    switch (position) {
      case "left":
        return "items-start justify-start text-left pl-4 sm:pl-8 md:pl-16 lg:pl-24 xl:pl-32 pr-4 sm:pr-8 md:pr-16 lg:pr-24 xl:pr-32";
      case "right":
        return "items-end justify-end text-right pl-4 sm:pl-8 md:pl-16 lg:pl-24 xl:pl-32 pr-4 sm:pr-8 md:pr-16 lg:pr-24 xl:pr-32";
      default:
        return "items-center justify-center text-center px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32";
    }
  };

  return (
    <section
      className="relative w-full h-[calc(100vh-120px)] overflow-hidden max-w-full"
      aria-label="Destaques do site"
      role="region"
      aria-roledescription="carousel"
    >
      <div
        className="overflow-hidden rounded-none border-0 w-full max-w-full relative"
        ref={emblaRef}
        role="listbox"
        aria-atomic="false"
        aria-live={userPaused ? "polite" : "off"}
      >
        <div className="flex touch-pan-y -ml-px w-full max-w-full">
          {slides.map((s, idx) => {
            const theme = getThemeForSlide(s.title);
            return (
              <div
                className="min-w-0 flex-[0_0_100%] px-px w-full max-w-full"
                key={`${s.title}-${idx}`}
                role="option"
                aria-selected={idx === selectedIndex}
                aria-label={`Slide ${idx + 1} de ${total}: ${s.title}`}
              >
                <div className="relative w-full full-height-corrected min-h-[420px] max-h-[820px]">
                  {/* Unique Background per Theme */}
                  {renderUniqueBackground(theme, idx)}

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent" />

                  <div
                    className={`absolute inset-0 flex pb-32 md:pb-40 ${getContentPosition(theme.titlePosition)}`}
                  >
                    <div className="max-w-4xl w-full">
                      <div
                        className={`h-1 w-24 mb-6 bg-gradient-to-r ${theme.accent} rounded-full`}
                      />
                      <motion.h2
                        className="mb-6 text-[clamp(32px,5.5vw,64px)] font-bold tracking-tight leading-tight text-white"
                        style={{
                          textShadow:
                            "0 2px 16px rgba(0,0,0,0.55), 0 0 2px rgba(0,0,0,0.8)",
                        }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                      >
                        {s.title}
                      </motion.h2>
                      <motion.p
                        className="mb-10 max-w-[52ch] text-[clamp(14px,1.4vw,20px)] leading-relaxed text-white/95 font-medium"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                      >
                        {s.subtitle}
                      </motion.p>
                      <div className="flex flex-col sm:flex-row gap-4">
                        {s.ctaPrimary && (
                          <motion.button
                            className={`inline-flex items-center px-8 py-3 bg-gradient-to-r ${theme.accent} text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}
                            onClick={s.ctaPrimary.onClick}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {s.ctaPrimary.label}
                          </motion.button>
                        )}
                        {s.ctaSecondary && (
                          <motion.button
                            className="inline-flex items-center px-8 py-3 bg-transparent border-2 border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 hover:border-white/50 transition-all duration-300"
                            onClick={s.ctaSecondary.onClick}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {s.ctaSecondary.label}
                          </motion.button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Controles de Navegação */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-4 z-20">
        {/* Botão Anterior */}
        <motion.button
          onClick={scrollPrev}
          className="p-4 sm:p-3 rounded-full bg-gradient-to-r from-purple-600/80 to-cyan-600/80 hover:from-purple-600 hover:to-cyan-600 backdrop-blur-sm border border-white/20 transition-all duration-300"
          whileHover={{ scale: 1.1 }}
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
            className="w-5 h-5 text-white"
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

        {/* Status de Posição */}
        <div className="flex items-center space-x-2 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
          <span className="text-white text-sm font-medium">
            {selectedIndex + 1} / {total}
          </span>
        </div>

        {/* Barra de Progresso */}
        <div className="w-32 h-2 bg-white/20 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"
            style={{ width: `${((selectedIndex + 1) / total) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Botão Próximo */}
        <motion.button
          onClick={scrollNext}
          className="p-4 sm:p-3 rounded-full bg-gradient-to-r from-purple-600/80 to-cyan-600/80 hover:from-purple-600 hover:to-cyan-600 backdrop-blur-sm border border-white/20 transition-all duration-300"
          whileHover={{ scale: 1.1 }}
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
            className="w-5 h-5 text-white"
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

      {/* Indicadores de Posição (Dots) - Agora visíveis com melhor contraste */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3 z-50" role="tablist" aria-label="Indicadores de slides">
        {slides.map((_, index) => (
          <motion.button
            key={`dot-${Math.random()}-${index}`}
            onClick={() => embla?.scrollTo(index)}
            className={`w-3 h-3 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${
              index === selectedIndex
                ? "bg-gradient-to-r from-purple-500 to-cyan-500 scale-125"
                : "bg-white/40 hover:bg-white/60"
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
    </section>
  );
}
