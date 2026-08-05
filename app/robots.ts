import type { MetadataRoute } from 'next';

const BASE_URL = 'https://tiptopuniforms.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/dashboard/', '/login/'],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
