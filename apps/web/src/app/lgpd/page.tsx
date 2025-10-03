import { Metadata } from "next";
import { Shield, FileText, Users, Database, Lock, CheckCircle, AlertTriangle, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "LGPD - Lei Geral de Proteção de Dados - STARK Tecnologia",
  description: "Conheça como a STARK Tecnologia cumpre a Lei Geral de Proteção de Dados (LGPD) e protege seus dados pessoais.",
  keywords: "LGPD, lei geral proteção dados, privacidade, dados pessoais, STARK, tecnologia, conformidade",
};

const LGPDPage = () => {
  const principles = [
    {
      icon: Shield,
      title: "Finalidade",
      description: "Tratamos dados apenas para finalidades específicas, explícitas e legítimas",
      details: "Cada dado coletado tem um propósito claro e bem definido"
    },
    {
      icon: FileText,
      title: "Adequação",
      description: "Dados são compatíveis com as finalidades informadas",
      details: "Não utilizamos dados além do que foi comunicado ao titular"
    },
    {
      icon: Users,
      title: "Necessidade",
      description: "Coletamos apenas dados essenciais para as finalidades",
      details: "Minimizamos a coleta de dados ao estritamente necessário"
    },
    {
      icon: Database,
      title: "Transparência",
      description: "Informações claras sobre o tratamento de dados",
      details: "Comunicação aberta sobre como utilizamos seus dados"
    },
    {
      icon: Lock,
      title: "Segurança",
      description: "Medidas técnicas e organizacionais adequadas",
      details: "Proteção contra acesso não autorizado e vazamentos"
    },
    {
      icon: CheckCircle,
      title: "Prevenção",
      description: "Ações preventivas contra danos aos dados",
      details: "Antecipamos e evitamos possíveis violações de dados"
    }
  ];

  const rights = [
    {
      icon: CheckCircle,
      title: "Confirmação e Acesso",
      description: "Saber se seus dados estão sendo tratados e acessá-los"
    },
    {
      icon: FileText,
      title: "Correção",
      description: "Corrigir dados incompletos, inexatos ou desatualizados"
    },
    {
      icon: Database,
      title: "Anonimização ou Eliminação",
      description: "Eliminar dados desnecessários ou torná-los anônimos"
    },
    {
      icon: Shield,
      title: "Portabilidade",
      description: "Transferir seus dados para outro fornecedor"
    },
    {
      icon: Users,
      title: "Eliminação",
      description: "Excluir dados tratados com seu consentimento"
    },
    {
      icon: AlertTriangle,
      title: "Informações sobre Compartilhamento",
      description: "Saber com quem seus dados são compartilhados"
    }
  ];

  const complianceMeasures = [
    {
      category: "Governança",
      items: [
        "Política de Privacidade atualizada",
        "Processo de gestão de consentimento",
        "Treinamento da equipe em LGPD",
        "Auditorias regulares de conformidade"
      ]
    },
    {
      category: "Técnicas",
      items: [
        "Criptografia de dados sensíveis",
        "Controle de acesso baseado em função",
        "Backup seguro e recuperação",
        "Monitoramento de segurança 24/7"
      ]
    },
    {
      category: "Organizacionais",
      items: [
        "Designação de Encarregado de Dados (DPO)",
        "Procedimentos de resposta a incidentes",
        "Avaliação de Impacto à Proteção de Dados",
        "Contratos com fornecedores em conformidade"
      ]
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
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl mb-8">
              <Shield className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-green-200 to-emerald-200 bg-clip-text text-transparent">
              Lei Geral de Proteção de Dados
            </h1>
            
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              A STARK Tecnologia está em total conformidade com a LGPD, garantindo a proteção 
              e privacidade dos seus dados pessoais com transparência e responsabilidade.
            </p>

            <div className="flex items-center justify-center space-x-2 mt-6 text-sm text-white/60">
              <Clock className="w-4 h-4" />
              <span>Conformidade LGPD desde 2020</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* LGPD Overview */}
        <div className="mb-16">
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                O que é a LGPD?
              </h2>
              <p className="text-white/80 text-lg max-w-3xl mx-auto leading-relaxed">
                A Lei Geral de Proteção de Dados (Lei nº 13.709/2018) estabelece regras sobre 
                coleta, armazenamento, tratamento e compartilhamento de dados pessoais, 
                garantindo maior controle e transparência aos titulares dos dados.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Proteção</h3>
                <p className="text-white/70 text-sm">
                  Dados pessoais protegidos com medidas técnicas e organizacionais
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Transparência</h3>
                <p className="text-white/70 text-sm">
                  Informações claras sobre como utilizamos seus dados
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Controle</h3>
                <p className="text-white/70 text-sm">
                  Você tem controle total sobre seus dados pessoais
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Principles */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Princípios da LGPD que Seguimos
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {principles.map((principle, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <principle.icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-2">
                      {principle.title}
                    </h3>
                    <p className="text-white/80 text-sm mb-2">
                      {principle.description}
                    </p>
                    <p className="text-white/60 text-xs">
                      {principle.details}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Rights */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Seus Direitos como Titular de Dados
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {rights.map((right, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-purple-600/10 to-cyan-500/10 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <right.icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-2">
                      {right.title}
                    </h3>
                    <p className="text-white/80">
                      {right.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Compliance Measures */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Nossas Medidas de Conformidade
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {complianceMeasures.map((category, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                <h3 className="text-xl font-bold text-white mb-6 text-center">
                  {category.category}
                </h3>
                
                <ul className="space-y-3">
                  {category.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-white/80 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Contact DPO */}
        <div className="bg-gradient-to-r from-green-600/20 to-emerald-500/20 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Users className="w-8 h-8 text-white" />
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-4">
              Encarregado de Dados (DPO)
            </h2>
            <p className="text-white/80 mb-6 max-w-2xl mx-auto">
              Nossa equipe de proteção de dados está disponível para esclarecer dúvidas, 
              receber solicitações e garantir o cumprimento da LGPD.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contato"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-medium hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-green-500/25"
              >
                <Shield className="w-5 h-5 mr-2" />
                Contatar DPO
              </a>
              
              <a
                href="/politica-privacidade"
                className="inline-flex items-center justify-center px-8 py-4 bg-white/10 text-white rounded-xl font-medium hover:bg-white/20 transition-all duration-300 border border-white/20"
              >
                <FileText className="w-5 h-5 mr-2" />
                Política de Privacidade
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-green-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
      </div>
    </div>
  );
};

export default LGPDPage;