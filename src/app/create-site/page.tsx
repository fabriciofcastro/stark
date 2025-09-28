import Link from "next/link";
import { CriacaoSitesCta } from "@/components/sections/criacao-sites-cta";
import { CriacaoSitesSeo } from "@/components/sections/criacao-sites-seo";
import { SITE_URL } from "@/lib/site";

export const metadata = {
  title: "Criação de Sites | STARK Gestão em Tecnologia",
  description: "Sites rápidos, seguros e prontos para ranquear. Foco em conversão, SEO técnico e performance.",
  keywords: "criação de sites, desenvolvimento web, SEO, performance, conversão, sites responsivos, Core Web Vitals",
  openGraph: {
    title: "Criação de Sites | STARK Gestão em Tecnologia",
    description: "Sites rápidos, seguros e prontos para ranquear. Foco em conversão, SEO técnico e performance.",
    type: "website",
    url: `${SITE_URL}/criacao-de-sites`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Criação de Sites | STARK Gestão em Tecnologia",
    description: "Sites rápidos, seguros e prontos para ranquear. Foco em conversão, SEO técnico e performance.",
  },
  alternates: {
    canonical: `${SITE_URL}/criacao-de-sites`,
  },
};

export default function CriacaoDeSitesPage() {
  const checklist = [
    "Core Web Vitals (LCP < 2.5s, CLS < 0.1)",
    "Meta tags e Open Graph por página",
    "sitemap.xml e robots.txt dinâmicos",
    "Schema (Organization, Service, Article, FAQ)",
    "Imagens otimizadas e lazy-loading",
    "Cache, compressão e minificação",
  ];

  const portfolio = [
    { title: "Projeto A", desc: "Site institucional moderno", url: "#" },
    { title: "Projeto B", desc: "Landing page de alta conversão", url: "#" },
    { title: "Projeto C", desc: "Portal com blog e SEO avançado", url: "#" },
  ];

  return (
    <main className="container-px py-16">
      <CriacaoSitesSeo />

      <section className="mx-auto max-w-7xl">
        <header className="mb-10 text-center">
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">
            Criação de Sites
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-gray-300">
            Sites rápidos, seguros e prontos para ranquear. Foco em conversão,
            SEO técnico e performance.
          </p>
        </header>

        {/* Portfólio */}
        <div className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold text-white">Portfólio</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {portfolio.map((p) => (
              <a
                key={p.title}
                href={p.url}
                className="rounded-xl border border-white/10 bg-card p-6 shadow-soft"
              >
                <div className="mb-3 h-28 w-full rounded-lg bg-white/5" />
                <h3 className="text-lg font-semibold text-white">{p.title}</h3>
                <p className="text-sm text-gray-200">{p.desc}</p>
              </a>
            ))}
          </div>
        </div>

        {/* Checklist SEO/Performance */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="rounded-xl bg-card p-8 shadow-soft border border-white/10">
            <h2 className="mb-4 text-2xl font-semibold text-white">
              Checklist SEO & Performance
            </h2>
            <ul className="space-y-2 text-gray-200 text-sm">
              {checklist.map((item) => (
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
              Vamos tirar seu site do papel
            </h2>
            <p className="text-gray-300">
              Conte sua necessidade e receba uma proposta sob medida com prazos,
              escopo e investimento.
            </p>
            <CriacaoSitesCta />
          </div>
        </div>
      </section>
    </main>
  );
}
