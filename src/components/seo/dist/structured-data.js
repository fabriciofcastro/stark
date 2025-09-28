"use strict";
// src/components/seo/structured-data.tsx
exports.__esModule = true;
exports.serviceData = exports.localBusinessData = exports.breadcrumbData = exports.organizationData = exports.JsonLd = void 0;
var site_1 = require("@/lib/site");
// Organization schema data
var organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "STARK Gestão em Tecnologia",
    url: site_1.SITE_URL,
    logo: site_1.SITE_URL + "/icon.svg",
    description: "Empresa especializada em tecnologia da informação com foco em infraestrutura, segurança da informação, suporte e consultoria estratégica em Itaquaquecetuba - SP.",
    address: {
        "@type": "PostalAddress",
        streetAddress: "Av. Paulista, 1000",
        addressLocality: "Itaquaquecetuba",
        addressRegion: "SP",
        postalCode: "08575-000",
        addressCountry: "BR"
    },
    contactPoint: {
        "@type": "ContactPoint",
        telephone: "+55-11-99439-6469",
        contactType: "Suporte Técnico",
        email: "contato@starkgestao.com.br"
    },
    sameAs: [
    // Add your social media links here if applicable
    // "https://www.linkedin.com/company/...",
    // "https://twitter.com/...",
    // "https://www.facebook.com/..."
    ]
};
exports.organizationData = organizationData;
// Breadcrumb schema data
var breadcrumbData = function (pageTitle, pagePath) { return ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: site_1.SITE_URL
        },
        {
            "@type": "ListItem",
            position: 2,
            name: pageTitle,
            item: "" + site_1.SITE_URL + pagePath
        },
    ]
}); };
exports.breadcrumbData = breadcrumbData;
// Local business schema data
var localBusinessData = function (city) { return ({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "STARK Gestão em Tecnologia",
    image: site_1.SITE_URL + "/icon.svg",
    address: {
        "@type": "PostalAddress",
        streetAddress: "Av. Paulista, 1000",
        addressLocality: city,
        addressRegion: "SP",
        postalCode: "08575-000",
        addressCountry: "BR"
    },
    geo: {
        "@type": "GeoCoordinates",
        latitude: -23.483,
        longitude: -46.343
    },
    url: site_1.SITE_URL,
    telephone: "+55-11-99439-6469",
    email: "contato@starkgestao.com.br",
    openingHoursSpecification: [
        {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "09:00",
            closes: "18:00"
        },
    ],
    priceRange: "$$"
}); };
exports.localBusinessData = localBusinessData;
// Service schema data
var serviceData = function (serviceName, serviceDescription) { return ({
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: serviceName,
    provider: {
        "@type": "Organization",
        name: "STARK Gestão em Tecnologia"
    },
    description: serviceDescription,
    areaServed: {
        "@type": "Place",
        name: "Grande São Paulo"
    }
}); };
exports.serviceData = serviceData;
exports.JsonLd = function (_a) {
    var data = _a.data;
    return (React.createElement("script", { type: "application/ld+json" }, JSON.stringify(data)));
};
