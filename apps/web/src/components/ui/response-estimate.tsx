"use client";

import { motion } from "framer-motion";
import { Clock, MessageCircle, Phone, Mail } from "lucide-react";

interface ResponseEstimateProps {
	preferredChannel: string;
	service: string;
	urgency?: string;
	className?: string;
}

export default function ResponseEstimate({
	preferredChannel,
	service,
	urgency = "normal",
	className = "",
}: ResponseEstimateProps) {
	const getResponseTime = () => {
		// Baseado no canal preferido e urgência
		if (preferredChannel === "whatsapp") {
			return urgency === "urgent" ? "5-15 minutos" : "15-30 minutos";
		}
		if (preferredChannel === "telefone") {
			return urgency === "urgent" ? "10-20 minutos" : "30-60 minutos";
		}
		if (preferredChannel === "email") {
			return urgency === "urgent" ? "1-2 horas" : "2-4 horas";
		}
		return "1-2 horas";
	};

	const getChannelIcon = () => {
		switch (preferredChannel) {
			case "whatsapp":
				return <MessageCircle className="w-4 h-4" />;
			case "telefone":
				return <Phone className="w-4 h-4" />;
			case "email":
				return <Mail className="w-4 h-4" />;
			default:
				return <MessageCircle className="w-4 h-4" />;
		}
	};

	const getChannelName = () => {
		switch (preferredChannel) {
			case "whatsapp":
				return "WhatsApp";
			case "telefone":
				return "Telefone";
			case "email":
				return "E-mail";
			default:
				return "Canal preferido";
		}
	};

	const getServicePriority = () => {
		const highPriorityServices = ["seguranca", "recuperacao", "suporte"];
		return highPriorityServices.includes(service) ? "alta" : "normal";
	};

	const isHighPriority = getServicePriority() === "alta";

	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.95 }}
			animate={{ opacity: 1, scale: 1 }}
			className={`bg-gradient-to-r from-brand-blue-500/10 to-brand-cyan-500/10 border border-brand-blue-500/20 rounded-lg p-4 ${className}`}
		>
			<div className="flex items-start gap-3">
				<div className="flex-shrink-0">
					<div className="w-8 h-8 bg-brand-blue-500/20 rounded-lg flex items-center justify-center text-brand-blue-400">
						<Clock className="w-4 h-4" />
					</div>
				</div>
				<div className="flex-1 min-w-0">
					<h4 className="text-sm font-semibold text-white mb-1">
						Tempo de Resposta Estimado
					</h4>
					<div className="flex items-center gap-2 text-sm text-gray-300 mb-2">
						{getChannelIcon()}
						<span>Via {getChannelName()}:</span>
						<span className="font-medium text-brand-gold-400">
							{getResponseTime()}
						</span>
					</div>
					{isHighPriority && (
						<div className="flex items-center gap-1 text-xs text-brand-gold-400">
							<div className="w-1.5 h-1.5 bg-brand-gold-400 rounded-full animate-pulse" />
							<span>Prioridade alta - Resposta acelerada</span>
						</div>
					)}
					<p className="text-xs text-gray-400 mt-2">
						Nossa equipe está online e pronta para atendê-lo.
						{preferredChannel === "whatsapp" &&
							" Você pode iniciar um chat agora mesmo!"}
					</p>
				</div>
			</div>
		</motion.div>
	);
}
