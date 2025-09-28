// components/sections/contact-seo.tsx
"use client";

import {
  JsonLd,
  serviceData,
  breadcrumbData,
} from "@/components/seo/structured-data";

export const ContactSeo = () => {
  const data = serviceData(
    "Contato",
    "Fale com a STARK para suporte técnico, consultoria, cloud e segurança. WhatsApp, e‑mail ou formulário com validação e reCAPTCHA.",
  );

  return (
    <>
      <JsonLd data={data} />
      <JsonLd data={breadcrumbData("Contact", "/contact")} />
    </>
  );
};
