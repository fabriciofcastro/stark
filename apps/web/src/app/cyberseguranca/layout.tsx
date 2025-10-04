import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cibersegurança | STARK Solutions",
  description: "Reduzimos riscos com testes de intrusão, hardening, monitoramento contínuo (SOC/MDR) e resposta a incidentes alinhada a NIST.",
  keywords: "cibersegurança, pentest, SOC, MDR, resposta a incidentes, hardening, vulnerabilidades, NIST, ISO 27001",
  openGraph: {
    title: "Cibersegurança | STARK Solutions",
    description: "Reduzimos riscos com testes de intrusão, hardening, monitoramento contínuo (SOC/MDR) e resposta a incidentes alinhada a NIST.",
    type: "website",
    url: `${SITE_URL}/cyberseguranca`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Cibersegurança | STARK Solutions",
    description: "Reduzimos riscos com testes de intrusão, hardening, monitoramento contínuo (SOC/MDR) e resposta a incidentes alinhada a NIST.",
  },
  alternates: {
    canonical: `${SITE_URL}/cyberseguranca`,
  },
};

export default function CybersegurancaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
