"use client";

const CaseStudies = () => {
  const cases = [
    {
      id: 1,
      title: "Transformação Digital em Indústria",
      company: "Indústria Metalúrgica",
      description: "Implementação de infraestrutura cloud com automação e monitoramento",
      results: [
        "Redução de 40% nos custos operacionais",
        "Aumento de 99.95% de uptime",
        "Redução de 60% no tempo de resposta a incidentes"
      ],
      industry: "Manufatura",
      timeframe: "6 meses",
      investment: "R$ 1.2M"
    },
    {
      id: 2,
      title: "Governança e Segurança para Finanças",
      company: "Instituição Financeira",
      description: "Estruturação de governança de TI e segurança da informação",
      results: [
        "Conformidade com normas do BACEN",
        "100% de compliance com LGPD",
        "Redução de 85% nos riscos de segurança"
      ],
      industry: "Finanças",
      timeframe: "8 meses",
      investment: "R$ 2.5M"
    },
    {
      id: 3,
      title: "Migração para Nuvem Segura",
      company: "Rede de Varejo",
      description: "Migração de infraestrutura legada para cloud com segurança",
      results: [
        "99.99% de disponibilidade",
        "Redução de 50% nos custos de infra",
        "Melhoria de 70% na performance"
      ],
      industry: "Varejo",
      timeframe: "4 meses",
      investment: "R$ 800K"
    },
    {
      id: 4,
      title: "E-commerce de Alto Tráfego",
      company: "E-commerce Nacional",
      description: "Arquitetura de alta disponibilidade e escalabilidade",
      results: [
        "Suporte a 100K+ visitas/dia",
        "Tempo de carregamento < 2s",
        "Aumento de 35% na conversão"
      ],
      industry: "E-commerce",
      timeframe: "5 meses",
      investment: "R$ 1.8M"
    }
  ];

  return (
    <section className="py-16 container-px">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Cases de Sucesso Corporativo
          </h3>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Histórias reais de transformação digital e segurança para grandes corporações
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cases.map((caso) => (
            <div 
              key={caso.id} 
              className="bg-card rounded-xl border border-white/10 overflow-hidden hover:border-brand-gold-500/30 transition-all duration-300"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="inline-block px-3 py-1 text-xs rounded-full bg-brand-gold-500/20 text-brand-gold-400 mb-2">
                      {caso.industry}
                    </span>
                    <h4 className="text-xl font-bold text-white mb-1">{caso.title}</h4>
                    <p className="text-brand-gold-400 font-medium">{caso.company}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-400">Prazo</div>
                    <div className="text-white font-semibold">{caso.timeframe}</div>
                  </div>
                </div>
                
                <p className="text-gray-300 mb-4">{caso.description}</p>
                
                <div className="mb-4">
                  <h5 className="text-sm font-semibold text-gray-400 mb-2">Resultados:</h5>
                  <ul className="space-y-1">
                    {caso.results.map((result, idx) => (
                      <li key={idx} className="flex items-start">
                        <svg className="w-4 h-4 text-brand-gold-500 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span className="text-gray-200 text-sm">{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex justify-between items-center pt-4 border-t border-white/10">
                  <div>
                    <div className="text-xs text-gray-400">Investimento</div>
                    <div className="text-white font-semibold">{caso.investment}</div>
                  </div>
                  <button className="text-sm px-4 py-2 bg-brand-gold-500 hover:bg-brand-gold-600 text-black rounded-lg transition-colors">
                    Ver detalhes
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-300 mb-6">
            Mais de <span className="text-brand-gold-500 font-bold text-2xl">200+</span> empresas corporativas 
            confiam em nossas soluções de tecnologia
          </p>
          <button className="px-6 py-3 border border-brand-gold-500 text-brand-gold-500 hover:bg-brand-gold-500 hover:text-black rounded-lg transition-colors">
            Ver todos os cases
          </button>
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;