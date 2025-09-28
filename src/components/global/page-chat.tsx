"use client";

import { ContactExperience } from "@/components/sections/contact-experience";
import { CHATWOOT_WEBSITE_TOKEN, WHATSAPP_NUMBER } from "@/lib/site";

interface PageChatProps {
	pageName?: string;
	customMessage?: string;
	onContactFormSubmit?: (data: Record<string, unknown>) => void;
}

const PageChat = ({ pageName, onContactFormSubmit }: PageChatProps) => {
	// Handler padrão para dados do formulário de contato
	const handleContactFormSubmit = (data: Record<string, unknown>) => {
		// Adicionar informações da página
		const enrichedData = {
			...data,
			page: pageName || window.location.pathname,
			timestamp: new Date().toISOString(),
		};

		// Usar handler customizado se fornecido
		if (onContactFormSubmit) {
			onContactFormSubmit(enrichedData);
			return;
		}

		// Handler padrão
		console.log("Dados coletados da página:", enrichedData);

		// Enviar para API de contato
		fetch("/api/contact", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(enrichedData),
		}).catch((error) => {
			console.error("Erro ao enviar dados de contato:", error);
		});
	};

	return (
		<ContactExperience
			chatwootToken={CHATWOOT_WEBSITE_TOKEN || ""}
			whatsappNumber={WHATSAPP_NUMBER || "+5511994396469"}
			onContactFormSubmit={handleContactFormSubmit}
		/>
	);
};

export { PageChat };
