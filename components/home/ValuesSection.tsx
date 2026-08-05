'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase/client';

export default function ValuesSection() {
  const [bannerImage, setBannerImage] = useState('https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1600&q=80');

  useEffect(() => {
    const fetchSettings = async () => {
      const { data } = await supabase.from('site_settings').select('values_banner_image').eq('id', 1).single();
      if (data?.values_banner_image) {
        setBannerImage(data.values_banner_image);
      }
    };
    fetchSettings();
  }, []);
  const clientLogos = Array.from({ length: 16 }).map((_, i) => `/images/client_${i + 1}.png`); // Using placeholder paths for logos

  return (
    <section className="w-full bg-[#F9F9F9] flex flex-col">

      {/* 1. Large Banner with 3 Men */}
      <div className="relative w-full h-[500px] overflow-hidden bg-gray-200">
        <img
          src={bannerImage}
          alt="Honesty and Sustainability"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-white/20"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
          <h3 className="text-[#0055A4] text-sm md:text-base font-bold tracking-widest mb-2 uppercase" style={{ textShadow: '1px 1px 2px rgba(255,255,255,0.8)' }}>
            HONESTY AND SUSTAINABILITY
          </h3>
          <h2 className="text-[#0055A4] text-3xl md:text-5xl lg:text-[60px] font-black uppercase tracking-tight" style={{ textShadow: '2px 2px 4px rgba(255,255,255,0.8)', WebkitTextStroke: '1px white' }}>
            CHOSEN WITH CARE - TIP TOP QATAR
          </h2>
        </div>
      </div>

      <div className="text-center py-8 bg-white">
        <p className="text-gray-600 font-bold text-lg md:text-xl">
          Our Workwear is made from Best Fabrics.
        </p>
      </div>

      {/* 2. Clients Portfolio Header */}
      <div className="max-w-[1200px] mx-auto px-4 py-16 w-full text-center">
        <h2 className="text-3xl md:text-[40px] font-black text-black mb-16 tracking-tight">
          TIP TOP offer a wide range of services and below our Clients Portfolio
        </h2>

        <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20 text-left max-w-4xl mx-auto">
          <div className="flex-1 relative pl-6 border-l border-gray-300">
            <p className="text-gray-500 font-light text-base mb-2">
              We are dedicated to supply our products to our valued customers.
            </p>
            <p className="text-gray-500 font-light text-base">
              <strong className="text-black">TIP TOP UNIFORMS</strong> is a reliable partner of Workwear and Denim Name in QATAR.
            </p>
          </div>

          <div className="shrink-0 relative w-40 h-40 flex items-center justify-center border-[1px] border-dashed border-gray-300 rounded-full">
            <div className="text-center">
              <div className="flex items-end justify-center leading-none">
                <span className="text-[28px] font-black italic text-[#8B1A3B] leading-none" style={{ fontFamily: "'Playfair Display', serif" }}>7</span>
                <span className="text-[28px] font-black italic text-[#8B1A3B] leading-none" style={{ fontFamily: "'Playfair Display', serif" }}>T</span>
              </div>
            </div>
            {/* Circular Text SVG Simulation */}
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full animate-[spin_10s_linear_infinite]" style={{ transformOrigin: 'center' }}>
              <path id="circlePath" d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" fill="none" />
              <text fontSize="10" fill="#666" letterSpacing="3">
                <textPath href="#circlePath" startOffset="0%">
                  MADE IN QATAR • SINCE 1998 •
                </textPath>
              </text>
            </svg>
          </div>
        </div>
      </div>

      {/* 3. Clients Logos Grid */}
      <div className="w-full bg-[#F5F4ED] py-16">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="grid  grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {/* Generating placeholder boxes for client logos */}
            {Array.from({ length: 0 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl aspect-square flex items-center justify-center p-6 shadow-sm hover:shadow-md transition-shadow">
                {/* Simulated Logo Text */}
                <div className="text-center">
                  <div className="w-12 h-12 bg-gray-200 rounded-full mx-auto mb-2 opacity-50"></div>
                  <div className="text-[10px] font-bold text-gray-400 uppercase">Client {i + 1}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-20">
            <h3 className="text-[#0055A4] text-xl md:text-2xl font-bold tracking-wide mb-6 uppercase">
              #TIP TOP UNIFORMS IS THE BEST WORKWEAR COMPANY IN QATAR.
            </h3>
            <p className="text-gray-500 font-light text-sm md:text-base">
              Remember to show off your new purchase on insta by<br />
              tagging us and <strong className="text-black">get $20 off</strong> your next order.
            </p>
          </div>
        </div>
      </div>

    </section>
  );
}
