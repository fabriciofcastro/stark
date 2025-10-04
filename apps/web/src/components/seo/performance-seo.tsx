// components/seo/performance-seo.tsx - Otimizações de Performance para SEO
"use client";

import { useEffect } from "react";

interface PerformanceSEOProps {
  children: React.ReactNode;
}

export function PerformanceSEO({ children }: PerformanceSEOProps) {
  useEffect(() => {
    // Preload critical resources
    const preloadCriticalResources = () => {
      const criticalResources = [
        {
          href: "/fonts/inter-var.woff2",
          as: "font",
          type: "font/woff2",
          crossOrigin: "anonymous",
        },
        {
          href: "/icons/icon.svg",
          as: "image",
          type: "image/svg+xml",
        },
        {
          href: "/images/hero-bg.jpg",
          as: "image",
          type: "image/jpeg",
        },
      ];

      criticalResources.forEach((resource) => {
        const link = document.createElement("link");
        link.rel = "preload";
        link.href = resource.href;
        link.as = resource.as;
        if (resource.type) link.type = resource.type;
        if (resource.crossOrigin) link.crossOrigin = resource.crossOrigin;
        document.head.appendChild(link);
      });
    };

    // DNS prefetch for external domains
    const addDNSPrefetch = () => {
      const externalDomains = [
        "https://www.google-analytics.com",
        "https://www.googletagmanager.com",
        "https://app.chatwoot.com",
        "https://fonts.googleapis.com",
        "https://fonts.gstatic.com",
        "https://www.google.com",
      ];

      externalDomains.forEach((domain) => {
        const link = document.createElement("link");
        link.rel = "dns-prefetch";
        link.href = domain;
        document.head.appendChild(link);
      });
    };

    // Preconnect to critical external resources
    const addPreconnect = () => {
      const preconnectDomains = [
        "https://fonts.gstatic.com",
        "https://www.google-analytics.com",
      ];

      preconnectDomains.forEach((domain) => {
        const link = document.createElement("link");
        link.rel = "preconnect";
        link.href = domain;
        link.crossOrigin = "anonymous";
        document.head.appendChild(link);
      });
    };

    // Optimize images loading
    const optimizeImageLoading = () => {
      const images = document.querySelectorAll("img");
      images.forEach((img) => {
        // Add loading="lazy" to non-critical images
        if (!img.hasAttribute("loading")) {
          img.setAttribute("loading", "lazy");
        }
        
        // Add decoding="async" for better performance
        if (!img.hasAttribute("decoding")) {
          img.setAttribute("decoding", "async");
        }
      });
    };

    // Add resource hints
    const addResourceHints = () => {
      const hints = [
        { rel: "prefetch", href: "/contact" },
        { rel: "prefetch", href: "/services" },
        { rel: "prefetch", href: "/sobre" },
      ];

      hints.forEach((hint) => {
        const link = document.createElement("link");
        link.rel = hint.rel;
        link.href = hint.href;
        document.head.appendChild(link);
      });
    };

    // Initialize optimizations
    preloadCriticalResources();
    addDNSPrefetch();
    addPreconnect();
    optimizeImageLoading();
    addResourceHints();

    // Add performance observer for Core Web Vitals
    if (typeof window !== "undefined" && "PerformanceObserver" in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          // Track LCP (Largest Contentful Paint)
          if (entry.entryType === "largest-contentful-paint") {
            console.log("LCP:", entry.startTime);
          }
          
          // Track FID (First Input Delay)
          if (entry.entryType === "first-input") {
            console.log("FID:", entry.processingStart - entry.startTime);
          }
          
          // Track CLS (Cumulative Layout Shift)
          if (entry.entryType === "layout-shift" && !entry.hadRecentInput) {
            console.log("CLS:", entry.value);
          }
        }
      });

      observer.observe({ entryTypes: ["largest-contentful-paint", "first-input", "layout-shift"] });
    }

    // Add viewport optimization
    const optimizeViewport = () => {
      const viewport = document.querySelector('meta[name="viewport"]');
      if (viewport) {
        viewport.setAttribute(
          "content",
          "width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover"
        );
      }
    };

    optimizeViewport();

    // Add service worker for caching
    const registerServiceWorker = () => {
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker
          .register("/sw.js")
          .then((registration) => {
            console.log("Service Worker registered:", registration);
          })
          .catch((error) => {
            console.log("Service Worker registration failed:", error);
          });
      }
    };

    registerServiceWorker();
  }, []);

  return <>{children}</>;
}

// Component for optimized image loading
interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className,
}: OptimizedImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      className={className}
      style={{
        contentVisibility: "auto",
        containIntrinsicSize: width && height ? `${width}px ${height}px` : undefined,
      }}
    />
  );
}

// Component for optimized video loading
interface OptimizedVideoProps {
  src: string;
  poster?: string;
  className?: string;
  autoplay?: boolean;
  muted?: boolean;
  loop?: boolean;
}

export function OptimizedVideo({
  src,
  poster,
  className,
  autoplay = false,
  muted = false,
  loop = false,
}: OptimizedVideoProps) {
  return (
    <video
      src={src}
      poster={poster}
      className={className}
      autoPlay={autoplay}
      muted={muted}
      loop={loop}
      playsInline
      preload="metadata"
      style={{
        contentVisibility: "auto",
      }}
    />
  );
}

// Hook for performance monitoring
export function usePerformanceMonitoring() {
  useEffect(() => {
    const measurePerformance = () => {
      // Measure page load time
      const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;
      if (navigation) {
        const loadTime = navigation.loadEventEnd - navigation.fetchStart;
        console.log("Page Load Time:", loadTime);
      }

      // Measure resource loading
      const resources = performance.getEntriesByType("resource");
      const slowResources = resources.filter(
        (resource) => resource.duration > 1000
      );
      
      if (slowResources.length > 0) {
        console.warn("Slow resources detected:", slowResources);
      }
    };

    // Measure performance after page load
    if (document.readyState === "complete") {
      measurePerformance();
    } else {
      window.addEventListener("load", measurePerformance);
    }

    return () => {
      window.removeEventListener("load", measurePerformance);
    };
  }, []);
}
