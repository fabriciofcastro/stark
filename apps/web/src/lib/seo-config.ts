import { SITE_URL } from "@/lib/site";

export const defaultSeo = {
  titleTemplate: "%s | STARK Gestão em Tecnologia",
  defaultTitle: "STARK Gestão em Tecnologia",
  description:
    "Empresa especializada em tecnologia da informação com foco em infraestrutura, segurança da informação, suporte e consultoria estratégica.",
  canonical: SITE_URL,
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "STARK Gestão em Tecnologia",
    description:
      "Empresa especializada em tecnologia da informação com foco em infraestrutura, segurança da informação, suporte e consultoria estratégica.",
    siteName: "STARK Gestão em Tecnologia",
  },
  twitter: {
    cardType: "summary_large_image",
  },
};
