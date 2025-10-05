"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { 
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  Users,
  Code,
  Cloud,
  Shield,
  Brain,
  Palette,
  Rocket,
  Star,
  Send,
  Award,
  Target,
  Globe,
  ArrowRight,
  Search,
  Filter,
  X
} from "lucide-react";

interface Vaga {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  salary: string;
  experience: string;
  description: string;
  requirements: string[];
  benefits: string[];
  skills: string[];
  postedDate: string;
  isRemote: boolean;
  isUrgent: boolean;
}

const Vagas = () => {
  const [vagas, setVagas] = useState<Vaga[]>([]);
  const [filteredVagas, setFilteredVagas] = useState<Vaga[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [selectedVaga, setSelectedVaga] = useState<Vaga | null>(null);
  const [showCandidateArea, setShowCandidateArea] = useState(false);
  const [candidateProfile, setCandidateProfile] = useState({
    name: '',
    email: '',
    phone: '',
    linkedin: '',
    experience: '',
    skills: [] as string[],
    preferredDepartments: [] as string[],
    resume: null as File | null,
    appliedVagas: [] as string[]
  });
  const [showVagaDetails, setShowVagaDetails] = useState(false);
  const [selectedVagaDetails, setSelectedVagaDetails] = useState<Vaga | null>(null);
  const [neuralParticles, setNeuralParticles] = useState<Array<{ 
    id: number; 
    x: number; 
    y: number; 
    vx: number; 
    vy: number; 
    connections: number[];
  }>>([]);
  
  const vagasRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll();
  const scrollPercentage = useTransform(scrollYProgress, [0, 0.3, 1], [0, 1, 1]);

  // Dados das vagas
  useEffect(() => {
    const vagasData: Vaga[] = [
      {
        id: "1",
        title: "Desenvolvedor Full Stack Senior",
        department: "Desenvolvimento",
        location: "São Paulo, SP",
        type: "CLT",
        salary: "R$ 12.000 - R$ 18.000",
        experience: "5+ anos",
        description: "Buscamos um desenvolvedor full stack experiente para liderar projetos de alta complexidade e mentorar desenvolvedores júnior.",
        requirements: [
          "Experiência sólida com React/Next.js",
          "Conhecimento em Node.js e TypeScript",
          "Experiência com bancos de dados (PostgreSQL, MongoDB)",
          "Conhecimento em AWS ou Azure",
          "Experiência com metodologias ágeis"
        ],
        benefits: [
          "Vale refeição R$ 1.200",
          "Vale transporte",
          "Plano de saúde e dental",
          "Home office 3x por semana",
          "Participação nos lucros",
          "Auxílio educação"
        ],
        skills: ["React", "Node.js", "TypeScript", "AWS", "PostgreSQL"],
        postedDate: "2024-01-15",
        isRemote: true,
        isUrgent: true
      },
      {
        id: "2",
        title: "Especialista em Cloud Computing",
        department: "Cloud Computing",
        location: "São Paulo, SP",
        type: "CLT",
        salary: "R$ 15.000 - R$ 22.000",
        experience: "6+ anos",
        description: "Especialista em soluções cloud para arquitetar e implementar infraestruturas escaláveis e seguras.",
        requirements: [
          "Certificação AWS Solutions Architect",
          "Experiência com Kubernetes e Docker",
          "Conhecimento em Terraform",
          "Experiência com CI/CD",
          "Conhecimento em monitoramento e observabilidade"
        ],
        benefits: [
          "Vale refeição R$ 1.200",
          "Vale transporte",
          "Plano de saúde e dental",
          "Home office 4x por semana",
          "Participação nos lucros",
          "Auxílio certificações"
        ],
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
        type: "CLT",
        salary: "R$ 10.000 - R$ 15.000",
        experience: "4+ anos",
        description: "Analista de segurança para implementar e manter políticas de segurança, realizar auditorias e responder a incidentes.",
        requirements: [
          "Certificação CISSP ou equivalente",
          "Experiência com LGPD",
          "Conhecimento em ferramentas de SIEM",
          "Experiência com penetration testing",
          "Conhecimento em compliance"
        ],
        benefits: [
          "Vale refeição R$ 1.200",
          "Vale transporte",
          "Plano de saúde e dental",
          "Home office 3x por semana",
          "Participação nos lucros",
          "Auxílio educação"
        ],
        skills: ["CISSP", "LGPD", "SIEM", "Penetration Testing", "Compliance"],
        postedDate: "2024-01-08",
        isRemote: true,
        isUrgent: false
      },
      {
        id: "4",
        title: "Cientista de Dados",
        department: "Inteligência Artificial",
        location: "São Paulo, SP",
        type: "CLT",
        salary: "R$ 13.000 - R$ 20.000",
        experience: "5+ anos",
        description: "Cientista de dados para desenvolver modelos de machine learning e soluções de IA para nossos clientes.",
        requirements: [
          "Experiência com Python e R",
          "Conhecimento em TensorFlow/PyTorch",
          "Experiência com SQL e NoSQL",
          "Conhecimento em estatística e matemática",
          "Experiência com visualização de dados"
        ],
        benefits: [
          "Vale refeição R$ 1.200",
          "Vale transporte",
          "Plano de saúde e dental",
          "Home office 4x por semana",
          "Participação nos lucros",
          "Auxílio educação"
        ],
        skills: ["Python", "TensorFlow", "SQL", "Estatística", "Visualização"],
        postedDate: "2024-01-05",
        isRemote: true,
        isUrgent: false
      },
      {
        id: "5",
        title: "Designer UX/UI Senior",
        department: "UX/UI",
        location: "São Paulo, SP",
        type: "CLT",
        salary: "R$ 8.000 - R$ 12.000",
        experience: "4+ anos",
        description: "Designer UX/UI para criar experiências digitais excepcionais e liderar o design system da empresa.",
        requirements: [
          "Experiência com Figma e Adobe Creative Suite",
          "Conhecimento em design thinking",
          "Experiência com pesquisa de usuário",
          "Conhecimento em acessibilidade",
          "Portfólio sólido"
        ],
        benefits: [
          "Vale refeição R$ 1.200",
          "Vale transporte",
          "Plano de saúde e dental",
          "Home office 3x por semana",
          "Participação nos lucros",
          "Auxílio educação"
        ],
        skills: ["Figma", "Design Thinking", "Research", "Acessibilidade", "Prototipagem"],
        postedDate: "2024-01-03",
        isRemote: true,
        isUrgent: false
      }
    ];

    setVagas(vagasData);
    setFilteredVagas(vagasData);
  }, []);

  // Neural Network Particles
  useEffect(() => {
    let animationFrameId: number;
    let isAnimating = false;

    const generateNeuralNetwork = () => {
      const particles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        connections: [] as number[]
      }));

      particles.forEach((particle, i) => {
        const connections: number[] = [];
        for (let j = 0; j < particles.length; j++) {
          if (i !== j && Math.random() > 0.8) {
            connections.push(j);
          }
        }
        particle.connections = connections;
      });

      setNeuralParticles(particles);
    };

    const animateParticles = () => {
      if (!isAnimating) return;
      
      setNeuralParticles(prev => prev.map(particle => ({
        ...particle,
        x: (particle.x + particle.vx + 100) % 100,
        y: (particle.y + particle.vy + 100) % 100
      })));

      animationFrameId = requestAnimationFrame(animateParticles);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isAnimating = entry.isIntersecting;
        if (isAnimating) {
          animationFrameId = requestAnimationFrame(animateParticles);
        } else if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
        }
      },
      { threshold: 0.1 }
    );

    if (vagasRef.current) {
      observer.observe(vagasRef.current);
    }

    generateNeuralNetwork();
    const interval = setInterval(generateNeuralNetwork, 30000);

    return () => {
      clearInterval(interval);
      observer.disconnect();
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  // Filtros
  useEffect(() => {
    let filtered = vagas;

    if (searchTerm) {
      filtered = filtered.filter(vaga => 
        vaga.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vaga.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vaga.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedDepartment !== "all") {
      filtered = filtered.filter(vaga => vaga.department === selectedDepartment);
    }

    if (selectedType !== "all") {
      filtered = filtered.filter(vaga => vaga.type === selectedType);
    }

    setFilteredVagas(filtered);
  }, [vagas, searchTerm, selectedDepartment, selectedType]);

  const getDepartmentIcon = (department: string) => {
    const icons = {
      "Desenvolvimento": Code,
      "Cloud Computing": Cloud,
      "Segurança": Shield,
      "Inteligência Artificial": Brain,
      "UX/UI": Palette,
      "DevOps": Rocket
    };
    return icons[department as keyof typeof icons] || Briefcase;
  };

  const getDepartmentColor = (department: string) => {
    const colors = {
      "Desenvolvimento": "cyan",
      "Cloud Computing": "sky",
      "Segurança": "red",
      "Inteligência Artificial": "pink",
      "UX/UI": "emerald",
      "DevOps": "purple"
    };
    return colors[department as keyof typeof colors] || "gray";
  };

  const handleApply = (vaga: Vaga) => {
    // Redirecionar para página de cadastro com a vaga pré-selecionada
    window.location.href = `/cadastro-candidato?vaga=${vaga.id}`;
  };

  const handleViewDetails = (vaga: Vaga) => {
    setSelectedVagaDetails(vaga);
    setShowVagaDetails(true);
  };

  const handleCandidateApply = (vaga: Vaga) => {
    if (!candidateProfile.name || !candidateProfile.email) {
      alert('Por favor, complete seu perfil primeiro');
      return;
    }
    
    setCandidateProfile(prev => ({
      ...prev,
      appliedVagas: [...prev.appliedVagas, vaga.id]
    }));
    
    alert(`Candidatura enviada para ${vaga.title}!`);
  };

  const handleSaveProfile = () => {
    if (!candidateProfile.name || !candidateProfile.email) {
      alert('Por favor, preencha os campos obrigatórios');
      return;
    }
    
    localStorage.setItem('candidateProfile', JSON.stringify(candidateProfile));
    alert('Perfil salvo com sucesso!');
  };

  const handleLoadProfile = () => {
    const saved = localStorage.getItem('candidateProfile');
    if (saved) {
      setCandidateProfile(JSON.parse(saved));
    }
  };

  const isApplied = (vagaId: string) => {
    return candidateProfile.appliedVagas.includes(vagaId);
  };

  const getRecommendedVagas = () => {
    return filteredVagas.filter(vaga => 
      candidateProfile.preferredDepartments.includes(vaga.department) ||
      candidateProfile.skills.some(skill => 
        vaga.skills.some(vagaSkill => 
          vagaSkill.toLowerCase().includes(skill.toLowerCase())
        )
      )
    );
  };

  return (
    <section 
      ref={vagasRef}
      className="relative min-h-screen overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at 20% 80%, rgba(6, 182, 212, 0.05) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.05) 0%, transparent 50%),
          linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, rgba(15, 23, 42, 0.98) 100%)
        `
      }}
    >
      {/* Neural Network Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute inset-0 w-full h-full opacity-20">
          {neuralParticles.map((particle) => 
            particle.connections.map((connectionId) => {
              const connection = neuralParticles[connectionId];
              if (!connection) return null;
              
              const distance = Math.sqrt(
                Math.pow(particle.x - connection.x, 2) + 
                Math.pow(particle.y - connection.y, 2)
              );
              
              if (distance < 25) {
                return (
                  <motion.line
                    key={`${particle.id}-${connectionId}`}
                    x1={`${particle.x}%`}
                    y1={`${particle.y}%`}
                    x2={`${connection.x}%`}
                    y2={`${connection.y}%`}
                    stroke="url(#neuralGradient)"
                    strokeWidth="0.5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: [0, 1, 0] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: Math.random() * 3
                    }}
                  />
                );
              }
              return null;
            })
          )}
          
          <defs>
            <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#ec4899" stopOpacity="0.8" />
            </linearGradient>
          </defs>
        </svg>

        {/* Floating Tech Icons */}
        {[Briefcase, Code, Cloud, Shield, Brain, Palette, Rocket, Target].map((Icon, index) => (
          <motion.div
            key={index}
            className="absolute text-white/10"
            style={{
              left: `${10 + (index * 12)}%`,
              top: `${20 + (index % 4) * 20}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 360],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 10 + index * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.8,
            }}
          >
            <Icon size={28} />
          </motion.div>
        ))}
      </div>

      {/* Holographic Border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60" />
      
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-20">
        
        {/* Hero Section */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center justify-center w-24 h-24 mb-8 rounded-full bg-gradient-to-r from-cyan-600 to-purple-600 shadow-2xl">
            <Briefcase className="w-12 h-12 text-white" />
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent">
            Vagas Abertas
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            Junte-se à nossa <span className="text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text font-semibold">equipe de especialistas</span> e transforme o futuro da tecnologia
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <div className="flex items-center gap-2 text-cyan-400">
              <Star className="w-5 h-5" fill="currentColor" />
              <span>Ambiente inovador</span>
            </div>
            <div className="flex items-center gap-2 text-purple-400">
              <Award className="w-5 h-5" fill="currentColor" />
              <span>Oportunidades de crescimento</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-400">
              <Target className="w-5 h-5" fill="currentColor" />
              <span>Projetos desafiadores</span>
            </div>
          </div>
          
          <div className="h-1 w-32 mx-auto bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-full shadow-lg shadow-cyan-500/30" />
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8">
            {/* Candidate Area Toggle */}
            <div className="flex justify-center mb-6">
              <motion.button
                onClick={() => setShowCandidateArea(!showCandidateArea)}
                className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-cyan-600 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-cyan-700 transition-all duration-300 flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Users className="w-5 h-5" />
                {showCandidateArea ? 'Ver Todas as Vagas' : 'Área do Candidato'}
              </motion.button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar vagas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                />
              </div>

              {/* Department Filter */}
              <div className="relative">
                <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 appearance-none"
                >
                  <option value="all">Todos os departamentos</option>
                  <option value="Desenvolvimento">Desenvolvimento</option>
                  <option value="Cloud Computing">Cloud Computing</option>
                  <option value="Segurança">Segurança</option>
                  <option value="Inteligência Artificial">Inteligência Artificial</option>
                  <option value="UX/UI">UX/UI</option>
                  <option value="DevOps">DevOps</option>
                </select>
              </div>

              {/* Type Filter */}
              <div className="relative">
                <Briefcase className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 appearance-none"
                >
                  <option value="all">Todos os tipos</option>
                  <option value="CLT">CLT</option>
                  <option value="PJ">PJ</option>
                  <option value="Estágio">Estágio</option>
                </select>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Candidate Area */}
        {showCandidateArea && (
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6 text-center">
                Área do Candidato
              </h2>
              
              {/* Profile Form */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Seu Perfil</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Nome Completo *
                      </label>
                      <input
                        type="text"
                        value={candidateProfile.name}
                        onChange={(e) => setCandidateProfile(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                        placeholder="Seu nome completo"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        value={candidateProfile.email}
                        onChange={(e) => setCandidateProfile(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                        placeholder="seu@email.com"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Telefone
                      </label>
                      <input
                        type="tel"
                        value={candidateProfile.phone}
                        onChange={(e) => setCandidateProfile(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                        placeholder="(11) 99999-9999"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        LinkedIn
                      </label>
                      <input
                        type="url"
                        value={candidateProfile.linkedin}
                        onChange={(e) => setCandidateProfile(prev => ({ ...prev, linkedin: e.target.value }))}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                        placeholder="https://linkedin.com/in/seu-perfil"
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Preferências</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Experiência Profissional
                      </label>
                      <textarea
                        value={candidateProfile.experience}
                        onChange={(e) => setCandidateProfile(prev => ({ ...prev, experience: e.target.value }))}
                        rows={3}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                        placeholder="Descreva sua experiência..."
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Departamentos de Interesse
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {["Desenvolvimento", "Cloud Computing", "Segurança", "Inteligência Artificial", "UX/UI", "DevOps"].map(dept => (
                          <button
                            key={dept}
                            onClick={() => {
                              const newDeps = candidateProfile.preferredDepartments.includes(dept)
                                ? candidateProfile.preferredDepartments.filter(d => d !== dept)
                                : [...candidateProfile.preferredDepartments, dept];
                              setCandidateProfile(prev => ({ ...prev, preferredDepartments: newDeps }));
                            }}
                            className={`px-3 py-1 rounded-full text-sm transition-all duration-300 ${
                              candidateProfile.preferredDepartments.includes(dept)
                                ? 'bg-cyan-500 text-white'
                                : 'bg-white/10 text-gray-300 hover:bg-white/20'
                            }`}
                          >
                            {dept}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Habilidades (separadas por vírgula)
                      </label>
                      <input
                        type="text"
                        value={candidateProfile.skills.join(', ')}
                        onChange={(e) => setCandidateProfile(prev => ({ 
                          ...prev, 
                          skills: e.target.value.split(',').map(s => s.trim()).filter(s => s) 
                        }))}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                        placeholder="React, Node.js, Python, AWS..."
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center gap-4 mt-6">
                <motion.button
                  onClick={handleSaveProfile}
                  className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-purple-700 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Salvar Perfil
                </motion.button>
                <motion.button
                  onClick={handleLoadProfile}
                  className="px-6 py-3 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Carregar Perfil
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Recommended Vagas for Candidates */}
        {showCandidateArea && getRecommendedVagas().length > 0 && (
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">
                Vagas Recomendadas para Você
              </h2>
              <p className="text-gray-300">
                Baseado no seu perfil e preferências
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {getRecommendedVagas().map((vaga, index) => {
                const DepartmentIcon = getDepartmentIcon(vaga.department);
                const colorClass = getDepartmentColor(vaga.department);
                
                return (
                  <motion.div
                    key={`rec-${vaga.id}`}
                    className="group relative"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -10 }}
                  >
                    <div className="relative rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 backdrop-blur-xl p-8 transition-all duration-500 group-hover:border-emerald-400/50 group-hover:bg-gradient-to-br group-hover:from-emerald-500/20 group-hover:to-cyan-500/20">
                      
                      {/* Recommended Badge */}
                      <div className="absolute -top-2 -right-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                        RECOMENDADA
                      </div>
                      
                      {/* Header */}
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-3">
                          <div className={`p-3 rounded-xl bg-gradient-to-br from-${colorClass}-500/20 to-${colorClass}-600/20`}>
                            <DepartmentIcon className={`w-6 h-6 text-${colorClass}-400`} />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                              {vaga.title}
                            </h3>
                            <div className="flex items-center gap-2 text-gray-400 text-sm">
                              <span>{vaga.department}</span>
                              {vaga.isRemote && (
                                <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs">
                                  Remoto
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Info */}
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="flex items-center gap-2 text-gray-300">
                          <MapPin className="w-4 h-4 text-cyan-400" />
                          <span className="text-sm">{vaga.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-300">
                          <DollarSign className="w-4 h-4 text-emerald-400" />
                          <span className="text-sm">{vaga.salary}</span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-gray-300 text-sm mb-6 line-clamp-3">
                        {vaga.description}
                      </p>

                      {/* Actions */}
                      <div className="flex items-center justify-between">
                        <motion.button
                          onClick={() => handleViewDetails(vaga)}
                          className="px-4 py-2 border border-white/20 text-white font-medium rounded-xl hover:bg-white/10 transition-all duration-300"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Ver Detalhes
                        </motion.button>
                        <motion.button
                          onClick={() => handleCandidateApply(vaga)}
                          disabled={isApplied(vaga.id)}
                          className={`px-6 py-2 font-semibold rounded-xl transition-all duration-300 flex items-center gap-2 ${
                            isApplied(vaga.id)
                              ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
                              : 'bg-gradient-to-r from-emerald-500 to-cyan-600 text-white hover:from-emerald-600 hover:to-cyan-700'
                          }`}
                          whileHover={!isApplied(vaga.id) ? { scale: 1.05 } : {}}
                          whileTap={!isApplied(vaga.id) ? { scale: 0.95 } : {}}
                        >
                          {isApplied(vaga.id) ? 'Candidatado' : 'Candidatar-se'}
                          <ArrowRight className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Vagas Grid */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {filteredVagas.map((vaga, index) => {
            const DepartmentIcon = getDepartmentIcon(vaga.department);
            const colorClass = getDepartmentColor(vaga.department);
            
            return (
              <motion.div
                key={vaga.id}
                className="group relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 transition-all duration-500 group-hover:border-white/20 group-hover:bg-white/10">
                  
                  {/* Quantum Field */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-xl bg-gradient-to-br from-${colorClass}-500/20 to-${colorClass}-600/20`}>
                        <DepartmentIcon className={`w-6 h-6 text-${colorClass}-400`} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                          {vaga.title}
                        </h3>
                        <div className="flex items-center gap-2 text-gray-400 text-sm">
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
                    <div className="flex gap-2">
                      <motion.button
                        onClick={() => handleViewDetails(vaga)}
                        className="px-4 py-2 border border-white/20 text-white font-medium rounded-xl hover:bg-white/10 transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Detalhes
                      </motion.button>
                      <motion.button
                        onClick={() => handleApply(vaga)}
                        className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Candidatar-se
                        <ArrowRight className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                  
                  {/* Hover Glow */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-400/20 to-purple-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* No Results */}
        {filteredVagas.length === 0 && (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center justify-center w-24 h-24 mb-8 rounded-full bg-gradient-to-r from-gray-600 to-gray-700 shadow-2xl">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Nenhuma vaga encontrada
            </h3>
            <p className="text-gray-400 text-lg mb-8">
              Tente ajustar os filtros ou termos de busca
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedDepartment("all");
                setSelectedType("all");
              }}
              className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-purple-700 transition-all duration-300"
            >
              Limpar Filtros
            </button>
          </motion.div>
        )}

        {/* Stats */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {[
            { icon: Briefcase, label: "Vagas Abertas", value: "12+", color: "cyan" },
            { icon: Users, label: "Funcionários", value: "50+", color: "purple" },
            { icon: Globe, label: "Países", value: "3", color: "emerald" }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 bg-gradient-to-br from-${stat.color}-500/20 to-${stat.color}-600/20`}>
                <stat.icon className={`w-8 h-8 text-${stat.color}-400`} />
              </div>
              <div className={`text-4xl font-bold text-${stat.color}-400 mb-2`}>
                {stat.value}
              </div>
              <div className="text-gray-300 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
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
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-purple-700 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Enviar Currículo
              </motion.button>
              <motion.button
                className="px-8 py-4 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Falar com RH
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Application Form Modal */}
      {showApplicationForm && selectedVaga && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <button
              onClick={() => setShowApplicationForm(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-2xl font-bold text-white mb-6">
              Candidatar-se para: {selectedVaga.title}
            </h2>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                    placeholder="Seu nome completo"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                    placeholder="seu@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Telefone *
                  </label>
                  <input
                    type="tel"
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                    placeholder="(11) 99999-9999"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    LinkedIn
                  </label>
                  <input
                    type="url"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                    placeholder="https://linkedin.com/in/seu-perfil"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Experiência Profissional *
                </label>
                <textarea
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                  placeholder="Descreva sua experiência profissional relevante para a vaga..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Por que você quer trabalhar conosco? *
                </label>
                <textarea
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                  placeholder="Conte-nos o que te motiva a fazer parte da nossa equipe..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Currículo (PDF) *
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept=".pdf"
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-cyan-500 file:text-white hover:file:bg-cyan-600 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4">
                <input
                  type="checkbox"
                  id="terms"
                  required
                  className="w-4 h-4 text-cyan-500 bg-white/10 border-white/20 rounded focus:ring-cyan-400 focus:ring-2"
                />
                <label htmlFor="terms" className="text-sm text-gray-300">
                  Concordo com os termos de uso e política de privacidade *
                </label>
              </div>

              <div className="flex gap-4 pt-4">
                <motion.button
                  type="button"
                  onClick={() => setShowApplicationForm(false)}
                  className="flex-1 px-6 py-3 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancelar
                </motion.button>
                <motion.button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Send className="w-4 h-4" />
                  Enviar Candidatura
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Vaga Details Modal */}
      {showVagaDetails && selectedVagaDetails && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <button
              onClick={() => setShowVagaDetails(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br from-${getDepartmentColor(selectedVagaDetails.department)}-500/20 to-${getDepartmentColor(selectedVagaDetails.department)}-600/20`}>
                  {React.createElement(getDepartmentIcon(selectedVagaDetails.department), { 
                    className: `w-8 h-8 text-${getDepartmentColor(selectedVagaDetails.department)}-400` 
                  })}
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white">
                    {selectedVagaDetails.title}
                  </h2>
                  <div className="flex items-center gap-4 text-gray-400">
                    <span>{selectedVagaDetails.department}</span>
                    {selectedVagaDetails.isRemote && (
                      <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm">
                        Remoto
                      </span>
                    )}
                    {selectedVagaDetails.isUrgent && (
                      <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded-full text-sm">
                        Urgente
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="flex items-center gap-2 text-gray-300">
                  <MapPin className="w-5 h-5 text-cyan-400" />
                  <span>{selectedVagaDetails.location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Clock className="w-5 h-5 text-purple-400" />
                  <span>{selectedVagaDetails.type}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <DollarSign className="w-5 h-5 text-emerald-400" />
                  <span>{selectedVagaDetails.salary}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Award className="w-5 h-5 text-yellow-400" />
                  <span>{selectedVagaDetails.experience}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-white mb-4">Descrição da Vaga</h3>
                <p className="text-gray-300 leading-relaxed mb-6">
                  {selectedVagaDetails.description}
                </p>

                <h3 className="text-xl font-bold text-white mb-4">Requisitos</h3>
                <ul className="space-y-2 mb-6">
                  {selectedVagaDetails.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-300">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-4">Benefícios</h3>
                <ul className="space-y-2 mb-6">
                  {selectedVagaDetails.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-300">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>

                <h3 className="text-xl font-bold text-white mb-4">Habilidades</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedVagaDetails.skills.map((skill) => (
                    <span 
                      key={skill}
                      className="px-3 py-1 text-sm bg-white/10 text-gray-300 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-6 border-t border-white/10">
              <motion.button
                onClick={() => setShowVagaDetails(false)}
                className="flex-1 px-6 py-3 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Fechar
              </motion.button>
              <motion.button
                onClick={() => {
                  setShowVagaDetails(false);
                  handleApply(selectedVagaDetails);
                }}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Send className="w-4 h-4" />
                Candidatar-se Agora
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default Vagas;
