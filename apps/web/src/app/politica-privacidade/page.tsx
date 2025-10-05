"use client";

import { motion } from "framer-motion";
import { Shield, Eye, Lock, Database, Users, FileText, Clock, CheckCircle, AlertTriangle, Globe, Zap, Cpu, Network } from "lucide-react";
import { useState, useEffect } from "react";

const PolicyPage = () => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; opacity: number; delay: number }>>([]);

  useEffect(() => {
    const generateParticles = () => {
      const newParticles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 1,
        opacity: Math.random() * 0.5 + 0.1,
        delay: Math.random() * 5
      }));
      setParticles(newParticles);
    };

    generateParticles();
  }, []);

  const sections = [
    {
      icon: Eye,
      title: "1. Informações que Coletamos",
      content: [
        "Dados de identificação: nome, e-mail, telefone, empresa, cargo",
        "Dados de navegação: IP, cookies, páginas visitadas, tempo de permanência",
        "Dados de comunicação: mensagens via formulários, WhatsApp, e-mail",
        "Dados técnicos: tipo de dispositivo, navegador, sistema operacional",
        "Dados de localização: cidade, estado (quando necessário para serviços)",
        "Dados de preferências: idioma, configurações de privacidade"
      ]
    },
    {
      icon: Lock,
      title: "2. Finalidades do Tratamento",
      content: [
        "Prestação de serviços de tecnologia e consultoria",
        "Comunicação comercial e marketing (com consentimento)",
        "Melhoria da experiência do usuário e personalização",
        "Cumprimento de obrigações legais e regulamentares",
        "Análise estatística e desenvolvimento de produtos",
        "Segurança e prevenção de fraudes"
      ]
    },
    {
      icon: Database,
      title: "3. Base Legal e Compartilhamento",
      content: [
        "Consentimento livre, informado e inequívoco do titular",
        "Execução de contrato ou procedimentos preliminares",
        "Cumprimento de obrigação legal ou regulatória",
        "Proteção da vida ou da incolumidade física do titular",
        "Tutela da saúde em procedimento realizado por profissionais",
        "Interesse legítimo para proteção de direitos"
      ]
    },
    {
      icon: Shield,
      title: "4. Medidas de Segurança",
      content: [
        "Criptografia AES-256 para dados em repouso",
        "Protocolos TLS 1.3 para transmissão de dados",
        "Controle de acesso baseado em função (RBAC)",
        "Monitoramento contínuo de segurança 24/7",
        "Backup criptografado com retenção de 7 anos",
        "Treinamento regular da equipe em proteção de dados"
      ]
    },
    {
      icon: Users,
      title: "5. Direitos dos Titulares (LGPD)",
      content: [
        "Confirmação da existência de tratamento de dados",
        "Acesso aos dados pessoais tratados",
        "Correção de dados incompletos, inexatos ou desatualizados",
        "Anonimização, bloqueio ou eliminação de dados desnecessários",
        "Portabilidade dos dados para outro fornecedor",
        "Eliminação dos dados tratados com consentimento",
        "Informação sobre compartilhamento com terceiros",
        "Revogação do consentimento a qualquer momento"
      ]
    },
    {
      icon: FileText,
      title: "6. Cookies e Tecnologias",
      content: [
        "Cookies essenciais: necessários para funcionamento básico",
        "Cookies de performance: melhoram velocidade e funcionalidade",
        "Cookies de análise: Google Analytics 4 com anonimização",
        "Cookies de marketing: apenas com consentimento expresso",
        "Tecnologias de terceiros: Google, Microsoft, Facebook",
        "Gerenciamento: painel de preferências disponível 24/7"
      ]
    },
    {
      icon: Globe,
      title: "7. Transferência Internacional",
      content: [
        "Transferência para países com nível adequado de proteção",
        "Cláusulas contratuais padrão aprovadas pela ANPD",
        "Certificações internacionais de proteção de dados",
        "Garantias específicas de proteção de dados pessoais",
        "Consentimento específico para transferência internacional",
        "Transparência sobre países de destino dos dados"
      ]
    },
    {
      icon: AlertTriangle,
      title: "8. Retenção e Eliminação",
      content: [
        "Dados pessoais: retidos pelo tempo necessário às finalidades",
        "Dados contratuais: 5 anos após término do contrato",
        "Dados fiscais: 5 anos conforme legislação tributária",
        "Dados de marketing: até revogação do consentimento",
        "Eliminação segura: destruição física e lógica dos dados",
        "Certificado de eliminação fornecido ao titular"
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
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [particle.opacity, particle.opacity * 0.3, particle.opacity],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: particle.delay,
            }}
          />
        ))}
        
        {/* Geometric Shapes */}
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 border border-blue-500/20 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute top-40 right-20 w-24 h-24 border border-purple-500/20 rounded-lg"
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-40 left-1/4 w-16 h-16 border border-cyan-500/20 rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl" />
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
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-8"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ duration: 0.3 }}
            >
              <Shield className="w-10 h-10 text-white" />
            </motion.div>
            
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Política de Privacidade
            </motion.h1>
            
            <motion.p
              className="text-xl text-white/80 max-w-4xl mx-auto leading-relaxed mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Transparência e proteção dos seus dados pessoais são prioridades para a STARK Tecnologia. 
              Conheça como coletamos, utilizamos e protegemos suas informações em conformidade com a LGPD.
            </motion.p>

            <motion.div
              className="flex items-center justify-center space-x-2 text-sm text-white/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Clock className="w-4 h-4" />
              <span>Última atualização: {new Date().toLocaleDateString('pt-BR')} - Versão 3.0</span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {sections.map((section, index) => (
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
                  className="flex-shrink-0"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:shadow-lg group-hover:shadow-blue-500/25">
                    <section.icon className="w-6 h-6 text-white" />
                  </div>
                </motion.div>
                
                <div className="flex-1">
                  <motion.h2
                    className="text-xl font-bold text-white mb-4 group-hover:text-blue-200 transition-colors"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    {section.title}
                  </motion.h2>
                  
                  <ul className="space-y-3">
                    {section.content.map((item, itemIndex) => (
                      <motion.li
                        key={itemIndex}
                        className="flex items-start space-x-3"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: itemIndex * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <motion.div
                          className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mt-2 flex-shrink-0"
                          whileHover={{ scale: 1.5 }}
                          transition={{ duration: 0.2 }}
                        />
                        <span className="text-white/80 leading-relaxed text-sm">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}

        </div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="lg:col-span-2 mt-8 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500"
        >
          <div className="text-center">
            <motion.div
              className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6"
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
              Dúvidas sobre Privacidade?
            </motion.h2>
            
            <motion.p
              className="text-white/80 mb-8 max-w-3xl mx-auto text-lg leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Nossa equipe de proteção de dados está disponível para esclarecer qualquer dúvida sobre o tratamento 
              de seus dados pessoais e seus direitos conforme a LGPD. Entre em contato conosco.
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
                className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <FileText className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                Entre em Contato
              </motion.a>
              
              <motion.a
                href="/lgpd"
                className="group inline-flex items-center justify-center px-8 py-4 bg-white/10 text-white rounded-xl font-medium hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-white/40"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Shield className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                Saiba mais sobre LGPD
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PolicyPage;
