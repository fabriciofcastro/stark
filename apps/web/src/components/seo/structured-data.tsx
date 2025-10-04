// src/components/seo/structured-data.tsx

import { SITE_URL } from "@/lib/site";

// Organization schema data
const organizationData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "STARK Solutions",
  url: SITE_URL,
  logo: `${SITE_URL}/icon.svg`,
  description:
    "Empresa especializada em tecnologia da informação com foco em infraestrutura, segurança da informação, suporte e consultoria estratégica em Itaquaquecetuba - SP.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Av. Paulista, 1000",
    addressLocality: "Itaquaquecetuba",
    addressRegion: "SP",
    postalCode: "08575-000",
    addressCountry: "BR",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+55-11-99439-6469",
    contactType: "Suporte Técnico",
    email: "contato@starksolutions.com.br",
  },
  sameAs: [
    // Add your social media links here if applicable
    // "https://www.linkedin.com/company/...",
    // "https://twitter.com/...",
    // "https://www.facebook.com/..."
  ],
};

// Breadcrumb schema data
const breadcrumbData = (pageTitle: string, pagePath: string) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: SITE_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: pageTitle,
      item: `${SITE_URL}${pagePath}`,
    },
  ],
});

// Local business schema data
const localBusinessData = (city: string) => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "STARK Solutions",
  image: `${SITE_URL}/icon.svg`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Av. Paulista, 1000",
    addressLocality: city,
    addressRegion: "SP",
    postalCode: "08575-000",
    addressCountry: "BR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -23.483,
    longitude: -46.343,
  },
  url: SITE_URL,
  telephone: "+55-11-99439-6469",
  email: "contato@starkgestao.com.br",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],
  priceRange: "$$",
});

// Service schema data
const serviceData = (serviceName: string, serviceDescription: string) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: serviceName,
  provider: {
    "@type": "Organization",
    name: "STARK Solutions",
  },
  description: serviceDescription,
  areaServed: {
    "@type": "Place",
    name: "Grande São Paulo",
  },
});

export const JsonLd = ({ data }: { data: object }) => (
  <script type="application/ld+json">{JSON.stringify(data)}</script>
);

export { organizationData, breadcrumbData, localBusinessData, serviceData };
