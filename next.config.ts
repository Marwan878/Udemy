import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "i.ytimg.com",
      },
      {
        hostname: "placehold.co",
      },
      {
        hostname: "frontends.udemycdn.com",
      },
      {
        hostname: "s.udemycdn.com",
      },
      {
        hostname: "cms-images.udemycdn.com",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "100mb",
    },
  },
};

export default nextConfig;
