"use client";

import Link from "next/link";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { 
  Shield, 
  Lock, 
  Eye, 
  AlertTriangle, 
  CheckCircle, 
  Zap, 
  Database, 
  Network,
  Key,
  Fingerprint,
  ShieldCheck,
  Bug,
  Search,
  Activity,
  Globe,
  Server,
  FileText,
  Users,
  ArrowRight,
  Sparkles,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Target,
  Clock,
  Award,
  TrendingUp,
  BarChart3,
  Cpu,
  HardDrive,
  Wifi,
  Smartphone,
  Laptop,
  Monitor
} from "lucide-react";

export default function CybersegurancaPage() {
  const [securityParticles, setSecurityParticles] = useState<Array<{ 
    id: number; 
    x: number; 
    y: number; 
    vx: number; 
    vy: number; 
    type: 'shield' | 'lock' | 'key' | 'scan';
    opacity: number;
  }>>([]);
  const [threatIndicators, setThreatIndicators] = useState<Array<{
    id: number;
    x: number;
    y: number;
    type: 'virus' | 'hack' | 'malware' | 'phishing';
    active: boolean;
  }>>([]);
  const [isScanning, setIsScanning] = useState(false);
  
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Security Particles Animation
  useEffect(() => {
    let animationFrameId: number;
    let isAnimating = false;

    const generateSecurityParticles = () => {
      const particles = Array.from({ length: 25 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        type: ['shield', 'lock', 'key', 'scan'][Math.floor(Math.random() * 4)] as 'shield' | 'lock' | 'key' | 'scan',
        opacity: Math.random() * 0.8 + 0.2
      }));
      setSecurityParticles(particles);
    };

    const generateThreatIndicators = () => {
      const threats = Array.from({ length: 8 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        type: ['virus', 'hack', 'malware', 'phishing'][Math.floor(Math.random() * 4)] as 'virus' | 'hack' | 'malware' | 'phishing',
        active: Math.random() > 0.5
      }));
      setThreatIndicators(threats);
    };

    const animateParticles = () => {
      if (!isAnimating) return;
      
      setSecurityParticles(prev => prev.map(particle => ({
        ...particle,
        x: (particle.x + particle.vx + 100) % 100,
        y: (particle.y + particle.vy + 100) % 100,
        opacity: Math.sin(Date.now() * 0.002 + particle.id) * 0.4 + 0.6
      })));

      setThreatIndicators(prev => prev.map(threat => ({
        ...threat,
        active: Math.random() > 0.7,
        x: (threat.x + (Math.random() - 0.5) * 0.1 + 100) % 100,
        y: (threat.y + (Math.random() - 0.5) * 0.1 + 100) % 100,
      })));

      animationFrameId = requestAnimationFrame(animateParticles);
    };

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

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    generateSecurityParticles();
    generateThreatIndicators();
    const interval = setInterval(generateSecurityParticles, 25000);

    return () => {
      clearInterval(interval);
      observer.disconnect();
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  const services = [
    {
      title: "Pentest & Vulnerabilidades",
      icon: Bug,
      description: "Testes de intrusão em web, infraestrutura e redes Wi-Fi",
      features: ["Pentest Web Application", "Pentest de Infraestrutura", "Teste de Redes Wi-Fi", "Análise de Vulnerabilidades"],
      color: "from-red-500 to-pink-500"
    },
    {
      title: "SOC & MDR",
      icon: Activity,
      description: "Monitoramento contínuo e resposta gerenciada a ameaças",
      features: ["Monitoramento 24/7", "Detecção de Ameaças", "Resposta Automatizada", "Relatórios de Segurança"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Hardening & Compliance",
      icon: ShieldCheck,
      description: "Endurecimento de sistemas e conformidade com normas",
      features: ["Hardening de SO", "Gestão de Vulnerabilidades", "Compliance NIST/ISO", "Auditoria de Segurança"],
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Resposta a Incidentes",
      icon: AlertTriangle,
      description: "Contenção, erradicação e recuperação de incidentes",
      features: ["Playbooks NIST/ISO", "Contenção Imediata", "Análise Forense", "Recuperação Completa"],
      color: "from-orange-500 to-red-500"
    }
  ];

  const frameworks = [
    { name: "NIST Cybersecurity Framework", level: 95 },
    { name: "ISO 27001/27002", level: 90 },
    { name: "ISO 22301 (Continuidade)", level: 85 },
    { name: "COBIT 5 for Risk", level: 88 },
    { name: "ITIL v4 Security Management", level: 92 },
    { name: "PCI DSS", level: 87 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-orange-900 overflow-hidden">
      {/* Animated Security Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Security Grid */}
        <svg className="absolute inset-0 w-full h-full opacity-10">
          <defs>
            <pattern id="securityGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#ef4444" strokeWidth="0.5"/>
            </pattern>
            <linearGradient id="securityGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#f97316" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#dc2626" stopOpacity="0.8" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#securityGrid)" />
        </svg>

        {/* Security Particles */}
        {securityParticles.map((particle) => {
          const IconComponent = particle.type === 'shield' ? Shield : 
                               particle.type === 'lock' ? Lock : 
                               particle.type === 'key' ? Key : Search;
          
          return (
            <motion.div
              key={particle.id}
              className="absolute text-red-400/30"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
              }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 360],
                scale: [0.8, 1.2, 0.8],
                opacity: [particle.opacity * 0.3, particle.opacity, particle.opacity * 0.3],
              }}
              transition={{
                duration: 8 + particle.id * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: particle.id * 0.2,
              }}
            >
              <IconComponent size={24} />
            </motion.div>
          );
        })}

        {/* Threat Indicators */}
        {threatIndicators.map((threat) => {
          const IconComponent = threat.type === 'virus' ? Bug : 
                               threat.type === 'hack' ? Network : 
                               threat.type === 'malware' ? FileText : AlertTriangle;
          
          return (
            <motion.div
              key={threat.id}
              className={`absolute ${threat.active ? 'text-red-500' : 'text-red-500/20'}`}
              style={{
                left: `${threat.x}%`,
                top: `${threat.y}%`,
              }}
              animate={{
                scale: threat.active ? [1, 1.5, 1] : [0.5, 0.5, 0.5],
                opacity: threat.active ? [0.3, 1, 0.3] : [0.1, 0.1, 0.1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <IconComponent size={20} />
            </motion.div>
          );
        })}

        {/* Scanning Lines */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/20 to-transparent"
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8"
      >
        <motion.div 
          className="max-w-6xl mx-auto text-center"
          style={{ y, opacity }}
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Animated Security Shield */}
            <motion.div
              className="inline-flex items-center justify-center w-32 h-32 mb-8 rounded-full bg-gradient-to-r from-red-600 to-orange-600 shadow-2xl"
              animate={{
                scale: [1, 1.1, 1],
                boxShadow: [
                  "0 0 30px rgba(239, 68, 68, 0.4)",
                  "0 0 50px rgba(249, 115, 22, 0.7)",
                  "0 0 30px rgba(239, 68, 68, 0.4)",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Shield className="w-16 h-16 text-white" />
            </motion.div>

            <motion.h1
              className="text-6xl sm:text-7xl lg:text-8xl font-bold mb-8 bg-gradient-to-r from-white via-red-200 to-orange-200 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Cibersegurança
            </motion.h1>

            <motion.h2
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Corporativa
            </motion.h2>

            <motion.p
              className="text-2xl sm:text-3xl text-gray-300 mb-12 max-w-5xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Proteja sua empresa com{" "}
              <span className="text-transparent bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text font-semibold">
                segurança de nível militar
              </span>
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <motion.button
                className="px-10 py-5 bg-gradient-to-r from-red-600 to-orange-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 text-lg group"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <Shield className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                Auditoria de Segurança Gratuita
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              
              <motion.button
                className="px-10 py-5 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300 flex items-center gap-3 text-lg group"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <Play className="w-6 h-6 group-hover:scale-110 transition-transform" />
                Ver Demonstração
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-5xl sm:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Serviços de Segurança
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <motion.div
                  key={index}
                  className="group relative"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10, scale: 1.02 }}
                >
                  <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 h-full transition-all duration-500 group-hover:border-white/20 group-hover:bg-white/10">
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                    
                    <motion.div
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${service.color} mb-6`}
                      whileHover={{ 
                        scale: 1.2, 
                        rotate: 360,
                        boxShadow: "0 0 30px rgba(239, 68, 68, 0.3)"
                      }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                      <IconComponent className="w-8 h-8 text-white" />
                    </motion.div>

                    <div className="relative z-10">
                      <h3 className="text-xl font-bold text-white mb-4 group-hover:text-red-300 transition-colors">
                        {service.title}
                      </h3>
                      
                      <p className="text-gray-300 mb-6 leading-relaxed">
                        {service.description}
                      </p>

                      <ul className="space-y-3">
                        {service.features.map((feature, featureIndex) => (
                          <motion.li
                            key={featureIndex}
                            className="flex items-start gap-3 text-gray-300 text-sm"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: featureIndex * 0.1 }}
                            viewport={{ once: true }}
                          >
                            <CheckCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.color} blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Frameworks Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-5xl sm:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Frameworks & Compliance
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {frameworks.map((framework, index) => (
              <motion.div
                key={framework.name}
                className="group relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 h-full transition-all duration-500 group-hover:border-white/20 group-hover:bg-white/10">
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-white mb-4 group-hover:text-red-300 transition-colors">
                      {framework.name}
                    </h3>
                    
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-300 mb-2">
                        <span>Conformidade</span>
                        <span>{framework.level}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <motion.div
                          className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${framework.level}%` }}
                          transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                          viewport={{ once: true }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-green-400 text-sm">
                      <CheckCircle className="w-4 h-4" />
                      <span>Certificado</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Threat Intelligence Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-5xl sm:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Threat Intelligence
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Real-time Threat Map */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-4 mb-8">
                <motion.div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-red-500 to-orange-500"
                  animate={{
                    scale: [1, 1.1, 1],
                    boxShadow: [
                      "0 0 20px rgba(239, 68, 68, 0.4)",
                      "0 0 40px rgba(249, 115, 22, 0.7)",
                      "0 0 20px rgba(239, 68, 68, 0.4)",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <AlertTriangle className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-3xl font-bold text-white">Mapa de Ameaças em Tempo Real</h3>
              </div>

              <div className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl p-8 h-96">
                {/* Threat Map Visualization */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden">
                  {/* Simulated threat map */}
                  {Array.from({ length: 20 }, (_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-red-500 rounded-full opacity-60"
                      style={{
                        left: `${Math.random() * 90 + 5}%`,
                        top: `${Math.random() * 80 + 10}%`,
                      }}
                      animate={{
                        scale: [0.5, 1.5, 0.5],
                        opacity: [0.3, 0.8, 0.3],
                      }}
                      transition={{
                        duration: 2 + Math.random() * 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: Math.random() * 2,
                      }}
                    />
                  ))}
                  
                  {/* Threat indicators */}
                  {[
                    { type: "Malware", count: "2.3M", color: "bg-red-500" },
                    { type: "Phishing", count: "847K", color: "bg-orange-500" },
                    { type: "DDoS", count: "156K", color: "bg-yellow-500" },
                    { type: "Ransomware", count: "89K", color: "bg-purple-500" },
                  ].map((threat, index) => (
                    <motion.div
                      key={threat.type}
                      className="absolute p-2 rounded-lg bg-black/50 backdrop-blur-sm border border-white/20"
                      style={{
                        left: `${15 + (index * 20)}%`,
                        top: `${20 + (index % 2) * 40}%`,
                      }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.2 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${threat.color}`}></div>
                        <div className="text-white text-sm">
                          <div className="font-semibold">{threat.type}</div>
                          <div className="text-xs text-gray-300">{threat.count} ataques</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Map Legend */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex justify-between items-center">
                    <div className="text-white text-sm">
                      <div className="font-semibold">Ataques Globais Detectados</div>
                      <div className="text-xs text-gray-300">Últimas 24 horas</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-white text-sm">Ativo</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Security Metrics */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold text-white mb-8">Métricas de Segurança</h3>
              
              <div className="space-y-4">
                {[
                  { metric: "Ataques Bloqueados", value: "2.847.392", trend: "+12%", status: "excellent" },
                  { metric: "Tempo de Resposta", value: "0.3 seg", trend: "-45%", status: "excellent" },
                  { metric: "Falsos Positivos", value: "0.02%", trend: "-23%", status: "good" },
                  { metric: "Cobertura de Detecção", value: "99.7%", trend: "+5%", status: "excellent" },
                  { metric: "Uptime do Sistema", value: "99.99%", trend: "stable", status: "excellent" },
                  { metric: "Clientes Protegidos", value: "1.247", trend: "+18%", status: "good" }
                ].map((item, index) => (
                  <motion.div
                    key={item.metric}
                    className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold text-white">{item.metric}</h4>
                      <div className="flex items-center gap-2">
                        <span className="text-white font-bold">{item.value}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          item.status === 'excellent' ? 'bg-green-500/20 text-green-400' :
                          item.status === 'good' ? 'bg-blue-500/20 text-blue-400' :
                          'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {item.trend}
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <motion.div
                        className={`h-2 rounded-full ${
                          item.status === 'excellent' ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                          item.status === 'good' ? 'bg-gradient-to-r from-blue-500 to-cyan-500' :
                          'bg-gradient-to-r from-yellow-500 to-orange-500'
                        }`}
                        initial={{ width: 0 }}
                        whileInView={{ width: item.status === 'excellent' ? '100%' : item.status === 'good' ? '85%' : '70%' }}
                        transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Security Services Deep Dive */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-5xl sm:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Serviços de Segurança Avançados
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                service: "Penetration Testing",
                icon: Target,
                description: "Testes de intrusão para identificar vulnerabilidades",
                details: [
                  "Testes de aplicação web e mobile",
                  "Testes de rede e infraestrutura",
                  "Testes de engenharia social",
                  "Relatórios detalhados com recomendações"
                ],
                certifications: ["OSCP", "CEH", "CISSP"],
                color: "from-red-500 to-pink-500"
              },
              {
                service: "SOC as a Service",
                icon: Eye,
                description: "Centro de operações de segurança 24/7",
                details: [
                  "Monitoramento contínuo 24/7",
                  "Detecção e resposta a incidentes",
                  "Análise forense digital",
                  "Relatórios executivos mensais"
                ],
                certifications: ["SIEM", "SOAR", "EDR"],
                color: "from-blue-500 to-cyan-500"
              },
              {
                service: "Vulnerability Assessment",
                icon: Search,
                description: "Avaliação sistemática de vulnerabilidades",
                details: [
                  "Scans automatizados e manuais",
                  "Análise de configurações",
                  "Priorização de riscos",
                  "Plano de remediação"
                ],
                certifications: ["CVE", "CVSS", "OWASP"],
                color: "from-green-500 to-emerald-500"
              },
              {
                service: "Incident Response",
                icon: AlertTriangle,
                description: "Resposta rápida a incidentes de segurança",
                details: [
                  "Plano de resposta personalizado",
                  "Equipe especializada 24/7",
                  "Contenção e erradicação",
                  "Análise pós-incidente"
                ],
                certifications: ["GCIH", "GCFA", "CHFI"],
                color: "from-orange-500 to-yellow-500"
              },
              {
                service: "Compliance & Audit",
                icon: CheckCircle,
                description: "Conformidade com regulamentações",
                details: [
                  "ISO 27001, LGPD, SOX",
                  "Auditorias de segurança",
                  "Gap analysis e roadmap",
                  "Certificação e manutenção"
                ],
                certifications: ["ISO 27001", "LGPD", "SOX"],
                color: "from-purple-500 to-indigo-500"
              },
              {
                service: "Security Training",
                icon: Users,
                description: "Treinamento em conscientização de segurança",
                details: [
                  "Simulações de phishing",
                  "Treinamento em segurança",
                  "Awareness programs",
                  "Métricas de progresso"
                ],
                certifications: ["SANS", "CISSP", "Security+"],
                color: "from-teal-500 to-blue-500"
              }
            ].map((service, index) => {
              const IconComponent = service.icon;
              return (
                <motion.div
                  key={service.service}
                  className="group relative"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10, scale: 1.02 }}
                >
                  <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 h-full transition-all duration-500 group-hover:border-white/20 group-hover:bg-white/10">
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                    
                    <motion.div
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${service.color} mb-6`}
                      whileHover={{ 
                        scale: 1.2, 
                        rotate: 360,
                        boxShadow: "0 0 30px rgba(239, 68, 68, 0.3)"
                      }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                      <IconComponent className="w-8 h-8 text-white" />
                    </motion.div>

                    <div className="relative z-10">
                      <h3 className="text-xl font-bold text-white mb-4 group-hover:text-red-300 transition-colors">
                        {service.service}
                      </h3>
                      
                      <p className="text-gray-300 mb-6 leading-relaxed">
                        {service.description}
                      </p>

                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-gray-400 mb-3">Inclui:</h4>
                        <ul className="space-y-2">
                          {service.details.map((detail, detailIndex) => (
                            <motion.li
                              key={detail}
                              className="flex items-start gap-2 text-gray-300 text-sm"
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.5, delay: detailIndex * 0.1 }}
                              viewport={{ once: true }}
                            >
                              <CheckCircle className="w-3 h-3 text-red-400 mt-0.5 flex-shrink-0" />
                              <span>{detail}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-gray-400 mb-2">Certificações:</h4>
                        <div className="flex flex-wrap gap-2">
                          {service.certifications.map((cert, certIndex) => (
                            <span key={cert} className="px-2 py-1 bg-white/10 rounded-full text-xs text-gray-300 border border-white/20">
                              {cert}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.color} blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Security Frameworks & Standards */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-5xl sm:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Frameworks & Padrões de Segurança
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* International Standards */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-4 mb-8">
                <motion.div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                  animate={{
                    scale: [1, 1.1, 1],
                    boxShadow: [
                      "0 0 20px rgba(59, 130, 246, 0.4)",
                      "0 0 40px rgba(147, 51, 234, 0.7)",
                      "0 0 20px rgba(59, 130, 246, 0.4)",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Shield className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-3xl font-bold text-white">Padrões Internacionais</h3>
              </div>

              <div className="space-y-4">
                {[
                  { standard: "ISO 27001", description: "Sistema de Gestão de Segurança da Informação", compliance: "100%", status: "certified" },
                  { standard: "NIST Cybersecurity Framework", description: "Framework de cibersegurança do NIST", compliance: "95%", status: "implemented" },
                  { standard: "SOC 2 Type II", description: "Controles de segurança e disponibilidade", compliance: "100%", status: "certified" },
                  { standard: "PCI DSS", description: "Padrão de segurança para dados de cartão", compliance: "100%", status: "certified" },
                  { standard: "GDPR/LGPD", description: "Proteção de dados pessoais", compliance: "100%", status: "compliant" },
                  { standard: "COBIT 2019", description: "Governança e gestão de TI", compliance: "90%", status: "implemented" }
                ].map((item, index) => (
                  <motion.div
                    key={item.standard}
                    className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold text-white">{item.standard}</h4>
                        <p className="text-gray-300 text-sm">{item.description}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-blue-400 font-bold">{item.compliance}</span>
                        <div className={`text-xs px-2 py-1 rounded-full mt-1 ${
                          item.status === 'certified' ? 'bg-green-500/20 text-green-400' :
                          item.status === 'compliant' ? 'bg-blue-500/20 text-blue-400' :
                          'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {item.status === 'certified' ? 'Certificado' :
                           item.status === 'compliant' ? 'Conforme' : 'Implementado'}
                        </div>
                      </div>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2 mt-3">
                      <motion.div
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: item.compliance }}
                        transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Security Controls Matrix */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold text-white mb-8">Matriz de Controles de Segurança</h3>
              
              <div className="space-y-4">
                {[
                  { control: "Controles Preventivos", count: "45", description: "Firewalls, Antivírus, DLP, WAF" },
                  { control: "Controles Detetivos", count: "32", description: "SIEM, IDS/IPS, Log Analysis, UEBA" },
                  { control: "Controles Corretivos", count: "28", description: "Backup, DR, Incident Response, Forensics" },
                  { control: "Controles Administrativos", count: "67", description: "Políticas, Procedimentos, Treinamento, Acessos" },
                  { control: "Controles Físicos", count: "23", description: "Biometria, CCTV, Controle de Acesso, UPS" },
                  { control: "Controles Técnicos", count: "89", description: "Criptografia, PKI, VPN, MFA, PAM" }
                ].map((item, index) => (
                  <motion.div
                    key={item.control}
                    className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold text-white">{item.control}</h4>
                      <span className="text-red-400 font-bold">{item.count} controles</span>
                    </div>
                    <p className="text-gray-300 text-sm mb-3">{item.description}</p>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <motion.div
                        className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${Math.min(parseInt(item.count) / 2, 100)}%` }}
                        transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Security Case Studies */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-5xl sm:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Cases de Segurança
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                company: "Banco Digital",
                industry: "Serviços Financeiros",
                threat: "Ataque de ransomware que criptografou servidores críticos",
                solution: "Implementação de SOC 24/7 com detecção avançada",
                results: [
                  "Zero incidentes de segurança em 18 meses",
                  "Tempo de detecção reduzido de 287h para 12min",
                  "Economia de R$ 2.3M em possíveis perdas",
                  "Certificação ISO 27001 obtida"
                ],
                technologies: ["SIEM", "SOAR", "EDR", "XDR", "MDR"],
                image: "🏦"
              },
              {
                company: "E-commerce Global",
                industry: "Varejo Online",
                threat: "Ataques DDoS e tentativas de fraude em cartão",
                solution: "WAF avançado + monitoramento de transações",
                results: [
                  "99.9% de uptime durante ataques DDoS",
                  "Redução de 95% em tentativas de fraude",
                  "PCI DSS compliance 100%",
                  "ROI de 340% em 12 meses"
                ],
                technologies: ["CloudFlare", "WAF", "ML Fraud Detection", "DDoS Protection"],
                image: "🛒"
              },
              {
                company: "Holding Industrial",
                industry: "Manufatura",
                threat: "Espionagem industrial e vazamento de dados",
                solution: "Segurança de rede segmentada + DLP",
                results: [
                  "Zero vazamentos de dados em 2 anos",
                  "Detecção de 847 tentativas de intrusão",
                  "Compliance LGPD 100%",
                  "Redução de 60% em riscos operacionais"
                ],
                technologies: ["Network Segmentation", "DLP", "UEBA", "Forensics"],
                image: "🏭"
              },
              {
                company: "Startup Fintech",
                industry: "Tecnologia Financeira",
                threat: "Vulnerabilidades em APIs e aplicações mobile",
                solution: "Pentesting + Secure Development Lifecycle",
                results: [
                  "100% das vulnerabilidades críticas corrigidas",
                  "Tempo de desenvolvimento seguro +25%",
                  "Zero incidentes de segurança",
                  "Investimento de R$ 500K em seed"
                ],
                technologies: ["SAST", "DAST", "IAST", "Mobile Security", "API Security"],
                image: "💰"
              },
              {
                company: "Hospital Regional",
                industry: "Saúde",
                threat: "Ataques direcionados a dados médicos",
                solution: "Segurança de dados + backup criptografado",
                results: [
                  "100% compliance com LGPD e HIPAA",
                  "Backup automático com 99.99% de sucesso",
                  "Tempo de recuperação <4h",
                  "Auditoria aprovada sem ressalvas"
                ],
                technologies: ["Data Encryption", "Backup Vault", "Access Control", "Audit Logs"],
                image: "🏥"
              },
              {
                company: "Universidade Federal",
                industry: "Educação",
                threat: "Ataques de phishing e roubo de credenciais",
                solution: "Awareness training + MFA + Email Security",
                results: [
                  "Redução de 89% em cliques em phishing",
                  "100% dos usuários com MFA ativo",
                  "Zero comprometimentos de conta",
                  "Economia de R$ 1.2M em riscos"
                ],
                technologies: ["Phishing Simulation", "MFA", "Email Gateway", "User Training"],
                image: "🎓"
              }
            ].map((case_study, index) => (
              <motion.div
                key={case_study.company}
                className="group relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 h-full transition-all duration-500 group-hover:border-white/20 group-hover:bg-white/10">
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="text-4xl">{case_study.image}</div>
                      <div>
                        <h3 className="text-xl font-bold text-white group-hover:text-red-300 transition-colors">
                          {case_study.company}
                        </h3>
                        <p className="text-red-400 text-sm">{case_study.industry}</p>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-400 mb-2">Ameaça:</h4>
                      <p className="text-gray-300 text-sm mb-3">{case_study.threat}</p>
                      
                      <h4 className="text-sm font-semibold text-gray-400 mb-2">Solução:</h4>
                      <p className="text-gray-300 text-sm mb-4">{case_study.solution}</p>
                    </div>

                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-400 mb-3">Resultados:</h4>
                      <ul className="space-y-2">
                        {case_study.results.map((result, resultIndex) => (
                          <motion.li
                            key={result}
                            className="flex items-start gap-2 text-gray-300 text-sm"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: resultIndex * 0.1 }}
                            viewport={{ once: true }}
                          >
                            <CheckCircle className="w-3 h-3 text-red-400 mt-0.5 flex-shrink-0" />
                            <span>{result}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-gray-400 mb-3">Tecnologias:</h4>
                      <div className="flex flex-wrap gap-2">
                        {case_study.technologies.map((tech, techIndex) => (
                          <motion.span
                            key={tech}
                            className="px-3 py-1 bg-white/10 rounded-full text-xs text-gray-300 border border-white/20"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: techIndex * 0.1 }}
                            viewport={{ once: true }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            className="relative rounded-3xl border border-white/10 bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-xl p-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-5xl sm:text-6xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Proteja sua Empresa Hoje
            </motion.h2>
            
            <motion.p
              className="text-2xl text-gray-300 mb-10 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Não espere ser atacado. Implemente uma estratégia de segurança robusta agora.
            </motion.p>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <motion.button
                className="px-10 py-5 bg-gradient-to-r from-red-600 to-orange-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 text-lg group"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <Shield className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                Auditoria de Segurança Gratuita
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              
              <motion.button
                className="px-10 py-5 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300 flex items-center gap-3 text-lg group"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <Users className="w-6 h-6 group-hover:scale-110 transition-transform" />
                Falar com Especialista
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
