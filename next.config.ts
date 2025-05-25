import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',
  images: {
    remotePatterns: [

      {
        protocol: "https",
        hostname: "zgljfdg1bs.ufs.sh",
        pathname: '/f/**',
      },
      {
        protocol: "https",
        hostname: "img.clerk.com",
        pathname: '/**', // Corrected
      },
    ]
  }
};

export default nextConfig;