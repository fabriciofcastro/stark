"use client";

import { useMemo } from "react";

const content: Record<string, { title: string; body: string; date: string }> = {
  "guia-estabilizar-ti-seguranca-pmes": {
    title: "Guia prático: estabilizando TI e segurança para PMEs",
    date: "2025-09-19",
    body: "Estabilizar TI passa por governança (processos), operação (SLA, monitoramento), e segurança (NIST/ISO). Comece com inventário, patching, backups testados e observabilidade.",
  },
};

export default function BlogPostPage({ params }: any) {
  const post = useMemo(() => content[params.slug], [params.slug]);
  if (!post) {
    return (
      <main className="container-px py-16">
        <p className="text-gray-300">Conteúdo não encontrado.</p>
      </main>
    );
  }
  return (
    <main className="container-px py-16">
      <article className="mx-auto max-w-3xl">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-white">{post.title}</h1>
          <p className="text-xs text-gray-500">{post.date}</p>
        </header>
        <p className="text-gray-300">{post.body}</p>
      </article>
    </main>
  );
}
