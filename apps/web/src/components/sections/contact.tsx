// components/sections/contact-section.jsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useId } from "react";
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
		<section className="px-4 py-20 sm:px-6 lg:px-8 reveal relative overflow-hidden min-h-screen">
			{/* Background animado melhorado */}
			<div className="absolute inset-0">
				<div className="absolute inset-0 bg-gradient-to-br from-brand-green-900/95 via-brand-green-800/90 to-brand-gold-900/85" />

				{/* Padrão geométrico */}
				<div className="absolute inset-0 opacity-5">
					<svg
						className="w-full h-full"
						viewBox="0 0 100 100"
						preserveAspectRatio="none"
						role="img"
						aria-label="Padrão geométrico decorativo"
					>
						<defs>
							<pattern
								id={patternId}
								width="10"
								height="10"
								patternUnits="userSpaceOnUse"
							>
								<path
									d="M 10 0 L 0 0 0 10"
									fill="none"
									stroke="currentColor"
									strokeWidth="0.5"
								/>
							</pattern>
						</defs>
						<rect
							width="100"
							height="100"
							fill={`url(#${patternId})`}
							className="text-white"
						/>
					</svg>
				</div>

				{/* Elementos flutuantes */}
				<div className="absolute top-1/4 left-1/4 w-32 h-32 bg-brand-gold-500/10 rounded-full blur-3xl animate-pulse" />
				<div
					className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-brand-green-500/10 rounded-full blur-2xl animate-pulse"
					style={{ animationDelay: "2s" }}
				/>
				<div
					className="absolute top-1/2 right-1/3 w-16 h-16 bg-brand-gold-500/5 rounded-full blur-xl animate-pulse"
					style={{ animationDelay: "4s" }}
				/>
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
					className="relative rounded-3xl border border-white/20 bg-white/5 backdrop-blur-xl shadow-2xl overflow-hidden"
				>
					{/* Glow effect */}
					<div className="absolute inset-0 bg-gradient-to-br from-brand-gold-500/5 via-transparent to-brand-green-500/5 pointer-events-none" />

					{/* Content container */}
					<div className="relative p-8 md:p-12">
						{/* Indicador de progresso inteligente */}
						<motion.div
							className="mb-8 p-6 bg-white/5 rounded-2xl border border-white/10"
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.2 }}
						>
							<div className="flex items-center justify-between mb-4">
								<h4 className="text-lg font-semibold text-white">
									Progresso do Formulário
								</h4>
								<span className="text-sm text-brand-gold-400 font-medium">
									{Math.round(
										(((name ? 1 : 0) +
											(email ? 1 : 0) +
											(company ? 1 : 0) +
											(phone ? 1 : 0) +
											(service ? 1 : 0) +
											(message ? 1 : 0)) /
											6) *
											100,
									)}
									% completo
								</span>
							</div>

							<div className="relative">
								<div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
									<motion.div
										className="h-full bg-gradient-to-r from-brand-gold-500 to-brand-gold-400 rounded-full"
										initial={{ width: 0 }}
										animate={{
											width: `${(((name ? 1 : 0) + (email ? 1 : 0) + (company ? 1 : 0) + (phone ? 1 : 0) + (service ? 1 : 0) + (message ? 1 : 0)) / 6) * 100}%`,
										}}
										transition={{ duration: 0.5 }}
									/>
								</div>
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
								className="p-6 bg-white/5 rounded-2xl border border-white/10"
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.3 }}
							>
								<div className="flex items-center gap-3 mb-6">
									<div className="p-2 bg-brand-gold-500/20 rounded-lg">
										<User className="w-5 h-5 text-brand-gold-400" />
									</div>
									<div>
										<h4 className="text-white text-lg font-semibold">
											Seus Dados
										</h4>
										<p className="text-sm text-gray-400">
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

							{/* Seção 2: Serviços */}
							<motion.div
								className="p-6 bg-white/5 rounded-2xl border border-white/10"
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.4 }}
							>
								<div className="flex items-center gap-3 mb-6">
									<div className="p-2 bg-blue-500/20 rounded-lg">
										<Settings className="w-5 h-5 text-blue-400" />
									</div>
									<div>
										<h4 className="text-white text-lg font-semibold">
											O que você precisa
										</h4>
										<p className="text-sm text-gray-400">
											Selecione o serviço de interesse
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
									options={serviceConfigs.map((config) => ({
										value: config.id,
										label: config.label,
									}))}
								/>

								{/* Campos dinâmicos baseados no serviço selecionado */}
								<AnimatePresence>
									{selectedServiceConfig && (
										<motion.div
											initial={{ opacity: 0, height: 0 }}
											animate={{ opacity: 1, height: "auto" }}
											exit={{ opacity: 0, height: 0 }}
											transition={{ duration: 0.3 }}
											className="mt-6 space-y-4"
										>
											<div className="p-4 bg-white/5 rounded-xl border border-white/10">
												<div className="flex items-center gap-3 mb-4">
													<div
														className={`p-2 rounded-lg bg-${selectedServiceConfig.color}-500/20`}
													>
														<selectedServiceConfig.icon
															className={`w-5 h-5 text-${selectedServiceConfig.color}-400`}
														/>
													</div>
													<div>
														<h5 className="text-white font-semibold">
															{selectedServiceConfig.label}
														</h5>
														<p className="text-sm text-gray-400">
															{selectedServiceConfig.description}
														</p>
													</div>
												</div>

												<div className="grid grid-cols-1 gap-4">
													{selectedServiceConfig.fields.map((field, index) => {
														const IconComponent = field.icon;
														const fieldId = `${field.id}-${index}`;
														return (
															<div key={field.id} className="space-y-2">
																<label
																	htmlFor={fieldId}
																	className="flex items-center gap-2 text-sm font-medium text-gray-200"
																>
																	<IconComponent className="w-4 h-4" />
																	{field.label}
																	{field.required && (
																		<span className="text-red-400">*</span>
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
															</div>
														);
													})}
												</div>
											</div>
										</motion.div>
									)}
								</AnimatePresence>
							</motion.div>

							{/* Seção 3: Mensagem */}
							<motion.div
								className="p-6 bg-white/5 rounded-2xl border border-white/10"
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.5 }}
							>
								<div className="flex items-center gap-3 mb-6">
									<div className="p-2 bg-orange-500/20 rounded-lg">
										<MessageSquare className="w-5 h-5 text-orange-400" />
									</div>
									<div>
										<h4 className="text-white text-lg font-semibold">
											Sua Mensagem
										</h4>
										<p className="text-sm text-gray-400">
											Descreva sua necessidade com detalhes
										</p>
									</div>
								</div>

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

							{/* Botões de Ação */}
							<motion.div
								className="flex flex-col sm:flex-row gap-4"
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.7 }}
							>
								<motion.div className="flex-1" whileTap={{ scale: 0.98 }}>
									<Button
										type="submit"
										variant="primary"
										className="w-full cursor-pointer relative overflow-hidden group"
										disabled={submitting || !consent}
									>
										<span className="relative z-10 flex items-center justify-center gap-2">
											{submitting ? (
												<>
													<div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
													Enviando...
												</>
											) : sent ? (
												<>
													<CheckCircle className="w-4 h-4" />
													Enviado!
												</>
											) : (
												<>
													<Mail className="w-4 h-4" />
													Enviar Mensagem
												</>
											)}
										</span>

										{/* Efeito de brilho */}
										<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
									</Button>
								</motion.div>
							</motion.div>

							<div className="flex items-center justify-center gap-4 text-xs text-gray-500">
								<span>Ctrl/Cmd + Enter para enviar</span>
								<span>•</span>
								<span>Resposta em até 15 minutos</span>
								<span>•</span>
								<span>Dados protegidos pela LGPD</span>
							</div>
						</form>
					</div>
				</motion.div>

				{/* Informações de contato alternativas */}
				<motion.div
					className="mt-12 text-center"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.8 }}
				>
					<p className="text-gray-300 mb-6">
						Prefere outro meio de contato? Estamos disponíveis em:
					</p>

					<div className="flex flex-wrap justify-center gap-6">
						<motion.a
							href="https://wa.me/5511994396469"
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400 hover:bg-green-500/20 transition-colors"
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							aria-label="Contato via WhatsApp"
						>
							<Phone className="w-4 h-4" />
							<span>WhatsApp</span>
						</motion.a>

						<motion.a
							href="mailto:contato@fernandohenrique.dev"
							className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-lg text-blue-400 hover:bg-blue-500/20 transition-colors"
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							aria-label="Contato via e-mail"
						>
							<Mail className="w-4 h-4" />
							<span>E-mail</span>
						</motion.a>

						<motion.div
							className="flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-lg text-purple-400"
							whileHover={{ scale: 1.05 }}
							aria-label="Localização"
						>
							<MapPin className="w-4 h-4" />
							<span>São Paulo, SP</span>
						</motion.div>
					</div>
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
