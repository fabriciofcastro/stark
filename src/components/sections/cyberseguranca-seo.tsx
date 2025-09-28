// components/sections/cyberseguranca-seo.tsx
"use client";

import { JsonLd, serviceData, breadcrumbData } from "@/components/seo/structured-data";

export const CybersegurancaSeo = () => {
  const data = serviceData(
    "Cibersegurança",
    "Reduzimos riscos com testes de intrusão, hardening, monitoramento contínuo (SOC/MDR) e resposta a incidentes alinhada a NIST.",
  );

  return (
    <>
      <JsonLd data={data} />
      <JsonLd data={breadcrumbData("Cibersegurança", "/cyberseguranca")} />
    </>
  );
};