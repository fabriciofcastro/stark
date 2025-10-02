// components/sections/contact-section.jsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useId, useEffect } from "react";
import Input from "@/components/ui/input";
import Textarea from "@/components/ui/textarea";
import Select from "@/components/ui/select";
import { Button } from "../ui/button";
import { pushToast } from "@/components/ui/toast";
import {
  User,
  Building2,
  Settings,
  MessageSquare,
  CheckCircle,
  Clock,
  Target,
  Phone,
  Mail,
  MapPin,
  AlertCircle,
  X,
  Server,
  Cloud,
  Briefcase,
  Database,
  Monitor,
  HardDrive,
  Users,
} from "lucide-react";

type Errors = Partial<
  Record<
    | "name"
    | "email"
    | "company"
    | "phone"
    | "service"
    | "message"
    | "cnpj"
    | "budget"
    | "timeline"
    | "employees"
    | "currentSystem"
    | "priority"
    | "urgency",
    string
  >
>;

interface ServiceField {
  id: string;
  label: string;
  type: "text" | "select" | "textarea" | "number";
  required: boolean;
  options?: { value: string; label: string }[];
  placeholder?: string;
  description?: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface ServiceConfig {
  id: string;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  fields: ServiceField[];
  color: string;
}

const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

// Configurações dos serviços com campos dinâmicos
const serviceConfigs: ServiceConfig[] = [
  {
    id: "suporte",
    label: "Suporte Técnico",
    description: "Assistência técnica especializada para sua empresa",
    icon: Monitor,
    color: "green",
    fields: [
      {
        id: "urgency",
        label: "Urgência do Problema",
        type: "select",
        required: true,
        icon: AlertCircle,
        options: [
          { value: "critico", label: "Crítico - Sistema parado" },
          { value: "alto", label: "Alto - Impacto significativo" },
          { value: "medio", label: "Médio - Problema controlado" },
          { value: "baixo", label: "Baixo - Melhoria/consulta" },
        ],
        description: "Nos ajude a priorizar seu atendimento",
      },
      {
        id: "currentSystem",
        label: "Sistema Atual",
        type: "text",
        required: true,
        icon: Server,
        placeholder: "Ex: Windows Server 2019, Linux Ubuntu, etc.",
        description: "Qual sistema operacional ou software está com problema?",
      },
      {
        id: "timeline",
        label: "Prazo Desejado",
        type: "select",
        required: true,
        icon: Clock,
        options: [
          { value: "imediato", label: "Imediato (hoje)" },
          { value: "24h", label: "24 horas" },
          { value: "48h", label: "48 horas" },
          { value: "semana", label: "Esta semana" },
          { value: "flexivel", label: "Flexível" },
        ],
      },
    ],
  },
  {
    id: "nuvem",
    label: "Soluções em Nuvem",
    description: "Migração e gestão de infraestrutura na nuvem",
    icon: Cloud,
    color: "blue",
    fields: [
      {
        id: "budget",
        label: "Orçamento Estimado",
        type: "select",
        required: true,
        icon: Target,
        options: [
          { value: "ate-5k", label: "Até R$ 5.000/mês" },
          { value: "5k-15k", label: "R$ 5.000 - R$ 15.000/mês" },
          { value: "15k-50k", label: "R$ 15.000 - R$ 50.000/mês" },
          { value: "acima-50k", label: "Acima de R$ 50.000/mês" },
          { value: "consultar", label: "Preciso de consultoria" },
        ],
        description: "Nos ajude a dimensionar a solução ideal",
      },
      {
        id: "employees",
        label: "Número de Usuários",
        type: "number",
        required: true,
        icon: Users,
        placeholder: "Ex: 50",
        description: "Quantos usuários utilizarão o sistema?",
      },
      {
        id: "currentSystem",
        label: "Sistema Atual",
        type: "text",
        required: false,
        icon: Server,
        placeholder: "Ex: Servidor local, Google Workspace, etc.",
        description: "Opcional: Descreva sua infraestrutura atual",
      },
    ],
  },
  {
    id: "consultoria",
    label: "Consultoria Estratégica",
    description: "Orientação estratégica em tecnologia e processos",
    icon: Briefcase,
    color: "purple",
    fields: [
      {
        id: "priority",
        label: "Área de Foco",
        type: "select",
        required: true,
        icon: Target,
        options: [
          { value: "governanca", label: "Governança de TI" },
          { value: "seguranca", label: "Segurança da Informação" },
          { value: "processos", label: "Otimização de Processos" },
          { value: "digitalizacao", label: "Transformação Digital" },
          { value: "compliance", label: "Compliance e LGPD" },
          { value: "outro", label: "Outro (especificar na mensagem)" },
        ],
        description: "Qual área precisa de mais atenção?",
      },
      {
        id: "employees",
        label: "Tamanho da Empresa",
        type: "select",
        required: true,
        icon: Building2,
        options: [
          { value: "micro", label: "Microempresa (até 9 funcionários)" },
          { value: "pequena", label: "Pequena (10-49 funcionários)" },
          { value: "media", label: "Média (50-249 funcionários)" },
          { value: "grande", label: "Grande (250+ funcionários)" },
        ],
      },
      {
        id: "timeline",
        label: "Prazo para Implementação",
        type: "select",
        required: true,
        icon: Clock,
        options: [
          { value: "1-mes", label: "1 mês" },
          { value: "3-meses", label: "3 meses" },
          { value: "6-meses", label: "6 meses" },
          { value: "1-ano", label: "1 ano" },
          { value: "flexivel", label: "Flexível" },
        ],
      },
    ],
  },
  {
    id: "recuperacao",
    label: "Recuperação de Dados",
    description: "Recuperação de dados perdidos ou corrompidos",
    icon: Database,
    color: "red",
    fields: [
      {
        id: "urgency",
        label: "Urgência da Recuperação",
        type: "select",
        required: true,
        icon: AlertCircle,
        options: [
          { value: "critico", label: "Crítico - Dados essenciais perdidos" },
          { value: "alto", label: "Alto - Impacto no negócio" },
          { value: "medio", label: "Médio - Pode aguardar alguns dias" },
          { value: "baixo", label: "Baixo - Dados de backup" },
        ],
      },
      {
        id: "currentSystem",
        label: "Tipo de Mídia/Dispositivo",
        type: "text",
        required: true,
        icon: HardDrive,
        placeholder: "Ex: HD, SSD, NAS, servidor, etc.",
        description: "Onde estavam armazenados os dados?",
      },
      {
        id: "timeline",
        label: "Prazo Máximo",
        type: "select",
        required: true,
        icon: Clock,
        options: [
          { value: "imediato", label: "Imediato (hoje)" },
          { value: "24h", label: "24 horas" },
          { value: "48h", label: "48 horas" },
          { value: "semana", label: "Esta semana" },
        ],
      },
    ],
  },
];

function maskPhone(input: string): string {
  const digits = input.replace(/\D/g, "");
  if (digits.length <= 10) {
    return digits
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{4})(\d)/, "$1-$2")
      .slice(0, 14);
  }
  return digits
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .slice(0, 15);
}

