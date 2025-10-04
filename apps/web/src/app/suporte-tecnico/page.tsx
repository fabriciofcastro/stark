import { Metadata } from "next";
import { generateAdvancedSEO, generateStructuredData, SERVICE_KEYWORDS } from "@/lib/seo-advanced";
import { AdvancedSEOProvider, SEOBreadcrumb, SEOFAQ } from "@/components/seo/advanced-seo-provider";

const seoConfig = {
  title: "Suporte Técnico Especializado - STARK Tecnologia",
  description: "Suporte técnico profissional para empresas em São Paulo. Manutenção de computadores, help desk, suporte remoto e assistência técnica especializada. Resposta em até 2 horas.",
  keywords: SERVICE_KEYWORDS["suporte-tecnico"],
  canonical: "/suporte-tecnico",
  ogType: "service" as const,
  breadcrumbs: [
    { name: "Serviços", url: "/services" },
    { name: "Suporte Técnico", url: "/suporte-tecnico" },
  ],
  faq: [
    {
      question: "Qual o tempo de resposta para suporte técnico?",
      answer: "Oferecemos resposta em até 2 horas para chamados de suporte técnico, com resolução prioritária para problemas críticos que afetam a operação da empresa.",
    },
    {
      question: "Vocês oferecem suporte remoto?",
      answer: "Sim, oferecemos suporte remoto seguro e eficiente, permitindo resolver a maioria dos problemas sem necessidade de deslocamento, economizando tempo e recursos.",
    },
    {
      question: "Qual a cobertura geográfica do suporte?",
      answer: "Atendemos toda a região metropolitana de São Paulo, com foco em Itaquaquecetuba e municípios vizinhos, oferecendo suporte presencial quando necessário.",
    },
    {
      question: "Que tipos de problemas vocês resolvem?",
      answer: "Resolvemos problemas de hardware, software, redes, servidores, segurança, backup, atualizações, instalações e configurações de sistemas operacionais e aplicações.",
    },
    {
      question: "Vocês oferecem manutenção preventiva?",
      answer: "Sim, oferecemos planos de manutenção preventiva que incluem monitoramento, atualizações, backup automático e relatórios de performance para evitar problemas futuros.",
    },
  ],
  service: {
    name: "Suporte Técnico Especializado",
    description: "Suporte técnico profissional para empresas com resposta em até 2 horas, manutenção preventiva e assistência remota e presencial.",
    category: "Serviços de TI",
  },
  localBusiness: {
    name: "STARK Solutions",
    address: "Av. Paulista, 1000, Itaquaquecetuba - SP",
    phone: "+55-11-99439-6469",
    email: "contato@starksolutions.com.br",
    openingHours: [
      "Segunda-Feira 08:00-18:00",
      "Terça-Feira 08:00-18:00",
      "Quarta-Feira 08:00-18:00",
      "Quinta-Feira 08:00-18:00",
      "Sexta-Feira 08:00-18:00",
      "Sábado 08:00-12:00",
    ],
    serviceArea: [
      "São Paulo",
      "Itaquaquecetuba",
      "Guarulhos",
      "Suzano",
      "Mogi das Cruzes",
      "Arujá",
      "Santa Isabel",
      "Ferraz de Vasconcelos",
    ],
  },
};

export const metadata: Metadata = generateAdvancedSEO(seoConfig);

const structuredData = generateStructuredData(seoConfig);

export default function SuporteTecnicoPage() {
  return (
    <AdvancedSEOProvider
      structuredData={structuredData}
      breadcrumbs={seoConfig.breadcrumbs}
      faq={seoConfig.faq}
    >
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900">
        <div className="container mx-auto px-4 py-16">
          <SEOBreadcrumb items={seoConfig.breadcrumbs} />
          
          <header className="text-center mb-16">
            <h1 className="text-5xl font-bold text-white mb-6">
              Suporte Técnico <span className="text-cyan-400">Especializado</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Oferecemos suporte técnico profissional para empresas com resposta em até 2 horas, 
              manutenção preventiva e assistência remota e presencial em toda região de São Paulo.
            </p>
          </header>

          <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div className="space-y-8">
              <div className="bg-white/5 rounded-xl p-6">
                <h2 className="text-2xl font-bold text-white mb-4">Nossos Serviços</h2>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center space-x-3">
                    <span className="text-cyan-400">✓</span>
                    <span>Suporte remoto seguro e eficiente</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="text-cyan-400">✓</span>
                    <span>Manutenção preventiva de sistemas</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="text-cyan-400">✓</span>
                    <span>Instalação e configuração de software</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="text-cyan-400">✓</span>
                    <span>Resolução de problemas de hardware</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="text-cyan-400">✓</span>
                    <span>Configuração de redes e servidores</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="text-cyan-400">✓</span>
                    <span>Backup e recuperação de dados</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 rounded-xl p-6">
                <h2 className="text-2xl font-bold text-white mb-4">Por que escolher a STARK?</h2>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center space-x-3">
                    <span className="text-cyan-400">⚡</span>
                    <span>Resposta em até 2 horas</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="text-cyan-400">🛡️</span>
                    <span>Equipe certificada e especializada</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="text-cyan-400">📞</span>
                    <span>Suporte 24/7 para emergências</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="text-cyan-400">💼</span>
                    <span>Experiência com empresas de todos os portes</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-xl p-6 border border-cyan-500/20">
                <h2 className="text-2xl font-bold text-white mb-4">Área de Atendimento</h2>
                <p className="text-gray-300 mb-4">
                  Atendemos toda a região metropolitana de São Paulo com foco em:
                </p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {seoConfig.localBusiness.serviceArea.map((area, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <span className="text-cyan-400">📍</span>
                      <span className="text-gray-300">{area}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl p-6 border border-purple-500/20">
                <h2 className="text-2xl font-bold text-white mb-4">Contato Rápido</h2>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-cyan-400">📞</span>
                    <a href="tel:+5511994396469" className="text-white hover:text-cyan-400 transition-colors">
                      (11) 99439-6469
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-cyan-400">✉️</span>
                    <a href="mailto:contato@starksolutions.com.br" className="text-white hover:text-cyan-400 transition-colors">
                      contato@starksolutions.com.br
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-cyan-400">⏰</span>
                    <span className="text-gray-300">Seg-Sex: 8h às 18h | Sáb: 8h às 12h</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <SEOFAQ faqs={seoConfig.faq} />

          <section className="text-center mt-16">
            <h2 className="text-3xl font-bold text-white mb-6">
              Pronto para melhorar seu suporte técnico?
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Entre em contato conosco e descubra como podemos otimizar a tecnologia da sua empresa 
              com suporte técnico especializado e eficiente.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-cyan-600 hover:to-purple-700 transition-all duration-300"
              >
                Solicitar Orçamento
              </a>
              <a
                href="tel:+5511994396469"
                className="border border-cyan-400 text-cyan-400 px-8 py-3 rounded-lg font-semibold hover:bg-cyan-400 hover:text-white transition-all duration-300"
              >
                Ligar Agora
              </a>
            </div>
          </section>
        </div>
      </div>
    </AdvancedSEOProvider>
  );
}