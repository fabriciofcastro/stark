"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { 
  Brain, 
  Zap, 
  Target, 
  Rocket, 
  Shield, 
  Cpu, 
  Network, 
  Database,
  ArrowRight,
  CheckCircle,
  Star,
  Sparkles,
  Lightbulb,
  TrendingUp,
  Users,
  Globe,
  Lock,
  Code,
  Cloud,
  BarChart3,
  Clock,
  Award,
  ChevronRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Search,
  Settings,
  Server,
  FileText,
  BookOpen,
  Briefcase,
  PieChart,
  Layers,
  GitBranch,
  Workflow,
  Monitor,
  Smartphone,
  Headphones,
  MessageSquare,
  Calendar,
  DollarSign,
  Building,
  UserCheck,
  GraduationCap,
  ShieldCheck,
  Globe2,
  Wrench,
  Compass,
  MapPin,
  Phone,
  Mail,
  ChevronLeft,
  ChevronDown,
  Circle,
  Heart,
  Truck
} from "lucide-react";

export default function ConsultoriaTecnologica() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [neuralParticles, setNeuralParticles] = useState<Array<{ 
    id: number; 
    x: number; 
    y: number; 
    vx: number; 
    vy: number; 
    connections: number[];
    opacity: number;
  }>>([]);
  const [floatingElements, setFloatingElements] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    speed: number;
    direction: number;
  }>>([]);
  
  const heroRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Dados dos cases de consultoria
  const caseStudies = [
    {
      company: "Indústria Farmacêutica",
      industry: "Saúde & Farmacêutica",
      challenge: "Digitalização de processos e compliance regulatório",
      solution: "Implementação de ERP integrado com sistema de qualidade",
      results: [
        "Redução de 70% no tempo de aprovação de lotes",
        "100% compliance com ANVISA",
        "Economia de R$ 2.5M em multas",
        "ROI de 340% em 18 meses"
      ],
      technologies: ["SAP", "Quality Management", "Regulatory Compliance", "Digital Workflow"],
      image: "💊",
      gradient: "from-blue-500/20 to-cyan-500/20",
      icon: ShieldCheck
    },
    {
      company: "Rede de Supermercados",
      industry: "Varejo",
      challenge: "Modernização de sistemas de gestão e estoque",
      solution: "Migração para cloud e implementação de analytics avançado",
      results: [
        "Redução de 45% no desperdício de produtos",
        "Previsão de demanda 85% mais precisa",
        "Aumento de 25% nas vendas",
        "Economia de R$ 8M anuais"
      ],
      technologies: ["Cloud Migration", "Predictive Analytics", "Inventory Optimization", "Real-time Dashboard"],
      image: "🛒",
      gradient: "from-purple-500/20 to-pink-500/20",
      icon: BarChart3
    },
    {
      company: "Banco Regional",
      industry: "Serviços Financeiros",
      challenge: "Modernização de sistemas legados e open banking",
      solution: "Arquitetura de microserviços e APIs modernas",
      results: [
        "Integração com 15 bancos em 6 meses",
        "Redução de 60% no tempo de desenvolvimento",
        "Compliance PIX 100%",
        "Aumento de 40% em novos clientes"
      ],
      technologies: ["Microservices", "API Gateway", "Open Banking", "Cloud Native"],
      image: "🏦",
      gradient: "from-green-500/20 to-emerald-500/20",
      icon: Network
    },
    {
      company: "Construtora",
      industry: "Construção Civil",
      challenge: "Gestão de projetos e controle de custos",
      solution: "Sistema integrado de gestão de obras e BI",
      results: [
        "Controle de custos em tempo real",
        "Redução de 30% em atrasos de obra",
        "Margem de lucro 20% maior",
        "Visibilidade completa de 50+ obras"
      ],
      technologies: ["Project Management", "Business Intelligence", "Mobile App", "Cost Control"],
      image: "🏗️",
      gradient: "from-orange-500/20 to-red-500/20",
      icon: Building
    },
    {
      company: "Hospital Privado",
      industry: "Saúde",
      challenge: "Integração de sistemas e prontuário eletrônico",
      solution: "Plataforma unificada de saúde digital",
      results: [
        "Integração de 12 sistemas diferentes",
        "Redução de 50% no tempo de consulta",
        "100% compliance LGPD",
        "Satisfação do paciente 95%"
      ],
      technologies: ["EMR Integration", "Health Analytics", "Patient Portal", "Interoperability"],
      image: "🏥",
      gradient: "from-cyan-500/20 to-blue-500/20",
      icon: Heart
    },
    {
      company: "Distribuidora de Combustíveis",
      industry: "Energia & Combustíveis",
      challenge: "Otimização de rotas e gestão de frotas",
      solution: "Sistema de gestão logística com IA",
      results: [
        "Redução de 25% no consumo de combustível",
        "Otimização de rotas em tempo real",
        "Redução de 40% em multas de trânsito",
        "Economia de R$ 3.2M anuais"
      ],
      technologies: ["AI/ML", "Route Optimization", "Fleet Management", "Real-time Tracking"],
      image: "⛽",
      gradient: "from-yellow-500/20 to-orange-500/20",
      icon: Truck
    }
  ];

  // Auto-play do carrossel
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % caseStudies.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, caseStudies.length]);

  // Funções de navegação
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % caseStudies.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + caseStudies.length) % caseStudies.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Neural Network Particles Animation
  useEffect(() => {
    let animationFrameId: number;
    let isAnimating = false;

    const generateNeuralNetwork = () => {
      const particles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        connections: [] as number[],
        opacity: Math.random() * 0.6 + 0.2
      }));

      // Create neural connections
      particles.forEach((particle, i) => {
        const connections: number[] = [];
        for (let j = 0; j < particles.length; j++) {
          if (i !== j && Math.random() > 0.7) {
            connections.push(j);
          }
        }
        particle.connections = connections;
      });

      setNeuralParticles(particles);
    };

    const generateFloatingElements = () => {
      const elements = Array.from({ length: 15 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 20 + 10,
        speed: Math.random() * 0.5 + 0.2,
        direction: Math.random() * 360
      }));
      setFloatingElements(elements);
    };

    const animateParticles = () => {
      if (!isAnimating) return;
      
      setNeuralParticles(prev => prev.map(particle => ({
        ...particle,
        x: (particle.x + particle.vx + 100) % 100,
        y: (particle.y + particle.vy + 100) % 100,
        opacity: Math.sin(Date.now() * 0.001 + particle.id) * 0.3 + 0.4
      })));

      setFloatingElements(prev => prev.map(element => ({
        ...element,
        x: (element.x + Math.cos(element.direction * Math.PI / 180) * element.speed + 100) % 100,
        y: (element.y + Math.sin(element.direction * Math.PI / 180) * element.speed + 100) % 100,
        direction: element.direction + 0.5
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

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    generateNeuralNetwork();
    generateFloatingElements();
    const interval = setInterval(generateNeuralNetwork, 30000);

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
			title: "Auditoria Tecnológica",
			icon: Brain,
			description: "Análise completa da infraestrutura atual e identificação de oportunidades",
			features: ["Mapeamento da infraestrutura atual", "Análise de vulnerabilidades de segurança", "Identificação de gargalos de performance", "Relatório detalhado com recomendações"],
			color: "from-blue-500 to-cyan-500"
		},
		{
			title: "Planejamento Estratégico",
			icon: Target,
			description: "Desenvolvimento de roadmap tecnológico alinhado aos objetivos de negócio",
			features: ["Roadmap de TI de 3-5 anos", "Alinhamento com estratégia empresarial", "Priorização de investimentos", "Cronograma de implementação"],
			color: "from-purple-500 to-pink-500"
		},
		{
			title: "Transformação Digital",
			icon: Rocket,
			description: "Modernização de processos e implementação de tecnologias inovadoras",
			features: ["Automação de processos", "Migração para soluções modernas", "Capacitação de equipes", "Acompanhamento de resultados"],
			color: "from-orange-500 to-red-500"
		},
		{
			title: "Governança de TI",
			icon: Shield,
			description: "Estruturação de políticas e processos para gestão eficiente de TI",
			features: ["Políticas de segurança e uso", "Processos de aprovação e controle", "Métricas de performance", "Compliance e conformidade"],
			color: "from-green-500 to-emerald-500"
		}
	];


	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 overflow-hidden">
			{/* Animated Background */}
			<div className="fixed inset-0 overflow-hidden pointer-events-none">
				{/* Neural Network Background */}
				<svg className="absolute inset-0 w-full h-full opacity-20">
					{neuralParticles.map((particle) => 
						particle.connections.map((connectionId) => {
							const connection = neuralParticles[connectionId];
							if (!connection) return null;
							
							const distance = Math.sqrt(
								Math.pow(particle.x - connection.x, 2) + 
								Math.pow(particle.y - connection.y, 2)
							);
							
							if (distance < 40) {
								return (
									<motion.line
										key={`${particle.id}-${connectionId}`}
										x1={`${particle.x}%`}
										y1={`${particle.y}%`}
										x2={`${connection.x}%`}
										y2={`${connection.y}%`}
										stroke="url(#neuralGradient)"
										strokeWidth="0.5"
										opacity={particle.opacity}
										initial={{ pathLength: 0 }}
										animate={{ pathLength: [0, 1, 0] }}
										transition={{
											duration: 4,
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
					
					<defs>
						<linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
							<stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
							<stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.4" />
							<stop offset="100%" stopColor="#ec4899" stopOpacity="0.8" />
						</linearGradient>
					</defs>
				</svg>

				{/* Floating Tech Icons */}
				{[Cpu, Network, Database, Lock, Rocket, Code, Cloud, Brain].map((Icon, index) => (
					<motion.div
						key={index}
						className="absolute text-white/10"
						style={{
							left: `${10 + (index * 12)}%`,
							top: `${20 + (index % 3) * 30}%`,
						}}
						animate={{
							y: [0, -30, 0],
							rotate: [0, 360],
							scale: [0.8, 1.2, 0.8],
						}}
						transition={{
							duration: 10 + index * 2,
							repeat: Infinity,
							ease: "easeInOut",
							delay: index * 0.5,
						}}
					>
						<Icon size={32} />
					</motion.div>
				))}

				{/* Floating Elements */}
				{floatingElements.map((element) => (
					<motion.div
						key={element.id}
						className="absolute rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-sm"
						style={{
							left: `${element.x}%`,
							top: `${element.y}%`,
							width: `${element.size}px`,
							height: `${element.size}px`,
						}}
						animate={{
							scale: [1, 1.5, 1],
							opacity: [0.3, 0.8, 0.3],
						}}
						transition={{
							duration: 3 + Math.random() * 2,
							repeat: Infinity,
							ease: "easeInOut",
						}}
					/>
				))}
			</div>

			{/* Hero Section - Futurista e Minimalista */}
			<section 
				ref={heroRef}
				className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32"
			>
				{/* Background Futurista */}
				<div className="absolute inset-0 overflow-hidden">
					{/* Gradiente Principal */}
					<div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
					
					{/* Partículas de Energia */}
					{Array.from({ length: 50 }).map((_, i) => (
						<motion.div
							key={i}
							className="absolute w-1 h-1 bg-cyan-400 rounded-full"
							style={{
								left: `${Math.random() * 100}%`,
								top: `${Math.random() * 100}%`,
							}}
							animate={{
								opacity: [0, 1, 0],
								scale: [0, 1, 0],
								y: [0, -100, 0],
							}}
							transition={{
								duration: 3 + Math.random() * 2,
								repeat: Infinity,
								delay: Math.random() * 3,
							}}
						/>
					))}
					
					{/* Linhas de Energia */}
					{Array.from({ length: 8 }).map((_, i) => (
						<motion.div
							key={i}
							className="absolute h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"
							style={{
								left: `${Math.random() * 100}%`,
								top: `${Math.random() * 100}%`,
								width: `${200 + Math.random() * 400}px`,
								transform: `rotate(${Math.random() * 360}deg)`,
							}}
							animate={{
								opacity: [0, 1, 0],
								scaleX: [0, 1, 0],
							}}
							transition={{
								duration: 4 + Math.random() * 2,
								repeat: Infinity,
								delay: Math.random() * 4,
							}}
						/>
					))}
				</div>

				<motion.div 
					className="relative z-10 max-w-6xl mx-auto text-center w-full"
					style={{ y, opacity }}
				>
					<motion.div
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 1, ease: "easeOut" }}
					>
						{/* Logo Futurista */}
						<motion.div
							className="inline-flex items-center justify-center w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 mb-8 sm:mb-12 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 backdrop-blur-xl border border-cyan-400/30 shadow-2xl"
							animate={{
								rotateY: [0, 360],
								scale: [1, 1.05, 1],
							}}
							transition={{
								rotateY: { duration: 8, repeat: Infinity, ease: "linear" },
								scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
							}}
						>
							<Brain className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 text-cyan-400" />
						</motion.div>

						{/* Título Principal - Tipografia Futurista */}
						<motion.h1
							className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black mb-4 sm:mb-6 bg-gradient-to-r from-white via-cyan-300 to-purple-300 bg-clip-text text-transparent leading-none tracking-tight"
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
						>
							CONSULTORIA
						</motion.h1>

						<motion.h2
							className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-8 sm:mb-12 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-none tracking-tight"
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
						>
							TECNOLÓGICA
						</motion.h2>

						{/* Subtítulo Minimalista */}
						<motion.p
							className="text-xl sm:text-2xl md:text-3xl text-gray-300 mb-12 sm:mb-16 max-w-4xl mx-auto leading-relaxed font-light"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
						>
							Transformação digital através da{" "}
							<span className="text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text font-semibold">
								inteligência tecnológica
							</span>
						</motion.p>

						{/* CTA Buttons - Design Futurista */}
						<motion.div
							className="flex flex-col sm:flex-row gap-6 sm:gap-8 justify-center items-center"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 1, delay: 0.9, ease: "easeOut" }}
						>
							<motion.button
								className="group relative px-8 sm:px-12 py-4 sm:py-6 bg-gradient-to-r from-cyan-600 to-purple-600 text-white font-bold rounded-2xl shadow-2xl hover:shadow-cyan-500/25 transition-all duration-500 flex items-center gap-4 text-lg sm:text-xl overflow-hidden"
								whileHover={{ scale: 1.05, y: -2 }}
								whileTap={{ scale: 0.95 }}
							>
								<div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
								<Sparkles className="w-6 h-6 group-hover:rotate-180 transition-transform duration-500" />
								<span>AGENDAR CONSULTORIA</span>
								<ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
							</motion.button>
							
							<motion.button
								className="group relative px-8 sm:px-12 py-4 sm:py-6 border-2 border-white/30 text-white font-bold rounded-2xl hover:border-cyan-400/50 hover:bg-cyan-400/10 transition-all duration-500 flex items-center gap-4 text-lg sm:text-xl backdrop-blur-sm"
								whileHover={{ scale: 1.05, y: -2 }}
								whileTap={{ scale: 0.95 }}
							>
								<Play className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
								<span>VER APRESENTAÇÃO</span>
							</motion.button>
						</motion.div>

						{/* Indicador de Scroll Futurista */}
						<motion.div
							className="mt-16 sm:mt-20 flex flex-col items-center gap-4"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 1, delay: 1.2 }}
						>
							<span className="text-gray-400 text-sm font-medium tracking-wider uppercase">SCROLL</span>
							<motion.div
								className="w-8 h-12 border-2 border-cyan-400/50 rounded-full flex justify-center relative"
								animate={{ y: [0, 8, 0] }}
								transition={{ duration: 2, repeat: Infinity }}
							>
								<motion.div
									className="w-1 h-4 bg-cyan-400 rounded-full mt-2"
									animate={{ opacity: [1, 0, 1] }}
									transition={{ duration: 2, repeat: Infinity }}
								/>
							</motion.div>
						</motion.div>
					</motion.div>
				</motion.div>
			</section>

			{/* Services Section - Modernizada */}
			<section className="relative z-10 py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
				<div className="max-w-7xl mx-auto">
					{/* Header Modernizado */}
					<motion.div
						className="text-center mb-12 sm:mb-16 lg:mb-20"
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						viewport={{ once: true }}
					>
						<motion.h2
							className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent leading-tight"
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.2 }}
						viewport={{ once: true }}
					>
						Nossos Serviços
					</motion.h2>
						<motion.p
							className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.4 }}
							viewport={{ once: true }}
						>
							Soluções tecnológicas personalizadas para impulsionar seu negócio
						</motion.p>
					</motion.div>

					{/* Grid Responsivo Melhorado */}
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
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
									whileHover={{ y: -8, scale: 1.02 }}
								>
									<div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-8 h-full transition-all duration-500 group-hover:border-white/20 group-hover:bg-white/10 group-hover:shadow-2xl group-hover:shadow-cyan-500/10">
										{/* Gradient Overlay */}
										<div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
										
										{/* Icon - Responsivo */}
										<motion.div
											className={`inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r ${service.color} mb-4 sm:mb-6 shadow-lg`}
											whileHover={{ 
												scale: 1.15, 
												rotate: 360,
												boxShadow: "0 0 25px rgba(0,0,0,0.3)"
											}}
											transition={{ duration: 0.4, ease: "easeOut" }}
										>
											<IconComponent className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
										</motion.div>

										{/* Content - Mobile Otimizado */}
										<div className="relative z-10">
											<h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 group-hover:text-cyan-300 transition-colors leading-tight">
										{service.title}
									</h3>
											
											<p className="text-gray-300 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
										{service.description}
									</p>

											{/* Features - Melhorado para Mobile */}
											<ul className="space-y-2 sm:space-y-3">
								{service.features.map((feature, featureIndex) => (
													<motion.li
										key={featureIndex}
														className="flex items-start gap-2 sm:gap-3 text-gray-300 text-xs sm:text-sm"
														initial={{ opacity: 0, x: -20 }}
														whileInView={{ opacity: 1, x: 0 }}
														transition={{ duration: 0.5, delay: featureIndex * 0.1 }}
														viewport={{ once: true }}
													>
														<CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
														<span className="leading-relaxed">{feature}</span>
													</motion.li>
								))}
							</ul>
						</div>

										{/* Hover Glow - Suavizado */}
										<div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.color} blur-xl opacity-0 group-hover:opacity-15 transition-opacity duration-500`} />
								</div>
								</motion.div>
							);
						})}
						</div>

					{/* CTA Section - Adicionado */}
					<motion.div
						className="text-center mt-12 sm:mt-16"
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.6 }}
						viewport={{ once: true }}
					>
						<motion.button
							className="px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-cyan-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 text-base sm:text-lg group mx-auto"
							whileHover={{ scale: 1.05, y: -2 }}
							whileTap={{ scale: 0.95 }}
						>
							<Sparkles className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-12 transition-transform" />
							Conhecer Todos os Serviços
							<ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
						</motion.button>
					</motion.div>
				</div>
			</section>

			{/* Results Section - Modernizada */}
			<section className="relative z-10 py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
				<div className="max-w-7xl mx-auto">
					{/* Header Modernizado */}
					<motion.div
						className="text-center mb-12 sm:mb-16 lg:mb-20"
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						viewport={{ once: true }}
					>
						<motion.h2
							className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent leading-tight"
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.2 }}
						viewport={{ once: true }}
					>
						Nossa Jornada de Transformação
					</motion.h2>
						<motion.p
							className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.4 }}
							viewport={{ once: true }}
						>
							Resultados comprovados que transformam empresas
						</motion.p>
					</motion.div>

					{/* Grid Responsivo Melhorado */}
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
						{[
							{ 
								icon: TrendingUp, 
								label: "Redução de Custos", 
								value: "30%", 
								description: "Economia comprovada em operações",
								gradient: "from-emerald-500/20 to-green-500/20",
								border: "border-emerald-500/30",
								iconBg: "from-emerald-500 to-green-500",
								textAccent: "text-emerald-400"
							},
							{ 
								icon: Zap, 
								label: "Aumento de Produtividade", 
								value: "40%", 
								description: "Eficiência operacional otimizada",
								gradient: "from-amber-500/20 to-orange-500/20",
								border: "border-amber-500/30",
								iconBg: "from-amber-500 to-orange-500",
								textAccent: "text-amber-400"
							},
							{ 
								icon: Shield, 
								label: "Melhoria de Segurança", 
								value: "95%", 
								description: "Proteção cibernética robusta",
								gradient: "from-rose-500/20 to-pink-500/20",
								border: "border-rose-500/30",
								iconBg: "from-rose-500 to-pink-500",
								textAccent: "text-rose-400"
							},
							{ 
								icon: Rocket, 
								label: "Inovação Tecnológica", 
								value: "200%", 
								description: "Crescimento em capacidades digitais",
								gradient: "from-violet-500/20 to-purple-500/20",
								border: "border-violet-500/30",
								iconBg: "from-violet-500 to-purple-500",
								textAccent: "text-violet-400"
							}
						].map((stat, index) => (
							<motion.div
								key={stat.label}
								className="relative group"
								initial={{ opacity: 0, y: 50 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8, delay: index * 0.1 }}
								viewport={{ once: true }}
								whileHover={{ y: -12, scale: 1.02 }}
							>
								{/* Modern Card Design */}
								<div className={`relative rounded-3xl border ${stat.border} bg-gradient-to-br ${stat.gradient} backdrop-blur-xl p-8 text-center h-full transition-all duration-700 group-hover:shadow-2xl group-hover:shadow-cyan-500/10`}>
									{/* Subtle Background Pattern */}
									<div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 to-transparent opacity-50" />
									
									{/* Animated Border Glow */}
									<div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${stat.iconBg} opacity-0 group-hover:opacity-20 transition-opacity duration-700 blur-sm`} />
									
									<div className="relative z-10">
										{/* Modern Icon Container */}
										<motion.div
											className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${stat.iconBg} mb-6 shadow-lg group-hover:shadow-xl transition-all duration-500`}
											animate={{
												scale: [1, 1.05, 1],
												rotate: [0, 2, 0],
											}}
											transition={{
												duration: 3,
												repeat: Infinity,
												ease: "easeInOut",
											}}
											whileHover={{ 
												scale: 1.15, 
												rotate: 5,
												boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
											}}
										>
											<stat.icon className="w-10 h-10 text-white" />
										</motion.div>
										
										{/* Value with Modern Typography */}
										<motion.div
											className={`text-6xl font-black ${stat.textAccent} mb-3 tracking-tight`}
											initial={{ scale: 0, rotate: -10 }}
											whileInView={{ scale: 1, rotate: 0 }}
											transition={{ 
												duration: 0.8, 
												delay: index * 0.1 + 0.3,
												type: "spring",
												stiffness: 200
											}}
											viewport={{ once: true }}
										>
											{stat.value}
										</motion.div>
										
										{/* Label with Enhanced Styling */}
										<div className="text-white font-bold text-xl mb-2 group-hover:text-cyan-300 transition-colors duration-500">
											{stat.label}
										</div>
										
										{/* Description */}
										<div className="text-gray-300 text-sm leading-relaxed opacity-90 group-hover:opacity-100 transition-opacity duration-500">
											{stat.description}
										</div>
									</div>

									{/* Hover Glow Effect */}
									<div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${stat.iconBg} blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-700`} />
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Consulting Methodology */}
			<section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
				<div className="max-w-7xl mx-auto">
					<motion.h2
						className="text-5xl sm:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						viewport={{ once: true }}
					>
						Metodologia de Consultoria
					</motion.h2>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
						{[
							{
								phase: "Análise & Diagnóstico",
								icon: Search,
								description: "Avaliação completa da infraestrutura atual",
								activities: [
									"Auditoria de sistemas existentes",
									"Análise de processos de negócio",
									"Identificação de gargalos",
									"Assessment de maturidade tecnológica"
								],
								duration: "2-3 semanas",
								color: "from-blue-500 to-cyan-500"
							},
							{
								phase: "Planejamento Estratégico",
								icon: Target,
								description: "Definição de roadmap e estratégia digital",
								activities: [
									"Definição de objetivos estratégicos",
									"Roadmap de implementação",
									"Análise de viabilidade técnica",
									"Planejamento de recursos"
								],
								duration: "1-2 semanas",
								color: "from-purple-500 to-pink-500"
							},
							{
								phase: "Implementação",
								icon: Settings,
								description: "Execução do plano com acompanhamento",
								activities: [
									"Implementação de soluções",
									"Migração de sistemas",
									"Treinamento de equipes",
									"Testes e validações"
								],
								duration: "4-12 semanas",
								color: "from-green-500 to-emerald-500"
							},
							{
								phase: "Otimização & Suporte",
								icon: TrendingUp,
								description: "Melhoria contínua e suporte especializado",
								activities: [
									"Monitoramento de performance",
									"Otimização contínua",
									"Suporte técnico especializado",
									"Relatórios de evolução"
								],
								duration: "Ongoing",
								color: "from-orange-500 to-red-500"
							}
						].map((phase, index) => {
							const IconComponent = phase.icon;
							return (
								<motion.div
									key={phase.phase}
									className="group relative"
									initial={{ opacity: 0, y: 50 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.8, delay: index * 0.1 }}
									viewport={{ once: true }}
									whileHover={{ y: -10, scale: 1.02 }}
								>
									<div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 h-full transition-all duration-500 group-hover:border-white/20 group-hover:bg-white/10">
										<div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${phase.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
										
										<motion.div
											className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${phase.color} mb-6`}
											whileHover={{ 
												scale: 1.2, 
												rotate: 360,
												boxShadow: "0 0 30px rgba(6, 182, 212, 0.3)"
											}}
											transition={{ duration: 0.4, ease: "easeOut" }}
										>
											<IconComponent className="w-8 h-8 text-white" />
										</motion.div>

										<div className="relative z-10">
											<div className="flex justify-between items-start mb-4">
												<h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
													{phase.phase}
												</h3>
												<span className="text-cyan-400 font-bold text-sm bg-cyan-500/20 px-2 py-1 rounded-full">
													{phase.duration}
												</span>
											</div>
											
											<p className="text-gray-300 mb-6 leading-relaxed">
												{phase.description}
											</p>

											<div className="space-y-3">
												<h4 className="text-sm font-semibold text-gray-400">Atividades:</h4>
												<ul className="space-y-2">
													{phase.activities.map((activity, activityIndex) => (
														<motion.li
															key={activity}
															className="flex items-start gap-2 text-gray-300 text-sm"
															initial={{ opacity: 0, x: -20 }}
															whileInView={{ opacity: 1, x: 0 }}
															transition={{ duration: 0.5, delay: activityIndex * 0.1 }}
															viewport={{ once: true }}
														>
															<CheckCircle className="w-3 h-3 text-cyan-400 mt-0.5 flex-shrink-0" />
															<span>{activity}</span>
														</motion.li>
													))}
												</ul>
											</div>
										</div>

										<div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${phase.color} blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
									</div>
								</motion.div>
							);
						})}
					</div>
				</div>
			</section>

			{/* Technology Expertise */}
			<section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
				<div className="max-w-7xl mx-auto">
					<motion.h2
						className="text-5xl sm:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						viewport={{ once: true }}
					>
						Expertise Tecnológica
					</motion.h2>

					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
						{/* Enterprise Solutions */}
						<motion.div
							className="space-y-6"
							initial={{ opacity: 0, x: -50 }}
							whileInView={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.8 }}
							viewport={{ once: true }}
						>
							<div className="flex items-center gap-4 mb-8">
								<motion.div
									className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500"
									animate={{
										scale: [1, 1.1, 1],
										boxShadow: [
											"0 0 20px rgba(6, 182, 212, 0.4)",
											"0 0 40px rgba(147, 51, 234, 0.7)",
											"0 0 20px rgba(6, 182, 212, 0.4)",
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
								<h3 className="text-3xl font-bold text-white">Soluções Enterprise</h3>
							</div>

							<div className="space-y-4">
								{[
									{ solution: "ERP & CRM", technologies: ["SAP", "Oracle", "Salesforce", "Microsoft Dynamics"], expertise: "95%" },
									{ solution: "Cloud Migration", technologies: ["AWS", "Azure", "Google Cloud", "Hybrid Cloud"], expertise: "98%" },
									{ solution: "Data Analytics", technologies: ["Power BI", "Tableau", "Qlik", "Apache Spark"], expertise: "92%" },
									{ solution: "DevOps & CI/CD", technologies: ["Jenkins", "GitLab", "Docker", "Kubernetes"], expertise: "96%" },
									{ solution: "Microservices", technologies: ["Spring Boot", "Node.js", "API Gateway", "Service Mesh"], expertise: "94%" },
									{ solution: "Security & Compliance", technologies: ["ISO 27001", "LGPD", "PCI DSS", "Zero Trust"], expertise: "97%" }
								].map((item, index) => (
									<motion.div
										key={item.solution}
										className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm"
										initial={{ opacity: 0, y: 20 }}
										whileInView={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.5, delay: index * 0.1 }}
										viewport={{ once: true }}
									>
										<div className="flex justify-between items-start mb-2">
											<h4 className="font-semibold text-white">{item.solution}</h4>
											<span className="text-cyan-400 font-bold">{item.expertise}</span>
										</div>
										<p className="text-gray-300 text-sm mb-3">{item.technologies.join(", ")}</p>
										<div className="w-full bg-gray-700 rounded-full h-2">
											<motion.div
												className="bg-gradient-to-r from-cyan-500 to-purple-500 h-2 rounded-full"
												initial={{ width: 0 }}
												whileInView={{ width: item.expertise }}
												transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
												viewport={{ once: true }}
											/>
										</div>
									</motion.div>
								))}
							</div>
						</motion.div>

						{/* Digital Transformation */}
						<motion.div
							className="space-y-6"
							initial={{ opacity: 0, x: 50 }}
							whileInView={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.8 }}
							viewport={{ once: true }}
						>
							<div className="flex items-center gap-4 mb-8">
								<motion.div
									className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
									animate={{
										scale: [1, 1.1, 1],
										boxShadow: [
											"0 0 20px rgba(147, 51, 234, 0.4)",
											"0 0 40px rgba(236, 72, 153, 0.7)",
											"0 0 20px rgba(147, 51, 234, 0.4)",
										],
									}}
									transition={{
										duration: 2,
										repeat: Infinity,
										ease: "easeInOut",
									}}
								>
									<Sparkles className="w-8 h-8 text-white" />
								</motion.div>
								<h3 className="text-3xl font-bold text-white">Transformação Digital</h3>
							</div>

							<div className="space-y-4">
								{[
									{ solution: "Inteligência Artificial", technologies: ["Machine Learning", "NLP", "Computer Vision", "RPA"], expertise: "89%" },
									{ solution: "IoT & Edge Computing", technologies: ["Sensors", "Edge Analytics", "MQTT", "Time Series DB"], expertise: "87%" },
									{ solution: "Blockchain", technologies: ["Smart Contracts", "DeFi", "NFTs", "Web3"], expertise: "85%" },
									{ solution: "Mobile First", technologies: ["React Native", "Flutter", "Progressive Web Apps", "Cross-platform"], expertise: "96%" },
									{ solution: "API Economy", technologies: ["RESTful APIs", "GraphQL", "API Gateway", "Rate Limiting"], expertise: "98%" },
									{ solution: "Low-Code/No-Code", technologies: ["OutSystems", "Mendix", "Power Platform", "Bubble"], expertise: "91%" }
								].map((item, index) => (
									<motion.div
										key={item.solution}
										className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm"
										initial={{ opacity: 0, y: 20 }}
										whileInView={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.5, delay: index * 0.1 }}
										viewport={{ once: true }}
									>
										<div className="flex justify-between items-start mb-2">
											<h4 className="font-semibold text-white">{item.solution}</h4>
											<span className="text-purple-400 font-bold">{item.expertise}</span>
										</div>
										<p className="text-gray-300 text-sm mb-3">{item.technologies.join(", ")}</p>
										<div className="w-full bg-gray-700 rounded-full h-2">
											<motion.div
												className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
												initial={{ width: 0 }}
												whileInView={{ width: item.expertise }}
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

			{/* Carrossel Futurista - Cases de Consultoria */}
			<section className="relative z-10 py-24 sm:py-32 lg:py-40 px-4 sm:px-6 lg:px-8 overflow-hidden">
				{/* Background Principal */}
				<div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />

				<div className="max-w-8xl mx-auto relative z-10">
					{/* Header Futurista */}
					<motion.div
						className="text-center mb-20 sm:mb-24 lg:mb-32"
						initial={{ opacity: 0, y: 50 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 1, ease: "easeOut" }}
						viewport={{ once: true }}
					>
						<motion.div
							className="inline-block mb-6"
							initial={{ scale: 0 }}
							whileInView={{ scale: 1 }}
							transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 200 }}
							viewport={{ once: true }}
						>
							<span className="text-cyan-400 text-sm font-bold tracking-widest uppercase">CASES DE SUCESSO</span>
						</motion.div>
						
						<h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-6 sm:mb-8 bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent leading-none tracking-tight">
							TRANSFORMAÇÕES
						</h2>
						
						<p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light">
							Resultados excepcionais através da{" "}
							<span className="text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text font-semibold">
								inteligência tecnológica
							</span>
						</p>
					</motion.div>

					{/* Carrossel Container Futurista */}
					<div className="relative">
						{/* Controles Futuristas */}
						<motion.button
							onClick={prevSlide}
							className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-xl border border-cyan-400/30 rounded-xl flex items-center justify-center text-cyan-400 hover:bg-cyan-500/30 hover:border-cyan-400/50 transition-all duration-500 group shadow-lg"
							whileHover={{ scale: 1.05, x: -2 }}
							whileTap={{ scale: 0.95 }}
						>
							<ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-0.5 transition-transform duration-300" />
						</motion.button>

						<motion.button
							onClick={nextSlide}
							className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-xl border border-cyan-400/30 rounded-xl flex items-center justify-center text-cyan-400 hover:bg-cyan-500/30 hover:border-cyan-400/50 transition-all duration-500 group shadow-lg"
							whileHover={{ scale: 1.05, x: 2 }}
							whileTap={{ scale: 0.95 }}
						>
							<ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-0.5 transition-transform duration-300" />
						</motion.button>

						{/* Auto-play Toggle Futurista */}
						<button
							onClick={() => setIsAutoPlaying(!isAutoPlaying)}
							className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-xl border border-purple-400/30 rounded-lg flex items-center justify-center text-purple-400 hover:bg-purple-500/30 hover:border-purple-400/50 transition-all duration-500 shadow-md"
						>
							{isAutoPlaying ? <Pause className="w-3 h-3 sm:w-4 sm:h-4" /> : <Play className="w-3 h-3 sm:w-4 sm:h-4" />}
						</button>

						{/* Slides Container Futurista */}
						<div 
							ref={carouselRef}
							className="relative h-[400px] sm:h-[500px] lg:h-[600px] overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 shadow-xl"
						>
							{caseStudies.map((caseStudy, index) => {
								const IconComponent = caseStudy.icon;
								const isActive = index === currentSlide;
								
								// Backgrounds únicos para cada slide
								const slideBackgrounds = [
									// Slide 1 - Farmacêutica (Azul/Cyan)
									{
										gradient: "from-blue-900/90 via-cyan-900/80 to-blue-800/90",
										particles: "bg-cyan-400",
										lines: "from-cyan-400/40 to-blue-400/40",
										accent: "cyan-400",
										accentClasses: {
											bg: "bg-cyan-400",
											text: "text-cyan-400",
											border: "border-cyan-400",
											from: "from-cyan-400",
											to: "to-cyan-400",
											shadow: "shadow-cyan-400"
										}
									},
									// Slide 2 - Supermercados (Roxo/Rosa)
									{
										gradient: "from-purple-900/90 via-pink-900/80 to-purple-800/90",
										particles: "bg-purple-400",
										lines: "from-purple-400/40 to-pink-400/40",
										accent: "purple-400",
										accentClasses: {
											bg: "bg-purple-400",
											text: "text-purple-400",
											border: "border-purple-400",
											from: "from-purple-400",
											to: "to-purple-400",
											shadow: "shadow-purple-400"
										}
									},
									// Slide 3 - Banco (Verde/Esmeralda)
									{
										gradient: "from-green-900/90 via-emerald-900/80 to-green-800/90",
										particles: "bg-emerald-400",
										lines: "from-emerald-400/40 to-green-400/40",
										accent: "emerald-400",
										accentClasses: {
											bg: "bg-emerald-400",
											text: "text-emerald-400",
											border: "border-emerald-400",
											from: "from-emerald-400",
											to: "to-emerald-400",
											shadow: "shadow-emerald-400"
										}
									},
									// Slide 4 - Construtora (Laranja/Vermelho)
									{
										gradient: "from-orange-900/90 via-red-900/80 to-orange-800/90",
										particles: "bg-orange-400",
										lines: "from-orange-400/40 to-red-400/40",
										accent: "orange-400",
										accentClasses: {
											bg: "bg-orange-400",
											text: "text-orange-400",
											border: "border-orange-400",
											from: "from-orange-400",
											to: "to-orange-400",
											shadow: "shadow-orange-400"
										}
									},
									// Slide 5 - Hospital (Cyan/Azul)
									{
										gradient: "from-cyan-900/90 via-blue-900/80 to-cyan-800/90",
										particles: "bg-cyan-400",
										lines: "from-cyan-400/40 to-blue-400/40",
										accent: "cyan-400",
										accentClasses: {
											bg: "bg-cyan-400",
											text: "text-cyan-400",
											border: "border-cyan-400",
											from: "from-cyan-400",
											to: "to-cyan-400",
											shadow: "shadow-cyan-400"
										}
									},
									// Slide 6 - Combustíveis (Amarelo/Laranja)
									{
										gradient: "from-yellow-900/90 via-orange-900/80 to-yellow-800/90",
										particles: "bg-yellow-400",
										lines: "from-yellow-400/40 to-orange-400/40",
										accent: "yellow-400",
										accentClasses: {
											bg: "bg-yellow-400",
											text: "text-yellow-400",
											border: "border-yellow-400",
											from: "from-yellow-400",
											to: "to-yellow-400",
											shadow: "shadow-yellow-400"
										}
									}
								];
								
								const bg = slideBackgrounds[index] || slideBackgrounds[0];
								
								return (
									<motion.div
										key={caseStudy.company}
										className={`absolute inset-0 transition-all duration-1000 ${
											isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
										}`}
										initial={{ opacity: 0, scale: 0.9, y: 50 }}
										animate={{ 
											opacity: isActive ? 1 : 0,
											scale: isActive ? 1 : 0.9,
											y: isActive ? 0 : 50
										}}
										transition={{ duration: 1, ease: "easeInOut" }}
									>
										{/* Background Futurista Único */}
										<div className={`absolute inset-0 bg-gradient-to-br ${bg.gradient} backdrop-blur-sm`}>
											{/* Partículas Animadas Únicas */}
											{Array.from({ length: 30 }).map((_, i) => (
												<motion.div
													key={i}
													className={`absolute w-1 h-1 ${bg.particles} rounded-full`}
													style={{
														left: `${Math.random() * 100}%`,
														top: `${Math.random() * 100}%`,
													}}
													animate={{
														opacity: [0, 1, 0],
														scale: [0, 1, 0],
														y: [0, -200, 0],
														x: [0, Math.random() * 100 - 50, 0],
													}}
													transition={{
														duration: 4 + Math.random() * 3,
														repeat: Infinity,
														delay: Math.random() * 4,
													}}
												/>
											))}
											
											{/* Linhas de Energia Únicas */}
											{Array.from({ length: 12 }).map((_, i) => (
												<motion.div
													key={i}
													className={`absolute h-px bg-gradient-to-r from-transparent via-${bg.accent}/30 to-transparent`}
													style={{
														left: `${Math.random() * 100}%`,
														top: `${Math.random() * 100}%`,
														width: `${300 + Math.random() * 500}px`,
														transform: `rotate(${Math.random() * 360}deg)`,
													}}
													animate={{
														opacity: [0, 1, 0],
														scaleX: [0, 1, 0],
													}}
													transition={{
														duration: 5 + Math.random() * 3,
														repeat: Infinity,
														delay: Math.random() * 5,
													}}
												/>
											))}
											
											{/* Padrões Geométricos */}
											<div className="absolute inset-0 opacity-10">
												{Array.from({ length: 8 }).map((_, i) => (
													<motion.div
														key={i}
														className={`absolute w-32 h-32 border border-${bg.accent}/20 rounded-full`}
														style={{
															left: `${Math.random() * 100}%`,
															top: `${Math.random() * 100}%`,
														}}
														animate={{
															scale: [1, 1.5, 1],
															opacity: [0.1, 0.3, 0.1],
															rotate: [0, 360],
														}}
														transition={{
															duration: 8 + Math.random() * 4,
															repeat: Infinity,
															delay: Math.random() * 6,
														}}
													/>
												))}
											</div>
										</div>

										{/* Conteúdo Futurista */}
										<div className="relative z-10 h-full flex flex-col lg:flex-row">
											{/* Lado Esquerdo - Informações Principais */}
											<div className="flex-1 p-4 sm:p-6 lg:p-8 flex flex-col justify-center">
												<motion.div
													className="space-y-4 sm:space-y-6"
													initial={{ opacity: 0, x: -50 }}
													animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -50 }}
													transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
												>
													{/* Header Futurista */}
													<div className="space-y-3">
														<div className="flex items-center gap-4">
															<div className={`w-12 h-12 sm:w-16 sm:h-16 backdrop-blur-xl rounded-2xl flex items-center justify-center text-2xl sm:text-3xl shadow-lg ${
																index === 0 ? 'bg-gradient-to-br from-cyan-400/20 to-cyan-400/10 border border-cyan-400/30' :
																index === 1 ? 'bg-gradient-to-br from-purple-400/20 to-purple-400/10 border border-purple-400/30' :
																index === 2 ? 'bg-gradient-to-br from-emerald-400/20 to-emerald-400/10 border border-emerald-400/30' :
																index === 3 ? 'bg-gradient-to-br from-orange-400/20 to-orange-400/10 border border-orange-400/30' :
																index === 4 ? 'bg-gradient-to-br from-cyan-400/20 to-cyan-400/10 border border-cyan-400/30' :
																'bg-gradient-to-br from-yellow-400/20 to-yellow-400/10 border border-yellow-400/30'
															}`}>
																{caseStudy.image}
															</div>
															<div className="space-y-1">
																<h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white leading-tight tracking-tight">
																	{caseStudy.company}
																</h3>
																<div className={`inline-block px-3 py-1 backdrop-blur-xl rounded-full ${
																	index === 0 ? 'bg-cyan-400/20 border border-cyan-400/30' :
																	index === 1 ? 'bg-purple-400/20 border border-purple-400/30' :
																	index === 2 ? 'bg-emerald-400/20 border border-emerald-400/30' :
																	index === 3 ? 'bg-orange-400/20 border border-orange-400/30' :
																	index === 4 ? 'bg-cyan-400/20 border border-cyan-400/30' :
																	'bg-yellow-400/20 border border-yellow-400/30'
																}`}>
																	<span className={`text-xs font-bold tracking-wider uppercase ${
																		index === 0 ? 'text-cyan-400' :
																		index === 1 ? 'text-purple-400' :
																		index === 2 ? 'text-emerald-400' :
																		index === 3 ? 'text-orange-400' :
																		index === 4 ? 'text-cyan-400' :
																		'text-yellow-400'
																	}`}>
																		{caseStudy.industry}
																	</span>
																</div>
															</div>
														</div>
													</div>

													{/* Conteúdo Principal */}
													<div className="space-y-4">
														{/* Desafio */}
														<div className="space-y-2">
															<div className="flex items-center gap-3">
																<div className={`w-8 h-8 backdrop-blur-xl rounded-xl flex items-center justify-center ${
																	index === 0 ? 'bg-gradient-to-br from-cyan-400/20 to-cyan-400/10 border border-cyan-400/30' :
																	index === 1 ? 'bg-gradient-to-br from-purple-400/20 to-purple-400/10 border border-purple-400/30' :
																	index === 2 ? 'bg-gradient-to-br from-emerald-400/20 to-emerald-400/10 border border-emerald-400/30' :
																	index === 3 ? 'bg-gradient-to-br from-orange-400/20 to-orange-400/10 border border-orange-400/30' :
																	index === 4 ? 'bg-gradient-to-br from-cyan-400/20 to-cyan-400/10 border border-cyan-400/30' :
																	'bg-gradient-to-br from-yellow-400/20 to-yellow-400/10 border border-yellow-400/30'
																}`}>
																	<IconComponent className={`w-4 h-4 ${
																		index === 0 ? 'text-cyan-400' :
																		index === 1 ? 'text-purple-400' :
																		index === 2 ? 'text-emerald-400' :
																		index === 3 ? 'text-orange-400' :
																		index === 4 ? 'text-cyan-400' :
																		'text-yellow-400'
																	}`} />
																</div>
																<h4 className="text-sm sm:text-base font-bold text-white tracking-wide">
																	DESAFIO
																</h4>
															</div>
															<p className="text-gray-200 text-sm sm:text-base leading-relaxed font-light pl-11">
																{caseStudy.challenge}
															</p>
														</div>

														{/* Solução */}
														<div className="space-y-2">
															<div className="flex items-center gap-3">
																<div className={`w-8 h-8 backdrop-blur-xl rounded-xl flex items-center justify-center ${
																	index === 0 ? 'bg-gradient-to-br from-cyan-400/20 to-cyan-400/10 border border-cyan-400/30' :
																	index === 1 ? 'bg-gradient-to-br from-purple-400/20 to-purple-400/10 border border-purple-400/30' :
																	index === 2 ? 'bg-gradient-to-br from-emerald-400/20 to-emerald-400/10 border border-emerald-400/30' :
																	index === 3 ? 'bg-gradient-to-br from-orange-400/20 to-orange-400/10 border border-orange-400/30' :
																	index === 4 ? 'bg-gradient-to-br from-cyan-400/20 to-cyan-400/10 border border-cyan-400/30' :
																	'bg-gradient-to-br from-yellow-400/20 to-yellow-400/10 border border-yellow-400/30'
																}`}>
																	<Lightbulb className={`w-4 h-4 ${
																		index === 0 ? 'text-cyan-400' :
																		index === 1 ? 'text-purple-400' :
																		index === 2 ? 'text-emerald-400' :
																		index === 3 ? 'text-orange-400' :
																		index === 4 ? 'text-cyan-400' :
																		'text-yellow-400'
																	}`} />
																</div>
																<h4 className="text-sm sm:text-base font-bold text-white tracking-wide">
																	SOLUÇÃO
																</h4>
															</div>
															<p className="text-gray-200 text-sm sm:text-base leading-relaxed font-light pl-11">
																{caseStudy.solution}
															</p>
														</div>
													</div>
												</motion.div>
											</div>

											{/* Lado Direito - Resultados e Tecnologias Futuristas */}
											<div className="flex-1 p-4 sm:p-6 lg:p-8">
												<motion.div
													className="h-full flex flex-col justify-center space-y-6 sm:space-y-8"
													initial={{ opacity: 0, x: 50 }}
													animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : 50 }}
													transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
												>
													{/* Resultados Futuristas */}
													<div className="space-y-4">
														<div className="flex items-center gap-3">
															<div className={`w-8 h-8 backdrop-blur-xl rounded-xl flex items-center justify-center ${
																index === 0 ? 'bg-gradient-to-br from-cyan-400/20 to-cyan-400/10 border border-cyan-400/30' :
																index === 1 ? 'bg-gradient-to-br from-purple-400/20 to-purple-400/10 border border-purple-400/30' :
																index === 2 ? 'bg-gradient-to-br from-emerald-400/20 to-emerald-400/10 border border-emerald-400/30' :
																index === 3 ? 'bg-gradient-to-br from-orange-400/20 to-orange-400/10 border border-orange-400/30' :
																index === 4 ? 'bg-gradient-to-br from-cyan-400/20 to-cyan-400/10 border border-cyan-400/30' :
																'bg-gradient-to-br from-yellow-400/20 to-yellow-400/10 border border-yellow-400/30'
															}`}>
																<TrendingUp className={`w-4 h-4 ${
																	index === 0 ? 'text-cyan-400' :
																	index === 1 ? 'text-purple-400' :
																	index === 2 ? 'text-emerald-400' :
																	index === 3 ? 'text-orange-400' :
																	index === 4 ? 'text-cyan-400' :
																	'text-yellow-400'
																}`} />
															</div>
															<h4 className="text-sm sm:text-base font-bold text-white tracking-wide">
																RESULTADOS
															</h4>
														</div>
														
														<div className="grid grid-cols-1 gap-2 sm:gap-3">
															{caseStudy.results.map((result, resultIndex) => (
																<motion.div
																	key={result}
																	className={`group relative p-3 backdrop-blur-xl rounded-xl transition-all duration-300 hover:shadow-lg ${
																		index === 0 ? 'bg-gradient-to-br from-cyan-400/10 to-cyan-400/5 border border-cyan-400/20 hover:border-cyan-400/40' :
																		index === 1 ? 'bg-gradient-to-br from-purple-400/10 to-purple-400/5 border border-purple-400/20 hover:border-purple-400/40' :
																		index === 2 ? 'bg-gradient-to-br from-emerald-400/10 to-emerald-400/5 border border-emerald-400/20 hover:border-emerald-400/40' :
																		index === 3 ? 'bg-gradient-to-br from-orange-400/10 to-orange-400/5 border border-orange-400/20 hover:border-orange-400/40' :
																		index === 4 ? 'bg-gradient-to-br from-cyan-400/10 to-cyan-400/5 border border-cyan-400/20 hover:border-cyan-400/40' :
																		'bg-gradient-to-br from-yellow-400/10 to-yellow-400/5 border border-yellow-400/20 hover:border-yellow-400/40'
																	}`}
																	initial={{ opacity: 0, y: 20, scale: 0.95 }}
																	animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20, scale: isActive ? 1 : 0.95 }}
																	transition={{ duration: 0.4, delay: 0.4 + resultIndex * 0.1, ease: "easeOut" }}
																	whileHover={{ y: -2, scale: 1.01 }}
																>
																	<div className="flex items-start gap-3">
																		<div className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${
																			index === 0 ? 'bg-cyan-400/20' :
																			index === 1 ? 'bg-purple-400/20' :
																			index === 2 ? 'bg-emerald-400/20' :
																			index === 3 ? 'bg-orange-400/20' :
																			index === 4 ? 'bg-cyan-400/20' :
																			'bg-yellow-400/20'
																		}`}>
																			<CheckCircle className={`w-3 h-3 ${
																				index === 0 ? 'text-cyan-400' :
																				index === 1 ? 'text-purple-400' :
																				index === 2 ? 'text-emerald-400' :
																				index === 3 ? 'text-orange-400' :
																				index === 4 ? 'text-cyan-400' :
																				'text-yellow-400'
																			}`} />
																		</div>
																		<span className="text-gray-200 text-xs sm:text-sm font-medium leading-relaxed group-hover:text-white transition-colors duration-300">
																			{result}
																		</span>
																	</div>
																</motion.div>
															))}
														</div>
													</div>

													{/* Tecnologias Futuristas */}
													<div className="space-y-4">
														<div className="flex items-center gap-3">
															<div className={`w-8 h-8 backdrop-blur-xl rounded-xl flex items-center justify-center ${
																index === 0 ? 'bg-gradient-to-br from-cyan-400/20 to-cyan-400/10 border border-cyan-400/30' :
																index === 1 ? 'bg-gradient-to-br from-purple-400/20 to-purple-400/10 border border-purple-400/30' :
																index === 2 ? 'bg-gradient-to-br from-emerald-400/20 to-emerald-400/10 border border-emerald-400/30' :
																index === 3 ? 'bg-gradient-to-br from-orange-400/20 to-orange-400/10 border border-orange-400/30' :
																index === 4 ? 'bg-gradient-to-br from-cyan-400/20 to-cyan-400/10 border border-cyan-400/30' :
																'bg-gradient-to-br from-yellow-400/20 to-yellow-400/10 border border-yellow-400/30'
															}`}>
																<Code className={`w-4 h-4 ${
																	index === 0 ? 'text-cyan-400' :
																	index === 1 ? 'text-purple-400' :
																	index === 2 ? 'text-emerald-400' :
																	index === 3 ? 'text-orange-400' :
																	index === 4 ? 'text-cyan-400' :
																	'text-yellow-400'
																}`} />
															</div>
															<h4 className="text-sm sm:text-base font-bold text-white tracking-wide">
																TECNOLOGIAS
															</h4>
														</div>
														
														<div className="flex flex-wrap gap-2 sm:gap-3">
															{caseStudy.technologies.map((tech, techIndex) => (
																<motion.span
																	key={tech}
																	className={`group relative px-3 py-2 backdrop-blur-xl rounded-xl text-xs sm:text-sm text-white transition-all duration-300 hover:shadow-md cursor-pointer ${
																		index === 0 ? 'bg-gradient-to-r from-cyan-400/20 to-cyan-400/10 border border-cyan-400/30 hover:border-cyan-400/50' :
																		index === 1 ? 'bg-gradient-to-r from-purple-400/20 to-purple-400/10 border border-purple-400/30 hover:border-purple-400/50' :
																		index === 2 ? 'bg-gradient-to-r from-emerald-400/20 to-emerald-400/10 border border-emerald-400/30 hover:border-emerald-400/50' :
																		index === 3 ? 'bg-gradient-to-r from-orange-400/20 to-orange-400/10 border border-orange-400/30 hover:border-orange-400/50' :
																		index === 4 ? 'bg-gradient-to-r from-cyan-400/20 to-cyan-400/10 border border-cyan-400/30 hover:border-cyan-400/50' :
																		'bg-gradient-to-r from-yellow-400/20 to-yellow-400/10 border border-yellow-400/30 hover:border-yellow-400/50'
																	}`}
																	initial={{ opacity: 0, scale: 0.9, y: 10 }}
																	animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.9, y: isActive ? 0 : 10 }}
																	transition={{ duration: 0.3, delay: 0.5 + techIndex * 0.05, ease: "easeOut" }}
																	whileHover={{ scale: 1.02, y: -1 }}
																	whileTap={{ scale: 0.98 }}
																>
																	<span className="font-medium tracking-wide">{tech}</span>
																	<div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
																		index === 0 ? 'bg-gradient-to-r from-cyan-400/20 to-cyan-400/10' :
																		index === 1 ? 'bg-gradient-to-r from-purple-400/20 to-purple-400/10' :
																		index === 2 ? 'bg-gradient-to-r from-emerald-400/20 to-emerald-400/10' :
																		index === 3 ? 'bg-gradient-to-r from-orange-400/20 to-orange-400/10' :
																		index === 4 ? 'bg-gradient-to-r from-cyan-400/20 to-cyan-400/10' :
																		'bg-gradient-to-r from-yellow-400/20 to-yellow-400/10'
																	}`} />
																</motion.span>
															))}
														</div>
													</div>
												</motion.div>
											</div>
								</div>
							</motion.div>
								);
							})}
						</div>

						{/* Indicadores Futuristas */}
						<div className="flex justify-center mt-6 sm:mt-8 gap-3 sm:gap-4">
							{caseStudies.map((_, index) => (
								<motion.button
									key={index}
									onClick={() => goToSlide(index)}
									className={`group relative w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-300 ${
										index === currentSlide 
											? 'bg-gradient-to-r from-cyan-400 to-purple-400 scale-125 shadow-md shadow-cyan-400/30' 
											: 'bg-white/20 hover:bg-white/40 border border-white/30'
									}`}
									whileHover={{ scale: 1.1 }}
									whileTap={{ scale: 0.95 }}
								>
									{index === currentSlide && (
										<motion.div
											className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400"
											animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
											transition={{ duration: 1.5, repeat: Infinity }}
										/>
									)}
								</motion.button>
							))}
						</div>

						{/* Contador e Status Futurista */}
						<div className="text-center mt-4 sm:mt-6 space-y-1">
							<div className="flex items-center justify-center gap-3">
								<span className="text-cyan-400 text-xs sm:text-sm font-bold tracking-wider uppercase">
									{currentSlide + 1} / {caseStudies.length}
								</span>
								<div className="w-6 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
								<span className="text-gray-400 text-xs sm:text-sm font-medium">
									{isAutoPlaying ? 'AUTO' : 'MANUAL'}
								</span>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Consulting Framework Section */}
			<section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
				<div className="max-w-7xl mx-auto">
					<motion.h2
						className="text-5xl sm:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						viewport={{ once: true }}
					>
						Framework de Consultoria
					</motion.h2>

					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
						{/* Methodology Cards */}
						<motion.div
							className="space-y-6"
							initial={{ opacity: 0, x: -50 }}
							whileInView={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.8 }}
							viewport={{ once: true }}
						>
							{[
								{
									framework: "COBIT 2019",
									description: "Governança e gestão de TI empresarial",
									applications: ["Auditoria de TI", "Gestão de Riscos", "Compliance", "Métricas de Performance"],
									icon: Shield,
									color: "from-blue-500 to-cyan-500"
								},
								{
									framework: "ITIL 4",
									description: "Gestão de serviços de TI",
									applications: ["Service Desk", "Change Management", "Incident Management", "Service Level Management"],
									icon: Settings,
									color: "from-green-500 to-emerald-500"
								},
								{
									framework: "TOGAF",
									description: "Arquitetura empresarial",
									applications: ["Enterprise Architecture", "Digital Transformation", "Technology Planning", "Solution Design"],
									icon: Building,
									color: "from-purple-500 to-pink-500"
								},
								{
									framework: "Agile/Scrum",
									description: "Metodologias ágeis de desenvolvimento",
									applications: ["Sprint Planning", "Daily Standups", "Retrospectives", "Continuous Improvement"],
									icon: GitBranch,
									color: "from-orange-500 to-red-500"
								}
							].map((methodology, index) => {
								const IconComponent = methodology.icon;
								return (
									<motion.div
										key={methodology.framework}
										className="group relative"
										initial={{ opacity: 0, y: 20 }}
										whileInView={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.5, delay: index * 0.1 }}
										viewport={{ once: true }}
										whileHover={{ y: -5, scale: 1.02 }}
									>
										<div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 transition-all duration-500 group-hover:border-white/20 group-hover:bg-white/10">
											<div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${methodology.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
											
											<div className="relative z-10">
												<div className="flex items-center gap-4 mb-4">
													<motion.div
														className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r ${methodology.color}`}
														whileHover={{ scale: 1.1, rotate: 5 }}
														transition={{ duration: 0.3 }}
													>
														<IconComponent className="w-6 h-6 text-white" />
													</motion.div>
													<div>
														<h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
															{methodology.framework}
														</h3>
														<p className="text-gray-300 text-sm">{methodology.description}</p>
													</div>
												</div>
												
												<div className="space-y-2">
													<h4 className="text-sm font-semibold text-gray-400">Aplicações:</h4>
													<div className="flex flex-wrap gap-2">
														{methodology.applications.map((app, appIndex) => (
															<motion.span
																key={app}
																className="px-3 py-1 bg-white/10 rounded-full text-xs text-gray-300 border border-white/20"
																initial={{ opacity: 0, scale: 0.8 }}
																whileInView={{ opacity: 1, scale: 1 }}
																transition={{ duration: 0.3, delay: appIndex * 0.1 }}
																viewport={{ once: true }}
															>
																{app}
															</motion.span>
														))}
													</div>
												</div>
											</div>

											<div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${methodology.color} blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
										</div>
									</motion.div>
								);
							})}
						</motion.div>

						{/* Process Visualization */}
						<motion.div
							className="space-y-6"
							initial={{ opacity: 0, x: 50 }}
							whileInView={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.8 }}
							viewport={{ once: true }}
						>
							<div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8">
								<h3 className="text-2xl font-bold text-white mb-8 text-center">Processo de Consultoria</h3>
								
								<div className="space-y-6">
									{[
										{ step: "1", title: "Descoberta", description: "Análise profunda do ambiente atual", icon: Search, color: "from-blue-500 to-cyan-500" },
										{ step: "2", title: "Diagnóstico", description: "Identificação de oportunidades e riscos", icon: Target, color: "from-purple-500 to-pink-500" },
										{ step: "3", title: "Estratégia", description: "Definição de roadmap e prioridades", icon: Compass, color: "from-green-500 to-emerald-500" },
										{ step: "4", title: "Execução", description: "Implementação com acompanhamento", icon: Rocket, color: "from-orange-500 to-red-500" },
										{ step: "5", title: "Otimização", description: "Melhoria contínua e resultados", icon: TrendingUp, color: "from-indigo-500 to-purple-500" }
									].map((process, index) => {
										const IconComponent = process.icon;
										return (
											<motion.div
												key={process.step}
												className="flex items-center gap-4"
												initial={{ opacity: 0, x: 20 }}
												whileInView={{ opacity: 1, x: 0 }}
												transition={{ duration: 0.5, delay: index * 0.1 }}
												viewport={{ once: true }}
											>
												<motion.div
													className={`flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r ${process.color} text-white font-bold text-lg`}
													whileHover={{ scale: 1.1, rotate: 5 }}
													transition={{ duration: 0.3 }}
												>
													<IconComponent className="w-6 h-6" />
												</motion.div>
												
												<div className="flex-1">
													<h4 className="text-lg font-semibold text-white">{process.title}</h4>
													<p className="text-gray-300 text-sm">{process.description}</p>
												</div>
												
												{index < 4 && (
													<motion.div
														className="hidden lg:block w-8 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-500"
														initial={{ scaleX: 0 }}
														whileInView={{ scaleX: 1 }}
														transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
														viewport={{ once: true }}
													/>
												)}
											</motion.div>
										);
									})}
								</div>
							</div>
						</motion.div>
					</div>
				</div>
			</section>

			{/* Specialization Areas Section */}
			<section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
				<div className="max-w-7xl mx-auto">
					<motion.h2
						className="text-5xl sm:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						viewport={{ once: true }}
					>
						Parceiros em Transformação Digital
					</motion.h2>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{[
							{
								area: "Transformação Digital",
								description: "Modernização completa de processos e tecnologias",
								services: [
									"Digitalização de processos",
									"Automação inteligente (RPA)",
									"Migração para cloud",
									"Implementação de IA/ML",
									"Estratégia de dados"
								],
								icon: Sparkles,
								gradient: "from-cyan-500/20 to-blue-500/20",
								border: "border-cyan-500/30",
								iconBg: "from-cyan-500 to-blue-500",
								textAccent: "text-cyan-400",
								projects: "150+"
							},
							{
								area: "Arquitetura de Software",
								description: "Design e implementação de arquiteturas escaláveis",
								services: [
									"Microserviços",
									"API Gateway",
									"Event-driven architecture",
									"Cloud-native solutions",
									"Performance optimization"
								],
								icon: Layers,
								gradient: "from-purple-500/20 to-pink-500/20",
								border: "border-purple-500/30",
								iconBg: "from-purple-500 to-pink-500",
								textAccent: "text-purple-400",
								projects: "120+"
							},
							{
												area: "Governança de Dados",
												description: "Estruturação e gestão de dados corporativos",
												services: [
													"Data governance",
													"Data quality",
													"Privacy compliance (LGPD)",
													"Business intelligence",
													"Data analytics"
												],
												icon: Database,
												gradient: "from-emerald-500/20 to-green-500/20",
												border: "border-emerald-500/30",
												iconBg: "from-emerald-500 to-green-500",
												textAccent: "text-emerald-400",
												projects: "80+"
											},
							{
												area: "Segurança Cibernética",
												description: "Proteção e compliance em segurança digital",
												services: [
													"Security assessment",
													"Compliance (ISO 27001)",
													"Zero trust architecture",
													"Incident response",
													"Security training"
												],
												icon: ShieldCheck,
												gradient: "from-rose-500/20 to-red-500/20",
												border: "border-rose-500/30",
												iconBg: "from-rose-500 to-red-500",
												textAccent: "text-rose-400",
												projects: "90+"
											},
							{
												area: "DevOps & SRE",
												description: "Automação e confiabilidade de sistemas",
												services: [
													"CI/CD pipelines",
													"Infrastructure as Code",
													"Monitoring & alerting",
													"Site reliability engineering",
													"Performance tuning"
												],
												icon: Workflow,
												gradient: "from-indigo-500/20 to-purple-500/20",
												border: "border-indigo-500/30",
												iconBg: "from-indigo-500 to-purple-500",
												textAccent: "text-indigo-400",
												projects: "110+"
											},
							{
												area: "Estratégia de TI",
												description: "Planejamento estratégico e roadmap tecnológico",
												services: [
													"IT strategy",
													"Technology roadmap",
													"Vendor management",
													"Cost optimization",
													"Digital transformation planning"
												],
												icon: Compass,
												gradient: "from-amber-500/20 to-orange-500/20",
												border: "border-amber-500/30",
												iconBg: "from-amber-500 to-orange-500",
												textAccent: "text-amber-400",
												projects: "70+"
											}
						].map((specialization, index) => {
							const IconComponent = specialization.icon;
							return (
								<motion.div
									key={specialization.area}
									className="group relative"
									initial={{ opacity: 0, y: 50 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.8, delay: index * 0.1 }}
									viewport={{ once: true }}
									whileHover={{ y: -12, scale: 1.02 }}
								>
									{/* Modern Card Design */}
									<div className={`relative rounded-3xl border ${specialization.border} bg-gradient-to-br ${specialization.gradient} backdrop-blur-xl p-8 h-full transition-all duration-700 group-hover:shadow-2xl group-hover:shadow-cyan-500/10`}>
										{/* Subtle Background Pattern */}
										<div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 to-transparent opacity-50" />
										
										{/* Animated Border Glow */}
										<div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${specialization.iconBg} opacity-0 group-hover:opacity-20 transition-opacity duration-700 blur-sm`} />
										
										<div className="relative z-10">
											{/* Header with Icon and Projects Count */}
											<div className="flex items-center justify-between mb-6">
												<motion.div
													className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${specialization.iconBg} shadow-lg group-hover:shadow-xl transition-all duration-500`}
													animate={{
														scale: [1, 1.05, 1],
														rotate: [0, 2, 0],
													}}
													transition={{
														duration: 3,
														repeat: Infinity,
														ease: "easeInOut",
													}}
													whileHover={{ 
														scale: 1.15, 
														rotate: 5,
														boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
													}}
												>
													<IconComponent className="w-10 h-10 text-white" />
												</motion.div>
												<div className="text-right">
													<div className={`${specialization.textAccent} font-black text-2xl`}>{specialization.projects}</div>
													<div className="text-gray-400 text-sm">Projetos</div>
												</div>
											</div>

											{/* Title */}
											<h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-300 transition-colors duration-500">
												{specialization.area}
											</h3>
											
											{/* Description */}
											<p className="text-gray-300 mb-6 leading-relaxed text-base">
												{specialization.description}
											</p>

											{/* Services List */}
											<div className="space-y-4">
												<h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Serviços Especializados:</h4>
												<ul className="space-y-3">
													{specialization.services.map((service, serviceIndex) => (
														<motion.li
															key={service}
															className="flex items-start gap-3 text-gray-300 text-sm group/item"
															initial={{ opacity: 0, x: -20 }}
															whileInView={{ opacity: 1, x: 0 }}
															transition={{ duration: 0.5, delay: serviceIndex * 0.1 }}
															viewport={{ once: true }}
														>
															<div className={`w-2 h-2 rounded-full bg-gradient-to-r ${specialization.iconBg} mt-2 flex-shrink-0 group-hover/item:scale-125 transition-transform duration-300`} />
															<span className="group-hover/item:text-white transition-colors duration-300">{service}</span>
														</motion.li>
													))}
												</ul>
											</div>
										</div>

										{/* Hover Glow Effect */}
										<div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${specialization.iconBg} blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-700`} />
									</div>
								</motion.div>
							);
						})}
					</div>
				</div>
			</section>

			{/* Consulting Tools & Technologies Section */}
			<section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
				<div className="max-w-7xl mx-auto">
					<motion.h2
						className="text-5xl sm:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						viewport={{ once: true }}
					>
						Ferramentas e Tecnologias
					</motion.h2>

					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
						{/* Assessment Tools */}
						<motion.div
							className="space-y-6"
							initial={{ opacity: 0, x: -50 }}
							whileInView={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.8 }}
							viewport={{ once: true }}
						>
							<div className="flex items-center gap-4 mb-8">
								<motion.div
									className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
									animate={{
										scale: [1, 1.1, 1],
										boxShadow: [
											"0 0 20px rgba(6, 182, 212, 0.4)",
											"0 0 40px rgba(59, 130, 246, 0.7)",
											"0 0 20px rgba(6, 182, 212, 0.4)",
										],
									}}
									transition={{
										duration: 2,
										repeat: Infinity,
										ease: "easeInOut",
									}}
								>
									<BarChart3 className="w-8 h-8 text-white" />
								</motion.div>
								<h3 className="text-3xl font-bold text-white">Ferramentas de Assessment</h3>
							</div>

							<div className="space-y-4">
								{[
									{ tool: "IT Health Check", purpose: "Avaliação completa da infraestrutura", features: ["Security audit", "Performance analysis", "Compliance check", "Cost optimization"] },
									{ tool: "Digital Maturity Assessment", purpose: "Análise de maturidade digital", features: ["Process evaluation", "Technology gap analysis", "Capability assessment", "Roadmap definition"] },
									{ tool: "Architecture Review", purpose: "Revisão de arquitetura existente", features: ["System mapping", "Dependency analysis", "Scalability assessment", "Modernization planning"] },
									{ tool: "Security Assessment", purpose: "Avaliação de segurança cibernética", features: ["Vulnerability scanning", "Penetration testing", "Compliance audit", "Risk analysis"] }
								].map((tool, index) => (
									<motion.div
										key={tool.tool}
										className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm"
										initial={{ opacity: 0, y: 20 }}
										whileInView={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.5, delay: index * 0.1 }}
										viewport={{ once: true }}
									>
										<div className="flex justify-between items-start mb-3">
											<h4 className="font-semibold text-white text-lg">{tool.tool}</h4>
											<span className="text-cyan-400 font-bold text-sm bg-cyan-500/20 px-2 py-1 rounded-full">
												Assessment
											</span>
										</div>
										<p className="text-gray-300 text-sm mb-4">{tool.purpose}</p>
										<div className="grid grid-cols-2 gap-2">
											{tool.features.map((feature, featureIndex) => (
												<motion.span
													key={feature}
													className="px-2 py-1 bg-white/10 rounded text-xs text-gray-300 border border-white/20"
													initial={{ opacity: 0, scale: 0.8 }}
													whileInView={{ opacity: 1, scale: 1 }}
													transition={{ duration: 0.3, delay: featureIndex * 0.1 }}
													viewport={{ once: true }}
												>
													{feature}
												</motion.span>
											))}
										</div>
									</motion.div>
								))}
							</div>
						</motion.div>

						{/* Implementation Technologies */}
						<motion.div
							className="space-y-6"
							initial={{ opacity: 0, x: 50 }}
							whileInView={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.8 }}
							viewport={{ once: true }}
						>
							<div className="flex items-center gap-4 mb-8">
								<motion.div
									className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
									animate={{
										scale: [1, 1.1, 1],
										boxShadow: [
											"0 0 20px rgba(147, 51, 234, 0.4)",
											"0 0 40px rgba(236, 72, 153, 0.7)",
											"0 0 20px rgba(147, 51, 234, 0.4)",
										],
									}}
									transition={{
										duration: 2,
										repeat: Infinity,
										ease: "easeInOut",
									}}
								>
									<Wrench className="w-8 h-8 text-white" />
								</motion.div>
								<h3 className="text-3xl font-bold text-white">Tecnologias de Implementação</h3>
							</div>

							<div className="space-y-4">
								{[
									{ category: "Cloud Platforms", technologies: ["AWS", "Azure", "Google Cloud", "Hybrid Cloud"], expertise: "95%" },
									{ category: "DevOps & CI/CD", technologies: ["Docker", "Kubernetes", "Jenkins", "GitLab"], expertise: "92%" },
									{ category: "Monitoring & Analytics", technologies: ["Prometheus", "Grafana", "ELK Stack", "DataDog"], expertise: "88%" },
									{ category: "Security Tools", technologies: ["Nessus", "Burp Suite", "Splunk", "Qualys"], expertise: "90%" },
									{ category: "Data & BI", technologies: ["Tableau", "Power BI", "Apache Spark", "Kafka"], expertise: "85%" },
									{ category: "Automation", technologies: ["Ansible", "Terraform", "Puppet", "Chef"], expertise: "87%" }
								].map((category, index) => (
									<motion.div
										key={category.category}
										className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm"
										initial={{ opacity: 0, y: 20 }}
										whileInView={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.5, delay: index * 0.1 }}
										viewport={{ once: true }}
									>
										<div className="flex justify-between items-start mb-3">
											<h4 className="font-semibold text-white">{category.category}</h4>
											<span className="text-purple-400 font-bold">{category.expertise}</span>
										</div>
										<p className="text-gray-300 text-sm mb-3">{category.technologies.join(", ")}</p>
										<div className="w-full bg-gray-700 rounded-full h-2">
											<motion.div
												className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
												initial={{ width: 0 }}
												whileInView={{ width: category.expertise }}
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

			{/* Certifications & Credentials Section */}
			<section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
				<div className="max-w-7xl mx-auto">
					<motion.h2
						className="text-5xl sm:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						viewport={{ once: true }}
					>
						Certificações e Credenciais
					</motion.h2>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
						{[
							{
								certification: "AWS Certified Solutions Architect",
								issuer: "Amazon Web Services",
								validity: "2024-2027",
								icon: Cloud,
								color: "from-orange-500 to-red-500",
								description: "Arquitetura de soluções em nuvem"
							},
							{
								certification: "Microsoft Azure Expert",
								issuer: "Microsoft",
								validity: "2024-2026",
								icon: Server,
								color: "from-blue-500 to-cyan-500",
								description: "Especialista em soluções Azure"
							},
							{
								certification: "ITIL 4 Foundation",
								issuer: "AXELOS",
								validity: "Permanente",
								icon: Settings,
								color: "from-green-500 to-emerald-500",
								description: "Gestão de serviços de TI"
							},
							{
								certification: "CISSP",
								issuer: "ISC²",
								validity: "2024-2027",
								icon: Shield,
								color: "from-red-500 to-pink-500",
								description: "Segurança da informação"
							},
							{
								certification: "PMP",
								issuer: "PMI",
								validity: "2024-2027",
								icon: Briefcase,
								color: "from-purple-500 to-indigo-500",
								description: "Gerenciamento de projetos"
							},
							{
								certification: "TOGAF 9 Certified",
								issuer: "The Open Group",
								validity: "Permanente",
								icon: Building,
								color: "from-yellow-500 to-orange-500",
								description: "Arquitetura empresarial"
							},
							{
								certification: "Google Cloud Professional",
								issuer: "Google Cloud",
								validity: "2024-2026",
								icon: Globe2,
								color: "from-cyan-500 to-blue-500",
								description: "Soluções Google Cloud"
							},
							{
								certification: "COBIT 2019 Foundation",
								issuer: "ISACA",
								validity: "Permanente",
								icon: ShieldCheck,
								color: "from-indigo-500 to-purple-500",
								description: "Governança de TI"
							}
						].map((cert, index) => {
							const IconComponent = cert.icon;
							return (
								<motion.div
									key={cert.certification}
									className="group relative"
									initial={{ opacity: 0, y: 50 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.8, delay: index * 0.1 }}
									viewport={{ once: true }}
									whileHover={{ y: -10, scale: 1.05 }}
								>
									<div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 h-full transition-all duration-500 group-hover:border-white/20 group-hover:bg-white/10">
										<div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${cert.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
										
										<div className="relative z-10 text-center">
											<motion.div
												className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${cert.color} mb-4 mx-auto`}
												whileHover={{ 
													scale: 1.2, 
													rotate: 360,
													boxShadow: "0 0 30px rgba(0,0,0,0.3)"
												}}
												transition={{ duration: 0.4, ease: "easeOut" }}
											>
												<IconComponent className="w-8 h-8 text-white" />
											</motion.div>

											<h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
												{cert.certification}
											</h3>
											
											<p className="text-cyan-400 text-sm font-medium mb-2">{cert.issuer}</p>
											<p className="text-gray-300 text-xs mb-3">{cert.description}</p>
											
											<div className="flex justify-center">
												<span className="text-green-400 font-bold text-xs bg-green-500/20 px-2 py-1 rounded-full border border-green-500/30">
													{cert.validity}
												</span>
											</div>
										</div>

										<div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${cert.color} blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
									</div>
								</motion.div>
							);
						})}
					</div>
				</div>
			</section>

			{/* Detailed Engagement Process Section */}
			<section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
				<div className="max-w-7xl mx-auto">
					<motion.h2
						className="text-5xl sm:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						viewport={{ once: true }}
					>
						Processo de Engajamento
					</motion.h2>

					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
						{/* Engagement Timeline */}
						<motion.div
							className="space-y-6"
							initial={{ opacity: 0, x: -50 }}
							whileInView={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.8 }}
							viewport={{ once: true }}
						>
							<div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8">
								<h3 className="text-2xl font-bold text-white mb-8 text-center">Timeline de Engajamento</h3>
								
								<div className="space-y-8">
									{[
										{ 
											phase: "Consultoria Inicial", 
											duration: "1-2 semanas",
											deliverables: ["Discovery call", "Proposta técnica", "Cronograma detalhado"],
											icon: MessageSquare,
											color: "from-blue-500 to-cyan-500"
										},
										{ 
											phase: "Assessment & Análise", 
											duration: "2-4 semanas",
											deliverables: ["Relatório de assessment", "Gap analysis", "Recomendações"],
											icon: FileText,
											color: "from-purple-500 to-pink-500"
										},
										{ 
											phase: "Planejamento Estratégico", 
											duration: "1-2 semanas",
											deliverables: ["Roadmap tecnológico", "Business case", "ROI projection"],
											icon: Target,
											color: "from-green-500 to-emerald-500"
										},
										{ 
											phase: "Implementação", 
											duration: "4-16 semanas",
											deliverables: ["Soluções implementadas", "Documentação", "Treinamento"],
											icon: Rocket,
											color: "from-orange-500 to-red-500"
										},
										{ 
											phase: "Suporte & Otimização", 
											duration: "Ongoing",
											deliverables: ["Monitoramento", "Otimizações", "Relatórios mensais"],
											icon: TrendingUp,
											color: "from-indigo-500 to-purple-500"
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
														<span className="text-cyan-400 font-bold text-sm bg-cyan-500/20 px-2 py-1 rounded-full">
															{phase.duration}
														</span>
													</div>
													<div className="space-y-1">
														{phase.deliverables.map((deliverable, deliverableIndex) => (
															<motion.div
																key={deliverable}
																className="flex items-center gap-2 text-gray-300 text-sm"
																initial={{ opacity: 0, x: -20 }}
																whileInView={{ opacity: 1, x: 0 }}
																transition={{ duration: 0.3, delay: deliverableIndex * 0.1 }}
																viewport={{ once: true }}
															>
																<CheckCircle className="w-3 h-3 text-cyan-400 flex-shrink-0" />
																<span>{deliverable}</span>
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
										{ metric: "ROI Médio", value: "340%", description: "Retorno em 18 meses", icon: DollarSign, color: "from-green-500 to-emerald-500" },
										{ metric: "Redução de Custos", value: "35%", description: "Economia anual média", icon: TrendingUp, color: "from-blue-500 to-cyan-500" },
										{ metric: "Aumento de Produtividade", value: "45%", description: "Melhoria em eficiência", icon: Zap, color: "from-purple-500 to-pink-500" },
										{ metric: "Tempo de Payback", value: "8 meses", description: "Recuperação do investimento", icon: Clock, color: "from-orange-500 to-red-500" }
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
														<span className="text-cyan-400 font-bold text-lg">{metric.value}</span>
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
										<div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500">
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
										className="px-8 py-4 bg-gradient-to-r from-cyan-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 text-lg group mx-auto"
										whileHover={{ scale: 1.05, y: -3 }}
										whileTap={{ scale: 0.95 }}
									>
										<Calendar className="w-5 h-5 group-hover:rotate-12 transition-transform" />
										Agendar Consultoria Gratuita
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
							Pronto para Transformar?
						</motion.h2>
						
						<motion.p
							className="text-2xl text-gray-300 mb-10 max-w-3xl mx-auto"
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.4 }}
							viewport={{ once: true }}
						>
							Agende uma consultoria gratuita e descubra como a tecnologia pode impulsionar o crescimento do seu negócio.
						</motion.p>
						
						<motion.div
							className="flex flex-col sm:flex-row gap-6 justify-center items-center"
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.6 }}
							viewport={{ once: true }}
						>
							<motion.button
								className="px-10 py-5 bg-gradient-to-r from-cyan-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 text-lg group"
								whileHover={{ scale: 1.05, y: -3 }}
								whileTap={{ scale: 0.95 }}
							>
								<Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform" />
						Agendar Consultoria Gratuita
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
