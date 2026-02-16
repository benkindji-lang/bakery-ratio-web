import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        anthropic: {
          beige: "#F5F2ED", // Le fond crème iconique
          charcoal: "#1D1C16", // Le texte presque noir
          accent: "#D97706", // Doré pour les focus
          muted: "#6B6A65", // Gris pour les textes secondaires
        },
      },
      borderRadius: {
        '3xl': '1.5rem',
        'full': '9999px', // Pour les boutons style pilule
      },
    },
  },
  plugins: [],
};
export default config;