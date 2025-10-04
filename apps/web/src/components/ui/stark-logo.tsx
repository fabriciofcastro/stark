"use client";

import { motion } from "framer-motion";
import { STARK_CLASSES, STARK_ANIMATIONS } from "@/lib/stark-typography";

interface StarkLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "full" | "icon" | "text";
  animated?: boolean;
  className?: string;
}

export function StarkLogo({ 
  size = "md", 
  variant = "full", 
  animated = true, 
  className = "" 
}: StarkLogoProps) {
  
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-24 h-24"
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-4xl",
    xl: "text-6xl"
  };

  // Logo icon inspirado no Stark Industries
  const StarkIcon = () => (
    <motion.div
      className={`relative ${sizeClasses[size]} ${className}`}
      animate={animated ? {
        rotate: [0, 5, -5, 0],
        scale: [1, 1.05, 1]
      } : {}}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {/* Círculo externo */}
      <div className="absolute inset-0 rounded-full border-2 border-cyan-400/30">
        <motion.div
          className="absolute inset-0 rounded-full border border-cyan-400/50"
          animate={animated ? {
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5]
          } : {}}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Círculo interno */}
      <div className="absolute inset-2 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-400/40">
        <motion.div
          className="absolute inset-1 rounded-full bg-gradient-to-br from-cyan-400/30 to-blue-500/30"
          animate={animated ? {
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          } : {}}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        />
      </div>

      {/* Símbolo central - S estilizado */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="relative"
          animate={animated ? {
            rotateY: [0, 180, 360]
          } : {}}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <svg
            viewBox="0 0 100 100"
            className="w-3/4 h-3/4 text-cyan-400"
            fill="currentColor"
          >
            {/* S estilizado com design futurista */}
            <path
              d="M20 20 Q30 10 40 20 Q50 30 40 40 L60 40 Q70 50 80 40 Q90 30 80 20 Q70 10 60 20 L40 20 Q30 30 40 40 Q50 50 60 40 Q70 30 60 40 L40 40 Q30 50 20 40 Q10 30 20 20 Z"
              className="drop-shadow-lg"
              style={{
                filter: "drop-shadow(0 0 8px rgba(0, 212, 255, 0.6))"
              }}
            />
          </svg>
        </motion.div>
      </div>

      {/* Partículas orbitais */}
      {animated && (
        <>
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full"
              style={{
                left: "50%",
                top: "50%",
                transformOrigin: "0 0"
              }}
              animate={{
                rotate: 360,
                x: [0, 20, 0, -20, 0],
                y: [0, -20, 0, 20, 0]
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.5
              }}
            />
          ))}
        </>
      )}
    </motion.div>
  );

  // Logo com texto
  const StarkText = () => (
    <motion.div
      className="flex items-center space-x-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <StarkIcon />
      <div className="flex flex-col">
        <motion.span
          className={`font-display font-black ${textSizes[size]} bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent`}
          animate={animated ? {
            backgroundPosition: ["0%", "100%", "0%"]
          } : {}}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            backgroundSize: "200% 200%"
          }}
        >
          STARK
        </motion.span>
        <motion.span
          className={`font-mono text-xs md:text-sm text-cyan-300/80 tracking-wider`}
          animate={animated ? {
            opacity: [0.6, 1, 0.6]
          } : {}}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          SOLUTIONS
        </motion.span>
      </div>
    </motion.div>
  );

  // Logo apenas texto
  const TextOnly = () => (
    <motion.div
      className="flex flex-col items-center"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.span
        className={`font-display font-black ${textSizes[size]} bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent drop-shadow-2xl`}
        animate={animated ? {
          backgroundPosition: ["0%", "100%", "0%"],
          textShadow: [
            "0 0 10px rgba(0, 212, 255, 0.5)",
            "0 0 20px rgba(0, 212, 255, 0.8)",
            "0 0 10px rgba(0, 212, 255, 0.5)"
          ]
        } : {}}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          backgroundSize: "200% 200%"
        }}
      >
        STARK
      </motion.span>
      <motion.span
        className={`font-mono text-xs md:text-sm text-cyan-300/80 tracking-[0.2em]`}
        animate={animated ? {
          opacity: [0.6, 1, 0.6],
          letterSpacing: ["0.2em", "0.3em", "0.2em"]
        } : {}}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        SOLUTIONS
      </motion.span>
    </motion.div>
  );

  switch (variant) {
    case "icon":
      return <StarkIcon />;
    case "text":
      return <TextOnly />;
    default:
      return <StarkText />;
  }
}

// Componente de tagline inspirado no Stark Industries
export function StarkTagline({ className = "" }: { className?: string }) {
  return (
    <motion.div
      className={`text-center space-y-2 ${className}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
    >
      <motion.p
        className="font-mono text-sm md:text-base text-cyan-300/80 tracking-wider"
        animate={{
          opacity: [0.6, 1, 0.6]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        INNOVATION • TECHNOLOGY • SOLUTIONS
      </motion.p>
      <motion.div
        className="flex items-center justify-center space-x-2"
        animate={{
          scale: [1, 1.05, 1]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
        <div className="w-1 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent flex-1" />
        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
      </motion.div>
    </motion.div>
  );
}
