import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
export const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  basePath: '/photo-browser-app',
  images: {
    unoptimized: true,
  },
};

export default withBundleAnalyzer({
  ...nextConfig,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['via.placeholder.com'],
  },
});
