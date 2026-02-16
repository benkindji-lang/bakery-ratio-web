import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        claude: {
          // Palette Chocolat / Marron
          bg: "var(--claude-bg)", 
          dark: "var(--claude-dark)",
          accent: "#D97757", // Corail Claude original
          gray: "var(--claude-gray)", 
          muted: "var(--claude-muted)",
          userBubble: "var(--claude-user-bubble)",
          codeBg: "var(--claude-code-bg)",
          error: "#E25A5A",
          light: "var(--claude-light)",
        },
      },
      fontFamily: {
        serif: ['"Ivar Text"', 'Georgia', 'serif'], 
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: "0 4px 20px rgba(43, 30, 22, 0.3)", // Ombre chaude (marron)
      }
    },
  },
  plugins: [
    plugin(function ({ addBase }) {
      addBase({
        // MODE CLAIR (Bakery Cream)
        ":root": {
          "--claude-bg": "#F9F8F6",        // Papier crème
          "--claude-dark": "#2B1E16",      // Texte Marron très foncé (pas noir)
          "--claude-gray": "#E6E4DD",      // Bordures sable
          "--claude-light": "#F0EEE5",     // Éléments secondaires
          "--claude-muted": "#7A6D65",     // Texte gris-brun
          "--claude-user-bubble": "#F0EEE5",
          "--claude-code-bg": "#F4F2ED",
        },
        // MODE SOMBRE (Deep Chocolate Force)
        ".dark": {
          "--claude-bg": "#231915",         // MARRON CHOCOLAT PROFOND (Fond)
          "--claude-dark": "#F2EBE3",       // Texte Crème clair (lecture parfaite)
          "--claude-gray": "#3D2E28",       // Bordures chocolatées
          "--claude-light": "#2F221D",      // Inputs et boutons
          "--claude-muted": "#A68E85",      // Texte secondaire chamois
          "--claude-user-bubble": "#2F221D", // Bulles marron moyen
          "--claude-code-bg": "#1C1411",    // Fond de code chocolat noir
        },
        "body": {
          "background-color": "var(--claude-bg)",
          "color": "var(--claude-dark)",
          "transition-property": "background-color, color, border-color",
          "transition-duration": "200ms",
        },
        // Forcer la suppression du blanc sur les éléments hérités
        ".dark .bg-white": {
          "background-color": "var(--claude-light) !important",
        },
        ".dark .border-claude-gray": {
          "border-color": "var(--claude-gray) !important",
        }
      });
    }),
  ],
};

export default config;