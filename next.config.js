/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
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
