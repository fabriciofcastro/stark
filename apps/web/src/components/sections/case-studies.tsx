"use client";

import { motion } from "framer-motion";

const CaseStudies = () => {
	const cases = [
		{
			id: 1,
			title: "Transformação Digital em Indústria",
			company: "Indústria Metalúrgica",
			description:
				"Implementação de infraestrutura cloud com automação e monitoramento",
			results: [
				"Redução de 40% nos custos operacionais",
				"Aumento de 99.95% de uptime",
				"Redução de 60% no tempo de resposta a incidentes",
			],
			industry: "Manufatura",
			timeframe: "6 meses",
			investment: "R$ 1.2M",
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-8 w-8"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<title>Ícone de Indústria</title>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
					/>
				</svg>
			),
      gradient: "from-purple-500/20 via-pink-500/10 to-rose-500/20",
      glow: "shadow-purple-500/25",
		},
		{
			id: 2,
			title: "Governança e Segurança para Finanças",
			company: "Instituição Financeira",
			description: "Estruturação de governança de TI e segurança da informação",
			results: [
				"Conformidade com normas do BACEN",
				"100% de compliance com LGPD",
				"Redução de 85% nos riscos de segurança",
			],
			industry: "Finanças",
			timeframe: "8 meses",
      investment: "R$ 2.8M",
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-8 w-8"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<title>Ícone de Finanças</title>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
					/>
				</svg>
			),
      gradient: "from-emerald-500/20 via-teal-500/10 to-cyan-500/20",
      glow: "shadow-emerald-500/25",
		},
		{
			id: 3,
      title: "Migração para Nuvem",
      company: "Empresa de Varejo",
      description:
        "Migração completa para infraestrutura cloud com alta disponibilidade",
			results: [
        "Escalabilidade automática implementada",
        "Redução de 70% nos custos de infraestrutura",
        "Melhoria de 300% na performance",
			],
			industry: "Varejo",
			timeframe: "4 meses",
			investment: "R$ 800K",
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-8 w-8"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
          <title>Ícone de Nuvem</title>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
					/>
				</svg>
			),
      gradient: "from-blue-500/20 via-indigo-500/10 to-purple-500/20",
      glow: "shadow-blue-500/25",
    },
  ];

  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900">
      {/* Magnetic Field Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Magnetic Orbs */}
        {[...Array(20)].map(() => (
          <motion.div
            key={`magnetic-orb-${Math.random()}`}
            className="absolute w-4 h-4 bg-gradient-to-r from-purple-400/30 to-pink-400/30 rounded-full blur-sm"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
              scale: [0.5, 1.5, 0.5],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Magnetic Field Lines */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`field-line-${Math.random()}`}
            className="absolute h-px bg-gradient-to-r from-transparent via-purple-400/20 to-transparent"
            style={{
              left: `${i * 8}%`,
              top: `${20 + i * 5}%`,
              width: `${60 + i * 5}%`,
            }}
            animate={{
              opacity: [0.1, 0.4, 0.1],
              scaleX: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 8,
              delay: i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2
            className="text-sm font-medium text-purple-400 mb-4 tracking-wider uppercase"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Cases de Sucesso
          </motion.h2>
          <motion.h1
            className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-purple-100 to-pink-200 bg-clip-text text-transparent mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Transformações Reais,
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 bg-clip-text text-transparent">
              Resultados Comprovados
            </span>
          </motion.h1>
          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Projetos que revolucionaram negócios e geraram impacto mensurável
            para nossos parceiros
          </motion.p>
        </motion.div>

        {/* Magnetic Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {cases.map((caseItem, index) => (
            <motion.div
              key={caseItem.id}
              initial={{ opacity: 0, y: 100, rotateX: -20 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              className="group perspective-1000"
              whileHover={{
                scale: 1.02,
                y: -10,
                rotateY: 2,
              }}
            >
              <motion.div
                className={`relative h-full p-8 rounded-2xl bg-gradient-to-br ${caseItem.gradient} backdrop-blur-xl border border-white/10 hover:border-purple-400/40 transition-all duration-500 cursor-pointer group-hover:shadow-2xl ${caseItem.glow} group-hover:shadow-[0_0_60px]`}
                whileHover={{
                  scale: 1.01,
                  z: 50,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {/* Magnetic Field Effect */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <motion.div
                    className="absolute top-4 right-4 w-8 h-8 bg-purple-400/20 rounded-full blur-sm"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <motion.div
                    className="absolute bottom-4 left-4 w-6 h-6 bg-pink-400/20 rounded-full blur-sm"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.2, 0.5, 0.2],
                    }}
                    transition={{
                      duration: 3,
                      delay: 0.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon with Magnetic Animation */}
                  <motion.div
                    className="mb-6 p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-purple-400/20 group-hover:bg-purple-400/20 transition-colors duration-300 w-fit"
                    whileHover={{
                      rotate: 360,
                      scale: 1.1,
                    }}
                    transition={{ duration: 0.8 }}
                  >
                    <div className="text-white group-hover:text-purple-300 transition-colors duration-300">
                      {caseItem.icon}
                    </div>
                  </motion.div>

                  {/* Title */}
                  <motion.h3
                    className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-300"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 + 0.4 }}
                  >
                    {caseItem.title}
                  </motion.h3>

                  {/* Company */}
                  <motion.p
                    className="text-purple-300 text-sm font-medium mb-4"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 + 0.5 }}
                  >
                    {caseItem.company} • {caseItem.industry}
                  </motion.p>

                  {/* Description */}
                  <motion.p
                    className="text-gray-300 leading-relaxed mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 + 0.6 }}
                  >
                    {caseItem.description}
                  </motion.p>

                  {/* Results */}
                  <motion.div
                    className="space-y-3 mb-6"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: index * 0.2 + 0.7 }}
                  >
                    {caseItem.results.map((result, resultIndex) => (
                      <motion.div
                        key={result}
                        className="flex items-center text-sm text-gray-300"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: index * 0.2 + 0.8 + resultIndex * 0.1,
                        }}
                      >
                        <motion.div
                          className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mr-3 flex-shrink-0"
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.7, 1, 0.7],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: resultIndex * 0.2,
                          }}
                        />
                        {result}
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Stats */}
                  <motion.div
                    className="grid grid-cols-2 gap-4 pt-6 border-t border-white/10"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 + 0.9 }}
                  >
                    <div className="text-center">
                      <div className="text-lg font-bold text-purple-300">
                        {caseItem.timeframe}
                      </div>
                      <div className="text-xs text-gray-400">Prazo</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-pink-300">
                        {caseItem.investment}
                      </div>
                      <div className="text-xs text-gray-400">Investimento</div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <motion.button
            className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-purple-500/25"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Ver Todos os Cases
            <motion.svg
              className="ml-2 w-5 h-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
				>
              <title>Ícone de seta</title>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </motion.svg>
          </motion.button>
        </motion.div>
			</div>
    </section>
	);
};

export default CaseStudies;
