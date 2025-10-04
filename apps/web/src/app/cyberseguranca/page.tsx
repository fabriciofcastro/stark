import Link from "next/link";
import { CybersegurancaCta } from "@/components/sections/cyberseguranca-cta";
import { CybersegurancaSeo } from "@/components/sections/cyberseguranca-seo";
import DataGovernance from "@/components/sections/data-governance";
import SecurityBadges from "@/components/ui/security-badges";
import SLAGuarantees from "@/components/sections/sla-guarantees";
import { SITE_URL } from "@/lib/site";

export const metadata = {
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

export default function CybersegurancaPage() {
  const ofertas = [
    "Pentest (web, infra, Wi‑Fi)",
    "Hardening (SO/serviços) e gestão de vulnerabilidades",
    "SOC/MDR (monitoramento e resposta gerenciada)",
    "Resposta a incidentes (containment, erradicação, lessons learned)",
    "Treinamentos e simulações (phishing, BCP/DRP)",
  ];

  const frameworks = [
    "NIST Cybersecurity Framework",
    "ISO 27001/27002",
    "ISO 22301 (Continuidade)",
    "COBIT 5 for Risk",
    "ITIL v4 Security Management",
    "PCI DSS"
  ];

  return (
    <main className="container-px py-16">
      <div className="max-w-7xl mx-auto mb-12">
        <SecurityBadges />
      </div>
      <CybersegurancaSeo />

      <section className="mx-auto max-w-7xl">
        <header className="mb-10 text-center">
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">
            Cibersegurança Corporativa
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-gray-300">
            Reduzimos riscos com testes de intrusão, hardening, monitoramento
            contínuo (SOC/MDR) e resposta a incidentes alinhada às melhores práticas internacionais.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 mb-16">
          <div className="rounded-xl bg-card p-8 shadow-soft border border-white/10">
            <h2 className="mb-4 text-2xl font-semibold text-white">Serviços Corporativos</h2>
            <ul className="space-y-2 text-gray-200 text-sm">
              {ofertas.map((item) => (
                <li key={item} className="flex items-start">
                  <span
                    className="mt-1 mr-2 inline-block h-2 w-2 rounded-full bg-gold"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl bg-card p-8 shadow-soft border border-white/10">
            <h2 className="mb-4 text-2xl font-semibold text-white">
              Frameworks e Normas
            </h2>
            <div className="flex flex-wrap gap-2">
              {frameworks.map((framework, index) => (
                <span 
                  key={index} 
                  className="px-3 py-1 text-xs rounded-full bg-brand-gold-500/20 text-brand-gold-400"
                >
                  {framework}
                </span>
              ))}
            </div>
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-white mb-2">Resposta a Incidentes</h3>
              <p className="text-gray-300 text-sm mb-4">
                Playbooks NIST/ISO com evidência, contenção, erradicação e
                recuperação. Relatório de causa raiz e controles preventivos.
              </p>
              <CybersegurancaCta />
            </div>
          </div>
        </div>
        
        <DataGovernance />
      </section>
      
      <SLAGuarantees />
    </main>
  );
}
