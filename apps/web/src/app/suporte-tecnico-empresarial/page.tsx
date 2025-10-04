import { Metadata } from "next";
import { generateAdvancedSEO, generateStructuredData, SERVICE_KEYWORDS } from "@/lib/seo-advanced";
import { AdvancedSEOProvider, SEOBreadcrumb, SEOFAQ } from "@/components/seo/advanced-seo-provider";
import { ContentOptimization, OptimizedHeading, OptimizedList, OptimizedTable } from "@/components/seo/content-optimization";

const seoConfig = {
  title: "Suporte Técnico Empresarial - Soluções Corporativas STARK",
  description: "Suporte técnico empresarial especializado para grandes empresas. Help desk corporativo, manutenção de servidores, gestão de infraestrutura e suporte 24/7 em São Paulo.",
  keywords: [
    ...SERVICE_KEYWORDS["suporte-tecnico"],
    "suporte técnico empresarial",
    "help desk corporativo",
    "suporte técnico empresas",
    "manutenção servidores",
    "gestão infraestrutura",
    "suporte 24/7",
    "suporte técnico corporativo",
    "assistência técnica empresas",
    "manutenção preventiva corporativa",
    "suporte técnico São Paulo empresas",
    "help desk especializado",
    "gestão TI empresas",
    "suporte técnico grande porte",
  ],
  canonical: "/suporte-tecnico-empresarial",
  ogType: "service" as const,
  breadcrumbs: [
    { name: "Serviços", url: "/services" },
    { name: "Suporte Técnico Empresarial", url: "/suporte-tecnico-empresarial" },
  ],
  faq: [
    {
      question: "Qual a diferença entre suporte técnico comum e empresarial?",
      answer: "O suporte técnico empresarial é especializado para grandes empresas, oferecendo SLAs específicos, equipe dedicada, monitoramento 24/7 e soluções escaláveis para ambientes corporativos complexos.",
    },
    {
      question: "Vocês oferecem SLA (Service Level Agreement)?",
      answer: "Sim, oferecemos SLAs personalizados com tempos de resposta garantidos: 1 hora para problemas críticos, 4 horas para problemas de alta prioridade e 8 horas para problemas padrão.",
    },
    {
      question: "Como funciona o suporte 24/7 para empresas?",
      answer: "Nossa equipe de suporte 24/7 monitora continuamente sua infraestrutura, oferecendo resposta imediata para problemas críticos e manutenção preventiva durante horários de menor movimento.",
    },
    {
      question: "Vocês trabalham com empresas de qual porte?",
      answer: "Atendemos empresas de todos os portes, desde pequenas empresas até grandes corporações, adaptando nossos serviços e recursos conforme a necessidade e complexidade do ambiente.",
    },
    {
      question: "Que tipos de infraestrutura vocês suportam?",
      answer: "Suportamos ambientes Windows Server, Linux, virtualização VMware/Hyper-V, cloud computing, redes corporativas, servidores de banco de dados, aplicações críticas e sistemas legados.",
    },
    {
      question: "Como é feito o monitoramento da infraestrutura?",
      answer: "Utilizamos ferramentas avançadas de monitoramento que verificam continuamente servidores, aplicações, redes e serviços, enviando alertas automáticos e gerando relatórios detalhados de performance.",
    },
  ],
  service: {
    name: "Suporte Técnico Empresarial",
    description: "Suporte técnico especializado para empresas com SLAs garantidos, monitoramento 24/7 e equipe dedicada para ambientes corporativos complexos.",
    category: "Serviços de TI Corporativos",
    price: "Sob consulta",
  },
  localBusiness: {
    name: "STARK Solutions",
    address: "Av. Paulista, 1000, Itaquaquecetuba - SP",
    phone: "+55-11-99439-6469",
    email: "contato@starksolutions.com.br",
    openingHours: [
      "Segunda-Feira 00:00-23:59",
      "Terça-Feira 00:00-23:59",
      "Quarta-Feira 00:00-23:59",
      "Quinta-Feira 00:00-23:59",
      "Sexta-Feira 00:00-23:59",
      "Sábado 00:00-23:59",
      "Domingo 00:00-23:59",
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
      "Região Metropolitana de São Paulo",
    ],
  },
};

export const metadata: Metadata = generateAdvancedSEO(seoConfig);

const structuredData = generateStructuredData(seoConfig);

