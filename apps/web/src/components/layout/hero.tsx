// components/layout/hero.tsx
"use client";

import { heroSlides } from "@/components/data/hero-slides";
import HeroEmbla from "@/components/ui/hero-embla";

const Hero = () => {
  return (
    <section className="relative p-0" aria-labelledby="hero-title">
      <div className="w-full">
        <HeroEmbla slides={heroSlides} />
      </div>

      {/* Decorative Elements */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 w-72 h-72 bg-gold/10 rounded-full blur-3xl -z-10"
      ></div>
      <div
        aria-hidden="true"
        className="absolute bottom-0 right-0 w-72 h-72 bg-gold/10 rounded-full blur-3xl -z-10"
      ></div>
    </section>
  );
};

export default Hero;
