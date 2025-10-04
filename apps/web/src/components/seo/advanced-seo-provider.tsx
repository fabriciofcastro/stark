// components/seo/advanced-seo-provider.tsx - Provider SEO Avançado
"use client";

import { useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { trackPageView } from "@/lib/analytics-unified";
import { SERVICE_KEYWORDS } from "@/lib/seo-advanced";

interface AdvancedSEOProviderProps {
  children: React.ReactNode;
  structuredData?: string;
  breadcrumbs?: Array<{ name: string; url: string }>;
  faq?: Array<{ question: string; answer: string }>;
}

function AdvancedSEOProviderInner({
  children,
  structuredData,
  breadcrumbs,
  faq,
}: AdvancedSEOProviderProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Track page view for analytics
    const url = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : "");
    trackPageView(url);

    // Update page title for better UX
    const updatePageTitle = () => {
      const currentTitle = document.title;
      if (!currentTitle.includes("STARK")) {
        document.title = `${currentTitle} | STARK Solutions`;
      }
    };

    updatePageTitle();

    // Add structured data to page
    if (structuredData) {
      const existingScript = document.getElementById("structured-data");
      if (existingScript) {
        existingScript.remove();
      }

      const script = document.createElement("script");
      script.id = "structured-data";
      script.type = "application/ld+json";
      script.textContent = structuredData;
      document.head.appendChild(script);
    }

    // Add breadcrumb structured data
    if (breadcrumbs && breadcrumbs.length > 0) {
      const existingBreadcrumb = document.getElementById("breadcrumb-structured-data");
      if (existingBreadcrumb) {
        existingBreadcrumb.remove();
      }

      const breadcrumbData = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbs.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: `${process.env.NEXT_PUBLIC_SITE_URL}${item.url}`,
        })),
      };

      const script = document.createElement("script");
      script.id = "breadcrumb-structured-data";
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(breadcrumbData);
      document.head.appendChild(script);
    }

    // Add FAQ structured data
    if (faq && faq.length > 0) {
      const existingFAQ = document.getElementById("faq-structured-data");
      if (existingFAQ) {
        existingFAQ.remove();
      }

      const faqData = {
        "@context": "https://schema.org",
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

      const script = document.createElement("script");
      script.id = "faq-structured-data";
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(faqData);
      document.head.appendChild(script);
    }

    // Preload critical resources
    const preloadCriticalResources = () => {
      const criticalResources = [
        { href: "/fonts/inter.woff2", as: "font", type: "font/woff2", crossOrigin: "anonymous" },
        { href: "/icons/icon.svg", as: "image", type: "image/svg+xml" },
      ];

      criticalResources.forEach((resource) => {
        const link = document.createElement("link");
        link.rel = "preload";
        link.href = resource.href;
        link.as = resource.as;
        if (resource.type) link.type = resource.type;
        if (resource.crossOrigin) link.crossOrigin = resource.crossOrigin;
        document.head.appendChild(link);
      });
    };

    preloadCriticalResources();

    // Add performance hints
    const addPerformanceHints = () => {
      // DNS prefetch for external domains
      const externalDomains = [
        "https://www.google-analytics.com",
        "https://www.googletagmanager.com",
        "https://app.chatwoot.com",
        "https://fonts.googleapis.com",
      ];

      externalDomains.forEach((domain) => {
        const link = document.createElement("link");
        link.rel = "dns-prefetch";
        link.href = domain;
        document.head.appendChild(link);
      });

      // Preconnect to critical external resources
      const preconnectDomains = [
        "https://fonts.gstatic.com",
        "https://www.google-analytics.com",
      ];

      preconnectDomains.forEach((domain) => {
        const link = document.createElement("link");
        link.rel = "preconnect";
        link.href = domain;
        link.crossOrigin = "anonymous";
        document.head.appendChild(link);
      });
    };

    addPerformanceHints();

    // Add meta tags for social sharing
    const addSocialMetaTags = () => {
      const metaTags = [
        { property: "og:locale", content: "pt_BR" },
        { property: "og:site_name", content: "STARK Solutions" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:site", content: "@starksolutions" },
        { name: "twitter:creator", content: "@starksolutions" },
      ];

      metaTags.forEach((tag) => {
        const existingMeta = document.querySelector(`meta[${tag.property ? 'property' : 'name'}="${tag.property || tag.name}"]`);
        if (!existingMeta) {
          const meta = document.createElement("meta");
          if (tag.property) {
            meta.setAttribute("property", tag.property);
          } else {
            meta.setAttribute("name", tag.name || '');
          }
          meta.setAttribute("content", tag.content);
          document.head.appendChild(meta);
        }
      });
    };

    addSocialMetaTags();

    // Cleanup function
    return () => {
      const elementsToRemove = [
        "structured-data",
        "breadcrumb-structured-data",
        "faq-structured-data",
      ];

      elementsToRemove.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
          element.remove();
        }
      });
    };
  }, [pathname, searchParams, structuredData, breadcrumbs, faq]);

  return <>{children}</>;
}

