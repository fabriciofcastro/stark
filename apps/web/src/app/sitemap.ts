// app/sitemap.ts - Sitemap Dinâmico e Otimizado
import { MetadataRoute } from "next";
import { generateSitemapData } from "@/lib/seo-advanced";

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemapData = generateSitemapData();

  return sitemapData.map((item) => ({
    url: item.url,
    lastModified: new Date(item.lastModified),
    changeFrequency: item.changeFrequency,
    priority: item.priority,
  }));
}