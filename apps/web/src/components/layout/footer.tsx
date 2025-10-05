// components/layout/footer.tsx - FUTURISTIC DESIGN REVOLUTION
"use client";

import Link from "next/link";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
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
  Sparkles,
  Zap,
  Star,
  Globe,
  Layers,
  Hexagon,
  Triangle,
  ChevronUp,
  Cpu,
  Network,
  Database,
  Lock,
  Rocket,
  Orbit,
  Atom,
  CircuitBoard
} from "lucide-react";
import { SocialFollowButtons } from "@/components/social";

const Footer = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [activeHover, setActiveHover] = useState<string | null>(null);
  const footerRef = useRef<HTMLElement>(null);
  const [neuralParticles, setNeuralParticles] = useState<Array<{ 
    id: number; 
    x: number; 
    y: number; 
    vx: number; 
    vy: number; 
    connections: number[];
  }>>([]);
  
  const { scrollYProgress } = useScroll();
  const scrollPercentage = useTransform(scrollYProgress, [0, 0.3, 1], [0, 1, 1]);

  // Neural Network Particles - OTIMIZADO para performance
  useEffect(() => {
    let animationFrameId: number;
    let isAnimating = false;

    const generateNeuralNetwork = () => {
      const particles = Array.from({ length: 12 }, (_, i) => ({ // Reduzido de 15 para 12
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        vx: (Math.random() - 0.5) * 0.3, // Reduzido de 0.5 para 0.3
        vy: (Math.random() - 0.5) * 0.3,
        connections: [] as number[]
      }));

      // Create neural connections - otimizado
      particles.forEach((particle, i) => {
        const connections: number[] = [];
        for (let j = 0; j < particles.length; j++) {
          if (i !== j && Math.random() > 0.75) { // Aumentado de 0.7 para 0.75
            connections.push(j);
          }
        }
        particle.connections = connections;
      });

      setNeuralParticles(particles);
    };

    const animateParticles = () => {
      if (!isAnimating) return;
      
      setNeuralParticles(prev => prev.map(particle => ({
        ...particle,
        x: (particle.x + particle.vx + 100) % 100,
        y: (particle.y + particle.vy + 100) % 100
      })));

      animationFrameId = requestAnimationFrame(animateParticles);
    };

    // Iniciar animação apenas quando visível
    const observer = new IntersectionObserver(
      ([entry]) => {
        isAnimating = entry.isIntersecting;
        if (isAnimating) {
          animationFrameId = requestAnimationFrame(animateParticles);
        } else if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
        }
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    generateNeuralNetwork();
    const interval = setInterval(generateNeuralNetwork, 30000); // Aumentado de 20s para 30s

    return () => {
      clearInterval(interval);
      observer.disconnect();
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
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
          radial-gradient(circle at 20% 80%, rgba(6, 182, 212, 0.08) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.08) 0%, transparent 50%),
          linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(51, 65, 85, 0.98) 100%)
        `
      }}
    >
      {/* Futuristic Neural Network Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Neural Network Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-20">
          {neuralParticles.map((particle) => 
            particle.connections.map((connectionId) => {
              const connection = neuralParticles[connectionId];
              if (!connection) return null;
              
              const distance = Math.sqrt(
                Math.pow(particle.x - connection.x, 2) + 
                Math.pow(particle.y - connection.y, 2)
              );
              
              if (distance < 30) {
                return (
                  <motion.line
                    key={`${particle.id}-${connectionId}`}
                    x1={`${particle.x}%`}
                    y1={`${particle.y}%`}
                    x2={`${connection.x}%`}
                    y2={`${connection.y}%`}
                    stroke="url(#neuralGradient)"
                    strokeWidth="0.5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: [0, 1, 0] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: Math.random() * 2
                    }}
                  />
                );
              }
              return null;
            })
          )}
          
          {/* Neural Gradient */}
          <defs>
            <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#ec4899" stopOpacity="0.8" />
            </linearGradient>
          </defs>
        </svg>

        {/* Floating Tech Icons */}
        {[Cpu, Network, Database, Lock, Rocket, Orbit, Atom, CircuitBoard].map((Icon, index) => (
          <motion.div
            key={index}
            className="absolute text-white/10"
            style={{
              left: `${10 + (index * 12)}%`,
              top: `${20 + (index % 3) * 30}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 360],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 8 + index * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.5,
            }}
          >
            <Icon size={24} />
          </motion.div>
        ))}
      </div>

      {/* Holographic Border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60" />
      
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-20">
        {/* Quantum Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-20">
          
          {/* Quantum Brand */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            onHoverStart={() => setActiveHover('brand')}
            onHoverEnd={() => setActiveHover(null)}
          >
            <div className="relative group">
              {/* Quantum Logo */}
              <div className="flex items-center space-x-6 mb-8">
                <motion.div 
                  className="relative"
                  animate={{
                    rotate: activeHover === 'brand' ? 360 : 0,
                    scale: activeHover === 'brand' ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="relative w-16 h-16">
                    {/* Outer Quantum Ring */}
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-cyan-400/30"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    />
                    {/* Inner Quantum Ring */}
                    <motion.div
                      className="absolute inset-2 rounded-full border border-purple-400/40"
                      animate={{ rotate: -360 }}
                      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    />
                    {/* Core */}
                    <div className="absolute inset-4 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    {/* Quantum Pulse */}
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-cyan-400/20"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 0, 0.5],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  </div>
                </motion.div>
                
                <div>
                  <motion.h3 
                    className="text-4xl font-bold bg-gradient-to-r from-white via-cyan-200 to-purple-300 bg-clip-text text-transparent"
                    animate={{
                      backgroundPosition: activeHover === 'brand' ? '200% 0' : '0% 0',
                    }}
                    transition={{ duration: 1 }}
                    style={{ backgroundSize: '200% 100%' }}
                  >
                    STARK
                  </motion.h3>
                  <motion.p 
                    className="text-cyan-400 font-medium text-sm tracking-wider"
                    animate={{ x: activeHover === 'brand' ? 5 : 0 }}
                  >
                    STARK SOLUTIONS
                  </motion.p>
                </div>
              </div>
              
              <motion.p 
                className="text-gray-300 leading-relaxed text-lg max-w-lg"
                animate={{
                  opacity: activeHover === 'brand' ? 1 : 0.8,
                }}
              >
                Liderando a <span className="text-cyan-400 font-semibold">revolução tecnológica</span>. 
                Desenvolvemos <span className="text-purple-400 font-semibold">soluções inovadoras</span> 
                que transformam o futuro das empresas.
              </motion.p>
              
              <motion.div 
                className="mt-8 flex items-center space-x-6 text-sm"
                animate={{ y: activeHover === 'brand' ? -2 : 0 }}
              >
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full animate-pulse" />
                  <span className="text-gray-400">© 2024 STARK Solutions</span>
                </div>
                <div className="w-px h-4 bg-gray-700" />
                <span className="text-gray-500">Todos os direitos reservados</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Quantum Services */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            onHoverStart={() => setActiveHover('services')}
            onHoverEnd={() => setActiveHover(null)}
          >
            <div className="relative">
              <motion.h4 
                className="text-xl font-bold text-white mb-8 flex items-center space-x-3"
                animate={{ x: activeHover === 'services' ? 5 : 0 }}
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-600/20 flex items-center justify-center">
                  <Layers className="w-4 h-4 text-cyan-400" />
                </div>
                <span className="bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
                  Serviços
                </span>
              </motion.h4>
              
              <nav className="space-y-4">
                {[
                  { href: "/suporte-tecnico", label: "Suporte Quântico", icon: "⚡" },
                  { href: "/consultoria-tecnologica", label: "Consultoria Neural", icon: "🧠" },
                  { href: "/cloud-vps-linux", label: "Matriz Cloud", icon: "☁️" },
                  { href: "/governance", label: "Governança IA", icon: "🏛️" },
                  { href: "/cyberseguranca", label: "Defesa Cibernética", icon: "🛡️" },
                  { href: "/create-site", label: "Evolução Web", icon: "🌐" }
                ].map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      className="group flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-all duration-300 no-underline"
                      style={{ textDecoration: 'none' }}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-lg opacity-60 group-hover:opacity-100 transition-opacity">
                          {link.icon}
                        </span>
                        <span className="text-gray-300 group-hover:text-white transition-colors font-medium">
                          {link.label}
                        </span>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </div>
          </motion.div>

          {/* Quantum Company */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            onHoverStart={() => setActiveHover('company')}
            onHoverEnd={() => setActiveHover(null)}
          >
            <div className="relative">
              <motion.h4 
                className="text-xl font-bold text-white mb-8 flex items-center space-x-3"
                animate={{ x: activeHover === 'company' ? 5 : 0 }}
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-600/20 flex items-center justify-center">
                  <Globe className="w-4 h-4 text-purple-400" />
                </div>
                <span className="bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                  Empresa
                </span>
              </motion.h4>
              
              <nav className="space-y-4">
                {[
                  { href: "/sobre", label: "Sobre Nós", icon: "🏢" },
                  { href: "/trabalhe-conosco", label: "Trabalhe Conosco", icon: "👥" },
                  { href: "/portfolio", label: "Portfólio", icon: "💼" },
                  { href: "/cases-de-sucesso", label: "Cases de Sucesso", icon: "🏆" },
                  { href: "/faq", label: "FAQ", icon: "❓" },
                  { href: "/blog", label: "Blog", icon: "📝" },
                  { href: "/contact", label: "Contato", icon: "📞" }
                ].map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      className="group flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-all duration-300 no-underline"
                      style={{ textDecoration: 'none' }}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-lg opacity-60 group-hover:opacity-100 transition-opacity">
                          {link.icon}
                        </span>
                        <span className="text-gray-300 group-hover:text-white transition-colors font-medium">
                          {link.label}
                        </span>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </div>
          </motion.div>
        </div>

        {/* Quantum Contact Matrix */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="relative">
            {/* Matrix Border */}
            <div className="absolute inset-0 border border-white/10 rounded-2xl">
              <motion.div
                className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent"
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </div>
            
            <div className="relative p-8">
              <h4 className="text-2xl font-bold text-center text-white mb-12">
                <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                  MATRIZ DE CONTATO QUÂNTICO
                </span>
              </h4>
              
              {/* Redes Sociais - NOVO */}
              <motion.div
                className="mb-12"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <SocialFollowButtons variant="footer" showStats={true} />
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { 
                    icon: MapPin, 
                    title: "Localização", 
                    content: "Av. Paulista, 1000\nItaquaquecetuba - SP",
                    color: "cyan"
                  },
                  { 
                    icon: Mail, 
                    title: "E-mail", 
                    content: "contato@starksolutions.com.br",
                    color: "purple"
                  },
                  { 
                    icon: Phone, 
                    title: "Telefone", 
                    content: "(11) 99439-6469",
                    color: "emerald"
                  }
                ].map((contact, index) => (
                  <motion.div
                    key={contact.title}
                    className="relative group text-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    {/* Quantum Field */}
                    <div className="absolute inset-0 rounded-xl border border-white/5 group-hover:border-white/20 transition-all duration-500" />
                    
                    <div className="relative p-6">
                      <motion.div 
                        className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
                        style={{
                          background: `linear-gradient(135deg, ${
                            contact.color === 'cyan' ? 'rgba(6, 182, 212, 0.1)' :
                            contact.color === 'purple' ? 'rgba(139, 92, 246, 0.1)' :
                            'rgba(16, 185, 129, 0.1)'
                          }, transparent)`,
                          border: `1px solid ${
                            contact.color === 'cyan' ? 'rgba(6, 182, 212, 0.2)' :
                            contact.color === 'purple' ? 'rgba(139, 92, 246, 0.2)' :
                            'rgba(16, 185, 129, 0.2)'
                          }`
                        }}
                        whileHover={{ 
                          scale: 1.1,
                          rotate: 360,
                        }}
                        transition={{ duration: 0.6 }}
                      >
                        <contact.icon className={`w-8 h-8 ${
                          contact.color === 'cyan' ? 'text-cyan-400' :
                          contact.color === 'purple' ? 'text-purple-400' :
                          'text-emerald-400'
                        }`} />
                      </motion.div>
                      
                      <h5 className="text-white font-bold text-lg mb-3">
                        {contact.title}
                      </h5>
                      <p className="text-gray-300 text-base leading-relaxed whitespace-pre-line">
                        {contact.content}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quantum Legal Matrix */}
        <motion.div
          className="border-t border-white/10 pt-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Legal Links */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              {[
                { href: "/politica-privacidade", label: "Privacidade", icon: Shield, color: "cyan" },
                { href: "/termos-uso", label: "Termos", icon: FileText, color: "purple" },
                { href: "/politica-cookies", label: "Cookies", icon: Cookie, color: "emerald" },
                { href: "/lgpd", label: "LGPD", icon: Scale, color: "orange" }
              ].map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 1.0 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Link
                    href={link.href}
                    className="group flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300 no-underline"
                    style={{ textDecoration: 'none' }}
                  >
                    <link.icon className={`w-4 h-4 ${
                      link.color === 'cyan' ? 'text-cyan-400' :
                      link.color === 'purple' ? 'text-purple-400' :
                      link.color === 'emerald' ? 'text-emerald-400' :
                      'text-orange-400'
                    }`} />
                    <span className="text-gray-300 group-hover:text-white transition-colors font-medium text-sm">
                      {link.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
              
              {/* Cookie Management */}
              <motion.button
                type="button"
                onClick={() => {
                  window.dispatchEvent(new Event("cookie:open-preferences"));
                }}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 1.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Cookie className="w-4 h-4 text-cyan-400" />
                <span className="text-gray-300 hover:text-white transition-colors font-medium text-sm">
                  Gerenciar Cookies
                </span>
              </motion.button>
            </div>

            {/* Quantum Status */}
            <motion.div 
              className="flex items-center space-x-3 text-xs text-gray-500"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.6 }}
            >
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full animate-pulse" />
                <span>Analytics Quântico</span>
              </div>
              <div className="w-px h-4 bg-gray-700" />
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full animate-pulse" />
                <span>Redes Neurais</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Quantum Scroll to Top */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-24 right-8 z-[60] group"
        initial={{ opacity: 0, scale: 0, rotate: -180 }}
        animate={{ 
          opacity: showScrollButton ? 1 : 0,
          scale: showScrollButton ? 1 : 0,
          rotate: showScrollButton ? 0 : -180
        }}
        whileHover={{ 
          scale: 1.15,
          boxShadow: "0 25px 50px -12px rgba(6, 182, 212, 0.5)",
        }}
        whileTap={{ scale: 0.9 }}
        transition={{ 
          duration: 0.6,
          type: "spring",
          stiffness: 400,
          damping: 25
        }}
      >
        <div className="relative">
          {/* Quantum Pulse Rings */}
          {[0, 1, 2].map((ring) => (
            <motion.div
              key={ring}
              className="absolute inset-0 rounded-2xl border-2 border-cyan-400/30"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.8, 0, 0.8],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: ring * 0.3,
              }}
            />
          ))}
          
          {/* Main Button */}
          <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-600/20 backdrop-blur-xl border border-white/20 shadow-2xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-purple-500">
              <motion.div
                animate={{ 
                  y: [0, -3, 0],
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <ChevronUp className="h-6 w-6 text-white" />
              </motion.div>
            </div>
          </div>
          
          {/* Quantum Glow */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-400/40 to-purple-500/40 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        </div>
      </motion.button>
    </footer>
  );
};

export { Footer };