import { JsonLd } from "@/components/seo/structured-data";

const teamData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "STARK Gestão em Tecnologia",
  "description": "Equipe de especialistas em tecnologia, infraestrutura e segurança da informação",
  "url": "https://starkgestao.com.br/equipe",
  "logo": "https://starkgestao.com.br/icon.svg",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Av. Paulista, 1000",
    "addressLocality": "Itaquaquecetuba",
    "addressRegion": "SP",
    "postalCode": "08575-000",
    "addressCountry": "BR"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+55-11-99439-6469",
    "contactType": "Suporte Técnico",
    "email": "contato@starkgestao.com.br"
  },
  "employee": [
    {
      "@type": "Person",
      "name": "Fernando Silva",
      "jobTitle": "CEO & Fundador",
      "description": "Especialista em estratégia tecnológica e liderança de equipes",
      "url": "https://starkgestao.com.br/equipe"
    },
    {
      "@type": "Person", 
      "name": "Maria Santos",
      "jobTitle": "CTO",
      "description": "Especialista em arquitetura de sistemas e infraestrutura",
      "url": "https://starkgestao.com.br/equipe"
    },
    {
      "@type": "Person",
      "name": "João Oliveira",
      "jobTitle": "Especialista em Segurança",
      "description": "Analista de segurança da informação e compliance",
      "url": "https://starkgestao.com.br/equipe"
    }
  ]
};

export const TeamPageSeo = () => {
  return (
    <>
      <JsonLd data={teamData} />
    </>
  );
};
