// lib/seo-advanced.tsx - Sistema SEO Avançado e Otimizado
import { Metadata } from "next";

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  articleAuthor?: string;
  articlePublishedTime?: string;
  articleModifiedTime?: string;
  articleSection?: string;
  articleTags?: string[];
  noIndex?: boolean;
  noFollow?: boolean;
  alternateHreflang?: Array<{ href: string; hreflang: string }>;
  structuredData?: any;
  breadcrumbs?: Array<{ name: string; url: string }>;
  faq?: Array<{ question: string; answer: string }>;
  service?: {
    name: string;
    description: string;
    price?: string;
    category: string;
  };
  localBusiness?: {
    name: string;
    address: string;
    phone: string;
    email: string;
    openingHours: string[];
    serviceArea: string[];
  };
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://starksolutions.com.br";
const SITE_NAME = "STARK Solutions";
const DEFAULT_OG_IMAGE = `${SITE_URL}/images/og-default.jpg`;
const TWITTER_HANDLE = "@starksolutions";

// Keywords por categoria de serviço
export const SERVICE_KEYWORDS = {
  "suporte-tecnico": [
    "suporte técnico",
    "suporte informática",
    "manutenção computadores",
    "help desk",
    "suporte remoto",
    "suporte técnico São Paulo",
    "suporte técnico Itaquaquecetuba",
    "assistência técnica informática",
    "suporte TI empresas",
    "manutenção preventiva"
  ],
  "consultoria-tecnologica": [
    "consultoria tecnológica",
    "consultoria TI",
    "consultoria informática",
    "transformação digital",
    "consultoria estratégica TI",
    "planejamento tecnológico",
    "auditoria TI",
    "governança tecnologia",
    "consultoria digital",
    "consultoria inovação"
  ],
  "cloud-vps-linux": [
    "servidor cloud",
    "VPS Linux",
    "hospedagem cloud",
    "servidor dedicado",
    "cloud computing",
    "infraestrutura cloud",
    "migração cloud",
    "backup cloud",
    "servidor virtual",
    "cloud privado"
  ],
  "governance": [
    "governança TI",
    "governança tecnologia",
    "framework ITIL",
    "gestão processos TI",
    "compliance TI",
    "auditoria TI",
    "políticas TI",
    "controle TI",
    "gestão serviços TI",
    "governança digital"
  ],
  "cyberseguranca": [
    "cybersegurança",
    "segurança informação",
    "segurança digital",
    "proteção dados",
    "firewall",
    "antivírus corporativo",
    "backup segurança",
    "LGPD compliance",
    "auditoria segurança",
    "treinamento segurança"
  ],
  "create-site": [
    "criação sites",
    "desenvolvimento web",
    "site responsivo",
    "e-commerce",
    "loja virtual",
    "landing page",
    "site institucional",
    "desenvolvimento aplicações",
    "design web",
    "programação web"
  ]
};

