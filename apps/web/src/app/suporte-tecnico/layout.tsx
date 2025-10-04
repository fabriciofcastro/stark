import type { Metadata } from "next";
import { generateAdvancedSEO, generateStructuredData, SERVICE_KEYWORDS } from "@/lib/seo-advanced";

const seoConfig = {
  title: "Suporte Técnico Especializado - STARK Tecnologia",
  description: "Suporte técnico profissional para empresas em São Paulo. Manutenção de computadores, help desk, suporte remoto e assistência técnica especializada. Resposta em até 2 horas.",
  keywords: SERVICE_KEYWORDS["suporte-tecnico"],
  canonical: "/suporte-tecnico",
  ogType: "website" as const,
  breadcrumbs: [
    { name: "Serviços", url: "/services" },
    { name: "Suporte Técnico", url: "/suporte-tecnico" },
  ],
  faq: [
    {
      question: "Qual o tempo de resposta para suporte técnico?",
      answer: "Oferecemos resposta em até 2 horas para chamados de suporte técnico, com resolução prioritária para problemas críticos que afetam a operação da empresa.",
    },
    {
      question: "Vocês oferecem suporte remoto?",
      answer: "Sim, oferecemos suporte remoto seguro e eficiente, permitindo resolver a maioria dos problemas sem necessidade de deslocamento, economizando tempo e recursos.",
    },
    {
      question: "Qual a cobertura geográfica do suporte?",
      answer: "Atendemos toda a região metropolitana de São Paulo, com foco em Itaquaquecetuba e municípios vizinhos, oferecendo suporte presencial quando necessário.",
    },
    {
      question: "Que tipos de problemas vocês resolvem?",
      answer: "Resolvemos problemas de hardware, software, redes, servidores, segurança, backup, atualizações, instalações e configurações de sistemas operacionais e aplicações.",
    },
    {
      question: "Vocês oferecem manutenção preventiva?",
      answer: "Sim, oferecemos planos de manutenção preventiva que incluem monitoramento, atualizações, backup automático e relatórios de performance para evitar problemas futuros.",
    },
  ],
  service: {
    name: "Suporte Técnico Especializado",
    description: "Suporte técnico profissional para empresas com resposta em até 2 horas, manutenção preventiva e assistência remota e presencial.",
    category: "Serviços de TI",
  },
  localBusiness: {
    name: "STARK Solutions",
    address: "Av. Paulista, 1000, Itaquaquecetuba - SP",
    phone: "+55-11-99439-6469",
    email: "contato@starksolutions.com.br",
    openingHours: [
      "Segunda-Feira 08:00-18:00",
      "Terça-Feira 08:00-18:00",
      "Quarta-Feira 08:00-18:00",
      "Quinta-Feira 08:00-18:00",
      "Sexta-Feira 08:00-18:00",
      "Sábado 08:00-12:00",
    ],
    serviceArea: [
      "São Paulo",
      "Itaquaquecetuba",
      "Guarulhos",
      "Suzano",
      "Mogi das Cruzes",
      "Arujá",
      "Santa Isabel",
      "Ferraz de Vasconcelos",
    ],
  },
};

export const metadata: Metadata = generateAdvancedSEO(seoConfig);

export default function SuporteTecnicoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
