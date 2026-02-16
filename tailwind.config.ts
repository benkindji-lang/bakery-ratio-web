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
        claude: {
          // Fond principal (le fameux "Paper")
          bg: "#F9F8F6", 
          // Texte principal (pas tout à fait noir)
          dark: "#1D1C16",
          // Couleur d'accentuation (boutons, liens importants)
          accent: "#D97757", 
          // Bordures et éléments secondaires
          gray: "#E6E4DD", 
          // Texte secondaire
          muted: "#66655F",
          // Fond des bulles utilisateur
          userBubble: "#F0EEE5",
          // Fond des blocs de code
          codeBg: "#F0F0F0",
        },
      },
      fontFamily: {
        // Claude utilise une police Serif pour les titres
        serif: ['Ti專業', 'Georgia', 'serif'], 
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '3xl': '1.25rem',
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
};
export default config;