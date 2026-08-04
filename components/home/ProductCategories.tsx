import React from 'react';
import Link from 'next/link';

const categories = [
  { title: "Aprons", image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80" },
  { title: "Chef Uniforms", image: "https://images.unsplash.com/photo-1577221084712-45b0445d2b00?w=800&q=80" },
  { title: "Hotel clothing", image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&q=80" },
  { title: "Uniforms for Cleaning - Beauticians - Spa", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80" },
  { title: "Professional", image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80" },
  { title: "WORKWEAR", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80" },
  { title: "OVERSIZE", image: "https://images.unsplash.com/photo-1534481354728-6625890e1f76?w=800&q=80" },
  { title: "SAFETY SHOES", image: "https://images.unsplash.com/photo-1518002171953-a080ee817e1f?w=800&q=80" }
];

export default function ProductCategories() {
  return (
    <section className="w-full bg-white py-16">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        
        {/* Section Title */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-[#8B1A3B] uppercase tracking-wide">
            PRODUCT CATEGORIES
          </h2>
        </div>

        {/* 4x2 Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {categories.map((cat, index) => (
            <Link 
              key={index} 
              href="#" 
              className="relative group overflow-hidden bg-gray-100 aspect-[3/4] flex items-end justify-center"
            >
              <img 
                src={cat.image} 
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
        <div className="flex flex-col md:flex-row items-center gap-10">
          {/* Left Image Banner */}
          <div className="w-full md:w-1/2 relative h-[300px] md:h-[400px]">
            <img 
              src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1200&q=80" 
              alt="Aprons group" 
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 w-full bg-[#4A8DB7]/90 text-white py-3 px-6">
              <span className="font-bold text-sm tracking-widest uppercase">APRONS</span>
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

      </div>
    </section>
  );
}
