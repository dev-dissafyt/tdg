/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@tdgh/ui', '@tdgh/db', '@tdgh/types', '@tdgh/config'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
