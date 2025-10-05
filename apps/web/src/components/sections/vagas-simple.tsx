"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Briefcase, MapPin, Clock, DollarSign, Award, ArrowRight, Loader2, User, LogIn, MousePointer } from "lucide-react";
import GoogleLogin from "@/components/auth/GoogleLogin";
import { useToast } from "@/components/ui/Toast";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { candidateApi } from "@/services/api";

interface Vaga {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  salary: string;
  experience: string;
  description: string;
  skills: string[];
  postedDate: string;
  isRemote: boolean;
  isUrgent: boolean;
}

const VagasSimple = () => {
  const router = useRouter();
  const toast = useToast();
  const [vagas, setVagas] = useState<Vaga[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Dados de exemplo mais robustos
  const defaultVagas: Vaga[] = [
    {
      id: "1",
      title: "Desenvolvedor Full Stack Senior",
      department: "Desenvolvimento",
      location: "São Paulo, SP",
      type: "Tempo Integral",
      salary: "R$ 12.000 - R$ 18.000",
      experience: "6+ anos",
      description: "Buscamos um desenvolvedor Full Stack experiente para liderar projetos e mentorar a equipe. Conhecimento em Next.js, Node.js e bancos de dados NoSQL é essencial.",
      skills: ["Next.js", "Node.js", "React", "TypeScript", "MongoDB", "AWS"],
      postedDate: "2024-01-15",
      isRemote: true,
      isUrgent: true
    },
    {
      id: "2",
      title: "Especialista em Cloud Computing",
      department: "Cloud Computing",
      location: "Remoto",
      type: "Tempo Integral",
      salary: "R$ 15.000 - R$ 22.000",
      experience: "6+ anos",
      description: "Especialista em soluções cloud para arquitetar e implementar infraestruturas escaláveis e seguras.",
      skills: ["AWS", "Kubernetes", "Docker", "Terraform", "CI/CD"],
      postedDate: "2024-01-10",
      isRemote: true,
      isUrgent: false
    },
    {
      id: "3",
      title: "Analista de Segurança da Informação",
      department: "Segurança",
      location: "São Paulo, SP",
      type: "Tempo Integral",
      salary: "R$ 8.000 - R$ 12.000",
      experience: "3+ anos",
      description: "Analista responsável por implementar e manter políticas de segurança da informação na empresa.",
      skills: ["SIEM", "SOAR", "ISO 27001", "NIST", "CISSP", "CISM"],
      postedDate: "2024-01-08",
      isRemote: false,
      isUrgent: true
    },
    {
      id: "4",
      title: "Especialista em IA/ML",
      department: "Inteligência Artificial",
      location: "São Paulo, SP",
      type: "Tempo Integral",
      salary: "R$ 18.000 - R$ 25.000",
      experience: "5+ anos",
      description: "Especialista em Inteligência Artificial e Machine Learning para desenvolver soluções inovadoras.",
      skills: ["Python", "TensorFlow", "PyTorch", "NLP", "Big Data", "AWS"],
      postedDate: "2024-01-05",
      isRemote: true,
      isUrgent: false
    },
    {
      id: "5",
      title: "UX/UI Designer Senior",
      department: "UX/UI",
      location: "São Paulo, SP",
      type: "Tempo Integral",
      salary: "R$ 10.000 - R$ 15.000",
      experience: "4+ anos",
      description: "Designer experiente para criar interfaces intuitivas e experiências de usuário excepcionais.",
      skills: ["Figma", "Adobe XD", "Sketch", "Design System", "User Research"],
      postedDate: "2024-01-03",
      isRemote: true,
      isUrgent: false
    },
    {
      id: "6",
      title: "DevOps Engineer",
      department: "DevOps",
      location: "São Paulo, SP",
      type: "Tempo Integral",
      salary: "R$ 13.000 - R$ 18.000",
      experience: "4+ anos",
      description: "Engenheiro DevOps para automatizar processos e manter a infraestrutura de desenvolvimento.",
      skills: ["Docker", "Kubernetes", "Jenkins", "AWS", "Terraform", "Prometheus"],
      postedDate: "2024-01-01",
      isRemote: true,
      isUrgent: false
    }
  ];

  useEffect(() => {
    const fetchVagas = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Tentar buscar do backend primeiro
        const response = await fetch('/api/candidates/jobs');
        
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            setVagas(data);
          } else {
            // Se não houver dados no backend, usar dados padrão
            setVagas(defaultVagas);
          }
        } else {
          // Se houver erro na API, usar dados padrão
          setVagas(defaultVagas);
        }
      } catch (err) {
        // Em caso de erro, usar dados padrão
        console.warn('Erro ao buscar vagas do backend, usando dados padrão:', err);
        setVagas(defaultVagas);
      } finally {
        setLoading(false);
      }
    };

    fetchVagas();
    checkLoginStatus();
  }, []);

  const checkLoginStatus = () => {
    // Verificar se há dados de login no localStorage
    const savedEmail = localStorage.getItem('candidateEmail');
    if (savedEmail) {
      setUserEmail(savedEmail);
      setIsLoggedIn(true);
    }
  };

  const handleCandidatar = (vagaId: string) => {
    console.log('Botão clicado para vaga:', vagaId);
    console.log('Usuário logado:', isLoggedIn);
    
    if (isLoggedIn) {
      // Se já está logado, verificar status da candidatura
      checkApplicationStatus(vagaId);
    } else {
      // Se não está logado, mostrar modal de login
      console.log('Mostrando modal de login');
      setShowLoginModal(true);
    }
  };

  const checkApplicationStatus = async (vagaId: string) => {
    if (!userEmail) return;
    
    try {
      const applications = await candidateApi.getApplications(userEmail) as any[];
      const application = applications.find((app: any) => app.jobPositionId === vagaId);
      
      if (application) {
        // Mostrar status da candidatura com mensagens mais amigáveis
        const statusMessages = {
          pending: 'Candidatura enviada - Aguardando análise',
          reviewing: 'Candidatura em análise',
          interviewed: 'Candidato selecionado para entrevista',
          hired: 'Parabéns! Você foi contratado!',
          rejected: 'Candidatura não selecionada desta vez'
        };
        
        const status = application.status || 'pending';
        const message = statusMessages[status as keyof typeof statusMessages] || status;
        
        toast.addToast({
          type: status === 'hired' ? 'success' : status === 'rejected' ? 'warning' : 'info',
          title: 'Status da Candidatura',
          message,
          duration: 8000
        });
      } else {
        // Redirecionar para cadastro com vaga pré-selecionada
        toast.addToast({
          type: 'info',
          title: 'Candidatura não encontrada',
          message: 'Redirecionando para o cadastro...',
          duration: 3000
        });
        
        setTimeout(() => {
          router.push(`/cadastro-candidato?vaga=${vagaId}`);
        }, 1000);
      }
    } catch (error) {
      console.error('Erro ao verificar status da candidatura:', error);
      
      toast.addToast({
        type: 'error',
        title: 'Erro ao verificar candidatura',
        message: 'Redirecionando para o cadastro...',
        duration: 5000
      });
      
      // Em caso de erro, redirecionar para cadastro
      setTimeout(() => {
        router.push(`/cadastro-candidato?vaga=${vagaId}`);
      }, 1000);
    }
  };

  const handleLogin = (email: string) => {
    console.log('Fazendo login com email:', email);
    setUserEmail(email);
    setIsLoggedIn(true);
    localStorage.setItem('candidateEmail', email);
    setShowLoginModal(false);
    
    toast.addToast({
      type: 'success',
      title: 'Login realizado com sucesso!',
      message: 'Agora você pode verificar suas candidaturas.',
      duration: 5000
    });
  };

  const handleLogout = () => {
    setUserEmail(null);
    setIsLoggedIn(false);
    localStorage.removeItem('candidateEmail');
  };

  if (loading) {
    return (
      <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="relative z-10 mx-auto max-w-7xl px-6 py-20">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 mb-8 rounded-full bg-gradient-to-r from-cyan-600 to-purple-600 shadow-2xl">
              <Briefcase className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent">
              Vagas Abertas
            </h1>
            <LoadingSpinner size="lg" color="white" text="Carregando oportunidades..." />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-20">
        
        {/* Hero Section */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center justify-center w-24 h-24 mb-8 rounded-full bg-gradient-to-r from-cyan-600 to-purple-600 shadow-2xl">
            <Briefcase className="w-12 h-12 text-white" />
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent">
            Vagas Abertas
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
            Junte-se à nossa <span className="text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text font-semibold">equipe de especialistas</span> e transforme o futuro da tecnologia
          </p>
          
          {/* Estatísticas */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400 mb-2">{vagas.length}</div>
              <div className="text-gray-300 text-sm">Vagas Abertas</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">
                {vagas.filter(v => v.isRemote).length}
              </div>
              <div className="text-gray-300 text-sm">Remotas</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-400 mb-2">
                {vagas.filter(v => v.isUrgent).length}
              </div>
              <div className="text-gray-300 text-sm">Urgentes</div>
            </div>
          </div>
          
          <div className="h-1 w-32 mx-auto bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-full shadow-lg shadow-cyan-500/30" />
          
          {/* Login Status */}
          {isLoggedIn && (
            <motion.div
              className="mt-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-400/30 rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-emerald-400" />
                  <div>
                    <p className="text-white font-medium">Logado como: {userEmail}</p>
                    <p className="text-sm text-gray-300">Clique em "Ver Status" para verificar suas candidaturas</p>
                  </div>
                </div>
                <motion.button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm text-gray-400 hover:text-white border border-gray-600 rounded-lg hover:border-gray-500 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Sair
                </motion.button>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Vagas Grid */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {vagas.map((vaga, index) => (
            <motion.div
              key={vaga.id}
              className="group relative cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              onClick={() => handleCandidatar(vaga.id)}
            >
              <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 transition-all duration-500 group-hover:border-white/20 group-hover:bg-white/10 group-hover:shadow-lg group-hover:shadow-cyan-500/10">
                
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {vaga.title}
                    </h3>
                    <div className="flex items-center gap-2 text-gray-400 text-sm mt-1">
                      <span>{vaga.department}</span>
                      {vaga.isRemote && (
                        <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs">
                          Remoto
                        </span>
                      )}
                      {vaga.isUrgent && (
                        <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded-full text-xs">
                          Urgente
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500 group-hover:text-gray-400 transition-colors">
                    <MousePointer className="w-3 h-3" />
                    Clique para candidatar-se
                  </div>
                </div>

                {/* Info */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-2 text-gray-300">
                    <MapPin className="w-4 h-4 text-cyan-400" />
                    <span className="text-sm">{vaga.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Clock className="w-4 h-4 text-purple-400" />
                    <span className="text-sm">{vaga.type}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <DollarSign className="w-4 h-4 text-emerald-400" />
                    <span className="text-sm">{vaga.salary}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Award className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm">{vaga.experience}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-300 text-sm mb-6 line-clamp-3">
                  {vaga.description}
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {vaga.skills.slice(0, 4).map((skill) => (
                    <span 
                      key={skill}
                      className="px-3 py-1 text-xs bg-white/10 text-gray-300 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                  {vaga.skills.length > 4 && (
                    <span className="px-3 py-1 text-xs bg-white/10 text-gray-300 rounded-full">
                      +{vaga.skills.length - 4}
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">
                    Postada em {new Date(vaga.postedDate).toLocaleDateString('pt-BR')}
                  </span>
                  <motion.div
                    className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => e.stopPropagation()} // Evita duplicação do clique
                  >
                    {isLoggedIn ? 'Ver Status' : 'Candidatar-se'}
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </div>
                
                {/* Hover Glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-400/20 to-purple-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl p-12">
            <h2 className="text-3xl font-bold text-white mb-6">
              Não encontrou a vaga ideal?
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Envie seu currículo e fique por dentro das novas oportunidades. Estamos sempre procurando por talentos excepcionais.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                onClick={() => router.push('/cadastro-candidato')}
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-purple-700 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Cadastrar-se
              </motion.button>
              <motion.button
                onClick={() => setShowLoginModal(true)}
                className="px-8 py-4 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Verificar Candidaturas
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Modal de Login Modernizado */}
      {showLoginModal && (
        <motion.div
          className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowLoginModal(false)}
        >
          <motion.div
            className="bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-xl border border-white/20 rounded-3xl p-8 max-w-md w-full shadow-2xl"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header com animação */}
            <div className="text-center mb-8">
              <motion.div 
                className="w-20 h-20 bg-gradient-to-br from-cyan-500 via-purple-600 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
              >
                <LogIn className="w-10 h-10 text-white" />
              </motion.div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
                Acesso Rápido
              </h3>
              <p className="text-gray-300">
                Entre com seu email ou faça login com Google
              </p>
            </div>

            {/* Formulário de Login */}
            <div className="space-y-6 mb-8">
              {/* Login com Google */}
              <GoogleLogin
                onSuccess={(userData) => {
                  console.log('Login Google bem-sucedido:', userData);
                  handleLogin(userData.email);
                }}
                onError={(error) => {
                  console.error('Erro no login Google:', error);
                  alert('Erro no login com Google. Tente novamente.');
                }}
              />

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/20"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gray-900 text-gray-400">ou</span>
                </div>
              </div>

              {/* Email Input */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Email
                </label>
                <div className="relative">
                  <input
                    id="loginEmail"
                    type="email"
                    className="w-full px-4 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300"
                    placeholder="seu@email.com"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Botões de Ação */}
            <div className="space-y-4">
              <motion.button
                onClick={() => {
                  const emailInput = document.getElementById('loginEmail') as HTMLInputElement;
                  const email = emailInput?.value?.trim();
                  
                  if (email && email.includes('@') && email.includes('.')) {
                    handleLogin(email);
                  } else {
                    alert('Por favor, digite um email válido');
                    emailInput?.focus();
                  }
                }}
                className="w-full px-6 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Verificar Candidaturas
              </motion.button>
              
              <motion.button
                onClick={() => setShowLoginModal(false)}
                className="w-full px-6 py-3 border border-white/30 text-white font-medium rounded-xl hover:bg-white/10 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Cancelar
              </motion.button>
            </div>

            {/* Links de Navegação */}
            <div className="mt-8 space-y-4">
              <div className="text-center">
                <p className="text-gray-400 text-sm mb-3">Não tem cadastro?</p>
                <motion.button
                  onClick={() => {
                    setShowLoginModal(false);
                    router.push('/cadastro-candidato');
                  }}
                  className="text-cyan-400 hover:text-cyan-300 text-sm font-medium border-b border-cyan-400/30 hover:border-cyan-300 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                  Cadastre-se aqui
                </motion.button>
              </div>
              
              <div className="border-t border-white/10 pt-4">
                <motion.button
                  onClick={() => {
                    setShowLoginModal(false);
                    router.push('/cadastro-candidato');
                  }}
                  className="w-full text-center text-sm text-gray-300 hover:text-white border border-gray-600 px-4 py-2 rounded-lg hover:border-gray-500 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                >
                  Continuar sem login
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default VagasSimple;
