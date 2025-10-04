"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ImageIcon, Loader2 } from "lucide-react";
import { trackEvent } from "@/lib/analytics-unified";

interface AdvancedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
  sizes?: string;
  quality?: number;
  onLoad?: () => void;
  onError?: () => void;
  lazy?: boolean;
  aspectRatio?: string;
}

export function AdvancedImage({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
  placeholder = "empty",
  blurDataURL,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  quality = 85,
  onLoad,
  onError,
  lazy = true,
  aspectRatio = "auto"
}: AdvancedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [imageSrc, setImageSrc] = useState(priority ? src : "");
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Intersection Observer para lazy loading
  useEffect(() => {
    if (priority || isInView) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          setImageSrc(src);
          observerRef.current?.disconnect();
        }
      },
      {
        rootMargin: "50px", // Carregar 50px antes de entrar na viewport
        threshold: 0.1
      }
    );

    if (imgRef.current) {
      observerRef.current.observe(imgRef.current);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [src, priority, isInView]);

  // Otimizar URL da imagem
  const getOptimizedSrc = (originalSrc: string) => {
    // Se for uma imagem externa, usar serviço de otimização
    if (originalSrc.startsWith("http")) {
      // Aqui você pode integrar com serviços como Cloudinary, ImageKit, etc.
      return originalSrc;
    }

    // Para imagens locais, usar Next.js Image Optimization
    const params = new URLSearchParams();
    if (width) params.set("w", width.toString());
    if (height) params.set("h", height.toString());
    if (quality) params.set("q", quality.toString());
    
    return params.toString() ? `${originalSrc}?${params.toString()}` : originalSrc;
  };

  const handleLoad = () => {
    setIsLoaded(true);
    setIsError(false);
    onLoad?.();
    trackEvent("image_load", "success", alt);
  };

  const handleError = () => {
    setIsError(true);
    onError?.();
    trackEvent("image_load", "error", alt);
  };

  // Gerar placeholder SVG
  const generatePlaceholder = () => {
    const svg = `
      <svg width="${width || 400}" height="${height || 300}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#374151;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#1f2937;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#grad)"/>
        <circle cx="50%" cy="40%" r="40" fill="#6b7280" opacity="0.3"/>
        <rect x="30%" y="60%" width="40%" height="20" rx="4" fill="#6b7280" opacity="0.3"/>
      </svg>
    `;
    return `data:image/svg+xml;base64,${btoa(svg)}`;
  };

  const placeholderSrc = blurDataURL || generatePlaceholder();

  return (
    <div
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      style={{ aspectRatio }}
    >
      {/* Placeholder/Skeleton */}
      <AnimatePresence>
        {!isLoaded && !isError && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center"
          >
            {placeholder === "blur" ? (
              <img
                src={placeholderSrc}
                alt=""
                className="w-full h-full object-cover filter blur-sm"
                style={{ transform: "scale(1.1)" }}
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-gray-500">
                <Loader2 className="w-8 h-8 animate-spin mb-2" />
                <span className="text-sm">Carregando...</span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Imagem principal */}
      <AnimatePresence>
        {isInView && (
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            src={getOptimizedSrc(imageSrc)}
            alt={alt}
            width={width}
            height={height}
            sizes={sizes}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            fetchPriority={priority ? "high" : "auto"}
            onLoad={handleLoad}
            onError={handleError}
            className={`w-full h-full object-cover transition-all duration-300 ${
              isLoaded ? "scale-100" : "scale-105"
            }`}
            style={{
              willChange: "transform, opacity"
            }}
          />
        )}
      </AnimatePresence>

      {/* Estado de erro */}
      <AnimatePresence>
        {isError && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-gray-800 flex items-center justify-center"
          >
            <div className="text-center text-gray-500">
              <ImageIcon className="w-12 h-12 mx-auto mb-2" />
              <p className="text-sm">Erro ao carregar imagem</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay de loading (opcional) */}
      {isInView && !isLoaded && !isError && (
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full"
          />
        </div>
      )}
    </div>
  );
}

// Componente para galeria de imagens otimizada
export function OptimizedImageGallery({ 
  images, 
  className = "" 
}: { 
  images: Array<{ src: string; alt: string; width?: number; height?: number }>;
  className?: string;
}) {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Imagem principal */}
      <div className="relative aspect-video overflow-hidden rounded-xl">
        <AdvancedImage
          src={images[selectedImage].src}
          alt={images[selectedImage].alt}
          width={800}
          height={450}
          priority={selectedImage === 0}
          className="w-full h-full"
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.map((image, index) => (
            <motion.button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative aspect-video overflow-hidden rounded-lg transition-all duration-300 ${
                selectedImage === index 
                  ? "ring-2 ring-brand-gold-500 scale-105" 
                  : "hover:scale-105 opacity-70 hover:opacity-100"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <AdvancedImage
                src={image.src}
                alt={image.alt}
                width={200}
                height={112}
                lazy={index < 4} // Carregar primeiras 4 imediatamente
                className="w-full h-full"
              />
            </motion.button>
          ))}
        </div>
      )}
    </div>
  );
}

// Hook para otimização automática de imagens
export function useImageOptimization() {
  const optimizeImage = (src: string, options: {
    width?: number;
    height?: number;
    quality?: number;
    format?: "webp" | "avif" | "jpeg" | "png";
  } = {}) => {
    const { width, height, quality = 85, format } = options;
    
    // Implementar lógica de otimização baseada no dispositivo
    const isRetina = window.devicePixelRatio > 1;
    const finalWidth = width ? (isRetina ? width * 2 : width) : undefined;
    const finalHeight = height ? (isRetina ? height * 2 : height) : undefined;

    // Detectar suporte a formatos modernos
    const supportsWebP = document.createElement("canvas").toDataURL("image/webp").indexOf("data:image/webp") === 0;
    const supportsAVIF = document.createElement("canvas").toDataURL("image/avif").indexOf("data:image/avif") === 0;
    
    const finalFormat = format || (supportsAVIF ? "avif" : supportsWebP ? "webp" : "jpeg");

    return {
      src,
      width: finalWidth,
      height: finalHeight,
      quality,
      format: finalFormat
    };
  };

  return { optimizeImage };
}
