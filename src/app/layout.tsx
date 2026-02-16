import type { Metadata, Viewport } from "next";
import "./globals.css";

// Configuration du Viewport pour une application PWA native-like
export const viewport: Viewport = {
  // On utilise la couleur du mode sombre de Claude pour la barre système
  themeColor: "#171717", 
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "BakeryPro Cotonou - Gestion de Boulangerie Professionnelle",
  description: "Logiciel de gestion de production pour boulangers artisans - Cotonou, Bénin",
  manifest: "/manifest.json",
  keywords: ["Boulangerie", "Gestion", "Production", "Cotonou", "Bénin"],
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent", // Permet au header sombre de passer sous la barre d'état iOS
    title: "BakeryPro",
  },
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    /**
     * DARK MODE FORCE : 
     * 1. class="dark" active le plugin Tailwind
     * 2. style={{ colorScheme: 'dark' }} force les éléments natifs (scrollbar, inputs)
     */
    <html lang="fr" className="dark" style={{ colorScheme: 'dark' }}>
      <head>
        <meta charSet="utf-8" />
        {/* Suppression de la meta theme-color ici car gérée par l'objet viewport plus haut */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </head>
      <body className="antialiased selection:bg-claude-accent/30">
        {/* Note : On ne met pas bg-claude-bg ici car le plugin Tailwind 
            l'applique déjà automatiquement au body via addBase. 
        */}
        {children}
      </body>
    </html>
  );
}