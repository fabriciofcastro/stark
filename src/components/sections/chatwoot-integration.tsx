"use client";

import { useEffect } from "react";

interface ChatwootSettings {
	hideMessageBubble?: boolean;
	position?: "left" | "right";
	locale?: string;
	type?: "standard" | "expanded_bubble";
	launcherTitle?: string;
}

interface ChatwootIntegrationProps {
	token: string;
	baseUrl?: string;
	settings?: ChatwootSettings;
}

const ChatwootIntegration = ({
	token,
	baseUrl = "https://app.chatwoot.com",
	settings = {},
}: ChatwootIntegrationProps) => {
	useEffect(() => {
		// Carregar script do Chatwoot
		const script = document.createElement("script");
		script.src = `${baseUrl}/packs/js/sdk.js`;
		script.async = true;
		script.defer = true;

		script.onload = () => {
			// Configurar Chatwoot
			if (window.chatwootSDK) {
				window.chatwootSDK.run({
					websiteToken: token,
					baseUrl: baseUrl,
					...settings,
				} as Record<string, unknown>);

				// Configurações personalizadas
				window.chatwootSDK.setLocale(settings.locale || "pt");
				window.chatwootSDK.setCustomAttributes({
					source: "website",
					page: window.location.pathname,
					timestamp: new Date().toISOString(),
				} as Record<string, string>);

				// Event listeners para tracking
				window.chatwootSDK.on("ready", () => {
					console.log("Chatwoot SDK carregado com sucesso");
				});

				window.chatwootSDK.on("open", () => {
					// Track quando o chat é aberto
					if (typeof window !== "undefined" && window.gtag) {
						window.gtag("event", "chat_opened", {
							event_category: "engagement",
							event_label: "chatwoot",
						});
					}
				});

				window.chatwootSDK.on("close", () => {
					// Track quando o chat é fechado
					if (typeof window !== "undefined" && window.gtag) {
						window.gtag("event", "chat_closed", {
							event_category: "engagement",
							event_label: "chatwoot",
						});
					}
				});
			}
		};

		document.head.appendChild(script);

		return () => {
			// Cleanup
			if (document.head.contains(script)) {
				document.head.removeChild(script);
			}
		};
	}, [token, baseUrl, settings]);

	return null;
};

// Declaração global para TypeScript
declare global {
	interface Window {
		chatwootSDK: {
			run: (config: Record<string, unknown>) => void;
			setLocale: (locale: string) => void;
			setCustomAttributes: (attributes: Record<string, unknown>) => void;
			on: (event: string, callback: () => void) => void;
			show: () => void;
			hide: () => void;
			toggle: () => void;
		};
		gtag: (...args: unknown[]) => void;
	}
}

export { ChatwootIntegration };
