"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
	MessageCircle,
	X,
	Send,
	Bot,
	User,
	Phone,
	Mail,
	Calendar,
	ArrowRight,
	Loader2,
} from "lucide-react";

interface Message {
	id: string;
	type: "bot" | "user" | "system";
	content: string;
	timestamp: Date;
	options?: { id: string; text: string; action: string; icon?: string }[];
	typing?: boolean;
	escalated?: boolean;
}

interface HumanChatbotProps {
	onContactRequest: (data: {
		name: string;
		email: string;
		phone: string;
		service: string;
		urgency: string;
		company: string;
		message: string;
	}) => void;
	onWhatsAppRedirect: (message: string) => void;
	onEscalateToHuman: (data: any) => void;
}

const HumanChatbot = ({
	onContactRequest,
	onWhatsAppRedirect,
	onEscalateToHuman,
}: HumanChatbotProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [messages, setMessages] = useState<Message[]>([]);
	const [inputValue, setInputValue] = useState("");
	const [isTyping, setIsTyping] = useState(false);
	const [currentStep, setCurrentStep] = useState(0);
	const [userData, setUserData] = useState({
		name: "",
		email: "",
		phone: "",
		service: "",
		urgency: "",
		company: "",
		message: "",
	});
	const [conversationContext, setConversationContext] = useState({
		userIntent: "",
		confidence: 0,
		attempts: 0,
		maxAttempts: 3,
	});
	const messagesEndRef = useRef<HTMLDivElement>(null);

	// Respostas mais humanas e naturais
	const humanResponses = {
		greeting: [
			"Olá! 👋 Sou a assistente virtual da STARK. Como posso te ajudar hoje?",
			"Oi! 😊 Estou aqui para te ajudar com qualquer dúvida sobre nossos serviços.",
			"Olá! Que bom te ver por aqui! Como posso te auxiliar hoje?",
		],
		understanding: [
			"Entendi perfeitamente!",
			"Ah, agora compreendo melhor!",
			"Perfeito, entendi o que você precisa.",
			"Ótimo, isso esclarece bastante!",
		],
		clarification: [
			"Para te ajudar da melhor forma, você poderia me contar um pouco mais sobre...",
			"Interessante! Me ajuda a entender melhor...",
			"Que legal! Para eu te dar a melhor orientação...",
		],
		empathy: [
			"Entendo sua preocupação, vamos resolver isso juntos!",
			"Sei que pode ser frustrante, mas estou aqui para ajudar.",
			"Compreendo perfeitamente, vamos encontrar a melhor solução.",
		],
		escalation: [
			"Vou te conectar com um de nossos especialistas que pode te ajudar melhor.",
			"Deixe-me transferir você para nossa equipe técnica especializada.",
			"Vou escalar sua solicitação para um especialista que tem mais experiência nessa área.",
		],
	};

	// Fluxo de conversa mais natural
	const conversationFlow = [
		{
			id: "welcome",
			message:
				humanResponses.greeting[
					Math.floor(Math.random() * humanResponses.greeting.length)
				],
			options: [
				{
					id: "suporte",
					text: "Preciso de suporte técnico",
					action: "service",
					icon: "🔧",
				},
				{
					id: "consultoria",
					text: "Quero consultoria estratégica",
					action: "service",
					icon: "💡",
				},
				{
					id: "nuvem",
					text: "Soluções em nuvem",
					action: "service",
					icon: "☁️",
				},
				{
					id: "seguranca",
					text: "Cibersegurança",
					action: "service",
					icon: "🔒",
				},
				{ id: "outro", text: "Outro assunto", action: "custom", icon: "💬" },
			],
		},
		{
			id: "service",
			message: `${humanResponses.understanding[Math.floor(Math.random() * humanResponses.understanding.length)]} ${humanResponses.clarification[Math.floor(Math.random() * humanResponses.clarification.length)]} qual é o seu nome?`,
			action: "get_name",
		},
		{
			id: "name",
			message: `Prazer em conhecê-lo, {name}! 😊 Agora me conta, qual é o nome da sua empresa?`,
			action: "get_company",
		},
		{
			id: "company",
			message: `Ótimo! E qual é o seu e-mail para que possamos entrar em contato?`,
			action: "get_email",
		},
		{
			id: "email",
			message: `Perfeito! E qual é o seu telefone? (com DDD)`,
			action: "get_phone",
		},
		{
			id: "phone",
			message: `Excelente! Agora me conta, qual é o nível de urgência da sua necessidade?`,
			action: "get_urgency",
			options: [
				{
					id: "urgent",
					text: "🚨 Urgente - Preciso hoje",
					action: "urgency",
					icon: "🚨",
				},
				{
					id: "high",
					text: "⚡ Alta - Esta semana",
					action: "urgency",
					icon: "⚡",
				},
				{
					id: "medium",
					text: "📅 Média - Próximas semanas",
					action: "urgency",
					icon: "📅",
				},
				{
					id: "low",
					text: "💭 Baixa - Apenas consultoria",
					action: "urgency",
					icon: "💭",
				},
			],
		},
		{
			id: "urgency",
			message: `Entendi! E me conta, qual é a situação atual? O que está acontecendo?`,
			action: "get_message",
		},
		{
			id: "message",
			message: `Perfeito! Com base no que você me contou, posso te ajudar de algumas formas:`,
			options: [
				{
					id: "whatsapp",
					text: "💬 Conversar no WhatsApp agora",
					action: "whatsapp",
					icon: "💬",
				},
				{
					id: "agendar",
					text: "📅 Agendar uma reunião",
					action: "schedule",
					icon: "📅",
				},
				{
					id: "email",
					text: "📧 Enviar proposta por e-mail",
					action: "email",
					icon: "📧",
				},
				{
					id: "escalate",
					text: "👨‍💼 Falar com especialista",
					action: "escalate",
					icon: "👨‍💼",
				},
			],
		},
	];

	// Scroll para última mensagem
	const scrollToBottom = useCallback(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, []);

	useEffect(() => {
		scrollToBottom();
	}, [messages, scrollToBottom]);

	// Simular digitação mais realista
	const simulateTyping = useCallback(
		(message: string, callback: () => void) => {
			setIsTyping(true);
			// Tempo baseado no tamanho da mensagem
			const baseTime = 1000;
			const charTime = message.length * 20;
			const randomTime = Math.random() * 500;
			const totalTime = baseTime + charTime + randomTime;

			setTimeout(() => {
				setIsTyping(false);
				callback();
			}, totalTime);
		},
		[],
	);

	// Adicionar mensagem
	const addMessage = (message: Message) => {
		setMessages((prev) => [...prev, message]);
	};

	// Processar resposta do usuário
	const handleUserResponse = (text: string, action?: string) => {
		const userMessage: Message = {
			id: Date.now().toString(),
			type: "user",
			content: text,
			timestamp: new Date(),
		};
		addMessage(userMessage);

		// Processar ação
		if (action) {
			handleAction(action, text);
		}
	};

	// Processar ações com lógica mais inteligente
	const handleAction = (action: string, text: string) => {
		// Atualizar contexto da conversa
		setConversationContext((prev) => ({
			...prev,
			attempts: prev.attempts + 1,
		}));

		switch (action) {
			case "service": {
				setUserData((prev) => ({ ...prev, service: text }));
				setCurrentStep(1);
				simulateTyping("", () => {
					addMessage({
						id: Date.now().toString(),
						type: "bot",
						content: conversationFlow[1].message,
						timestamp: new Date(),
					});
				});
				break;
			}

			case "get_name": {
				setUserData((prev) => ({ ...prev, name: text }));
				setCurrentStep(2);
				simulateTyping("", () => {
					addMessage({
						id: Date.now().toString(),
						type: "bot",
						content: conversationFlow[2].message.replace("{name}", text),
						timestamp: new Date(),
					});
				});
				break;
			}

			case "get_company": {
				setUserData((prev) => ({ ...prev, company: text }));
				setCurrentStep(3);
				simulateTyping("", () => {
					addMessage({
						id: Date.now().toString(),
						type: "bot",
						content: conversationFlow[3].message,
						timestamp: new Date(),
					});
				});
				break;
			}

			case "get_email": {
				setUserData((prev) => ({ ...prev, email: text }));
				setCurrentStep(4);
				simulateTyping("", () => {
					addMessage({
						id: Date.now().toString(),
						type: "bot",
						content: conversationFlow[4].message,
						timestamp: new Date(),
					});
				});
				break;
			}

			case "get_phone": {
				setUserData((prev) => ({ ...prev, phone: text }));
				setCurrentStep(5);
				simulateTyping("", () => {
					addMessage({
						id: Date.now().toString(),
						type: "bot",
						content: conversationFlow[5].message,
						timestamp: new Date(),
						options: conversationFlow[5].options,
					});
				});
				break;
			}

			case "urgency": {
				setUserData((prev) => ({ ...prev, urgency: text }));
				setCurrentStep(6);
				simulateTyping("", () => {
					addMessage({
						id: Date.now().toString(),
						type: "bot",
						content: conversationFlow[6].message,
						timestamp: new Date(),
					});
				});
				break;
			}

			case "get_message": {
				setUserData((prev) => ({ ...prev, message: text }));
				setCurrentStep(7);
				simulateTyping("", () => {
					addMessage({
						id: Date.now().toString(),
						type: "bot",
						content: conversationFlow[7].message,
						timestamp: new Date(),
						options: conversationFlow[7].options,
					});
				});
				break;
			}

			case "whatsapp": {
				const whatsappMessage = `Olá! Sou ${userData.name} da ${userData.company} e gostaria de saber mais sobre ${userData.service}. Urgência: ${userData.urgency}. Situação: ${userData.message}. Meu e-mail é ${userData.email} e telefone ${userData.phone}.`;
				onWhatsAppRedirect(whatsappMessage);
				break;
			}

			case "schedule": {
				onContactRequest(userData);
				break;
			}

			case "email": {
				onContactRequest(userData);
				break;
			}

			case "escalate": {
				// Escalar para especialista humano
				onEscalateToHuman(userData);
				addMessage({
					id: Date.now().toString(),
					type: "system",
					content: "🔄 Transferindo você para um especialista...",
					timestamp: new Date(),
					escalated: true,
				});
				break;
			}
		}
	};

	// Iniciar conversa
	const startConversation = () => {
		setIsOpen(true);
		setMessages([]);
		setCurrentStep(0);
		setUserData({
			name: "",
			email: "",
			phone: "",
			service: "",
			urgency: "",
			company: "",
			message: "",
		});
		setConversationContext({
			userIntent: "",
			confidence: 0,
			attempts: 0,
			maxAttempts: 3,
		});

		setTimeout(() => {
			addMessage({
				id: Date.now().toString(),
				type: "bot",
				content: conversationFlow[0].message,
				timestamp: new Date(),
				options: conversationFlow[0].options,
			});
		}, 500);
	};

	// Enviar mensagem
	const handleSend = () => {
		if (!inputValue.trim()) return;

		const currentFlow = conversationFlow[currentStep];
		handleUserResponse(inputValue, currentFlow?.action);
		setInputValue("");
	};

	// Fechar chat
	const handleClose = () => {
		setIsOpen(false);
	};

	return (
		<>
			{/* Botão de abertura */}
			{!isOpen && (
				<motion.button
					onClick={startConversation}
					className="fixed bottom-4 left-4 z-50 w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.95 }}
					initial={{ scale: 0 }}
					animate={{ scale: 1 }}
					transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
				>
					<MessageCircle className="w-7 h-7" />
					<div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
						<span className="text-xs text-white font-bold">AI</span>
					</div>
				</motion.button>
			)}

			{/* Chat Window */}
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, scale: 0.8, y: 20 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.8, y: 20 }}
						transition={{ duration: 0.3, ease: "easeOut" }}
						className="fixed bottom-4 left-4 z-50 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
					>
						{/* Header */}
						<div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 text-white">
							<div className="flex items-center justify-between">
								<div className="flex items-center space-x-3">
									<div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
										<Bot className="w-5 h-5" />
									</div>
									<div>
										<h3 className="font-semibold">Assistente STARK</h3>
										<p className="text-blue-100 text-xs">Online agora</p>
									</div>
								</div>
								<button
									type="button"
									onClick={handleClose}
									className="p-1 hover:bg-white/20 rounded-full transition-colors"
								>
									<X className="w-5 h-5" />
								</button>
							</div>
						</div>

						{/* Messages */}
						<div className="flex-1 p-4 overflow-y-auto max-h-80">
							<div className="space-y-3">
								{messages.map((message) => (
									<div
										key={message.id}
										className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
									>
										<div
											className={`max-w-xs p-3 rounded-lg ${
												message.type === "user"
													? "bg-blue-500 text-white"
													: message.type === "system"
														? "bg-yellow-100 text-yellow-800 border border-yellow-200"
														: "bg-gray-100 text-gray-800"
											}`}
										>
											<p className="text-sm">{message.content}</p>
											{message.options && (
												<div className="mt-2 space-y-1">
													{message.options.map((option) => (
														<button
															key={option.id}
															type="button"
															onClick={() =>
																handleUserResponse(option.text, option.action)
															}
															className="block w-full text-left text-xs p-2 bg-white/20 hover:bg-white/30 rounded transition-colors"
														>
															<span className="mr-2">{option.icon}</span>
															{option.text}
														</button>
													))}
												</div>
											)}
										</div>
									</div>
								))}

								{isTyping && (
									<div className="flex justify-start">
										<div className="bg-gray-100 p-3 rounded-lg">
											<div className="flex space-x-1">
												<div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
												<div
													className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
													style={{ animationDelay: "0.1s" }}
												/>
												<div
													className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
													style={{ animationDelay: "0.2s" }}
												/>
											</div>
										</div>
									</div>
								)}

								<div ref={messagesEndRef} />
							</div>
						</div>

						{/* Input */}
						<div className="p-4 border-t border-gray-200">
							<div className="flex space-x-2">
								<input
									type="text"
									value={inputValue}
									onChange={(e) => setInputValue(e.target.value)}
									onKeyPress={(e) => e.key === "Enter" && handleSend()}
									placeholder="Digite sua mensagem..."
									className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
								/>
								<button
									type="button"
									onClick={handleSend}
									disabled={!inputValue.trim()}
									className="p-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white rounded-lg transition-colors"
								>
									<Send className="w-4 h-4" />
								</button>
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
};

export { HumanChatbot };
