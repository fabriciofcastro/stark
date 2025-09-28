"use client";

import Link from "next/link";

const posts = [
  {
    slug: "guia-estabilizar-ti-seguranca-pmes",
    title: "Guia prático: estabilizando TI e segurança para PMEs",
    excerpt:
      "Boas práticas para reduzir incidentes, aumentar performance e estar em conformidade.",
    date: "2025-09-19",
  },
];

export default function BlogIndexPage() {
  return (
    <main className="container-px py-16 reveal">
      <section className="mx-auto max-w-7xl">
        <header className="mb-10 text-center">
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">
            Blog
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-gray-300">
            Conteúdo técnico sobre governança, suporte, cloud, segurança e IA.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {posts.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="rounded-xl border border-white/10 bg-card p-6 shadow-soft hover:border-white/30"
            >
              <div className="mb-3 h-28 w-full rounded-lg bg-white/5" />
              <h2 className="text-lg font-semibold text-white">{p.title}</h2>
              <p className="text-sm text-gray-200">{p.excerpt}</p>
              <p className="mt-2 text-xs text-gray-500">{p.date}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
