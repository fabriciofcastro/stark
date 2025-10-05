"use client";

import { motion } from "framer-motion";
import { FileText, Users, Shield, AlertTriangle, CheckCircle, Clock, Scale, Globe, Zap, Cpu, Network, Lock, Database } from "lucide-react";
import { useState, useEffect } from "react";

const TermsPage = () => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; opacity: number; delay: number }>>([]);

  useEffect(() => {
    const generateParticles = () => {
      const newParticles = Array.from({ length: 40 }, (_, i) => ({
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

  const sections = [
    {
      icon: Users,
      title: "1. Aceitação dos Termos",
      content: [
        "Ao acessar e utilizar nossos serviços, você concorda em cumprir estes termos",
        "Estes termos se aplicam a todos os usuários, incluindo visitantes, clientes e parceiros",
        "A não concordância com estes termos implica na não utilização de nossos serviços",
        "Reservamos o direito de atualizar estes termos a qualquer momento",
        "Alterações serão comunicadas com antecedência mínima de 30 dias",
        "Uso continuado após alterações constitui aceitação dos novos termos"
      ]
    },
    {
      icon: FileText,
      title: "2. Descrição dos Serviços",
      content: [
        "Soluções em tecnologia da informação e transformação digital",
        "Serviços de consultoria, desenvolvimento, suporte e infraestrutura",
        "Soluções em nuvem, segurança da informação e compliance LGPD",
        "Desenvolvimento de software personalizado e integrações",
        "Treinamento e capacitação em tecnologias emergentes",
        "Produtos e serviços podem ser modificados conforme evolução tecnológica"
      ]
    },
    {
      icon: Shield,
      title: "3. Uso Aceitável e Proibições",
      content: [
        "Utilize nossos serviços apenas para fins legais e legítimos",
        "Não utilize para atividades que violem direitos de terceiros",
        "Respeite a propriedade intelectual e direitos autorais",
        "Não realize atividades que possam prejudicar nossos sistemas",
        "Proibido uso para spam, phishing ou atividades fraudulentas",
        "Proibido tentativas de acesso não autorizado ou reverse engineering"
      ]
    },
    {
      icon: AlertTriangle,
      title: "4. Limitações de Responsabilidade",
      content: [
        "Nossos serviços são fornecidos 'como estão' sem garantias expressas",
        "Não nos responsabilizamos por danos indiretos ou lucros cessantes",
        "Nossa responsabilidade é limitada ao valor pago pelos serviços",
        "Cliente é responsável por backup e segurança de seus próprios dados",
        "Não garantimos disponibilidade 100% dos serviços",
        "Cliente deve manter cópias de segurança de seus dados"
      ]
    },
    {
      icon: CheckCircle,
      title: "5. Propriedade Intelectual",
      content: [
        "Todos os direitos de propriedade intelectual pertencem à STARK",
        "Conteúdo fornecido pelo cliente permanece de sua propriedade",
        "Não concedemos licenças para uso de nossa propriedade intelectual",
        "Respeitamos direitos de propriedade intelectual de terceiros",
        "Cliente garante ter direitos sobre conteúdo fornecido",
        "Violação de propriedade intelectual pode resultar em rescisão"
      ]
    },
    {
      icon: Scale,
      title: "6. Resolução de Conflitos",
      content: [
        "Conflitos serão resolvidos preferencialmente por acordo amigável",
        "Mediação e arbitragem são alternativas à via judicial",
        "Foro da comarca de São Paulo/SP para questões judiciais",
        "Legislação brasileira aplicável a estes termos",
        "Cliente pode optar por arbitragem conforme Código de Processo Civil",
        "Processo de resolução de conflitos será transparente e ágil"
      ]
    },
    {
      icon: Lock,
      title: "7. Confidencialidade",
      content: [
        "Informações confidenciais serão protegidas com máxima segurança",
        "Não divulgamos informações de clientes a terceiros",
        "Equipe assina acordos de confidencialidade (NDA)",
        "Dados são tratados conforme LGPD e políticas de privacidade",
        "Cliente pode solicitar relatório de uso de dados confidenciais",
        "Violação de confidencialidade resulta em rescisão imediata"
      ]
    },
    {
      icon: Database,
      title: "8. Proteção de Dados",
      content: [
        "Tratamento de dados conforme Lei Geral de Proteção de Dados (LGPD)",
        "Implementamos medidas técnicas e organizacionais de segurança",
        "Cliente tem direitos sobre seus dados pessoais",
        "Retenção de dados conforme finalidade e base legal",
        "Transferência internacional com garantias adequadas",
        "Notificação de incidentes de segurança em até 72 horas"
      ]
    }
  ];

  const prohibitedUses = [
    "Atividades ilegais ou que violem leis aplicáveis",
    "Transmissão de vírus, malware ou código malicioso",
    "Tentativas de acesso não autorizado a sistemas",
    "Uso para spam, phishing ou atividades fraudulentas",
    "Violação de direitos de propriedade intelectual",
    "Interferência no funcionamento normal dos serviços"
  ];

  const serviceLevels = [
    {
      service: "Suporte Técnico",
      sla: "4 horas (crítico)",
      description: "Resposta para problemas críticos"
    },
    {
      service: "Consultoria",
      sla: "24 horas",
      description: "Resposta para consultas técnicas"
    },
    {
      service: "Desenvolvimento",
      sla: "Conforme cronograma",
      description: "Entregas conforme planejado"
    },
    {
      service: "Infraestrutura",
      sla: "99.9% uptime",
      description: "Disponibilidade garantida"
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
            className="absolute w-1 h-1 bg-purple-400/30 rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
            animate={{
              y: [0, -15, 0],
              opacity: [particle.opacity, particle.opacity * 0.3, particle.opacity],
            }}
            transition={{
              duration: 2.5 + Math.random() * 1.5,
              repeat: Infinity,
              delay: particle.delay,
            }}
          />
        ))}
        
        {/* Geometric Shapes */}
        <motion.div
          className="absolute top-32 left-16 w-28 h-28 border border-purple-500/20 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute top-60 right-24 w-20 h-20 border border-cyan-500/20 rounded-lg"
          animate={{ rotate: -360 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-32 left-1/3 w-12 h-12 border border-blue-500/20 rounded-full"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        
        {/* Gradient Orbs */}
        <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/3 w-72 h-72 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl" />
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
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-cyan-600 rounded-2xl mb-8"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ duration: 0.3 }}
            >
              <FileText className="w-10 h-10 text-white" />
            </motion.div>
            
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Termos de Uso
            </motion.h1>
            
            <motion.p
              className="text-xl text-white/80 max-w-4xl mx-auto leading-relaxed mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Conheça os termos e condições que regem o uso de nossos serviços. 
              Transparência e clareza são fundamentais para nossa relação comercial.
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

      {/* Content */}
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
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-cyan-600 rounded-xl flex items-center justify-center group-hover:shadow-lg group-hover:shadow-purple-500/25">
                    <section.icon className="w-6 h-6 text-white" />
                  </div>
                </motion.div>
                
                <div className="flex-1">
                  <motion.h2
                    className="text-xl font-bold text-white mb-4 group-hover:text-purple-200 transition-colors"
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
                          className="w-2 h-2 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full mt-2 flex-shrink-0"
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

        {/* Prohibited Uses */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="lg:col-span-2 mt-8 bg-gradient-to-r from-red-600/20 to-orange-500/20 backdrop-blur-xl rounded-2xl p-8 border border-red-500/20 hover:border-red-500/30 transition-all duration-500"
        >
          <div className="flex items-start space-x-4">
            <motion.div
              className="flex-shrink-0"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
            </motion.div>
            
            <div className="flex-1">
              <motion.h2
                className="text-2xl font-bold text-white mb-4"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.3 }}
              >
                Usos Proibidos
              </motion.h2>
              <p className="text-white/80 mb-6 text-lg">
                É expressamente proibido utilizar nossos serviços para:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {prohibitedUses.map((use, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start space-x-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <motion.div
                      className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"
                      whileHover={{ scale: 1.5 }}
                      transition={{ duration: 0.2 }}
                    />
                    <span className="text-white/80 text-sm">{use}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Service Levels */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="lg:col-span-2 mt-8 bg-gradient-to-r from-green-600/20 to-emerald-500/20 backdrop-blur-xl rounded-2xl p-8 border border-green-500/20 hover:border-green-500/30 transition-all duration-500"
        >
          <div className="flex items-start space-x-4">
            <motion.div
              className="flex-shrink-0"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
            </motion.div>
            
            <div className="flex-1">
              <motion.h2
                className="text-2xl font-bold text-white mb-4"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.3 }}
              >
                Níveis de Serviço
              </motion.h2>
              <p className="text-white/80 mb-6 text-lg">
                Compromissos de qualidade e disponibilidade:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {serviceLevels.map((level, index) => (
                  <motion.div
                    key={index}
                    className="bg-white/10 rounded-lg p-4 hover:bg-white/20 transition-all duration-300"
                    whileHover={{ scale: 1.02, y: -2 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-lg font-semibold text-white mb-1">
                      {level.service}
                    </h3>
                    <p className="text-green-400 font-medium mb-1">
                      {level.sla}
                    </p>
                    <p className="text-white/70 text-sm">
                      {level.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="lg:col-span-2 mt-8 bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500 text-center"
        >
          <motion.div
            className="w-16 h-16 bg-gradient-to-br from-purple-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-6"
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ duration: 0.3 }}
          >
            <FileText className="w-8 h-8 text-white" />
          </motion.div>
          
          <motion.h2
            className="text-3xl font-bold text-white mb-4"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            Dúvidas sobre os Termos?
          </motion.h2>
          
          <motion.p
            className="text-white/80 mb-8 max-w-3xl mx-auto text-lg leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Nossa equipe jurídica está disponível para esclarecer qualquer dúvida 
            sobre estes termos e condições de uso.
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
              className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-xl font-medium hover:from-purple-700 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <FileText className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
              Entre em Contato
            </motion.a>
            
            <motion.a
              href="/politica-privacidade"
              className="group inline-flex items-center justify-center px-8 py-4 bg-white/10 text-white rounded-xl font-medium hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-white/40"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Shield className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
              Política de Privacidade
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsPage;
