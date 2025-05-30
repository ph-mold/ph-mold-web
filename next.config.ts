import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    loader: "custom"
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
