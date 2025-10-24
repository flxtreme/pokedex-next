import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  basePath: '/pokedex-next',
  assetPrefix: '/pokedex-next/',
  images: {
    unoptimized: true
  }
};

export default nextConfig;
