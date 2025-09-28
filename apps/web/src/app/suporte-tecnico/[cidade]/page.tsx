"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { useMemo } from "react";

const SUPPORTED_CITIES = [
  "itaquaquecetuba",
  "mogi-das-cruzes",
  "sao-paulo",
  "guarulhos",
  "suzano",
];

export default function SuporteTecnicoCidadePage({
  params,
}: {
  params: Promise<{ cidade: string }>;
}) {
  const resolvedParams = useMemo(() => {
    // In a real app, you would await params here
    // For now, we'll just cast it to the expected type
    return { cidade: (params as unknown as { cidade: string }).cidade };
  }, [params]);

  const { cidade } = resolvedParams;

  const isSupported = useMemo(
    () => SUPPORTED_CITIES.includes(cidade.toLowerCase()),
    [cidade],
  );

  if (!isSupported) {
    notFound();
  }

  const cityTitle = cidade
    .replace(/-/g, " ")
    .replace(/\b\w/g, (m) => m.toUpperCase());

  return (
    <main className="container-px py-16">
      <section className="mx-auto max-w-7xl">
        <header className="mb-10 text-center">
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">
            Suporte Técnico em {cityTitle}
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-gray-300">
            Atendemos empresas em {cityTitle} com suporte remoto e presencial,
            SLAs claros e boas práticas de TI.
          </p>
        </header>

        <div className="mt-6 flex justify-center gap-3">
          <Link
            href="https://wa.me/5511994396469"
            className="rounded-lg bg-gold px-5 py-3 text-sm font-medium text-black hover:opacity-90"
          >
            Falar no WhatsApp
          </Link>
          <Link
            href="/contact"
            className="rounded-lg border border-white/30 px-5 py-3 text-sm font-medium text-white hover:bg-white/10"
          >
            Solicitar diagnóstico
          </Link>
        </div>

        <p className="mt-6 text-center text-sm text-gray-200">
          Cidades atendidas próximas:{" "}
          {SUPPORTED_CITIES.filter((c) => c !== cidade)
            .map((c) =>
              c.replace(/-/g, " ").replace(/\b\w/g, (m) => m.toUpperCase()),
            )
            .join(", ")}
        </p>
      </section>
    </main>
  );
}
