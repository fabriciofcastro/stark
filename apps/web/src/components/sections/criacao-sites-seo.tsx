// components/sections/criacao-sites-seo.tsx
"use client";

import { JsonLd, serviceData, breadcrumbData } from "@/components/seo/structured-data";

export const CriacaoSitesSeo = () => {
  const data = serviceData(
    "Criação de Sites",
    "Sites rápidos, seguros e prontos para ranquear. Foco em conversão, SEO técnico e performance.",
  );

  return (
    <>
      <JsonLd data={data} />
      <JsonLd data={breadcrumbData("Criação de Sites", "/criacao-de-sites")} />
    </>
  );
};