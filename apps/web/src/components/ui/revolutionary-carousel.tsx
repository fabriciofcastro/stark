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
  impactPhrase?: string;
  theme?: string;
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

  // Temas futuristas com backgrounds animados temáticos
  const getSlideTheme = (slide: Slide, index: number) => {
    const themes = {
      governance: {
        primary: "from-slate-900 via-blue-900 to-slate-800",
        secondary: "from-blue-500 to-cyan-400",
        accent: "from-blue-400 to-cyan-300",
        particles: "blue-400",
        position: "left",
        backgroundPattern: "governance",
        glowColor: "blue-500"
      },
      development: {
        primary: "from-purple-900 via-indigo-900 to-purple-800",
        secondary: "from-purple-500 to-pink-400",
        accent: "from-purple-400 to-pink-300",
        particles: "purple-400",
        position: "center",
        backgroundPattern: "development",
        glowColor: "purple-500"
      },
      support: {
        primary: "from-emerald-900 via-teal-900 to-emerald-800",
        secondary: "from-emerald-500 to-cyan-400",
        accent: "from-emerald-400 to-cyan-300",
        particles: "emerald-400",
        position: "right",
        backgroundPattern: "support",
        glowColor: "emerald-500"
      },
      security: {
        primary: "from-red-900 via-rose-900 to-red-800",
        secondary: "from-red-500 to-pink-400",
        accent: "from-red-400 to-pink-300",
        particles: "red-400",
        position: "center",
        backgroundPattern: "security",
        glowColor: "red-500"
      },
      engagement: {
        primary: "from-orange-900 via-amber-900 to-orange-800",
        secondary: "from-orange-500 to-yellow-400",
        accent: "from-orange-400 to-yellow-300",
        particles: "orange-400",
        position: "left",
        backgroundPattern: "engagement",
        glowColor: "orange-500"
      }
    };
    
    return themes[slide.theme as keyof typeof themes] || themes.governance;
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

  // Renderizar backgrounds animados temáticos
  const renderThematicBackground = (theme: any, pattern: string) => {
    if (typeof window === 'undefined') return null;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return null;
    
    // Otimização: reduzir elementos em telas menores
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const elementCount = isMobile ? 3 : 6;

    const patterns = {
      governance: () => (
        <div className="absolute inset-0 overflow-hidden">
          {/* Circuitos e estruturas organizacionais */}
          {[...Array(elementCount)].map((_, i) => (
            <motion.div
              key={`circuit-${i}`}
              className="absolute border border-blue-400/40"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 200 + 100}px`,
                height: `${Math.random() * 100 + 50}px`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 0.5, 0],
                scale: [0, 1, 0],
                rotate: [0, 90, 180]
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: "easeInOut",
              }}
            />
          ))}
          {/* Pontos de conexão */}
          {[...Array(isMobile ? 8 : 15)].map((_, i) => (
            <motion.div
              key={`node-${i}`}
              className="absolute w-2 h-2 bg-blue-400/60 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      ),
      development: () => (
        <div className="absolute inset-0 overflow-hidden">
          {/* Código e elementos de desenvolvimento */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`code-block-${i}`}
              className="absolute bg-purple-500/20 rounded-lg"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 150 + 80}px`,
                height: `${Math.random() * 80 + 40}px`,
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: [0, 0.8, 0],
                y: [20, 0, -20]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut",
              }}
            />
          ))}
          {/* Linhas de código */}
          {[...Array(isMobile ? 6 : 12)].map((_, i) => (
            <motion.div
              key={`code-line-${i}`}
              className="absolute h-0.5 bg-purple-400/50"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 200 + 100}px`,
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: [0, 1, 0] }}
              transition={{
                duration: 2 + Math.random() * 1,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      ),
      support: () => (
        <div className="absolute inset-0 overflow-hidden">
          {/* Elementos de suporte e conectividade */}
          {[...Array(isMobile ? 5 : 10)].map((_, i) => (
            <motion.div
              key={`support-ring-${i}`}
              className="absolute border-2 border-emerald-400/40 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 100 + 50}px`,
                height: `${Math.random() * 100 + 50}px`,
              }}
              animate={{
                scale: [0, 1.2, 0],
                opacity: [0, 0.8, 0],
                rotate: [0, 360]
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: "easeInOut",
              }}
            />
          ))}
          {/* Pontos de conexão de suporte */}
          {[...Array(isMobile ? 4 : 8)].map((_, i) => (
            <motion.div
              key={`support-dot-${i}`}
              className="absolute w-3 h-3 bg-emerald-400/70 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2 + Math.random() * 1,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      ),
      security: () => (
        <div className="absolute inset-0 overflow-hidden">
          {/* Elementos de segurança e proteção */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`shield-${i}`}
              className="absolute border-2 border-red-400/50"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 80 + 40}px`,
                height: `${Math.random() * 100 + 60}px`,
                clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 0.5, 0],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut",
              }}
            />
          ))}
          {/* Linhas de proteção */}
          {[...Array(isMobile ? 5 : 10)].map((_, i) => (
            <motion.div
              key={`security-line-${i}`}
              className="absolute h-px bg-red-400/60"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 150 + 80}px`,
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
              animate={{
                scaleX: [0, 1, 0],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: 2 + Math.random() * 1,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      ),
      engagement: () => (
        <div className="absolute inset-0 overflow-hidden">
          {/* Elementos de engajamento e interação */}
          {[...Array(isMobile ? 4 : 8)].map((_, i) => (
            <motion.div
              key={`engagement-circle-${i}`}
              className="absolute border border-orange-400/40 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 120 + 60}px`,
                height: `${Math.random() * 120 + 60}px`,
              }}
              animate={{
                scale: [0, 1.5, 0],
                opacity: [0, 0.5, 0],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut",
              }}
            />
          ))}
          {/* Partículas de engajamento */}
          {[...Array(isMobile ? 10 : 20)].map((_, i) => (
            <motion.div
              key={`engagement-particle-${i}`}
              className="absolute w-1 h-1 bg-orange-400/80 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, Math.random() * 100 - 50, 0],
                y: [0, Math.random() * 100 - 50, 0],
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )
    };

    return patterns[pattern as keyof typeof patterns]?.() || null;
  };

  // Renderizar partículas animadas minimalistas
  const renderParticles = (theme: any, index: number) => {
    if (typeof window === 'undefined') return null;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return null;
    
    // Otimização: reduzir partículas em telas menores
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const particleCount = isMobile ? 4 : 8;
    
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(particleCount)].map((_, i) => (
          <motion.div
            key={`particle-${index}-${i}`}
            className={`absolute w-0.5 h-0.5 bg-${theme.particles}/40 rounded-full`}
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
              x: [0, Math.random() * 60 - 30, 0],
              y: [0, Math.random() * 60 - 30, 0],
              scale: [0, 1, 0],
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

  // Renderizar linhas de energia
  const renderEnergyLines = (theme: any, index: number) => {
    if (typeof window === 'undefined') return null;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return null; // Não renderizar linhas de energia se o usuário preferir reduzir animações
    
    // Otimização: reduzir linhas em telas menores
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const lineCount = isMobile ? 3 : 5;
    
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(lineCount)].map((_, i) => (
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

  // Obter posicionamento do conteúdo responsivo - todos alinhados à esquerda
  const getContentPosition = (position: string) => {
    // Forçar todos os textos à esquerda para melhor legibilidade
    return "justify-start items-center text-left pl-4 xs:pl-6 sm:pl-12 md:pl-16 lg:pl-20 xl:pl-24 2xl:pl-32";
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
      className="relative w-full h-[calc(100vh-80px)] sm:h-[calc(100vh-100px)] md:h-[calc(100vh-120px)] min-h-[400px] sm:min-h-[500px] md:min-h-[600px] max-h-[600px] sm:max-h-[700px] md:max-h-[800px] overflow-hidden"
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
            const theme = getSlideTheme(slide, idx);
            return (
              <div
                key={`${slide.title}-${idx}`}
                className="min-w-0 flex-[0_0_100%] px-px w-full h-full relative"
                role="option"
                aria-selected={idx === selectedIndex}
                aria-label={`Slide ${idx + 1} de ${total}: ${slide.title}`}
              >
                {/* Background principal com gradiente futurista */}
                <div className={`absolute inset-0 bg-gradient-to-br ${theme.primary}`} />

                {/* Background temático animado */}
                {renderThematicBackground(theme, theme.backgroundPattern)}

                {/* Partículas minimalistas */}
                {renderParticles(theme, idx)}

                {/* Linhas de energia */}
                {renderEnergyLines(theme, idx)}

                {/* Overlay com gradiente sutil */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent" />

                {/* Conteúdo principal responsivo */}
                <div
                  className={`absolute inset-0 flex ${getContentPosition(theme.position)} p-3 xs:p-4 sm:p-6 md:p-8 lg:p-10 pb-16 xs:pb-20 sm:pb-24`}
                >
                  <motion.div
                    className="max-w-5xl w-full"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    {/* Linha de destaque minimalista */}
                    <motion.div
                      className={`h-0.5 w-16 mb-4 sm:mb-6 bg-gradient-to-r ${theme.accent} rounded-full`}
                      initial={{ width: 0 }}
                      animate={{ width: 64 }}
                      transition={{ duration: 1, delay: 0.3 }}
                    />

                    {/* Frase de impacto responsiva */}
                    {slide.impactPhrase && (
                      <motion.p
                        className="text-xs xs:text-sm sm:text-base md:text-lg text-white/90 mb-3 sm:mb-4 font-medium tracking-wide max-w-xs xs:max-w-sm sm:max-w-2xl md:max-w-3xl"
                        style={{
                          textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
                          color: 'rgba(255,255,255,0.9)',
                        }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                      >
                        {slide.impactPhrase}
                      </motion.p>
                    )}

                    {/* Título principal com tipografia responsiva */}
                    <motion.h1
                      className="mb-4 sm:mb-6 text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold tracking-tight leading-tight text-white"
                      style={{
                        textShadow: `2px 2px 4px rgba(0,0,0,0.9), 0 0 20px rgba(0,0,0,0.8), 0 0 40px rgba(0,0,0,0.6)`,
                        color: '#ffffff',
                        fontWeight: '700',
                        letterSpacing: '-0.02em',
                      }}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                    >
                      {slide.title}
                    </motion.h1>

                    {/* Subtítulo responsivo com melhor legibilidade */}
                    <motion.p
                      className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-white mb-6 sm:mb-8 leading-relaxed font-medium max-w-xs xs:max-w-sm sm:max-w-2xl md:max-w-3xl lg:max-w-4xl"
                      style={{
                        textShadow: '1px 1px 3px rgba(0,0,0,0.9), 0 0 10px rgba(0,0,0,0.7)',
                        color: '#ffffff',
                        fontWeight: '500',
                      }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                    >
                      {slide.subtitle}
                    </motion.p>

                    {/* CTAs responsivos */}
                    {(slide.ctaPrimary || slide.ctaSecondary) && (
                      <motion.div
                        className="flex flex-col sm:flex-row gap-3 w-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                      >
                        {slide.ctaPrimary && (
                          <motion.button
                            onClick={slide.ctaPrimary.onClick}
                            className={`group relative px-4 py-2 bg-gradient-to-r ${theme.secondary} text-white font-light rounded-lg border border-white/20 hover:border-white/40 transition-all duration-500 overflow-hidden text-sm w-auto shadow-lg hover:shadow-xl hover:shadow-${theme.glowColor}/20`}
                            whileHover={{ y: -2, scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            aria-label={`${slide.ctaPrimary.label} - ${slide.title}`}
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <span className="relative z-10 tracking-wide group-hover:drop-shadow-lg transition-all duration-300">{slide.ctaPrimary.label}</span>
                          </motion.button>
                        )}

                        {slide.ctaSecondary && (
                          <motion.button
                            onClick={slide.ctaSecondary.onClick}
                            className="group relative px-4 py-2 border border-white/30 text-white font-light rounded-lg hover:border-white/60 hover:bg-white/5 transition-all duration-500 overflow-hidden text-sm w-auto shadow-md hover:shadow-lg hover:shadow-white/10"
                            whileHover={{ y: -2, scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            aria-label={`${slide.ctaSecondary.label} - ${slide.title}`}
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <span className="relative z-10 tracking-wide group-hover:drop-shadow-md transition-all duration-300">{slide.ctaSecondary.label}</span>
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

      {/* Controles de navegação responsivos */}
      <div className="absolute bottom-4 xs:bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-30">
        <div className="flex items-center space-x-4 xs:space-x-6 sm:space-x-8 bg-black/30 backdrop-blur-2xl rounded-2xl px-4 xs:px-6 sm:px-8 py-2 xs:py-3 border border-white/10 shadow-2xl">
          {/* Botão Anterior minimalista */}
          <motion.button
            onClick={scrollPrev}
            className="group relative p-1.5 xs:p-2 border border-white/20 hover:border-white/40 transition-all duration-500 overflow-hidden rounded-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Slide anterior"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                scrollPrev();
              }
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            <svg
              className="w-4 h-4 xs:w-5 xs:h-5 text-white/80 group-hover:text-white transition-colors relative z-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </motion.button>

          {/* Indicadores responsivos */}
          <div className="flex items-center space-x-3 xs:space-x-4 sm:space-x-6">
            <span className="text-white/60 text-xs font-light tracking-wider min-w-[30px] xs:min-w-[40px] text-center">
              {String(selectedIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>

            {/* Indicador de progresso linear responsivo */}
            <div className="relative w-12 xs:w-16 sm:w-20 h-0.5 bg-white/10 overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-white/60 to-white/40"
                style={{ width: `${((selectedIndex + 1) / total) * 100}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Botão Próximo minimalista */}
          <motion.button
            onClick={scrollNext}
            className="group relative p-1.5 xs:p-2 border border-white/20 hover:border-white/40 transition-all duration-500 overflow-hidden rounded-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Próximo slide"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                scrollNext();
              }
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            <svg
              className="w-4 h-4 xs:w-5 xs:h-5 text-white/80 group-hover:text-white transition-colors relative z-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </motion.button>
        </div>
      </div>


      {/* Indicador de progresso minimalista no topo */}
      <div className="absolute top-0 left-0 w-full h-0.5 bg-white/5 z-30" aria-hidden="true">
        <motion.div
          className="h-full bg-gradient-to-r from-white/40 to-white/20"
          style={{ width: `${((selectedIndex + 1) / total) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </section>
  );
}
