// app/layout.js
import "./globals.css";
import type { Viewport } from "next";
import Link from "next/link";
import dynamic from "next/dynamic";
import type { ReactNode } from "react";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/sections/header";
import { JsonLd, organizationData } from "@/components/seo/structured-data";
import { SITE_URL } from "@/lib/site";

// Lazy load de componentes não críticos para melhorar FCP e LCP
const RevealOnScroll = dynamic(() => 
  import("@/components/wrappers").then(mod => mod.RevealOnScroll), 
  { ssr: false }
);

const HashRedirector = dynamic(() => 
  import("@/components/wrappers").then(mod => mod.HashRedirector), 
  { ssr: false }
);

const GA4 = dynamic(() => 
  import("@/components/wrappers").then(mod => mod.GA4), 
  { ssr: false }
);

const ModernCookieConsent = dynamic(() => 
  import("@/components/ui/modern-cookie-consent"), 
  { ssr: false }
);

const ChatProvider = dynamic(() => 
  import("@/components/chat").then(mod => mod.ChatProvider), 
  { ssr: false }
);

const Toaster = dynamic(() => 
  import("@/components/ui/toast"), 
  { ssr: false }
);

const AdvancedPerformanceOptimizer = dynamic(() => 
  import("@/components/performance/advanced-performance").then(mod => mod.AdvancedPerformanceOptimizer), 
  { ssr: false }
);

const FloatingSocialShare = dynamic(() => 
  import("@/components/social").then(mod => mod.FloatingSocialShare), 
  { ssr: false }
);

const FloatingSocialFollow = dynamic(() => 
  import("@/components/social").then(mod => mod.FloatingSocialFollow), 
  { ssr: false }
);

const StrategicCTA = dynamic(() => 
  import("@/components/cta").then(mod => mod.StrategicCTA), 
  { ssr: false }
);

export const metadata = {
  title:
    "STARK Solutions | Soluções Tecnológicas Avançadas e Inovadoras",
  description:
    "Empresa especializada em soluções tecnológicas de ponta com foco em inteligência artificial, infraestrutura avançada, segurança cibernética e inovação estratégica em Itaquaquecetuba - SP.",
  keywords:
    "soluções tecnológicas, inteligência artificial, infraestrutura avançada, segurança cibernética, inovação tecnológica, STARK Solutions, tecnologia de ponta, Itaquaquecetuba, SP",
  openGraph: {
    title: "STARK Solutions",
    description:
      "Empresa especializada em soluções tecnológicas de ponta com foco em inteligência artificial, infraestrutura avançada, segurança cibernética e inovação estratégica.",
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
