import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // enable static export

  basePath: "/portfolio",

  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },

  images: {
    unoptimized: true // static export incompatible with image optimization
  },
};

export default nextConfig;
