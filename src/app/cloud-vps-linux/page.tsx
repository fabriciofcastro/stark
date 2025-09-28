import { VpsConfigurator } from "@/components/sections/vps-configurator";
import { CloudVpsCta } from "@/components/sections/cloud-vps-cta";
import { CloudVpsSeo } from "@/components/sections/cloud-vps-seo";
import DataGovernance from "@/components/sections/data-governance";
import SecurityBadges from "@/components/ui/security-badges";
import SLAGuarantees from "@/components/sections/sla-guarantees";
import { SITE_URL } from "@/lib/site";

export const metadata = {
  title: "Cloud, VPS e Linux | STARK Gestão em Tecnologia",
  description: "Provisionamento, hardening e observabilidade em servidores Linux. Backups, HA, automação (Ansible) e monitoração 24/7.",
  keywords: "cloud, vps, linux, servidores, docker, kubernetes, ansible, monitoração, backups, alta disponibilidade",
  openGraph: {
    title: "Cloud, VPS e Linux | STARK Gestão em Tecnologia",
    description: "Provisionamento, hardening e observabilidade em servidores Linux. Backups, HA, automação (Ansible) e monitoração 24/7.",
    type: "website",
    url: `${SITE_URL}/cloud-vps-linux`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Cloud, VPS e Linux | STARK Gestão em Tecnologia",
    description: "Provisionamento, hardening e observabilidade em servidores Linux. Backups, HA, automação (Ansible) e monitoração 24/7.",
  },
  alternates: {
    canonical: `${SITE_URL}/cloud-vps-linux`,
  },
};

export default function CloudVpsLinuxPage() {
  const serviceStacks = [
    "VPS (KVM/Cloud), Docker e Kubernetes",
    "Web/App (Nginx, Node, PHP-FPM), bancos (Postgres, MySQL)",
    "Backups versionados e restores testados",
    "Alta disponibilidade e balanceamento",
    "Observabilidade (logs, métricas, traces)",
    "Automação com Ansible e pipelines CI",
  ];

  const securityFeatures = [
    "Hardening de sistemas operacionais",
    "Firewalls e regras de segurança",
    "Criptografia de dados em trânsito e em repouso",
    "Auditoria e logging contínuos",
    "Backup criptografados e validados",
    "Certificados SSL/TLS automatizados"
  ];

  return (
    <main className="container-px py-16">
      <div className="max-w-7xl mx-auto mb-12">
        <SecurityBadges />
      </div>
      <CloudVpsSeo />

      <section className="mx-auto max-w-7xl">
        <header className="mb-10 text-center">
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">
            Cloud e Infraestrutura Linux Corporativa
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-gray-300">
            Provisionamento, hardening e observabilidade em servidores Linux. 
            Backups, HA, automação (Ansible) e monitoração 24/7 com conformidade.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 mb-16">
          <div className="rounded-xl bg-card p-8 shadow-soft border border-white/10">
            <h2 className="mb-4 text-2xl font-semibold text-white">
              Stacks e Serviços
            </h2>
            <ul className="space-y-2 text-gray-200 text-sm">
              {serviceStacks.map((item, index) => (
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
              Recursos de Segurança
            </h2>
            <ul className="space-y-2 text-gray-200 text-sm">
              {securityFeatures.map((item, index) => (
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

        <div className="rounded-xl bg-card p-8 shadow-soft border border-white/10 mb-16">
          <h2 className="mb-4 text-2xl font-semibold text-white text-center">
            Níveis de Serviço Corporativo
          </h2>
          <p className="text-gray-300 text-center mb-6">
            Monitoramento, patching e resposta a incidentes com SLAs rigorosos
            definidos. Relatórios mensais e recomendações de melhoria contínua.
          </p>
          <CloudVpsCta />
        </div>

        <div className="mt-10">
          {/* Configurador de VPS */}
          <VpsConfigurator />
        </div>
      </section>
      
      <DataGovernance />
      <SLAGuarantees />
    </main>
  );
}
