import React from 'react';
import Link from 'next/link';
import { connection } from 'next/server';
import { supabase } from '@/lib/supabase/client';

export default async function ProductCategories() {
  // Opt out of static prerendering — always fetch fresh data on every request
  await connection();

  // Fetch categories
  const { data: categoriesData } = await supabase
    .from('categories')
    .select('*')
    .order('created_at', { ascending: false });

  // Fetch all images to map them to categories
  const { data: imagesData } = await supabase
    .from('category_images')
    .select('*');

  // Build a mapped array of categories with their first available image (or cover image)
  // We explicitly filter OUT categories that have no images
  const displayCategories = (categoriesData || [])
    .map(cat => {
      const catImages = (imagesData || []).filter(img => img.category_id === cat.id);
      return {
        id: cat.id,
        slug: cat.slug,
        title: cat.name,
        image: cat.cover_image_url || (catImages.length > 0 ? catImages[0].image_url : null)
      };
    })
    .filter(cat => cat.image !== null);

  // If there are absolutely no categories with images, do not render the section
  if (displayCategories.length === 0) {
    return null;
  }

  // Get a random image from the backend for the "Featured" section
  const featuredImage = imagesData && imagesData.length > 0 
    ? imagesData[Math.floor(Math.random() * imagesData.length)].image_url 
    : '';

  return (
    <section className="w-full bg-white py-16">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        
        {/* Section Title */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-[#8B1A3B] uppercase tracking-wide">
            PRODUCT CATEGORIES
          </h2>
        </div>

        {/* Dynamic Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {displayCategories.map((cat, index) => (
            <Link 
              key={index} 
              href={`/collections/${cat.slug || cat.id}`} 
              className="relative group overflow-hidden bg-gray-100 aspect-[3/4] flex items-end justify-center"
            >
              <img 
                src={cat.image as string} 
                alt={cat.title} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />
              
              <h3 className="relative z-10 text-white text-lg md:text-xl font-medium text-center px-4 mb-6">
                {cat.title}
              </h3>
            </Link>
          ))}
        </div>

        {/* Bottom Split Section */}
        {featuredImage && (
          <div className="flex flex-col md:flex-row items-center gap-10">
            {/* Left Image Banner */}
            <div className="w-full md:w-1/2 relative h-[300px] md:h-[400px]">
              <img 
                src={featuredImage} 
                alt="Featured collection" 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 w-full bg-[#4A8DB7]/90 text-white py-3 px-6">
                <span className="font-bold text-sm tracking-widest uppercase">FEATURED</span>
              </div>
            </div>
            
            {/* Right Content */}
            <div className="w-full md:w-1/2 flex flex-col items-center text-center px-4 md:px-12">
              <p className="text-gray-500 text-lg md:text-xl font-light leading-relaxed mb-10">
                Tip Top Uniforms has been providing Tailoring, Alteration & Repair Services to the people of QATAR for over 22 years Since the 1998.
              </p>
              {/* Small Logo */}
              <div className="flex items-end leading-none">
                <span className="text-[32px] font-black italic text-[#8B1A3B] leading-none" style={{ fontFamily: "'Playfair Display', serif" }}>7</span>
                <span className="text-[32px] font-black italic text-[#8B1A3B] leading-none" style={{ fontFamily: "'Playfair Display', serif" }}>T</span>
                <div className="flex flex-col border-l-2 border-gray-300 pl-2 ml-2 text-left">
                  <span className="text-[10px] font-bold tracking-widest text-[#1C1C1C] uppercase">TIP TOP UNIFORMS</span>
                  <span className="text-[7px] font-medium text-gray-500 uppercase tracking-widest mt-0.5">MADE IN QATAR</span>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
