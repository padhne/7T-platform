import React from 'react';
import type { Metadata } from 'next';
import CollectionsCatalog from '@/components/home/CollectionsCatalog';
import ProductCategories from '@/components/home/ProductCategories';

export const metadata: Metadata = {
  title: 'Uniform Collections in Qatar',
  description:
    'Browse Tip Top Uniforms Qatar collections: school, corporate, hotel, restaurant, chef, hospitality and industrial uniforms, made to measure in Doha.',
  alternates: { canonical: '/collections' },
  openGraph: {
    title: 'Uniform Collections in Qatar | Tip Top Uniforms',
    description:
      'School, corporate, hospitality and industrial uniforms, made to measure in Doha by Tip Top Uniforms.',
    url: '/collections',
  },
};


export default function CollectionsPage() {
  return (
    <div className="w-full bg-[#1C1C1C]">
      <div className="max-w-[1600px] mx-auto px-4 md:px-16 pt-16 pb-4">
        <span className="text-[#FF6200] font-bold tracking-[0.28em] uppercase text-xs mb-4 block">Our Range</span>
        <h1 className="text-4xl md:text-5xl font-black text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
          All Collections
        </h1>
        <div className="w-12 h-[3px] bg-[#FF6200] rounded-full mt-6"></div>
      </div>
      {/* <CollectionsCatalog /> */}
      <ProductCategories />
    </div>
  );
}
