/** @type {import('next').NextConfig} */
module.exports =  {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'github.com',
        port: '',
        pathname: '/Acha0203/Portfolio/blob/main/public/**',
      },
    ],
  },
};

