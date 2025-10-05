"use client";

import Head from "next/head";

export const CadastroCandidatoPageSeo = () => {
  return (
    <Head>
      <title>Cadastro de Candidato | STARK Gestão em Tecnologia</title>
      <meta name="description" content="Cadastre-se como candidato e encontre oportunidades de trabalho na STARK. Preencha seu perfil e candidate-se às vagas disponíveis." />
      <meta name="keywords" content="cadastro, candidato, vagas, emprego, tecnologia, STARK, oportunidades" />
      
      {/* Open Graph */}
      <meta property="og:title" content="Cadastro de Candidato | STARK Gestão em Tecnologia" />
      <meta property="og:description" content="Cadastre-se como candidato e encontre oportunidades de trabalho na STARK." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://starksolutions.com.br/cadastro-candidato" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Cadastro de Candidato | STARK Gestão em Tecnologia" />
      <meta name="twitter:description" content="Cadastre-se como candidato e encontre oportunidades de trabalho na STARK." />
      
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Cadastro de Candidato",
            "description": "Cadastre-se como candidato e encontre oportunidades de trabalho na STARK.",
            "url": "https://starksolutions.com.br/cadastro-candidato",
            "mainEntity": {
              "@type": "Organization",
              "name": "STARK Gestão em Tecnologia",
              "url": "https://starksolutions.com.br"
            }
          })
        }}
      />
    </Head>
  );
};
