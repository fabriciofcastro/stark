import CadastroCandidato from "@/components/sections/cadastro-candidato";

export const metadata = {
  title: "Cadastro de Candidato | STARK Gestão em Tecnologia",
  description: "Cadastre-se como candidato e encontre oportunidades de trabalho na STARK. Preencha seu perfil e candidate-se às vagas disponíveis.",
  keywords: "cadastro, candidato, vagas, emprego, tecnologia, STARK, oportunidades",
  openGraph: {
    title: "Cadastro de Candidato | STARK Gestão em Tecnologia",
    description: "Cadastre-se como candidato e encontre oportunidades de trabalho na STARK.",
    type: "website",
  },
};

export default function CadastroCandidatoPage() {
  return <CadastroCandidato />;
}
