/**
 * @type {import('next').NextConfig}
 */
const { version } = require('./package.json');

const nextConfig = {
  env: {
    NEXT_PUBLIC_VERSION: version,
  },
  output: 'export',
  reactStrictMode: false,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'acha0203.github.io',
        port: '',
        pathname: '/Portfolio/**',
      },
    ],
  },
  experimental: {
    scrollRestoration: false,
  },
};

module.exports = nextConfig;
