import { JsonLd, serviceData, breadcrumbData } from "@/components/seo/structured-data";
import { HelpdeskForm } from "@/components/sections/helpdesk-form";
import { HelpdeskSeo } from "@/components/sections/helpdesk-seo";
import { SITE_URL } from "@/lib/site";

export const metadata = {
  title: "Help Desk | STARK Gestão em Tecnologia",
  description: "Abra um chamado, consulte a base de conhecimento e acesse ferramentas de suporte remoto.",
  keywords: "help desk, suporte, chamados, base de conhecimento, atendimento, ticket",
  openGraph: {
    title: "Help Desk | STARK Gestão em Tecnologia",
    description: "Abra um chamado, consulte a base de conhecimento e acesse ferramentas de suporte remoto.",
    type: "website",
    url: `${SITE_URL}/helpdesk`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Help Desk | STARK Gestão em Tecnologia",
    description: "Abra um chamado, consulte a base de conhecimento e acesse ferramentas de suporte remoto.",
  },
  alternates: {
    canonical: `${SITE_URL}/helpdesk`,
  },
};

export default function HelpdeskPage() {
  const kb = [
    {
      title: "Acesso remoto",
      items: ["Como baixar o AnyDesk", "Permissões no macOS"],
    },
    {
      title: "Email e Office",
      items: ["Configurar e-mail no Outlook", "Recuperar senha"],
    },
    {
      title: "Windows & Drivers",
      items: ["Atualizações", "Instalar impressoras"],
    },
    { title: "Backups", items: ["Política de cópias", "Testar restore"] },
  ];

  return (
    <main className="container-px py-16 reveal">
      <HelpdeskSeo />

      <section className="mx-auto max-w-7xl">
        <header className="mb-10 text-center">
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">
            Help Desk
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-gray-200">
            Abra um chamado, consulte a base de conhecimento e acesse
            ferramentas de suporte remoto.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <HelpdeskForm />
          
          {/* Base de conhecimento */}
          <section className="rounded-xl bg-card p-8 shadow-soft border border-white/10">
            <h2 className="mb-4 text-2xl font-semibold text-white">
              Base de conhecimento
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {kb.map((cat) => (
                <div
                  key={cat.title}
                  className="rounded-lg border border-white/10 bg-white/5 p-4"
                >
                  <h3 className="mb-2 font-semibold text-white">{cat.title}</h3>
                  <ul className="space-y-1 text-sm text-gray-200">
                    {cat.items.map((it) => (
                      <li
                        key={`${cat.title}-${it}`}
                        className="flex items-start"
                      >
                        <span
                          className="mt-1 mr-2 inline-block h-2 w-2 rounded-full bg-gold"
                          aria-hidden="true"
                        />
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Ferramentas e status */}
        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
          <section className="rounded-xl bg-card p-8 shadow-soft border border-white/10">
            <h2 className="mb-4 text-2xl font-semibold text-white">
              Suporte remoto
            </h2>
            <div className="flex flex-wrap gap-3 text-sm">
              <a
                href="https://anydesk.com/pt/downloads"
                className="rounded-lg bg-gold px-5 py-3 font-medium text-black hover:opacity-90"
                target="_blank"
                rel="noopener noreferrer"
              >
                Baixar AnyDesk
              </a>
              <a
                href="https://www.teamviewer.com/pt-br/download"
                className="rounded-lg border border-white/30 px-5 py-3 font-medium text-white hover:bg-white/10"
                target="_blank"
                rel="noopener noreferrer"
              >
                Baixar TeamViewer
              </a>
            </div>
          </section>
          <section className="rounded-xl bg-card p-8 shadow-soft border border-white/10">
            <h2 className="mb-2 text-2xl font-semibold text-white">Status</h2>
            <p className="text-sm text-gray-200">
              Nenhuma indisponibilidade reportada no momento.
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}
