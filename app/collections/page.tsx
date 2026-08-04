import React from 'react';
import CollectionsCatalog from '@/components/home/CollectionsCatalog';
import ProductCategories from '@/components/home/ProductCategories';

export default function CollectionsPage() {
  return (
    <div className="w-full bg-[#1C1C1C]">
      <div className="max-w-[1600px] mx-auto px-4 md:px-16 pt-16 pb-4">
        <span className="text-[#E8620A] font-bold tracking-[0.28em] uppercase text-xs mb-4 block">Our Range</span>
        <h1 className="text-4xl md:text-5xl font-black text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
          All Collections
        </h1>
        <div className="w-12 h-[3px] bg-[#E8620A] rounded-full mt-6"></div>
      </div>
      {/* <CollectionsCatalog /> */}
      <ProductCategories />
    </div>
  );
}
