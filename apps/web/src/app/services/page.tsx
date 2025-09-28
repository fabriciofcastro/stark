import ServicesHub from "@/components/sections/services-hub";
import { ServicesSeo } from "@/components/sections/services-seo";
import DataGovernance from "@/components/sections/data-governance";
import SecurityBadges from "@/components/ui/security-badges";
import { SITE_URL } from "@/lib/site";

export const metadata = {
	title:
		"Catálogo de Serviços | STARK Gestão em Tecnologia - Soluções Completas em TI",
	description:
		"Explore nosso catálogo completo de serviços de TI: suporte 24/7, consultoria estratégica, cibersegurança, cloud, governança e desenvolvimento. Encontre a solução ideal para sua empresa.",
	keywords:
		"serviços de TI, catálogo de serviços, suporte técnico, consultoria, cibersegurança, cloud, infraestrutura, governança de TI",
	openGraph: {
		title: "Catálogo de Serviços | STARK Gestão em Tecnologia",
		description:
			"Explore nosso catálogo completo de serviços de TI com filtros inteligentes para encontrar a solução ideal para sua empresa.",
		type: "website",
		url: `${SITE_URL}/services`,
	},
	twitter: {
		card: "summary_large_image",
		title: "Catálogo de Serviços | STARK Gestão em Tecnologia",
		description:
			"Explore nosso catálogo completo de serviços de TI com filtros inteligentes para encontrar a solução ideal para sua empresa.",
	},
	alternates: {
		canonical: `${SITE_URL}/services`,
	},
};

export default function ServicesPage() {
	return (
		<main className="container-px py-16">
			<ServicesSeo />
			<div className="max-w-7xl mx-auto mb-12">
				<SecurityBadges />
			</div>
			<ServicesHub />
			<DataGovernance />
		</main>
	);
}
