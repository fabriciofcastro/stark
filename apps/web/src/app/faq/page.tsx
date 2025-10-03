import { Metadata } from "next";
import { HelpCircle, ChevronDown, ChevronUp, Search, MessageCircle, Phone, Mail, Clock, Star, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "FAQ - Perguntas Frequentes - STARK Tecnologia",
  description: "Encontre respostas para as perguntas mais frequentes sobre os serviços da STARK Tecnologia.",
  keywords: "FAQ, perguntas frequentes, dúvidas, STARK, tecnologia, suporte, ajuda",
};

const FAQPage = () => {
  const faqs = [
    {
      category: "Serviços Gerais",
      icon: "🔧",
      questions: [
        {
          question: "Quais serviços a STARK oferece?",
          answer: "Oferecemos soluções completas em tecnologia: consultoria estratégica, desenvolvimento de software, migração para nuvem, cibersegurança, suporte técnico 24/7, e infraestrutura de TI. Nossa expertise abrange desde pequenas empresas até grandes corporações."
        },
        {
          question: "Como funciona o processo de consultoria?",
          answer: "Nosso processo de consultoria inclui: análise inicial da infraestrutura atual, identificação de oportunidades de melhoria, desenvolvimento de roadmap personalizado, implementação gradual das soluções e acompanhamento contínuo para garantir resultados."
        },
        {
          question: "Vocês atendem empresas de todos os portes?",
          answer: "Sim! Atendemos desde startups e pequenas empresas até grandes corporações. Nossas soluções são escaláveis e adaptáveis às necessidades específicas de cada cliente, independentemente do tamanho da empresa."
        }
      ]
    },
    {
      category: "Cibersegurança",
      icon: "🔒",
      questions: [
        {
          question: "Que tipos de testes de segurança vocês realizam?",
          answer: "Realizamos pentest completo (web, infraestrutura, Wi-Fi), auditoria de segurança, análise de vulnerabilidades, testes de penetração em aplicações, e avaliação de compliance com LGPD e outras regulamentações."
        },
        {
          question: "Como funciona o SOC/MDR?",
          answer: "Nosso SOC (Security Operations Center) oferece monitoramento 24/7, detecção proativa de ameaças, resposta rápida a incidentes, análise forense e relatórios detalhados. O MDR (Managed Detection and Response) inclui resposta automatizada e manual a ameaças."
        },
        {
          question: "Quanto tempo leva para implementar a segurança?",
          answer: "O tempo varia conforme a complexidade, mas geralmente: auditoria inicial (1-2 semanas), implementação de controles básicos (2-4 semanas), configuração do SOC/MDR (1-2 semanas), e treinamento da equipe (1 semana)."
        }
      ]
    },
    {
      category: "Nuvem e Infraestrutura",
      icon: "☁️",
      questions: [
        {
          question: "Qual é o processo de migração para nuvem?",
          answer: "Nosso processo inclui: análise da infraestrutura atual, planejamento da migração, criação de ambiente piloto, migração gradual sem downtime, testes de performance, otimização de custos e treinamento da equipe."
        },
        {
          question: "Vocês trabalham com quais provedores de nuvem?",
          answer: "Trabalhamos com AWS, Microsoft Azure, Google Cloud Platform e provedores nacionais. Escolhemos o melhor provedor baseado nas necessidades específicas de cada cliente, considerando custos, performance e requisitos regulatórios."
        },
        {
          question: "Como garantem a alta disponibilidade?",
          answer: "Implementamos redundância em múltiplas camadas: servidores duplicados, balanceamento de carga, backup automático, disaster recovery, monitoramento 24/7 e SLA de 99.9% de uptime garantido."
        }
      ]
    },
    {
      category: "Suporte e SLA",
      icon: "📞",
      questions: [
        {
          question: "Qual é o tempo de resposta do suporte?",
          answer: "Nosso SLA garante: resposta em 4 horas para problemas críticos, 8 horas para problemas altos, 24 horas para problemas médios, e 48 horas para consultas gerais. Disponibilidade 24/7 para clientes com contrato premium."
        },
        {
          question: "Como funciona o suporte remoto?",
          answer: "Oferecemos suporte remoto seguro através de conexões criptografadas, acesso sob demanda com aprovação prévia, sessões gravadas para auditoria, e relatórios detalhados de todas as atividades realizadas."
        },
        {
          question: "Vocês oferecem treinamento para nossa equipe?",
          answer: "Sim! Oferecemos treinamentos personalizados em segurança, gestão de nuvem, boas práticas de TI, e uso de ferramentas específicas. Incluímos certificação e material didático atualizado."
        }
      ]
    },
    {
      category: "Preços e Contratos",
      icon: "💰",
      questions: [
        {
          question: "Como são calculados os preços?",
          answer: "Nossos preços são baseados no escopo do projeto, complexidade técnica, tempo de implementação e nível de suporte necessário. Oferecemos modelos flexíveis: projeto único, mensalidade, ou pay-per-use para serviços de nuvem."
        },
        {
          question: "Existe garantia nos serviços?",
          answer: "Sim! Oferecemos garantia de 90 dias em implementações, SLA de disponibilidade, garantia de segurança em pentests, e suporte gratuito por 30 dias após a conclusão de projetos."
        },
        {
          question: "Posso cancelar o contrato a qualquer momento?",
          answer: "Sim, mas recomendamos aviso prévio de 30 dias para serviços contínuos. Para projetos únicos, o cancelamento pode gerar custos de desmobilização. Detalhes específicos estão no contrato de cada cliente."
        }
      ]
    }
  ];

  const contactMethods = [
    {
      icon: Phone,
      title: "Telefone",
      description: "Atendimento direto",
      contact: "+55 11 99439-6469",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      description: "Resposta rápida",
      contact: "Chat direto",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: Mail,
      title: "E-mail",
      description: "Consultas detalhadas",
      contact: "contato@stark.com.br",
      color: "from-blue-500 to-cyan-600"
    },
    {
      icon: Clock,
      title: "Horário",
      description: "Disponibilidade",
      contact: "24/7 para emergências",
      color: "from-purple-500 to-indigo-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-cyan-500/20 to-indigo-600/20" />
        <div className="absolute inset-0 bg-[url('/images/patterns/grid.svg')] opacity-10" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pb-32">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-2xl mb-8">
              <HelpCircle className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
              Perguntas Frequentes
            </h1>
            
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Encontre respostas para as dúvidas mais comuns sobre nossos serviços. 
              Se não encontrar o que procura, nossa equipe está pronta para ajudar.
            </p>

            <div className="flex items-center justify-center space-x-2 mt-6 text-sm text-white/60">
              <Search className="w-4 h-4" />
              <span>Use Ctrl+F para buscar uma pergunta específica</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* FAQ Categories */}
        <div className="space-y-12">
          {faqs.map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
              <div className="flex items-center space-x-4 mb-8">
                <div className="text-4xl">{category.icon}</div>
                <h2 className="text-2xl font-bold text-white">
                  {category.category}
                </h2>
              </div>
              
              <div className="space-y-6">
                {category.questions.map((faq, faqIndex) => (
                  <div
                    key={faqIndex}
                    className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300"
                  >
                    <details className="group">
                      <summary className="flex items-center justify-between cursor-pointer list-none">
                        <h3 className="text-lg font-semibold text-white group-open:text-purple-300 transition-colors">
                          {faq.question}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <ChevronDown className="w-5 h-5 text-white/60 group-open:rotate-180 transition-transform" />
                        </div>
                      </summary>
                      
                      <div className="mt-4 pt-4 border-t border-white/10">
                        <p className="text-white/80 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </details>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-16 bg-gradient-to-r from-purple-600/20 to-cyan-500/20 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Não encontrou sua resposta?
            </h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Nossa equipe de especialistas está pronta para esclarecer qualquer dúvida 
              e ajudar você a encontrar a solução ideal para sua empresa.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/20 transition-all duration-300"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${method.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <method.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-lg font-semibold text-white mb-2">
                  {method.title}
                </h3>
                
                <p className="text-white/70 text-sm mb-3">
                  {method.description}
                </p>
                
                <p className="text-white font-medium">
                  {method.contact}
                </p>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contato"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-500 text-white rounded-xl font-medium hover:from-purple-700 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Fale Conosco
            </a>
            
            <a
              href="/suporte"
              className="inline-flex items-center justify-center px-8 py-4 bg-white/10 text-white rounded-xl font-medium hover:bg-white/20 transition-all duration-300 border border-white/20"
            >
              <Phone className="w-5 h-5 mr-2" />
              Suporte Técnico
            </a>
          </div>
        </div>

        {/* Testimonial */}
        <div className="mt-16 bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>
            
            <blockquote className="text-xl text-white/90 italic mb-6 max-w-3xl mx-auto">
              "A STARK transformou nossa infraestrutura de TI. O suporte é excepcional 
              e sempre estão disponíveis quando precisamos. Recomendo sem hesitação!"
            </blockquote>
            
            <div className="flex items-center justify-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <p className="text-white font-semibold">Cliente Premium</p>
                <p className="text-white/60 text-sm">Empresa de Tecnologia</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      </div>
    </div>
  );
};

export default FAQPage;