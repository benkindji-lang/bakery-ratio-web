import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'BakeryPro Cotonou Edition',
    short_name: 'BakeryPro',
    description: 'Outil professionnel de gestion de production et de rentabilité pour boulangers.',
    start_url: '/',
    display: 'standalone', // Fait disparaître la barre d'URL du navigateur
    background_color: '#F5F2ED', // La couleur de fond au lancement (Anthropic Beige)
    theme_color: '#F5F2ED', // La couleur de la barre d'état du téléphone
    orientation: 'portrait',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/icons/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any maskable' // 'maskable' permet à Android d'adapter la forme (rond, carré...)
      },
      {
        src: '/icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable'
      },
    ],
  }
}