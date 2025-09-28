interface LegalStructuredDataProps {
	type: "privacy" | "terms" | "cookies" | "lgpd";
	title: string;
	description: string;
	lastModified: string;
	organizationName: string;
	organizationUrl: string;
}

export default function LegalStructuredData({
	type,
	title,
	description,
	lastModified,
	organizationName,
	organizationUrl,
}: LegalStructuredDataProps) {
	const baseStructuredData = {
		"@context": "https://schema.org",
		"@type": "WebPage",
		name: title,
		description: description,
		url: `${organizationUrl}/${type === "privacy" ? "politica-de-privacidade" : type === "terms" ? "termos-de-uso" : type === "cookies" ? "politica-de-cookies" : "lgpd"}`,
		dateModified: lastModified,
		publisher: {
			"@type": "Organization",
			name: organizationName,
			url: organizationUrl,
		},
		mainEntity: {
			"@type": "Article",
			headline: title,
			description: description,
			dateModified: lastModified,
			author: {
				"@type": "Organization",
				name: organizationName,
			},
			publisher: {
				"@type": "Organization",
				name: organizationName,
				url: organizationUrl,
			},
		},
	};

	const specificStructuredData = {
		privacy: {
			...baseStructuredData,
			"@type": "WebPage",
			mainEntity: {
				...baseStructuredData.mainEntity,
				"@type": "Article",
				about: {
					"@type": "Thing",
					name: "Política de Privacidade",
					description: "Política de proteção de dados pessoais conforme LGPD",
				},
			},
		},
		terms: {
			...baseStructuredData,
			"@type": "WebPage",
			mainEntity: {
				...baseStructuredData.mainEntity,
				"@type": "Article",
				about: {
					"@type": "Thing",
					name: "Termos de Uso",
					description: "Condições de uso dos serviços e responsabilidades",
				},
			},
		},
		cookies: {
			...baseStructuredData,
			"@type": "WebPage",
			mainEntity: {
				...baseStructuredData.mainEntity,
				"@type": "Article",
				about: {
					"@type": "Thing",
					name: "Política de Cookies",
					description: "Política de uso de cookies e tecnologias similares",
				},
			},
		},
		lgpd: {
			...baseStructuredData,
			"@type": "WebPage",
			mainEntity: {
				...baseStructuredData.mainEntity,
				"@type": "Article",
				about: {
					"@type": "Thing",
					name: "Lei Geral de Proteção de Dados",
					description: "Conformidade com a LGPD e direitos dos titulares",
				},
			},
		},
	};

	const structuredData = specificStructuredData[type];

	return (
		<script
			type="application/ld+json"
			// biome-ignore lint/security/noDangerouslySetInnerHtml: Structured data JSON-LD is safe
			dangerouslySetInnerHTML={{
				__html: JSON.stringify(structuredData, null, 2),
			}}
		/>
	);
}
