import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: '**.vercel-storage.com' },
    ],
    unoptimized: false,
  },
  experimental: {
    mdxRs: true,
  },
  pageExtensions: ['ts', 'tsx', 'mdx'],
}

export default nextConfig
