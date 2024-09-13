/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  distDir: 'dist',
  reactStrictMode: true,
  images: {
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
  output: 'export',
};

module.exports = nextConfig;
