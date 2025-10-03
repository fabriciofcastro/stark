import { Metadata } from "next";
import { FileText, Users, Shield, AlertTriangle, CheckCircle, Clock, Scale } from "lucide-react";

export const metadata: Metadata = {
  title: "Termos de Uso - STARK Tecnologia",
  description: "Conheça os termos e condições de uso dos serviços da STARK Tecnologia.",
  keywords: "termos de uso, condições, STARK, tecnologia, serviços, contratos",
};

const TermsPage = () => {
  const sections = [
    {
      icon: Users,
      title: "1. Aceitação dos Termos",
      content: [
        "Ao acessar e utilizar nossos serviços, você concorda em cumprir estes termos",
        "Estes termos se aplicam a todos os usuários, incluindo visitantes, clientes e parceiros",
        "A não concordância com estes termos implica na não utilização de nossos serviços",
        "Reservamos o direito de atualizar estes termos a qualquer momento"
      ]
    },
    {
      icon: FileText,
      title: "2. Descrição dos Serviços",
      content: [
        "Oferecemos soluções em tecnologia da informação e transformação digital",
        "Serviços de consultoria, desenvolvimento, suporte e infraestrutura",
        "Soluções em nuvem, segurança da informação e compliance",
        "Produtos e serviços podem ser modificados conforme evolução tecnológica"
      ]
    },
    {
      icon: Shield,
      title: "3. Uso Aceitável",
      content: [
        "Utilize nossos serviços apenas para fins legais e legítimos",
        "Não utilize para atividades que violem direitos de terceiros",
        "Respeite a propriedade intelectual e direitos autorais",
        "Não realize atividades que possam prejudicar nossos sistemas"
      ]
    },
    {
      icon: AlertTriangle,
      title: "4. Limitações de Responsabilidade",
      content: [
        "Nossos serviços são fornecidos 'como estão' sem garantias expressas",
        "Não nos responsabilizamos por danos indiretos ou lucros cessantes",
        "Nossa responsabilidade é limitada ao valor pago pelos serviços",
        "Cliente é responsável por backup e segurança de seus próprios dados"
      ]
    },
    {
      icon: CheckCircle,
      title: "5. Propriedade Intelectual",
      content: [
        "Todos os direitos de propriedade intelectual pertencem à STARK",
        "Conteúdo fornecido pelo cliente permanece de sua propriedade",
        "Não concedemos licenças para uso de nossa propriedade intelectual",
        "Respeitamos direitos de propriedade intelectual de terceiros"
      ]
    },
    {
      icon: Scale,
      title: "6. Resolução de Conflitos",
      content: [
        "Conflitos serão resolvidos preferencialmente por acordo amigável",
        "Mediação e arbitragem são alternativas à via judicial",
        "Foro da comarca de São Paulo/SP para questões judiciais",
        "Legislação brasileira aplicável a estes termos"
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-cyan-500/20 to-indigo-600/20" />
        <div className="absolute inset-0 bg-[url('/images/patterns/grid.svg')] opacity-10" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-2xl mb-8">
              <FileText className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
              Termos de Uso
            </h1>
            
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Conheça os termos e condições que regem o uso de nossos serviços. 
              Transparência e clareza são fundamentais para nossa relação comercial.
            </p>

            <div className="flex items-center justify-center space-x-2 mt-6 text-sm text-white/60">
              <Clock className="w-4 h-4" />
              <span>Última atualização: {new Date().toLocaleDateString('pt-BR')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="space-y-8">
          {sections.map((section, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-xl flex items-center justify-center">
                    <section.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    {section.title}
                  </h2>
                  
                  <ul className="space-y-3">
                    {section.content.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-white/80 leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}

          {/* Prohibited Uses */}
          <div className="bg-gradient-to-r from-red-600/20 to-orange-500/20 backdrop-blur-xl rounded-2xl p-8 border border-red-500/20">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-white" />
                </div>
              </div>
              
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Usos Proibidos
                </h2>
                <p className="text-white/80 mb-4">
                  É expressamente proibido utilizar nossos serviços para:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {prohibitedUses.map((use, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-white/80 text-sm">{use}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Service Levels */}
          <div className="bg-gradient-to-r from-green-600/20 to-emerald-500/20 backdrop-blur-xl rounded-2xl p-8 border border-green-500/20">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
              </div>
              
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Níveis de Serviço
                </h2>
                <p className="text-white/80 mb-6">
                  Compromissos de qualidade e disponibilidade:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {serviceLevels.map((level, index) => (
                    <div key={index} className="bg-white/10 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-white mb-1">
                        {level.service}
                      </h3>
                      <p className="text-green-400 font-medium mb-1">
                        {level.sla}
                      </p>
                      <p className="text-white/70 text-sm">
                        {level.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              Dúvidas sobre os Termos?
            </h2>
            <p className="text-white/80 mb-6 max-w-2xl mx-auto">
              Nossa equipe jurídica está disponível para esclarecer qualquer dúvida 
              sobre estes termos e condições de uso.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contato"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-500 text-white rounded-xl font-medium hover:from-purple-700 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
              >
                <FileText className="w-5 h-5 mr-2" />
                Entre em Contato
              </a>
              
              <a
                href="/politica-privacidade"
                className="inline-flex items-center justify-center px-8 py-4 bg-white/10 text-white rounded-xl font-medium hover:bg-white/20 transition-all duration-300 border border-white/20"
              >
                <Shield className="w-5 h-5 mr-2" />
                Política de Privacidade
              </a>
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

export default TermsPage;
