import Hero from "@/components/layout/hero";
import Services from "@/components/sections/services";
import TechnicalExpertise from "@/components/sections/technical-expertise";
import { TrustSection } from "@/components/sections/trust";
import CaseStudies from "@/components/sections/case-studies";
import DataGovernance from "@/components/sections/data-governance";
import About from "@/components/sections/about";

export default function Home() {
  return (
    <main className="relative">
      {/* Hero Section */}
      <div className="relative z-10">
        <Hero />
      </div>

      {/* Services Section */}
      <div className="relative z-10 bg-gradient-to-b from-transparent via-brand-green-900/20 to-transparent">
        <div className="py-16">
          <Services />
        </div>
      </div>

      {/* Technical Expertise Section */}
      <div className="relative z-10 bg-gradient-to-b from-transparent to-brand-green-900/10">
        <div className="py-16 border-y border-white/5">
          <TechnicalExpertise />
        </div>
      </div>

      {/* Trust Section */}
      <div className="relative z-10 bg-gradient-to-b from-brand-green-900/10 to-transparent">
        <div className="py-16">
          <TrustSection />
        </div>
      </div>

      {/* Case Studies Section */}
      <div className="relative z-10 bg-gradient-to-b from-transparent to-brand-green-900/10">
        <div className="py-16 border-y border-white/5">
          <CaseStudies />
        </div>
      </div>

      {/* Data Governance Section */}
      <div className="relative z-10 bg-gradient-to-b from-brand-green-900/10 to-transparent">
        <div className="py-16">
          <DataGovernance />
        </div>
      </div>

      {/* About Section */}
      <div className="relative z-10 bg-gradient-to-b from-transparent to-brand-green-900/20">
        <div className="py-16 border-y border-white/5">
          <About />
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-gold-500/5 rounded-full blur-3xl opacity-50 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-cyan-500/5 rounded-full blur-3xl opacity-50 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
    </main>
  );
}
