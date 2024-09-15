/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
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
