// components/sections/contact-page-seo.tsx

import { JsonLd, serviceData } from "@/components/seo/structured-data";

export const ContactPageSeo = () => {
  const contactData = serviceData(
    "Contato",
    "Entre em contato com a STARK Gestão em Tecnologia para obter suporte técnico, consultoria em TI, soluções de infraestrutura e segurança da informação em Itaquaquecetuba - SP.",
  );

  return <JsonLd data={contactData} />;
};
