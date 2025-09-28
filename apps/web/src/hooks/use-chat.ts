"use client";

import { useCallback } from "react";

interface UseChatOptions {
	pageName?: string;
	customMessage?: string;
	onContactFormSubmit?: (data: Record<string, unknown>) => void;
}

export const useChat = (options: UseChatOptions = {}) => {
	const { pageName, customMessage, onContactFormSubmit } = options;

	// Handler para dados do formulário de contato
	const handleContactFormSubmit = useCallback(
		(data: Record<string, unknown>) => {
			// Adicionar informações da página
			const enrichedData = {
				...data,
				page:
					pageName ||
					(typeof window !== "undefined" ? window.location.pathname : ""),
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
		},
		[pageName, onContactFormSubmit],
	);

	// Gerar mensagem personalizada baseada na página
	const getCustomMessage = useCallback(() => {
		if (customMessage) return customMessage;

		const pageMessages: Record<string, string> = {
			"suporte-tecnico":
				"Olá! Preciso de suporte técnico para minha empresa. Pode me ajudar?",
			"consultoria-tecnologica":
				"Olá! Gostaria de uma consultoria tecnológica estratégica. Podemos conversar?",
			"cloud-vps-linux":
				"Olá! Estou interessado em soluções de nuvem e VPS. Pode me ajudar?",
			cyberseguranca:
				"Olá! Preciso de serviços de cibersegurança. Podemos conversar?",
			helpdesk:
				"Olá! Preciso de um help desk para minha empresa. Pode me ajudar?",
			governance:
				"Olá! Gostaria de implementar governança de TI. Podemos conversar?",
			"create-site":
				"Olá! Preciso criar um site para minha empresa. Pode me ajudar?",
			contact:
				"Olá! Gostaria de entrar em contato com a STARK. Pode me ajudar?",
			sobre: "Olá! Gostaria de saber mais sobre a STARK. Podemos conversar?",
			services:
				"Olá! Gostaria de conhecer os serviços da STARK. Pode me ajudar?",
			portfolio: "Olá! Gostaria de ver o portfólio da STARK. Pode me ajudar?",
			"cases-de-sucesso":
				"Olá! Gostaria de conhecer os cases de sucesso da STARK. Pode me ajudar?",
			faq: "Olá! Tenho algumas dúvidas sobre os serviços da STARK. Pode me ajudar?",
		};

		return (
			pageMessages[pageName || ""] ||
			"Olá! Gostaria de saber mais sobre os serviços da STARK. Pode me ajudar?"
		);
	}, [customMessage, pageName]);

	// Função para abrir WhatsApp com mensagem personalizada
	const openWhatsApp = useCallback(
		(message?: string) => {
			const whatsappNumber =
				process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+5511994396469";
			const finalMessage = message || getCustomMessage();
			const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(finalMessage)}`;
			window.open(whatsappUrl, "_blank");
		},
		[getCustomMessage],
	);

	// Função para abrir chat do Chatwoot
	const openChat = useCallback(() => {
		if (typeof window !== "undefined" && window.chatwootSDK) {
			window.chatwootSDK.show();
		}
	}, []);

	// Função para fechar chat do Chatwoot
	const closeChat = useCallback(() => {
		if (typeof window !== "undefined" && window.chatwootSDK) {
			window.chatwootSDK.hide();
		}
	}, []);

	return {
		handleContactFormSubmit,
		getCustomMessage,
		openWhatsApp,
		openChat,
		closeChat,
	};
};
