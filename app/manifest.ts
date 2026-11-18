import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Tip Top Uniforms Qatar',
    short_name: SITE.name,
    description: SITE.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#FFFFFF',
    theme_color: '#FF6200',
    icons: [
      { src: '/favicon.ico', sizes: 'any', type: 'image/x-icon' },
      { src: SITE.logo, sizes: '1355x1160', type: 'image/png' },
    ],
  };
}
