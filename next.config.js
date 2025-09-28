// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["placehold.co"],
  },
  serverExternalPackages: ["@vercel/analytics", "@vercel/speed-insights"],
  outputFileTracingRoot: __dirname,
  async redirects() {
    return [
      {
        source: "/contato",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/contato/",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/contato/:path*",
        destination: "/contact",
        permanent: true,
      },
    ];
  },
  async headers() {
    const isDev = process.env.NODE_ENV !== "production";
    const chatwoot = process.env.NEXT_PUBLIC_CHATWOOT_BASE_URL;
    const scriptSrc = [
      "'self'",
      "https://www.googletagmanager.com",
      "https://www.google-analytics.com",
      "https://va.vercel-scripts.com",
    ];
    if (chatwoot) scriptSrc.push(chatwoot);
    if (isDev) scriptSrc.push("'unsafe-inline'", "'unsafe-eval'");

    const styleSrc = ["'self'", "https:"];
    if (isDev) styleSrc.push("'unsafe-inline'");

    const connectSrc = [
      "'self'",
      "https:",
      "wss:",
      "https://www.google-analytics.com",
      "https://vitals.vercel-insights.com",
    ];
    if (chatwoot) connectSrc.push(chatwoot);

    const frameSrc = ["'self'"];
    if (chatwoot) frameSrc.push(chatwoot);

    const csp = [
      "default-src 'self'",
      "base-uri 'self'",
      "font-src 'self' https: data:",
      "img-src 'self' https: data: blob:",
      "object-src 'none'",
      `script-src ${scriptSrc.join(" ")}`,
      `style-src ${styleSrc.join(" ")}`,
      `connect-src ${connectSrc.join(" ")}`,
      `frame-src ${frameSrc.join(" ")}`,
      "frame-ancestors 'none'",
      "form-action 'self'",
      "upgrade-insecure-requests",
    ].join("; ");

    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
          { key: "X-DNS-Prefetch-Control", value: "off" },
          { key: "Origin-Agent-Cluster", value: "?1" },
          { key: "X-Permitted-Cross-Domain-Policies", value: "none" },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