const Contact = ({ showHeading = true }: { showHeading?: boolean }) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [service, setService] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [consent, setConsent] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [sent, setSent] = useState<boolean>(false);
  const [errors, setErrors] = useState<Errors>({});
  const [statusMsg, setStatusMsg] = useState<string>("");
  const [statusType, setStatusType] = useState<"idle" | "error" | "success">(
    "idle",
  );
  const [showValidationPopup, setShowValidationPopup] =
    useState<boolean>(false);
  const [dynamicFields, setDynamicFields] = useState<Record<string, string>>(
    {},
  );
  const [autoSaveStatus, setAutoSaveStatus] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);
  const [fieldFocus, setFieldFocus] = useState<string>("");
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  const honeyRef = useRef<HTMLInputElement | null>(null);
  const MESSAGE_MAX = 500;

  // Gerar IDs únicos
  const nameId = useId();
  const emailId = useId();
  const companyId = useId();
  const phoneId = useId();
  const serviceId = useId();
  const messageId = useId();
  const consentId = useId();
  const patternId = useId();

  // Obter configuração do serviço selecionado
  const selectedServiceConfig = serviceConfigs.find((s) => s.id === service);

  // Sistema de Auto-Save
  useEffect(() => {
    const autoSave = () => {
      const formData = { name, email, company, phone, service, message, dynamicFields };
      localStorage.setItem('contact-form-draft', JSON.stringify(formData));
      setAutoSaveStatus("Salvo automaticamente");
      setTimeout(() => setAutoSaveStatus(""), 2000);
    };

    const timer = setTimeout(autoSave, 1000);
    return () => clearTimeout(timer);
  }, [name, email, company, phone, service, message, dynamicFields]);

  // Carregar dados salvos
  useEffect(() => {
    const saved = localStorage.getItem('contact-form-draft');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setAutoSaveStatus("Dados recuperados");
        setTimeout(() => setAutoSaveStatus(""), 2000);
      } catch (e) {
        console.log('Erro ao carregar dados salvos');
      }
    }
  }, []);

  // Calcular progresso do formulário
  useEffect(() => {
    const fields = [name, email, company, phone, service, message];
    const completed = fields.filter(field => field && field.trim().length > 0).length;
    const dynamicCompleted = selectedServiceConfig 
      ? selectedServiceConfig.fields.filter(field => dynamicFields[field.id]).length 
      : 0;
    
    const totalFields = fields.length + (selectedServiceConfig?.fields.length || 0);
    const totalCompleted = completed + dynamicCompleted;
    
    setProgress((totalCompleted / totalFields) * 100);
  }, [name, email, company, phone, service, message, dynamicFields, selectedServiceConfig]);

  // Efeito de scroll para barra de progresso
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setScrollProgress(scrollPercent);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  function validate(): Errors {
    const e: Errors = {};
    if (!name || name.trim().length < 3)
      e.name = "Informe seu nome completo (mín. 3 caracteres).";
    if (!email || !emailRegex.test(email))
      e.email = "Informe um e-mail válido.";
    if (!company || company.trim().length < 2)
      e.company = "Informe o nome da empresa.";
    const digits = (phone || "").replace(/\D/g, "");
    if (digits.length < 10) e.phone = "Telefone inválido. Use DDD + número.";
    if (!service) e.service = "Selecione um serviço.";
    if (!message || message.trim().length < 10)
      e.message = "Mensagem deve ter pelo menos 10 caracteres.";

    // Validar campos dinâmicos do serviço selecionado
    if (selectedServiceConfig) {
      selectedServiceConfig.fields.forEach((field) => {
        if (
          field.required &&
          (!dynamicFields[field.id] ||
            dynamicFields[field.id].trim().length === 0)
        ) {
          e[field.id as keyof Errors] = `${field.label} é obrigatório.`;
        }
      });
    }

    return e;
  }

  const validateField = (field: keyof Errors) => {
    const res = validate();
    setErrors((prev) => ({ ...prev, [field]: res[field] }));
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();

    if (submitting) return;

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatusType("error");
      setStatusMsg("Por favor, corrija os erros antes de enviar.");
      setShowValidationPopup(true);
      return;
    }

    if (!consent) {
      setStatusType("error");
      setStatusMsg("É necessário aceitar os termos para continuar.");
      setShowValidationPopup(true);
      return;
    }

    setSubmitting(true);
    setStatusType("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          company,
          phone,
          service,
          message,
          serviceDetails: selectedServiceConfig
            ? {
                serviceName: selectedServiceConfig.label,
                serviceDescription: selectedServiceConfig.description,
                fields: dynamicFields,
              }
            : null,
        }),
      });

      if (response.ok) {
        setSent(true);
        setStatusType("success");
        setStatusMsg("Mensagem enviada com sucesso.");
        pushToast({
          type: "success",
          message: "Mensagem enviada! Responderemos em breve.",
        });

        // Limpar formulário e dados salvos
        setTimeout(() => {
          setName("");
          setEmail("");
          setCompany("");
          setPhone("");
          setService("");
          setMessage("");
          setDynamicFields({});
          setConsent(false);
          localStorage.removeItem('contact-form-draft');
          setProgress(0);
          setSent(false);
        }, 3000);
      } else {
        throw new Error("Erro no servidor");
      }
    } catch {
      setStatusType("error");
      setStatusMsg("Erro ao enviar. Tente novamente.");
      pushToast({
        type: "error",
        message: "Erro ao enviar mensagem. Tente novamente.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8 reveal relative overflow-x-hidden min-h-screen">
      {/* Barra de Progresso Sticky */}
      <motion.div 
        className="fixed top-0 left-0 right-0 z-50 h-1 bg-slate-800/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.div 
          className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 shadow-lg shadow-cyan-500/30"
          style={{ width: `${scrollProgress}%` }}
          transition={{ duration: 0.1 }}
        />
      </motion.div>
      {/* Background Elegante e Moderno */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Gradiente Principal */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900" />
        
        {/* Overlay com padrão radial */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(147,51,234,0.1)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(34,197,94,0.1)_0%,transparent_50%)]" />
        
        {/* Linhas de energia sutis */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400/30 to-transparent" />
          <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-blue-400/30 to-transparent" />
          <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-indigo-400/30 to-transparent" />
        </div>

        {/* Elementos flutuantes elegantes */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-cyan-400/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-purple-400/10 rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 right-1/3 w-16 h-16 bg-blue-400/10 rounded-full blur-xl animate-pulse"
          style={{ animationDelay: "4s" }}
        />

        {/* Partículas flutuantes */}
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute bg-gradient-to-r from-cyan-400/20 to-purple-400/20 rounded-full blur-sm"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 12 + Math.random() * 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="mx-auto max-w-4xl relative z-10">
        {showHeading && (
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-brand-gold-500/10 border border-brand-gold-500/20 rounded-full mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <MessageSquare className="w-4 h-4 text-brand-gold-400" />
              <span className="text-sm text-brand-gold-400 font-medium">
                Formulário Inteligente
              </span>
            </motion.div>

            <motion.h3
              className="mb-4 font-bold text-4xl text-white md:text-5xl lg:text-6xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Entre em{" "}
              <span className="text-brand-gold-400 drop-shadow-lg">
                Contato
              </span>
            </motion.h3>

            <motion.p
              className="mx-auto max-w-3xl text-xl text-gray-200 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Nosso formulário inteligente guia você passo a passo para garantir
              que coletemos todas as informações necessárias para oferecer a
              melhor solução para sua empresa.
            </motion.p>

            <motion.div
              className="flex items-center justify-center gap-6 mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Validação em tempo real</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Clock className="w-4 h-4 text-brand-gold-400" />
                <span>Resposta em até 15 min</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Target className="w-4 h-4 text-blue-400" />
                <span>Proposta personalizada</span>
              </div>
            </motion.div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="relative rounded-3xl border border-slate-700/50 bg-slate-800/30 backdrop-blur-xl shadow-2xl overflow-hidden"
        >
          {/* Borda estilo vidro com animação de reflexo */}
          <div className="absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-r from-cyan-400/20 via-blue-500/20 to-purple-500/20 bg-clip-border">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-400/10 via-blue-500/10 to-purple-500/10" />
          </div>
          
          {/* Animação de reflexo que percorre a borda */}
          <div className="absolute inset-0 rounded-3xl overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              style={{
                background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)",
                width: "200%",
                height: "100%",
                transform: "translateX(-100%)"
              }}
              animate={{
                transform: "translateX(100%)"
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut"
              }}
            />
          </div>

          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 pointer-events-none" />

          {/* Content container */}
          <div className="relative p-8 md:p-12">
            {/* Cabeçalho Modernizado - Sticky */}
            <motion.div
              className="sticky top-4 z-40 mb-8 p-8 bg-gradient-to-br from-slate-900/90 via-indigo-900/80 to-purple-900/90 rounded-2xl border border-slate-600/50 backdrop-blur-md shadow-xl"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)'
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-xl font-bold bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent">
                  ✨ Formulário Inteligente
                </h4>
                <div className="flex items-center gap-3">
                  {autoSaveStatus && (
                    <motion.span 
                      className="text-sm text-emerald-400 flex items-center gap-2"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                    >
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                      {autoSaveStatus}
                    </motion.span>
                  )}
                  <span className="text-sm text-cyan-300 font-semibold bg-slate-800/50 px-3 py-1 rounded-full border border-slate-600/50">
                    {Math.round(progress)}% completo
                  </span>
                </div>
              </div>

              <div className="relative">
                <div className="w-full bg-slate-700/50 rounded-full h-3 overflow-hidden border border-slate-600/30">
                  <motion.div
                    className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-full shadow-lg shadow-cyan-500/30"
                    initial={{ width: 0 }}
                    animate={{
                      width: `${Math.round(progress)}%`,
                    }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent rounded-full animate-pulse" />
              </div>

              <div className="flex items-center justify-between mt-3 text-xs text-gray-400">
                <span>
                  Campos obrigatórios:{" "}
                  {(name ? 1 : 0) +
                    (email ? 1 : 0) +
                    (company ? 1 : 0) +
                    (phone ? 1 : 0) +
                    (service ? 1 : 0) +
                    (message ? 1 : 0)}
                  /6
                </span>
                <span>Tempo estimado: ~3 min</span>
              </div>
            </motion.div>


            <form className="space-y-8" onSubmit={handleSubmit} noValidate>
              <input
                ref={honeyRef}
                type="text"
                className="hidden"
                aria-hidden="true"
                tabIndex={-1}
                title="Campo honeypot para bots"
              />

              {/* Seção 1: Dados Pessoais */}
              <motion.div
                className="p-6 bg-slate-800/40 rounded-2xl border border-slate-600/40 backdrop-blur-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                whileHover={{
                  borderColor: "rgba(34, 197, 94, 0.3)",
                  boxShadow: "0 10px 30px rgba(34, 197, 94, 0.1)",
                }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl">
                    <User className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="text-white text-xl font-bold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
                      Seus Dados
                    </h4>
                    <p className="text-sm text-slate-300">
                      Informações básicas para contato
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <Input
                    id={nameId}
                    label="Nome Completo *"
                    floating
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setErrors((prev) => ({ ...prev, name: undefined }));
                    }}
                    onBlur={() => validateField("name")}
                    description="Informe ao menos 3 caracteres."
                    required
                    error={errors.name}
                    autoComplete="name"
                  />
                  <Input
                    id={emailId}
                    label="Email *"
                    type="email"
                    floating
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setErrors((prev) => ({ ...prev, email: undefined }));
                    }}
                    onBlur={() => validateField("email")}
                    description="Nunca compartilharemos seu e-mail."
                    required
                    error={errors.email}
                    autoComplete="email"
                  />
                  <Input
                    id={companyId}
                    label="Empresa *"
                    floating
                    value={company}
                    onChange={(e) => {
                      setCompany(e.target.value);
                      setErrors((prev) => ({ ...prev, company: undefined }));
                    }}
                    onBlur={() => validateField("company")}
                    required
                    error={errors.company}
                    autoComplete="organization"
                  />
                  <Input
                    id={phoneId}
                    label="Telefone *"
                    type="tel"
                    floating
                    value={phone}
                    onChange={(e) => {
                      const m = maskPhone(e.target.value);
                      setPhone(m);
                      setErrors((prev) => ({ ...prev, phone: undefined }));
                    }}
                    onBlur={() => validateField("phone")}
                    description="Inclua DDD. Ex: (11) 91234-5678."
                    required
                    error={errors.phone}
                    autoComplete="tel"
                  />
                </div>
              </motion.div>

              {/* Seção 2: Serviços - Design Modernizado */}
              <motion.div
                className="relative p-8 bg-gradient-to-br from-slate-800/50 to-slate-700/40 rounded-3xl border border-slate-600/50 backdrop-blur-sm shadow-2xl"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                whileHover={{
                  borderColor: "rgba(147, 51, 234, 0.3)",
                  boxShadow: "0 15px 40px rgba(147, 51, 234, 0.1)",
                }}
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/10 via-indigo-500/5 to-blue-500/10 opacity-50" />
                <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-purple-400/20 to-indigo-400/20 rounded-full blur-xl" />
                
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-8">
                    <motion.div 
                      className="p-3 bg-gradient-to-br from-blue-500/30 to-cyan-500/30 rounded-xl border border-blue-400/30"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Settings className="w-6 h-6 text-blue-300" />
                    </motion.div>
                    <div>
                      <h4 className="text-white text-xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                        O que você precisa
                      </h4>
                      <p className="text-sm text-gray-300">
                        Selecione o serviço de interesse para personalizar o formulário
                      </p>
                    </div>
                  </div>

                <Select
                  id={serviceId}
                  label="Serviço de Interesse *"
                  value={service}
                  onChange={(e) => {
                    setService(e.target.value);
                    setErrors((prev) => ({ ...prev, service: undefined }));
                    // Limpar campos dinâmicos quando mudar o serviço
                    setDynamicFields({});
                  }}
                  onBlur={() => validateField("service")}
                  description="Selecione o assunto principal."
                  required
                  error={errors.service}
                  options={[
                    { value: "", label: "Selecione um serviço..." },
                    ...serviceConfigs.map((config) => ({
                      value: config.id,
                      label: config.label,
                    }))
                  ]}
                />

                {/* Campos dinâmicos baseados no serviço selecionado - Design Modernizado */}
                <AnimatePresence>
                  {selectedServiceConfig && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, scale: 0.95 }}
                      animate={{ opacity: 1, height: "auto", scale: 1 }}
                      exit={{ opacity: 0, height: 0, scale: 0.95 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="mt-8 space-y-6"
                    >
                      <motion.div 
                        className="relative p-6 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl border border-white/20 backdrop-blur-sm"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        {/* Service Header */}
                        <div className="flex items-center gap-4 mb-6">
                          <motion.div
                            className={`p-3 rounded-xl bg-gradient-to-br from-${selectedServiceConfig.color}-500/30 to-${selectedServiceConfig.color}-600/20 border border-${selectedServiceConfig.color}-400/30`}
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ duration: 0.2 }}
                          >
                            <selectedServiceConfig.icon
                              className={`w-6 h-6 text-${selectedServiceConfig.color}-300`}
                            />
                          </motion.div>
                          <div>
                            <h5 className="text-white text-lg font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                              {selectedServiceConfig.label}
                            </h5>
                            <p className="text-sm text-gray-300">
                              {selectedServiceConfig.description}
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 gap-6">
                          {selectedServiceConfig.fields.map((field, index) => {
                            const IconComponent = field.icon;
                            const fieldId = `${field.id}-${index}`;
                            return (
                              <motion.div 
                                key={field.id} 
                                className="space-y-3 p-4 bg-white/5 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 + 0.3 }}
                                whileHover={{ 
                                  backgroundColor: "rgba(255,255,255,0.08)",
                                  borderColor: "rgba(255,255,255,0.3)"
                                }}
                              >
                                <label
                                  htmlFor={fieldId}
                                  className="flex items-center gap-3 text-sm font-semibold text-white"
                                >
                                  <motion.div
                                    className={`p-2 rounded-lg bg-gradient-to-br from-${selectedServiceConfig.color}-500/20 to-${selectedServiceConfig.color}-600/10`}
                                    whileHover={{ scale: 1.1 }}
                                  >
                                    <IconComponent className={`w-4 h-4 text-${selectedServiceConfig.color}-400`} />
                                  </motion.div>
                                  {field.label}
                                  {field.required && (
                                    <span className="text-red-400 ml-1">*</span>
                                  )}
                                </label>

                                {field.type === "select" ? (
                                  <Select
                                    id={fieldId}
                                    value={dynamicFields[field.id] || ""}
                                    onChange={(e) => {
                                      setDynamicFields((prev) => ({
                                        ...prev,
                                        [field.id]: e.target.value,
                                      }));
                                      setErrors((prev) => ({
                                        ...prev,
                                        [field.id]: undefined,
                                      }));
                                    }}
                                    onBlur={() =>
                                      validateField(field.id as keyof Errors)
                                    }
                                    options={field.options || []}
                                    error={errors[field.id as keyof Errors]}
                                  />
                                ) : field.type === "textarea" ? (
                                  <Textarea
                                    id={fieldId}
                                    value={dynamicFields[field.id] || ""}
                                    onChange={(e) => {
                                      setDynamicFields((prev) => ({
                                        ...prev,
                                        [field.id]: e.target.value,
                                      }));
                                      setErrors((prev) => ({
                                        ...prev,
                                        [field.id]: undefined,
                                      }));
                                    }}
                                    onBlur={() =>
                                      validateField(field.id as keyof Errors)
                                    }
                                    placeholder={field.placeholder}
                                    error={errors[field.id as keyof Errors]}
                                    rows={3}
                                  />
                                ) : (
                                  <Input
                                    id={fieldId}
                                    type={field.type}
                                    value={dynamicFields[field.id] || ""}
                                    onChange={(e) => {
                                      setDynamicFields((prev) => ({
                                        ...prev,
                                        [field.id]: e.target.value,
                                      }));
                                      setErrors((prev) => ({
                                        ...prev,
                                        [field.id]: undefined,
                                      }));
                                    }}
                                    onBlur={() =>
                                      validateField(field.id as keyof Errors)
                                    }
                                    placeholder={field.placeholder}
                                    error={errors[field.id as keyof Errors]}
                                  />
                                )}

                                {field.description && (
                                  <p className="text-xs text-gray-400">
                                    {field.description}
                                  </p>
                                )}
                              </motion.div>
                            );
                          })}
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
                </div>
              </motion.div>

              {/* Seção 3: Mensagem */}
              <motion.div
                className="p-6 bg-slate-800/40 rounded-2xl border border-slate-600/40 backdrop-blur-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                whileHover={{
                  borderColor: "rgba(59, 130, 246, 0.3)",
                  boxShadow: "0 10px 30px rgba(59, 130, 246, 0.1)",
                }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl">
                    <MessageSquare className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-white text-xl font-bold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
                      Sua Mensagem
                    </h4>
                    <p className="text-sm text-slate-300">
                      Descreva sua necessidade com detalhes
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Textarea
                    id={messageId}
                    label="Mensagem *"
                    floating
                    rows={5}
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      setErrors((prev) => ({ ...prev, message: undefined }));
                    }}
                    onBlur={() => validateField("message")}
                    maxLength={MESSAGE_MAX}
                    required
                    error={errors.message}
                    showCounter
                  />
                  
                  {/* Contador de Caracteres Melhorado */}
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-400">
                      {message.length} / {MESSAGE_MAX} caracteres
                    </span>
                    {message.length > MESSAGE_MAX * 0.8 && (
                      <motion.span 
                        className={`px-2 py-1 rounded-full text-xs ${
                          message.length >= MESSAGE_MAX 
                            ? 'bg-red-500/20 text-red-300' 
                            : 'bg-yellow-500/20 text-yellow-300'
                        }`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                      >
                        {message.length >= MESSAGE_MAX ? 'Limite atingido' : 'Quase no limite'}
                      </motion.span>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Seção de Consentimento */}
              <motion.div
                className="p-6 bg-white/5 rounded-2xl border border-white/10"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-green-500/20 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  </div>
                  <h4 className="text-white text-lg font-semibold">
                    Consentimento LGPD
                  </h4>
                </div>

                <label
                  htmlFor={consentId}
                  className="flex items-start gap-3 text-sm text-gray-200 cursor-pointer"
                >
                  <input
                    id={consentId}
                    type="checkbox"
                    className="mt-1 h-5 w-5 rounded border-white/30 bg-transparent text-brand-gold-500 focus:outline-none focus:ring-2 focus:ring-brand-gold-500/50"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                  />
                  <span className="leading-relaxed">
                    Autorizo o uso dos meus dados para contato e envio de
                    proposta comercial, conforme nossa{" "}
                    <a
                      href="/politica-de-privacidade"
                      className="text-brand-gold-400 hover:text-brand-gold-300 underline"
                    >
                      Política de Privacidade
                    </a>{" "}
                    e em conformidade com a LGPD. *
                  </span>
                </label>
              </motion.div>

              {statusType !== "idle" && (
                <motion.output
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`text-sm ${
                    statusType === "error"
                      ? "text-red-400"
                      : statusType === "success"
                        ? "text-emerald-400"
                        : "text-gray-200"
                  }`}
                  aria-live={statusType === "error" ? "assertive" : "polite"}
                >
                  {statusMsg}
                </motion.output>
              )}

              {/* Botão de Envio Modernizado */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <motion.div 
                  className="relative flex-1"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.button
                    type="submit"
                    className="w-full px-8 py-4 bg-gradient-to-r from-slate-800 via-indigo-800 to-purple-800 text-white font-bold rounded-2xl shadow-2xl cursor-pointer relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed border border-slate-700/50"
                    disabled={submitting || !consent}
                    whileHover={{ 
                      boxShadow: "0 20px 40px rgba(34, 197, 94, 0.3)",
                      y: -2,
                      borderColor: "rgba(34, 197, 94, 0.5)"
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Background animado */}
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Conteúdo do botão */}
                    <span className="relative z-10 flex items-center justify-center gap-3 text-lg">
                      {submitting ? (
                        <>
                          <motion.div 
                            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                          Enviando sua mensagem...
                        </>
                      ) : sent ? (
                        <>
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200 }}
                          >
                            <CheckCircle className="w-5 h-5" />
                          </motion.div>
                          Mensagem enviada com sucesso!
                        </>
                      ) : (
                        <>
                          <Mail className="w-5 h-5" />
                          Enviar Mensagem
                        </>
                      )}
                    </span>

                    {/* Efeito de brilho */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    
                    {/* Efeito de partículas */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute top-2 left-4 w-1 h-1 bg-cyan-400 rounded-full animate-ping" />
                      <div className="absolute top-4 right-6 w-1 h-1 bg-blue-400 rounded-full animate-ping delay-100" />
                      <div className="absolute bottom-3 left-8 w-1 h-1 bg-purple-400 rounded-full animate-ping delay-200" />
                    </div>
                  </motion.button>
                </motion.div>
              </motion.div>

              <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
                <span>Ctrl/Cmd + Enter para enviar</span>
                <span>•</span>
                <span>Resposta em até 15 minutos</span>
                <span>•</span>
                <span>Dados protegidos pela LGPD</span>
              </div>

              {/* Botão de Limpeza */}
              <motion.div 
                className="flex justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                <motion.button
                  type="button"
                  onClick={() => {
                    if (confirm('Tem certeza que deseja limpar todo o formulário?')) {
                      setName("");
                      setEmail("");
                      setCompany("");
                      setPhone("");
                      setService("");
                      setMessage("");
                      setDynamicFields({});
                      setConsent(false);
                      localStorage.removeItem('contact-form-draft');
                      setProgress(0);
                      setErrors({});
                    }
                  }}
                  className="px-4 py-2 text-sm text-slate-400 hover:text-white border border-slate-600 hover:border-slate-400 rounded-lg transition-all duration-300 bg-slate-800/30 hover:bg-slate-700/50"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Limpar Formulário
                </motion.button>
              </motion.div>
            </form>
          </div>
        </motion.div>

        {/* Informações de Contato Modernizadas */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <motion.div 
            className="relative p-8 bg-gradient-to-br from-white/10 to-white/5 rounded-3xl border border-white/20 backdrop-blur-sm shadow-2xl"
            whileHover={{ 
              borderColor: "rgba(255,255,255,0.3)",
              boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
            }}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-slate-800/20 via-indigo-800/10 to-purple-800/20 opacity-50" />
            <div className="absolute top-4 left-4 w-16 h-16 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-full blur-xl" />
            <div className="absolute bottom-4 right-4 w-12 h-12 bg-gradient-to-br from-purple-400/20 to-indigo-400/20 rounded-full blur-xl" />
            
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-white mb-4 bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent">
                Outros Meios de Contato
              </h3>
              <p className="text-gray-300 mb-8">
                Prefere falar diretamente? Estamos disponíveis em múltiplos canais:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* WhatsApp */}
                <motion.a
                  href="https://wa.me/5511994396469"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative p-6 bg-gradient-to-br from-green-500/20 to-green-600/10 border border-green-500/30 rounded-2xl text-green-400 hover:from-green-500/30 hover:to-green-600/20 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Contato via WhatsApp"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-green-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative z-10">
                    <motion.div 
                      className="p-3 bg-green-500/30 rounded-xl mb-4 w-fit mx-auto"
                      whileHover={{ rotate: 5 }}
                    >
                      <Phone className="w-6 h-6" />
                    </motion.div>
                    <h4 className="font-bold text-lg mb-2">WhatsApp</h4>
                    <p className="text-sm text-green-300">Resposta instantânea</p>
                  </div>
                </motion.a>

                {/* Email */}
                <motion.a
                  href="mailto:contato@fernandohenrique.dev"
                  className="group relative p-6 bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/30 rounded-2xl text-blue-400 hover:from-blue-500/30 hover:to-blue-600/20 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Contato via e-mail"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative z-10">
                    <motion.div 
                      className="p-3 bg-blue-500/30 rounded-xl mb-4 w-fit mx-auto"
                      whileHover={{ rotate: 5 }}
                    >
                      <Mail className="w-6 h-6" />
                    </motion.div>
                    <h4 className="font-bold text-lg mb-2">E-mail</h4>
                    <p className="text-sm text-blue-300">Resposta em 24h</p>
                  </div>
                </motion.a>

                {/* Localização */}
                <motion.div
                  className="group relative p-6 bg-gradient-to-br from-purple-500/20 to-purple-600/10 border border-purple-500/30 rounded-2xl text-purple-400"
                  whileHover={{ scale: 1.05, y: -5 }}
                  aria-label="Localização"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-purple-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative z-10">
                    <motion.div 
                      className="p-3 bg-purple-500/30 rounded-xl mb-4 w-fit mx-auto"
                      whileHover={{ rotate: 5 }}
                    >
                      <MapPin className="w-6 h-6" />
                    </motion.div>
                    <h4 className="font-bold text-lg mb-2">São Paulo, SP</h4>
                    <p className="text-sm text-purple-300">Atendimento presencial</p>
                  </div>
                </motion.div>
              </div>

              {/* Status de Disponibilidade */}
              <motion.div 
                className="mt-8 p-4 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 rounded-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <div className="flex items-center justify-center gap-3">
                  <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse" />
                  <span className="text-emerald-300 font-semibold">
                    Online agora - Resposta em até 15 minutos
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Seção de Informações Adicionais */}
          <motion.div
            className="mt-8 p-8 bg-gradient-to-br from-slate-800/60 via-indigo-800/40 to-purple-800/60 rounded-2xl border border-slate-600/50 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            whileHover={{
              borderColor: "rgba(147, 51, 234, 0.3)",
              boxShadow: "0 15px 40px rgba(147, 51, 234, 0.1)",
            }}
          >
            <div className="text-center">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent mb-4">
                🚀 Por que escolher nossa empresa?
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <motion.div
                  className="p-6 bg-slate-800/40 rounded-xl border border-slate-600/30"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-3xl mb-3">⚡</div>
                  <h4 className="text-white font-semibold mb-2">Resposta Rápida</h4>
                  <p className="text-slate-300 text-sm">Resposta em até 15 minutos durante horário comercial</p>
                </motion.div>

                <motion.div
                  className="p-6 bg-slate-800/40 rounded-xl border border-slate-600/30"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-3xl mb-3">🎯</div>
                  <h4 className="text-white font-semibold mb-2">Soluções Personalizadas</h4>
                  <p className="text-slate-300 text-sm">Cada projeto é único e adaptado às suas necessidades</p>
                </motion.div>

                <motion.div
                  className="p-6 bg-slate-800/40 rounded-xl border border-slate-600/30"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-3xl mb-3">🔒</div>
                  <h4 className="text-white font-semibold mb-2">Dados Seguros</h4>
                  <p className="text-slate-300 text-sm">Seus dados são protegidos conforme a LGPD</p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Popup de Validação */}
      <AnimatePresence>
        {showValidationPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowValidationPopup(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-red-100 rounded-lg">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Campos Obrigatórios
                </h3>
                <button
                  type="button"
                  onClick={() => setShowValidationPopup(false)}
                  className="ml-auto p-1 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="space-y-3 mb-6">
                <p className="text-gray-600">
                  Por favor, preencha os seguintes campos obrigatórios:
                </p>
                <ul className="space-y-2">
                  {Object.entries(errors).map(([field, error]) => (
                    <li
                      key={field}
                      className="flex items-center gap-2 text-sm text-red-600"
                    >
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                      <span>{error}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => setShowValidationPopup(false)}
                  variant="secondary"
                  className="flex-1"
                >
                  Entendi
                </Button>
                <Button
                  onClick={() => {
                    setShowValidationPopup(false);
                    // Scroll para o primeiro campo com erro
                    const firstErrorField = Object.keys(errors)[0];
                    if (firstErrorField) {
                      const element = document.getElementById(firstErrorField);
                      element?.scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                      });
                      element?.focus();
                    }
                  }}
                  variant="primary"
                  className="flex-1"
                >
                  Corrigir Agora
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Contact;
