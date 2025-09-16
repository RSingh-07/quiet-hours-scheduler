import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ✅ ignore ESLint errors in production
  },
};

export default nextConfig;
