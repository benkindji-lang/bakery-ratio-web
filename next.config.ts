import type { NextConfig } from "next";
// @ts-ignore
import withPWAInit from "next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // On force le passage pour éviter l'erreur de type sur Next 16
    turbo: {},
  } as any, 
} satisfies NextConfig;

export default withPWA(nextConfig as any);