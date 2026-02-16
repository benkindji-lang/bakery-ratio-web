import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class", // Permet d'activer le mode sombre avec la classe .dark
  theme: {
    extend: {
      colors: {
        claude: {
          bg: "var(--claude-bg)",
          dark: "var(--claude-dark)",
          accent: "#D97757", // Le corail Claude reste constant
          gray: "var(--claude-gray)",
          muted: "var(--claude-muted)",
          userBubble: "var(--claude-user-bubble)",
          codeBg: "var(--claude-code-bg)",
          error: "#EF4444",
          light: "var(--claude-light)", // Ajouté pour vos composants header/boutons
        },
      },
      fontFamily: {
        serif: ['"Ivar Text"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: "var(--claude-shadow)",
      },
    },
  },
  plugins: [
    plugin(function ({ addBase }) {
      addBase({
        // MODE CLAIR (Par défaut)
        ":root": {
          "--claude-bg": "#F9F8F6",
          "--claude-dark": "#1D1C16",
          "--claude-gray": "#E6E4DD",
          "--claude-light": "#F0EEE5",
          "--claude-muted": "#66655F",
          "--claude-user-bubble": "#F0EEE5",
          "--claude-code-bg": "#F0F0F0",
          "--claude-shadow": "0 2px 8px rgba(0, 0, 0, 0.04)",
        },
        // MODE SOMBRE FORCÉ (Anthracite Claude)
        ".dark": {
          "--claude-bg": "#171717",
          "--claude-dark": "#ECECEC",
          "--claude-gray": "#2F2F2F",
          "--claude-light": "#212121",
          "--claude-muted": "#9B9B9B",
          "--claude-user-bubble": "#212121",
          "--claude-code-bg": "#1E1E1E",
          "--claude-shadow": "0 4px 12px rgba(0, 0, 0, 0.3)",
        },
        // Application forcée sur les éléments de base
        "body": {
          "background-color": "var(--claude-bg)",
          "color": "var(--claude-dark)",
          "transition-property": "background-color, color, border-color",
          "transition-duration": "150ms",
        },
        // Correction pour les headers en dur "bg-white"
        ".dark .bg-white": {
          "background-color": "#212121 !important",
        },
        ".dark .border-b": {
          "border-color": "var(--claude-gray) !important",
        }
      });
    }),
  ],
};

export default config;