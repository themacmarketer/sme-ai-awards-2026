import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/sme-ai',
  // output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
  // Pin the tracing root: a lockfile in the home directory otherwise wins inference.
  outputFileTracingRoot: __dirname,
  // Allow a throwaway build directory when the default one is locked by the host sandbox.
  distDir: process.env.NEXT_DIST_DIR || '.next',
  async redirects() {
    return [
      {
        source: '/',
        destination: '/sme-ai',
        basePath: false,
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
