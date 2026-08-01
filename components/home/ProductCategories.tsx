import React from 'react';
import Link from 'next/link';

const categories = [
  {
    title: "Professional",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80",
    size: "normal" // Normal grid item
  },
  {
    title: "Workwear",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
    size: "normal"
  },
  {
    title: "Oversize",
    image: "https://images.unsplash.com/photo-1577221084712-45b0445d2b00?w=800&q=80", // Chef
    size: "normal"
  },
  {
    title: "Safety Shoes",
    image: "https://images.unsplash.com/photo-1518002171953-a080ee817e1f?w=800&q=80", // Boots
    size: "normal"
  },
  {
    title: "Aprons",
    image: "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=800&q=80", // Waiter/Barista
    size: "large" // Takes up full width in grid row
  }
];

export default function ProductCategories() {
  return (
    <section className="max-w-[1600px] mx-auto px-4 md:px-8 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat, index) => (
          <Link 
            key={index} 
            href="#" 
            className={`relative group overflow-hidden bg-gray-100 min-h-[300px] md:min-h-[400px] flex items-end justify-center ${cat.size === 'large' ? 'lg:col-span-2' : ''}`}
          >
            {/* Background Image */}
            <img 
              src={cat.image} 
              alt={cat.title} 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {/* Gradient Overlay for Text Legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
            
            {/* Title */}
            <h2 className="relative z-10 text-white text-3xl font-bold tracking-widest uppercase mb-8 group-hover:-translate-y-2 transition-transform duration-300">
              {cat.title}
            </h2>
          </Link>
        ))}
      </div>
    </section>
  );
}
