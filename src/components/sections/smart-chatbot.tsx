"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot } from "lucide-react";

interface Message {
	id: string;
	type: "bot" | "user";
	content: string;
	timestamp: Date;
	options?: { id: string; text: string; action: string }[];
}

interface SmartChatbotProps {
	onContactRequest: (data: {
		name: string;
		email: string;
		phone: string;
		service: string;
	}) => void;
	onWhatsAppRedirect: (message: string) => void;
}

const SmartChatbot = ({
	onContactRequest,
	onWhatsAppRedirect,
}: SmartChatbotProps) => {
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
	});
	const messagesEndRef = useRef<HTMLDivElement>(null);

	// Fluxo de conversa
	const conversationFlow = [
		{
			id: "welcome",
			message:
				"Olá! 👋 Sou o assistente virtual da STARK. Como posso ajudar você hoje?",
			options: [
				{
					id: "suporte",
					text: "Preciso de suporte técnico",
					action: "service",
				},
				{
					id: "consultoria",
					text: "Quero consultoria estratégica",
					action: "service",
				},
				{ id: "nuvem", text: "Soluções em nuvem", action: "service" },
				{ id: "outro", text: "Outro assunto", action: "custom" },
			],
		},
		{
			id: "service",
			message: "Perfeito! Para te ajudar melhor, qual é o seu nome?",
			action: "get_name",
		},
		{
			id: "name",
			message:
				"Obrigado, {name}! Agora me informe seu e-mail para que possamos entrar em contato:",
			action: "get_email",
		},
		{
			id: "email",
			message: "Ótimo! E qual é o seu telefone? (com DDD)",
			action: "get_phone",
		},
		{
			id: "phone",
			message:
				"Perfeito! Com base nas suas informações, posso te ajudar de 3 formas:",
			options: [
				{
					id: "whatsapp",
					text: "💬 Conversar no WhatsApp agora",
					action: "whatsapp",
				},
				{ id: "agendar", text: "📅 Agendar uma reunião", action: "schedule" },
				{ id: "email", text: "📧 Enviar proposta por e-mail", action: "email" },
			],
		},
	];

	// Scroll para última mensagem
	const scrollToBottom = useCallback(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, []);

	useEffect(() => {
		scrollToBottom();
	}, [scrollToBottom]);

	// Simular digitação
	const simulateTyping = useCallback(
		(_message: string, callback: () => void) => {
			setIsTyping(true);
			setTimeout(
				() => {
					setIsTyping(false);
					callback();
				},
				1000 + Math.random() * 1000,
			);
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

	// Processar ações
	const handleAction = (action: string, text: string) => {
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

			case "get_email": {
				setUserData((prev) => ({ ...prev, email: text }));
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

			case "get_phone": {
				setUserData((prev) => ({ ...prev, phone: text }));
				setCurrentStep(4);
				simulateTyping("", () => {
					addMessage({
						id: Date.now().toString(),
						type: "bot",
						content: conversationFlow[4].message,
						timestamp: new Date(),
						options: conversationFlow[4].options,
					});
				});
				break;
			}

			case "whatsapp": {
				const whatsappMessage = `Olá! Sou ${userData.name} e gostaria de saber mais sobre ${userData.service}. Meu e-mail é ${userData.email} e telefone ${userData.phone}.`;
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
		}
	};

	// Iniciar conversa
	const startConversation = () => {
		setIsOpen(true);
		setMessages([]);
		setCurrentStep(0);
		setUserData({ name: "", email: "", phone: "", service: "" });

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
					className="fixed bottom-4 left-4 z-50 w-14 h-14 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.95 }}
					initial={{ scale: 0 }}
					animate={{ scale: 1 }}
					transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
				>
					<MessageCircle className="w-6 h-6" />
					<div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
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
						className="fixed bottom-4 left-4 z-50 w-80 h-96 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
					>
						{/* Header */}
						<div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 text-white">
							<div className="flex items-center justify-between">
								<div className="flex items-center space-x-3">
									<div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
										<Bot className="w-4 h-4" />
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
									<X className="w-4 h-4" />
								</button>
							</div>
						</div>

						{/* Messages */}
						<div className="flex-1 p-4 overflow-y-auto max-h-64">
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

export { SmartChatbot };
