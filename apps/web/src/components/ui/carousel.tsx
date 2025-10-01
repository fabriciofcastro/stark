// components/ui/carousel.jsx
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

type CarouselItem = {
  title: string;
  description: string;
  tags: string[];
  image: string;
};

type CarouselProps = {
  items: CarouselItem[];
  className?: string;
  onServiceClick?: (serviceName: string) => void;
};

const Carousel = ({ items, className = "", onServiceClick }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    // Verificar preferência do usuário por animações reduzidas
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setIsAutoPlaying(false);
      return;
    }

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [items.length, isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + items.length) % items.length,
    );
    setIsAutoPlaying(false);
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-md border border-white/20",
        className,
      )}
      role="region"
      aria-roledescription="carousel"
      aria-label="Carrossel de serviços"
    >
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        role="listbox"
        aria-atomic="false"
        aria-live={isAutoPlaying ? "off" : "polite"}
      >
        {items.map((item, index) => (
          <div 
            key={item.title} 
            className="w-full flex-shrink-0"
            role="option"
            aria-selected={index === currentIndex}
            aria-label={`Slide ${index + 1} de ${items.length}: ${item.title}`}
          >
            <div className="p-8 md:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 mb-6">{item.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {item.tags.map((tag) => (
                      <span
                        key={`${item.title}-${tag}`}
                        className="px-3 py-1 bg-[hsl(var(--brand-gold-500))]/15 text-[hsl(var(--brand-gold-500))] rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Button
                    variant="primary"
                    onClick={() => {
                      if (typeof onServiceClick === "function") {
                        onServiceClick(
                          items[currentIndex]?.title ?? item.title,
                        );
                      }
                    }}
                  >
                    Saiba Mais
                  </Button>
                </div>
                <div className="relative">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={1200}
                    height={800}
                    unoptimized
                    priority={index === currentIndex}
                    className="rounded-xl w-full h-auto shadow-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 z-10 w-14 h-14 sm:w-12 sm:h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300"
        type="button"
        aria-label="Slide anterior"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            prevSlide();
          }
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <title id="prev-slide-title">Slide anterior</title>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 z-10 w-14 h-14 sm:w-12 sm:h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300"
        type="button"
        aria-label="Próximo slide"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            nextSlide();
          }
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <title id="next-slide-title">Próximo slide</title>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2" role="tablist" aria-label="Indicadores de slides">
        {items.map((item, index) => (
          <button
            key={`${item.title}-indicator`}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-[hsl(var(--brand-gold-500))]"
                : "bg-white/30"
            }`}
            type="button"
            aria-label={`Ir para slide ${index + 1}`}
            role="tab"
            aria-selected={index === currentIndex}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                goToSlide(index);
              }
            }}
          />
        ))}
      </div>
    </div>
  );
};

export { Carousel };
