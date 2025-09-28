"use client";

const DataGovernance = () => {
  return (
    <section className="py-16 container-px">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Governança de Dados e Conformidade Corporativa
          </h3>
          <p className="text-gray-300 max-w-3xl mx-auto">
            Implementamos práticas rigorosas de governança de dados alinhadas às principais normas internacionais para proteger suas informações críticas e garantir conformidade regulatória.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-card p-6 rounded-xl border border-white/10 hover:border-brand-gold-500/30 transition-colors">
            <div className="text-brand-gold-500 text-2xl mb-3">🔒</div>
            <h4 className="text-white font-semibold mb-2">Proteção de Dados</h4>
            <p className="text-gray-300 text-sm">
              Políticas rigorosas de proteção de dados pessoais e sensíveis conforme LGPD, GDPR e normas setoriais.
            </p>
          </div>
          
          <div className="bg-card p-6 rounded-xl border border-white/10 hover:border-brand-gold-500/30 transition-colors">
            <div className="text-brand-gold-500 text-2xl mb-3">🛡️</div>
            <h4 className="text-white font-semibold mb-2">Segurança da Informação</h4>
            <p className="text-gray-300 text-sm">
              Estruturas de segurança baseadas nos frameworks ISO 27001, NIST e COBIT para proteção de ativos críticos.
            </p>
          </div>
          
          <div className="bg-card p-6 rounded-xl border border-white/10 hover:border-brand-gold-500/30 transition-colors">
            <div className="text-brand-gold-500 text-2xl mb-3">📋</div>
            <h4 className="text-white font-semibold mb-2">Auditoria e Compliance</h4>
            <p className="text-gray-300 text-sm">
              Relatórios de auditoria trimestrais, testes de penetração e conformidade contínua com normas regulatórias.
            </p>
          </div>
          
          <div className="bg-card p-6 rounded-xl border border-white/10 hover:border-brand-gold-500/30 transition-colors">
            <div className="text-brand-gold-500 text-2xl mb-3">🔄</div>
            <h4 className="text-white font-semibold mb-2">Continuidade de Negócios</h4>
            <p className="text-gray-300 text-sm">
              Planos de continuidade com RTO e RPO definidos, testados regularmente com simulações de desastre.
            </p>
          </div>
        </div>
        
        <div className="bg-white/5 rounded-xl p-8 border border-white/10 mb-12">
          <h4 className="text-white font-semibold text-xl mb-6 text-center">Garantia de Segurança Corporativa</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl text-brand-gold-500 font-bold mb-2">99.99%</div>
              <div className="text-gray-300">Uptime SLA</div>
              <div className="text-xs text-gray-500 mt-1">Com garantia contratual</div>
            </div>
            <div className="text-center">
              <div className="text-3xl text-brand-gold-500 font-bold mb-2">&lt;15min</div>
              <div className="text-gray-300">Tempo de Resposta</div>
              <div className="text-xs text-gray-500 mt-1">SLA Tier 1</div>
            </div>
            <div className="text-center">
              <div className="text-3xl text-brand-gold-500 font-bold mb-2">24/7/365</div>
              <div className="text-gray-300">Monitoramento</div>
              <div className="text-xs text-gray-500 mt-1">Centro de operações</div>
            </div>
            <div className="text-center">
              <div className="text-3xl text-brand-gold-500 font-bold mb-2">100%</div>
              <div className="text-gray-300">Backup Validado</div>
              <div className="text-xs text-gray-500 mt-1">Testes de restauração</div>
            </div>
          </div>
        </div>
        
        <div className="bg-card rounded-xl p-8 border border-white/10">
          <h4 className="text-white font-semibold text-xl mb-4">Nossa Abordagem de Governança</h4>
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 mb-4">
              Nossos especialistas em governança de TI trabalham com frameworks reconhecidos internacionalmente para garantir que sua organização atenda a todos os requisitos de conformidade, segurança e eficiência operacional.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <h5 className="text-white font-semibold mb-3">Quadro Regulatório</h5>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-brand-gold-500 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    LGPD - Lei Geral de Proteção de Dados
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-brand-gold-500 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    GDPR - Regulamento Geral de Proteção de Dados (UE)
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-brand-gold-500 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    BACEN, SUSEP e outras normas setoriais
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-brand-gold-500 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    ISO 27001, ISO 20000, ISO 22301, ISO 31000
                  </li>
                </ul>
              </div>
              
              <div>
                <h5 className="text-white font-semibold mb-3">Benefícios Corporativos</h5>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-brand-gold-500 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Redução de riscos e exposição legal
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-brand-gold-500 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Melhoria na tomada de decisão com dados
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-brand-gold-500 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Conformidade com acionistas e reguladores
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-brand-gold-500 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Vantagem competitiva e confiança do mercado
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DataGovernance;