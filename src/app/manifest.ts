import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: 'bakery-pro-cotonou', // Blindage contre les conflits d'installation
    name: 'BakeryPro Cotonou Edition',
    short_name: 'BakeryPro',
    description: 'Outil professionnel de gestion de production pour boulangers.',
    start_url: '/',
    display: 'standalone',
    background_color: '#F5F2ED',
    theme_color: '#F5F2ED',
    orientation: 'portrait',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/file.svg',
        sizes: '192x192',
        type: 'image/svg+xml',
        purpose: 'maskable',
      },
      {
        src: '/window.svg', // Utilisation d'un autre fichier existant pour varier si besoin
        sizes: '512x512',
        type: 'image/svg+xml',
        purpose: 'any',
      },
    ],
  };
}