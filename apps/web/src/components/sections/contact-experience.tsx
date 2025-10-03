"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChatwootIntegration } from "./chatwoot-integration";
import { WhatsAppWidget } from "./whatsapp-widget";
import StarkChatSystem from "@/components/ui/stark-chat-system";
import StarkContactSystem from "@/components/ui/stark-contact-system";
import { Phone, Mail, MessageCircle, Calendar } from "lucide-react";

interface ContactExperienceProps {
	chatwootToken: string;
	whatsappNumber: string;
	onContactFormSubmit?: (data: Record<string, unknown>) => void;
}

const ContactExperience = ({
	chatwootToken,
	whatsappNumber,
	onContactFormSubmit,
}: ContactExperienceProps) => {
	const [showSuccess, setShowSuccess] = useState(false);

	// Handler para solicitação de contato via chatbot
	const handleContactRequest = (data: {
		name: string;
		email: string;
		phone: string;
		service: string;
		urgency: string;
		company: string;
		message: string;
	}) => {
		// Aqui você pode integrar com sua API de contato
		console.log("Dados coletados pelo chatbot:", data);

		if (onContactFormSubmit) {
			onContactFormSubmit(data);
		}

		setShowSuccess(true);
		setTimeout(() => setShowSuccess(false), 3000);
	};

	// Handler para escalação para especialista
	const handleEscalateToHuman = (data: any) => {
		console.log("Escalando para especialista:", data);
		// Aqui você pode integrar com sistema de tickets ou notificação
		// Por exemplo, enviar para Slack, Discord, ou sistema de tickets
	};

	// Handler para redirecionamento WhatsApp
	const handleWhatsAppRedirect = (message: string) => {
		const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
		window.open(whatsappUrl, "_blank");
	};

	return (
		<>
			{/* Sistema de Contato STARK */}
			<StarkContactSystem
				chatwootToken={chatwootToken}
				whatsappNumber={whatsappNumber}
				onContactFormSubmit={onContactFormSubmit}
			/>

			{/* Sistema de Chat STARK */}
			<StarkChatSystem
				onContactRequest={handleContactRequest}
				onWhatsAppRedirect={handleWhatsAppRedirect}
				onEscalateToHuman={handleEscalateToHuman}
			/>

			{/* Success Notification */}
			{showSuccess && (
				<motion.div
					initial={{ opacity: 0, y: 50, scale: 0.8 }}
					animate={{ opacity: 1, y: 0, scale: 1 }}
					exit={{ opacity: 0, y: 50, scale: 0.8 }}
					className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg"
				>
					<div className="flex items-center space-x-2">
						<div className="w-2 h-2 bg-white rounded-full animate-pulse" />
						<span className="font-medium">
							Informações coletadas! Entraremos em contato em breve.
						</span>
					</div>
				</motion.div>
			)}

		</>
	);
};

export { ContactExperience };