// Componente para breadcrumbs visuais
interface BreadcrumbProps {
  items: Array<{ name: string; url: string }>;
}

export function SEOBreadcrumb({ items }: BreadcrumbProps) {
  if (!items || items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex items-center space-x-2 text-sm text-gray-500">
        <li>
          <a href="/" className="hover:text-cyan-400 transition-colors">
            Home
          </a>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center space-x-2">
            <span className="text-gray-400">/</span>
            {index === items.length - 1 ? (
              <span className="text-white font-medium">{item.name}</span>
            ) : (
              <a
                href={item.url}
                className="hover:text-cyan-400 transition-colors"
              >
                {item.name}
              </a>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

// Componente para FAQ SEO
interface FAQProps {
  faqs: Array<{ question: string; answer: string }>;
}

export function SEOFAQ({ faqs }: FAQProps) {
  if (!faqs || faqs.length === 0) return null;

  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold text-white mb-6">Perguntas Frequentes</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white/5 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-2">
              {faq.question}
            </h3>
            <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// Hook para SEO dinâmico
export function useSEO() {
  const pathname = usePathname();

  const getPageSEO = (page: string) => {
    const seoData = {
      "/suporte-tecnico": {
        title: "Suporte Técnico Especializado",
        description: "Suporte técnico profissional para empresas. Manutenção, help desk, suporte remoto e assistência técnica especializada em São Paulo.",
        keywords: SERVICE_KEYWORDS["suporte-tecnico"],
        breadcrumbs: [
          { name: "Serviços", url: "/services" },
          { name: "Suporte Técnico", url: "/suporte-tecnico" },
        ],
      },
      "/consultoria-tecnologica": {
        title: "Consultoria Tecnológica Estratégica",
        description: "Consultoria em tecnologia da informação para transformação digital. Planejamento estratégico, auditoria TI e governança tecnológica.",
        keywords: SERVICE_KEYWORDS["consultoria-tecnologica"],
        breadcrumbs: [
          { name: "Serviços", url: "/services" },
          { name: "Consultoria Tecnológica", url: "/consultoria-tecnologica" },
        ],
      },
      "/cloud-vps-linux": {
        title: "Servidores Cloud e VPS Linux",
        description: "Hospedagem cloud, servidores VPS Linux e infraestrutura de nuvem. Migração, backup e gerenciamento de servidores.",
        keywords: SERVICE_KEYWORDS["cloud-vps-linux"],
        breadcrumbs: [
          { name: "Serviços", url: "/services" },
          { name: "Cloud VPS Linux", url: "/cloud-vps-linux" },
        ],
      },
      "/governance": {
        title: "Governança de TI e Gestão de Processos",
        description: "Implementação de governança de TI, framework ITIL, gestão de processos e compliance tecnológico para empresas.",
        keywords: SERVICE_KEYWORDS["governance"],
        breadcrumbs: [
          { name: "Serviços", url: "/services" },
          { name: "Governança de TI", url: "/governance" },
        ],
      },
      "/cyberseguranca": {
        title: "Cybersegurança e Proteção de Dados",
        description: "Segurança da informação, proteção de dados, compliance LGPD, firewall e treinamento em cybersegurança.",
        keywords: SERVICE_KEYWORDS["cyberseguranca"],
        breadcrumbs: [
          { name: "Serviços", url: "/services" },
          { name: "Cybersegurança", url: "/cyberseguranca" },
        ],
      },
      "/create-site": {
        title: "Criação de Sites e Desenvolvimento Web",
        description: "Desenvolvimento de sites responsivos, e-commerce, aplicações web e design digital. Criação de sites profissionais.",
        keywords: SERVICE_KEYWORDS["create-site"],
        breadcrumbs: [
          { name: "Serviços", url: "/services" },
          { name: "Criação de Sites", url: "/create-site" },
        ],
      },
    };

    return seoData[page as keyof typeof seoData] || null;
  };

  return {
    getPageSEO,
    currentPath: pathname,
  };
}

// Wrapper com Suspense para resolver o problema do useSearchParams
export function AdvancedSEOProvider(props: AdvancedSEOProviderProps) {
  return (
    <Suspense fallback={<div>{props.children}</div>}>
      <AdvancedSEOProviderInner {...props} />
    </Suspense>
  );
}
