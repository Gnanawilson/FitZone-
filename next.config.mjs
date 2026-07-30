/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Disables double-invocation in dev for 2x faster rendering
  experimental: {
    turbo: {},
  },
  onDemandEntries: {
    maxInactiveAge: 120 * 1000, // Keep compiled routes warm in memory for 2 minutes
    pagesBufferLength: 10,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
    ],
  },
  logging: {
    fetches: {
      fullUrl: false,
    },
  },
};

export default nextConfig;
