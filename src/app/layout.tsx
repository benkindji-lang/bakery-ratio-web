import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#FFFBF7",
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
    statusBarStyle: "black-translucent",
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
    <html lang="fr">
      <head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#FFFBF7" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className="antialiased bg-bakery-cream text-bakery-dark selection:bg-bakery-accent selection:text-white font-sans">
        {children}
      </body>
    </html>
  );
}