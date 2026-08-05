'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase/client';

export default function HeroSection() {
  const imgRef = useRef<HTMLDivElement>(null);
  const [heroImage, setHeroImage] = useState('/images/hero_bg.png');

  // Subtle parallax on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (imgRef.current) {
        imgRef.current.style.transform = `translateY(${window.scrollY * 0.25}px)`;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Fetch hero image setting
    const fetchSettings = async () => {
      const { data } = await supabase.from('site_settings').select('hero_image').eq('id', 1).single();
      if (data?.hero_image) {
        setHeroImage(data.hero_image);
      }
    };
    fetchSettings();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="w-full flex flex-col bg-white">
      <section className="relative w-full h-[600px] md:h-[700px] flex items-center justify-center overflow-hidden mx-auto max-w-[1920px]">
        {/* Background Image with parallax */}
        <div ref={imgRef} className="absolute inset-0 z-0 will-change-transform">
          <img
            src={heroImage}
            alt="Professional corporate uniforms"
            className="w-full h-full object-cover scale-110"
            style={{ objectPosition: 'center 30%' }}
          />
        </div>

        {/* Gradient overlays */}
        <div className="absolute inset-0 z-10 bg-black/40"></div>

        {/* Diagonal White Lines Overlay - to simulate the design */}
        <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
          {/* Top-left to bottom-right long line */}
          <div className="absolute top-[-10%] left-[20%] w-[150%] h-3 bg-white transform rotate-[25deg] origin-top-left shadow-lg opacity-90"></div>
          {/* Bottom-left to top-right line */}
          <div className="absolute top-[110%] left-[-10%] w-[120%] h-4 bg-white transform -rotate-[35deg] origin-bottom-left shadow-lg opacity-95"></div>
          {/* Smaller vertical-ish crossing line on left */}
          <div className="absolute top-[-20%] left-[10%] w-4 h-[150%] bg-white transform -rotate-[25deg] shadow-lg opacity-95"></div>
          {/* Top-right angled line */}
          <div className="absolute top-[-10%] right-[10%] w-[80%] h-3 bg-white transform rotate-[45deg] origin-top-right shadow-lg opacity-95"></div>
        </div>

        {/* Content (Centered) */}
        <div className="relative z-30 w-full max-w-[1200px] mx-auto px-6 flex flex-col items-center text-center">

          <h3 className="text-sm md:text-base font-bold tracking-[0.2em] text-white uppercase mb-4 animate-fade-in-up">
            Genuine Bespoke Tailoring & Online Orders
          </h3>

          <h1 className="text-5xl md:text-7xl lg:text-[85px] font-black text-white leading-[1.1] mb-6 tracking-tight animate-fade-in-up animate-delay-100 drop-shadow-lg"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            BESPOKE UNIFORMS.<br />
            TAILORED EXCELLENCE.
          </h1>

          <p className="text-base md:text-lg text-gray-100 mb-10 max-w-2xl font-medium animate-fade-in-up animate-delay-200 drop-shadow-md">
            We create genuine bespoke tailoring — timeless, made-to-measure garments crafted exclusively for every client, with the finest artisanal craftsmanship.
          </p>

          <div className="animate-fade-in-up animate-delay-300">
            <Link href="#collections"
              className="text-white font-bold text-sm border-b-2 border-white pb-1 hover:text-[#E8620A] hover:border-[#E8620A] transition-colors uppercase tracking-widest"
            >
              SHOP NOW
            </Link>
          </div>
        </div>
      </section>

      {/* Hero Footer Bar */}
      <div className="w-full max-w-[1600px] mx-auto px-4 md:px-8 py-6 flex flex-col md:flex-row items-center justify-between text-xs font-bold text-gray-600 tracking-widest uppercase">
        <div>
          TIP TOP UNIFORMS TRADING · DOHA, QATAR
        </div>
        <div className="flex items-center gap-3 mt-4 md:mt-0">
          {/* Carousel indicators simulation */}
          <div className="w-8 h-0.5 bg-gray-300 rounded-full"></div>
          <div className="w-8 h-0.5 bg-gray-200 rounded-full"></div>
          <div className="w-8 h-0.5 bg-gray-200 rounded-full"></div>
        </div>
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <span>FOLLOW US</span>
          <Link href="#" className="hover:text-black transition-colors">f</Link>
          <Link href="#" className="hover:text-black transition-colors">in</Link>
        </div>
      </div>
    </div>
  );
}
