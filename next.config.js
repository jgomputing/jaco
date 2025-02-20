/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com'],
    unoptimized: process.env.NODE_ENV === 'development',
  },
  experimental: {
    optimizeCss: true,
  },
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig 