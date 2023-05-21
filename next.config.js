/** @type {import('next').NextConfig} */

const withBundleAnalyzer =
  process.env.ANALYZE === 'true'
    ? require('@next/bundle-analyzer')({ enabled: true })
    : (config) => config;

module.exports = withBundleAnalyzer({
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
});
