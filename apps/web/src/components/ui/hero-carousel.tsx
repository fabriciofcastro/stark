"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Button } from "./button";

export type Slide = {
  image: string;
  title: string;
  subtitle: string;
  ctaPrimary?: { label: string; onClick: () => void };
  ctaSecondary?: { label: string; onClick: () => void };
};

type HeroCarouselProps = {
  slides: Slide[];
  intervalMs?: number;
  className?: string;
  mode?: "background" | "split";
  parallax?: boolean;
  parallaxStrength?: number; // pixels of max translate on image
};

export function HeroCarousel({
  slides,
  intervalMs = 6000,
  className,
  mode = "background",
  parallax = false,
  parallaxStrength = 40,
}: HeroCarouselProps) {
  const [index, setIndex] = useState(0);
  const [auto, setAuto] = useState(true);
  const imgRef = useRef<HTMLDivElement | null>(null);
  const [imgOffsetY, setImgOffsetY] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!auto) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % slides.length),
      intervalMs,
    );
    return () => clearInterval(id);
  }, [auto, slides.length, intervalMs]);

  const go = (i: number) => {
    setIndex((prev) => {
      const next = (i + slides.length) % slides.length;
      return next === prev ? prev : next;
    });
    setAuto(false);
  };

  const current = slides[index];

  useEffect(() => {
    if (mode !== "split" || !parallax) return;
    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const el = imgRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const viewportH = window.innerHeight || 1;
        const center = rect.top + rect.height / 2;
        const delta = (center - viewportH / 2) / viewportH;
        const translate = Math.max(
          -parallaxStrength,
          Math.min(parallaxStrength, -delta * parallaxStrength * 2),
        );
        setImgOffsetY(translate);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [mode, parallax, parallaxStrength]);

  if (mode === "split") {
    return (
      <section aria-label="Destaques do site" className={className} role="region" aria-roledescription="carousel">
        <div className="grid w-full grid-cols-1 items-center gap-8 md:grid-cols-2">
          {/* Left: Content */}
          <div className="order-2 md:order-1 px-4 md:px-0">
            <div className="max-w-2xl">
              <div className="h-0.5 w-16 mb-4 bg-[hsl(var(--brand-gold-500))]" />
              <h2 className="mb-3 text-3xl md:text-5xl font-extrabold text-white">
                {current.title}
              </h2>
              <p className="mb-6 text-base md:text-xl text-gray-100/95">
                {current.subtitle}
              </p>
              <div className="flex flex-col items-start gap-3 sm:flex-row sm:gap-4">
                {current.ctaPrimary && (
                  <Button
                    type="button"
                    variant="primary"
                    className="btn-shimmer"
                    onClick={current.ctaPrimary.onClick}
                  >
                    {current.ctaPrimary.label}
                  </Button>
                )}
                {current.ctaSecondary && (
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={current.ctaSecondary.onClick}
                  >
                    {current.ctaSecondary.label}
                  </Button>
                )}
              </div>
            </div>
          </div>
          {/* Right: Image */}
          <div className="order-1 md:order-2 px-4 md:px-0">
            <div
              ref={imgRef}
              className="relative w-full h-[38vh] min-h-[320px] md:h-[62vh] md:min-h-[520px] rounded-2xl overflow-hidden border border-white/20 bg-white/5 backdrop-blur-md will-change-transform"
              style={
                parallax
                  ? { transform: `translateY(${imgOffsetY}px)` }
                  : undefined
              }
            >
              <Image
                src={current.image}
                alt={current.title}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
                priority
                unoptimized
              />
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
          </div>
        </div>
        {/* Controls */}
        <div className="mt-6 flex items-center justify-center gap-6" role="toolbar" aria-label="Controles do carrossel">
          <button
            type="button"
            aria-label="Slide anterior"
            className="rounded-full bg-white/10 p-3 backdrop-blur-md hover:bg-white/20"
            onClick={() => go(index - 1)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                go(index - 1);
              }
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              role="img"
              aria-labelledby="hero-prev-title"
              aria-hidden="true"
            >
              <title id="hero-prev-title">Anterior</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <div className="flex gap-3" role="tablist" aria-label="Indicadores de slides">
            {slides.map((s, i) => (
              <button
                key={`${s.title}-${i}`}
                aria-label={`Ir para slide ${i + 1}`}
                className={`transition-all ${
                  i === index
                    ? "h-1.5 w-5 rounded-full bg-[hsl(var(--brand-gold-500))] shadow-[0_0_0_2px_rgba(0,0,0,0.25)]"
                    : "h-1.5 w-1.5 rounded-full bg-white/40"
                }`}
                onClick={() => go(i)}
                type="button"
                role="tab"
                aria-selected={i === index}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    go(i);
                  }
                }}
              />
            ))}
          </div>
          <button
            type="button"
            aria-label="Próximo slide"
            className="rounded-full bg-white/10 p-3 backdrop-blur-md hover:bg-white/20"
            onClick={() => go(index + 1)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                go(index + 1);
              }
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              role="img"
              aria-labelledby="hero-next-title"
              aria-hidden="true"
            >
              <title id="hero-next-title">Próximo</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </section>
    );
  }

  return (
    <section
      className={
        className ??
        "relative overflow-hidden rounded-2xl border border-white/20 bg-white/5 backdrop-blur-md"
      }
      aria-label="Destaques do site"
      role="region"
      aria-roledescription="carousel"
      onMouseEnter={() => setAuto(false)}
      onMouseLeave={() => setAuto(true)}
    >
      {/* debug overlay removido */}
      <div className="relative h-[60vh] md:h-[72vh] min-h-[420px] md:min-h-[560px] w-full">
        {/* Background image */}
        <Image
          src={current.image}
          alt={current.title}
          fill
          sizes="100vw"
          className="object-cover"
          priority
          unoptimized
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/55 to-black/30" />
        {/* Content */}
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <div className="max-w-4xl w-full text-center md:text-left md:px-6 py-8 rounded-xl bg-black/35 backdrop-blur-sm border border-white/15 animate-fade-in-up">
            <div className="h-0.5 w-16 mx-auto md:mx-0 mb-4 bg-[hsl(var(--brand-gold-500))]" />
            <h2 className="mb-3 text-3xl md:text-6xl font-extrabold text-white drop-shadow">
              {current.title}
            </h2>
            <p className="mx-auto md:mx-0 mb-8 max-w-3xl text-base md:text-xl text-gray-100/95">
              {current.subtitle}
            </p>
            <div className="flex flex-col items-center md:items-start justify-center gap-3 sm:flex-row sm:gap-4">
              {current.ctaPrimary && (
                <Button
                  type="button"
                  variant="primary"
                  className="btn-shimmer"
                  onClick={current.ctaPrimary.onClick}
                >
                  {current.ctaPrimary.label}
                </Button>
              )}
              {current.ctaSecondary && (
                <Button
                  type="button"
                  variant="secondary"
                  onClick={current.ctaSecondary.onClick}
                >
                  {current.ctaSecondary.label}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <button
        type="button"
        aria-label="Slide anterior"
        className="absolute left-2 md:left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 backdrop-blur-md hover:bg-white/20"
        onClick={() => go(index - 1)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            go(index - 1);
          }
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          role="img"
          aria-labelledby="hero-prev-title"
          aria-hidden="true"
        >
          <title id="hero-prev-title">Anterior</title>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <button
        type="button"
        aria-label="Próximo slide"
        className="absolute right-2 md:right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 backdrop-blur-md hover:bg-white/20"
        onClick={() => go(index + 1)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            go(index + 1);
          }
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          role="img"
          aria-labelledby="hero-next-title"
          aria-hidden="true"
        >
          <title id="hero-next-title">Próximo</title>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Indicators */}
      <div className="absolute bottom-3 left-1/2 z-10 -translate-x-1/2 w-full max-w-4xl px-6">
        <div className="flex justify-center gap-3" role="tablist" aria-label="Indicadores de slides">
          {slides.map((s, i) => (
            <button
              key={`${s.title}-${i}`}
              aria-label={`Ir para slide ${i + 1}`}
              className={`transition-all ${
                i === index
                  ? "h-1.5 w-5 rounded-full bg-[hsl(var(--brand-gold-500))] shadow-[0_0_0_2px_rgba(0,0,0,0.25)]"
                  : "h-1.5 w-1.5 rounded-full bg-white/40"
              }`}
              onClick={() => go(i)}
              type="button"
              role="tab"
              aria-selected={i === index}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  go(i);
                }
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default HeroCarousel;
