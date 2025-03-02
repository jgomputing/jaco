const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
      },
    ],
    domains: [],
  },
  reactStrictMode: true,
  poweredByHeader: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  async redirects() {
    return [];
  },
  headers: async () => {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Connection',
            value: 'keep-alive'
          },
          {
            key: 'Transfer-Encoding',
            value: 'chunked'
          }
        ]
      }
    ]
  },
  webpack: (config, { dev, isServer }) => {
    // Only enable webpack caching in development
    if (dev) {
      config.cache = {
        type: 'filesystem',
        version: '1.0.0',
        buildDependencies: {
          config: [__filename]
        }
      }
    }
    return config
  },
}

module.exports = nextConfig 