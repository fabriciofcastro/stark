// components/sections/suporte-tecnico-seo.tsx
"use client";

import { JsonLd, serviceData, breadcrumbData } from "@/components/seo/structured-data";

export const SuporteTecnicoSeo = () => {
  const data = serviceData(
    "Suporte Técnico de TI",
    "Atendimento presencial ou remoto para garantir que sistemas, equipamentos e redes da sua empresa funcionem corretamente, com SLAs claros e boas práticas.",
  );

  return (
    <>
      <JsonLd data={data} />
      <JsonLd data={breadcrumbData("Suporte Técnico", "/suporte-tecnico")} />
    </>
  );
};