import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ✅ ignore ESLint errors during production build
  },
  // You can keep other config options here
};

export default nextConfig;
