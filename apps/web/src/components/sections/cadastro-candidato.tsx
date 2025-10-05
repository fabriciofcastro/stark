"use client";

import React from "react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { mockApi, mockJobPositions } from "@/lib/mock-data";
import GoogleLogin from "@/components/auth/GoogleLogin";
import { useToast } from "@/components/ui/Toast";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { validateForm, candidateValidationSchema } from "@/lib/validation";
import { candidateApi } from "@/services/api";
import { 
  User,
  Mail,
  Phone,
  Linkedin,
  FileText,
  Upload,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  Award,
  Star,
  Target,
  Heart,
  Zap,
  Globe,
  Code,
  Cloud,
  Shield,
  Brain,
  Palette,
  Rocket,
  X,
  Loader2,
  Eye,
  EyeOff,
  LogIn
} from "lucide-react";

interface CandidateFormData {
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  experience: string;
  skills: string[];
  preferredDepartments: string[];
  resume: File | null;
  coverLetter: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  linkedin?: string;
  experience?: string;
  skills?: string;
  preferredDepartments?: string;
  coverLetter?: string;
  resume?: string;
}

interface JobPosition {
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
  isRemote: boolean;
  isUrgent: boolean;
  postedDate: string;
}

const CadastroCandidato = () => {
  const toast = useToast();
  const [mounted, setMounted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [jobPositions, setJobPositions] = useState<JobPosition[]>([]);
  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);
  const [showJobSelection, setShowJobSelection] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isValidating, setIsValidating] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [preSelectedJob, setPreSelectedJob] = useState<JobPosition | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const [formData, setFormData] = useState<CandidateFormData>({
    name: '',
    email: '',
    phone: '',
    linkedin: '',
    experience: '',
    skills: [],
    preferredDepartments: [],
    resume: null,
    coverLetter: ''
  });

  const departments = [
    { id: 'Desenvolvimento', name: 'Desenvolvimento', icon: Code, color: 'cyan' },
    { id: 'Cloud Computing', name: 'Cloud Computing', icon: Cloud, color: 'sky' },
    { id: 'Segurança', name: 'Segurança', icon: Shield, color: 'red' },
    { id: 'Inteligência Artificial', name: 'Inteligência Artificial', icon: Brain, color: 'pink' },
    { id: 'UX/UI', name: 'UX/UI', icon: Palette, color: 'emerald' },
    { id: 'DevOps', name: 'DevOps', icon: Rocket, color: 'purple' }
  ];

  useEffect(() => {
    setMounted(true);
    loadJobPositions();
    
    // Verificar se há uma vaga pré-selecionada na URL
    const urlParams = new URLSearchParams(window.location.search);
    const vagaId = urlParams.get('vaga');
    if (vagaId) {
      setSelectedJobs([vagaId]);
      // Marcar que há uma vaga pré-selecionada
      setShowJobSelection(true);
    }
  }, []);

  // Atualizar vaga pré-selecionada quando as vagas forem carregadas
  useEffect(() => {
    if (jobPositions.length > 0 && selectedJobs.length > 0) {
      const preSelected = jobPositions.find(job => job.id === selectedJobs[0]);
      if (preSelected) {
        setPreSelectedJob(preSelected);
      }
    }
  }, [jobPositions, selectedJobs]);

  const loadJobPositions = async () => {
    try {
      setIsValidating(true);
      // Tentar buscar do backend real primeiro
      const response = await fetch('/api/candidates/jobs');
      
      if (response.ok) {
        const jobs = await response.json();
        setJobPositions(jobs);
      } else {
        // Fallback para dados mock se a API falhar
        const jobs = await mockApi.getJobPositions();
        setJobPositions(jobs);
      }
    } catch (error) {
      console.error('Erro ao carregar vagas:', error);
      // Fallback para dados mock estáticos
      setJobPositions(mockJobPositions);
    } finally {
      setIsValidating(false);
    }
  };

  const validateField = (field: keyof CandidateFormData, value: any): string | undefined => {
    switch (field) {
      case 'name':
        if (!value || value.trim().length < 2) {
          return 'Nome deve ter pelo menos 2 caracteres';
        }
        break;
      case 'email':
        if (!value) {
          return 'Email é obrigatório';
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return 'Email inválido';
        }
        break;
      case 'phone':
        if (value && !/^\(\d{2}\)\s\d{4,5}-\d{4}$/.test(value)) {
          return 'Telefone deve estar no formato (11) 99999-9999';
        }
        break;
      case 'linkedin':
        if (value && !value.includes('linkedin.com')) {
          return 'URL do LinkedIn inválida';
        }
        break;
      case 'experience':
        if (!value || value.trim().length < 10) {
          return 'Experiência deve ter pelo menos 10 caracteres';
        }
        break;
      case 'skills':
        if (!value || value.length === 0) {
          return 'Pelo menos uma habilidade é obrigatória';
        }
        break;
      case 'preferredDepartments':
        if (!value || value.length === 0) {
          return 'Selecione pelo menos um departamento';
        }
        break;
      case 'coverLetter':
        if (!value || value.trim().length < 20) {
          return 'Carta de apresentação deve ter pelo menos 20 caracteres';
        }
        break;
    }
    return undefined;
  };

  const handleInputChange = (field: keyof CandidateFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Validação em tempo real
    const error = validateField(field, value);
    setErrors(prev => ({
      ...prev,
      [field]: error
    }));
  };

  const handleSkillsChange = (value: string) => {
    const skills = value.split(',').map(skill => skill.trim()).filter(skill => skill);
    handleInputChange('skills', skills);
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 6) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6, 10)}`;
  };

  const handlePhoneChange = (value: string) => {
    const formatted = formatPhone(value);
    handleInputChange('phone', formatted);
  };

  const handleLogin = (email: string) => {
    console.log('Login realizado com email:', email);
    localStorage.setItem('candidateEmail', email);
    setShowLoginModal(false);
    
    // Feedback visual de sucesso
    alert('Login realizado com sucesso! Agora você pode verificar suas candidaturas.');
    
    // Redirecionar para página de vagas
    window.location.href = '/vagas';
  };

  const handleDepartmentToggle = (departmentId: string) => {
    setFormData(prev => ({
      ...prev,
      preferredDepartments: prev.preferredDepartments.includes(departmentId)
        ? prev.preferredDepartments.filter(id => id !== departmentId)
        : [...prev.preferredDepartments, departmentId]
    }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    handleInputChange('resume', file);
  };

  const handleJobToggle = (jobId: string) => {
    setSelectedJobs(prev => 
      prev.includes(jobId)
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  };

  const validateFormData = (): boolean => {
    const validation = validateForm(formData, candidateValidationSchema);
    setErrors(validation.errors);
    
    if (!validation.isValid) {
      toast.addToast({
        type: 'error',
        title: 'Formulário inválido',
        message: 'Por favor, corrija os erros destacados nos campos.',
        duration: 5000
      });
    }
    
    return validation.isValid;
  };

  const handleSubmit = async () => {
    if (!validateFormData()) {
      setSubmitStatus('error');
      setErrorMessage('Por favor, corrija os erros no formulário');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      // Criar candidato usando API profissional
      const candidate = await candidateApi.create({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        linkedin: formData.linkedin || undefined,
        experience: formData.experience || undefined,
        skills: formData.skills,
        preferredDepartments: formData.preferredDepartments,
        coverLetter: formData.coverLetter || undefined,
        source: 'website'
      });

      // Aplicar para vagas selecionadas
      let applicationsCount = 0;
      if (selectedJobs.length > 0) {
        for (const jobId of selectedJobs) {
          try {
            await candidateApi.applyToJob(formData.email, {
              jobPositionId: jobId,
              coverLetter: formData.coverLetter || undefined,
              resumeUrl: formData.resume ? URL.createObjectURL(formData.resume) : undefined,
            });
            applicationsCount++;
          } catch (applyError) {
            console.warn('Erro ao aplicar para vaga:', applyError);
          }
        }
      }

      // Notificação de sucesso
      toast.addToast({
        type: 'success',
        title: 'Cadastro realizado com sucesso!',
        message: `Candidato criado e ${applicationsCount} candidatura(s) enviada(s).`,
        duration: 8000,
        action: {
          label: 'Ver Vagas',
          onClick: () => window.location.href = '/vagas'
        }
      });

      setSubmitStatus('success');
      setCurrentStep(4);
      
      // Salvar email no localStorage para login automático
      localStorage.setItem('candidateEmail', formData.email);
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      const errorMessage = error instanceof Error ? error.message : 'Erro ao enviar formulário';
      
      toast.addToast({
        type: 'error',
        title: 'Erro no cadastro',
        message: errorMessage,
        duration: 10000
      });
      
      setErrorMessage(errorMessage);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1);
    } else if (currentStep === 3) {
      setShowJobSelection(true);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  if (!mounted) {
    return (
      <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="relative z-10 mx-auto max-w-7xl px-6 py-20">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 mb-8 rounded-full bg-gradient-to-r from-cyan-600 to-purple-600 shadow-2xl">
              <User className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent">
              Cadastro de Candidato
            </h1>
            <LoadingSpinner size="lg" color="white" text="Carregando formulário..." />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Modern Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5" />
        <div className="absolute inset-0 bg-gradient-to-tl from-blue-500/3 via-transparent to-pink-500/3" />
        
        {/* Animated Geometric Shapes */}
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-cyan-400/10 to-blue-400/10 rounded-full blur-xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        <motion.div
          className="absolute bottom-32 left-1/4 w-40 h-40 bg-gradient-to-r from-emerald-400/10 to-cyan-400/10 rounded-full blur-xl"
          animate={{
            x: [0, 60, 0],
            y: [0, -40, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5,
          }}
        />
        
        {/* Floating Tech Icons */}
        {[User, Briefcase, Heart, Target, Award, Globe, Zap, Star, Code, Cloud, Shield, Brain].map((Icon, index) => (
          <motion.div
            key={index}
            className="absolute text-white/5"
            style={{
              left: `${5 + (index * 8)}%`,
              top: `${10 + (index % 6) * 15}%`,
            }}
            animate={{
              y: [0, -40, 0],
              rotate: [0, 180, 360],
              scale: [0.5, 1, 0.5],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 12 + index * 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.5,
            }}
          >
            <Icon size={32} />
          </motion.div>
        ))}
        
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 py-20">
        
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center justify-center w-24 h-24 mb-8 rounded-full bg-gradient-to-r from-cyan-600 to-purple-600 shadow-2xl">
            <User className="w-12 h-12 text-white" />
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent">
            Cadastro de Candidato
          </h1>
          
          {/* Opção de Login */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 max-w-md mx-auto">
              <div className="flex items-center justify-center gap-4">
                <span className="text-gray-300 text-sm">Já tem uma conta?</span>
                <motion.button
                  onClick={() => setShowLoginModal(true)}
                  className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-lg hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <LogIn className="w-4 h-4" />
                  Fazer Login
                </motion.button>
              </div>
            </div>
          </motion.div>
          
          <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
            Preencha seus dados e encontre a <span className="text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text font-semibold">oportunidade perfeita</span> para sua carreira
          </p>

          {/* Vaga Pré-selecionada */}
          {preSelectedJob && (
            <motion.div
              className="max-w-2xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-400/30 rounded-2xl p-6 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Vaga Selecionada</h3>
                    <p className="text-sm text-gray-300">Você será direcionado para esta vaga</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="text-xl font-semibold text-white">{preSelectedJob.title}</h4>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-300">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-cyan-400" />
                      <span>{preSelectedJob.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-purple-400" />
                      <span>{preSelectedJob.type}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-emerald-400" />
                      <span>{preSelectedJob.salary}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-yellow-400" />
                      <span>{preSelectedJob.experience}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {preSelectedJob.isRemote && (
                      <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs">
                        Remoto
                      </span>
                    )}
                    {preSelectedJob.isUrgent && (
                      <span className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-xs">
                        Urgente
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Progress Bar */}
        {/* Progress Steps Fixo */}
        <motion.div
          className="sticky top-4 z-40 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-gradient-to-r from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl">
            {/* Indicador de Progresso */}
            <div className="flex items-center justify-center space-x-4 mb-4">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center">
                  <motion.div 
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                      currentStep >= step
                        ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg shadow-cyan-500/25'
                        : 'bg-white/10 text-gray-400 border border-white/20'
                    }`}
                    animate={currentStep === step ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                  >
                    {currentStep > step ? <CheckCircle className="w-5 h-5" /> : step}
                  </motion.div>
                  {step < 4 && (
                    <motion.div 
                      className={`w-20 h-2 mx-3 rounded-full transition-all duration-500 ${
                        currentStep > step 
                          ? 'bg-gradient-to-r from-cyan-500 to-purple-600' 
                          : 'bg-white/10'
                      }`}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: currentStep > step ? 1 : 0 }}
                      transition={{ duration: 0.5 }}
                    />
                  )}
                </div>
              ))}
            </div>
            
            {/* Título da Etapa Atual */}
            <div className="text-center">
              <motion.h3 
                key={currentStep}
                className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {currentStep === 1 && '📋 Informações Pessoais'}
                {currentStep === 2 && '💼 Experiência e Habilidades'}
                {currentStep === 3 && '🎯 Preferências de Trabalho'}
                {currentStep === 4 && '✅ Confirmação Final'}
              </motion.h3>
              <p className="text-gray-400 text-sm mt-1">
                Etapa {currentStep} de 4
              </p>
              
              {/* Barra de Progresso */}
              <div className="mt-4 w-full bg-white/10 rounded-full h-2">
                <motion.div 
                  className="bg-gradient-to-r from-cyan-500 to-purple-600 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(currentStep / 4) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Form Steps */}
        <motion.div
          className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-white mb-6">Informações Pessoais</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Nome Completo *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                        errors.name 
                          ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' 
                          : 'border-white/20 focus:border-cyan-400 focus:ring-cyan-400/20'
                      }`}
                      placeholder="Seu nome completo"
                    />
                    {formData.name && !errors.name && (
                      <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-emerald-400" />
                    )}
                  </div>
                  {errors.name && (
                    <motion.p 
                      className="text-red-400 text-sm mt-1"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {errors.name}
                    </motion.p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email *
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                        errors.email 
                          ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' 
                          : 'border-white/20 focus:border-cyan-400 focus:ring-cyan-400/20'
                      }`}
                      placeholder="seu@email.com"
                    />
                    {formData.email && !errors.email && (
                      <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-emerald-400" />
                    )}
                  </div>
                  {errors.email && (
                    <motion.p 
                      className="text-red-400 text-sm mt-1"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {errors.email}
                    </motion.p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Telefone
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handlePhoneChange(e.target.value)}
                      className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                        errors.phone 
                          ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' 
                          : 'border-white/20 focus:border-cyan-400 focus:ring-cyan-400/20'
                      }`}
                      placeholder="(11) 99999-9999"
                    />
                    {formData.phone && !errors.phone && (
                      <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-emerald-400" />
                    )}
                  </div>
                  {errors.phone && (
                    <motion.p 
                      className="text-red-400 text-sm mt-1"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {errors.phone}
                    </motion.p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    LinkedIn
                  </label>
                  <div className="relative">
                    <input
                      type="url"
                      value={formData.linkedin}
                      onChange={(e) => handleInputChange('linkedin', e.target.value)}
                      className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                        errors.linkedin 
                          ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' 
                          : 'border-white/20 focus:border-cyan-400 focus:ring-cyan-400/20'
                      }`}
                      placeholder="https://linkedin.com/in/seu-perfil"
                    />
                    {formData.linkedin && !errors.linkedin && (
                      <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-emerald-400" />
                    )}
                  </div>
                  {errors.linkedin && (
                    <motion.p 
                      className="text-red-400 text-sm mt-1"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {errors.linkedin}
                    </motion.p>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2: Experience and Skills */}
          {currentStep === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-white mb-6">Experiência e Habilidades</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Experiência Profissional
                  </label>
                  <textarea
                    value={formData.experience}
                    onChange={(e) => handleInputChange('experience', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                    placeholder="Descreva sua experiência profissional..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Habilidades (separadas por vírgula)
                  </label>
                  <input
                    type="text"
                    value={formData.skills.join(', ')}
                    onChange={(e) => handleSkillsChange(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                    placeholder="React, Node.js, Python, AWS..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Currículo (PDF)
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleFileChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-cyan-500 file:text-white hover:file:bg-cyan-600 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Preferences */}
          {currentStep === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-white mb-6">Preferências</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-4">
                    Departamentos de Interesse
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {departments.map((dept) => (
                      <button
                        key={dept.id}
                        onClick={() => handleDepartmentToggle(dept.id)}
                        className={`p-4 rounded-xl border transition-all duration-300 flex items-center gap-3 ${
                          formData.preferredDepartments.includes(dept.id)
                            ? 'border-cyan-400 bg-cyan-500/10 text-cyan-300'
                            : 'border-white/20 bg-white/5 text-gray-300 hover:border-white/40'
                        }`}
                      >
                        <dept.icon className={`w-6 h-6 ${
                          formData.preferredDepartments.includes(dept.id)
                            ? 'text-cyan-400'
                            : 'text-gray-400'
                        }`} />
                        <span className="font-medium">{dept.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Carta de Apresentação
                  </label>
                  <textarea
                    value={formData.coverLetter}
                    onChange={(e) => handleInputChange('coverLetter', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                    placeholder="Conte-nos por que você quer trabalhar conosco..."
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 4: Confirmation */}
          {currentStep === 4 && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {submitStatus === 'success' ? (
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-24 h-24 mb-8 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-600 shadow-2xl">
                    <CheckCircle className="w-12 h-12 text-white" />
                  </div>
                  
                  <h2 className="text-3xl font-bold text-white mb-4">
                    Cadastro Realizado com Sucesso!
                  </h2>
                  
                  <p className="text-gray-300 text-lg mb-8">
                    Seu perfil foi criado e suas candidaturas foram enviadas. 
                    Entraremos em contato em breve!
                  </p>
                  
                  <div className="flex gap-4 justify-center">
                    <motion.button
                      onClick={() => window.location.href = '/vagas'}
                      className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 flex items-center gap-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Ver Vagas
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                    
                    <motion.button
                      onClick={() => window.location.href = '/'}
                      className="px-8 py-4 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Voltar ao Início
                    </motion.button>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-white mb-6">Confirmação</h2>
                  
                  <div className="bg-white/5 rounded-xl p-6 mb-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Resumo do Cadastro</h3>
                    <div className="space-y-2 text-gray-300">
                      <p><strong>Nome:</strong> {formData.name}</p>
                      <p><strong>Email:</strong> {formData.email}</p>
                      <p><strong>Telefone:</strong> {formData.phone || 'Não informado'}</p>
                      <p><strong>LinkedIn:</strong> {formData.linkedin || 'Não informado'}</p>
                      <p><strong>Habilidades:</strong> {formData.skills.join(', ') || 'Nenhuma'}</p>
                      <p><strong>Departamentos:</strong> {formData.preferredDepartments.join(', ') || 'Nenhum'}</p>
                    </div>
                  </div>
                  
                  {showJobSelection && jobPositions.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-white mb-4">
                        {preSelectedJob ? 'Vaga Selecionada' : 'Selecione as Vagas de Interesse'}
                      </h3>
                      
                      {preSelectedJob ? (
                        <div className="space-y-4">
                          <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-400/30 rounded-xl p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-semibold text-white">{preSelectedJob.title}</h4>
                                <p className="text-sm text-gray-300">{preSelectedJob.department} • {preSelectedJob.location}</p>
                                <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                                  <span>{preSelectedJob.salary}</span>
                                  <span>{preSelectedJob.experience}</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                {preSelectedJob.isRemote && (
                                  <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs">
                                    Remoto
                                  </span>
                                )}
                                {preSelectedJob.isUrgent && (
                                  <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded-full text-xs">
                                    Urgente
                                  </span>
                                )}
                                <CheckCircle className="w-5 h-5 text-cyan-400" />
                              </div>
                            </div>
                          </div>
                          
                          <div className="text-center">
                            <motion.button
                              onClick={() => {
                                setPreSelectedJob(null);
                                setSelectedJobs([]);
                                setShowJobSelection(false);
                              }}
                              className="px-4 py-2 text-sm text-cyan-400 hover:text-cyan-300 border border-cyan-400/30 rounded-lg hover:border-cyan-400/50 transition-all duration-300"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              Alterar Vaga Selecionada
                            </motion.button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-3 max-h-60 overflow-y-auto">
                          {jobPositions.map((job) => (
                            <div
                              key={job.id}
                              className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                                selectedJobs.includes(job.id)
                                  ? 'border-cyan-400 bg-cyan-500/10'
                                  : 'border-white/20 bg-white/5 hover:border-white/40'
                              }`}
                              onClick={() => handleJobToggle(job.id)}
                            >
                              <div className="flex items-center justify-between">
                                <div>
                                  <h4 className="font-semibold text-white">{job.title}</h4>
                                  <p className="text-sm text-gray-300">{job.department} • {job.location}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                  {job.isRemote && (
                                    <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs">
                                      Remoto
                                    </span>
                                  )}
                                  {job.isUrgent && (
                                    <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded-full text-xs">
                                      Urgente
                                    </span>
                                  )}
                                  {selectedJobs.includes(job.id) && (
                                    <CheckCircle className="w-5 h-5 text-cyan-400" />
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          )}

          {/* Error Message */}
          {submitStatus === 'error' && (
            <motion.div
              className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <AlertCircle className="w-5 h-5 text-red-400" />
              <p className="text-red-300">{errorMessage}</p>
            </motion.div>
          )}

          {/* Navigation Buttons */}
          {currentStep < 4 && (
            <div className="flex justify-between mt-8">
              <motion.button
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  currentStep === 1
                    ? 'bg-white/5 text-gray-500 cursor-not-allowed'
                    : 'border border-white/20 text-white hover:bg-white/10'
                }`}
                whileHover={currentStep > 1 ? { scale: 1.05 } : {}}
                whileTap={currentStep > 1 ? { scale: 0.95 } : {}}
              >
                Anterior
              </motion.button>
              
              <motion.button
                onClick={currentStep === 3 ? handleSubmit : nextStep}
                disabled={isSubmitting}
                className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 flex items-center gap-2 disabled:opacity-50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <LoadingSpinner size="sm" color="white" />
                    Enviando...
                  </div>
                ) : (
                  <>
                    {currentStep === 3 ? 'Finalizar Cadastro' : 'Próximo'}
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </motion.button>
            </div>
          )}
        </motion.div>
      </div>

      {/* Modal de Login */}
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
            <div className="mt-8 text-center">
              <p className="text-gray-400 text-sm mb-3">Não tem cadastro?</p>
              <motion.button
                onClick={() => setShowLoginModal(false)}
                className="text-cyan-400 hover:text-cyan-300 text-sm font-medium border-b border-cyan-400/30 hover:border-cyan-300 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
              >
                Continue com o cadastro
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default CadastroCandidato;
