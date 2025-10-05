"use client";

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
  Monitor,
  Settings,
  RefreshCw,
  Download,
  Upload,
  Code,
  Terminal,
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
  Building,
  Layers,
  PieChart,
  Workflow,
  GitBranch,
  Globe2,
  Wrench,
  Compass,
  MapPin,
  Mail,
  Calendar,
  DollarSign,
  UserCheck,
  GraduationCap,
  BookOpen,
  Briefcase,
  PieChart as PieChartIcon,
  Layers as LayersIcon,
  GitBranch as GitBranchIcon,
  Globe2 as Globe2Icon,
  Wrench as WrenchIcon,
  Compass as CompassIcon,
  MapPin as MapPinIcon,
  Mail as MailIcon,
  Calendar as CalendarIcon,
  DollarSign as DollarSignIcon,
  UserCheck as UserCheckIcon,
  GraduationCap as GraduationCapIcon,
  BookOpen as BookOpenIcon,
  Briefcase as BriefcaseIcon
} from "lucide-react";

export default function GovernancaPage() {
  const [governanceParticles, setGovernanceParticles] = useState<Array<{ 
    id: number; 
    x: number; 
    y: number; 
    vx: number; 
    vy: number; 
    type: 'shield' | 'lock' | 'chart' | 'settings';
    opacity: number;
  }>>([]);
  const [controlLines, setControlLines] = useState<Array<{
    id: number;
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    active: boolean;
  }>>([]);
  const [isMonitoring, setIsMonitoring] = useState(false);
  
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Governance Particles Animation
  useEffect(() => {
    let animationFrameId: number;
    let isAnimating = false;

    const generateGovernanceParticles = () => {
      const particles = Array.from({ length: 25 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        type: ['shield', 'lock', 'chart', 'settings'][Math.floor(Math.random() * 4)] as 'shield' | 'lock' | 'chart' | 'settings',
        opacity: Math.random() * 0.8 + 0.2
      }));
      setGovernanceParticles(particles);
    };

    const generateControlLines = () => {
      const lines = Array.from({ length: 15 }, (_, i) => ({
        id: i,
        x1: Math.random() * 100,
        y1: Math.random() * 100,
        x2: Math.random() * 100,
        y2: Math.random() * 100,
        active: Math.random() > 0.5
      }));
      setControlLines(lines);
    };

    const animateParticles = () => {
      if (!isAnimating) return;
      
      setGovernanceParticles(prev => prev.map(particle => ({
        ...particle,
        x: (particle.x + particle.vx + 100) % 100,
        y: (particle.y + particle.vy + 100) % 100,
        opacity: Math.sin(Date.now() * 0.001 + particle.id) * 0.4 + 0.6
      })));

      setControlLines(prev => prev.map(line => ({
        ...line,
        active: Math.random() > 0.8,
        x1: (line.x1 + (Math.random() - 0.5) * 0.1 + 100) % 100,
        y1: (line.y1 + (Math.random() - 0.5) * 0.1 + 100) % 100,
        x2: (line.x2 + (Math.random() - 0.5) * 0.1 + 100) % 100,
        y2: (line.y2 + (Math.random() - 0.5) * 0.1 + 100) % 100,
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

    generateGovernanceParticles();
    generateControlLines();
    const interval = setInterval(generateGovernanceParticles, 20000);

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
      title: "Estruturação de Processos",
      icon: Settings,
      description: "Implementação de frameworks COBIT e ITIL",
      features: ["COBIT 2019", "ITIL v4", "Processos de Serviço", "Gestão de Mudanças"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Gestão de Riscos",
      icon: Shield,
      description: "Identificação e mitigação de riscos de TI",
      features: ["Análise de Riscos", "Plano de Contingência", "BIA/DRP", "Monitoramento Contínuo"],
      color: "from-red-500 to-pink-500"
    },
    {
      title: "Conformidade Regulatória",
      icon: CheckCircle,
      description: "Adequação a normas e regulamentações",
      features: ["ISO 27001", "NIST CSF", "LGPD/DPA", "Auditorias"],
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Monitoramento & Controle",
      icon: Activity,
      description: "Dashboards e métricas de governança",
      features: ["KPIs de TI", "Dashboards Executivos", "SLAs", "Relatórios"],
      color: "from-purple-500 to-indigo-500"
    }
  ];

  const frameworks = [
    { name: "COBIT 2019", level: 95, description: "Framework de governança de TI" },
    { name: "ITIL v4", level: 90, description: "Gestão de serviços de TI" },
    { name: "ISO 27001", level: 88, description: "Sistema de gestão de segurança" },
    { name: "NIST CSF", level: 85, description: "Framework de cibersegurança" },
    { name: "LGPD/DPA", level: 92, description: "Proteção de dados pessoais" },
    { name: "SOX", level: 87, description: "Controles financeiros" }
  ];

  const results = [
    { metric: "70%", label: "Redução de Incidentes", icon: TrendingUp },
    { metric: "100%", label: "Conformidade Regulatória", icon: CheckCircle },
    { metric: "24/7", label: "Monitoramento Contínuo", icon: Activity },
    { metric: "95%", label: "Satisfação do Cliente", icon: Star }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 overflow-hidden">
      {/* Animated Governance Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Control Network */}
        <svg className="absolute inset-0 w-full h-full opacity-20">
          {controlLines.map((line) => (
            <motion.line
              key={line.id}
              x1={`${line.x1}%`}
              y1={`${line.y1}%`}
              x2={`${line.x2}%`}
              y2={`${line.y2}%`}
              stroke="url(#controlGradient)"
              strokeWidth="1"
              opacity={line.active ? 0.8 : 0.2}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: line.active ? 1 : 0 }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: line.id * 0.1
              }}
            />
          ))}
          
          <defs>
            <linearGradient id="controlGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0.8" />
            </linearGradient>
          </defs>
        </svg>

        {/* Governance Particles */}
        {governanceParticles.map((particle) => {
          const IconComponent = particle.type === 'shield' ? Shield : 
                               particle.type === 'lock' ? Lock : 
                               particle.type === 'chart' ? BarChart3 : Settings;
          
          return (
            <motion.div
              key={particle.id}
              className="absolute text-indigo-400/30"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
              }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 180, 360],
                scale: [0.8, 1.2, 0.8],
                opacity: [particle.opacity * 0.3, particle.opacity, particle.opacity * 0.3],
              }}
              transition={{
                duration: 10 + particle.id * 0.3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: particle.id * 0.2,
              }}
            >
              <IconComponent size={24} />
            </motion.div>
          );
        })}

        {/* Floating Control Icons */}
        {[Database, Server, Network, Cpu, HardDrive, Wifi, Monitor, Laptop].map((Icon, index) => (
          <motion.div
            key={index}
            className="absolute text-white/10"
            style={{
              left: `${12 + (index * 11)}%`,
              top: `${20 + (index % 4) * 20}%`,
            }}
            animate={{
              y: [0, -25, 0],
              rotate: [0, 360],
              scale: [0.8, 1.1, 0.8],
            }}
            transition={{
              duration: 12 + index * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.3,
            }}
          >
            <Icon size={28} />
          </motion.div>
        ))}

        {/* Control Pulses */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-500/10 to-transparent"
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 5,
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
            {/* Animated Governance Icon */}
            <motion.div
              className="inline-flex items-center justify-center w-32 h-32 mb-8 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 shadow-2xl"
              animate={{
                scale: [1, 1.1, 1],
                boxShadow: [
                  "0 0 30px rgba(99, 102, 241, 0.4)",
                  "0 0 50px rgba(139, 92, 246, 0.7)",
                  "0 0 30px rgba(99, 102, 241, 0.4)",
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
              className="text-6xl sm:text-7xl lg:text-8xl font-bold mb-8 bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Governança
            </motion.h1>

            <motion.h2
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              de TI Corporativa
            </motion.h2>

            <motion.p
              className="text-2xl sm:text-3xl text-gray-300 mb-12 max-w-5xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Estruturamos{" "}
              <span className="text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text font-semibold">
                processos, políticas e controles
              </span>
              {" "}alinhados às melhores práticas
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <motion.button
                className="px-10 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 text-lg group"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <Shield className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                Auditoria de Governança
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              
              <motion.button
                className="px-10 py-5 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300 flex items-center gap-3 text-lg group"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <Play className="w-6 h-6 group-hover:scale-110 transition-transform" />
                Ver Apresentação
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
                        boxShadow: "0 0 30px rgba(99, 102, 241, 0.3)"
                      }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                      <IconComponent className="w-8 h-8 text-white" />
                    </motion.div>

                    <div className="relative z-10">
                      <h3 className="text-xl font-bold text-white mb-4 group-hover:text-indigo-300 transition-colors">
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
                            <CheckCircle className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
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
            Frameworks & Normas
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
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                      {framework.name}
                    </h3>
                    
                    <p className="text-gray-400 text-sm mb-4">
                      {framework.description}
                    </p>
                    
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-300 mb-2">
                        <span>Implementação</span>
                        <span>{framework.level}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <motion.div
                          className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full"
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

      {/* Results Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-5xl sm:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Resultados Comprovados
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {results.map((result, index) => {
              const IconComponent = result.icon;
              return (
                <motion.div
                  key={result.label}
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
                        className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 mb-6"
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
                        {result.metric}
                      </motion.div>
                      
                      <div className="text-gray-300 font-medium text-lg">
                        {result.label}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* Governance Structure Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-5xl sm:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Estrutura de Governança
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Governance Layers */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8">
                <h3 className="text-2xl font-bold text-white mb-8 text-center">Camadas de Governança</h3>
                
                <div className="space-y-6">
                  {[
                    { 
                      layer: "Governança Estratégica", 
                      description: "Alinhamento com objetivos de negócio",
                      components: ["Comitê de TI", "Estratégia de TI", "Orçamento de TI", "ROI de TI"],
                      icon: Building,
                      color: "from-indigo-500 to-purple-500"
                    },
                    { 
                      layer: "Governança de Processos", 
                      description: "Estruturação e padronização",
                      components: ["COBIT 2019", "ITIL v4", "Processos de Serviço", "Gestão de Mudanças"],
                      icon: Workflow,
                      color: "from-blue-500 to-cyan-500"
                    },
                    { 
                      layer: "Governança Operacional", 
                      description: "Execução e monitoramento",
                      components: ["SLAs", "KPIs", "Dashboards", "Relatórios"],
                      icon: Activity,
                      color: "from-green-500 to-emerald-500"
                    },
                    { 
                      layer: "Governança de Riscos", 
                      description: "Identificação e mitigação",
                      components: ["Risk Assessment", "Controles Internos", "Compliance", "Auditoria"],
                      icon: Shield,
                      color: "from-red-500 to-orange-500"
                    }
                  ].map((layer, index) => {
                    const IconComponent = layer.icon;
                    return (
                      <motion.div
                        key={layer.layer}
                        className="flex items-start gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <motion.div
                          className={`flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r ${layer.color} flex-shrink-0`}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ duration: 0.3 }}
                        >
                          <IconComponent className="w-6 h-6 text-white" />
                        </motion.div>
                        
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-white mb-2">{layer.layer}</h4>
                          <p className="text-gray-300 text-sm mb-3">{layer.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {layer.components.map((component, componentIndex) => (
                              <motion.span
                                key={component}
                                className="px-2 py-1 bg-white/10 rounded text-xs text-gray-300 border border-white/20"
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3, delay: componentIndex * 0.1 }}
                                viewport={{ once: true }}
                              >
                                {component}
                              </motion.span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* Governance Roles */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8">
                <h3 className="text-2xl font-bold text-white mb-8 text-center">Papéis e Responsabilidades</h3>
                
                <div className="space-y-6">
                  {[
                    { 
                      role: "CIO/CTO", 
                      responsibilities: ["Estratégia de TI", "Alinhamento de negócio", "Gestão de orçamento", "Relacionamento com stakeholders"],
                      icon: UserCheck,
                      color: "from-purple-500 to-pink-500"
                    },
                    { 
                      role: "CISO", 
                      responsibilities: ["Segurança da informação", "Gestão de riscos", "Compliance", "Resposta a incidentes"],
                      icon: ShieldCheck,
                      color: "from-red-500 to-orange-500"
                    },
                    { 
                      role: "IT Manager", 
                      responsibilities: ["Operações de TI", "Gestão de equipe", "SLAs", "Projetos de TI"],
                      icon: Settings,
                      color: "from-blue-500 to-cyan-500"
                    },
                    { 
                      role: "Data Protection Officer", 
                      responsibilities: ["LGPD/DPA", "Privacidade de dados", "Auditoria de dados", "Treinamento"],
                      icon: Lock,
                      color: "from-green-500 to-emerald-500"
                    }
                  ].map((role, index) => {
                    const IconComponent = role.icon;
                    return (
                      <motion.div
                        key={role.role}
                        className="flex items-start gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <motion.div
                          className={`flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r ${role.color} flex-shrink-0`}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ duration: 0.3 }}
                        >
                          <IconComponent className="w-6 h-6 text-white" />
                        </motion.div>
                        
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-white mb-2">{role.role}</h4>
                          <div className="space-y-1">
                            {role.responsibilities.map((responsibility, respIndex) => (
                              <motion.div
                                key={responsibility}
                                className="flex items-center gap-2 text-gray-300 text-sm"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: respIndex * 0.1 }}
                                viewport={{ once: true }}
                              >
                                <CheckCircle className="w-3 h-3 text-indigo-400 flex-shrink-0" />
                                <span>{responsibility}</span>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Processes & Policies Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-5xl sm:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Processos e Políticas
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                category: "Gestão de Serviços",
                processes: [
                  { name: "Service Level Management", description: "Definição e monitoramento de SLAs", maturity: "95%" },
                  { name: "Incident Management", description: "Resposta e resolução de incidentes", maturity: "90%" },
                  { name: "Change Management", description: "Controle de mudanças em produção", maturity: "88%" },
                  { name: "Problem Management", description: "Análise e resolução de problemas", maturity: "85%" }
                ],
                icon: Settings,
                color: "from-blue-500 to-cyan-500"
              },
              {
                category: "Gestão de Segurança",
                processes: [
                  { name: "Access Management", description: "Controle de acesso e identidade", maturity: "92%" },
                  { name: "Vulnerability Management", description: "Identificação e correção de vulnerabilidades", maturity: "88%" },
                  { name: "Security Monitoring", description: "Monitoramento contínuo de segurança", maturity: "90%" },
                  { name: "Incident Response", description: "Resposta a incidentes de segurança", maturity: "87%" }
                ],
                icon: Shield,
                color: "from-red-500 to-pink-500"
              },
              {
                category: "Gestão de Dados",
                processes: [
                  { name: "Data Classification", description: "Classificação e proteção de dados", maturity: "89%" },
                  { name: "Backup & Recovery", description: "Backup e recuperação de dados", maturity: "93%" },
                  { name: "Data Retention", description: "Políticas de retenção de dados", maturity: "86%" },
                  { name: "Privacy Management", description: "Gestão de privacidade (LGPD)", maturity: "91%" }
                ],
                icon: Database,
                color: "from-green-500 to-emerald-500"
              },
              {
                category: "Gestão de Projetos",
                processes: [
                  { name: "Project Governance", description: "Governança de projetos de TI", maturity: "88%" },
                  { name: "Risk Management", description: "Gestão de riscos de projeto", maturity: "85%" },
                  { name: "Quality Management", description: "Garantia de qualidade", maturity: "87%" },
                  { name: "Stakeholder Management", description: "Gestão de stakeholders", maturity: "90%" }
                ],
                icon: Target,
                color: "from-purple-500 to-indigo-500"
              },
              {
                category: "Gestão de Fornecedores",
                processes: [
                  { name: "Vendor Management", description: "Gestão de fornecedores de TI", maturity: "84%" },
                  { name: "Contract Management", description: "Gestão de contratos", maturity: "86%" },
                  { name: "Performance Management", description: "Avaliação de performance", maturity: "82%" },
                  { name: "Relationship Management", description: "Gestão de relacionamento", maturity: "88%" }
                ],
                icon: Building,
                color: "from-orange-500 to-red-500"
              },
              {
                category: "Gestão Financeira",
                processes: [
                  { name: "Budget Management", description: "Gestão de orçamento de TI", maturity: "89%" },
                  { name: "Cost Management", description: "Controle de custos", maturity: "87%" },
                  { name: "Asset Management", description: "Gestão de ativos de TI", maturity: "91%" },
                  { name: "ROI Management", description: "Gestão de retorno sobre investimento", maturity: "85%" }
                ],
                icon: DollarSign,
                color: "from-yellow-500 to-orange-500"
              }
            ].map((category, index) => {
              const IconComponent = category.icon;
              return (
                <motion.div
                  key={category.category}
                  className="group relative"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10, scale: 1.02 }}
                >
                  <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 h-full transition-all duration-500 group-hover:border-white/20 group-hover:bg-white/10">
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                    
                    <div className="relative z-10">
                      <div className="flex items-center gap-4 mb-6">
                        <motion.div
                          className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${category.color}`}
                          whileHover={{ 
                            scale: 1.2, 
                            rotate: 360,
                            boxShadow: "0 0 30px rgba(0,0,0,0.3)"
                          }}
                          transition={{ duration: 0.4, ease: "easeOut" }}
                        >
                          <IconComponent className="w-8 h-8 text-white" />
                        </motion.div>
                        <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                          {category.category}
                        </h3>
                      </div>

                      <div className="space-y-4">
                        {category.processes.map((process, processIndex) => (
                          <motion.div
                            key={process.name}
                            className="p-4 rounded-xl bg-white/5 border border-white/10"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: processIndex * 0.1 }}
                            viewport={{ once: true }}
                          >
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-semibold text-white text-sm">{process.name}</h4>
                              <span className="text-indigo-400 font-bold text-xs">{process.maturity}</span>
                            </div>
                            <p className="text-gray-300 text-xs mb-3">{process.description}</p>
                            <div className="w-full bg-gray-700 rounded-full h-1.5">
                              <motion.div
                                className="bg-gradient-to-r from-indigo-500 to-purple-500 h-1.5 rounded-full"
                                initial={{ width: 0 }}
                                whileInView={{ width: process.maturity }}
                                transition={{ duration: 1, delay: processIndex * 0.1 + 0.5 }}
                                viewport={{ once: true }}
                              />
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${category.color} blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Controls & Metrics Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-5xl sm:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Controles e Métricas
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Key Controls */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8">
                <h3 className="text-2xl font-bold text-white mb-8 text-center">Controles Principais</h3>
                
                <div className="space-y-6">
                  {[
                    { 
                      control: "Controle de Acesso", 
                      description: "Autenticação e autorização",
                      metrics: ["99.9% Uptime", "0 Breaches", "24/7 Monitoring", "Multi-factor Auth"],
                      icon: Lock,
                      color: "from-red-500 to-pink-500"
                    },
                    { 
                      control: "Backup e Recuperação", 
                      description: "Proteção e disponibilidade de dados",
                      metrics: ["Daily Backups", "4h RTO", "1h RPO", "99.9% Success Rate"],
                      icon: Database,
                      color: "from-blue-500 to-cyan-500"
                    },
                    { 
                      control: "Monitoramento de Segurança", 
                      description: "Detecção e resposta a ameaças",
                      metrics: ["24/7 SOC", "Real-time Alerts", "Incident Response", "Threat Intel"],
                      icon: Shield,
                      color: "from-green-500 to-emerald-500"
                    },
                    { 
                      control: "Gestão de Mudanças", 
                      description: "Controle de alterações em produção",
                      metrics: ["100% Approval", "Zero Downtime", "Rollback Plan", "Testing"],
                      icon: Settings,
                      color: "from-purple-500 to-indigo-500"
                    }
                  ].map((control, index) => {
                    const IconComponent = control.icon;
                    return (
                      <motion.div
                        key={control.control}
                        className="flex items-start gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <motion.div
                          className={`flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r ${control.color} flex-shrink-0`}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ duration: 0.3 }}
                        >
                          <IconComponent className="w-6 h-6 text-white" />
                        </motion.div>
                        
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-white mb-2">{control.control}</h4>
                          <p className="text-gray-300 text-sm mb-3">{control.description}</p>
                          <div className="grid grid-cols-2 gap-2">
                            {control.metrics.map((metric, metricIndex) => (
                              <motion.span
                                key={metric}
                                className="px-2 py-1 bg-white/10 rounded text-xs text-gray-300 border border-white/20"
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3, delay: metricIndex * 0.1 }}
                                viewport={{ once: true }}
                              >
                                {metric}
                              </motion.span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* Governance Metrics */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8">
                <h3 className="text-2xl font-bold text-white mb-8 text-center">Métricas de Governança</h3>
                
                <div className="space-y-6">
                  {[
                    { 
                      metric: "Maturidade de Governança", 
                      value: "85%",
                      description: "Nível de maturidade geral",
                      trend: "+5%",
                      icon: TrendingUp,
                      color: "from-green-500 to-emerald-500"
                    },
                    { 
                      metric: "Conformidade Regulatória", 
                      value: "100%",
                      description: "Aderência a normas e regulamentos",
                      trend: "Stable",
                      icon: CheckCircle,
                      color: "from-blue-500 to-cyan-500"
                    },
                    { 
                      metric: "Satisfação do Cliente", 
                      value: "95%",
                      description: "Satisfação com serviços de TI",
                      trend: "+3%",
                      icon: Star,
                      color: "from-purple-500 to-pink-500"
                    },
                    { 
                      metric: "Eficiência de Processos", 
                      value: "88%",
                      description: "Eficiência dos processos de TI",
                      trend: "+7%",
                      icon: Activity,
                      color: "from-orange-500 to-red-500"
                    }
                  ].map((metric, index) => {
                    const IconComponent = metric.icon;
                    return (
                      <motion.div
                        key={metric.metric}
                        className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <motion.div
                          className={`flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r ${metric.color}`}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ duration: 0.3 }}
                        >
                          <IconComponent className="w-6 h-6 text-white" />
                        </motion.div>
                        
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h4 className="font-semibold text-white">{metric.metric}</h4>
                            <div className="text-right">
                              <span className="text-indigo-400 font-bold text-lg">{metric.value}</span>
                              <span className="text-green-400 font-bold text-xs ml-2">{metric.trend}</span>
                            </div>
                          </div>
                          <p className="text-gray-300 text-sm">{metric.description}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Compliance & Audit Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-5xl sm:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Compliance e Auditoria
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                standard: "ISO 27001",
                description: "Sistema de gestão de segurança da informação",
                requirements: ["Política de Segurança", "Gestão de Riscos", "Controles de Segurança", "Melhoria Contínua"],
                certification: "Certificado",
                icon: ShieldCheck,
                color: "from-blue-500 to-cyan-500"
              },
              {
                standard: "NIST CSF",
                description: "Framework de cibersegurança",
                requirements: ["Identify", "Protect", "Detect", "Respond", "Recover"],
                certification: "Implementado",
                icon: Shield,
                color: "from-red-500 to-pink-500"
              },
              {
                standard: "LGPD/DPA",
                description: "Proteção de dados pessoais",
                requirements: ["Consentimento", "Transparência", "Segurança", "Direitos dos Titulares"],
                certification: "Compliant",
                icon: Lock,
                color: "from-green-500 to-emerald-500"
              },
              {
                standard: "COBIT 2019",
                description: "Framework de governança de TI",
                requirements: ["Governança", "Gestão", "Processos", "Controles"],
                certification: "Aderente",
                icon: Settings,
                color: "from-purple-500 to-indigo-500"
              },
              {
                standard: "ITIL v4",
                description: "Gestão de serviços de TI",
                requirements: ["Service Strategy", "Service Design", "Service Transition", "Service Operation"],
                certification: "Implementado",
                icon: Workflow,
                color: "from-orange-500 to-red-500"
              },
              {
                standard: "PCI DSS",
                description: "Segurança de dados de cartão",
                requirements: ["Secure Network", "Cardholder Data Protection", "Vulnerability Management", "Access Control"],
                certification: "Compliant",
                icon: Shield,
                color: "from-yellow-500 to-orange-500"
              },
              {
                standard: "SOX",
                description: "Controles financeiros",
                requirements: ["Internal Controls", "Risk Assessment", "Monitoring", "Documentation"],
                certification: "Compliant",
                icon: FileText,
                color: "from-indigo-500 to-purple-500"
              },
              {
                standard: "GDPR",
                description: "Proteção de dados da UE",
                requirements: ["Lawfulness", "Transparency", "Data Minimization", "Accuracy"],
                certification: "Compliant",
                icon: Globe,
                color: "from-cyan-500 to-blue-500"
              }
            ].map((standard, index) => {
              const IconComponent = standard.icon;
              return (
                <motion.div
                  key={standard.standard}
                  className="group relative"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10, scale: 1.05 }}
                >
                  <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 h-full transition-all duration-500 group-hover:border-white/20 group-hover:bg-white/10">
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${standard.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                    
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-4">
                        <motion.div
                          className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r ${standard.color}`}
                          whileHover={{ 
                            scale: 1.2, 
                            rotate: 360,
                            boxShadow: "0 0 30px rgba(0,0,0,0.3)"
                          }}
                          transition={{ duration: 0.4, ease: "easeOut" }}
                        >
                          <IconComponent className="w-6 h-6 text-white" />
                        </motion.div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                            {standard.standard}
                          </h3>
                          <span className="text-green-400 font-bold text-xs bg-green-500/20 px-2 py-1 rounded-full border border-green-500/30">
                            {standard.certification}
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-gray-300 text-sm mb-4">{standard.description}</p>
                      
                      <div className="space-y-2">
                        <h4 className="text-xs font-semibold text-gray-400">Requisitos:</h4>
                        <div className="grid grid-cols-1 gap-1">
                          {standard.requirements.map((requirement, reqIndex) => (
                            <motion.span
                              key={requirement}
                              className="px-2 py-1 bg-white/10 rounded text-xs text-gray-300 border border-white/20"
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.3, delay: reqIndex * 0.1 }}
                              viewport={{ once: true }}
                            >
                              {requirement}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${standard.color} blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Implementation Roadmap Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-5xl sm:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Roadmap de Implementação
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Implementation Timeline */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8">
                <h3 className="text-2xl font-bold text-white mb-8 text-center">Cronograma de Implementação</h3>
                
                <div className="space-y-8">
                  {[
                    { 
                      phase: "Fase 1 - Avaliação", 
                      duration: "4-6 semanas",
                      activities: ["Assessment de maturidade", "Gap analysis", "Definição de baseline", "Planejamento estratégico"],
                      icon: Search,
                      color: "from-blue-500 to-cyan-500"
                    },
                    { 
                      phase: "Fase 2 - Estruturação", 
                      duration: "8-12 semanas",
                      activities: ["Definição de processos", "Criação de políticas", "Estruturação de controles", "Treinamento inicial"],
                      icon: Settings,
                      color: "from-purple-500 to-pink-500"
                    },
                    { 
                      phase: "Fase 3 - Implementação", 
                      duration: "12-16 semanas",
                      activities: ["Implementação de controles", "Configuração de ferramentas", "Treinamento avançado", "Testes e validação"],
                      icon: Rocket,
                      color: "from-green-500 to-emerald-500"
                    },
                    { 
                      phase: "Fase 4 - Otimização", 
                      duration: "8-12 semanas",
                      activities: ["Monitoramento contínuo", "Refinamento de processos", "Melhoria contínua", "Certificação"],
                      icon: TrendingUp,
                      color: "from-orange-500 to-red-500"
                    }
                  ].map((phase, index) => {
                    const IconComponent = phase.icon;
                    return (
                      <motion.div
                        key={phase.phase}
                        className="flex items-start gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <motion.div
                          className={`flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r ${phase.color} flex-shrink-0`}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ duration: 0.3 }}
                        >
                          <IconComponent className="w-6 h-6 text-white" />
                        </motion.div>
                        
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="text-lg font-semibold text-white">{phase.phase}</h4>
                            <span className="text-indigo-400 font-bold text-sm bg-indigo-500/20 px-2 py-1 rounded-full">
                              {phase.duration}
                            </span>
                          </div>
                          <div className="space-y-1">
                            {phase.activities.map((activity, activityIndex) => (
                              <motion.div
                                key={activity}
                                className="flex items-center gap-2 text-gray-300 text-sm"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: activityIndex * 0.1 }}
                                viewport={{ once: true }}
                              >
                                <CheckCircle className="w-3 h-3 text-indigo-400 flex-shrink-0" />
                                <span>{activity}</span>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* Investment & ROI */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8">
                <h3 className="text-2xl font-bold text-white mb-8 text-center">Investimento e ROI</h3>
                
                <div className="space-y-6">
                  {[
                    { metric: "ROI Esperado", value: "280%", description: "Retorno em 24 meses", icon: DollarSign, color: "from-green-500 to-emerald-500" },
                    { metric: "Redução de Riscos", value: "75%", description: "Redução de riscos de TI", icon: Shield, color: "from-blue-500 to-cyan-500" },
                    { metric: "Melhoria de Eficiência", value: "40%", description: "Aumento de eficiência", icon: Zap, color: "from-purple-500 to-pink-500" },
                    { metric: "Tempo de Payback", value: "12 meses", description: "Recuperação do investimento", icon: Clock, color: "from-orange-500 to-red-500" }
                  ].map((metric, index) => {
                    const IconComponent = metric.icon;
                    return (
                      <motion.div
                        key={metric.metric}
                        className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <motion.div
                          className={`flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r ${metric.color}`}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ duration: 0.3 }}
                        >
                          <IconComponent className="w-6 h-6 text-white" />
                        </motion.div>
                        
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h4 className="font-semibold text-white">{metric.metric}</h4>
                            <span className="text-indigo-400 font-bold text-lg">{metric.value}</span>
                          </div>
                          <p className="text-gray-300 text-sm">{metric.description}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Contact Information */}
              <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6 text-center">Entre em Contato</h3>
                
                <div className="space-y-4">
                  <motion.div
                    className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Telefone</h4>
                      <p className="text-gray-300 text-sm">+55 11 99439-6469</p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Email</h4>
                      <p className="text-gray-300 text-sm">contato@starksolutions.com.br</p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-500">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Localização</h4>
                      <p className="text-gray-300 text-sm">São Paulo, SP - Brasil</p>
                    </div>
                  </motion.div>
                </div>

                <motion.div
                  className="mt-6 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <motion.button
                    className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 text-lg group mx-auto"
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Calendar className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    Agendar Auditoria de Governança
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
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
              Implemente Governança Agora
            </motion.h2>
            
            <motion.p
              className="text-2xl text-gray-300 mb-10 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Estruture processos, políticas e controles para garantir conformidade e eficiência.
            </motion.p>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <motion.button
                className="px-10 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 text-lg group"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <Shield className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                Auditoria de Governança
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
