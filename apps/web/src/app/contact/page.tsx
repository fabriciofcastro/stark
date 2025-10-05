"use client";

import { ContactPageSeo } from "@/components/sections/contact-page-seo";
import Contact from "@/components/sections/contact";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function ContactPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Array<{
    id: number;
    left: number;
    top: number;
    width: number;
    height: number;
    animateX: number[];
    animateY: number[];
    duration: number;
    delay: number;
  }>>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Gerar partículas com valores fixos para evitar hidratação
  useEffect(() => {
    const generateParticles = () => {
      const newParticles = Array.from({ length: 20 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        width: Math.random() * 6 + 2,
        height: Math.random() * 6 + 2,
        animateX: [0, Math.random() * 200 - 100, 0],
        animateY: [0, Math.random() * 200 - 100, 0],
        duration: 15 + Math.random() * 10,
        delay: Math.random() * 5,
      }));
      setParticles(newParticles);
    };

    generateParticles();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 overflow-hidden relative">
      <ContactPageSeo />
      
      {/* Background Animado Sofisticado */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Gradiente Principal Dinâmico */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900" />
        
        {/* Overlay com padrões radiais animados */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.15)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(147,51,234,0.15)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(34,197,94,0.15)_0%,transparent_50%)]" />
        
        {/* Linhas de energia dinâmicas */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400/40 to-transparent" />
          <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-blue-400/40 to-transparent" />
          <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-indigo-400/40 to-transparent" />
        </div>

        {/* Elementos flutuantes com movimento baseado no mouse */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl"
          animate={{
            x: mousePosition.x * 0.02,
            y: mousePosition.y * 0.02,
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-400/10 rounded-full blur-2xl"
          animate={{
            x: mousePosition.x * -0.03,
            y: mousePosition.y * -0.03,
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        <motion.div
          className="absolute top-1/2 right-1/3 w-32 h-32 bg-blue-400/10 rounded-full blur-xl"
          animate={{
            x: mousePosition.x * 0.01,
            y: mousePosition.y * 0.01,
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
        />

        {/* Partículas flutuantes dinâmicas */}
        {particles.map((particle) => (
          <motion.div
            key={`particle-${particle.id}`}
            className="absolute bg-gradient-to-r from-cyan-400/20 to-purple-400/20 rounded-full blur-sm"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              width: `${particle.width}px`,
              height: `${particle.height}px`,
            }}
            animate={{
              x: particle.animateX,
              y: particle.animateY,
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: particle.delay,
            }}
          />
        ))}

        {/* Ondas de energia */}
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgba(59,130,246,0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 50%, rgba(147,51,234,0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 50% 20%, rgba(34,197,94,0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 50%, rgba(59,130,246,0.1) 0%, transparent 50%)",
            ],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Grid pattern animado */}
        <div className="absolute inset-0 opacity-5">
          <svg
            className="w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <pattern
                id="animated-grid"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <motion.path
                  d="M 20 0 L 0 0 0 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </pattern>
            </defs>
            <rect
              width="100"
              height="100"
              fill="url(#animated-grid)"
              className="text-white"
            />
          </svg>
        </div>

        {/* Ícones de Tecnologia Flutuantes */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Ícones de Programação */}
          {[
            { icon: "💻", size: "text-2xl", delay: 0, duration: 8 },
            { icon: "⚡", size: "text-xl", delay: 1, duration: 10 },
            { icon: "🔧", size: "text-lg", delay: 2, duration: 12 },
            { icon: "📱", size: "text-xl", delay: 3, duration: 9 },
            { icon: "🌐", size: "text-lg", delay: 4, duration: 11 },
            { icon: "💾", size: "text-xl", delay: 5, duration: 7 },
            { icon: "🔐", size: "text-lg", delay: 6, duration: 13 },
            { icon: "📊", size: "text-xl", delay: 7, duration: 8 },
            { icon: "🚀", size: "text-2xl", delay: 8, duration: 6 },
            { icon: "⚙️", size: "text-lg", delay: 9, duration: 10 },
            { icon: "🔍", size: "text-xl", delay: 10, duration: 9 },
            { icon: "📈", size: "text-lg", delay: 11, duration: 11 },
            { icon: "🎯", size: "text-xl", delay: 12, duration: 7 },
            { icon: "🛡️", size: "text-lg", delay: 13, duration: 12 },
            { icon: "💡", size: "text-xl", delay: 14, duration: 8 },
            { icon: "🔗", size: "text-lg", delay: 15, duration: 10 },
            { icon: "📋", size: "text-xl", delay: 16, duration: 9 },
            { icon: "🎨", size: "text-lg", delay: 17, duration: 11 },
            { icon: "⚡", size: "text-xl", delay: 18, duration: 7 },
            { icon: "🔧", size: "text-lg", delay: 19, duration: 13 },
          ].map((item, index) => (
            <motion.div
              key={`tech-icon-${index}`}
              className={`absolute ${item.size} text-white/20 hover:text-white/40 transition-colors duration-300 cursor-pointer`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                x: [0, Math.random() * 20 - 10, 0],
                rotate: [0, Math.random() * 360, 0],
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: item.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: item.delay,
              }}
              whileHover={{
                scale: 1.5,
                opacity: 0.8,
                rotate: 360,
              }}
            >
              {item.icon}
            </motion.div>
          ))}

          {/* Ícones de Governança e Compliance */}
          {[
            { icon: "📋", text: "LGPD", delay: 0, duration: 15 },
            { icon: "🔒", text: "Security", delay: 2, duration: 12 },
            { icon: "📊", text: "Analytics", delay: 4, duration: 18 },
            { icon: "⚖️", text: "Compliance", delay: 6, duration: 14 },
            { icon: "🛡️", text: "Protection", delay: 8, duration: 16 },
            { icon: "📈", text: "Metrics", delay: 10, duration: 13 },
            { icon: "🎯", text: "Goals", delay: 12, duration: 17 },
            { icon: "📝", text: "Audit", delay: 14, duration: 11 },
            { icon: "🔍", text: "Monitor", delay: 16, duration: 19 },
            { icon: "⚡", text: "Performance", delay: 18, duration: 15 },
          ].map((item, index) => (
            <motion.div
              key={`gov-icon-${index}`}
              className="absolute text-white/15 hover:text-white/30 transition-colors duration-300 cursor-pointer group"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, Math.random() * 30 - 15, 0],
                rotate: [0, Math.random() * 180, 0],
                scale: [1, 1.3, 1],
                opacity: [0.15, 0.4, 0.15],
              }}
              transition={{
                duration: item.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: item.delay,
              }}
              whileHover={{
                scale: 1.8,
                opacity: 0.6,
                rotate: 180,
              }}
            >
              <div className="text-center">
                <div className="text-2xl mb-1">{item.icon}</div>
                <div className="text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {item.text}
                </div>
              </div>
            </motion.div>
          ))}

          {/* Ícones de Cloud e Infraestrutura */}
          {[
            "☁️", "🌩️", "💾", "🔄", "📡", "🌐", "🔌", "⚡", "🛠️", "📊",
            "🔧", "⚙️", "🎛️", "📈", "🔍", "🛡️", "🔐", "📋", "🎯", "💡"
          ].map((icon, index) => (
            <motion.div
              key={`cloud-icon-${index}`}
              className="absolute text-white/10 hover:text-white/25 transition-colors duration-500 cursor-pointer"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -40, 0],
                x: [0, Math.random() * 40 - 20, 0],
                rotate: [0, Math.random() * 720, 0],
                scale: [0.8, 1.4, 0.8],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 20 + Math.random() * 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 5,
              }}
              whileHover={{
                scale: 2,
                opacity: 0.5,
                rotate: 360,
              }}
            >
              <div className="text-xl">{icon}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Hero Section Modernizado */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            className="inline-flex items-center justify-center w-24 h-24 mb-8 rounded-full bg-gradient-to-r from-emerald-600 to-blue-600 shadow-2xl"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <motion.svg
              className="w-12 h-12 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </motion.svg>
          </motion.div>

          <motion.h1
            className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 bg-gradient-to-r from-white via-emerald-200 to-blue-200 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Entre em{" "}
            <motion.span
              className="text-transparent bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                backgroundSize: "200% 200%",
              }}
            >
              Contato
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-xl sm:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Nosso{" "}
            <span className="text-transparent bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text font-semibold">
              formulário inteligente
            </span>{" "}
            guia você passo a passo para garantir que coletemos todas as
            informações necessárias
          </motion.p>

          {/* Benefícios com animação */}
          <motion.div
            className="flex flex-wrap justify-center gap-8 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {[
              { text: "Validação em tempo real", color: "emerald" },
              { text: "Resposta em até 15 min", color: "blue" },
              { text: "Proposta personalizada", color: "purple" },
            ].map((benefit, index) => (
              <motion.div
                key={benefit.text}
                className="flex items-center gap-2 text-sm text-gray-300"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className={`w-2 h-2 bg-${benefit.color}-400 rounded-full`}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.5,
                  }}
                />
                <span>{benefit.text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Accent Line animada */}
          <motion.div
            className="h-1 w-32 mx-auto bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-500 rounded-full shadow-lg shadow-emerald-500/30"
            initial={{ width: 0 }}
            animate={{ width: 128 }}
            transition={{ duration: 1, delay: 1 }}
          />
        </div>
      </section>

      {/* Formulário Completo */}
      <Contact showHeading={false} />
    </div>
  );
}
