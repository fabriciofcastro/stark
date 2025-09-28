import { GovernancaSeo } from "@/components/sections/governanca-seo";
import DataGovernance from "@/components/sections/data-governance";
import SecurityBadges from "@/components/ui/security-badges";
import SLAGuarantees from "@/components/sections/sla-guarantees";
import { SITE_URL } from "@/lib/site";

export const metadata = {
  title: "Governança de TI | STARK Gestão em Tecnologia",
  description: "Estruturamos processos, políticas e controles alinhados a COBIT, ITIL, ISO 27001 e NIST. Auditoria, gestão de riscos, LGPD e DPA.",
  keywords: "governança de TI, COBIT, ITIL, ISO 27001, NIST, auditoria, gestão de riscos, LGPD, DPA",
  openGraph: {
    title: "Governança de TI | STARK Gestão em Tecnologia",
    description: "Estruturamos processos, políticas e controles alinhados a COBIT, ITIL, ISO 27001 e NIST. Auditoria, gestão de riscos, LGPD e DPA.",
    type: "website",
    url: `${SITE_URL}/governanca`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Governança de TI | STARK Gestão em Tecnologia",
    description: "Estruturamos processos, políticas e controles alinhados a COBIT, ITIL, ISO 27001 e NIST. Auditoria, gestão de riscos, LGPD e DPA.",
  },
  alternates: {
    canonical: `${SITE_URL}/governanca`,
  },
};

export default function GovernancaPage() {
  const frameworkPractices = [
    "COBIT e ITIL (processos e serviços)",
    "ISO 27001 (SGSI) e NIST CSF (segurança)",
    "Gestão de riscos e continuidade (BIA/DRP)",
    "Inventário, CMDB e gestão de mudanças",
    "Políticas de segurança, backup e acesso",
    "Conformidade LGPD: DPA, registro de tratamento",
  ];

  const expectedResults = [
    "Redução de até 70% em incidentes de TI",
    "Auditorias internas e externas aprovadas",
    "Conformidade regulatória contínua",
    "Previsibilidade de investimentos",
    "Decisões orientadas a dados e métricas",
    "SLAs claros e monitorados em tempo real"
  ];

  return (
    <main className="container-px py-16">
      <div className="max-w-7xl mx-auto mb-12">
        <SecurityBadges />
      </div>
      <GovernancaSeo />

      <section className="mx-auto max-w-7xl">
        <header className="mb-10 text-center">
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">
            Governança de TI Corporativa
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-gray-300">
            Estruturamos processos, políticas e controles alinhados às melhores práticas 
            internacionais para garantir governança eficaz e conformidade regulatória.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 mb-16">
          <div className="rounded-xl bg-card p-8 shadow-soft border border-white/10">
            <h2 className="mb-4 text-2xl font-semibold text-white">
              Frameworks e Práticas
            </h2>
            <ul className="space-y-2 text-gray-200 text-sm">
              {frameworkPractices.map((item, index) => (
                <li key={index} className="flex items-start">
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
              Resultados Corporativos
            </h2>
            <ul className="space-y-2 text-gray-200 text-sm">
              {expectedResults.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span
                    className="mt-1 mr-2 inline-block h-2 w-2 rounded-full bg-gold"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <DataGovernance />
      </section>
      
      <SLAGuarantees />
    </main>
  );
}
