// components/sections/suporte-tecnico-cidade-seo.tsx
"use client";

import { JsonLd, localBusinessData } from "@/components/seo/structured-data";

export const SuporteTecnicoCidadeSeo = ({ cityTitle }: { cityTitle: string }) => {
  return <JsonLd data={localBusinessData(cityTitle)} />;
};