// app/manifest.ts - Web App Manifest Otimizado
import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://starksolutions.com.br";

  return {
    name: "STARK Solutions",
    short_name: "STARK",
    description: "Empresa especializada em tecnologia da informação com foco em infraestrutura, segurança da informação, suporte e consultoria estratégica.",
    start_url: "/",
    display: "standalone",
    background_color: "#0c1916",
    theme_color: "#06b6d4",
    orientation: "portrait-primary",
    scope: "/",
    lang: "pt-BR",
    categories: ["business", "technology", "productivity"],
    icons: [
      {
        src: "/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    screenshots: [
      {
        src: "/images/screenshot-desktop.png",
        sizes: "1280x720",
        type: "image/png",
        form_factor: "wide",
        label: "STARK Technology Desktop View",
      },
      {
        src: "/images/screenshot-mobile.png",
        sizes: "390x844",
        type: "image/png",
        form_factor: "narrow",
        label: "STARK Technology Mobile View",
      },
    ],
    shortcuts: [
      {
        name: "Contato",
        short_name: "Contato",
        description: "Entre em contato conosco",
        url: "/contact",
        icons: [
          {
            src: "/icons/shortcut-contact.png",
            sizes: "96x96",
          },
        ],
      },
      {
        name: "Serviços",
        short_name: "Serviços",
        description: "Nossos serviços",
        url: "/services",
        icons: [
          {
            src: "/icons/shortcut-services.png",
            sizes: "96x96",
          },
        ],
      },
    ],
    related_applications: [],
    prefer_related_applications: false,
  };
}