"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Phone, Clock, CheckCircle } from "lucide-react";

interface WhatsAppWidgetProps {
	phoneNumber: string;
	message?: string;
	position?: "left" | "right";
	showOnScroll?: boolean;
	scrollThreshold?: number;
}

const WhatsAppWidget = ({
	phoneNumber,
	message = "Olá! Como posso ajudar você hoje?",
	position = "right",
	showOnScroll = true,
	scrollThreshold = 100,
}: WhatsAppWidgetProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [isVisible, setIsVisible] = useState(false);

	// Detectar scroll para mostrar/ocultar widget
	useEffect(() => {
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

	// Gerar URL do WhatsApp
	const whatsappUrl = `https://wa.me/${phoneNumber.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;

	// Abrir WhatsApp
	const handleWhatsAppClick = () => {
		window.open(whatsappUrl, "_blank");

		// Track evento
		if (typeof window !== "undefined" && window.gtag) {
			window.gtag("event", "whatsapp_click", {
				event_category: "engagement",
				event_label: "whatsapp_widget",
			});
		}
	};

	// Fechar popup
	const handleClose = () => {
		setIsOpen(false);
	};

	if (!isVisible) return null;

	return (
		<div className={`fixed ${position}-4 bottom-4 z-50`}>
			{/* Popup de informações */}
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, scale: 0.8, y: 20 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.8, y: 20 }}
						transition={{ duration: 0.3, ease: "easeOut" }}
						className="mb-4 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
					>
						{/* Header */}
						<div className="bg-gradient-to-r from-green-500 to-green-600 p-4 text-white">
							<div className="flex items-center justify-between">
								<div className="flex items-center space-x-3">
									<div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
										<MessageCircle className="w-5 h-5" />
									</div>
									<div>
										<h3 className="font-semibold text-lg">WhatsApp</h3>
										<p className="text-green-100 text-sm">Online agora</p>
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

						{/* Content */}
						<div className="p-4">
							<div className="space-y-3">
								<div className="flex items-center space-x-2 text-gray-600">
									<CheckCircle className="w-4 h-4 text-green-500" />
									<span className="text-sm">Resposta rápida garantida</span>
								</div>
								<div className="flex items-center space-x-2 text-gray-600">
									<Clock className="w-4 h-4 text-green-500" />
									<span className="text-sm">Atendimento 24/7</span>
								</div>
								<div className="flex items-center space-x-2 text-gray-600">
									<Phone className="w-4 h-4 text-green-500" />
									<span className="text-sm">Suporte especializado</span>
								</div>
							</div>

							<div className="mt-4 p-3 bg-gray-50 rounded-lg">
								<p className="text-sm text-gray-700 mb-3">{message}</p>
								<button
									type="button"
									onClick={handleWhatsAppClick}
									className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
								>
									<MessageCircle className="w-4 h-4" />
									<span>Iniciar Conversa</span>
								</button>
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Botão flutuante */}
			<motion.button
				onClick={() => setIsOpen(!isOpen)}
				className="w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
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
							key="whatsapp"
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
				Fale conosco no WhatsApp
				<div
					className={`absolute top-1/2 transform -translate-y-1/2 ${
						position === "right" ? "-right-1" : "-left-1"
					} w-2 h-2 bg-gray-900 rotate-45`}
				/>
			</motion.div>
		</div>
	);
};

export { WhatsAppWidget };
