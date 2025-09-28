// components/sections/governanca-seo.tsx
"use client";

import { JsonLd, serviceData, breadcrumbData } from "@/components/seo/structured-data";

export const GovernancaSeo = () => {
  const data = serviceData(
    "Governança de TI",
    "Estruturamos processos, políticas e controles alinhados a COBIT, ITIL, ISO 27001 e NIST. Auditoria, gestão de riscos, LGPD e DPA.",
  );

  return (
    <>
      <JsonLd data={data} />
      <JsonLd data={breadcrumbData("Governança de TI", "/governanca")} />
    </>
  );
};