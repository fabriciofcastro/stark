import Link from "next/link";
import { SupportDiagnosis } from "@/components/sections/support-diagnosis";
import { SuporteTecnicoCta } from "@/components/sections/suporte-tecnico-cta";
import { SuporteTecnicoSeo } from "@/components/sections/suporte-tecnico-seo";
import { SITE_URL } from "@/lib/site";

export const metadata = {
  title: "Suporte Técnico | STARK Gestão em Tecnologia",
  description: "Atendimento presencial ou remoto para garantir que sistemas, equipamentos e redes da sua empresa funcionem corretamente, com SLAs claros e boas práticas.",
  keywords: "suporte técnico, atendimento remoto, atendimento presencial, help desk, SLA, manutenção preventiva, manutenção corretiva",
  openGraph: {
    title: "Suporte Técnico | STARK Gestão em Tecnologia",
    description: "Atendimento presencial ou remoto para garantir que sistemas, equipamentos e redes da sua empresa funcionem corretamente, com SLAs claros e boas práticas.",
    type: "website",
    url: `${SITE_URL}/suporte-tecnico`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Suporte Técnico | STARK Gestão em Tecnologia",
    description: "Atendimento presencial ou remoto para garantir que sistemas, equipamentos e redes da sua empresa funcionem corretamente, com SLAs claros e boas práticas.",
  },
  alternates: {
    canonical: `${SITE_URL}/suporte-tecnico`,
  },
};

export default function SuporteTecnicoPage() {
  return (
    <main className="container-px py-16">
      <SuporteTecnicoSeo />
      <section className="mx-auto max-w-7xl">
        <header className="mb-10 text-center">
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">
            Suporte Técnico
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-gray-300">
            Atendimento presencial ou remoto para garantir que sistemas,
            equipamentos e redes da sua empresa funcionem corretamente, com SLAs
            claros e boas práticas.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="rounded-xl bg-card p-8 shadow-soft border border-white/10">
            <h2 className="mb-4 text-2xl font-semibold text-white">
              Como ajudamos
            </h2>
            <p className="text-gray-200">
              Diagnosticamos, corrigimos e prevenimos problemas que impactam a
              produtividade. Atuamos com monitoramento, manutenção preventiva e
              resposta rápida a incidentes.
            </p>
            <SuporteTecnicoCta />
          </div>

          <div className="rounded-xl bg-card p-8 shadow-soft border border-white/10">
            <h2 className="mb-4 text-2xl font-semibold text-white">
              Escopo do serviço
            </h2>
            <ul className="space-y-2 text-gray-200 text-sm">
              {[
                "Usuários com lentidão",
                "Erros sistemáticos e travamentos",
                "Instalação e configuração de computadores e impressoras",
                "Redes",
                "Softwares, antivírus e sistemas operacionais",
                "Manutenção preventiva e corretiva",
                "Backups",
                "Atendimento remoto ou presencial",
              ].map((item) => (
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
        </div>
        {/* Diagnóstico */}
        <div className="mt-10">
          <SupportDiagnosis />
        </div>
      </section>
    </main>
  );
}
