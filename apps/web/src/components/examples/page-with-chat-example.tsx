"use client";

import { motion } from 'framer-motion';
import { 
  MessageCircle, 
  Brain, 
  Zap, 
  Shield, 
  Clock, 
  CheckCircle,
  Sparkles,
  ArrowRight
} from 'lucide-react';

// Exemplo de como usar o chat em uma página específica
export function PageWithChatExample() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-neutral-950 via-slate-900 to-neutral-900 relative overflow-hidden">
			{/* Background animado */}
			<div className="absolute inset-0 overflow-hidden">
				{Array.from({ length: 20 }, (_, i) => (
					<motion.div
						key={i}
						className="absolute w-1 h-1 bg-cyan-400/20 rounded-full"
						style={{
							left: `${Math.random() * 100}%`,
							top: `${Math.random() * 100}%`,
						}}
						animate={{
							y: [0, -30, 0],
							opacity: [0.2, 0, 0.2],
							scale: [1, 1.5, 1],
						}}
						transition={{
							duration: Math.random() * 8 + 4,
							delay: Math.random() * 3,
							repeat: Infinity,
							ease: "easeInOut",
						}}
					/>
				))}
				
				{/* Gradiente animado */}
				<motion.div
					className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-pink-500/5"
					animate={{
						background: [
							"linear-gradient(135deg, rgba(6, 182, 212, 0.05) 0%, rgba(139, 92, 246, 0.05) 50%, rgba(236, 72, 153, 0.05) 100%)",
							"linear-gradient(135deg, rgba(139, 92, 246, 0.05) 0%, rgba(236, 72, 153, 0.05) 50%, rgba(6, 182, 212, 0.05) 100%)",
							"linear-gradient(135deg, rgba(236, 72, 153, 0.05) 0%, rgba(6, 182, 212, 0.05) 50%, rgba(139, 92, 246, 0.05) 100%)",
						],
					}}
					transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
				/>
			</div>

			<div className="relative z-10 container mx-auto px-4 py-12">
				{/* Header */}
				<motion.div
					className="text-center mb-16"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
				>
					<div className="inline-flex items-center space-x-3 mb-6">
						<motion.div
							className="w-16 h-16 rounded-3xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center"
							animate={{ rotate: [0, 360] }}
							transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
						>
							<MessageCircle className="w-8 h-8 text-white" />
						</motion.div>
						<h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
							Sistema de Chat STARK AI
						</h1>
					</div>
					<p className="text-white/60 text-lg max-w-2xl mx-auto">
						Demonstração do sistema de chat inteligente integrado em todas as páginas
					</p>
				</motion.div>

				{/* Conteúdo principal */}
				<motion.div
					className="max-w-6xl mx-auto"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.2 }}
				>
					<div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
						<div className="text-center mb-8">
							<motion.div
								className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center"
								animate={{ rotate: [0, 10, -10, 0] }}
								transition={{ duration: 2, repeat: Infinity }}
							>
								<Brain className="w-10 h-10 text-white" />
							</motion.div>
							
							<h2 className="text-3xl font-bold text-white mb-4">
								STARK AI - Assistente Virtual Inteligente
							</h2>
							<p className="text-white/80 text-lg mb-6">
								O chat está disponível no canto inferior direito de todas as páginas. 
								Clique no ícone para iniciar uma conversa com nossa IA avançada.
							</p>
						</div>

						{/* Cards de recursos */}
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
							{[
								{ 
									icon: Clock, 
									title: "Disponível 24/7", 
									description: "Atendimento sempre disponível",
									color: "from-blue-500 to-cyan-500",
									bgColor: "from-blue-500/20 to-cyan-500/20"
								},
								{ 
									icon: Zap, 
									title: "Resposta Instantânea", 
									description: "IA responde em segundos",
									color: "from-green-500 to-emerald-500",
									bgColor: "from-green-500/20 to-emerald-500/20"
								},
								{ 
									icon: Brain, 
									title: "IA Avançada", 
									description: "Tecnologia de ponta",
									color: "from-purple-500 to-pink-500",
									bgColor: "from-purple-500/20 to-pink-500/20"
								},
							].map((feature, index) => (
								<motion.div
									key={feature.title}
									className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:border-white/30 transition-all duration-300"
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
									whileHover={{ y: -5, scale: 1.02 }}
								>
									<div className={`w-12 h-12 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center`}>
										<feature.icon className="w-6 h-6 text-white" />
									</div>
									<h3 className="text-white font-bold text-lg mb-2 text-center">{feature.title}</h3>
									<p className="text-white/70 text-sm text-center">{feature.description}</p>
								</motion.div>
							))}
						</div>

						{/* Recursos do STARK AI */}
						<div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-2xl p-6 border border-white/10">
							<h3 className="text-white font-bold text-xl mb-4 flex items-center">
								<Sparkles className="w-6 h-6 text-cyan-400 mr-2" />
								Recursos do STARK AI
							</h3>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								{[
									"🛠️ Suporte Técnico Inteligente",
									"💡 Consultoria Tecnológica",
									"🔒 Cibersegurança e LGPD",
									"☁️ Soluções em Nuvem",
									"💻 Desenvolvimento de Sistemas",
									"💰 Orçamentos Personalizados",
									"📞 Conecta com Especialistas",
									"📊 Gera Protocolos Únicos"
								].map((feature, index) => (
									<motion.div
										key={feature}
										className="flex items-center space-x-3 text-white/80"
										initial={{ opacity: 0, x: -20 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
									>
										<CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
										<span className="text-sm">{feature}</span>
									</motion.div>
								))}
							</div>
						</div>

						{/* CTA */}
						<motion.div
							className="text-center mt-8"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.8 }}
						>
							<p className="text-white/60 mb-4">
								O chat está ativo em todas as páginas do site
							</p>
							<motion.div
								className="inline-flex items-center space-x-2 text-cyan-400 font-medium"
								animate={{ x: [0, 5, 0] }}
								transition={{ duration: 2, repeat: Infinity }}
							>
								<span>Procure pelo ícone no canto inferior direito</span>
								<ArrowRight className="w-4 h-4" />
							</motion.div>
						</motion.div>
					</div>
				</motion.div>
			</div>
		</div>
	);
}
