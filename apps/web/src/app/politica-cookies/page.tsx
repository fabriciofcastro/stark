import { Metadata } from "next";
import { Cookie, Settings, BarChart3, Target, Shield, Info, Clock, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Política de Cookies - STARK Tecnologia",
  description: "Entenda como a STARK Tecnologia utiliza cookies para melhorar sua experiência e como gerenciar suas preferências.",
  keywords: "política de cookies, cookies, navegação, STARK, tecnologia, LGPD",
};

const CookiePolicyPage = () => {
  const cookieTypes = [
    {
      icon: Shield,
      name: "Cookies Necessários",
      description: "Essenciais para o funcionamento básico do site",
      examples: [
        "Preferências de idioma",
        "Dados de sessão",
        "Configurações de segurança",
        "Funcionalidades básicas do site"
      ],
      duration: "Sessão",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: BarChart3,
      name: "Cookies de Análise",
      description: "Nos ajudam a entender como você usa o site",
      examples: [
        "Google Analytics",
        "Métricas de desempenho",
        "Estatísticas de uso",
        "Análise de comportamento"
      ],
      duration: "2 anos",
      color: "from-blue-500 to-cyan-600"
    },
    {
      icon: Target,
      name: "Cookies de Performance",
      description: "Melhoram a velocidade e funcionalidade",
      examples: [
        "Cache de recursos",
        "Otimização de carregamento",
        "CDN e distribuição",
        "Compressão de dados"
      ],
      duration: "1 ano",
      color: "from-purple-500 to-indigo-600"
    },
    {
      icon: Target,
      name: "Cookies de Marketing",
      description: "Personalizam anúncios e conteúdo",
      examples: [
        "Publicidade direcionada",
        "Remarketing",
        "Análise de conversão",
        "Campanhas personalizadas"
      ],
      duration: "6 meses",
      color: "from-orange-500 to-red-600"
    }
  ];

  const managementSteps = [
    {
      icon: Settings,
      title: "Gerenciar no Site",
      description: "Use nosso modal de cookies para personalizar suas preferências",
      action: "Clique no ícone de cookies no canto inferior"
    },
    {
      icon: Cookie,
      title: "Configurações do Navegador",
      description: "Configure cookies diretamente no seu navegador",
      action: "Acesse Configurações > Privacidade > Cookies"
    },
    {
      icon: Shield,
      title: "Ferramentas de Terceiros",
      description: "Use ferramentas especializadas para gerenciar cookies",
      action: "Opt-out em redes publicitárias"
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
              <Cookie className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
              Política de Cookies
            </h1>
            
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Entenda como utilizamos cookies para melhorar sua experiência no site da STARK Tecnologia 
              e como você pode gerenciar suas preferências.
            </p>

            <div className="flex items-center justify-center space-x-2 mt-6 text-sm text-white/60">
              <Clock className="w-4 h-4" />
              <span>Última atualização: {new Date().toLocaleDateString('pt-BR')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* What are Cookies */}
        <div className="mb-16">
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <Info className="w-6 h-6 text-white" />
                </div>
              </div>
              
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-4">
                  O que são Cookies?
                </h2>
                <p className="text-white/80 leading-relaxed mb-4">
                  Cookies são pequenos arquivos de texto armazenados no seu dispositivo quando você visita nosso site. 
                  Eles nos ajudam a fornecer uma experiência personalizada e melhorar a funcionalidade do site.
                </p>
                <p className="text-white/80 leading-relaxed">
                  Utilizamos cookies de forma transparente e responsável, sempre respeitando sua privacidade e 
                  oferecendo controle sobre quais tipos de cookies aceitar.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Cookie Types */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Tipos de Cookies que Utilizamos
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {cookieTypes.map((cookie, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${cookie.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <cookie.icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {cookie.name}
                    </h3>
                    <p className="text-white/70 mb-4">
                      {cookie.description}
                    </p>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-white/90 mb-2">Exemplos:</h4>
                      <ul className="space-y-1">
                        {cookie.examples.map((example, exampleIndex) => (
                          <li key={exampleIndex} className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full" />
                            <span className="text-white/70 text-sm">{example}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/60">Duração:</span>
                      <span className="text-white/80 font-medium">{cookie.duration}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Management */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Como Gerenciar Cookies
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {managementSteps.map((step, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3">
                  {step.title}
                </h3>
                
                <p className="text-white/70 mb-4 leading-relaxed">
                  {step.description}
                </p>
                
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="text-white/80 text-sm font-medium">
                    {step.action}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Your Rights */}
        <div className="mb-16">
          <div className="bg-gradient-to-r from-purple-600/20 to-cyan-500/20 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">
                Seus Direitos
              </h2>
              <p className="text-white/80 max-w-2xl mx-auto">
                Você tem controle total sobre os cookies. Pode aceitar, recusar ou personalizar 
                suas preferências a qualquer momento.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Você pode:</h3>
                <ul className="space-y-2">
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-white/80">Aceitar todos os cookies</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-white/80">Recusar cookies opcionais</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-white/80">Personalizar por categoria</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-white/80">Alterar preferências a qualquer momento</span>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Impacto:</h3>
                <ul className="space-y-2">
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0" />
                    <span className="text-white/80">Funcionalidade básica sempre mantida</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0" />
                    <span className="text-white/80">Experiência personalizada opcional</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full flex-shrink-0" />
                    <span className="text-white/80">Analytics para melhorias do site</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-orange-400 rounded-full flex-shrink-0" />
                    <span className="text-white/80">Marketing direcionado (opcional)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Dúvidas sobre Cookies?
          </h2>
          <p className="text-white/80 mb-6 max-w-2xl mx-auto">
            Nossa equipe está disponível para esclarecer qualquer dúvida sobre nossa política de cookies 
            e como gerenciar suas preferências.
          </p>
          
          <a
            href="/contato"
            className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-500 text-white rounded-xl font-medium hover:from-purple-700 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
          >
            <Settings className="w-5 h-5 mr-2" />
            Entre em Contato
          </a>
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

export default CookiePolicyPage;
