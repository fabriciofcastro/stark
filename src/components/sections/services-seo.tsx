// components/sections/services-seo.tsx
"use client";

import { JsonLd, serviceData } from "@/components/seo/structured-data";

export const ServicesSeo = () => {
  const servicesData = serviceData(
    "Serviços de Tecnologia",
    "STARK oferece diversos serviços de tecnologia da informação, incluindo infraestrutura, segurança, suporte técnico e consultoria estratégica para empresas em Itaquaquecetuba - SP."
  );

  return <JsonLd data={servicesData} />;
};