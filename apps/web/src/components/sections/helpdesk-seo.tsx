// components/sections/helpdesk-seo.tsx
"use client";

import { JsonLd, serviceData, breadcrumbData } from "@/components/seo/structured-data";

export const HelpdeskSeo = () => {
  const data = serviceData(
    "Help Desk e Suporte",
    "Abra um chamado, consulte a base de conhecimento e acesse ferramentas de suporte remoto.",
  );

  return (
    <>
      <JsonLd data={data} />
      <JsonLd data={breadcrumbData("Help Desk", "/helpdesk")} />
    </>
  );
};