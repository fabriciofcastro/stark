import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
	const base = SITE_URL;
	const now = new Date().toISOString();
	const entries: MetadataRoute.Sitemap = [
		{
			url: `${base}/`,
			lastModified: now,
			changeFrequency: "weekly",
			priority: 1,
		},
		// Páginas principais de serviços
		{
			url: `${base}/suporte-tecnico`,
			lastModified: now,
			changeFrequency: "monthly",
			priority: 0.9,
		},
		{
			url: `${base}/suporte-tecnico-empresarial`,
			lastModified: now,
			changeFrequency: "monthly",
			priority: 0.9,
		},
		{
			url: `${base}/consultoria-tecnologica`,
			lastModified: now,
			changeFrequency: "monthly",
			priority: 0.9,
		},
		{
			url: `${base}/services`,
			lastModified: now,
			changeFrequency: "monthly",
			priority: 0.9,
		},
		{
			url: `${base}/contact`,
			lastModified: now,
			changeFrequency: "monthly",
			priority: 0.9,
		},
		// Páginas institucionais
		{
			url: `${base}/sobre`,
			lastModified: now,
			changeFrequency: "monthly",
			priority: 0.8,
		},
		{
			url: `${base}/portfolio`,
			lastModified: now,
			changeFrequency: "monthly",
			priority: 0.8,
		},
		{
			url: `${base}/cases-de-sucesso`,
			lastModified: now,
			changeFrequency: "monthly",
			priority: 0.8,
		},
		// Páginas de conhecimento
		{
			url: `${base}/faq`,
			lastModified: now,
			changeFrequency: "weekly",
			priority: 0.8,
		},
		{
			url: `${base}/blog`,
			lastModified: now,
			changeFrequency: "weekly",
			priority: 0.7,
		},
		// Páginas de políticas
		{
			url: `${base}/politica-de-privacidade`,
			lastModified: now,
			changeFrequency: "yearly",
			priority: 0.5,
		},
		{
			url: `${base}/termos-de-uso`,
			lastModified: now,
			changeFrequency: "yearly",
			priority: 0.5,
		},
		{
			url: `${base}/politica-de-cookies`,
			lastModified: now,
			changeFrequency: "yearly",
			priority: 0.5,
		},
		{
			url: `${base}/lgpd`,
			lastModified: now,
			changeFrequency: "yearly",
			priority: 0.5,
		},
		// Páginas de serviços específicos
		{
			url: `${base}/governanca`,
			lastModified: now,
			changeFrequency: "monthly",
			priority: 0.8,
		},
		{
			url: `${base}/cloud-vps-linux`,
			lastModified: now,
			changeFrequency: "monthly",
			priority: 0.8,
		},
		{
			url: `${base}/create-site`,
			lastModified: now,
			changeFrequency: "monthly",
			priority: 0.8,
		},
		{
			url: `${base}/helpdesk`,
			lastModified: now,
			changeFrequency: "weekly",
			priority: 0.8,
		},
		{
			url: `${base}/cyberseguranca`,
			lastModified: now,
			changeFrequency: "monthly",
			priority: 0.8,
		},
	];

	const cities = [
		"itaquaquecetuba",
		"mogi-das-cruzes",
		"sao-paulo",
		"guarulhos",
		"suzano",
	];

	cities.forEach((c) => {
		entries.push({
			url: `${base}/suporte-tecnico/${c}`,
			lastModified: now,
			changeFrequency: "monthly",
			priority: 0.6,
		});
	});

	return entries;
}
