import VagasSimple from "@/components/sections/vagas-simple";

export const metadata = {
  title: "Vagas Abertas | STARK Gestão em Tecnologia",
  description: "Junte-se à nossa equipe de especialistas em tecnologia. Vagas disponíveis para desenvolvedores, especialistas em cloud, segurança e mais. Ambiente inovador e oportunidades de crescimento.",
  keywords: "vagas, emprego, tecnologia, desenvolvedor, cloud, segurança, carreira, STARK, oportunidades",
  openGraph: {
    title: "Vagas Abertas | STARK Gestão em Tecnologia",
    description: "Junte-se à nossa equipe de especialistas em tecnologia. Vagas disponíveis para desenvolvedores, especialistas em cloud, segurança e mais.",
    type: "website",
  },
};

export default function VagasPage() {
  return <VagasSimple />;
}
