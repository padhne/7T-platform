import type { MetadataRoute } from 'next';
import { supabase } from '@/lib/supabase/client';
import { SITE_URL } from '@/lib/site';

// Regenerate hourly so new categories show up without a redeploy.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // select('*') so a missing optional column (e.g. updated_at) never breaks the query.
  const { data: categories, error } = await supabase.from('categories').select('*');
  if (error) console.error('sitemap: failed to load categories', error.message);

  // Use the same URL the site links to (slug first) so Google sees one canonical URL per category.
  const categoryRoutes: MetadataRoute.Sitemap = (categories ?? []).map((cat) => ({
    url: `${SITE_URL}/collections/${cat.slug || cat.id}`,
    lastModified: cat.updated_at || cat.created_at ? new Date(cat.updated_at || cat.created_at) : now,
    changeFrequency: 'weekly',
    priority: 0.8,
    ...(cat.cover_image_url ? { images: [cat.cover_image_url] } : {}),
  }));

  return [
    { url: SITE_URL, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/collections`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/services`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/faq`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
    ...categoryRoutes,
  ];
}
