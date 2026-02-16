import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'BakeryPro Cotonou Edition',
    short_name: 'BakeryPro',
    description: 'Outil professionnel de gestion de production et de rentabilité pour boulangers.',
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
      // Note : Ajoutez vos fichiers PNG dans /public/icons/ pour activer ces icônes
      {
        src: '/file.svg', 
        sizes: '192x192',
        type: 'image/svg+xml',
        purpose: 'maskable'
      }
    ],
  }
}