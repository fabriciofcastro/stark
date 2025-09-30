import Hero from "@/components/layout/hero";
import Services from "@/components/sections/services";
import TechnicalExpertise from "@/components/sections/technical-expertise";
import { TrustSection } from "@/components/sections/trust";
import CaseStudies from "@/components/sections/case-studies";
import DataGovernance from "@/components/sections/data-governance";
import About from "@/components/sections/about";
import { SectionWrapper } from "@/components/ui/section-wrapper";

export default function Home() {
  return (
		<main className="relative min-h-screen overflow-x-hidden w-full max-w-full">
      {/* Hero Section */}
      <SectionWrapper variant="hero">
        <Hero />
      </SectionWrapper>

      {/* Services Section */}
      <SectionWrapper variant="services">
        <Services />
      </SectionWrapper>

      {/* Technical Expertise Section */}
      <SectionWrapper variant="expertise">
        <TechnicalExpertise />
      </SectionWrapper>

      {/* Trust Section */}
      <SectionWrapper variant="trust">
        <TrustSection />
      </SectionWrapper>

      {/* Case Studies Section */}
      <SectionWrapper variant="cases">
        <CaseStudies />
      </SectionWrapper>

      {/* Data Governance Section */}
      <SectionWrapper variant="governance">
        <DataGovernance />
      </SectionWrapper>

      {/* About Section */}
      <SectionWrapper variant="about">
        <About />
      </SectionWrapper>
    </main>
  );
}
