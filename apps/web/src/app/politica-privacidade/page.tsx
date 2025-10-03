import { Metadata } from "next";
import { Shield, Eye, Lock, Database, Users, FileText, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Política de Privacidade - STARK Tecnologia",
  description: "Conheça como a STARK Tecnologia protege e utiliza seus dados pessoais em conformidade com a LGPD.",
  keywords: "política de privacidade, LGPD, proteção de dados, STARK, tecnologia",
};

const PolicyPage = () => {
  const sections = [
    {
      icon: Eye,
      title: "1. Informações que Coletamos",
      content: [
        "Dados pessoais fornecidos voluntariamente através de formulários de contato",
        "Informações de navegação e comportamento no site (cookies)",
        "Dados de comunicação via WhatsApp e e-mail",
        "Informações técnicas do dispositivo e navegador"
      ]
    },
    {
      icon: Lock,
      title: "2. Como Utilizamos seus Dados",
      content: [
        "Responder a solicitações de contato e orçamentos",
        "Melhorar nossos serviços e experiência do usuário",
        "Enviar comunicações relevantes sobre nossos serviços",
        "Cumprir obrigações legais e regulamentares"
      ]
    },
    {
      icon: Database,
      title: "3. Compartilhamento de Informações",
      content: [
        "Não vendemos, alugamos ou compartilhamos dados pessoais",
        "Podemos compartilhar dados apenas com prestadores de serviços confiáveis",
        "Divulgação obrigatória por força de lei ou processo judicial",
        "Com consentimento expresso do titular dos dados"
      ]
    },
    {
      icon: Shield,
      title: "4. Segurança dos Dados",
      content: [
        "Implementamos medidas técnicas e organizacionais de segurança",
        "Criptografia de dados sensíveis em trânsito e repouso",
        "Acesso restrito apenas a pessoal autorizado",
        "Monitoramento contínuo de segurança"
      ]
    },
    {
      icon: Users,
      title: "5. Seus Direitos (LGPD)",
      content: [
        "Confirmar a existência de tratamento de dados pessoais",
        "Acessar seus dados pessoais",
        "Corrigir dados incompletos, inexatos ou desatualizados",
        "Anonimizar, bloquear ou eliminar dados desnecessários",
        "Portabilidade dos dados para outro fornecedor",
        "Eliminar dados tratados com consentimento",
        "Revogar o consentimento a qualquer momento"
      ]
    },
    {
      icon: FileText,
      title: "6. Cookies e Tecnologias Similares",
      content: [
        "Utilizamos cookies para melhorar a experiência do usuário",
        "Cookies essenciais para funcionamento básico do site",
        "Cookies de análise para entender o comportamento dos visitantes",
        "Você pode gerenciar preferências de cookies a qualquer momento"
      ]
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
              <Shield className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
              Política de Privacidade
            </h1>
            
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Transparência e proteção dos seus dados pessoais são prioridades para a STARK Tecnologia. 
              Conheça como coletamos, utilizamos e protegemos suas informações.
            </p>

            <div className="flex items-center justify-center space-x-2 mt-6 text-sm text-white/60">
              <Clock className="w-4 h-4" />
              <span>Última atualização: {new Date().toLocaleDateString('pt-BR')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Sections */}
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

          {/* Contact Section */}
          <div className="bg-gradient-to-r from-purple-600/20 to-cyan-500/20 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-4">
                Dúvidas sobre Privacidade?
              </h2>
              <p className="text-white/80 mb-6 max-w-2xl mx-auto">
                Nossa equipe está disponível para esclarecer qualquer dúvida sobre o tratamento 
                de seus dados pessoais e seus direitos conforme a LGPD.
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
                  href="/lgpd"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white/10 text-white rounded-xl font-medium hover:bg-white/20 transition-all duration-300 border border-white/20"
                >
                  <Shield className="w-5 h-5 mr-2" />
                  Saiba mais sobre LGPD
                </a>
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

export default PolicyPage;
