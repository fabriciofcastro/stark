import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Criação de Sites | STARK Solutions",
  description: "Sites rápidos, seguros e prontos para ranquear. Foco em conversão, SEO técnico e performance.",
  keywords: "criação de sites, desenvolvimento web, SEO, performance, conversão, sites responsivos, Core Web Vitals",
  openGraph: {
    title: "Criação de Sites | STARK Solutions",
    description: "Sites rápidos, seguros e prontos para ranquear. Foco em conversão, SEO técnico e performance.",
    type: "website",
    url: `${SITE_URL}/criacao-de-sites`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Criação de Sites | STARK Solutions",
    description: "Sites rápidos, seguros e prontos para ranquear. Foco em conversão, SEO técnico e performance.",
  },
  alternates: {
    canonical: `${SITE_URL}/criacao-de-sites`,
  },
};

export default function CreateSiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
