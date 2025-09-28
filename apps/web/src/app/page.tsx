import Hero from "@/components/layout/hero";
import Services from "@/components/sections/services";
import TechnicalExpertise from "@/components/sections/technical-expertise";
import { TrustSection } from "@/components/sections/trust";
import CaseStudies from "@/components/sections/case-studies";
import DataGovernance from "@/components/sections/data-governance";
import About from "@/components/sections/about";
import { SectionBackground } from "@/components/ui/section-background";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* Hero Section */}
      <SectionBackground variant="hero">
        <Hero />
      </SectionBackground>

      {/* Services Section */}
      <SectionBackground variant="services">
        <div className="py-20">
          <Services />
        </div>
      </SectionBackground>

      {/* Technical Expertise Section */}
      <SectionBackground variant="expertise">
        <div className="py-20 border-y border-white/10">
          <TechnicalExpertise />
        </div>
      </SectionBackground>

      {/* Trust Section */}
      <SectionBackground variant="trust">
        <div className="py-20">
          <TrustSection />
        </div>
      </SectionBackground>

      {/* Case Studies Section */}
      <SectionBackground variant="cases">
        <div className="py-20 border-y border-white/10">
          <CaseStudies />
        </div>
      </SectionBackground>

      {/* Data Governance Section */}
      <SectionBackground variant="governance">
        <div className="py-20">
          <DataGovernance />
        </div>
      </SectionBackground>

      {/* About Section */}
      <SectionBackground variant="about">
        <div className="py-20 border-y border-white/10">
          <About />
        </div>
      </SectionBackground>
    </main>
  );
}
