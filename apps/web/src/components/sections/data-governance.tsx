"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const DataGovernance = () => {
	const governanceAreas = [
		{
			title: "Proteção de Dados",
			description:
				"Políticas rigorosas de proteção de dados pessoais e sensíveis conforme LGPD, GDPR e normas setoriais.",
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-8 w-8"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<title>Ícone de Proteção de Dados</title>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
					/>
				</svg>
			),
			features: [
				"Conformidade LGPD/GDPR",
				"Classificação de dados",
				"Políticas de retenção",
				"Consentimento e transparência",
			],
      gradient: "from-emerald-500/20 via-green-500/10 to-teal-500/20",
      glow: "shadow-emerald-500/25",
		},
		{
			title: "Segurança da Informação",
			description:
				"Estruturas de segurança baseadas nos frameworks ISO 27001, NIST e COBIT para proteção de ativos críticos.",
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-8 w-8"
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
			features: [
				"ISO 27001 e NIST CSF",
				"Controles de acesso",
				"Criptografia end-to-end",
				"Monitoramento contínuo",
			],
      gradient: "from-amber-500/20 via-orange-500/10 to-red-500/20",
      glow: "shadow-amber-500/25",
		},
		{
			title: "Auditoria e Compliance",
			description:
				"Relatórios de auditoria trimestrais, testes de penetração e conformidade contínua com normas regulatórias.",
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-8 w-8"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<title>Ícone de Auditoria</title>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
					/>
				</svg>
			),
			features: [
				"Auditorias trimestrais",
				"Testes de penetração",
				"Relatórios de conformidade",
				"Certificações internacionais",
			],
      gradient: "from-cyan-500/20 via-blue-500/10 to-indigo-500/20",
      glow: "shadow-cyan-500/25",
		},
		{
			title: "Continuidade de Negócios",
			description:
				"Planos de continuidade com RTO e RPO definidos, testados regularmente com simulações de desastre.",
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-8 w-8"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<title>Ícone de Continuidade</title>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
					/>
				</svg>
			),
			features: [
				"RTO e RPO definidos",
				"Backup automatizado",
				"Simulações de desastre",
				"Recuperação rápida",
			],
      gradient: "from-purple-500/20 via-violet-500/10 to-fuchsia-500/20",
      glow: "shadow-purple-500/25",
		},
	];

	const complianceFrameworks = [
		{ name: "LGPD", status: "Compliant", level: "Brasil" },
		{ name: "GDPR", status: "Compliant", level: "Europa" },
		{ name: "ISO 27001", status: "Certified", level: "Internacional" },
		{ name: "SOC 2", status: "Type II", level: "EUA" },
		{ name: "PCI DSS", status: "Compliant", level: "Global" },
		{ name: "COBIT 5", status: "Aligned", level: "Global" },
	];

  const [matrixChars, setMatrixChars] = useState<string[]>([]);

  useEffect(() => {
    const chars = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const newChars = Array.from(
      { length: 100 },
      () => chars[Math.floor(Math.random() * chars.length)],
    );
    setMatrixChars(newChars);
  }, []);

	return (
    <section className="relative bg-gradient-to-br from-slate-900 via-green-900 to-emerald-900">
      {/* Matrix Rain Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Matrix Characters */}
        {matrixChars.map((char, index) => (
          <motion.div
            key={`matrix-${Math.random()}`}
            className="absolute text-green-400/30 font-mono text-xs"
            style={{
              left: `${(index % 20) * 5}%`,
              top: `${-10 + (index % 10) * 10}%`,
            }}
            animate={{
              y: [0, 1000],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear",
            }}
          >
            {char}
          </motion.div>
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
            className="text-sm font-medium text-green-400 mb-4 tracking-wider uppercase"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Governança & Compliance
          </motion.h2>
          <motion.h1
            className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-green-100 to-emerald-200 bg-clip-text text-transparent mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Segurança e Conformidade
            <br />
            <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
              de Classe Mundial
            </span>
          </motion.h1>
          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Implementamos práticas rigorosas de governança de dados e
            conformidade com as principais normas internacionais
          </motion.p>
        </motion.div>
        {/* Governance Areas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
					{governanceAreas.map((area, index) => (
            <motion.div
              key={`governance-${area.title}`}
              initial={{ opacity: 0, y: 100, rotateX: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              className="group perspective-1000"
              whileHover={{
                scale: 1.02,
                y: -8,
              }}
            >
              <motion.div
                className={`relative h-full p-8 rounded-2xl bg-gradient-to-br ${area.gradient} backdrop-blur-xl border border-white/10 hover:border-green-400/40 transition-all duration-500 cursor-pointer group-hover:shadow-2xl ${area.glow} group-hover:shadow-[0_0_60px]`}
                whileHover={{
                  scale: 1.01,
                  z: 50,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {/* Matrix Overlay Effect */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <motion.div
                    className="absolute top-4 right-4 w-8 h-8 bg-green-400/20 rounded-full blur-sm"
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
                    className="absolute bottom-4 left-4 w-6 h-6 bg-emerald-400/20 rounded-full blur-sm"
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
                  {/* Icon with Digital Animation */}
                  <motion.div
                    className="mb-6 p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-green-400/20 group-hover:bg-green-400/20 transition-colors duration-300 w-fit"
                    whileHover={{
                      rotate: 360,
                      scale: 1.1,
                    }}
                    transition={{ duration: 0.8 }}
                  >
                    <div className="text-white group-hover:text-green-300 transition-colors duration-300">
                      {area.icon}
                    </div>
                  </motion.div>

                  {/* Title */}
                  <motion.h3
                    className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-green-400 group-hover:to-emerald-400 group-hover:bg-clip-text transition-all duration-300"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 + 0.4 }}
                  >
                    {area.title}
                  </motion.h3>

                  {/* Description */}
                  <motion.p
                    className="text-gray-300 leading-relaxed mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 + 0.5 }}
                  >
                    {area.description}
                  </motion.p>

                  {/* Features */}
                  <motion.div
                    className="space-y-3"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: index * 0.2 + 0.6 }}
                  >
                    {area.features.map((feature, featureIndex) => (
                      <motion.div
                        key={feature}
                        className="flex items-center text-sm text-gray-300"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: index * 0.2 + 0.7 + featureIndex * 0.1,
                        }}
                      >
                        <motion.div
                          className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full mr-3 flex-shrink-0"
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.7, 1, 0.7],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: featureIndex * 0.2,
                          }}
                        />
                        {feature}
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
					))}
				</div>

				{/* Frameworks de Compliance */}
        <div className="bg-gradient-to-br from-primary-900/20 via-neutral-900/30 to-accent-900/20 backdrop-blur-sm border border-white/10 rounded-3xl p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-secondary-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-accent-500/10 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-3">
                Certificações e Frameworks
					</h3>
              <p className="text-neutral-400 max-w-2xl mx-auto">
                Conformidade total com as principais normas internacionais de
                segurança e governança
              </p>
            </div>

					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
						{complianceFrameworks.map((framework, index) => (
                <motion.div
                  key={`framework-${framework.name}`}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  className="group"
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className="bg-gradient-to-br from-green-800/30 to-emerald-800/30 backdrop-blur-sm border border-green-400/20 rounded-xl p-4 text-center hover:border-green-400/40 transition-all duration-300 cursor-pointer group-hover:shadow-lg group-hover:shadow-green-500/25">
                    <motion.div
                      className="text-lg font-bold text-white mb-1"
                      whileHover={{
                        color: "#10b981",
                      }}
                    >
									{framework.name}
                    </motion.div>
                    <div className="text-xs text-green-300 mb-1">
									{framework.status}
								</div>
                    <div className="text-xs text-gray-400">
									{framework.level}
								</div>
							</div>
                </motion.div>
						))}
					</div>
				</div>
			</div>

        {/* CTA Section */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <motion.button
            className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-green-500/25"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Consultar Compliance
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

export default DataGovernance;
