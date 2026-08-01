'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function HeroSection() {
  const imgRef = useRef<HTMLDivElement>(null);

  // Subtle parallax on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (imgRef.current) {
        imgRef.current.style.transform = `translateY(${window.scrollY * 0.25}px)`;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative w-full min-h-[88vh] flex items-center overflow-hidden bg-[#1C1C1C]">
      {/* Background Image with parallax */}
      <div ref={imgRef} className="absolute inset-0 z-0 will-change-transform">
        <img
          src="/images/hero_bg.png"
          alt="Professional corporate uniforms"
          className="w-full h-full object-cover opacity-50 scale-110"
          style={{ objectPosition: 'center 20%' }}
        />
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/85 via-black/60 to-transparent"></div>
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

      {/* Orange accent vertical line */}
      <div className="absolute left-0 top-0 h-full w-1.5 bg-[#E8620A] z-20"></div>

      {/* Content */}
      <div className="relative z-20 w-full max-w-[1600px] mx-auto px-8 md:px-16 py-20">
        <div className="max-w-3xl">

          {/* Logo watermark above heading */}
          <div className="flex items-end leading-none mb-6 animate-fade-in-up">
            <span className="text-[28px] font-black italic text-[#E8620A] leading-none" style={{ fontFamily: "'Playfair Display', serif" }}>7</span>
            <span className="text-[28px] font-black italic text-white/60 leading-none" style={{ fontFamily: "'Playfair Display', serif" }}>T</span>
            <span className="ml-3 text-[#E8620A] font-bold tracking-[0.28em] uppercase text-xs self-center">Tip Top Uniforms Trading</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-6 tracking-tight animate-fade-in-up animate-delay-100"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Bespoke Uniforms.<br />
            <span className="text-[#E8620A] italic">Tailored Excellence.</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl font-light leading-relaxed animate-fade-in-up animate-delay-200">
            We create genuine bespoke tailoring — timeless, made-to-measure garments crafted exclusively for every client, with the finest artisanal craftsmanship.
          </p>

          <div className="flex flex-wrap gap-4 animate-fade-in-up animate-delay-300">
            <Link href="#collections"
              className="bg-[#E8620A] hover:bg-[#CF5507] text-white font-bold py-4 px-9 transition-all duration-200 uppercase tracking-widest text-sm"
            >
              Explore Our Collections
            </Link>
            <Link href="#contact"
              className="border-2 border-white/70 hover:border-[#E8620A] hover:text-[#E8620A] text-white font-bold py-4 px-9 transition-all duration-200 uppercase tracking-widest text-sm"
            >
              Contact Us
            </Link>
          </div>

          {/* Stats bar */}
          <div className="mt-16 flex flex-wrap gap-10 animate-fade-in-up animate-delay-400 border-t border-white/10 pt-10">
            {[
              { value: '22+', label: 'Years in Qatar' },
              { value: '8', label: 'Uniform Categories' },
              { value: '100%', label: 'In-House Tailoring' },
              { value: '2', label: 'Mobile Numbers' },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span className="text-3xl font-black text-[#E8620A]">{stat.value}</span>
                <span className="text-xs text-gray-400 uppercase tracking-widest mt-1">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-[10px] text-gray-400 uppercase tracking-widest">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-[#E8620A] to-transparent"></div>
      </div>
    </section>
  );
}
