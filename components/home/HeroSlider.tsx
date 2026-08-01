import React from 'react';

export default function HeroSlider() {
  return (
    <div className="relative w-full h-[600px] md:h-[800px] bg-gray-900 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80 mix-blend-overlay"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1600&q=80)' }} // Placeholder: Construction/Workwear
      />
      
      {/* Geometric Lines Overlay (Simulated with SVGs) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40 mix-blend-overlay hidden md:block" preserveAspectRatio="none">
        <line x1="10%" y1="0" x2="40%" y2="100%" stroke="white" strokeWidth="8" />
        <line x1="80%" y1="0" x2="60%" y2="100%" stroke="white" strokeWidth="8" />
        <line x1="0" y1="70%" x2="100%" y2="20%" stroke="white" strokeWidth="8" />
      </svg>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <span className="text-white text-xs md:text-sm tracking-[0.2em] font-bold uppercase mb-4 drop-shadow-md">
          Best Workwear and Denim Trader and Online Sellers
        </span>
        <h1 className="text-5xl md:text-8xl font-black text-white tracking-tight uppercase leading-[0.9] drop-shadow-lg mb-6">
          Vik Qatar<br />Workwear
        </h1>
        <p className="text-white text-sm md:text-lg mb-10 drop-shadow-md">
          An exclusive selection of this season's trends.
        </p>
        <a 
          href="#" 
          className="text-white text-sm md:text-base font-bold uppercase tracking-widest border-b-2 border-white pb-1 hover:text-gray-300 hover:border-gray-300 transition-colors drop-shadow-md"
        >
          Shop Now
        </a>
      </div>

      {/* Slide Navigation Dots */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2">
        <div className="w-8 h-1 bg-white opacity-100 rounded-full cursor-pointer"></div>
        <div className="w-8 h-1 bg-white opacity-40 rounded-full cursor-pointer hover:opacity-80 transition-opacity"></div>
        <div className="w-8 h-1 bg-white opacity-40 rounded-full cursor-pointer hover:opacity-80 transition-opacity"></div>
      </div>
    </div>
  );
}