export default function SuporteTecnicoEmpresarialPage() {
  return (
    <AdvancedSEOProvider
      structuredData={structuredData}
      breadcrumbs={seoConfig.breadcrumbs}
      faq={seoConfig.faq}
    >
      <ContentOptimization targetKeywords={seoConfig.keywords}>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900">
          <div className="container mx-auto px-4 py-16">
            <SEOBreadcrumb items={seoConfig.breadcrumbs} />
            
            <header className="text-center mb-16">
              <OptimizedHeading level={1} className="text-5xl font-bold text-white mb-6">
                Suporte Técnico <span className="text-cyan-400">Empresarial</span>
              </OptimizedHeading>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Soluções de suporte técnico especializado para empresas de grande porte. 
                SLAs garantidos, monitoramento 24/7 e equipe dedicada para ambientes corporativos complexos.
              </p>
            </header>

            <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
              <div className="space-y-8">
                <div className="bg-white/5 rounded-xl p-6">
                  <OptimizedHeading level={2} className="text-2xl font-bold text-white mb-4">
                    Nossos Serviços Empresariais
                  </OptimizedHeading>
                  <OptimizedList items={[
                    "Suporte técnico 24/7 com SLA garantido",
                    "Monitoramento proativo de infraestrutura",
                    "Help desk corporativo especializado",
                    "Manutenção preventiva de servidores",
                    "Gestão de infraestrutura de TI",
                    "Suporte para ambientes virtualizados",
                    "Backup e recuperação de desastres",
                    "Consultoria em segurança da informação",
                    "Migração e modernização de sistemas",
                    "Suporte para aplicações críticas",
                  ]} />
                </div>

                <div className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-xl p-6 border border-cyan-500/20">
                  <OptimizedHeading level={2} className="text-2xl font-bold text-white mb-4">
                    SLAs Garantidos
                  </OptimizedHeading>
                  <OptimizedTable
                    headers={["Prioridade", "Tempo de Resposta", "Tempo de Resolução"]}
                    rows={[
                      ["Crítica", "1 hora", "4 horas"],
                      ["Alta", "4 horas", "8 horas"],
                      ["Média", "8 horas", "24 horas"],
                      ["Baixa", "24 horas", "72 horas"],
                    ]}
                    caption="Tempos de resposta e resolução garantidos por contrato"
                  />
                </div>
              </div>

              <div className="space-y-8">
                <div className="bg-white/5 rounded-xl p-6">
                  <OptimizedHeading level={2} className="text-2xl font-bold text-white mb-4">
                    Tecnologias Suportadas
                  </OptimizedHeading>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <h3 className="font-semibold text-cyan-400 mb-2">Sistemas Operacionais</h3>
                      <OptimizedList items={[
                        "Windows Server 2016/2019/2022",
                        "Linux (Ubuntu, CentOS, RHEL)",
                        "VMware vSphere",
                        "Microsoft Hyper-V",
                      ]} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-cyan-400 mb-2">Aplicações</h3>
                      <OptimizedList items={[
                        "Microsoft Exchange",
                        "SQL Server / MySQL",
                        "Active Directory",
                        "SAP / ERP Systems",
                      ]} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-cyan-400 mb-2">Cloud & Virtualização</h3>
                      <OptimizedList items={[
                        "Microsoft Azure",
                        "Amazon AWS",
                        "Google Cloud Platform",
                        "VMware Cloud",
                      ]} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-cyan-400 mb-2">Segurança</h3>
                      <OptimizedList items={[
                        "Firewalls corporativos",
                        "Antivírus empresarial",
                        "Backup automatizado",
                        "Monitoramento de segurança",
                      ]} />
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl p-6 border border-purple-500/20">
                  <OptimizedHeading level={2} className="text-2xl font-bold text-white mb-4">
                    Monitoramento 24/7
                  </OptimizedHeading>
                  <OptimizedList items={[
                    "Monitoramento contínuo de servidores",
                    "Alertas automáticos por email/SMS",
                    "Dashboard em tempo real",
                    "Relatórios de performance mensais",
                    "Análise proativa de problemas",
                    "Prevenção de falhas críticas",
                  ]} />
                </div>
              </div>
            </section>

            <section className="mb-16">
              <OptimizedHeading level={2} className="text-3xl font-bold text-white mb-8 text-center">
                Benefícios do Suporte Empresarial
              </OptimizedHeading>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white/5 rounded-xl p-6 text-center">
                  <div className="text-4xl mb-4">⚡</div>
                  <h3 className="text-xl font-bold text-white mb-3">Resposta Rápida</h3>
                  <p className="text-gray-300">
                    Tempos de resposta garantidos por SLA, com priorização de problemas críticos 
                    que afetam a operação da empresa.
                  </p>
                </div>
                <div className="bg-white/5 rounded-xl p-6 text-center">
                  <div className="text-4xl mb-4">🛡️</div>
                  <h3 className="text-xl font-bold text-white mb-3">Prevenção Proativa</h3>
                  <p className="text-gray-300">
                    Monitoramento contínuo e manutenção preventiva para evitar problemas 
                    antes que afetem a produtividade.
                  </p>
                </div>
                <div className="bg-white/5 rounded-xl p-6 text-center">
                  <div className="text-4xl mb-4">📊</div>
                  <h3 className="text-xl font-bold text-white mb-3">Relatórios Detalhados</h3>
                  <p className="text-gray-300">
                    Relatórios mensais com métricas de performance, disponibilidade e 
                    análise de tendências para tomada de decisão.
                  </p>
                </div>
              </div>
            </section>

            <SEOFAQ faqs={seoConfig.faq} />

            <section className="text-center mt-16">
              <OptimizedHeading level={2} className="text-3xl font-bold text-white mb-6">
                Pronto para otimizar seu suporte técnico empresarial?
              </OptimizedHeading>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                Entre em contato conosco e descubra como podemos elevar a qualidade do seu 
                suporte técnico com soluções especializadas para empresas.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-cyan-600 hover:to-purple-700 transition-all duration-300"
                >
                  Solicitar Proposta
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
      </ContentOptimization>
    </AdvancedSEOProvider>
  );
}