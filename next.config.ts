import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.icon-icons.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'image.mfa.go.th',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
