import { TrabalheConoscoPageSeo } from "@/components/sections/trabalhe-conosco-page-seo";
import TrabalheConosco from "@/components/sections/trabalhe-conosco";

export const metadata = {
  title: "Trabalhe Conosco | STARK Gestão em Tecnologia",
  description: "Junte-se à nossa equipe de especialistas em tecnologia. Vagas disponíveis para desenvolvedores, especialistas em cloud, segurança e mais. Ambiente inovador e oportunidades de crescimento.",
  keywords: "trabalhe conosco, vagas, emprego, tecnologia, desenvolvedor, cloud, segurança, carreira, STARK, oportunidades",
  openGraph: {
    title: "Trabalhe Conosco | STARK Gestão em Tecnologia",
    description: "Junte-se à nossa equipe de especialistas em tecnologia. Vagas disponíveis para desenvolvedores, especialistas em cloud, segurança e mais.",
    type: "website",
  },
};

export default function TrabalheConoscoPage() {
  return (
    <>
      <TrabalheConoscoPageSeo />
      <TrabalheConosco />
    </>
  );
}
