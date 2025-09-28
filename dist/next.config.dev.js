"use strict";

// next.config.js

/** @type {import('next').NextConfig} */
var nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["placehold.co"]
  },
  serverExternalPackages: ["@vercel/analytics", "@vercel/speed-insights"],
  outputFileTracingRoot: __dirname,
  redirects: function redirects() {
    return regeneratorRuntime.async(function redirects$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", [{
              source: "/contato",
              destination: "/contact",
              permanent: true
            }, {
              source: "/contato/",
              destination: "/contact",
              permanent: true
            }, {
              source: "/contato/:path*",
              destination: "/contact",
              permanent: true
            }]);

          case 1:
          case "end":
            return _context.stop();
        }
      }
    });
  },
  headers: function headers() {
    var isDev, chatwoot, scriptSrc, styleSrc, connectSrc, frameSrc, csp;
    return regeneratorRuntime.async(function headers$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            isDev = process.env.NODE_ENV !== "production";
            chatwoot = process.env.NEXT_PUBLIC_CHATWOOT_BASE_URL;
            scriptSrc = ["'self'", "https://www.googletagmanager.com", "https://www.google-analytics.com", "https://va.vercel-scripts.com"];
            if (chatwoot) scriptSrc.push(chatwoot);
            if (isDev) scriptSrc.push("'unsafe-inline'", "'unsafe-eval'");
            styleSrc = ["'self'", "https:"];
            if (isDev) styleSrc.push("'unsafe-inline'");
            connectSrc = ["'self'", "https:", "wss:", "https://www.google-analytics.com", "https://vitals.vercel-insights.com"];
            if (chatwoot) connectSrc.push(chatwoot);
            frameSrc = ["'self'"];
            if (chatwoot) frameSrc.push(chatwoot);
            csp = ["default-src 'self'", "base-uri 'self'", "font-src 'self' https: data:", "img-src 'self' https: data: blob:", "object-src 'none'", "script-src ".concat(scriptSrc.join(" ")), "style-src ".concat(styleSrc.join(" ")), "connect-src ".concat(connectSrc.join(" ")), "frame-src ".concat(frameSrc.join(" ")), "frame-ancestors 'none'", "form-action 'self'", "upgrade-insecure-requests"].join("; ");
            return _context2.abrupt("return", [{
              source: "/:path*",
              headers: [{
                key: "Content-Security-Policy",
                value: csp
              }, {
                key: "Strict-Transport-Security",
                value: "max-age=63072000; includeSubDomains; preload"
              }, {
                key: "X-Content-Type-Options",
                value: "nosniff"
              }, {
                key: "X-Frame-Options",
                value: "DENY"
              }, {
                key: "Referrer-Policy",
                value: "strict-origin-when-cross-origin"
              }, {
                key: "Permissions-Policy",
                value: "camera=(), microphone=(), geolocation=()"
              }, {
                key: "Cross-Origin-Opener-Policy",
                value: "same-origin"
              }, {
                key: "Cross-Origin-Resource-Policy",
                value: "same-origin"
              }, {
                key: "X-DNS-Prefetch-Control",
                value: "off"
              }, {
                key: "Origin-Agent-Cluster",
                value: "?1"
              }, {
                key: "X-Permitted-Cross-Domain-Policies",
                value: "none"
              }]
            }]);

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    });
  }
};
module.exports = nextConfig;