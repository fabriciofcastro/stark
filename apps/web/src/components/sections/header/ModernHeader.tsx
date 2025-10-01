"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  Phone,
  Mail,
  Settings,
  Shield,
  Cloud,
  Monitor,
  Briefcase,
  Globe,
  Zap,
} from "lucide-react";

// Configuração dos serviços para o menu
const services = [
  {
    id: "suporte",
    title: "Suporte Técnico",
    description: "Assistência técnica especializada",
    icon: Monitor,
    href: "/suporte-tecnico",
    color: "green",
    features: [
      "24/7 Disponibilidade",
      "Resposta Rápida",
      "Especialistas Certificados",
    ],
  },
  {
    id: "nuvem",
    title: "Soluções em Nuvem",
    description: "Infraestrutura e migração cloud",
    icon: Cloud,
    href: "/cloud-vps-linux",
    color: "blue",
    features: ["AWS/Azure", "Migração Segura", "Otimização de Custos"],
  },
  {
    id: "consultoria",
    title: "Consultoria Estratégica",
    description: "Orientação em tecnologia e processos",
    icon: Briefcase,
    href: "/consultoria-tecnologica",
    color: "purple",
    features: ["Governança de TI", "Transformação Digital", "Compliance"],
  },
  {
    id: "seguranca",
    title: "Cibersegurança",
    description: "Proteção e monitoramento 24/7",
    icon: Shield,
    href: "/cyberseguranca",
    color: "red",
    features: ["Pentest Completo", "Monitoramento 24/7", "Conformidade LGPD"],
  },
  {
    id: "desenvolvimento",
    title: "Desenvolvimento Web",
    description: "Sites e aplicações modernas",
    icon: Globe,
    href: "/create-site",
    color: "orange",
    features: ["SEO Otimizado", "Performance", "Design Responsivo"],
  },
  {
    id: "governanca",
    title: "Governança de TI",
    description: "Estruturação de processos e políticas",
    icon: Settings,
    href: "/governance",
    color: "indigo",
    features: ["COBIT & ITIL", "ISO 27001", "Auditoria Completa"],
  },
];

const navigation = [
  { name: "Início", href: "/" },
  { name: "Serviços", href: "/services", hasDropdown: true },
  { name: "Sobre", href: "/sobre" },
  { name: "Blog", href: "/blog" },
  { name: "Contato", href: "/contact" },
];

const ModernHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const servicesTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [isScrolled, setIsScrolled] = useState(false);
  const [particles, setParticles] = useState<
    Array<{ id: number; x: number; y: number; size: number }>
  >([]);
  const [neuralNodes, setNeuralNodes] = useState<
    Array<{
      id: number;
      x: number;
      y: number;
      size: number;
      opacity: number;
      delay: number;
      type: string;
    }>
  >([]);
  const [holographicActive, setHolographicActive] = useState(false);

  // Detectar scroll para mudar aparência do header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Generate floating particles
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    
    // Don't run animation effects if user prefers reduced motion
    if (mediaQuery.matches) {
      setParticles([]);
      setNeuralNodes([]);
      setHolographicActive(false);
      return;
    }

    const generateParticles = () => {
      const newParticles = Array.from({ length: 8 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
      }));
      setParticles(newParticles);
    };

    generateParticles();
    const interval = setInterval(generateParticles, 10000);

    return () => clearInterval(interval);
  }, []);

  // Generate Smart Floating Elements
  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    
    // Don't run animation effects if user prefers reduced motion
    if (mediaQuery.matches) {
      setNeuralNodes([]);
      return;
    }

    const generateSmartElements = () => {
      const elements = Array.from({ length: 5 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.15 + 0.05,
        delay: Math.random() * 2,
        type: Math.random() > 0.5 ? "circle" : "line",
      }));
      setNeuralNodes(elements);
    };

    generateSmartElements();
    const interval = setInterval(generateSmartElements, 10000);

    return () => clearInterval(interval);
  }, []);

  // Holographic effect toggle
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    
    // Don't run animation effects if user prefers reduced motion
    if (mediaQuery.matches) {
      setHolographicActive(false);
      return;
    }

    const interval = setInterval(() => {
      setHolographicActive((prev) => !prev);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Gerenciar abertura/fechamento do menu de serviços
  const handleServicesMouseEnter = () => {
    if (servicesTimeoutRef.current) {
      clearTimeout(servicesTimeoutRef.current);
    }
    setIsServicesOpen(true);
  };

  const handleServicesMouseLeave = () => {
    servicesTimeoutRef.current = setTimeout(() => {
      setIsServicesOpen(false);
    }, 2000); // Aumentado para 2 segundos para melhor experiência do usuário
  };

  // Fechar menu móvel
  const closeMobileMenu = () => {
    setIsMenuOpen(false);
  };

  // Detectar clique fora do menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
        setIsServicesOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Bloquear scroll quando menu móvel estiver aberto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname?.startsWith(href);
  };

  return (
    <>
      <motion.header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "h-16 backdrop-blur-xl bg-gradient-to-r from-slate-900/95 via-purple-900/90 to-indigo-900/95 shadow-lg border-b border-purple-400/30"
            : "h-20 backdrop-blur-md bg-gradient-to-r from-slate-900/80 via-purple-900/70 to-indigo-900/80"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Smart Transparent Background */}
        {!isScrolled && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Smart Transparent Elements - only if user doesn't prefer reduced motion */}
            {neuralNodes.map((element) => {
              const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
              return (
              <motion.div
                key={`smart-element-${element.id}`}
                className={`absolute ${
                  element.type === "circle"
                    ? "rounded-full bg-gradient-to-r from-white/10 to-white/5"
                    : "bg-gradient-to-r from-white/10 to-transparent"
                }`}
                style={{
                  left: `${element.x}%`,
                  top: `${element.y}%`,
                  width:
                    element.type === "circle"
                      ? `${element.size}px`
                      : `${element.size * 20}px`,
                  height:
                    element.type === "circle" ? `${element.size}px` : "1px",
                }}
                initial={{
                  scale: 0,
                  opacity: 0,
                  x: element.type === "line" ? -20 : 0,
                  rotate:
                    element.type === "line"
                      ? typeof window !== "undefined"
                        ? Math.random() * 360
                        : 0
                      : 0,
                }}
                animate={prefersReducedMotion ? {
                  scale: 1,
                  opacity: element.opacity,
                } : {
                  scale: 1,
                  opacity: element.opacity,
                  x: element.type === "line" ? 20 : 0,
                  rotate:
                    element.type === "line"
                      ? typeof window !== "undefined"
                        ? Math.random() * 360
                        : 0
                      : 0,
                }}
                transition={{
                  duration: 3,
                  delay: element.delay,
                  ease: "easeInOut",
                  repeat: prefersReducedMotion ? false : Infinity,
                  repeatType: "reverse",
                }}
              />
              );
            })}

            {/* Holographic Scan Lines */}
            {holographicActive && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-400/20 to-transparent"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 3, ease: "easeInOut" }}
                style={typeof window !== 'undefined' && window.matchMedia("(prefers-reduced-motion: reduce)").matches ? { display: 'none' } : {}}
              />
            )}

            {/* Floating Particles - only if user doesn't prefer reduced motion */}
            {particles.map((particle) => {
              const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
              return (
                <motion.div
                  key={particle.id}
                  className="absolute bg-gradient-to-r from-purple-400/30 to-cyan-400/30 rounded-full blur-sm"
                  style={{
                    left: `${particle.x}%`,
                    top: `${particle.y}%`,
                    width: `${particle.size}px`,
                    height: `${particle.size}px`,
                  }}
                  animate={prefersReducedMotion ? {} : {
                    y: [0, -20, 0],
                    x: [0, Math.random() * 10 - 5, 0],
                    opacity: [0.3, 0.8, 0.3],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              );
            })}

            {/* SVG Gradient Definition */}
            <svg width="0" height="0" className="absolute">
              <title>Gradiente para rede neural</title>
              <defs>
                <linearGradient
                  id="neuralGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#a855f7" stopOpacity="0.6" />
                  <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.6" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        )}
        {/* Holographic Overlay */}
        {!isScrolled && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-cyan-900/15 to-indigo-900/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}

        {/* Borda inferior sutil - apenas quando scrolled */}
        {isScrolled && (
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        )}

        <div className="relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className={`flex items-center justify-between transition-all duration-300 ${
                isScrolled ? "h-16" : "h-20"
              }`}
            >
              {/* Holographic Logo */}
              <motion.div
                className="flex items-center space-x-3"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/" className="flex items-center space-x-3 group">
                  <div className="relative">
                    {/* Holographic Glow */}
                    <motion.div
                      className={`absolute -inset-2 bg-gradient-to-r from-purple-500/30 via-cyan-500/30 to-purple-500/30 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500 ${
                        isScrolled ? "scale-75" : "scale-100"
                      }`}
                      animate={{
                        opacity: [0, 0.3, 0],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />

                    {/* Main Logo Container */}
                    <div
                      className={`relative bg-gradient-to-br from-purple-600 via-cyan-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all duration-300 border border-white/20 ${
                        isScrolled ? "w-8 h-8" : "w-10 h-10 lg:w-12 lg:h-12"
                      }`}
                    >
                      {/* Holographic Scan Effect */}
                      {/* Holographic Scan Effect - Atrás do logo */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-xl overflow-hidden"
                        initial={{ x: "-100%" }}
                        animate={{ x: "100%" }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 3,
                          ease: "easeInOut",
                        }}
                        style={{ zIndex: 1 }}
                      />

                      {/* Logo - Sempre na frente */}
                      <div className="relative" style={{ zIndex: 10 }}>
                        <Zap
                          className={`text-white transition-all duration-300 logo-static ${
                            isScrolled ? "w-4 h-4" : "w-6 h-6 lg:w-7 lg:h-7"
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    className={`hidden sm:block transition-all duration-300 ${
                      isScrolled
                        ? "opacity-100 max-w-none"
                        : "opacity-100 max-w-none"
                    }`}
                  >
                    <motion.h1
                      className={`font-bold bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent group-hover:from-cyan-300 group-hover:via-purple-300 group-hover:to-pink-300 transition-all duration-300 ${
                        isScrolled ? "text-lg" : "text-xl lg:text-2xl"
                      }`}
                      animate={{
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      STARK
                    </motion.h1>
                    {!isScrolled && (
                      <motion.p
                        className="text-xs lg:text-sm bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent font-medium"
                        animate={{
                          opacity: [0.7, 1, 0.7],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        GESTÃO EM TECNOLOGIA
                      </motion.p>
                    )}
                  </div>
                </Link>
              </motion.div>

              {/* Navegação Desktop */}
              <nav className="hidden lg:flex items-center space-x-1">
                {navigation.map((item, index) => (
                  <motion.div
                    key={item.name}
                    className="relative"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {item.hasDropdown ? (
                      <div className="relative">
                        <motion.button
                          type="button"
                          className={`group flex items-center space-x-1 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 relative overflow-hidden ${
                            isActive(item.href)
                              ? "bg-gradient-to-r from-purple-500/20 to-cyan-500/20 text-white border border-purple-400/30"
                              : "text-white/90 hover:text-white hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-cyan-500/10"
                          }`}
                          onMouseEnter={handleServicesMouseEnter}
                          onMouseLeave={handleServicesMouseLeave}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {/* Holographic Background */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            animate={{
                              backgroundPosition: [
                                "0% 50%",
                                "100% 50%",
                                "0% 50%",
                              ],
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          />

                          <motion.span
                            className="relative z-10"
                            animate={{
                              textShadow: [
                                "0 0 0px rgba(168, 85, 247, 0)",
                                "0 0 10px rgba(168, 85, 247, 0.5)",
                                "0 0 0px rgba(168, 85, 247, 0)",
                              ],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          >
                            {item.name}
                          </motion.span>

                          <motion.div
                            animate={{
                              rotate: isServicesOpen ? 180 : 0,
                            }}
                            transition={{ duration: 0.3 }}
                          >
                            <ChevronDown className="w-4 h-4 relative z-10" />
                          </motion.div>
                        </motion.button>
                      </div>
                    ) : (
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Link
                          href={item.href}
                          className={`group flex items-center px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 relative overflow-hidden ${
                            isActive(item.href)
                              ? "bg-gradient-to-r from-purple-500/20 to-cyan-500/20 text-white border border-purple-400/30"
                              : "text-white/90 hover:text-white hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-cyan-500/10"
                          }`}
                        >
                          {/* Holographic Background */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            animate={{
                              backgroundPosition: [
                                "0% 50%",
                                "100% 50%",
                                "0% 50%",
                              ],
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          />

                          <motion.span
                            className="relative z-10"
                            animate={{
                              textShadow: [
                                "0 0 0px rgba(168, 85, 247, 0)",
                                "0 0 10px rgba(168, 85, 247, 0.5)",
                                "0 0 0px rgba(168, 85, 247, 0)",
                              ],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          >
                            {item.name}
                          </motion.span>
                        </Link>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </nav>

              {/* CTA e Menu Mobile */}
              <div className="flex items-center space-x-3">
                {/* Botão de contato holográfico */}
                <motion.div
                  className="hidden sm:block"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link href="/contact">
                    <motion.button
                      className={`group relative font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden ${
                        isScrolled
                          ? "bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white px-4 py-2"
                          : "bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white px-6 py-3"
                      }`}
                      whileHover={{
                        boxShadow: "0 0 30px rgba(168, 85, 247, 0.6)",
                      }}
                    >
                      {/* Holographic Background */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        animate={{
                          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />

                      {/* Glow Effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-purple-400/30 to-cyan-400/30 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        animate={{
                          scale: [1, 1.1, 1],
                          opacity: [0, 0.3, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />

                      <div className="relative z-10 flex items-center">
                        <motion.div
                          animate={{
                            y: [0, -2, 0],
                            scale: [1, 1.05, 1],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        >
                          <Phone
                            className={`transition-all duration-300 ${
                              isScrolled ? "w-4 h-4 mr-2" : "w-5 h-5 mr-2"
                            }`}
                          />
                        </motion.div>
                        <span
                          className={`transition-all duration-300 ${
                            isScrolled ? "text-sm" : "text-base"
                          }`}
                        >
                          {isScrolled ? "Contato" : "Fale Conosco"}
                        </span>
                      </div>
                    </motion.button>
                  </Link>
                </motion.div>

                {/* Botão do menu móvel */}
                <motion.button
                  type="button"
                  className={`lg:hidden p-2 rounded-lg transition-colors duration-200 ${
                    isScrolled
                      ? "text-white/90 hover:bg-white/10 hover:text-brand-gold-300"
                      : "text-white hover:bg-white/10"
                  }`}
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Abrir menu de navegação"
                >
                  <AnimatePresence mode="wait">
                    {isMenuOpen ? (
                      <motion.div
                        key="close"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <X className="w-6 h-6" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="menu"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Menu className="w-6 h-6" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>
            </div>
          </div>

          {/* Menu de Serviços Desktop */}
          <AnimatePresence>
            {isServicesOpen && (
              <motion.div
                className="absolute top-full left-0 right-0 bg-gradient-to-br from-slate-900/95 via-purple-900/90 to-indigo-900/95 backdrop-blur-xl border-t border-purple-400/30 shadow-2xl"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                onMouseEnter={handleServicesMouseEnter}
                onMouseLeave={handleServicesMouseLeave}
              >
                {/* Holographic Background Effects - only if user doesn't prefer reduced motion */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  {Array.from({ length: 5 }).map((_, i) => {
                    const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
                    return (
                    <motion.div
                      key={`dropdown-particle-${Math.random()}-${i}`}
                      className="absolute bg-gradient-to-r from-purple-400/20 to-cyan-400/20 rounded-full blur-sm"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        width: `${Math.random() * 2.5 + 1}px`,
                        height: `${Math.random() * 2.5 + 1}px`,
                      }}
                      animate={prefersReducedMotion ? {} : {
                        x: [0, Math.random() * 50 - 25, 0],
                        y: [0, Math.random() * 50 - 25, 0],
                        scale: [1, 1.5, 1],
                        opacity: [0.3, 0.7, 0.3],
                      }}
                      transition={{
                        duration: 4 + Math.random() * 2,
                        repeat: prefersReducedMotion ? false : Infinity,
                        ease: "easeInOut",
                      }}
                    />
                    );
                  })}
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6 overflow-x-auto scrollbar-hide">
                    {/* Scroll horizontal para muitos itens */}
                    <style jsx>{`
                      .scrollbar-hide {
                        -ms-overflow-style: none;
                        scrollbar-width: none;
                      }
                      .scrollbar-hide::-webkit-scrollbar {
                        display: none;
                      }
                    `}</style>
                    {services.map((service) => {
                      const IconComponent = service.icon;
                      return (
                        <motion.div
                          key={service.id}
                          className="group relative h-full"
                          whileHover={{ y: -8, scale: 1.02 }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                        >
                          <Link
                            href={service.href}
                            className="block h-full p-4 sm:p-6 rounded-xl bg-gradient-to-br from-white/5 via-purple-500/5 to-cyan-500/5 hover:from-white/10 hover:via-purple-500/10 hover:to-cyan-500/10 border border-white/10 hover:border-purple-400/30 transition-all duration-300 relative overflow-hidden flex flex-col min-h-[200px] sm:min-h-[220px]"
                          >
                            {/* Holographic Background */}
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                              animate={{
                                backgroundPosition: [
                                  "0% 50%",
                                  "100% 50%",
                                  "0% 50%",
                                ],
                              }}
                              transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                            />

                            {/* Glow Effect */}
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-cyan-400/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                              animate={{
                                scale: [1, 1.1, 1],
                                opacity: [0, 0.3, 0],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                            />

                            <div className="relative z-10 flex flex-col h-full">
                              <div className="flex items-start space-x-4 mb-4">
                                <motion.div
                                  className="p-2 sm:p-3 rounded-lg bg-gradient-to-br from-purple-500/20 to-cyan-500/20 group-hover:from-purple-500/30 group-hover:to-cyan-500/30 transition-colors duration-300 flex-shrink-0"
                                  whileHover={{ rotate: 360 }}
                                  transition={{ duration: 0.8 }}
                                >
                                  <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                </motion.div>

                                <div className="flex-1">
                                  <motion.h3
                                    className="text-base sm:text-lg font-semibold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-cyan-400 group-hover:bg-clip-text transition-all duration-300"
                                    animate={{
                                      textShadow: [
                                        "0 0 0px rgba(168, 85, 247, 0)",
                                        "0 0 10px rgba(168, 85, 247, 0.5)",
                                        "0 0 0px rgba(168, 85, 247, 0)",
                                      ],
                                    }}
                                    transition={{
                                      duration: 2,
                                      repeat: Infinity,
                                      ease: "easeInOut",
                                    }}
                                  >
                                    {service.title}
                                  </motion.h3>
                                  <p className="text-xs sm:text-sm text-gray-300 mt-1">
                                    {service.description}
                                  </p>
                                </div>
                              </div>

                              <div className="flex-1 flex flex-col justify-between">
                                <div className="flex flex-wrap gap-1 sm:gap-2 mb-4">
                                  {service.features.map((feature) => (
                                    <motion.span
                                      key={feature}
                                      className="text-xs px-2 py-1 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 text-white rounded-full border border-white/10"
                                      whileHover={{ scale: 1.05 }}
                                    >
                                      {feature}
                                    </motion.span>
                                  ))}
                                </div>

                                <div className="flex justify-end">
                                  <motion.div
                                    whileHover={{ x: 5 }}
                                    transition={{ duration: 0.3 }}
                                  >
                                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-400 transition-colors duration-300" />
                                  </motion.div>
                                </div>
                              </div>
                            </div>
                          </Link>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      {/* Menu Móvel */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobileMenu}
            />

            {/* Menu Drawer */}
            <motion.div
              className="fixed top-0 right-0 h-full w-80 max-w-[90vw] bg-gradient-to-b from-slate-900/95 via-purple-900/90 to-indigo-900/95 backdrop-blur-xl border-l border-purple-400/30 shadow-2xl shadow-black/30 z-50 lg:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <div className="flex flex-col h-full">
                {/* Header do menu móvel */}
                <div className="flex items-center justify-between p-6 border-b border-white/20">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-600 via-cyan-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent">STARK</h2>
                      <p className="text-xs bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent font-medium">
                        GESTÃO EM TECNOLOGIA
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={closeMobileMenu}
                    className="p-2 rounded-lg text-white/80 hover:bg-white/10 transition-colors duration-200"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Navegação móvel */}
                <nav className="flex-1 px-6 py-6 space-y-3 overflow-y-auto">
                  {navigation.map((item) => (
                    <div key={item.name}>
                      {item.hasDropdown ? (
                        <div className="space-y-3">
                          <div className="text-xs font-semibold text-cyan-300 uppercase tracking-wider pb-2 border-b border-white/10">
                            Serviços
                          </div>
                          <div className="space-y-2">
                            {services.map((service) => {
                              const IconComponent = service.icon;
                              // Obter as classes de cor do serviço
                              const colorClasses = {
                                green: "from-green-500/20 to-green-600/30 text-green-400",
                                blue: "from-blue-500/20 to-blue-600/30 text-blue-400",
                                purple: "from-purple-500/20 to-purple-600/30 text-purple-400",
                                red: "from-red-500/20 to-red-600/30 text-red-400",
                                orange: "from-orange-500/20 to-orange-600/30 text-orange-400",
                                indigo: "from-indigo-500/20 to-indigo-600/30 text-indigo-400",
                              };
                              const serviceColorClasses = colorClasses[service.color as keyof typeof colorClasses] || colorClasses.purple;
                              
                              return (
                                <Link
                                  key={service.id}
                                  href={service.href}
                                  onClick={closeMobileMenu}
                                  className="group flex items-center space-x-3 p-4 rounded-xl text-gray-300 hover:bg-gradient-to-r hover:from-white/5 hover:to-transparent border border-transparent hover:border-2 hover:border-white/30 hover:shadow-2xl hover:shadow-white/20 transition-all duration-300 cursor-pointer"
                                >
                                  <div className={`p-3 rounded-lg bg-gradient-to-br ${serviceColorClasses} flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-sm`}>
                                    <IconComponent
                                      className="w-5 h-5"
                                      aria-hidden="true"
                                    />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="font-medium text-white group-hover:text-cyan-300 transition-colors">
                                      {service.title}
                                    </div>
                                    <p className="text-sm text-gray-400 group-hover:text-white/90 transition-colors leading-relaxed">
                                      {service.description}
                                    </p>
                                  </div>
                                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <ArrowRight className="w-4 h-4 text-cyan-400" />
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      ) : (
                        <Link
                          href={item.href}
                          onClick={closeMobileMenu}
                          className={`block px-4 py-4 rounded-xl text-gray-300 hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-cyan-500/10 border border-transparent hover:border-2 hover:border-white/30 hover:shadow-2xl hover:shadow-white/20 transition-all duration-300 ${
                            isActive(item.href)
                              ? "bg-gradient-to-r from-purple-500/20 to-cyan-500/20 text-white border border-purple-400/30"
                              : ""
                          }`}
                        >
                          {item.name}
                        </Link>
                      )}
                    </div>
                  ))}
                </nav>

                {/* Footer do menu móvel */}
                <div className="p-6 border-t border-white/10">
                  <Link href="/contact" onClick={closeMobileMenu} className="block mb-5">
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden relative">
                      {/* Holographic Background */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 opacity-0 hover:opacity-100 transition-opacity duration-300"
                        animate={{
                          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                      
                      {/* Glow Effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-purple-400/30 to-cyan-400/30 rounded-xl blur-lg opacity-0 hover:opacity-100 transition-opacity duration-300"
                        animate={{
                          scale: [1, 1.1, 1],
                          opacity: [0, 0.3, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                      
                      <div className="relative z-10 flex items-center justify-center">
                        <Phone className="w-5 h-5 mr-3" />
                        <span className="text-base font-semibold">Fale Conosco</span>
                      </div>
                    </Button>
                  </Link>

                  <div className="flex flex-col space-y-3 text-sm">
                    <a
                      href="tel:+5511994396469"
                      className="flex items-center justify-center space-x-2 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-300"
                    >
                      <Phone className="w-4 h-4 text-cyan-400" />
                      <span className="text-gray-300">(11) 99439-6469</span>
                    </a>
                    <a
                      href="mailto:contato@fernandohenrique.dev"
                      className="flex items-center justify-center space-x-2 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-300"
                    >
                      <Mail className="w-4 h-4 text-cyan-400" />
                      <span className="text-gray-300">E-mail</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Espaçamento para o header fixo */}
      <div
        className={`transition-all duration-300 ${
          isScrolled ? "h-16" : "h-20"
        }`}
      />
    </>
  );
};

export { ModernHeader };
