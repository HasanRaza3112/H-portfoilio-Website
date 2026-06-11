import path from "node:path";
import { fileURLToPath } from "node:url";

import type { NextConfig } from "next";

const splineReactPath = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "node_modules/@splinetool/react-spline/dist/react-spline.js",
);

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  transpilePackages: ["@splinetool/react-spline", "@splinetool/runtime"],
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@splinetool/react-spline": splineReactPath,
    };

    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
