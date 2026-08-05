'use client';
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';

export default function AboutSection() {
  const [aboutImage, setAboutImage] = useState('/images/about_tailor.png');

  useEffect(() => {
    const fetchSettings = async () => {
      const { data } = await supabase.from('site_settings').select('about_image').eq('id', 1).single();
      if (data?.about_image) {
        setAboutImage(data.about_image);
      }
    };
    fetchSettings();
  }, []);
  return (
    <section id="about" className="py-28 bg-white w-full">
      <div className="max-w-[1600px] mx-auto px-4 md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* Image */}
          <div className="relative">
            <div className="relative h-[580px] w-full overflow-hidden">
              <img
                src={aboutImage}
                alt="Tailor buttoning a cufflink — bespoke luxury tailoring"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Offset orange border accent */}
            <div className="absolute -bottom-4 -right-4 w-3/4 h-3/4 border-2 border-[#E8620A] -z-10 pointer-events-none"></div>
            {/* Floating stat badge */}
            <div className="absolute -top-6 -left-6 bg-[#E8620A] text-white px-6 py-4 shadow-xl">
              <p className="text-3xl font-black">22+</p>
              <p className="text-[10px] font-bold tracking-widest uppercase leading-tight mt-0.5">Years of<br />Bespoke Craft</p>
            </div>
          </div>

          {/* Text */}
          <div>
            <span className="text-[#E8620A] font-bold tracking-[0.28em] uppercase text-xs mb-4 block">About Us</span>
            <h2 className="text-4xl md:text-5xl font-black text-[#1C1C1C] mb-6 leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              We Seize<br />
              <span className="italic text-[#E8620A]">Satisfaction</span>
            </h2>
            <div className="w-12 h-[3px] bg-[#E8620A] rounded-full mb-8"></div>

            <p className="text-lg text-gray-600 leading-relaxed font-light mb-6">
              We take pride in offering our customers the finest quality fabrics and a perfect fit at a very competitive price. Backed by the knowledge and skill of our in-house tailors, we produce genuine bespoke tailoring — creating timeless sartorial pieces that are made exclusively for every client.
            </p>
            <p className="text-base text-gray-500 leading-relaxed font-light mb-10">
              This craftsmanship is possible because we maintain total control over our garment production, from the first stitch to the last button. Every dress, shirt, and suit we produce carries the dedication of a tailor working with heart — an authentic vocation behind every single piece.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-10">
              {[
                { label: 'Corporate Uniforms' },
                { label: 'Industrial Workwear' },
                { label: 'School Uniforms' },
                { label: 'Hospitality Wear' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#E8620A] rounded-full shrink-0"></div>
                  <span className="text-sm font-semibold text-gray-700">{item.label}</span>
                </div>
              ))}
            </div>

            <a href="#collections"
              className="inline-block bg-[#1C1C1C] hover:bg-[#E8620A] text-white font-bold py-4 px-9 transition-all duration-200 uppercase tracking-widest text-sm"
            >
              View Collections
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
