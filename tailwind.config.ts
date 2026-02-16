import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // On force le mode sombre de manière permanente
  darkMode: "class", 
  theme: {
    extend: {
      colors: {
        claude: {
          // AUCUN NOIR (#000) ICI.
          // Fond Marron Chocolat Profond
          bg: "#231915", 
          // Texte Crème/Chocolat Blanc
          dark: "#F2EBE3", 
          // Accent Corail (Claude)
          accent: "#D97757", 
          // Bordures Chocolat Moyen
          gray: "#3D2E28", 
          // Texte secondaire (Chamois)
          muted: "#A68E85",
          // Bulles et inputs (Chocolat plus clair que le fond)
          userBubble: "#2F221D",
          error: "#E25A5A",
        },
      },
      fontFamily: {
        serif: ['"Ivar Text"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        // Ombre brune chaude pour éviter le gris/noir
        soft: "0 4px 20px rgba(35, 25, 21, 0.8)",
      }
    },
  },
  plugins: [],
};

export default config;