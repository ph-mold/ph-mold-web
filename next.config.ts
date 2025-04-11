import type { NextConfig } from "next";

const protocol =
  process.env.API_PROTOCOL === "https" ? "https" : ("http" as const);

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol,
        hostname: process.env.API_HOST_NAME as string,
        port: process.env.API_PORT,
        pathname: "/**"
      }
    ]
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            icon: true
          }
        }
      ]
    });

    return config;
  }
};

export default nextConfig;
