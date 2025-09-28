"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Mail, Calendar } from "lucide-react";
import { useChat } from "@/hooks/use-chat";

interface FloatingChatButtonProps {
	pageName?: string;
	customMessage?: string;
	position?: "left" | "right";
	showOnScroll?: boolean;
	scrollThreshold?: number;
}

const FloatingChatButton = ({
	pageName,
	customMessage,
	position = "right",
	showOnScroll = true,
	scrollThreshold = 100,
}: FloatingChatButtonProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [isVisible, setIsVisible] = useState(false);
	const { openWhatsApp, openChat } = useChat({
		pageName,
		customMessage,
	});

	// Detectar scroll para mostrar/ocultar botão
	React.useEffect(() => {
		if (!showOnScroll) {
			setIsVisible(true);
			return;
		}

		const handleScroll = () => {
			const scrolled = window.scrollY > scrollThreshold;
			setIsVisible(scrolled);
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, [showOnScroll, scrollThreshold]);

	const handleWhatsAppClick = () => {
		openWhatsApp();
		setIsOpen(false);
	};

	const handleChatClick = () => {
		openChat();
		setIsOpen(false);
	};

	const handleFormClick = () => {
		// Scroll para formulário de contato se existir
		const contactForm = document.getElementById("contact-form");
		if (contactForm) {
			contactForm.scrollIntoView({ behavior: "smooth" });
		} else {
			// Redirecionar para página de contato
			window.location.href = "/contact";
		}
		setIsOpen(false);
	};

	const handleScheduleClick = () => {
		window.open("https://calendly.com/stark-tecnologia", "_blank");
		setIsOpen(false);
	};

	if (!isVisible) return null;

	return (
		<div className={`fixed ${position}-4 bottom-4 z-50`}>
			{/* Menu de opções */}
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, scale: 0.8, y: 20 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.8, y: 20 }}
						transition={{ duration: 0.3, ease: "easeOut" }}
						className="mb-4 w-64 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
					>
						{/* Header */}
						<div className="bg-gradient-to-r from-brand-gold-500 to-brand-gold-600 p-4 text-white">
							<div className="flex items-center justify-between">
								<div className="flex items-center space-x-3">
									<div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
										<MessageCircle className="w-4 h-4" />
									</div>
									<div>
										<h3 className="font-semibold text-sm">Fale Conosco</h3>
										<p className="text-brand-gold-100 text-xs">
											Escolha uma opção
										</p>
									</div>
								</div>
								<button
									type="button"
									onClick={() => setIsOpen(false)}
									className="p-1 hover:bg-white/20 rounded-full transition-colors"
								>
									<X className="w-4 h-4" />
								</button>
							</div>
						</div>

						{/* Opções */}
						<div className="p-4 space-y-2">
							<button
								type="button"
								onClick={handleChatClick}
								className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
							>
								<div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
									<MessageCircle className="w-4 h-4 text-blue-600" />
								</div>
								<div>
									<div className="font-medium text-sm text-gray-900">
										Chat Online
									</div>
									<div className="text-xs text-gray-500">Resposta imediata</div>
								</div>
							</button>

							<button
								type="button"
								onClick={handleWhatsAppClick}
								className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
							>
								<div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
									<MessageCircle className="w-4 h-4 text-green-600" />
								</div>
								<div>
									<div className="font-medium text-sm text-gray-900">
										WhatsApp
									</div>
									<div className="text-xs text-gray-500">Conversa direta</div>
								</div>
							</button>

							<button
								type="button"
								onClick={handleFormClick}
								className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
							>
								<div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
									<Mail className="w-4 h-4 text-purple-600" />
								</div>
								<div>
									<div className="font-medium text-sm text-gray-900">
										Formulário
									</div>
									<div className="text-xs text-gray-500">
										Envie sua mensagem
									</div>
								</div>
							</button>

							<button
								type="button"
								onClick={handleScheduleClick}
								className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
							>
								<div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
									<Calendar className="w-4 h-4 text-orange-600" />
								</div>
								<div>
									<div className="font-medium text-sm text-gray-900">
										Agendar
									</div>
									<div className="text-xs text-gray-500">
										Marque uma reunião
									</div>
								</div>
							</button>
						</div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Botão principal */}
			<motion.button
				onClick={() => setIsOpen(!isOpen)}
				className="w-14 h-14 bg-gradient-to-r from-brand-gold-500 to-brand-gold-600 hover:from-brand-gold-600 hover:to-brand-gold-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 0.95 }}
				initial={{ scale: 0 }}
				animate={{ scale: 1 }}
				transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
			>
				<AnimatePresence mode="wait">
					{isOpen ? (
						<motion.div
							key="close"
							initial={{ rotate: -90, opacity: 0 }}
							animate={{ rotate: 0, opacity: 1 }}
							exit={{ rotate: 90, opacity: 0 }}
							transition={{ duration: 0.2 }}
						>
							<X className="w-6 h-6" />
						</motion.div>
					) : (
						<motion.div
							key="chat"
							initial={{ rotate: 90, opacity: 0 }}
							animate={{ rotate: 0, opacity: 1 }}
							exit={{ rotate: -90, opacity: 0 }}
							transition={{ duration: 0.2 }}
						>
							<MessageCircle className="w-6 h-6" />
						</motion.div>
					)}
				</AnimatePresence>

				{/* Indicador de notificação */}
				<div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
					<span className="text-xs text-white font-bold">!</span>
				</div>
			</motion.button>

			{/* Tooltip */}
			<motion.div
				initial={{ opacity: 0, x: position === "right" ? 20 : -20 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ delay: 1 }}
				className={`absolute top-1/2 transform -translate-y-1/2 ${
					position === "right" ? "-left-32" : "-right-32"
				} bg-gray-900 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap`}
			>
				Fale conosco
				<div
					className={`absolute top-1/2 transform -translate-y-1/2 ${
						position === "right" ? "-right-1" : "-left-1"
					} w-2 h-2 bg-gray-900 rotate-45`}
				/>
			</motion.div>
		</div>
	);
};

export { FloatingChatButton };
