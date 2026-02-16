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
        bakery: {
          cream: "#FFFBF7", // Crème très clair (fond)
          beige: "#F5F2ED", // Beige clair
          tan: "#E8DCC8", // Tan naturel
          accent: "#C9580D", // Orange doré (amélioré)
          dark: "#2D2420", // Charcoal foncé (texte principal)
          gray: "#6B6A64", // Gris neutre (textes secondaires)
          light: "#C4C4C0", // Gris clair (inpute, borders)
          success: "#059669", // Vert succès
          error: "#DC2626", // Rouge erreur
          warning: "#D97706", // Ambre alerte
        },
        // Palette secondaire pour éléments spécifiques
        finance: {
          profit: "#1F3A3F", // Bleu très foncé (profit)
          revenue: "#B8860B", // Or (revenus)
          cost: "#8B4513", // Marron (coûts)
        },
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
        'full': '9999px',
      },
      fontSize: {
        '2xs': '0.625rem',
      },
      boxShadow: {
        'sm-soft': '0 1px 2px rgba(0, 0, 0, 0.05)',
        'md-soft': '0 4px 6px rgba(0, 0, 0, 0.07)',
      },
    },
  },
  plugins: [],
};
export default config;