import { SupportDiagnosis } from "@/components/sections/support-diagnosis";
import { SuporteTecnicoCta } from "@/components/sections/suporte-tecnico-cta";
import { SuporteTecnicoSeo } from "@/components/sections/suporte-tecnico-seo";
import { SITE_URL } from "@/lib/site";
import {
  ThemedSection,
  ThemedContainer,
  ThemedTitle,
} from "@/components/ui/themed-section";

export const metadata = {
  title: "Suporte Técnico | STARK Gestão em Tecnologia",
  description:
    "Atendimento presencial ou remoto para garantir que sistemas, equipamentos e redes da sua empresa funcionem corretamente, com SLAs claros e boas práticas.",
  keywords:
    "suporte técnico, atendimento remoto, atendimento presencial, help desk, SLA, manutenção preventiva, manutenção corretiva",
  openGraph: {
    title: "Suporte Técnico | STARK Gestão em Tecnologia",
    description:
      "Atendimento presencial ou remoto para garantir que sistemas, equipamentos e redes da sua empresa funcionem corretamente, com SLAs claros e boas práticas.",
    type: "website",
    url: `${SITE_URL}/suporte-tecnico`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Suporte Técnico | STARK Gestão em Tecnologia",
    description:
      "Atendimento presencial ou remoto para garantir que sistemas, equipamentos e redes da sua empresa funcionem corretamente, com SLAs claros e boas práticas.",
  },
  alternates: {
    canonical: `${SITE_URL}/suporte-tecnico`,
  },
};

export default function SuporteTecnicoPage() {
  return (
    <ThemedSection themeName="support" variant="page" className="min-h-screen">
      <SuporteTecnicoSeo />
      <ThemedContainer themeName="support" className="py-16">
        {/* Header com tema aplicado */}
        <header className="mb-10 text-center">
          <ThemedTitle themeName="support" level={1} className="mb-6">
            Suporte Técnico 24/7
          </ThemedTitle>
          <p className="mx-auto max-w-3xl text-xl text-white/80">
            Atendimento presencial ou remoto para garantir que sistemas,
            equipamentos e redes da sua empresa funcionem corretamente, com SLAs
            claros e boas práticas.
          </p>

          {/* Accent Line */}
          <div className="h-1 w-24 mx-auto mt-8 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full" />
        </header>

        {/* Conteúdo existente mantido com melhorias visuais */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="rounded-xl bg-white/10 backdrop-blur-sm p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
            <h2 className="mb-4 text-2xl font-semibold text-white flex items-center">
              <span className="text-3xl mr-3">🔧</span>
              Como ajudamos
            </h2>
            <p className="text-gray-200 mb-6">
              Diagnosticamos, corrigimos e prevenimos problemas que impactam a
              produtividade. Atuamos com monitoramento, manutenção preventiva e
              resposta rápida a incidentes.
            </p>
            <SuporteTecnicoCta />
          </div>

          <div className="rounded-xl bg-white/10 backdrop-blur-sm p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
            <h2 className="mb-4 text-2xl font-semibold text-white flex items-center">
              <span className="text-3xl mr-3">⚙️</span>
              Escopo do serviço
            </h2>
            <ul className="space-y-3 text-gray-200">
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
                    className="mt-1 mr-3 inline-block h-2 w-2 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Diagnóstico mantido */}
        <div className="mt-10">
          <SupportDiagnosis />
        </div>
      </ThemedContainer>
    </ThemedSection>
  );
}
