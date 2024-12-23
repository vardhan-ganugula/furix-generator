import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // Enables strict mode for React
  swcMinify: true,       // Enables SWC for faster builds
  
  eslint: {
    ignoreDuringBuilds: true, // Ignores ESLint errors during builds
  },

};

export default nextConfig;
