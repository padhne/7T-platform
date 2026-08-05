import React from 'react';
import type { Metadata } from 'next';
import { connection } from 'next/server';
import { supabase } from '@/lib/supabase/client';
import { ProductCard } from '@/components/home/CollectionsClient';
import ProductCategories from '@/components/home/ProductCategories';

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const { id } = await params;
  
  const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
  const column = isUUID ? 'id' : 'slug';

  const { data: category } = await supabase
    .from('categories')
    .select('name')
    .eq(column, id)
    .single();

  const name = category?.name
    ? category.name
    : id.charAt(0).toUpperCase() + id.slice(1).replace(/-/g, ' ');

  return {
    title: name,
    description: `Shop ${name} uniforms from Tip Top Uniforms Trading — premium bespoke tailoring in Doha, Qatar.`,
    alternates: { canonical: `/collections/${id}` },
    openGraph: {
      title: `${name} | Tip Top Uniforms Trading`,
      description: `Shop ${name} uniforms from Tip Top Uniforms Trading — bespoke, made-to-measure in Doha, Qatar.`,
      url: `https://tiptopuniforms.com/collections/${id}`,
    },
  };
}


function BasicProductCard({ item, categoryLabel }: { item: { img: string, title: string }, categoryLabel: string }) {
  return (
    <div className="group flex flex-col bg-white border border-gray-100 overflow-hidden hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300">
      <div className="relative w-full aspect-[4/5] bg-gray-50 overflow-hidden">
        <img
          src={item.img}
          alt={item.title}
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
  
  // Fetch the specific category
  const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(resolvedParams.id);
  const column = isUUID ? 'id' : 'slug';

  const { data: categoryData } = await supabase
    .from('categories')
    .select('*')
    .eq(column, resolvedParams.id)
    .single();

  const displayName = categoryData 
    ? categoryData.name 
    : resolvedParams.id.charAt(0).toUpperCase() + resolvedParams.id.slice(1).replace(/-/g, ' ');

  // Fetch items for this category if it exists
  const { data: imagesData } = categoryData ? await supabase
    .from('category_images')
    .select('*')
    .eq('category_id', categoryData.id) : { data: [] };

  const items = (imagesData || []).map(img => ({
    id: img.id,
    img: img.image_url,
    title: img.image_name || categoryData?.name || 'Unknown',
    desc: ''
  }));

  return (
    <div className="w-full bg-white flex flex-col">
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
          <div className="text-[13px] text-gray-400 mb-8 flex items-center gap-2">
            <a href="/" className="hover:text-gray-900 transition-colors">Home</a>
            <span className="text-gray-300">›</span>
            <span className="text-gray-500 capitalize">{displayName}</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-[#4B525A] mb-12 capitalize" style={{ fontFamily: "'Lato', sans-serif" }}>
            {displayName}
          </h1>

          {/* Content */}
          {!categoryData ? (
            <div className="bg-[#F9FAFB] p-8 md:p-10 flex items-center text-gray-500 rounded-sm">
              <div className="w-5 h-5 border-2 border-gray-300 rounded-sm mr-5 flex-shrink-0 bg-white"></div>
              <p className="text-[15px] font-light text-[#9CA3AF]">Category not found.</p>
            </div>
          ) : items.length === 0 ? (
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
