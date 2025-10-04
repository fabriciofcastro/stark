import { SITE_URL } from "@/lib/site";

export const defaultSeo = {
  titleTemplate: "%s | STARK Solutions",
  defaultTitle: "STARK Solutions",
  description:
    "Empresa especializada em soluções tecnológicas de ponta com foco em inteligência artificial, infraestrutura avançada, segurança cibernética e inovação estratégica.",
  canonical: SITE_URL,
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "STARK Solutions",
    description:
      "Empresa especializada em soluções tecnológicas de ponta com foco em inteligência artificial, infraestrutura avançada, segurança cibernética e inovação estratégica.",
    siteName: "STARK Solutions",
  },
  twitter: {
    cardType: "summary_large_image",
  },
};
