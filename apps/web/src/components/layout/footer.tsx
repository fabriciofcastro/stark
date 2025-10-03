// components/layout/footer.tsx - VERSÃO MODERNA E ELEGANTE
"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform, useScroll, useTransform as useScrollTransform } from "framer-motion";
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
  ChevronUp
} from "lucide-react";

const Footer = () => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; delay: number; type: string; color: string }>>([]);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const footerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll();
  const scrollPercentage = useScrollTransform(scrollYProgress, [0, 0.3, 1], [0, 1, 1]);

  // Generate elegant particles
  useEffect(() => {
    const generateParticles = () => {
      const types = ['circle', 'triangle', 'hexagon', 'star'];
      const colors = ['#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b'];
      
      const newParticles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        delay: Math.random() * 3,
        type: types[Math.floor(Math.random() * types.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
      }));
      setParticles(newParticles);
    };

    generateParticles();
    const interval = setInterval(generateParticles, 15000);

    return () => clearInterval(interval);
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
      className="relative border-t border-gradient-to-r from-cyan-500/30 via-transparent to-purple-500/30 backdrop-blur-2xl overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at 20% 80%, rgba(6, 182, 212, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(236, 72, 153, 0.05) 0%, transparent 50%),
          linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.95) 100%)
        `
      }}
    >
      {/* Elegant Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated Grid */}
        <div className="absolute inset-0">
          <div className="h-full w-full opacity-[0.02]" style={{
            backgroundImage: `
              linear-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/5 to-transparent"
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </div>
        </div>

        {/* Floating Particles */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              color: particle.color,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 15 - 7.5, 0],
              rotate: [0, 180],
              scale: [0.8, 1.2, 0.8],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: particle.delay,
            }}
          >
            {particle.type === 'circle' && (
              <div className="w-full h-full rounded-full bg-gradient-to-r from-current to-transparent blur-sm" />
            )}
            {particle.type === 'triangle' && (
              <Triangle className="w-full h-full" fill="currentColor" />
            )}
            {particle.type === 'hexagon' && (
              <Hexagon className="w-full h-full" fill="currentColor" />
            )}
            {particle.type === 'star' && (
              <Star className="w-full h-full" fill="currentColor" />
            )}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16">
        {/* Main Content - Modern and Elegant */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          {/* Brand Section */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-6">
              {/* Logo */}
              <div className="flex items-center space-x-4">
                <motion.div 
                  className="relative"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-600/20 backdrop-blur-sm border border-white/10">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-purple-500">
                      <Zap className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </motion.div>
                
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-white via-cyan-100 to-purple-200 bg-clip-text text-transparent">
                    STARK
                  </h3>
                  <p className="text-sm text-cyan-400 font-medium flex items-center space-x-2">
                    <Sparkles className="h-4 w-4" />
                    <span>GESTÃO EM TECNOLOGIA</span>
                  </p>
                </div>
              </div>
              
              <p className="text-gray-300 leading-relaxed">
                Transformamos infraestrutura tecnológica em <span className="text-cyan-400 font-semibold">ativos estratégicos</span>. 
                Especialistas em governança, segurança e <span className="text-purple-400 font-semibold">inovação digital</span>.
              </p>
              
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <div className="flex items-center space-x-2">
                  <Globe className="h-4 w-4 text-cyan-400" />
                  <span>© 2024 STARK Tecnologia</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Services Section */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="space-y-6">
              <h4 className="text-xl font-bold text-white flex items-center space-x-3">
                <Layers className="h-5 w-5 text-cyan-400" />
                <span>Serviços</span>
              </h4>
              
              <nav className="space-y-3">
                {[
                  { href: "/suporte-tecnico", label: "Suporte Técnico" },
                  { href: "/consultoria-tecnologica", label: "Consultoria" },
                  { href: "/cloud-vps-linux", label: "Soluções em Nuvem" },
                  { href: "/governance", label: "Governança de TI" },
                  { href: "/cyberseguranca", label: "Cibersegurança" },
                  { href: "/create-site", label: "Desenvolvimento Web" }
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="group flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-all duration-300"
                  >
                    <span className="text-gray-300 group-hover:text-white transition-colors duration-300 font-medium">
                      {link.label}
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>
                ))}
              </nav>
            </div>
          </motion.div>

          {/* Company Section */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="space-y-6">
              <h4 className="text-xl font-bold text-white flex items-center space-x-3">
                <Globe className="h-5 w-5 text-purple-400" />
                <span>Empresa</span>
              </h4>
              
              <nav className="space-y-3">
                {[
                  { href: "/sobre", label: "Sobre Nós" },
                  { href: "/portfolio", label: "Portfólio" },
                  { href: "/cases-de-sucesso", label: "Cases de Sucesso" },
                  { href: "/faq", label: "FAQ" },
                  { href: "/blog", label: "Blog" },
                  { href: "/contact", label: "Contato" }
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="group flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-all duration-300"
                  >
                    <span className="text-gray-300 group-hover:text-white transition-colors duration-300 font-medium">
                      {link.label}
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>
                ))}
              </nav>
            </div>
          </motion.div>
        </div>

        {/* Contact Info - Modern Style */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="border-t border-white/10 pt-12">
            <h4 className="text-2xl font-bold text-center text-white mb-12">
              Entre em Contato
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { 
                  icon: MapPin, 
                  title: "Endereço", 
                  content: "Av. Paulista, 1000\nItaquaquecetuba - SP",
                  color: "cyan"
                },
                { 
                  icon: Mail, 
                  title: "E-mail", 
                  content: "contato@starkgestao.com.br",
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
                  className="text-center group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500/10 to-purple-600/10 border border-white/10 mb-4 group-hover:border-white/20 transition-colors duration-300">
                    <contact.icon className={`h-8 w-8 ${
                      contact.color === 'cyan' ? 'text-cyan-400' :
                      contact.color === 'purple' ? 'text-purple-400' :
                      'text-emerald-400'
                    }`} />
                  </div>
                  
                  <h5 className="text-white font-bold text-lg mb-2">
                    {contact.title}
                  </h5>
                  <p className="text-gray-300 text-base leading-relaxed whitespace-pre-line">
                    {contact.content}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Legal Links - Modern Layout */}
        <motion.div
          className="border-t border-white/10 pt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Legal Links */}
            <div className="flex flex-wrap items-center justify-center gap-6">
              {[
                { href: "/politica-privacidade", label: "Política de Privacidade", icon: Shield, color: "cyan" },
                { href: "/termos-uso", label: "Termos de Uso", icon: FileText, color: "purple" },
                { href: "/politica-cookies", label: "Política de Cookies", icon: Cookie, color: "emerald" },
                { href: "/lgpd", label: "LGPD", icon: Scale, color: "orange" }
              ].map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  className="group"
                >
                  <Link
                    href={link.href}
                    className="flex items-center space-x-2 p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300"
                  >
                    <link.icon className={`h-4 w-4 ${
                      link.color === 'cyan' ? 'text-cyan-400' :
                      link.color === 'purple' ? 'text-purple-400' :
                      link.color === 'emerald' ? 'text-emerald-400' :
                      'text-orange-400'
                    }`} />
                    <span className="text-gray-300 group-hover:text-white transition-colors duration-300 font-medium text-sm">
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
                className="flex items-center space-x-2 p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 1.0 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Cookie className="h-4 w-4 text-cyan-400" />
                <span className="text-gray-300 hover:text-white transition-colors duration-300 font-medium text-sm">
                  Gerenciar Cookies
                </span>
              </motion.button>
            </div>

            {/* Analytics Info */}
            <motion.div 
              className="flex items-center space-x-2 text-xs text-gray-500"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full animate-pulse" />
              <span>Google Analytics • Vercel Analytics</span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Modern Scroll to Top Button - Above Chatbot */}
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
          scale: 1.1,
          boxShadow: "0 20px 40px -8px rgba(6, 182, 212, 0.4)",
        }}
        whileTap={{ scale: 0.9 }}
        transition={{ 
          duration: 0.5,
          type: "spring",
          stiffness: 300,
          damping: 20
        }}
      >
        <div className="relative">
          {/* Pulsing Animation */}
          <motion.div
            className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-400/30 to-purple-500/30"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          {/* Main Button */}
          <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/30 to-purple-600/30 backdrop-blur-xl border border-white/20 shadow-2xl">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-purple-500">
              <motion.div
                animate={{ 
                  y: [0, -2, 0],
                }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <ChevronUp className="h-5 w-5 text-white" />
              </motion.div>
            </div>
          </div>
          
          {/* Holographic Glow */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-400/50 to-purple-500/50 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      </motion.button>
    </footer>
  );
};

export { Footer };