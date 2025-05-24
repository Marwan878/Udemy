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
      {
        hostname: "lwuyfctjegtncjmmnrbu.supabase.co",
      },
      {
        hostname: "img-c.udemycdn.com",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "100mb",
    },
    esmExternals: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

export default nextConfig;
