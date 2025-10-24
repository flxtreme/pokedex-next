import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',
  basePath: '/pokedex-next',
  assetPrefix: '/pokedex-next/',
  images: {
    unoptimized: true
  }
};

export default nextConfig;
