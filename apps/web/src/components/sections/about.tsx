"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const About = () => {
	const [activeStat, setActiveStat] = useState(0);

	useEffect(() => {
		const timer = setInterval(() => {
			setActiveStat((prev) => (prev + 1) % 4);
		}, 3000);

		return () => clearInterval(timer);
	}, []);

	const impactStats = [
		{
      number: "500+",
      label: "Clientes Atendidos",
      icon: "👥",
      description: "Empresas de todos os portes que confiam em nossos serviços",
      value: "Desde startups até grandes corporações",
      color: "text-primary-400",
      bgColor: "bg-primary-500/10",
      borderColor: "border-primary-500/20",
    },
    {
      number: "99.99%",
      label: "Uptime Garantido",
			icon: "⚡",
      description: "Disponibilidade que mantém seu negócio sempre funcionando",
      value: "SLA com penalidades contratuais",
      color: "text-accent-400",
      bgColor: "bg-accent-500/10",
      borderColor: "border-accent-500/20",
		},
		{
			number: "<15min",
      label: "Resposta Emergencial",
			icon: "🎯",
      description: "Suporte imediato para situações críticas",
      value: "Tempo de resposta garantido",
      color: "text-warning-400",
      bgColor: "bg-warning-500/10",
      borderColor: "border-warning-500/20",
    },
    {
      number: "13+",
      label: "Anos de Experiência",
			icon: "🚀",
      description: "Trajetória sólida em transformação digital e inovação",
      value: "Expertise consolidada no mercado",
      color: "text-secondary-400",
      bgColor: "bg-secondary-500/10",
      borderColor: "border-secondary-500/20",
		},
	];

	const values = [
		{
			title: "Excelência Técnica",
			description:
        "Especialistas certificados em tecnologias de ponta e melhores práticas do mercado",
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-primary-400"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<title>Ícone de Excelência</title>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
			),
      highlight: "Certificações Internacionais",
		},
		{
			title: "Inovação Contínua",
			description:
        "Adotamos as tecnologias mais avançadas para manter seu negócio sempre à frente",
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-accent-400"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<title>Ícone de Inovação</title>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M13 10V3L4 14h7v7l9-11h-7z"
					/>
				</svg>
			),
      highlight: "Tecnologias Emergentes",
		},
		{
			title: "Parceria Estratégica",
			description:
        "Relacionamentos duradouros baseados em confiança, transparência e resultados",
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-secondary-400"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<title>Ícone de Parceria</title>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
					/>
				</svg>
			),
      highlight: "Relacionamento Duradouro",
		},
		{
			title: "Segurança Total",
			description:
        "Proteção completa com conformidade total às principais normas internacionais",
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-warning-400"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<title>Ícone de Segurança</title>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
					/>
				</svg>
			),
      highlight: "Conformidade Internacional",
		},
	];

	return (
    <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-900">
      {/* Liquid Explosions Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Liquid Explosion Particles */}
        {[...Array(30)].map(() => (
          <motion.div
            key={`liquid-particle-${Math.random()}`}
            className="absolute w-3 h-3 bg-gradient-to-r from-cyan-400/40 to-blue-400/40 rounded-full blur-sm"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 200 - 100, 0],
              y: [0, Math.random() * 200 - 100, 0],
              scale: [0.5, 2, 0.5],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 8 + Math.random() * 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Liquid Wave Explosions */}
        {[...Array(6)].map(() => (
          <motion.div
            key={`liquid-wave-${Math.random()}`}
            className="absolute w-64 h-64 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl"
            style={{
              left: `${Math.random() * 80 + 10}%`,
              top: `${Math.random() * 80 + 10}%`,
            }}
            animate={{
              scale: [1, 2, 1],
              opacity: [0.3, 0.6, 0.3],
              x: [0, Math.random() * 150 - 75, 0],
              y: [0, Math.random() * 150 - 75, 0],
            }}
            transition={{
              duration: 12 + Math.random() * 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Liquid Drops */}
        {[...Array(15)].map(() => (
          <motion.div
            key={`liquid-drop-${Math.random()}`}
            className="absolute w-8 h-8 bg-gradient-to-b from-cyan-400/30 to-transparent rounded-full"
            style={{
              left: `${Math.random() * 90 + 5}%`,
              top: `${Math.random() * 90 + 5}%`,
            }}
            animate={{
              y: [0, 50, 0],
              scale: [1, 1.5, 1],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2
            className="text-sm font-medium text-cyan-400 mb-4 tracking-wider uppercase"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Sobre Nós
          </motion.h2>
          <motion.h1
            className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-cyan-100 to-blue-200 bg-clip-text text-transparent mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Parceiros em
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Transformação Digital
            </span>
          </motion.h1>
          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Há 13+ anos criando soluções tecnológicas que impulsionam o
            crescimento e garantem a segurança do seu negócio
          </motion.p>
        </motion.div>
        <div className="space-y-12">
				{/* Estatísticas de Impacto */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
					{impactStats.map((stat, index) => (
						<motion.div
                key={`stat-${stat.label}`}
                initial={{ opacity: 0, y: 50 }}
							whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group"
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div
                  className={`bg-gradient-to-br from-cyan-800/30 to-blue-800/30 backdrop-blur-sm border border-cyan-400/20 rounded-xl p-6 text-center hover:border-cyan-400/40 transition-all duration-300 cursor-pointer group-hover:shadow-lg group-hover:shadow-cyan-500/25 ${activeStat === index ? "ring-2 ring-offset-2 ring-secondary-500/50" : ""}`}
                >
                  <div className="text-4xl mb-3">{stat.icon}</div>
                  <motion.div
                    className="text-3xl font-bold text-white mb-2"
                    whileHover={{
                      color: "#06b6d4",
                    }}
                  >
								{stat.number}
                  </motion.div>
                  <div className="text-lg font-semibold text-cyan-300 mb-2">
								{stat.label}
							</div>
                  <div className="text-sm text-gray-300 mb-2">
                    {stat.description}
                  </div>
                  <div className="text-xs text-gray-400">{stat.value}</div>
                </div>
						</motion.div>
					))}
				</div>

				{/* Nossos Valores */}
				<div>
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-white mb-3">
                O que nos Move
					</h3>
              <p className="text-neutral-400 max-w-2xl mx-auto">
                Valores fundamentais que guiam nossa jornada de transformação
                digital
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
						{values.map((value, index) => (
                <motion.div
                  key={`value-${value.title}`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className="bg-gradient-to-br from-cyan-800/30 to-blue-800/30 backdrop-blur-sm border border-cyan-400/20 rounded-xl p-6 text-center hover:border-cyan-400/40 transition-all duration-300 cursor-pointer group-hover:shadow-lg group-hover:shadow-cyan-500/25">
                    <div className="text-4xl mb-3">{value.icon}</div>
                    <motion.div
                      className="text-xl font-bold text-white mb-2"
                      whileHover={{
                        color: "#06b6d4",
                      }}
                    >
                      {value.title}
                    </motion.div>
                    <div className="text-sm text-gray-300 mb-2">
                      {value.description}
                    </div>
                    <div className="text-xs text-cyan-400 font-medium">
                      {value.highlight}
                    </div>
                  </div>
                </motion.div>
						))}
					</div>
				</div>

				{/* Nossa História - Modernized */}
						<div>
            <div className="text-center mb-12">
              <motion.h3 
                className="text-4xl md:text-5xl font-bold text-white mb-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                Nossa Jornada de{" "}
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Transformação
                </span>
							</motion.h3>
              <motion.p 
                className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Uma trajetória construída com excelência, inovação e resultados
                comprovados que transformam o futuro digital
              </motion.p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
							<div className="space-y-6 text-gray-300">
                  <motion.div 
                    className="relative bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-400/30 rounded-2xl p-8 backdrop-blur-sm group hover:border-cyan-400/50 transition-all duration-500"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                  >
                    {/* Animated Background */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="relative z-10">
                      <h4 className="text-2xl font-bold text-white mb-4 flex items-center group-hover:text-cyan-300 transition-colors duration-300">
                        <div className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full mr-4 group-hover:scale-125 transition-transform duration-300"></div>
                        Nossa Origem
                      </h4>
                      <p className="leading-relaxed text-base group-hover:text-white transition-colors duration-300">
                        Fundada em 2011, a STARK nasceu da visão de democratizar o
                        acesso à tecnologia de ponta. Iniciamos nossa jornada com
                        o propósito de transformar ideias em realidade digital,
                        oferecendo soluções que impulsionam o crescimento de
                        empresas de todos os portes.
                      </p>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="relative bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-400/30 rounded-2xl p-8 backdrop-blur-sm group hover:border-purple-400/50 transition-all duration-500"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                  >
                    {/* Animated Background */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="relative z-10">
                      <h4 className="text-2xl font-bold text-white mb-4 flex items-center group-hover:text-purple-300 transition-colors duration-300">
                        <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mr-4 group-hover:scale-125 transition-transform duration-300"></div>
                        Nosso Crescimento
                      </h4>
                      <p className="leading-relaxed text-base group-hover:text-white transition-colors duration-300">
                        Ao longo de 13+ anos, construímos uma reputação sólida
                        baseada em resultados mensuráveis. Já atendemos mais de
                        500 empresas, desde startups inovadoras até grandes
                        corporações, sempre com foco em parcerias duradouras e
                        transformação digital efetiva.
                      </p>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="flex flex-wrap gap-4 mt-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    <motion.div 
                      className="flex items-center space-x-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 px-4 py-3 rounded-xl backdrop-blur-sm group hover:border-cyan-400/50 transition-all duration-300"
                      whileHover={{ scale: 1.05, y: -2 }}
                    >
                      <div className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full group-hover:scale-125 transition-transform duration-300"></div>
                      <span className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors duration-300">
                        13+ Anos de Experiência
                      </span>
                    </motion.div>
                    <motion.div 
                      className="flex items-center space-x-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 px-4 py-3 rounded-xl backdrop-blur-sm group hover:border-purple-400/50 transition-all duration-300"
                      whileHover={{ scale: 1.05, y: -2 }}
                    >
                      <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full group-hover:scale-125 transition-transform duration-300"></div>
                      <span className="text-sm font-semibold text-white group-hover:text-purple-300 transition-colors duration-300">
                        500+ Empresas Atendidas
                      </span>
                    </motion.div>
                    <motion.div 
                      className="flex items-center space-x-3 bg-gradient-to-r from-emerald-500/20 to-green-500/20 border border-emerald-400/30 px-4 py-3 rounded-xl backdrop-blur-sm group hover:border-emerald-400/50 transition-all duration-300"
                      whileHover={{ scale: 1.05, y: -2 }}
                    >
                      <div className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-green-400 rounded-full group-hover:scale-125 transition-transform duration-300"></div>
                      <span className="text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors duration-300">
                        99.99% Uptime
                      </span>
                    </motion.div>
                  </motion.div>
							</div>
						</div>

              <div className="space-y-6">
                <motion.div 
                  className="relative bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-400/30 rounded-2xl p-8 backdrop-blur-sm group hover:border-cyan-400/50 transition-all duration-500"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  {/* Animated Background */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center mb-6">
                      <motion.div 
                        className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300"
                        whileHover={{ rotate: 5 }}
                      >
                        <span className="text-white font-bold text-xl">M</span>
                      </motion.div>
                      <h4 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors duration-300">
                        Nossa Missão
                      </h4>
                    </div>
                    <p className="text-gray-300 leading-relaxed text-base group-hover:text-white transition-colors duration-300">
                      Democratizar o acesso à tecnologia de ponta, oferecendo
                      soluções inovadoras que impulsionam o crescimento e a
                      transformação digital das empresas, garantindo segurança,
                      eficiência e resultados mensuráveis.
                    </p>
                  </div>
                </motion.div>

                <motion.div 
                  className="relative bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-400/30 rounded-2xl p-8 backdrop-blur-sm group hover:border-purple-400/50 transition-all duration-500"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  {/* Animated Background */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center mb-6">
                      <motion.div 
                        className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300"
                        whileHover={{ rotate: 5 }}
                      >
                        <span className="text-white font-bold text-xl">V</span>
                      </motion.div>
                      <h4 className="text-2xl font-bold text-white group-hover:text-purple-300 transition-colors duration-300">
                        Nossa Visão
                      </h4>
                    </div>
                    <p className="text-gray-300 leading-relaxed text-base group-hover:text-white transition-colors duration-300">
                      Ser a referência em tecnologia e inovação no Brasil,
                      reconhecida pela excelência técnica, pela transformação
                      digital efetiva e pelo impacto positivo no crescimento dos
                      nossos parceiros.
                    </p>
                  </div>
                </motion.div>
					</div>
				</div>

				{/* Call to Action - Modernized */}
            <motion.div 
              className="text-center mt-16"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="relative overflow-hidden">
                {/* Advanced Background Effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/10 to-pink-500/5 rounded-3xl"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-3xl"></div>
                
                {/* Animated Grid Pattern */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
                    backgroundSize: '20px 20px'
                  }}></div>
                </div>

                {/* Floating Elements */}
                <div className="absolute top-4 left-8 w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
                <div className="absolute top-12 right-12 w-1 h-1 bg-purple-400 rounded-full animate-pulse"></div>
                <div className="absolute bottom-8 left-16 w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce"></div>
                <div className="absolute bottom-16 right-8 w-1 h-1 bg-emerald-400 rounded-full animate-ping delay-1000"></div>

                {/* Main Content */}
                <div className="relative z-10 bg-gradient-to-br from-slate-900/80 via-slate-800/60 to-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12">
                  
                  {/* Header */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/30">
                      <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-lg">⚡</span>
                      </div>
                    </div>
                    
                    <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                      Pronto para{" "}
                      <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
                        Transformar
                      </span>{" "}
                      Seu Negócio?
                    </h3>
                    
                    <p className="text-xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
                      Junte-se a mais de <span className="text-cyan-400 font-semibold">500+ empresas</span> que já confiam na STARK para sua transformação digital. 
                      Descubra como podemos ajudar sua empresa a alcançar novos patamares de{" "}
                      <span className="text-purple-400 font-semibold">eficiência</span>,{" "}
                      <span className="text-pink-400 font-semibold">segurança</span> e{" "}
                      <span className="text-emerald-400 font-semibold">crescimento</span>.
                    </p>
                  </motion.div>

                  {/* Features Grid */}
                  <motion.div 
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 max-w-5xl mx-auto"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    {[
                      {
                        icon: "🚀",
                        title: "Implementação Rápida",
                        subtitle: "Resultados em 30 dias",
                        description: "Metodologia ágil comprovada",
                        gradient: "from-cyan-500/20 to-blue-500/20",
                        border: "border-cyan-400/30",
                        iconBg: "from-cyan-400 to-blue-500"
                      },
                      {
                        icon: "🛡️",
                        title: "Segurança Total",
                        subtitle: "Conformidade garantida",
                        description: "LGPD e ISO 27001",
                        gradient: "from-purple-500/20 to-pink-500/20",
                        border: "border-purple-400/30",
                        iconBg: "from-purple-400 to-pink-500"
                      },
                      {
                        icon: "📈",
                        title: "ROI Comprovado",
                        subtitle: "Resultados mensuráveis",
                        description: "ROI médio de 300%",
                        gradient: "from-emerald-500/20 to-teal-500/20",
                        border: "border-emerald-400/30",
                        iconBg: "from-emerald-400 to-teal-500"
                      }
                    ].map((feature, index) => (
                      <motion.div
                        key={index}
                        className={`relative group bg-gradient-to-br ${feature.gradient} backdrop-blur-sm border ${feature.border} rounded-2xl p-6 hover:scale-105 transition-all duration-300`}
                        whileHover={{ y: -5 }}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        <div className="relative z-10">
                          <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${feature.iconBg} mb-4`}>
                            <span className="text-2xl">{feature.icon}</span>
                          </div>
                          
                          <h4 className="text-lg font-bold text-white mb-2">
                            {feature.title}
                          </h4>
                          
                          <p className="text-sm font-semibold text-cyan-300 mb-1">
                            {feature.subtitle}
                          </p>
                          
                          <p className="text-xs text-gray-400">
                            {feature.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* CTA Buttons */}
                  <motion.div 
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <motion.a
                      href="/contact"
                      className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold rounded-2xl hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 shadow-2xl hover:shadow-cyan-500/25"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                      <div className="relative z-10 flex items-center gap-3">
                        <span className="text-xl">💬</span>
                        <span>Fale Conosco Agora</span>
                        <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                      </div>
                    </motion.a>
                    
                    <motion.a
                      href="/services"
                      className="group relative inline-flex items-center justify-center px-8 py-4 border-2 border-cyan-400/50 text-cyan-300 font-bold rounded-2xl hover:bg-cyan-400/10 hover:border-cyan-400 transition-all duration-300 backdrop-blur-sm"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">🔧</span>
                        <span>Ver Nossos Serviços</span>
                        <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                      </div>
                    </motion.a>
                    
                    <motion.a
                      href="/cases-de-sucesso"
                      className="group relative inline-flex items-center justify-center px-8 py-4 border-2 border-purple-400/50 text-purple-300 font-bold rounded-2xl hover:bg-purple-400/10 hover:border-purple-400 transition-all duration-300 backdrop-blur-sm"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">📊</span>
                        <span>Ver Cases de Sucesso</span>
                        <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                      </div>
                    </motion.a>
                  </motion.div>

                  {/* Trust Indicators */}
                  <motion.div 
                    className="mt-8 pt-6 border-t border-white/10"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                        <span>500+ Empresas Atendidas</span>
                      </div>
                      <div className="w-px h-4 bg-gray-600"></div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                        <span>99.9% Uptime</span>
                      </div>
                      <div className="w-px h-4 bg-gray-600"></div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                        <span>24/7 Suporte</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
	);
};

export default About;
