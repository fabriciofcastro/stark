// components/layout/footer.tsx - CYBERPUNK GLASSMORPHISM DESIGN
"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { 
  MapPin, 
  Mail, 
  Phone, 
  ArrowUpRight,
  Shield,
  FileText,
  Cookie,
  Scale,
  Zap,
  Globe,
  Layers,
  ChevronUp,
  Cpu,
  Network,
  Database,
  Lock,
  Rocket,
  Orbit,
  Atom,
  CircuitBoard,
  Sparkles,
  Star,
  Hexagon,
  Terminal,
  Code,
  Brain,
  Wifi,
  Activity,
  TrendingUp,
  Users,
  Settings,
  ShieldCheck,
  Eye,
  Fingerprint,
  Cloud
} from "lucide-react";
import { SocialFollowButtons } from "@/components/social";

const Footer = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [cyberParticles, setCyberParticles] = useState<Array<{
    id: number; 
    x: number; 
    y: number; 
    size: number;
    opacity: number;
    speed: number;
    color: string;
    type: 'dot' | 'line' | 'hex';
  }>>([]);
  const footerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll();
  const scrollPercentage = useTransform(scrollYProgress, [0, 0.3, 1], [0, 1, 1]);

  // Generate cyberpunk particles
  useEffect(() => {
    const generateCyberParticles = () => {
      const colors = ['#00ffff', '#ff0080', '#00ff00', '#ffff00', '#ff8000', '#8000ff'];
      const types = ['dot', 'line', 'hex'] as const;

      const newParticles = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 1,
        opacity: Math.random() * 0.8 + 0.2,
        speed: Math.random() * 0.8 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        type: types[Math.floor(Math.random() * types.length)],
      }));
      setCyberParticles(newParticles);
    };

    generateCyberParticles();
  }, []);

  // Show scroll button at 30% scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      setShowScrollButton(scrollPercent >= 30);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer 
      ref={footerRef}
      className="relative overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at 20% 80%, rgba(0, 255, 255, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255, 0, 128, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 50% 50%, rgba(0, 255, 0, 0.1) 0%, transparent 70%),
          linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, rgba(20, 20, 40, 0.98) 50%, rgba(0, 0, 0, 0.95) 100%)
        `
      }}
    >
      {/* Cyberpunk Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Cyber Particles */}
        {cyberParticles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: particle.type === 'line' ? '2px' : `${particle.size}px`,
              backgroundColor: particle.color,
              opacity: particle.opacity,
              borderRadius: particle.type === 'hex' ? '0' : '50%',
              transform: particle.type === 'hex' ? 'rotate(45deg)' : 'none',
            }}
            animate={{
              x: [0, Math.cos(particle.id) * 100, 0],
              y: [0, Math.sin(particle.id) * 100, 0],
              scale: [1, 1.5, 1],
              opacity: [particle.opacity, particle.opacity * 0.3, particle.opacity],
              rotate: particle.type === 'hex' ? [0, 180, 360] : [0, 0, 0],
            }}
                    transition={{
              duration: 6 + particle.speed * 8,
                      repeat: Infinity,
                      ease: "easeInOut",
              delay: particle.id * 0.1,
            }}
          />
        ))}

        {/* Cyber Grid */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full">
          <defs>
              <pattern id="cyberGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#00ffff" strokeWidth="0.5" opacity="0.3"/>
              </pattern>
          </defs>
            <rect width="100%" height="100%" fill="url(#cyberGrid)" />
        </svg>
        </div>

        {/* Floating Tech Icons */}
        {[Terminal, Code, Brain, Wifi, Activity, TrendingUp, Users, Settings, ShieldCheck, Eye, Fingerprint].map((Icon, index) => (
          <motion.div
            key={index}
            className="absolute text-cyan-400/10"
            style={{
              left: `${10 + (index * 8)}%`,
              top: `${15 + (index % 4) * 20}%`,
            }}
            animate={{
              y: [0, -40, 0],
              rotate: [0, 360],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: 10 + index * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.8,
            }}
          >
            <Icon size={28} />
          </motion.div>
        ))}

        {/* Neon Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(0, 255, 255, 0.3) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-60 h-60 rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(255, 0, 128, 0.3) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-40 h-40 rounded-full blur-2xl"
          style={{
            background: 'radial-gradient(circle, rgba(0, 255, 0, 0.2) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      {/* Neon Top Border */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_20px_rgba(0,255,255,0.5)]" />
      
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        {/* Hero Brand Section */}
          <motion.div
          className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
          <div className="relative inline-block">
            {/* Glassmorphism Container */}
            <div className="relative backdrop-blur-xl bg-white/5 border border-cyan-400/20 rounded-3xl p-12 shadow-2xl">
              {/* Neon Glow Effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-400/10 via-purple-500/10 to-pink-500/10 blur-xl" />
              
              {/* Logo */}
              <motion.div 
                className="relative mb-8"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center justify-center space-x-6">
                <motion.div 
                    className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center shadow-lg"
                  animate={{
                      boxShadow: [
                        '0 0 20px rgba(0, 255, 255, 0.5)',
                        '0 0 40px rgba(139, 92, 246, 0.5)',
                        '0 0 20px rgba(0, 255, 255, 0.5)'
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Zap className="w-10 h-10 text-white" />
                    {/* Rotating Ring */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl border-2 border-cyan-400/30"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    />
                  </motion.div>
                  
                  <div className="text-left">
                    <motion.h1 
                      className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
                      animate={{
                        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    style={{ backgroundSize: '200% 100%' }}
                  >
                    STARK
                    </motion.h1>
                  <motion.p 
                      className="text-cyan-400 font-medium text-lg tracking-wider"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                  >
                      SOLUTIONS
                  </motion.p>
                </div>
              </div>
              </motion.div>
              
              <motion.p 
                className="text-white/80 text-xl leading-relaxed max-w-2xl mx-auto mb-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Liderando a <span className="text-cyan-400 font-bold">revolução tecnológica</span> com 
                <span className="text-purple-400 font-bold"> soluções inovadoras</span> que transformam o futuro.
              </motion.p>
              
              {/* Status Indicators */}
              <div className="flex items-center justify-center space-x-8 text-sm">
                <motion.div 
                  className="flex items-center space-x-2"
                  whileHover={{ scale: 1.1 }}
                >
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(0,255,255,0.8)]" />
                  <span className="text-cyan-400 font-medium">Sistema Online</span>
                </motion.div>
                <div className="w-px h-4 bg-white/20" />
                <motion.div 
                  className="flex items-center space-x-2"
                  whileHover={{ scale: 1.1 }}
                >
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(139,92,246,0.8)]" />
                  <span className="text-purple-400 font-medium">IA Ativa</span>
                </motion.div>
                <div className="w-px h-4 bg-white/20" />
              <motion.div 
                  className="flex items-center space-x-2"
                  whileHover={{ scale: 1.1 }}
                >
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
                  <span className="text-green-400 font-medium">Seguro</span>
                </motion.div>
                </div>
            </div>
            </div>
          </motion.div>

        {/* Main Content Grid - New Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          
          {/* Services Matrix */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            onHoverStart={() => setActiveSection('services')}
            onHoverEnd={() => setActiveSection(null)}
          >
            <div className="relative backdrop-blur-xl bg-white/5 border border-cyan-400/20 rounded-2xl p-6 shadow-xl">
              {/* Neon Glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/5 to-purple-500/5 blur-sm" />
              
            <div className="relative">
              <motion.h2 
                  className="text-xl font-bold text-cyan-400 mb-6 flex items-center space-x-3"
                  animate={{ x: activeSection === 'services' ? 5 : 0 }}
              >
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-400/20 to-blue-500/20 flex items-center justify-center border border-cyan-400/30">
                  <Layers className="w-4 h-4 text-cyan-400" />
                </div>
                  <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    MATRIZ DE SERVIÇOS
                </span>
              </motion.h2>
              
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { href: "/suporte-tecnico", label: "Suporte", icon: Settings, color: "cyan" },
                    { href: "/consultoria-tecnologica", label: "Consultoria", icon: Brain, color: "purple" },
                    { href: "/cloud-vps-linux", label: "Cloud", icon: Cloud, color: "green" },
                    { href: "/governance", label: "Governança", icon: ShieldCheck, color: "yellow" },
                    { href: "/cyberseguranca", label: "Cybersegurança", icon: Lock, color: "red" },
                    { href: "/create-site", label: "Desenvolvimento", icon: Code, color: "pink" }
                  ].map((service, index) => (
                  <motion.div
                      key={service.href}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                    >
                      <Link
                        href={service.href}
                        className="group block p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-400/30 transition-all duration-300 no-underline"
                      >
                        <div className="text-center">
                          <motion.div 
                            className="inline-flex items-center justify-center w-10 h-10 rounded-lg mb-2"
                            style={{
                              background: `linear-gradient(135deg, ${
                                service.color === 'cyan' ? 'rgba(0, 255, 255, 0.1)' :
                                service.color === 'purple' ? 'rgba(139, 92, 246, 0.1)' :
                                service.color === 'green' ? 'rgba(34, 197, 94, 0.1)' :
                                service.color === 'yellow' ? 'rgba(255, 255, 0, 0.1)' :
                                service.color === 'red' ? 'rgba(239, 68, 68, 0.1)' :
                                'rgba(236, 72, 153, 0.1)'
                              }, transparent)`,
                              border: `1px solid ${
                                service.color === 'cyan' ? 'rgba(0, 255, 255, 0.2)' :
                                service.color === 'purple' ? 'rgba(139, 92, 246, 0.2)' :
                                service.color === 'green' ? 'rgba(34, 197, 94, 0.2)' :
                                service.color === 'yellow' ? 'rgba(255, 255, 0, 0.2)' :
                                service.color === 'red' ? 'rgba(239, 68, 68, 0.2)' :
                                'rgba(236, 72, 153, 0.2)'
                              }`
                            }}
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.6 }}
                          >
                            <service.icon className={`w-5 h-5 ${
                              service.color === 'cyan' ? 'text-cyan-400' :
                              service.color === 'purple' ? 'text-purple-400' :
                              service.color === 'green' ? 'text-green-400' :
                              service.color === 'yellow' ? 'text-yellow-400' :
                              service.color === 'red' ? 'text-red-400' :
                              'text-pink-400'
                            }`} />
                          </motion.div>
                          <p className="text-white/80 group-hover:text-white transition-colors font-medium text-xs">
                            {service.label}
                          </p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Company Matrix */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            onHoverStart={() => setActiveSection('company')}
            onHoverEnd={() => setActiveSection(null)}
          >
            <div className="relative backdrop-blur-xl bg-white/5 border border-purple-400/20 rounded-2xl p-6 shadow-xl">
              {/* Neon Glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400/5 to-pink-500/5 blur-sm" />
              
            <div className="relative">
              <motion.h3 
                  className="text-xl font-bold text-purple-400 mb-6 flex items-center space-x-3"
                  animate={{ x: activeSection === 'company' ? 5 : 0 }}
              >
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-400/20 to-pink-500/20 flex items-center justify-center border border-purple-400/30">
                  <Globe className="w-4 h-4 text-purple-400" />
                </div>
                  <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    MATRIZ CORPORATIVA
                </span>
              </motion.h3>
              
                <div className="space-y-2">
                  {[
                    { href: "/sobre", label: "Sobre Nós", icon: Users, color: "purple" },
                    { href: "/trabalhe-conosco", label: "Trabalhe Conosco", icon: Activity, color: "green" },
                    { href: "/portfolio", label: "Portfólio", icon: TrendingUp, color: "cyan" },
                    { href: "/cases-de-sucesso", label: "Cases de Sucesso", icon: Star, color: "yellow" },
                    { href: "/faq", label: "FAQ", icon: Eye, color: "blue" },
                    { href: "/blog", label: "Blog", icon: FileText, color: "pink" },
                    { href: "/contact", label: "Contato", icon: Phone, color: "red" }
                ].map((link, index) => (
                  <motion.div
                    key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                      whileHover={{ x: 5 }}
                  >
                    <Link
                      href={link.href}
                        className="group flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-400/30 transition-all duration-300 no-underline"
                    >
                      <div className="flex items-center space-x-3">
                          <motion.div 
                            className="w-6 h-6 rounded-lg flex items-center justify-center"
                            style={{
                              background: `linear-gradient(135deg, ${
                                link.color === 'purple' ? 'rgba(139, 92, 246, 0.1)' :
                                link.color === 'green' ? 'rgba(34, 197, 94, 0.1)' :
                                link.color === 'cyan' ? 'rgba(0, 255, 255, 0.1)' :
                                link.color === 'yellow' ? 'rgba(255, 255, 0, 0.1)' :
                                link.color === 'blue' ? 'rgba(59, 130, 246, 0.1)' :
                                link.color === 'pink' ? 'rgba(236, 72, 153, 0.1)' :
                                'rgba(239, 68, 68, 0.1)'
                              }, transparent)`,
                              border: `1px solid ${
                                link.color === 'purple' ? 'rgba(139, 92, 246, 0.2)' :
                                link.color === 'green' ? 'rgba(34, 197, 94, 0.2)' :
                                link.color === 'cyan' ? 'rgba(0, 255, 255, 0.2)' :
                                link.color === 'yellow' ? 'rgba(255, 255, 0, 0.2)' :
                                link.color === 'blue' ? 'rgba(59, 130, 246, 0.2)' :
                                link.color === 'pink' ? 'rgba(236, 72, 153, 0.2)' :
                                'rgba(239, 68, 68, 0.2)'
                              }`
                            }}
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ duration: 0.3 }}
                          >
                            <link.icon className={`w-3 h-3 ${
                              link.color === 'purple' ? 'text-purple-400' :
                              link.color === 'green' ? 'text-green-400' :
                              link.color === 'cyan' ? 'text-cyan-400' :
                              link.color === 'yellow' ? 'text-yellow-400' :
                              link.color === 'blue' ? 'text-blue-400' :
                              link.color === 'pink' ? 'text-pink-400' :
                              'text-red-400'
                            }`} />
                          </motion.div>
                          <span className="text-white/80 group-hover:text-white transition-colors font-medium text-sm">
                          {link.label}
                        </span>
                      </div>
                        <ArrowUpRight className="w-3 h-3 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </motion.div>
                ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Contact Matrix */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="relative backdrop-blur-xl bg-white/5 border border-green-400/20 rounded-2xl p-8 shadow-xl">
            {/* Neon Glow */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-400/5 via-cyan-500/5 to-blue-500/5 blur-xl" />
            
            <div className="relative text-center">
              <motion.h3 
                className="text-2xl font-bold text-green-400 mb-8 flex items-center justify-center space-x-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-green-400/20 to-cyan-500/20 flex items-center justify-center border border-green-400/30">
                  <Network className="w-5 h-5 text-green-400" />
                </div>
                <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
                  MATRIZ DE CONTATO
                </span>
              </motion.h3>
              
              {/* Contact Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { 
                    icon: MapPin, 
                    title: "Localização", 
                    content: "Av. Paulista, 1000\nItaquaquecetuba - SP",
                    color: "cyan",
                    glow: "rgba(0, 255, 255, 0.3)"
                  },
                  { 
                    icon: Mail, 
                    title: "E-mail", 
                    content: "contato@starksolutions.com.br",
                    color: "purple",
                    glow: "rgba(139, 92, 246, 0.3)"
                  },
                  { 
                    icon: Phone, 
                    title: "Telefone", 
                    content: "(11) 99439-6469",
                    color: "green",
                    glow: "rgba(34, 197, 94, 0.3)"
                  }
                ].map((contact, index) => (
                  <motion.div
                    key={contact.title}
                    className="relative group text-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                  >
                    {/* Glassmorphism Card */}
                    <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 shadow-lg group-hover:shadow-2xl transition-all duration-500">
                      {/* Neon Glow on Hover */}
                      <div 
                        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"
                        style={{ background: `radial-gradient(circle, ${contact.glow} 0%, transparent 70%)` }}
                      />
                      
                      <div className="relative">
                      <motion.div 
                          className="inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-4"
                        style={{
                          background: `linear-gradient(135deg, ${
                              contact.color === 'cyan' ? 'rgba(0, 255, 255, 0.1)' :
                            contact.color === 'purple' ? 'rgba(139, 92, 246, 0.1)' :
                              'rgba(34, 197, 94, 0.1)'
                          }, transparent)`,
                            border: `2px solid ${
                              contact.color === 'cyan' ? 'rgba(0, 255, 255, 0.3)' :
                              contact.color === 'purple' ? 'rgba(139, 92, 246, 0.3)' :
                              'rgba(34, 197, 94, 0.3)'
                            }`,
                            boxShadow: `0 0 20px ${
                              contact.color === 'cyan' ? 'rgba(0, 255, 255, 0.2)' :
                            contact.color === 'purple' ? 'rgba(139, 92, 246, 0.2)' :
                              'rgba(34, 197, 94, 0.2)'
                          }`
                        }}
                        whileHover={{ 
                          scale: 1.1,
                          rotate: 360,
                            boxShadow: `0 0 30px ${
                              contact.color === 'cyan' ? 'rgba(0, 255, 255, 0.4)' :
                              contact.color === 'purple' ? 'rgba(139, 92, 246, 0.4)' :
                              'rgba(34, 197, 94, 0.4)'
                            }`
                        }}
                        transition={{ duration: 0.6 }}
                      >
                          <contact.icon className={`w-6 h-6 ${
                          contact.color === 'cyan' ? 'text-cyan-400' :
                          contact.color === 'purple' ? 'text-purple-400' :
                            'text-green-400'
                        }`} />
                      </motion.div>
                      
                        <h5 className="text-white font-bold text-base mb-3 group-hover:text-cyan-400 transition-colors">
                        {contact.title}
                      </h5>
                        <p className="text-white/70 text-sm leading-relaxed whitespace-pre-line group-hover:text-white/90 transition-colors">
                        {contact.content}
                      </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Legal Matrix */}
        <motion.div
          className="relative backdrop-blur-xl bg-white/5 border border-pink-400/20 rounded-2xl p-6 shadow-xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          {/* Neon Glow */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-400/5 to-red-500/5 blur-sm" />
          
          <div className="relative">
            {/* Title */}
            <motion.h5 
              className="text-lg font-bold text-pink-400 mb-4 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.9 }}
            >
              MATRIZ LEGAL
            </motion.h5>
            
            {/* Legal Links Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              {[
                { href: "/politica-privacidade", label: "Privacidade", icon: Shield, color: "cyan" },
                { href: "/termos-uso", label: "Termos", icon: FileText, color: "purple" },
                { href: "/politica-cookies", label: "Cookies", icon: Cookie, color: "green" },
                { href: "/lgpd", label: "LGPD", icon: Scale, color: "yellow" }
              ].map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 1.0 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  <Link
                    href={link.href}
                    className="group flex flex-col items-center space-y-2 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-pink-400/30 transition-all duration-300 no-underline"
                  >
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                  >
                    <link.icon className={`w-4 h-4 ${
                      link.color === 'cyan' ? 'text-cyan-400' :
                      link.color === 'purple' ? 'text-purple-400' :
                        link.color === 'green' ? 'text-green-400' :
                        'text-yellow-400'
                    }`} />
                    </motion.div>
                    <span className="text-white/70 group-hover:text-white transition-colors font-medium text-xs text-center">
                      {link.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
              
            {/* Bottom Row */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Cookie Management */}
              <motion.button
                type="button"
                onClick={() => {
                  window.dispatchEvent(new Event("cookie:open-preferences"));
                }}
                className="group flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500/10 to-red-500/10 hover:from-pink-500/20 hover:to-red-500/20 border border-pink-400/20 hover:border-pink-400/40 transition-all duration-300"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 1.4 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Cookie className="w-4 h-4 text-pink-400" />
                </motion.div>
                <span className="text-white/70 group-hover:text-white transition-colors font-medium text-sm">
                  Gerenciar Cookies
                </span>
              </motion.button>

              {/* System Status */}
            <motion.div 
                className="flex items-center space-x-4 text-xs"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1.5 }}
              >
                <motion.div 
                  className="flex items-center space-x-1"
                  whileHover={{ scale: 1.1 }}
                >
                  <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(0,255,255,0.8)]" />
                  <span className="text-cyan-400 font-medium">Analytics</span>
                </motion.div>
                <div className="w-px h-3 bg-white/20" />
                <motion.div 
                  className="flex items-center space-x-1"
                  whileHover={{ scale: 1.1 }}
                >
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(139,92,246,0.8)]" />
                  <span className="text-purple-400 font-medium">Neural</span>
                </motion.div>
                <div className="w-px h-3 bg-white/20" />
                <motion.div 
                  className="flex items-center space-x-1"
                  whileHover={{ scale: 1.1 }}
                >
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
                  <span className="text-green-400 font-medium">Secure</span>
                </motion.div>
              </motion.div>
              </div>
          </div>
        </motion.div>
      </div>

      {/* Cyberpunk Scroll to Top Button */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-12 right-8 z-[60] group"
        initial={{ opacity: 0, scale: 0, rotate: -180 }}
        animate={{ 
          opacity: showScrollButton ? 1 : 0,
          scale: showScrollButton ? 1 : 0,
          rotate: showScrollButton ? 0 : -180
        }}
        whileHover={{ 
          scale: 1.15,
          boxShadow: "0 25px 50px -12px rgba(0, 255, 255, 0.5)",
        }}
        whileTap={{ scale: 0.9 }}
        transition={{ 
          duration: 0.6,
          type: "spring",
          stiffness: 400,
          damping: 25
        }}
        aria-label="Voltar ao topo da página"
        title="Voltar ao topo"
      >
        <div className="relative">
          {/* Cyber Pulse Rings */}
          {[0, 1, 2].map((ring) => (
            <motion.div
              key={ring}
              className="absolute inset-0 rounded-2xl border-2 border-cyan-400/40"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.8, 0, 0.8],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: ring * 0.5,
              }}
            />
          ))}
          
          {/* Main Cyber Button */}
          <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-600/20 backdrop-blur-xl border border-cyan-400/30 shadow-2xl group-hover:border-cyan-400/50 transition-all duration-500">
            {/* Inner Glow */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-400/10 to-purple-500/10 blur-sm group-hover:blur-md transition-all duration-500" />
            
            <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-purple-500 shadow-lg">
              <motion.div
                animate={{ 
                  y: [0, -3, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <ChevronUp className="h-6 w-6 text-white drop-shadow-lg" />
              </motion.div>
            </div>
          </div>
          
          {/* Cyber Glow Effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-400/40 to-purple-500/40 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        </div>
      </motion.button>
    </footer>
  );
};

export { Footer };