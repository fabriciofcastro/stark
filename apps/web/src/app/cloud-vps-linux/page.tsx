"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { 
  Cloud, 
  Server, 
  Database, 
  Network,
  Zap,
  CheckCircle,
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
  Monitor,
  Settings,
  RefreshCw,
  Download,
  Upload,
  Lock,
  Eye,
  Search,
  Shield,
  Wrench,
  Headphones,
  Phone,
  MessageCircle,
  Brain,
  Rocket,
  Star,
  Lightbulb,
  Target as TargetIcon,
  Shield as ShieldIcon,
  Zap as ZapIcon,
  Code,
  Terminal,
  FileText,
  GitBranch,
  Activity,
  Globe,
  Users,
  AlertTriangle,
  Key,
  Fingerprint,
  ShieldCheck,
  Bug
} from "lucide-react";

export default function CloudVpsLinuxPage() {
  const [cloudParticles, setCloudParticles] = useState<Array<{ 
    id: number; 
    x: number; 
    y: number; 
    vx: number; 
    vy: number; 
    type: 'cloud' | 'server' | 'database' | 'network';
    opacity: number;
  }>>([]);
  const [dataFlows, setDataFlows] = useState<Array<{
    id: number;
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    active: boolean;
    type: 'data' | 'api' | 'sync';
  }>>([]);
  const [isConnected, setIsConnected] = useState(false);
  
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Cloud Particles Animation
  useEffect(() => {
    let animationFrameId: number;
    let isAnimating = false;

    const generateCloudParticles = () => {
      const particles = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        type: ['cloud', 'server', 'database', 'network'][Math.floor(Math.random() * 4)] as 'cloud' | 'server' | 'database' | 'network',
        opacity: Math.random() * 0.8 + 0.2
      }));
      setCloudParticles(particles);
    };

    const generateDataFlows = () => {
      const flows = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x1: Math.random() * 100,
        y1: Math.random() * 100,
        x2: Math.random() * 100,
        y2: Math.random() * 100,
        active: Math.random() > 0.5,
        type: ['data', 'api', 'sync'][Math.floor(Math.random() * 3)] as 'data' | 'api' | 'sync'
      }));
      setDataFlows(flows);
    };

    const animateParticles = () => {
      if (!isAnimating) return;
      
      setCloudParticles(prev => prev.map(particle => ({
        ...particle,
        x: (particle.x + particle.vx + 100) % 100,
        y: (particle.y + particle.vy + 100) % 100,
        opacity: Math.sin(Date.now() * 0.001 + particle.id) * 0.4 + 0.6
      })));

      setDataFlows(prev => prev.map(flow => ({
        ...flow,
        active: Math.random() > 0.7,
        x1: (flow.x1 + (Math.random() - 0.5) * 0.2 + 100) % 100,
        y1: (flow.y1 + (Math.random() - 0.5) * 0.2 + 100) % 100,
        x2: (flow.x2 + (Math.random() - 0.5) * 0.2 + 100) % 100,
        y2: (flow.y2 + (Math.random() - 0.5) * 0.2 + 100) % 100,
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

    generateCloudParticles();
    generateDataFlows();
    const interval = setInterval(generateCloudParticles, 18000);

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
      title: "Cloud & VPS",
      icon: Cloud,
      description: "Provisionamento e gerenciamento de infraestrutura",
      features: ["AWS/Azure/GCP", "VPS KVM", "Docker/Kubernetes", "Auto-scaling"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Linux & Servidores",
      icon: Server,
      description: "Hardening e otimização de sistemas Linux",
      features: ["Ubuntu/CentOS/RHEL", "Nginx/Apache", "PostgreSQL/MySQL", "Redis/MongoDB"],
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Monitoramento & Observabilidade",
      icon: Activity,
      description: "Monitoramento 24/7 e observabilidade completa",
      features: ["Prometheus/Grafana", "ELK Stack", "APM", "Alertas Inteligentes"],
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Backup & Segurança",
      icon: Shield,
      description: "Backups automatizados e segurança robusta",
      features: ["Backups Versionados", "Criptografia", "Firewall", "SSL/TLS"],
      color: "from-red-500 to-orange-500"
    }
  ];

  const technologies = [
    { name: "Docker", level: 95, description: "Containerização" },
    { name: "Kubernetes", level: 90, description: "Orquestração" },
    { name: "Ansible", level: 88, description: "Automação" },
    { name: "Terraform", level: 85, description: "Infraestrutura como código" },
    { name: "Prometheus", level: 92, description: "Monitoramento" },
    { name: "Grafana", level: 87, description: "Visualização" }
  ];

  const features = [
    { metric: "99.9%", label: "Uptime Garantido", icon: Clock },
    { metric: "24/7", label: "Monitoramento", icon: Activity },
    { metric: "5min", label: "Tempo de Resposta", icon: Zap },
    { metric: "100%", label: "Backup Automático", icon: Shield }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-900 overflow-hidden">
      {/* Animated Cloud Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Data Flow Network */}
        <svg className="absolute inset-0 w-full h-full opacity-20">
          {dataFlows.map((flow) => (
            <motion.line
              key={flow.id}
              x1={`${flow.x1}%`}
              y1={`${flow.y1}%`}
              x2={`${flow.x2}%`}
              y2={`${flow.y2}%`}
              stroke={flow.type === 'data' ? "url(#dataGradient)" : 
                     flow.type === 'api' ? "url(#apiGradient)" : "url(#syncGradient)"}
              strokeWidth="1"
              opacity={flow.active ? 0.8 : 0.2}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: flow.active ? 1 : 0 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: flow.id * 0.1
              }}
            />
          ))}
          
          <defs>
            <linearGradient id="dataGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="apiGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="syncGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#ec4899" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.8" />
            </linearGradient>
          </defs>
        </svg>

        {/* Cloud Particles */}
        {cloudParticles.map((particle) => {
          const IconComponent = particle.type === 'cloud' ? Cloud : 
                               particle.type === 'server' ? Server : 
                               particle.type === 'database' ? Database : Network;
          
          return (
            <motion.div
              key={particle.id}
              className="absolute text-blue-400/30"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
              }}
              animate={{
                y: [0, -25, 0],
                rotate: [0, 180, 360],
                scale: [0.8, 1.3, 0.8],
                opacity: [particle.opacity * 0.3, particle.opacity, particle.opacity * 0.3],
              }}
              transition={{
                duration: 8 + particle.id * 0.2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: particle.id * 0.1,
              }}
            >
              <IconComponent size={28} />
            </motion.div>
          );
        })}

        {/* Floating Cloud Icons */}
        {[Cloud, Server, Database, Network, Cpu, HardDrive, Wifi, Monitor].map((Icon, index) => (
          <motion.div
            key={index}
            className="absolute text-white/10"
            style={{
              left: `${8 + (index * 12)}%`,
              top: `${15 + (index % 4) * 22}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 360],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 10 + index * 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.2,
            }}
          >
            <Icon size={32} />
          </motion.div>
        ))}

        {/* Cloud Movement */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent"
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 6,
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
            {/* Animated Cloud Icon */}
            <motion.div
              className="inline-flex items-center justify-center w-32 h-32 mb-8 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 shadow-2xl"
              animate={{
                scale: [1, 1.1, 1],
                boxShadow: [
                  "0 0 30px rgba(59, 130, 246, 0.4)",
                  "0 0 50px rgba(6, 182, 212, 0.7)",
                  "0 0 30px rgba(59, 130, 246, 0.4)",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Cloud className="w-16 h-16 text-white" />
            </motion.div>

            <motion.h1
              className="text-6xl sm:text-7xl lg:text-8xl font-bold mb-8 bg-gradient-to-r from-white via-blue-200 to-cyan-200 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Cloud & Infraestrutura
            </motion.h1>

            <motion.h2
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Linux Corporativa
            </motion.h2>

            <motion.p
              className="text-2xl sm:text-3xl text-gray-300 mb-12 max-w-5xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Provisionamento,{" "}
              <span className="text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text font-semibold">
                hardening e observabilidade
              </span>
              {" "}em servidores Linux
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <motion.button
                className="px-10 py-5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 text-lg group"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <Cloud className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                Configurar Infraestrutura
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
            Nossos Serviços
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
                        boxShadow: "0 0 30px rgba(59, 130, 246, 0.3)"
                      }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                      <IconComponent className="w-8 h-8 text-white" />
                    </motion.div>

                    <div className="relative z-10">
                      <h3 className="text-xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors">
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
                            <CheckCircle className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
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

      {/* Technologies Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-5xl sm:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Tecnologias
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                className="group relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 h-full transition-all duration-500 group-hover:border-white/20 group-hover:bg-white/10">
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                      {tech.name}
                    </h3>
                    
                    <p className="text-gray-400 text-sm mb-4">
                      {tech.description}
                    </p>
                    
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-300 mb-2">
                        <span>Proficiência</span>
                        <span>{tech.level}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <motion.div
                          className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${tech.level}%` }}
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

      {/* Features Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-5xl sm:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Garantias de Serviço
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={feature.label}
                  className="group relative"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10, scale: 1.05 }}
                >
                  <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 text-center h-full transition-all duration-500 group-hover:border-white/20 group-hover:bg-white/10">
                    <div className="relative z-10">
                      <motion.div
                        className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 mb-6"
                        animate={{
                          scale: [1, 1.15, 1],
                          opacity: [0.7, 1, 0.7],
                        }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <IconComponent className="w-8 h-8 text-white" />
                      </motion.div>
                      
                      <motion.div
                        className="text-5xl font-bold text-white mb-3"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                        viewport={{ once: true }}
                      >
                        {feature.metric}
                      </motion.div>
                      
                      <div className="text-gray-300 font-medium text-lg">
                        {feature.label}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Infrastructure Details Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-5xl sm:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Infraestrutura Detalhada
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Server Specifications */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-4 mb-8">
                <motion.div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"
                  animate={{
                    scale: [1, 1.1, 1],
                    boxShadow: [
                      "0 0 20px rgba(59, 130, 246, 0.4)",
                      "0 0 40px rgba(6, 182, 212, 0.7)",
                      "0 0 20px rgba(59, 130, 246, 0.4)",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Server className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-3xl font-bold text-white">Especificações dos Servidores</h3>
              </div>

              <div className="space-y-4">
                {[
                  { spec: "CPU", value: "Intel Xeon E5-2686 v4", cores: "18 cores / 36 threads", clock: "2.3 GHz base" },
                  { spec: "RAM", value: "DDR4 ECC", capacity: "32GB - 128GB", speed: "2400 MHz" },
                  { spec: "Storage", value: "NVMe SSD", capacity: "500GB - 4TB", iops: "100K+ IOPS" },
                  { spec: "Network", value: "10 Gbps", bandwidth: "Unlimited", latency: "<1ms" },
                  { spec: "Backup", value: "Snapshots diários", retention: "30 dias", restore: "Instantâneo" },
                  { spec: "Monitoring", value: "24/7 NOC", uptime: "99.9% SLA", response: "<5min" }
                ].map((item, index) => (
                  <motion.div
                    key={item.spec}
                    className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-white">{item.spec}</h4>
                      <span className="text-blue-400 font-bold">{item.value}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-300">
                      <span>{item.cores || item.capacity || item.bandwidth || item.retention || item.uptime || item.speed}</span>
                      <span>{item.clock || item.iops || item.latency || item.restore || item.response || item.speed}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Deployment Options */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-4 mb-8">
                <motion.div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-emerald-500"
                  animate={{
                    scale: [1, 1.1, 1],
                    boxShadow: [
                      "0 0 20px rgba(16, 185, 129, 0.4)",
                      "0 0 40px rgba(5, 150, 105, 0.7)",
                      "0 0 20px rgba(16, 185, 129, 0.4)",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Cloud className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-3xl font-bold text-white">Opções de Deploy</h3>
              </div>

              <div className="space-y-4">
                {[
                  { option: "VPS Dedicado", description: "Recursos exclusivos para máxima performance", price: "A partir de R$ 299/mês", features: ["CPU dedicada", "SSD NVMe", "IP dedicado"] },
                  { option: "Cloud Instances", description: "Escalabilidade automática conforme demanda", price: "A partir de R$ 199/mês", features: ["Auto-scaling", "Load balancing", "CDN global"] },
                  { option: "Kubernetes Cluster", description: "Orquestração de containers para microserviços", price: "A partir de R$ 499/mês", features: ["K8s managed", "Helm charts", "Service mesh"] },
                  { option: "Bare Metal", description: "Servidores físicos para workloads intensivos", price: "A partir de R$ 899/mês", features: ["Hardware dedicado", "Performance máxima", "Customização total"] },
                  { option: "Hybrid Cloud", description: "Combinação de cloud pública e privada", price: "Sob consulta", features: ["Multi-cloud", "Data sovereignty", "Compliance"] },
                  { option: "Edge Computing", description: "Processamento próximo aos usuários finais", price: "A partir de R$ 399/mês", features: ["Low latency", "Global distribution", "Real-time processing"] }
                ].map((item, index) => (
                  <motion.div
                    key={item.option}
                    className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-white">{item.option}</h4>
                      <span className="text-green-400 font-bold">{item.price}</span>
                    </div>
                    <p className="text-gray-300 text-sm mb-3">{item.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {item.features.map((feature, featureIndex) => (
                        <span key={feature} className="px-2 py-1 bg-white/10 rounded-full text-xs text-gray-300 border border-white/20">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Advanced Monitoring Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-5xl sm:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Monitoramento Avançado
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Performance Metrics",
                icon: Activity,
                metrics: [
                  { name: "CPU Usage", value: "23%", trend: "stable" },
                  { name: "Memory", value: "4.2GB/16GB", trend: "optimal" },
                  { name: "Disk I/O", value: "125 MB/s", trend: "low" },
                  { name: "Network", value: "45 Mbps", trend: "normal" }
                ],
                color: "from-blue-500 to-cyan-500"
              },
              {
                title: "Security Alerts",
                icon: Shield,
                metrics: [
                  { name: "Firewall", value: "Active", trend: "protected" },
                  { name: "SSL Status", value: "Valid", trend: "secure" },
                  { name: "Vulnerabilities", value: "0", trend: "clean" },
                  { name: "Login Attempts", value: "12", trend: "normal" }
                ],
                color: "from-red-500 to-orange-500"
              },
              {
                title: "Backup Status",
                icon: Database,
                metrics: [
                  { name: "Last Backup", value: "2h ago", trend: "recent" },
                  { name: "Backup Size", value: "2.3GB", trend: "normal" },
                  { name: "Retention", value: "30 days", trend: "configured" },
                  { name: "Restore Time", value: "<5min", trend: "fast" }
                ],
                color: "from-green-500 to-emerald-500"
              },
              {
                title: "Network Health",
                icon: Network,
                metrics: [
                  { name: "Latency", value: "12ms", trend: "excellent" },
                  { name: "Packet Loss", value: "0%", trend: "perfect" },
                  { name: "Bandwidth", value: "950 Mbps", trend: "high" },
                  { name: "Uptime", value: "99.97%", trend: "reliable" }
                ],
                color: "from-purple-500 to-pink-500"
              }
            ].map((monitor, index) => {
              const IconComponent = monitor.icon;
              return (
                <motion.div
                  key={monitor.title}
                  className="group relative"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10, scale: 1.02 }}
                >
                  <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 h-full transition-all duration-500 group-hover:border-white/20 group-hover:bg-white/10">
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${monitor.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                    
                    <motion.div
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${monitor.color} mb-6`}
                      whileHover={{ 
                        scale: 1.2, 
                        rotate: 360,
                        boxShadow: "0 0 30px rgba(59, 130, 246, 0.3)"
                      }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                      <IconComponent className="w-8 h-8 text-white" />
                    </motion.div>

                    <div className="relative z-10">
                      <h3 className="text-xl font-bold text-white mb-6 group-hover:text-blue-300 transition-colors">
                        {monitor.title}
                      </h3>
                      
                      <div className="space-y-3">
                        {monitor.metrics.map((metric, metricIndex) => (
                          <motion.div
                            key={metric.name}
                            className="flex justify-between items-center"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: metricIndex * 0.1 }}
                            viewport={{ once: true }}
                          >
                            <span className="text-gray-300 text-sm">{metric.name}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-white font-semibold text-sm">{metric.value}</span>
                              <div className={`w-2 h-2 rounded-full ${
                                metric.trend === 'stable' || metric.trend === 'optimal' || metric.trend === 'low' || metric.trend === 'normal' || metric.trend === 'recent' || metric.trend === 'configured' || metric.trend === 'excellent' || metric.trend === 'perfect' || metric.trend === 'high' || metric.trend === 'reliable' || metric.trend === 'protected' || metric.trend === 'secure' || metric.trend === 'clean' || metric.trend === 'fast'
                                  ? 'bg-green-400'
                                  : metric.trend === 'warning'
                                  ? 'bg-yellow-400'
                                  : 'bg-red-400'
                              }`}></div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${monitor.color} blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-5xl sm:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Cases de Sucesso
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                company: "E-commerce Global",
                industry: "Varejo Online",
                challenge: "Alta demanda em datas comemorativas",
                solution: "Auto-scaling com Kubernetes",
                results: [
                  "300% aumento em capacidade",
                  "99.9% uptime durante Black Friday",
                  "Redução de 60% nos custos operacionais"
                ],
                technologies: ["Kubernetes", "Docker", "AWS", "Terraform"],
                image: "🛒"
              },
              {
                company: "Fintech Startup",
                industry: "Serviços Financeiros",
                challenge: "Compliance e segurança rigorosa",
                solution: "Infraestrutura segura com monitoramento",
                results: [
                  "Zero incidentes de segurança",
                  "Conformidade PCI DSS",
                  "Deploy 50% mais rápido"
                ],
                technologies: ["AWS", "Vault", "Prometheus", "Grafana"],
                image: "💰"
              },
              {
                company: "SaaS Analytics",
                industry: "Business Intelligence",
                challenge: "Processamento de big data em tempo real",
                solution: "Pipeline de dados otimizado",
                results: [
                  "Processamento 10x mais rápido",
                  "Custos reduzidos em 40%",
                  "Escalabilidade automática"
                ],
                technologies: ["Kafka", "ClickHouse", "Kubernetes", "Redis"],
                image: "📊"
              },
              {
                company: "Media Streaming",
                industry: "Entretenimento",
                challenge: "Distribuição global de conteúdo",
                solution: "CDN e edge computing",
                results: [
                  "Latência reduzida em 80%",
                  "Cobertura em 50+ países",
                  "99.99% disponibilidade"
                ],
                technologies: ["CloudFlare", "AWS CloudFront", "Lambda", "S3"],
                image: "🎬"
              },
              {
                company: "Healthcare Platform",
                industry: "Saúde Digital",
                challenge: "LGPD e HIPAA compliance",
                solution: "Infraestrutura compliant e auditável",
                results: [
                  "100% compliance LGPD",
                  "Auditorias aprovadas",
                  "Backup automático e seguro"
                ],
                technologies: ["Azure", "PostgreSQL", "Backup Vault", "Monitor"],
                image: "🏥"
              },
              {
                company: "IoT Manufacturing",
                industry: "Indústria 4.0",
                challenge: "Conectividade de dispositivos IoT",
                solution: "Edge computing e MQTT broker",
                results: [
                  "10.000+ dispositivos conectados",
                  "Latência <50ms",
                  "Monitoramento em tempo real"
                ],
                technologies: ["MQTT", "InfluxDB", "Grafana", "Edge Nodes"],
                image: "🏭"
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
                        <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                          {case_study.company}
                        </h3>
                        <p className="text-blue-400 text-sm">{case_study.industry}</p>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-400 mb-2">Desafio:</h4>
                      <p className="text-gray-300 text-sm mb-3">{case_study.challenge}</p>
                      
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
                            <CheckCircle className="w-3 h-3 text-green-400 mt-0.5 flex-shrink-0" />
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
              Migre para a Nuvem
            </motion.h2>
            
            <motion.p
              className="text-2xl text-gray-300 mb-10 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Infraestrutura Linux robusta, segura e escalável para seu negócio.
            </motion.p>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <motion.button
                className="px-10 py-5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 text-lg group"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <Cloud className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                Configurar Infraestrutura
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
