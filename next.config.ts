import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: isDev
      ? [
          {
            protocol: "http",
            hostname: "localhost",
            port: "3001",
            pathname: "/**"
          }
        ]
      : [
          {
            protocol: "https",
            hostname: "files.mycompany.com",
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
