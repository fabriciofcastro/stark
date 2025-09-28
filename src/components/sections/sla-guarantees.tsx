"use client";

const SLAGuarantees = () => {
  return (
    <section className="py-16 container-px">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            SLAs Corporativos e Garantias de Serviço
          </h3>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Compromissos contratuais rigorosos com penalidades definidas para garantir qualidade e confiabilidade máximas
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-card p-8 rounded-xl border border-white/10">
            <h4 className="text-2xl font-bold text-white mb-6">Nossos Compromissos de Serviço</h4>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-brand-gold-500/20 p-3 rounded-lg mr-4">
                  <svg className="w-6 h-6 text-brand-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                  </svg>
                </div>
                <div>
                  <h5 className="text-white font-semibold mb-2">99.99% Uptime Garantido</h5>
                  <p className="text-gray-300 text-sm">
                    Disponibilidade anual mínima com penalidades contratuais em caso de descumprimento. 
                    Monitoramento 24/7/365 com alertas proativos.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-brand-gold-500/20 p-3 rounded-lg mr-4">
                  <svg className="w-6 h-6 text-brand-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div>
                  <h5 className="text-white font-semibold mb-2">Resposta Técnica Rápida</h5>
                  <p className="text-gray-300 text-sm">
                    <span className="font-bold text-brand-gold-500">&lt;15min</span> para chamados críticos (Tier 1), 
                    <span className="font-bold text-brand-gold-500"> &lt;2h</span> para prioridade média (Tier 2), 
                    <span className="font-bold text-brand-gold-500"> &lt;4h</span> para baixa prioridade (Tier 3).
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-brand-gold-500/20 p-3 rounded-lg mr-4">
                  <svg className="w-6 h-6 text-brand-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div>
                  <h5 className="text-white font-semibold mb-2">Resolução Garantida</h5>
                  <p className="text-gray-300 text-sm">
                    <span className="font-bold text-brand-gold-500">4h</span> para incidentes Tier 1, 
                    <span className="font-bold text-brand-gold-500"> 24h</span> para Tier 2, 
                    <span className="font-bold text-brand-gold-500"> 72h</span> para Tier 3, 
                    com atualizações periódicas até resolução.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-card p-8 rounded-xl border border-white/10">
            <h4 className="text-2xl font-bold text-white mb-6">Estrutura de Penalidades</h4>
            
            <div className="space-y-6">
              <div className="bg-white/5 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white font-medium">Disponibilidade &lt; 99.9%</span>
                  <span className="text-brand-gold-500 font-bold">5% Crédito</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-brand-gold-500 h-2 rounded-full" style={{width: '85%'}}></div>
                </div>
              </div>
              
              <div className="bg-white/5 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white font-medium">Disponibilidade &lt; 99.5%</span>
                  <span className="text-brand-gold-500 font-bold">15% Crédito</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-brand-gold-500 h-2 rounded-full" style={{width: '70%'}}></div>
                </div>
              </div>
              
              <div className="bg-white/5 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white font-medium">Disponibilidade &lt; 99%</span>
                  <span className="text-brand-gold-500 font-bold">30% Crédito</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{width: '50%'}}></div>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                  </svg>
                  <p className="text-red-300 text-sm">
                    Penalidades aplicáveis automaticamente com créditos na fatura seguinte.
                    Acordos específicos podem incluir penalidades adicionais por impacto comercial.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
          <h4 className="text-xl font-bold text-white mb-6 text-center">Níveis de Serviço Corporativo</h4>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="pb-3 text-left text-gray-300">Critério</th>
                  <th className="pb-3 text-center text-gray-300">Bronze</th>
                  <th className="pb-3 text-center text-gray-300">Prata</th>
                  <th className="pb-3 text-center text-gray-300">Ouro</th>
                  <th className="pb-3 text-center text-gray-300">Platina</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                <tr className="border-b border-white/10">
                  <td className="py-3 font-medium">Uptime</td>
                  <td className="py-3 text-center">99.5%</td>
                  <td className="py-3 text-center">99.7%</td>
                  <td className="py-3 text-center">99.9%</td>
                  <td className="py-3 text-center font-bold text-brand-gold-500">99.99%</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 font-medium">Resposta Tier 1</td>
                  <td className="py-3 text-center">1h</td>
                  <td className="py-3 text-center">30m</td>
                  <td className="py-3 text-center">15m</td>
                  <td className="py-3 text-center font-bold text-brand-gold-500">5m</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 font-medium">Resolução Tier 1</td>
                  <td className="py-3 text-center">8h</td>
                  <td className="py-3 text-center">4h</td>
                  <td className="py-3 text-center">2h</td>
                  <td className="py-3 text-center font-bold text-brand-gold-500">1h</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 font-medium">Acesso 24/7</td>
                  <td className="py-3 text-center">✓</td>
                  <td className="py-3 text-center">✓</td>
                  <td className="py-3 text-center">✓</td>
                  <td className="py-3 text-center font-bold text-brand-gold-500">✓</td>
                </tr>
                <tr>
                  <td className="py-3 font-medium">Penalidades</td>
                  <td className="py-3 text-center">10%</td>
                  <td className="py-3 text-center">20%</td>
                  <td className="py-3 text-center">30%</td>
                  <td className="py-3 text-center font-bold text-brand-gold-500">40%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Nossos SLAs são contratuais e aplicáveis a todos os clientes corporativos. 
            Discuta com nosso time comercial o nível de serviço adequado para sua organização.
          </p>
          <button className="px-8 py-3 bg-brand-gold-500 hover:bg-brand-gold-600 text-black font-semibold rounded-lg transition-colors">
            Solicitar Proposta Corporativa
          </button>
        </div>
      </div>
    </section>
  );
};

export default SLAGuarantees;