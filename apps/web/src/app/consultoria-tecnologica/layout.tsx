import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Consultoria Tecnológica Estratégica | STARK Solutions",
	description:
		"Consultoria tecnológica estratégica para transformação digital. Análise de processos, otimização de TI, planejamento estratégico e implementação de soluções inovadoras.",
	keywords:
		"consultoria tecnológica, transformação digital, estratégia TI, otimização processos, planejamento tecnológico, inovação empresarial",
	robots: {
		index: true,
		follow: true,
	},
};

export default function ConsultoriaTecnologicaLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <>{children}</>;
}
