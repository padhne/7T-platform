import React from 'react';
import { notFound } from 'next/navigation';
import { uniformCategories } from '@/data/collections';
import { ProductCard } from '@/components/home/CollectionsCatalog';

export default function CollectionCategoryPage({ params }: { params: { id: string } }) {
  const category = uniformCategories.find((c) => c.id === params.id);

  if (!category) {
    notFound();
  }

  return (
    <div className="w-full bg-[#1C1C1C] min-h-screen pt-16 pb-28">
      <div className="max-w-[1600px] mx-auto px-4 md:px-16">
        
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
    </div>
  );
}
