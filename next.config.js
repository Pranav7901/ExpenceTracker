/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // or 'export' depending on your needs
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;