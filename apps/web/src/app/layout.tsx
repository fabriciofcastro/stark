// app/layout.js
import "./globals.css";
import type { Viewport } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/sections/header";
import { JsonLd, organizationData } from "@/components/seo/structured-data";
import {
  RevealOnScroll,
  HashRedirector,
  GA4,
} from "@/components/wrappers";
import { AdvancedSEOProvider } from "@/components/seo/advanced-seo-provider";
import { generatePerformanceMeta, generateSecurityMeta } from "@/lib/seo-advanced";
import ModernCookieConsent from "@/components/ui/modern-cookie-consent";
import { ChatProvider } from "@/components/chat";
import Toaster from "@/components/ui/toast";
import { SITE_URL } from "@/lib/site";
import { AdvancedPerformanceOptimizer } from "@/components/performance/advanced-performance";
import { FloatingSocialShare, FloatingSocialFollow } from "@/components/social";
import { StrategicCTA } from "@/components/cta";

export const metadata = {
  title:
    "STARK Gestão em Tecnologia | Serviços de Informática e Suporte Técnico",
  description:
    "Empresa especializada em tecnologia da informação com foco em infraestrutura, segurança da informação, suporte e consultoria estratégica em Itaquaquecetuba - SP.",
  keywords:
    "suporte técnico, serviços de informática, consultoria em tecnologia, soluções em nuvem, recuperação de dados, segurança da informação, LGPD, Itaquaquecetuba, SP",
  openGraph: {
    title: "STARK Gestão em Tecnologia",
    description:
      "Empresa especializada em tecnologia da informação com foco em infraestrutura, segurança da informação, suporte e consultoria estratégica.",
    type: "website",
    url: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icons/favicon-196.png", sizes: "196x196", type: "image/png" },
    ],
    apple: [{ url: "/icons/apple-icon-180.png" }],
    other: [{ rel: "mask-icon", url: "/icon.svg" }],
  },
  other: {
    "msapplication-TileColor": "#0c1916",
    "msapplication-TileImage": "/icons/mstile-icon-270.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#d4a017",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="pt-BR"
      className="scroll-smooth overflow-x-hidden"
      suppressHydrationWarning
    >
      <head>
        <JsonLd data={organizationData} />
      </head>
      <body
        className="antialiased bg-gradient-to-br from-primary-900/95 via-neutral-950/98 to-accent-900/95 text-white min-h-screen overflow-hidden"
        suppressHydrationWarning={true}
      >
        <Link
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 rounded bg-[hsl(var(--brand-gold-500))] px-3 py-2 text-black"
        >
          Pular para o conteúdo
        </Link>
        <Header />
        <main id="content" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <RevealOnScroll />
        <HashRedirector />
        <ChatProvider />
        <GA4 />
        <ModernCookieConsent />
        <Toaster />
        <AdvancedPerformanceOptimizer />
        <FloatingSocialShare />
        <FloatingSocialFollow />
        <StrategicCTA variant="floating" />
      </body>
    </html>
  );
}
