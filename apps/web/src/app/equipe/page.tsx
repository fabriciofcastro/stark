import { TeamPageSeo } from "@/components/sections/team-page-seo";
import Team from "@/components/sections/team";

export const metadata = {
  title: "Nossa Equipe | STARK Gestão em Tecnologia",
  description: "Conheça nossa equipe de especialistas em tecnologia, infraestrutura e segurança da informação. Profissionais dedicados a transformar o futuro digital das empresas.",
  keywords: "equipe, especialistas, tecnologia, infraestrutura, segurança, profissionais, STARK",
  openGraph: {
    title: "Nossa Equipe | STARK Gestão em Tecnologia",
    description: "Conheça nossa equipe de especialistas em tecnologia, infraestrutura e segurança da informação.",
    type: "website",
  },
};

export default function TeamPage() {
  return (
    <>
      <TeamPageSeo />
      <Team />
    </>
  );
}
