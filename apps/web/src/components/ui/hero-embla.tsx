"use client";

import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "./button";
import { EnhancedButton } from "./enhanced-button";

type Slide = {
  image: string;
  title: string;
  subtitle: string;
  ctaPrimary?: { label: string; onClick: () => void };
  ctaSecondary?: { label: string; onClick: () => void };
  videoUrl?: string;
};

export default function HeroEmbla({ slides }: { slides: Slide[] }) {
  const [emblaRef, embla] = useEmblaCarousel({
    loop: true,
    duration: 18,
    align: "center",
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const total = slides.length;
  const [userPaused, setUserPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const lastRef = useRef<number>(0);
  const elapsedRef = useRef<number>(0);
  const [parallaxY, setParallaxY] = useState(0);

  const scrollPrev = useCallback(() => embla?.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla?.scrollNext(), [embla]);

  useEffect(() => {
    if (!embla) return;
    const onSelect = () => {
      setSelectedIndex(embla.selectedScrollSnap());
      // reinicia progresso ao trocar de slide
      elapsedRef.current = 0;
      setProgress(0);
    };
    embla.on("select", onSelect);
    onSelect();

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf: number | null = null;
    const AUTOPLAY_MS = 6000;

    const tick = (now: number) => {
      if (!lastRef.current) lastRef.current = now;
      const delta = now - lastRef.current;
      lastRef.current = now;

      if (!userPaused && !media.matches) {
        elapsedRef.current += delta;
        const ratio = Math.min(1, elapsedRef.current / AUTOPLAY_MS);
        setProgress(ratio);
        if (elapsedRef.current >= AUTOPLAY_MS) {
          embla.scrollNext();
          elapsedRef.current = 0;
          setProgress(0);
        }
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    const root = embla.rootNode();
    const stop = () => setUserPaused(true);
    const start = () => setUserPaused(false);
    root.addEventListener("mouseenter", stop);
    root.addEventListener("mouseleave", start);

    const onVisibility = () => {
      if (document.hidden) setUserPaused(true);
      else setUserPaused(false);
    };
    document.addEventListener("visibilitychange", onVisibility);

    // Parallax sutil no eixo Y (respeita reduced-motion)
    const onScroll = () => {
      if (media.matches) {
        setParallaxY(0);
        return;
      }
      const p = embla.scrollProgress();
      const frac = p - Math.floor(p);
      setParallaxY((frac - 0.5) * 10); // ~±5px
    };
    embla.on("scroll", onScroll);
    onScroll();

    return () => {
      if (raf) cancelAnimationFrame(raf);
      root.removeEventListener("mouseenter", stop);
      root.removeEventListener("mouseleave", start);
      document.removeEventListener("visibilitychange", onVisibility);
      embla.off("select", onSelect);
      embla.off("scroll", onScroll);
    };
  }, [embla, userPaused]);

  // Prefetch da próxima imagem para troca suave
  useEffect(() => {
    if (typeof window === "undefined") return;
    const next = (selectedIndex + 1) % total;
    const url = slides[next]?.image;
    if (!url) return;
    const img = new window.Image();
    img.src = url;
  }, [selectedIndex, total, slides]);

  return (
    <section
      className="relative w-full"
      aria-label="Destaques do site"
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") scrollPrev();
        if (e.key === "ArrowRight") scrollNext();
      }}
    >
      <div className="overflow-hidden rounded-none border-0" ref={emblaRef}>
        <div className="flex touch-pan-y">
          {slides.map((s, idx) => (
            <div className="min-w-0 flex-[0_0_100%]" key={`${s.title}-${idx}`}>
              <div className="relative w-full h-[65svh] md:h-[72svh] lg:h-[78svh] xl:h-[82svh] min-h-[520px] max-h-[820px]">
                <div
                  className="absolute inset-0 will-change-transform"
                  style={{ transform: `translateY(${parallaxY}px)` }}
                  aria-hidden="true"
                >
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    sizes="100vw"
                    className="object-cover"
                    style={{
                      objectPosition:
                        (s as unknown as { objectPosition?: string })
                          .objectPosition || "50% 50%",
                    }}
                    priority={idx === 0}
                    unoptimized
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/30 to-transparent" />
                <div className="absolute inset-0 flex items-center px-6 md:px-10 pl-16 pr-16 md:pl-24 md:pr-24 pb-16 md:pb-20">
                  <div className="max-w-3xl">
                    <div className="h-0.5 w-16 mb-5 bg-secondary-500" />
                    <h2
                      className="mb-5 text-[clamp(32px,5.5vw,64px)] font-black tracking-tight leading-tight text-white"
                      style={{
                        textShadow:
                          "0 2px 16px rgba(0,0,0,0.55), 0 0 2px rgba(0,0,0,0.8)",
                      }}
                    >
                      {s.title}
                    </h2>
                    <p className="mb-10 max-w-[44ch] text-[clamp(14px,1.4vw,20px)] leading-relaxed text-white/90">
                      {s.subtitle}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      {s.ctaPrimary && (
                        <EnhancedButton
                          variant="primary"
                          effect="border-animated"
                          className="shadow-lg shadow-black/30 hover:translate-y-[0.5px] transition-transform focus-visible:ring-2 focus-visible:ring-secondary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black/20"
                          onClick={s.ctaPrimary.onClick}
                        >
                          {s.ctaPrimary.label}
                        </EnhancedButton>
                      )}
                      {s.ctaSecondary && (
                        <EnhancedButton
                          variant="outline"
                          effect="shimmer"
                          className="hover:bg-white/10 text-white border-white/20 transition"
                          onClick={s.ctaSecondary.onClick}
                        >
                          {s.ctaSecondary.label}
                        </EnhancedButton>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Controls cluster at bottom */}
      <div className="absolute inset-x-0 bottom-0 z-40 px-4 md:px-6 pb-4 md:pb-6 pointer-events-none">
        <div className="grid grid-cols-3 items-end gap-3">
          <div className="flex justify-start">
                          <EnhancedButton
                type="button"
                aria-label="Slide anterior"
                variant="secondary"
                size="sm"
                effect="glow"
                className="pointer-events-auto rounded-full border border-white/30 bg-white/10 p-3 text-white hover:text-secondary-500 hover:bg-white/20 hover:border-white/50 cursor-pointer"
                onClick={scrollPrev}
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </EnhancedButton>
          </div>
          <div className="flex justify-center">
                          <EnhancedButton
                type="button"
                aria-label={userPaused ? "Reproduzir" : "Pausar"}
                variant="secondary"
                size="sm"
                effect="pulse"
                className="pointer-events-auto rounded-full border border-white/30 bg-white/10 px-3 py-1.5 text-xs text-white/90 hover:bg-white/20"
                onClick={() => setUserPaused((p) => !p)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setUserPaused((p) => !p);
                  }
                }}
              >
                {userPaused ? "▶" : "⏸"}
              </EnhancedButton>
          </div>
          <div className="flex justify-end">
                          <EnhancedButton
                type="button"
                aria-label="Próximo slide"
                variant="secondary"
                size="sm"
                effect="glow"
                className="pointer-events-auto rounded-full border border-white/30 bg-white/10 p-3 text-white hover:text-secondary-500 hover:bg-white/20 hover:border-white/50 cursor-pointer"
                onClick={scrollNext}
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </EnhancedButton>
          </div>
        </div>
        <div className="mt-3">
          <div className="mb-1.5 text-center text-xs text-white/80">
            {selectedIndex + 1}/{total}
          </div>
            <div className="group relative mx-auto h-1.5 w-[min(560px,80%)] overflow-hidden rounded-full bg-white/20 border border-white/25 hover:border-secondary-500/40 backdrop-blur-[1px] transition-colors">
            <div
              className="absolute inset-y-0 left-0 rounded-full shadow-[0_0_12px_rgba(212,160,23,0.45)] group-hover:shadow-[0_0_16px_rgba(212,160,23,0.6)] transition-[width] duration-150 linear"
              style={{
                width: `${Math.round(progress * 100)}%`,
                background:
                  "linear-gradient(90deg, hsl(var(--secondary-500)), hsl(var(--secondary-500)))",
              }}
              aria-hidden="true"
            >
              <div
                className="absolute inset-0 pointer-events-none rounded-full"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.45), rgba(255,255,255,0.15) 45%, rgba(0,0,0,0.06))",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
