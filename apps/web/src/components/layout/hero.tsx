// components/layout/hero.tsx
"use client";

import { heroSlides } from "@/components/data/hero-slides";
import HeroEmbla from "@/components/ui/hero-embla";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const Hero = () => {
  const [quantumParticles, setQuantumParticles] = useState<
    Array<{ id: number; x: number; y: number; size: number; color: string }>
  >([]);
  const [energyWaves, setEnergyWaves] = useState<
    Array<{ id: number; x: number; y: number; scale: number }>
  >([]);

  // Generate Quantum Particles
  useEffect(() => {
    const generateQuantumParticles = () => {
      const colors = [
        "from-purple-400",
        "from-cyan-400",
        "from-pink-400",
        "from-blue-400",
        "from-indigo-400",
      ];
      const particles = Array.from({ length: 25 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
      }));
      setQuantumParticles(particles);
    };

    generateQuantumParticles();
    const interval = setInterval(generateQuantumParticles, 10000);

    return () => clearInterval(interval);
  }, []);

  // Generate Energy Waves
  useEffect(() => {
    const generateEnergyWaves = () => {
      const waves = Array.from({ length: 8 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        scale: Math.random() * 2 + 1,
      }));
      setEnergyWaves(waves);
    };

    generateEnergyWaves();
    const interval = setInterval(generateEnergyWaves, 15000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative p-0 overflow-hidden w-full max-w-full bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900"
      aria-labelledby="hero-title"
    >
      {/* Quantum Field Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Quantum Particles */}
        {quantumParticles.map((particle) => (
          <motion.div
            key={`quantum-${particle.id}`}
            className={`absolute bg-gradient-to-r ${particle.color} to-transparent rounded-full blur-sm`}
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
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

        {/* Energy Waves */}
        {energyWaves.map((wave) => (
          <motion.div
            key={`energy-wave-${wave.id}`}
            className="absolute w-32 h-32 bg-gradient-to-r from-purple-400/20 via-cyan-400/20 to-pink-400/20 rounded-full blur-2xl"
            style={{
              left: `${wave.x}%`,
              top: `${wave.y}%`,
            }}
            animate={{
              scale: [wave.scale, wave.scale * 1.5, wave.scale],
              opacity: [0.3, 0.6, 0.3],
              rotate: [0, 360],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Neural Network Grid */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={`grid-line-${Math.random()}-${i}`}
            className="absolute h-px bg-gradient-to-r from-transparent via-purple-400/20 to-transparent"
            style={{
              left: "0%",
              top: `${i * 5}%`,
              width: "100%",
            }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
              scaleX: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 4,
              delay: i * 0.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-full overflow-hidden">
        <HeroEmbla slides={heroSlides} />
      </div>

      {/* Holographic Scan Lines */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-400/10 to-transparent pointer-events-none"
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatDelay: 5,
          ease: "easeInOut",
        }}
      />

      {/* Quantum Field Orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-purple-500/10 via-cyan-500/5 to-pink-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-tr from-cyan-500/10 via-purple-500/5 to-indigo-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </section>
  );
};

export default Hero;
