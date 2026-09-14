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
};

module.exports = nextConfig;
