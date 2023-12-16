/** @type {import('next').NextConfig} */

// Configuration options for Next.js
const nextConfig = {
  basePath: "",
  assetPrefix: "",
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  experimental: {
    webpackBuildWorker: true,
  },
  reactStrictMode: false,
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wlofkglxzzwfrvghuitm.supabase.co",
      },
      {
        protocol: "https",
        hostname: "jayvaghani.info",
      },
    ],
  },
};

// Configuration object tells the next-pwa plugin
const withPWA = require("next-pwa")({
  dest: "public", // Destination directory for the PWA files
  disable: process.env.NODE_ENV === "development", // Disable PWA in development mode
  register: true, // Register the PWA service worker
  skipWaiting: true, // Skip waiting for service worker activation
});

// Export the combined configuration for Next.js with PWA support
module.exports = withPWA(nextConfig);
