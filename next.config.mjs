import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
export const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  basePath: '/photo-browser-app',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/photo-browser-app' : '',
  images: {
    unoptimized: true,
    domains: ['via.placeholder.com'],
  },
};

export default withBundleAnalyzer({
  ...nextConfig,
  eslint: {
    ignoreDuringBuilds: true,
  },
});
