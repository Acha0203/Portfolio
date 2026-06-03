/**
 * @type {import('next').NextConfig}
 */
const { version } = require('./package.json');

const nextConfig = {
  basePath: '/Portfolio',
  env: {
    NEXT_PUBLIC_VERSION: version,
  },
  output: 'export',
  reactStrictMode: false,
  images: {
    unoptimized: true,
  },
  experimental: {
    scrollRestoration: false,
  },
};

module.exports = nextConfig;
