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
    Array<{ id: number; x: number; y: number; connections: number[] }>
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
    const generateParticles = () => {
      const newParticles = Array.from({ length: 15 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
      }));
      setParticles(newParticles);
    };

    generateParticles();
    const interval = setInterval(generateParticles, 8000);

    return () => clearInterval(interval);
  }, []);

  // Generate Neural Network
  useEffect(() => {
    const generateNeuralNetwork = () => {
      const nodes = Array.from({ length: 12 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        connections: Array.from(
          { length: Math.floor(Math.random() * 3) + 1 },
          () => Math.floor(Math.random() * 12),
        ).filter(
          (conn, index, arr) => arr.indexOf(conn) === index && conn !== i,
        ),
      }));
      setNeuralNodes(nodes);
    };

    generateNeuralNetwork();
    const interval = setInterval(generateNeuralNetwork, 12000);

    return () => clearInterval(interval);
  }, []);

  // Holographic effect toggle
  useEffect(() => {
    const interval = setInterval(() => {
      setHolographicActive((prev) => !prev);
    }, 3000);

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
    }, 300);
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
        {/* Neural Network Background */}
        {!isScrolled && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Neural Network Connections */}
            {neuralNodes.map((node) =>
              node.connections.map((connectionId, index) => {
                const connectedNode = neuralNodes.find(
                  (n) => n.id === connectionId,
                );
                if (!connectedNode) return null;
                return (
                  <motion.line
                    key={`connection-${node.id}-${connectionId}-${index}`}
                    x1={`${node.x}%`}
                    y1={`${node.y}%`}
                    x2={`${connectedNode.x}%`}
                    y2={`${connectedNode.y}%`}
                    stroke="url(#neuralGradient)"
                    strokeWidth="1"
                    opacity="0.3"
                    animate={{
                      opacity: [0.1, 0.4, 0.1],
                      strokeWidth: [0.5, 1.5, 0.5],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                );
              }),
            )}

            {/* Neural Nodes */}
            {neuralNodes.map((node) => (
              <motion.div
                key={`neural-node-${node.id}`}
                className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full"
                style={{
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.6, 1, 0.6],
                  boxShadow: [
                    "0 0 0px rgba(168, 85, 247, 0.4)",
                    "0 0 20px rgba(168, 85, 247, 0.8)",
                    "0 0 0px rgba(168, 85, 247, 0.4)",
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}

            {/* Holographic Scan Lines */}
            {holographicActive && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-400/20 to-transparent"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
            )}

            {/* Floating Particles */}
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute bg-gradient-to-r from-purple-400/30 to-cyan-400/30 rounded-full blur-sm"
                style={{
                  left: `${particle.x}%`,
                  top: `${particle.y}%`,
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                }}
                animate={{
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
            ))}

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

                      <motion.div
                        animate={{
                          rotate: [0, 360],
                        }}
                        transition={{
                          duration: 8,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        style={{ zIndex: 2 }}
                      >
                        <Zap
                          className={`text-white transition-all duration-300 ${
                            isScrolled ? "w-4 h-4" : "w-6 h-6 lg:w-7 lg:h-7"
                          }`}
                        />
                      </motion.div>
                    </div>

                    {/* Neural Network Connections to Logo */}
                    {!isScrolled &&
                      neuralNodes.slice(0, 3).map((node, index) => (
                        <motion.line
                          key={`logo-connection-${node.id}`}
                          className="absolute pointer-events-none"
                          x1="50%"
                          y1="50%"
                          x2={`${node.x}%`}
                          y2={`${node.y}%`}
                          stroke="url(#neuralGradient)"
                          strokeWidth="1"
                          opacity="0.2"
                          animate={{
                            opacity: [0.1, 0.3, 0.1],
                          }}
                          transition={{
                            duration: 2,
                            delay: index * 0.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        />
                      ))}
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
                {/* Holographic Background Effects */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <motion.div
                      key={`dropdown-particle-${Math.random()}-${i}`}
                      className="absolute bg-gradient-to-r from-purple-400/20 to-cyan-400/20 rounded-full blur-sm"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        width: `${Math.random() * 3 + 1}px`,
                        height: `${Math.random() * 3 + 1}px`,
                      }}
                      animate={{
                        x: [0, Math.random() * 50 - 25, 0],
                        y: [0, Math.random() * 50 - 25, 0],
                        scale: [1, 1.5, 1],
                        opacity: [0.3, 0.7, 0.3],
                      }}
                      transition={{
                        duration: 4 + Math.random() * 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service) => {
                      const IconComponent = service.icon;
                      return (
                        <motion.div
                          key={service.id}
                          className="group relative"
                          whileHover={{ y: -8, scale: 1.02 }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                        >
                          <Link
                            href={service.href}
                            className="block p-6 rounded-xl bg-gradient-to-br from-white/5 via-purple-500/5 to-cyan-500/5 hover:from-white/10 hover:via-purple-500/10 hover:to-cyan-500/10 border border-white/10 hover:border-purple-400/30 transition-all duration-300 relative overflow-hidden"
                          >
                            {/* Holographic Background */}
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
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

                            <div className="relative z-10 flex items-start space-x-4">
                              <motion.div
                                className="p-3 rounded-lg bg-gradient-to-br from-purple-500/20 to-cyan-500/20 group-hover:from-purple-500/30 group-hover:to-cyan-500/30 transition-colors duration-300"
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.8 }}
                              >
                                <IconComponent className="w-6 h-6 text-white" />
                              </motion.div>
                              
                              <div className="flex-1">
                                <motion.h3 
                                  className="text-lg font-semibold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-cyan-400 group-hover:bg-clip-text transition-all duration-300"
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
                                <p className="text-sm text-gray-300 mt-1">
                                  {service.description}
                                </p>
                                <div className="flex flex-wrap gap-2 mt-3">
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
                              </div>
                              
                              <motion.div
                                whileHover={{ x: 5 }}
                                transition={{ duration: 0.3 }}
                              >
                                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-400 transition-colors duration-300" />
                              </motion.div>
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
              className="fixed top-0 right-0 h-full w-80 max-w-[90vw] bg-white/95 backdrop-blur-xl border-l border-white/20 shadow-2xl z-50 lg:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <div className="flex flex-col h-full">
                {/* Header do menu móvel */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-brand-gold-400 to-brand-gold-600 rounded-xl flex items-center justify-center">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-gray-900">STARK</h2>
                      <p className="text-xs text-gray-600">
                        GESTÃO EM TECNOLOGIA
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={closeMobileMenu}
                    className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors duration-200"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Navegação móvel */}
                <nav className="flex-1 px-6 py-6 space-y-2">
                  {navigation.map((item) => (
                    <div key={item.name}>
                      {item.hasDropdown ? (
                        <div className="space-y-2">
                          <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                            Serviços
                          </div>
                          <div className="space-y-1">
                            {services.map((service) => {
                              const IconComponent = service.icon;
                              return (
                                <Link
                                  key={service.id}
                                  href={service.href}
                                  onClick={closeMobileMenu}
                                  className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                                >
                                  <div
                                    className={`p-2 rounded-lg bg-${service.color}-500/20`}
                                  >
                                    <IconComponent
                                      className={`w-5 h-5 text-${service.color}-500`}
                                    />
                                  </div>
                                  <div>
                                    <div className="font-medium">
                                      {service.title}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                      {service.description}
                                    </div>
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
                          className={`block px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200 ${
                            isActive(item.href)
                              ? "bg-brand-gold-50 text-brand-gold-700 font-semibold"
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
                <div className="p-6 border-t border-gray-200 space-y-4">
                  <Link href="/contact" onClick={closeMobileMenu}>
                    <Button className="w-full bg-gradient-to-r from-brand-gold-500 to-brand-gold-600 hover:from-brand-gold-600 hover:to-brand-gold-700 text-white font-semibold py-3 rounded-lg">
                      <Phone className="w-4 h-4 mr-2" />
                      Fale Conosco
                    </Button>
                  </Link>

                  <div className="flex space-x-4 text-sm text-gray-600">
                    <a
                      href="tel:+5511994396469"
                      className="flex items-center space-x-2 hover:text-brand-gold-600 transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                      <span>(11) 99439-6469</span>
                    </a>
                    <a
                      href="mailto:contato@fernandohenrique.dev"
                      className="flex items-center space-x-2 hover:text-brand-gold-600 transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      <span>E-mail</span>
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
