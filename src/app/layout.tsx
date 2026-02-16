import type { Metadata, Viewport } from "next";
import "./globals.css";

// Configuration du Viewport (Zéro Noir système)
export const viewport: Viewport = {
  // On utilise exactement le marron chocolat #231915 pour la barre système
  themeColor: "#231915", 
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
    // "default" permet d'utiliser la themeColor marron définie plus haut sur iOS
    statusBarStyle: "default", 
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
     * DARK MODE CHOCOLAT FORCE : 
     * colorScheme: 'dark' est maintenu pour les éléments système, 
     * mais le CSS force le Marron.
     */
    <html lang="fr" className="dark" style={{ colorScheme: 'dark' }}>
      <head>
        <meta charSet="utf-8" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </head>
      {/* On force bg-claude-bg (Marron) et text-claude-dark (Crème) dès le body */}
      <body className="antialiased selection:bg-claude-accent/30 bg-claude-bg text-claude-dark">
        {children}
      </body>
    </html>
  );
}