// Função para gerar metadata SEO avançado
export function generateAdvancedSEO(config: SEOConfig): Metadata {
  const {
    title,
    description,
    keywords = [],
    canonical,
    ogImage = DEFAULT_OG_IMAGE,
    ogType = "website",
    articleAuthor,
    articlePublishedTime,
    articleModifiedTime,
    articleSection,
    articleTags,
    noIndex = false,
    noFollow = false,
    alternateHreflang,
    breadcrumbs
  } = config;

  const fullTitle = `${title} | ${SITE_NAME}`;
  const canonicalUrl = canonical ? `${SITE_URL}${canonical}` : undefined;

  return {
    title: fullTitle,
    description,
    keywords: keywords.join(", "),
    authors: [{ name: articleAuthor || SITE_NAME }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    
    // Robots
    robots: {
      index: !noIndex,
      follow: !noFollow,
      googleBot: {
        index: !noIndex,
        follow: !noFollow,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    // Open Graph
    openGraph: {
      type: ogType,
      locale: "pt_BR",
      url: canonicalUrl,
      title: fullTitle,
      description,
      siteName: SITE_NAME,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(ogType === "article" && {
        publishedTime: articlePublishedTime,
        modifiedTime: articleModifiedTime,
        section: articleSection,
        tags: articleTags,
      }),
    },

    // Twitter
    twitter: {
      card: "summary_large_image",
      site: TWITTER_HANDLE,
      creator: TWITTER_HANDLE,
      title: fullTitle,
      description,
      images: [ogImage],
    },

    // Canonical
    alternates: {
      canonical: canonicalUrl,
      ...(alternateHreflang && {
        languages: Object.fromEntries(
          alternateHreflang.map(({ href, hreflang }) => [hreflang, `${SITE_URL}${href}`])
        ),
      }),
    },

    // Other meta
    other: {
      "google-site-verification": process.env.GOOGLE_SITE_VERIFICATION || "",
      "msapplication-TileColor": "#0c1916",
      "theme-color": "#06b6d4",
      "apple-mobile-web-app-capable": "yes",
      "apple-mobile-web-app-status-bar-style": "black-translucent",
      "apple-mobile-web-app-title": SITE_NAME,
      "mobile-web-app-capable": "yes",
      "application-name": SITE_NAME,
      "msapplication-tooltip": description,
      "msapplication-starturl": "/",
      "msapplication-navbutton-color": "#06b6d4",
      "msapplication-TileImage": `${SITE_URL}/icons/mstile-icon-270.png`,
    },

    // Icons
    icons: {
      icon: [
        { url: "/icon.svg", type: "image/svg+xml" },
        { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      ],
      apple: [
        { url: "/icons/apple-icon-180.png", sizes: "180x180", type: "image/png" },
      ],
      other: [
        { rel: "mask-icon", url: "/icon.svg", color: "#06b6d4" },
      ],
    },

    // Manifest
    manifest: "/manifest.webmanifest",
  };
}

// Função para gerar dados estruturados JSON-LD
export function generateStructuredData(config: SEOConfig): string {
  const { structuredData, breadcrumbs, faq, service, localBusiness, ogType } = config;

  const baseStructuredData = {
    "@context": "https://schema.org",
    "@type": ogType === "article" ? "Article" : "WebPage",
    name: config.title,
    description: config.description,
    url: `${SITE_URL}${config.canonical || ""}`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}${config.canonical || ""}`,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
        width: 200,
        height: 60,
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+55-11-99439-6469",
        contactType: "customer service",
        email: "contato@starksolutions.com.br",
        availableLanguage: ["Portuguese"],
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: "Av. Paulista, 1000",
        addressLocality: "Itaquaquecetuba",
        addressRegion: "SP",
        postalCode: "08575-000",
        addressCountry: "BR",
      },
      sameAs: [
        "https://www.linkedin.com/company/stark-tecnologia",
        "https://www.instagram.com/starktecnologia",
        "https://www.facebook.com/starktecnologia",
      ],
    },
  };

  // Adicionar breadcrumbs se existirem
  if (breadcrumbs && breadcrumbs.length > 0) {
    (baseStructuredData as any).breadcrumb = {
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: `${SITE_URL}${item.url}`,
      })),
    };
  }

  // Adicionar FAQ se existir
  if (faq && faq.length > 0) {
    (baseStructuredData as any).mainEntity = {
      "@type": "FAQPage",
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    };
  }

  // Adicionar dados de serviço se existir
  if (service) {
    (baseStructuredData as any).offers = {
      "@type": "Offer",
      name: service.name,
      description: service.description,
      category: service.category,
      ...(service.price && { price: service.price }),
      priceCurrency: "BRL",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: SITE_NAME,
      },
    };
  }

  // Adicionar dados de negócio local se existir
  if (localBusiness) {
    (baseStructuredData as any).about = {
      "@type": "LocalBusiness",
      name: localBusiness.name,
      description: config.description,
      address: {
        "@type": "PostalAddress",
        streetAddress: localBusiness.address,
      },
      telephone: localBusiness.phone,
      email: localBusiness.email,
      openingHoursSpecification: localBusiness.openingHours.map((hours) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: hours.split(" ")[0],
        opens: hours.split(" ")[1]?.split("-")[0],
        closes: hours.split(" ")[1]?.split("-")[1],
      })),
      areaServed: localBusiness.serviceArea.map((area) => ({
        "@type": "City",
        name: area,
      })),
    };
  }

  // Merge com dados estruturados customizados
  const finalStructuredData = structuredData 
    ? { ...baseStructuredData, ...structuredData }
    : baseStructuredData;

  return JSON.stringify(finalStructuredData, null, 2);
}

// Função para otimizar URLs para SEO
export function optimizeURL(url: string): string {
  return url
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

// Função para gerar meta tags de performance
export function generatePerformanceMeta(): string {
  return `
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
    <meta name="format-detection" content="telephone=no" />
    <meta name="HandheldFriendly" content="true" />
    <meta name="MobileOptimized" content="width" />
    <meta http-equiv="cleartype" content="on" />
    <meta name="mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
    <meta name="apple-mobile-web-app-title" content="${SITE_NAME}" />
    <meta name="application-name" content="${SITE_NAME}" />
    <meta name="msapplication-tap-highlight" content="no" />
    <meta name="msapplication-TileColor" content="#0c1916" />
    <meta name="msapplication-config" content="/browserconfig.xml" />
    <meta name="theme-color" content="#06b6d4" />
    <meta name="color-scheme" content="dark light" />
    <meta name="supported-color-schemes" content="dark light" />
  `;
}

// Função para gerar meta tags de segurança
export function generateSecurityMeta(): string {
  return `
    <meta http-equiv="X-Content-Type-Options" content="nosniff" />
    <meta http-equiv="X-Frame-Options" content="DENY" />
    <meta http-equiv="X-XSS-Protection" content="1; mode=block" />
    <meta http-equiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
    <meta http-equiv="Permissions-Policy" content="camera=(), microphone=(), geolocation=()" />
    <meta name="referrer" content="strict-origin-when-cross-origin" />
  `;
}

// Função para gerar sitemap dinâmico
export function generateSitemapData(): Array<{
  url: string;
  lastModified: string;
  changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority: number;
}> {
  const basePages = [
    { url: "", priority: 1.0, changeFrequency: "weekly" as const },
    { url: "/contact", priority: 0.9, changeFrequency: "monthly" as const },
    { url: "/sobre", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/services", priority: 0.9, changeFrequency: "weekly" as const },
    { url: "/portfolio", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/blog", priority: 0.7, changeFrequency: "weekly" as const },
  ];

  const servicePages = Object.keys(SERVICE_KEYWORDS).map((service) => ({
    url: `/${service}`,
    priority: 0.8,
    changeFrequency: "monthly" as const,
  }));

  const legalPages = [
    "/politica-privacidade",
    "/termos-uso",
    "/politica-cookies",
    "/lgpd",
    "/faq",
  ].map((page) => ({
    url: page,
    priority: 0.3,
    changeFrequency: "yearly" as const,
  }));

  const allPages = [...basePages, ...servicePages, ...legalPages];

  return allPages.map((page) => ({
    url: `${SITE_URL}${page.url}`,
    lastModified: new Date().toISOString(),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}

