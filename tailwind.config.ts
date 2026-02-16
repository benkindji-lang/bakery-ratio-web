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
          dark: "#0D0D0D",
          gray: "#565656",
          light: "#E8E8E8",
          bg: "#FFFFFF",
          accent: "#7C3AED",
          orange: "#FF7A00",
          success: "#10B981",
          error: "#EF4444",
          warning: "#F59E0B",
        },
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'soft': '0 1px 3px rgba(13, 13, 13, 0.1)',
      },
    },
  },
  plugins: [],
};
export default config;