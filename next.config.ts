import type { NextConfig } from "next";
// @ts-ignore
import withPWAInit from "next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
  buildExcludes: [/middleware-manifest\.json$/], // Évite les erreurs de cache sur Netlify
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    // Force la résolution correcte pour les environnements Linux (Netlify)
    config.resolve.fallback = { fs: false, net: false, tls: false };
    return config;
  },
};

export default withPWA(nextConfig);