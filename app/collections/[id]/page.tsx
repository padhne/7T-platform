import React from 'react';
import { uniformCategories } from '@/data/collections';
import { ProductCard } from '@/components/home/CollectionsCatalog';
import ProductCategories from '@/components/home/ProductCategories';

export default async function CollectionCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const category = uniformCategories.find((c) => c.id === resolvedParams.id);

  if (!category || category.items.length === 0) {
    const displayName = category
      ? category.label
      : resolvedParams.id.charAt(0).toUpperCase() + resolvedParams.id.slice(1).replace(/-/g, ' ');

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
            <h1 className="text-4xl md:text-5xl font-bold text-[#4B525A] mb-8 capitalize" style={{ fontFamily: "'Lato', sans-serif" }}>
              {displayName}
            </h1>

            {/* Empty State Box */}
            <div className="bg-[#F9FAFB] p-8 md:p-10 flex items-center text-gray-500 rounded-sm">
              <div className="w-5 h-5 border-2 border-gray-300 rounded-sm mr-5 flex-shrink-0 bg-white"></div>
              <p className="text-[15px] font-light text-[#9CA3AF]">No products were found matching your selection.</p>
            </div>

          </div>
        </div>
        {/* <ProductCategories /> */}
      </div>
    );
  }

  return (
    <div className="w-full bg-[#1C1C1C] min-h-screen pt-16 pb-0">
      <div className="max-w-[1600px] mx-auto px-4 md:px-16 pb-28">

        {/* Header row */}
        <div className="flex items-start justify-between mb-16 gap-6">
          <div>
            <span className="text-[#E8620A] font-bold tracking-[0.28em] uppercase text-xs mb-4 block">
              Collection Overview
            </span>
            <h1
              className="text-white font-black text-4xl md:text-6xl leading-tight tracking-wide"
              style={{ fontFamily: "var(--font-condensed), 'Barlow Condensed', 'Oswald', sans-serif", letterSpacing: '0.05em' }}
            >
              {category.heading}
            </h1>
            <div className="w-12 h-[3px] bg-[#E8620A] rounded-full mt-6"></div>
          </div>

          {/* 7T logo badge */}
          <div
            className="shrink-0 w-20 h-20 flex items-center justify-center border border-gray-600 text-white font-black text-2xl hidden md:flex"
            style={{
              background: 'linear-gradient(135deg, #555 0%, #888 50%, #444 100%)',
              clipPath: 'polygon(12px 0%, 100% 0%, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0% 100%, 0% 12px)',
            }}
          >
            <span style={{ color: '#E8620A', fontFamily: "'Barlow Condensed', sans-serif", fontSize: '2.5rem' }}>7</span>
            <span className="text-white text-xl">T</span>
          </div>
        </div>

        {/* 3-column product card grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {category.items.map((item, idx) => (
            <ProductCard key={idx} item={item} categoryLabel={category.label} />
          ))}
        </div>

      </div>
      <ProductCategories />
    </div>
  );
}
