export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 overflow-hidden">
      {/* Hero Section Simples */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 mb-8 rounded-full bg-gradient-to-r from-emerald-600 to-blue-600 shadow-2xl">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 bg-gradient-to-r from-white via-emerald-200 to-blue-200 bg-clip-text text-transparent">
            Entre em Contato
          </h1>

          <p className="text-xl sm:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            Nosso{" "}
            <span className="text-transparent bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text font-semibold">
              formulário inteligente
            </span>{" "}
            guia você passo a passo para garantir que coletemos todas as informações necessárias
          </p>

          {/* Benefícios */}
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <div className="flex items-center gap-2 text-emerald-400">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Validação em tempo real</span>
            </div>
            <div className="flex items-center gap-2 text-blue-400">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              <span>Resposta em até 15 min</span>
            </div>
            <div className="flex items-center gap-2 text-purple-400">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Proposta personalizada</span>
            </div>
          </div>

          {/* Accent Line */}
          <div className="h-1 w-32 mx-auto bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-500 rounded-full shadow-lg shadow-emerald-500/30" />
        </div>
      </section>

      {/* Formulário será adicionado em breve */}
      <div className="relative z-10 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="p-8 bg-slate-800/50 rounded-xl border border-slate-700/50">
            <h2 className="text-2xl font-bold text-white mb-4">Formulário em Desenvolvimento</h2>
            <p className="text-gray-300 mb-6">
              Estamos finalizando o formulário inteligente com todas as funcionalidades avançadas.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="p-6 bg-slate-800/40 rounded-xl border border-slate-600/30">
                <div className="text-3xl mb-3">⚡</div>
                <h4 className="text-white font-semibold mb-2">Auto-Save</h4>
                <p className="text-slate-300 text-sm">Salvamento automático dos dados</p>
              </div>
              <div className="p-6 bg-slate-800/40 rounded-xl border border-slate-600/30">
                <div className="text-3xl mb-3">📊</div>
                <h4 className="text-white font-semibold mb-2">Progresso Visual</h4>
                <p className="text-slate-300 text-sm">Barra de progresso em tempo real</p>
              </div>
              <div className="p-6 bg-slate-800/40 rounded-xl border border-slate-600/30">
                <div className="text-3xl mb-3">🎯</div>
                <h4 className="text-white font-semibold mb-2">Validação</h4>
                <p className="text-slate-300 text-sm">Validação em tempo real</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
