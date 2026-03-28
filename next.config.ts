import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.rawg.io",
      },
      {
        protocol: "https",
        hostname: "api.rawg.io",
      },
      {
        protocol: "https",
        hostname: "cdn.discordapp.com",
      }
    ],
  },
};

export default nextConfig;
