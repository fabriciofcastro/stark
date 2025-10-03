/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  outputFileTracingRoot: '../../',
  trailingSlash: false,
  async rewrites() {
    return [
      {
        source: '/politica-de-privacidade',
        destination: '/politica-privacidade',
      },
      {
        source: '/termos-de-uso',
        destination: '/termos-uso',
      },
      {
        source: '/politica-de-cookies',
        destination: '/politica-cookies',
      },
    ];
  },
};

module.exports = nextConfig;