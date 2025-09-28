"use strict";
exports.__esModule = true;
exports.heroSlides = void 0;
var gtag_1 = require("@/lib/gtag");
exports.heroSlides = [
    {
        // Infraestrutura / Data center
        image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?q=80&w=2000&auto=format&fit=crop&sat=-15",
        title: "Infra performática e segura",
        subtitle: "Kubernetes, Linux, observabilidade e hardening para sua operação.",
        ctaPrimary: {
            label: "Solicitar diagnóstico",
            onClick: function () { return gtag_1.logEvent("cta", "diagnostico_click", "hero_infra"); }
        },
        ctaSecondary: {
            label: "Ver serviços",
            onClick: function () { return gtag_1.logEvent("cta", "ver_servicos_click", "hero_infra"); }
        }
    },
    {
        // Suporte / Help Desk
        image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=2000&auto=format&fit=crop&sat=-20",
        title: "Suporte que resolve",
        subtitle: "Help Desk, governança, automação e SLAs claros para seu time.",
        ctaPrimary: {
            label: "Abrir chamado",
            onClick: function () { return gtag_1.logEvent("cta", "abrir_chamado_click", "hero_suporte"); }
        },
        ctaSecondary: {
            label: "WhatsApp",
            onClick: function () { return gtag_1.logEvent("cta", "whatsapp_click", "hero_suporte"); }
        }
    },
    {
        // Segurança / Cibersegurança
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000&auto=format&fit=crop&sat=-25",
        title: "Segurança em primeiro lugar",
        subtitle: "LGPD, NIST/ISO, backup, DR e resposta a incidentes.",
        ctaPrimary: {
            label: "Falar com especialista",
            onClick: function () { return gtag_1.logEvent("cta", "especialista_click", "hero_security"); }
        }
    },
    {
        // Nuvem / Cloud
        image: "https://images.unsplash.com/photo-1496096265110-f83ad7f96608?q=80&w=2000&auto=format&fit=crop&sat=-10",
        title: "Soluções em Nuvem",
        subtitle: "Migração, custos, HA e produtividade com segurança.",
        ctaPrimary: {
            label: "Planejar migração",
            onClick: function () { return gtag_1.logEvent("cta", "migracao_click", "hero_cloud"); }
        }
    },
    {
        // Criação de sites / Web
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2000&auto=format&fit=crop&sat=-10",
        title: "Criação de Sites",
        subtitle: "SEO técnico, performance e conversão orientados a resultados.",
        ctaPrimary: {
            label: "Ver portfólio",
            onClick: function () { return gtag_1.logEvent("cta", "portfolio_click", "hero_sites"); }
        }
    },
];
