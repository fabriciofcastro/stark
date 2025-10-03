import { Metadata } from "next";
import { Briefcase, ExternalLink, Star, Users, Calendar, Award, Target, TrendingUp, Shield, Cloud, Code, Database } from "lucide-react";

export const metadata: Metadata = {
  title: "Portfólio - Cases de Sucesso - STARK Tecnologia",
  description: "Conheça os projetos e cases de sucesso da STARK Tecnologia. Transformações digitais que geraram resultados reais.",
  keywords: "portfólio, cases de sucesso, projetos, transformação digital, STARK, tecnologia, resultados",
};

const PortfolioPage = () => {
  const projects = [
    {
      id: 1,
      title: "Migração Completa para Nuvem",
      client: "Empresa de Varejo",
      industry: "E-commerce",
      duration: "6 meses",
      team: "8 especialistas",
      icon: Cloud,
      color: "from-blue-500 to-cyan-600",
      challenge: "Infraestrutura legada causando lentidão e custos altos",
      solution: "Migração completa para AWS com arquitetura cloud-native",
      results: [
        "70% redução de custos operacionais",
        "99.9% de disponibilidade",
        "50% melhoria na performance",
        "Escalabilidade automática"
      ],
      technologies: ["AWS", "Docker", "Kubernetes", "Terraform", "CloudWatch"],
      testimonial: "A STARK revolucionou nossa infraestrutura. Agora temos performance excepcional com custos muito menores.",
      image: "/images/portfolio/cloud-migration.jpg"
    },
    {
      id: 2,
      title: "Implementação de SOC 24/7",
      client: "Instituição Financeira",
      industry: "Bancário",
      duration: "4 meses",
      team: "12 especialistas",
      icon: Shield,
      color: "from-green-500 to-emerald-600",
      challenge: "Necessidade de monitoramento de segurança 24/7",
      solution: "SOC completo com MDR e resposta automática a incidentes",
      results: [
        "100% cobertura de monitoramento",
        "Resposta a incidentes em 5 minutos",
        "Zero violações de segurança",
        "Compliance LGPD garantido"
      ],
      technologies: ["SIEM", "SOAR", "EDR", "XDR", "Threat Intelligence"],
      testimonial: "A segurança nunca foi tão robusta. Temos total confiança em nossa infraestrutura.",
      image: "/images/portfolio/security-soc.jpg"
    },
    {
      id: 3,
      title: "Plataforma de E-commerce",
      client: "Startup de Moda",
      industry: "Fashion",
      duration: "8 meses",
      team: "6 desenvolvedores",
      icon: Code,
      color: "from-purple-500 to-indigo-600",
      challenge: "Necessidade de plataforma escalável para crescimento rápido",
      solution: "Desenvolvimento de e-commerce moderno com arquitetura microserviços",
      results: [
        "300% aumento nas vendas online",
        "Suporte a 10.000 usuários simultâneos",
        "Tempo de carregamento < 2 segundos",
        "Integração com 15 canais de venda"
      ],
      technologies: ["React", "Node.js", "PostgreSQL", "Redis", "Docker"],
      testimonial: "A plataforma superou todas as expectativas. Crescemos muito mais rápido do que imaginávamos.",
      image: "/images/portfolio/ecommerce-platform.jpg"
    },
    {
      id: 4,
      title: "Transformação Digital Completa",
      client: "Indústria Manufatureira",
      industry: "Manufacturing",
      duration: "12 meses",
      team: "15 especialistas",
      icon: TrendingUp,
      color: "from-orange-500 to-red-600",
      challenge: "Processos manuais e sistemas desconectados",
      solution: "Implementação de ERP, automação e integração de sistemas",
      results: [
        "60% redução no tempo de processos",
        "40% aumento na produtividade",
        "Integração de 8 sistemas diferentes",
        "ROI de 250% em 18 meses"
      ],
      technologies: ["SAP", "Power BI", "Azure", "IoT", "Machine Learning"],
      testimonial: "A transformação digital mudou completamente nossa operação. Agora somos uma empresa moderna e eficiente.",
      image: "/images/portfolio/digital-transformation.jpg"
    },
    {
      id: 5,
      title: "Data Analytics e BI",
      client: "Rede de Farmácias",
      industry: "Saúde",
      duration: "5 meses",
      team: "5 especialistas",
      icon: Database,
      color: "from-cyan-500 to-blue-600",
      challenge: "Dados dispersos sem visibilidade para tomada de decisão",
      solution: "Data Lake e dashboards executivos em tempo real",
      results: [
        "Decisões baseadas em dados reais",
        "30% melhoria na gestão de estoque",
        "20% aumento na margem de lucro",
        "Relatórios automáticos diários"
      ],
      technologies: ["Power BI", "Azure Data Lake", "SQL Server", "Python", "Apache Spark"],
      testimonial: "Finalmente temos visibilidade completa do negócio. As decisões são muito mais assertivas.",
      image: "/images/portfolio/data-analytics.jpg"
    },
    {
      id: 6,
      title: "Modernização de Legados",
      client: "Empresa de Seguros",
      industry: "Insurance",
      duration: "10 meses",
      team: "10 especialistas",
      icon: Target,
      color: "from-indigo-500 to-purple-600",
      challenge: "Sistemas legados limitando crescimento e inovação",
      solution: "Modernização gradual com arquitetura de APIs e microserviços",
      results: [
        "80% redução no tempo de desenvolvimento",
        "Integração com 20+ parceiros",
        "99.5% de disponibilidade",
        "Preparação para futuro crescimento"
      ],
      technologies: [".NET Core", "Azure", "API Gateway", "Kubernetes", "DevOps"],
      testimonial: "A modernização nos deu uma nova vida. Agora podemos inovar e crescer sem limitações técnicas.",
      image: "/images/portfolio/legacy-modernization.jpg"
    }
  ];

  const stats = [
    {
      icon: Users,
      number: "150+",
      label: "Clientes Atendidos",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Briefcase,
      number: "500+",
      label: "Projetos Entregues",
      color: "from-purple-500 to-indigo-500"
    },
    {
      icon: Star,
      number: "98%",
      label: "Satisfação do Cliente",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Award,
      number: "15+",
      label: "Anos de Experiência",
      color: "from-orange-500 to-red-500"
    }
  ];

  const industries = [
    { name: "Fintech", count: 25, color: "from-blue-500 to-cyan-500" },
    { name: "E-commerce", count: 35, color: "from-purple-500 to-indigo-500" },
    { name: "Saúde", count: 20, color: "from-green-500 to-emerald-500" },
    { name: "Educação", count: 15, color: "from-orange-500 to-red-500" },
    { name: "Indústria", count: 30, color: "from-cyan-500 to-blue-500" },
    { name: "Varejo", count: 25, color: "from-pink-500 to-rose-500" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-cyan-500/20 to-indigo-600/20" />
        <div className="absolute inset-0 bg-[url('/images/patterns/grid.svg')] opacity-10" />
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pb-32">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-2xl mb-8">
              <Briefcase className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
              Nosso Portfólio
            </h1>
            
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Cases de sucesso que transformaram negócios e geraram resultados reais. 
              Cada projeto é uma história de inovação e excelência técnica.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 text-center hover:border-white/20 transition-all duration-300"
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
              <div className="text-white/70 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Projects Section */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="space-y-16">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              <div className="lg:flex lg:items-center lg:space-x-12">
                {/* Project Info */}
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-br ${project.color} rounded-2xl flex items-center justify-center`}>
                      <project.icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-2">
                        {project.title}
                      </h2>
                      <div className="flex items-center space-x-4 text-sm text-white/70">
                        <span>{project.client}</span>
                        <span>•</span>
                        <span>{project.industry}</span>
                      </div>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white/10 rounded-lg p-3">
                      <div className="text-white/60 text-sm">Duração</div>
                      <div className="text-white font-medium">{project.duration}</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3">
                      <div className="text-white/60 text-sm">Equipe</div>
                      <div className="text-white font-medium">{project.team}</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3">
                      <div className="text-white/60 text-sm">Status</div>
                      <div className="text-green-400 font-medium">Concluído</div>
                    </div>
                  </div>

                  {/* Challenge & Solution */}
                  <div className="space-y-4 mb-6">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Desafio:</h3>
                      <p className="text-white/80">{project.challenge}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Solução:</h3>
                      <p className="text-white/80">{project.solution}</p>
                    </div>
                  </div>

                  {/* Results */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-white mb-3">Resultados:</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {project.results.map((result, resultIndex) => (
                        <div key={resultIndex} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full" />
                          <span className="text-white/80 text-sm">{result}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-white mb-3">Tecnologias:</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 bg-white/10 text-white text-sm rounded-full border border-white/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Testimonial */}
                  <div className="bg-gradient-to-r from-white/10 to-white/5 rounded-xl p-4 border border-white/20">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Star className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-white/90 italic mb-2">"{project.testimonial}"</p>
                        <p className="text-white/60 text-sm">- {project.client}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Project Image Placeholder */}
                <div className="lg:w-80 lg:flex-shrink-0 mt-8 lg:mt-0">
                  <div className="aspect-video bg-gradient-to-br from-white/10 to-white/5 rounded-xl border border-white/20 flex items-center justify-center">
                    <div className="text-center">
                      <project.icon className="w-16 h-16 text-white/40 mx-auto mb-4" />
                      <p className="text-white/60 text-sm">Imagem do Projeto</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Industries Section */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Setores que Atendemos
          </h2>
          <p className="text-white/80 text-lg">
            Experiência comprovada em diversos segmentos da economia
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {industries.map((industry, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 text-center"
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${industry.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                <Briefcase className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{industry.name}</h3>
              <p className="text-white/70">{industry.count} projetos</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-gradient-to-r from-purple-600/20 to-cyan-500/20 backdrop-blur-xl rounded-2xl p-8 border border-white/10 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Pronto para seu Próximo Projeto?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Vamos transformar sua ideia em realidade. Nossa equipe está pronta para 
            criar soluções inovadoras que geram resultados reais.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contato"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-500 text-white rounded-xl font-medium hover:from-purple-700 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
            >
              <ExternalLink className="w-5 h-5 mr-2" />
              Iniciar Projeto
            </a>
            
            <a
              href="/suporte"
              className="inline-flex items-center justify-center px-8 py-4 bg-white/10 text-white rounded-xl font-medium hover:bg-white/20 transition-all duration-300 border border-white/20"
            >
              <Users className="w-5 h-5 mr-2" />
              Falar com Especialista
            </a>
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

export default PortfolioPage;