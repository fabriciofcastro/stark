"use client";

import Head from "next/head";

export const TrabalheConoscoPageSeo = () => {
  return (
    <Head>
      <title>Trabalhe Conosco | STARK Gestão em Tecnologia</title>
      <meta name="description" content="Junte-se à nossa equipe de especialistas em tecnologia. Vagas disponíveis para desenvolvedores, especialistas em cloud, segurança e mais. Ambiente inovador e oportunidades de crescimento." />
      <meta name="keywords" content="trabalhe conosco, vagas, emprego, tecnologia, desenvolvedor, cloud, segurança, carreira, STARK, oportunidades" />
      
      {/* Open Graph */}
      <meta property="og:title" content="Trabalhe Conosco | STARK Gestão em Tecnologia" />
      <meta property="og:description" content="Junte-se à nossa equipe de especialistas em tecnologia. Vagas disponíveis para desenvolvedores, especialistas em cloud, segurança e mais." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://starksolutions.com.br/trabalhe-conosco" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Trabalhe Conosco | STARK Gestão em Tecnologia" />
      <meta name="twitter:description" content="Junte-se à nossa equipe de especialistas em tecnologia. Vagas disponíveis para desenvolvedores, especialistas em cloud, segurança e mais." />
      
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "JobPosting",
            "title": "Trabalhe Conosco",
            "description": "Junte-se à nossa equipe de especialistas em tecnologia. Vagas disponíveis para desenvolvedores, especialistas em cloud, segurança e mais.",
            "hiringOrganization": {
              "@type": "Organization",
              "name": "STARK Gestão em Tecnologia",
              "url": "https://starksolutions.com.br"
            },
            "jobLocation": {
              "@type": "Place",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "São Paulo",
                "addressRegion": "SP",
                "addressCountry": "BR"
              }
            },
            "employmentType": "FULL_TIME",
            "workHours": "40 horas por semana"
          })
        }}
      />
    </Head>
  );
};
