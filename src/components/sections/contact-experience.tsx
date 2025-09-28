"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChatwootIntegration } from "./chatwoot-integration";
import { WhatsAppWidget } from "./whatsapp-widget";
import { SmartChatbot } from "./smart-chatbot";
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
	}) => {
		// Aqui você pode integrar com sua API de contato
		console.log("Dados coletados pelo chatbot:", data);

		if (onContactFormSubmit) {
			onContactFormSubmit(data);
		}

		setShowSuccess(true);
		setTimeout(() => setShowSuccess(false), 3000);
	};

	// Handler para redirecionamento WhatsApp
	const handleWhatsAppRedirect = (message: string) => {
		const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
		window.open(whatsappUrl, "_blank");
	};

	return (
		<>
			{/* Chatwoot Integration */}
			<ChatwootIntegration
				token={chatwootToken}
				settings={{
					hideMessageBubble: false,
					position: "right",
					locale: "pt",
					type: "standard",
					launcherTitle: "Fale conosco",
				}}
			/>

			{/* WhatsApp Widget */}
			<WhatsAppWidget
				phoneNumber={whatsappNumber}
				message="Olá! Gostaria de saber mais sobre os serviços da STARK. Pode me ajudar?"
				position="right"
				showOnScroll={true}
				scrollThreshold={200}
			/>

			{/* Smart Chatbot */}
			<SmartChatbot
				onContactRequest={handleContactRequest}
				onWhatsAppRedirect={handleWhatsAppRedirect}
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

			{/* Contact Options Bar - Mobile */}
			<div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-40 md:hidden">
				<div className="flex justify-around">
					<motion.button
						whileTap={{ scale: 0.95 }}
						className="flex flex-col items-center space-y-1 text-gray-600 hover:text-blue-500 transition-colors"
						onClick={() =>
							document
								.getElementById("contact-form")
								?.scrollIntoView({ behavior: "smooth" })
						}
					>
						<div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
							<Mail className="w-5 h-5" />
						</div>
						<span className="text-xs">Formulário</span>
					</motion.button>

					<motion.button
						whileTap={{ scale: 0.95 }}
						className="flex flex-col items-center space-y-1 text-gray-600 hover:text-green-500 transition-colors"
						onClick={() =>
							handleWhatsAppRedirect(
								"Olá! Gostaria de saber mais sobre os serviços da STARK.",
							)
						}
					>
						<div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
							<MessageCircle className="w-5 h-5" />
						</div>
						<span className="text-xs">WhatsApp</span>
					</motion.button>

					<motion.button
						whileTap={{ scale: 0.95 }}
						className="flex flex-col items-center space-y-1 text-gray-600 hover:text-blue-500 transition-colors"
						onClick={() => window.open(`tel:${whatsappNumber}`, "_self")}
					>
						<div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
							<Phone className="w-5 h-5" />
						</div>
						<span className="text-xs">Ligar</span>
					</motion.button>

					<motion.button
						whileTap={{ scale: 0.95 }}
						className="flex flex-col items-center space-y-1 text-gray-600 hover:text-purple-500 transition-colors"
						onClick={() =>
							window.open("https://calendly.com/stark-tecnologia", "_blank")
						}
					>
						<div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
							<Calendar className="w-5 h-5" />
						</div>
						<span className="text-xs">Agendar</span>
					</motion.button>
				</div>
			</div>
		</>
	);
};

export { ContactExperience };
