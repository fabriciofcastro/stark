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
  VolumeX
} from "lucide-react";

export default function ConsultoriaTecnologica() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
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
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

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
						{/* Animated Logo */}
						<motion.div
							className="inline-flex items-center justify-center w-32 h-32 mb-8 rounded-full bg-gradient-to-r from-cyan-600 to-purple-600 shadow-2xl"
							animate={{
								x: [0, 10, -10, 0],
								y: [0, -5, 0],
								scale: [1, 1.05, 1],
								boxShadow: [
									"0 0 30px rgba(6, 182, 212, 0.4)",
									"0 0 50px rgba(139, 92, 246, 0.7)",
									"0 0 30px rgba(6, 182, 212, 0.4)",
								],
							}}
							transition={{
								x: { duration: 4, repeat: Infinity, ease: "easeInOut" },
								y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
								scale: { duration: 5, repeat: Infinity, ease: "easeInOut" },
								boxShadow: { duration: 4, repeat: Infinity, ease: "easeInOut" },
							}}
						>
							<Brain className="w-16 h-16 text-white" />
						</motion.div>

						<motion.h1
							className="text-6xl sm:text-7xl lg:text-8xl font-bold mb-8 bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent"
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.2 }}
						>
							Consultoria
						</motion.h1>

						<motion.h2
							className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.4 }}
						>
							Tecnológica
						</motion.h2>

						<motion.p
							className="text-2xl sm:text-3xl text-gray-300 mb-12 max-w-5xl mx-auto leading-relaxed"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.6 }}
						>
							Transforme sua empresa através da{" "}
							<span className="text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text font-semibold">
								tecnologia estratégica
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
										{/* Gradient Overlay */}
										<div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
										
										{/* Icon */}
										<motion.div
											className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${service.color} mb-6`}
											whileHover={{ 
												scale: 1.2, 
												rotate: 360,
												boxShadow: "0 0 30px rgba(0,0,0,0.3)"
											}}
											transition={{ duration: 0.4, ease: "easeOut" }}
										>
											<IconComponent className="w-8 h-8 text-white" />
										</motion.div>

										{/* Content */}
										<div className="relative z-10">
											<h3 className="text-xl font-bold text-white mb-4 group-hover:text-cyan-300 transition-colors">
												{service.title}
											</h3>
											
											<p className="text-gray-300 mb-6 leading-relaxed">
												{service.description}
											</p>

											{/* Features */}
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
														<CheckCircle className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
														<span>{feature}</span>
													</motion.li>
												))}
											</ul>
										</div>

										{/* Hover Glow */}
										<div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.color} blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
									</div>
								</motion.div>
							);
						})}
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
						{[
							{ icon: TrendingUp, label: "Redução de Custos", value: "30%", color: "from-green-500 to-emerald-500" },
							{ icon: Zap, label: "Aumento de Produtividade", value: "40%", color: "from-yellow-500 to-orange-500" },
							{ icon: Shield, label: "Melhoria de Segurança", value: "95%", color: "from-red-500 to-pink-500" },
							{ icon: Rocket, label: "Inovação Tecnológica", value: "200%", color: "from-purple-500 to-indigo-500" }
						].map((stat, index) => (
							<motion.div
								key={stat.label}
								className="relative group"
								initial={{ opacity: 0, y: 50 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8, delay: index * 0.1 }}
								viewport={{ once: true }}
								whileHover={{ y: -10, scale: 1.05 }}
							>
								<div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 text-center h-full transition-all duration-500 group-hover:border-white/20 group-hover:bg-white/10">
									<div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
									
									<div className="relative z-10">
										<motion.div
											className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${stat.color} mb-6`}
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
											<stat.icon className="w-8 h-8 text-white" />
										</motion.div>
										
										<motion.div
											className="text-5xl font-bold text-white mb-3"
											initial={{ scale: 0 }}
											whileInView={{ scale: 1 }}
											transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
											viewport={{ once: true }}
										>
											{stat.value}
										</motion.div>
										
										<div className="text-gray-300 font-medium text-lg">
											{stat.label}
										</div>
									</div>

									<div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${stat.color} blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
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
