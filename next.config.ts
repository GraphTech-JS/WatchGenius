import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.chrono24.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.chrono24.com',
        pathname: '/**',
      },
      

      {
        protocol: 'https',
        hostname: 'gusvillajewelry.com',
        pathname: '/**',
      },
     
    ],
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  modularizeImports: {
    'lucide-react': {
      transform: 'lucide-react/dist/esm/icons/{{kebabCase member}}',
      skipDefaultConversion: true,
    },
  },

  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
};

export default nextConfig;
