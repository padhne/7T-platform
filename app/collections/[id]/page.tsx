import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { connection } from 'next/server';
import { cache } from 'react';
import { supabase } from '@/lib/supabase/client';
import { SITE_URL, jsonLd } from '@/lib/site';

/** "Restaurant" -> "Restaurant Uniforms", but leave "Hospital Uniform" / "Restaurant Uniforms" alone. */
function withUniform(name: string) {
  return /uniform/i.test(name) ? name : `${name} Uniforms`;
}

const UUID_RE =/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// Deduplicated between generateMetadata and the page for a single request.
const getCategory = cache(async (id: string) => {
  const { data } = await supabase
    .from('categories')
    .select('*')
    .eq(UUID_RE.test(id) ? 'id' : 'slug', id)
    .maybeSingle();
  return data;
});

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const { id } = await params;
  const category = await getCategory(id);
  if (!category) return { title: 'Collection not found', robots: { index: false } };

  const name: string = category.name;
  const label = withUniform(name);
  // Always point Google at the slug URL, even when the page is reached via its UUID.
  const path = `/collections/${category.slug || category.id}`;
  const description = `${label} in Qatar by Tip Top Uniforms (TipTop Uniforms Trading W.L.L), custom made to measure in Doha. Call or WhatsApp +974 5501 6644.`;

  return {
    title: `${label} in Qatar`,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${label} in Qatar | Tip Top Uniforms`,
      description,
      url: `${SITE_URL}${path}`,
      ...(category.cover_image_url ? { images: [{ url: category.cover_image_url, alt: `${label} by Tip Top Uniforms Qatar` }] } : {}),
    },
  };
}


function BasicProductCard({ item, categoryLabel }: { item: { img: string, title: string }, categoryLabel: string }) {
  return (
    <div className="group flex flex-col bg-white border border-gray-100 overflow-hidden hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300">
      <div className="relative w-full aspect-[4/5] bg-gray-50 overflow-hidden">
        <img
          src={item.img}
          alt={`${item.title} (${categoryLabel}) by Tip Top Uniforms Qatar`}
          loading="lazy"
          decoding="async"
          className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="p-5 text-center bg-white">
        <h3 className="text-[#1C1C1C] font-bold uppercase tracking-widest text-[13px] mb-1.5">
          {item.title}
        </h3>
        <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">
          Made in Qatar
        </p>
      </div>
    </div>
  );
}

export default async function CollectionCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  await connection();
  const resolvedParams = await params;
  
  const categoryData = await getCategory(resolvedParams.id);
  // Real 404 (not a "soft 404" page with 200 status) for unknown categories.
  if (!categoryData) notFound();

  const displayName: string = categoryData.name;
  const path = `/collections/${categoryData.slug || categoryData.id}`;

  const { data: imagesData } = await supabase
    .from('category_images')
    .select('*')
    .eq('category_id', categoryData.id);

  const items = (imagesData || []).map(img => ({
    id: img.id,
    img: img.image_url,
    title: img.image_name || categoryData?.name || 'Unknown',
    desc: ''
  }));

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Collections', item: `${SITE_URL}/collections` },
          { '@type': 'ListItem', position: 3, name: displayName, item: `${SITE_URL}${path}` },
        ],
      },
      {
        '@type': 'CollectionPage',
        name: `${withUniform(displayName)} in Qatar`,
        url: `${SITE_URL}${path}`,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: { '@id': `${SITE_URL}/#organization` },
        ...(items.length ? { image: items.slice(0, 10).map((i) => i.img) } : {}),
      },
    ],
  };

  return (
    <div className="w-full bg-white flex flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(structuredData)} />
      <div className="w-full bg-white min-h-[80vh] py-16">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">

          {/* Top Filters Bar */}
          <div className="flex items-center text-xs font-bold text-gray-700 tracking-wider mb-8">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
            </svg>
            FILTERS:
          </div>

          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="text-[13px] text-gray-400 mb-8 flex items-center gap-2">
            <Link href="/" className="hover:text-gray-900 transition-colors">Home</Link>
            <span className="text-gray-300">›</span>
            <Link href="/collections" className="hover:text-gray-900 transition-colors">Collections</Link>
            <span className="text-gray-300">›</span>
            <span className="text-gray-500 capitalize" aria-current="page">{displayName}</span>
          </nav>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-[#4B525A] mb-4 capitalize" style={{ fontFamily: "'Lato', sans-serif" }}>
            {displayName}
          </h1>
          <p className="text-[15px] text-gray-500 mb-12 max-w-3xl">
            Custom {withUniform(displayName).toLowerCase()} made to measure by Tip Top Uniforms in Doha, Qatar.
          </p>

          {/* Content */}
          {items.length === 0 ? (
            <div className="bg-[#F9FAFB] p-8 md:p-10 flex items-center text-gray-500 rounded-sm">
              <div className="w-5 h-5 border-2 border-gray-300 rounded-sm mr-5 flex-shrink-0 bg-white"></div>
              <p className="text-[15px] font-light text-[#9CA3AF]">No products were found matching your selection.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {items.map((item, idx) => (
                <BasicProductCard key={idx} item={item} categoryLabel={displayName} />
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
