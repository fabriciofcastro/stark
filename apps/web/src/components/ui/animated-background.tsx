"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { ThemeConfig } from "@/lib/theme-system";
import { performanceConfig } from "@/lib/theme-system";

interface AnimatedBackgroundProps {
  theme: ThemeConfig;
  variant?: "hero" | "section" | "page";
  intensity?: "low" | "medium" | "high";
  className?: string;
}

export function AnimatedBackground({
  theme,
  variant = "section",
  className = "",
}: AnimatedBackgroundProps) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Verificar preferências de movimento reduzido
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);

    // Verificar se é mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Renderizar partículas baseadas no tipo de animação
  const renderParticles = () => {
    return theme.animations.map((animation, animationIndex) => {
      switch (animation.type) {
        case "particles":
          return Array.from({ length: animation.count }).map((_, i) => (
            <motion.div
              key={`particle-${Math.random()}-${animationIndex}-${i}`}
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
                duration: animation.duration + Math.random() * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: animation.delay || 0,
              }}
            />
          ));

        case "waves":
          return Array.from({ length: animation.count }).map((_, i) => (
            <motion.div
              key={`wave-${Math.random()}-${animationIndex}-${i}`}
              className={`absolute bg-gradient-to-r ${theme.particles} rounded-full blur-2xl`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 100 + 50}px`,
                height: `${Math.random() * 100 + 50}px`,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.6, 0.3],
                rotate: [0, 360],
              }}
              transition={{
                duration: animation.duration + Math.random() * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: animation.delay || 0,
              }}
            />
          ));

        case "grid":
          return Array.from({ length: animation.count }).map((_, i) => (
            <motion.div
              key={`grid-${Math.random()}-${animationIndex}-${i}`}
              className={`absolute h-px bg-gradient-to-r ${theme.lines} from-transparent to-transparent`}
              style={{
                left: "0%",
                top: `${i * (100 / animation.count)}%`,
                width: "100%",
              }}
              animate={{
                opacity: [0.1, 0.3, 0.1],
                scaleX: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: animation.duration,
                delay: i * 0.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ));

        case "icons":
          return Array.from({ length: animation.count }).map((_, i) => (
            <motion.div
              key={`icon-${Math.random()}-${animationIndex}-${i}`}
              className="absolute text-white/20 text-3xl"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 360, 0],
                opacity: [0.1, 0.4, 0.1],
              }}
              transition={{
                duration: animation.duration + Math.random() * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: animation.delay || 0,
              }}
            >
              {theme.icons[i % theme.icons.length]}
            </motion.div>
          ));

        case "lines":
          return Array.from({ length: animation.count }).map((_, i) => (
            <motion.div
              key={`line-${Math.random()}-${animationIndex}-${i}`}
              className={`absolute h-px bg-gradient-to-r ${theme.lines}`}
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
                duration: animation.duration + Math.random() * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: animation.delay || 0,
              }}
            />
          ));

        case "shapes":
          return Array.from({ length: animation.count }).map((_, i) => (
            <motion.div
              key={`shape-${Math.random()}-${animationIndex}-${i}`}
              className={`absolute bg-gradient-to-r ${theme.particles} rounded-full blur-sm`}
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
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: animation.duration + Math.random() * 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: animation.delay || 0,
              }}
            />
          ));

        default:
          return null;
      }
    });
  };

  // Configurações de overlay baseadas na variante
  const getOverlayClasses = () => {
    switch (variant) {
      case "hero":
        return "absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent";
      case "section":
        return "absolute inset-0 bg-gradient-to-br from-black/40 via-black/20 to-transparent";
      case "page":
        return "absolute inset-0 bg-gradient-to-br from-black/30 via-black/10 to-transparent";
      default:
        return "absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent";
    }
  };

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Background Principal */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${theme.primary} opacity-90`}
      >
        {/* Animações */}
        {!reducedMotion && renderParticles()}

        {/* Grid de Governança (específico para tema governance) */}
        {theme.name === "Governança de TI" && !reducedMotion && (
          <>
            {/* Linhas Verticais */}
            {Array.from({ length: 15 }).map((_, i) => (
              <motion.div
                key={`gov-grid-v-${Math.random()}-${i}`}
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
            {/* Linhas Horizontais */}
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={`gov-grid-h-${Math.random()}-${i}`}
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
          </>
        )}
      </div>

      {/* Overlay */}
      <div className={getOverlayClasses()} />

      {/* Bottom Gradient */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent" />
    </div>
  );
}

export default AnimatedBackground;
