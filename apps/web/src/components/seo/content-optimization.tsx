// components/seo/content-optimization.tsx - Otimização de Conteúdo para SEO
"use client";

import { useEffect, useState } from "react";

interface ContentOptimizationProps {
  children: React.ReactNode;
  targetKeywords?: string[];
  contentLength?: number;
}

export function ContentOptimization({
  children,
  targetKeywords = [],
  contentLength = 0,
}: ContentOptimizationProps) {
  const [seoScore, setSeoScore] = useState(0);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    const analyzeContent = () => {
      const analysis = {
        titleLength: document.title.length,
        metaDescription: document.querySelector('meta[name="description"]')?.getAttribute('content')?.length || 0,
        headings: {
          h1: document.querySelectorAll('h1').length,
          h2: document.querySelectorAll('h2').length,
          h3: document.querySelectorAll('h3').length,
        },
        images: document.querySelectorAll('img').length,
        imagesWithAlt: document.querySelectorAll('img[alt]').length,
        links: document.querySelectorAll('a[href]').length,
        internalLinks: document.querySelectorAll('a[href^="/"]').length,
        externalLinks: document.querySelectorAll('a[href^="http"]').length,
        wordCount: document.body.innerText.split(/\s+/).length,
      };

      const newSuggestions: string[] = [];
      let score = 0;

      // Title optimization
      if (analysis.titleLength >= 30 && analysis.titleLength <= 60) {
        score += 20;
      } else {
        newSuggestions.push("Otimize o título da página para ter entre 30-60 caracteres");
      }

      // Meta description optimization
      if (analysis.metaDescription >= 120 && analysis.metaDescription <= 160) {
        score += 20;
      } else {
        newSuggestions.push("Otimize a meta description para ter entre 120-160 caracteres");
      }

      // Heading structure
      if (analysis.headings.h1 === 1) {
        score += 15;
      } else {
        newSuggestions.push("Use apenas um H1 por página");
      }

      if (analysis.headings.h2 >= 2) {
        score += 10;
      } else {
        newSuggestions.push("Use pelo menos 2 H2s para estruturar o conteúdo");
      }

      // Image optimization
      if (analysis.images > 0) {
        const altPercentage = (analysis.imagesWithAlt / analysis.images) * 100;
        if (altPercentage === 100) {
          score += 15;
        } else {
          newSuggestions.push(`Adicione alt text em ${100 - altPercentage}% das imagens`);
        }
      }

      // Internal linking
      if (analysis.internalLinks >= 3) {
        score += 10;
      } else {
        newSuggestions.push("Adicione mais links internos (mínimo 3)");
      }

      // Content length
      if (analysis.wordCount >= 300) {
        score += 10;
      } else {
        newSuggestions.push("Aumente o conteúdo para pelo menos 300 palavras");
      }

      setSeoScore(score);
      setSuggestions(newSuggestions);
    };

    // Analisar conteúdo após carregamento
    setTimeout(analyzeContent, 1000);
  }, [targetKeywords, contentLength]);

  return (
    <div>
      {children}
      
      {/* SEO Score Widget (apenas em desenvolvimento) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg z-50 max-w-sm">
          <h3 className="font-bold text-gray-800 mb-2">SEO Score: {seoScore}/100</h3>
          {suggestions.length > 0 && (
            <div className="text-sm">
              <p className="font-semibold text-gray-700 mb-1">Sugestões:</p>
              <ul className="space-y-1 text-gray-600">
                {suggestions.map((suggestion, index) => (
                  <li key={index} className="text-xs">• {suggestion}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Componente para otimização de headings
interface OptimizedHeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function OptimizedHeading({
  level,
  children,
  className = "",
  id,
}: OptimizedHeadingProps) {
  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
  const headingId = id || children?.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

  return (
    <HeadingTag
      id={headingId}
      className={`${className} scroll-mt-20`}
      data-heading-level={level}
    >
      {children}
    </HeadingTag>
  );
}

// Componente para links internos otimizados
interface OptimizedLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  title?: string;
  external?: boolean;
}

export function OptimizedLink({
  href,
  children,
  className = "",
  title,
  external = false,
}: OptimizedLinkProps) {
  const isExternal = external || href.startsWith('http');
  
  return (
    <a
      href={href}
      className={`${className} ${isExternal ? 'external-link' : ''}`}
      title={title}
      {...(isExternal && {
        target: '_blank',
        rel: 'noopener noreferrer',
      })}
    >
      {children}
    </a>
  );
}

// Componente para imagens otimizadas com SEO
interface SEOOptimizedImageProps {
  src: string;
  alt: string;
  title?: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  caption?: string;
}

export function SEOOptimizedImage({
  src,
  alt,
  title,
  width,
  height,
  className = "",
  priority = false,
  caption,
}: SEOOptimizedImageProps) {
  return (
    <figure className={`${className} my-4`}>
      <img
        src={src}
        alt={alt}
        title={title}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className="w-full h-auto rounded-lg shadow-lg"
      />
      {caption && (
        <figcaption className="text-sm text-gray-600 mt-2 text-center italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

// Componente para listas otimizadas
interface OptimizedListProps {
  items: string[];
  ordered?: boolean;
  className?: string;
}

export function OptimizedList({
  items,
  ordered = false,
  className = "",
}: OptimizedListProps) {
  const ListTag = ordered ? 'ol' : 'ul';
  
  return (
    <ListTag className={`${className} space-y-2`}>
      {items.map((item, index) => (
        <li key={index} className="flex items-start space-x-2">
          <span className="text-cyan-400 mt-1">
            {ordered ? `${index + 1}.` : '•'}
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ListTag>
  );
}

// Componente para tabelas otimizadas
interface OptimizedTableProps {
  headers: string[];
  rows: string[][];
  caption?: string;
  className?: string;
}

export function OptimizedTable({
  headers,
  rows,
  caption,
  className = "",
}: OptimizedTableProps) {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full border-collapse border border-gray-300">
        {caption && (
          <caption className="text-left font-semibold mb-2">
            {caption}
          </caption>
        )}
        <thead>
          <tr className="bg-gray-100">
            {headers.map((header, index) => (
              <th
                key={index}
                className="border border-gray-300 px-4 py-2 text-left font-semibold"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-50">
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="border border-gray-300 px-4 py-2"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Hook para análise de conteúdo em tempo real
export function useContentAnalysis() {
  const [analysis, setAnalysis] = useState({
    wordCount: 0,
    readingTime: 0,
    keywordDensity: {},
    headings: [],
    links: 0,
  });

  useEffect(() => {
    const analyzeContent = () => {
      const text = document.body.innerText;
      const words = text.split(/\s+/).filter(word => word.length > 0);
      const wordCount = words.length;
      const readingTime = Math.ceil(wordCount / 200); // 200 palavras por minuto

      const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'))
        .map(heading => ({
          level: parseInt(heading.tagName[1]),
          text: heading.textContent?.trim() || '',
        }));

      const links = document.querySelectorAll('a[href]').length;

      setAnalysis({
        wordCount,
        readingTime,
        keywordDensity: {},
        headings,
        links,
      });
    };

    analyzeContent();
    
    // Re-analisar quando o conteúdo mudar
    const observer = new MutationObserver(analyzeContent);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, []);

  return analysis;
}
