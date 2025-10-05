"use client";

import { motion } from "framer-motion";
import { Shield, FileText, Users, Database, Lock, CheckCircle, AlertTriangle, Clock, Globe, Zap, Cpu, Network, Scale, Eye } from "lucide-react";
import { useState, useEffect } from "react";

const LGPDPage = () => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; opacity: number; delay: number }>>([]);

  useEffect(() => {
    const generateParticles = () => {
      const newParticles = Array.from({ length: 45 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.4 + 0.1,
        delay: Math.random() * 4
      }));
      setParticles(newParticles);
    };

    generateParticles();
  }, []);

  const principles = [
    {
      icon: Shield,
      title: "Finalidade",
      description: "Tratamos dados apenas para finalidades específicas, explícitas e legítimas",
      details: "Cada dado coletado tem um propósito claro e bem definido"
    },
    {
      icon: FileText,
      title: "Adequação",
      description: "Dados são compatíveis com as finalidades informadas",
      details: "Não utilizamos dados além do que foi comunicado ao titular"
    },
    {
      icon: Users,
      title: "Necessidade",
      description: "Coletamos apenas dados essenciais para as finalidades",
      details: "Minimizamos a coleta de dados ao estritamente necessário"
    },
    {
      icon: Database,
      title: "Transparência",
      description: "Informações claras sobre o tratamento de dados",
      details: "Comunicação aberta sobre como utilizamos seus dados"
    },
    {
      icon: Lock,
      title: "Segurança",
      description: "Medidas técnicas e organizacionais adequadas",
      details: "Proteção contra acesso não autorizado e vazamentos"
    },
    {
      icon: CheckCircle,
      title: "Prevenção",
      description: "Ações preventivas contra danos aos dados",
      details: "Antecipamos e evitamos possíveis violações de dados"
    }
  ];

  const rights = [
    {
      icon: CheckCircle,
      title: "Confirmação e Acesso",
      description: "Saber se seus dados estão sendo tratados e acessá-los"
    },
    {
      icon: FileText,
      title: "Correção",
      description: "Corrigir dados incompletos, inexatos ou desatualizados"
    },
    {
      icon: Database,
      title: "Anonimização ou Eliminação",
      description: "Eliminar dados desnecessários ou torná-los anônimos"
    },
    {
      icon: Shield,
      title: "Portabilidade",
      description: "Transferir seus dados para outro fornecedor"
    },
    {
      icon: Users,
      title: "Eliminação",
      description: "Excluir dados tratados com seu consentimento"
    },
    {
      icon: AlertTriangle,
      title: "Informações sobre Compartilhamento",
      description: "Saber com quem seus dados são compartilhados"
    }
  ];

  const complianceMeasures = [
    {
      category: "Governança",
      items: [
        "Política de Privacidade atualizada",
        "Processo de gestão de consentimento",
        "Treinamento da equipe em LGPD",
        "Auditorias regulares de conformidade"
      ]
    },
    {
      category: "Técnicas",
      items: [
        "Criptografia de dados sensíveis",
        "Controle de acesso baseado em função",
        "Backup seguro e recuperação",
        "Monitoramento de segurança 24/7"
      ]
    },
    {
      category: "Organizacionais",
      items: [
        "Designação de Encarregado de Dados (DPO)",
        "Procedimentos de resposta a incidentes",
        "Avaliação de Impacto à Proteção de Dados",
        "Contratos com fornecedores em conformidade"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-slate-900 to-neutral-900 text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Floating Particles */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 bg-green-400/30 rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
            animate={{
              y: [0, -16, 0],
              opacity: [particle.opacity, particle.opacity * 0.3, particle.opacity],
            }}
            transition={{
              duration: 2.6 + Math.random() * 1.4,
              repeat: Infinity,
              delay: particle.delay,
            }}
          />
        ))}
        
        {/* Geometric Shapes */}
        <motion.div
          className="absolute top-28 left-14 w-26 h-26 border border-green-500/20 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute top-56 right-18 w-18 h-18 border border-emerald-500/20 rounded-lg"
          animate={{ rotate: -360 }}
          transition={{ duration: 17, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-36 left-1/3 w-14 h-14 border border-green-500/20 rounded-full"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 3.2, repeat: Infinity }}
        />
        
        {/* Gradient Orbs */}
        <div className="absolute top-1/3 left-1/3 w-84 h-84 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/3 w-72 h-72 bg-gradient-to-r from-emerald-500/10 to-green-500/10 rounded-full blur-3xl" />
      </div>

      {/* Hero Section */}
      <div className="relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl mb-8"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ duration: 0.3 }}
            >
              <Shield className="w-10 h-10 text-white" />
            </motion.div>
            
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-green-200 to-emerald-200 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Lei Geral de Proteção de Dados
            </motion.h1>
            
            <motion.p
              className="text-xl text-white/80 max-w-4xl mx-auto leading-relaxed mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              A STARK Tecnologia está em total conformidade com a LGPD, garantindo a proteção 
              e privacidade dos seus dados pessoais com transparência e responsabilidade.
            </motion.p>

            <motion.div
              className="flex items-center justify-center space-x-2 text-sm text-white/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Clock className="w-4 h-4" />
              <span>Conformidade LGPD desde 2020 - Versão 3.0</span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* LGPD Overview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500">
            <div className="text-center mb-8">
              <motion.h2
                className="text-3xl font-bold text-white mb-4"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                O que é a LGPD?
              </motion.h2>
              <p className="text-white/80 text-lg max-w-3xl mx-auto leading-relaxed">
                A Lei Geral de Proteção de Dados (Lei nº 13.709/2018) estabelece regras sobre 
                coleta, armazenamento, tratamento e compartilhamento de dados pessoais, 
                garantindo maior controle e transparência aos titulares dos dados.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: Shield, title: "Proteção", description: "Dados pessoais protegidos com medidas técnicas e organizacionais", color: "from-blue-500 to-cyan-500" },
                { icon: FileText, title: "Transparência", description: "Informações claras sobre como utilizamos seus dados", color: "from-purple-500 to-indigo-500" },
                { icon: Users, title: "Controle", description: "Você tem controle total sobre seus dados pessoais", color: "from-green-500 to-emerald-500" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="text-center group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg group-hover:shadow-green-500/25`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <item.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-green-200 transition-colors">{item.title}</h3>
                  <p className="text-white/70 text-sm">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Principles */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <motion.h2
            className="text-3xl font-bold text-white text-center mb-12"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            Princípios da LGPD que Seguimos
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {principles.map((principle, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-500 hover:bg-white/10"
              >
                <div className="flex items-start space-x-4">
                  <motion.div
                    className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:shadow-lg group-hover:shadow-green-500/25"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <principle.icon className="w-6 h-6 text-white" />
                  </motion.div>
                  
                  <div className="flex-1">
                    <motion.h3
                      className="text-lg font-bold text-white mb-2 group-hover:text-green-200 transition-colors"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      {principle.title}
                    </motion.h3>
                    <p className="text-white/80 text-sm mb-2">
                      {principle.description}
                    </p>
                    <p className="text-white/60 text-xs">
                      {principle.details}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Rights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <motion.h2
            className="text-3xl font-bold text-white text-center mb-12"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            Seus Direitos como Titular de Dados
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {rights.map((right, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-gradient-to-r from-purple-600/10 to-cyan-500/10 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-500 hover:bg-white/10"
              >
                <div className="flex items-start space-x-4">
                  <motion.div
                    className="w-12 h-12 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:shadow-lg group-hover:shadow-purple-500/25"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <right.icon className="w-6 h-6 text-white" />
                  </motion.div>
                  
                  <div className="flex-1">
                    <motion.h3
                      className="text-lg font-bold text-white mb-2 group-hover:text-purple-200 transition-colors"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      {right.title}
                    </motion.h3>
                    <p className="text-white/80 text-sm">
                      {right.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Compliance Measures */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <motion.h2
            className="text-3xl font-bold text-white text-center mb-12"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            Nossas Medidas de Conformidade
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {complianceMeasures.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-500 hover:bg-white/10"
              >
                <motion.h3
                  className="text-xl font-bold text-white mb-6 text-center group-hover:text-green-200 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  {category.category}
                </motion.h3>
                
                <ul className="space-y-3">
                  {category.items.map((item, itemIndex) => (
                    <motion.li
                      key={itemIndex}
                      className="flex items-start space-x-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: itemIndex * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <motion.div
                        whileHover={{ scale: 1.2 }}
                        transition={{ duration: 0.2 }}
                      >
                        <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      </motion.div>
                      <span className="text-white/80 text-sm">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact DPO */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-green-600/20 to-emerald-500/20 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500"
        >
          <div className="text-center">
            <motion.div
              className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ duration: 0.3 }}
            >
              <Users className="w-8 h-8 text-white" />
            </motion.div>
            
            <motion.h2
              className="text-3xl font-bold text-white mb-4"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              Encarregado de Dados (DPO)
            </motion.h2>
            
            <motion.p
              className="text-white/80 mb-8 max-w-3xl mx-auto text-lg leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Nossa equipe de proteção de dados está disponível para esclarecer dúvidas, 
              receber solicitações e garantir o cumprimento da LGPD.
            </motion.p>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <motion.a
                href="/contato"
                className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-medium hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-green-500/25"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Shield className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                Contatar DPO
              </motion.a>
              
              <motion.a
                href="/politica-privacidade"
                className="group inline-flex items-center justify-center px-8 py-4 bg-white/10 text-white rounded-xl font-medium hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-white/40"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <FileText className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                Política de Privacidade
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LGPDPage;