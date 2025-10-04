export const SITE_URL = (
	process.env.NEXT_PUBLIC_SITE_URL || "https://starksolutions.com.br"
).replace(/\/$/, "");

export const SITE_NAME = "STARK Solutions";
export const SITE_DESCRIPTION = "Soluções Tecnológicas Avançadas e Inovadoras";
export const SITE_TAGLINE = "Innovation • Technology • Solutions";

export const MEETING_URL =
	process.env.NEXT_PUBLIC_MEETING_URL || "https://cal.com/";

// Chatwoot
export const CHATWOOT_BASE_URL =
	process.env.NEXT_PUBLIC_CHATWOOT_BASE_URL || "";
export const CHATWOOT_WEBSITE_TOKEN =
	process.env.NEXT_PUBLIC_CHATWOOT_WEBSITE_TOKEN || "";

// WhatsApp
export const WHATSAPP_NUMBER =
	process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+5511994396469";

// Analytics
export const GA_MEASUREMENT_ID =
	process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "";
