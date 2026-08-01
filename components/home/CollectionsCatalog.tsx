'use client';

import React, { useState } from 'react';

type Category = {
  id: string;
  label: string;
  emoji: string;
  heroColor: string;
  desc: string;
  items: string[];
};

const categories: Category[] = [
  {
    id: 'corporate',
    label: 'Corporate',
    emoji: '🏢',
    heroColor: '#1B2B4B',
    desc: 'Professional attire that defines your corporate identity.',
    items: ['Formal Shirts', 'Formal Pants', 'Polo Shirts', 'T-Shirts', 'Coats & Blazers', 'Suits', 'Ties & Scarves', 'Winter Jackets', 'Skirts', 'Caps'],
  },
  {
    id: 'industrial',
    label: 'Industrial',
    emoji: '🏭',
    heroColor: '#D9620A',
    desc: 'Safety-first workwear engineered for demanding environments.',
    items: ['Coveralls', '2pc Coveralls', 'Bib Overalls', 'Multipocket Vests', 'Security Shirts & Pants', 'Safety Coveralls', 'Safety Vests', 'Safety Jackets', 'Reflective Accessories'],
  },
  {
    id: 'hospitality',
    label: 'Hospitality',
    emoji: '🏨',
    heroColor: '#6B2D3E',
    desc: 'Elegant uniforms for hotels, restaurants, and resorts.',
    items: ['Front Desk', 'Housekeeping', 'Waiter / Waitress', 'Chef Jackets', 'Laundry Staff', 'Guest Relations', 'Poolside & Lifeguard', 'Spa & Salon'],
  },
  {
    id: 'school',
    label: 'School',
    emoji: '🎒',
    heroColor: '#1C5A8A',
    desc: 'Durable, comfortable school uniforms built to last.',
    items: ['Blazers', 'Shirts', 'Pants & Trousers', 'Shorts', 'Skirts', 'Polo Shirts', 'T-Shirts', 'Sweaters & Jumpers'],
  },
  {
    id: 'aviation',
    label: 'Aviation',
    emoji: '✈️',
    heroColor: '#1C1C1C',
    desc: 'Precision-tailored uniforms for aviation professionals.',
    items: ['Pilot Shirts', 'Cabin Crew Suits', 'Ground Staff', 'Security Uniforms', 'Flight Jackets', 'Accessories'],
  },
  {
    id: 'healthcare',
    label: 'Healthcare',
    emoji: '🏥',
    heroColor: '#1C6B5A',
    desc: 'Hygienic, professional attire for medical settings.',
    items: ['Scrubs', 'Lab Coats', 'Nurse Uniforms', 'Doctor Coats', 'Dental Staff', 'Pharmacy Uniforms'],
  },
  {
    id: 'chef',
    label: 'Chef',
    emoji: '👨‍🍳',
    heroColor: '#8B4513',
    desc: 'Classic and modern chef wear for kitchen professionals.',
    items: ["Chef's Jacket", 'Chef Pants', 'Aprons', 'Chef Hats (Toque)', 'Kitchen Caps', 'Oven Mitts'],
  },
  {
    id: 'housekeeping',
    label: 'Housekeeping',
    emoji: '🧹',
    heroColor: '#4A6741',
    desc: 'Practical, neat uniforms for housekeeping and cleaning staff.',
    items: ['Housekeeping Dress', 'Aprons', 'Cleaning Staff Uniforms', 'Caps', 'Gloves & Accessories'],
  },
];

export default function CollectionsCatalog() {
  const [active, setActive] = useState('corporate');
  const current = categories.find((c) => c.id === active) || categories[0];

  return (
    <section id="collections" className="w-full bg-[#FAF8F4] py-28">
      <div className="max-w-[1600px] mx-auto px-4 md:px-16">

        {/* Section header */}
        <div className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-[#E8620A] font-bold tracking-[0.28em] uppercase text-xs mb-4 block">Our Collections</span>
            <h2 className="text-4xl md:text-5xl font-black text-[#1C1C1C] leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Uniforms for<br />
              <span className="italic text-[#E8620A]">Every Industry</span>
            </h2>
          </div>
          <p className="text-gray-500 max-w-sm font-light leading-relaxed">
            8 specialised categories. All crafted in-house with premium materials and guaranteed fit.
          </p>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className={`flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-widest border transition-all duration-200
                ${active === cat.id
                  ? 'bg-[#E8620A] border-[#E8620A] text-white shadow-md'
                  : 'bg-white border-gray-200 text-gray-600 hover:border-[#E8620A] hover:text-[#E8620A]'
                }`}
            >
              <span>{cat.emoji}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Active category display */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 overflow-hidden shadow-xl">

          {/* Left colour block */}
          <div
            className="lg:col-span-2 flex flex-col justify-end p-10 min-h-[320px]"
            style={{ backgroundColor: current.heroColor }}
          >
            <span className="text-5xl mb-6">{current.emoji}</span>
            <h3 className="font-black text-white text-3xl mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
              {current.label} Uniforms
            </h3>
            <p className="text-white/70 text-sm leading-relaxed font-light mb-6">{current.desc}</p>
            <a href="https://wa.me/97433513924?text=Hello!%20I%20am%20interested%20in%20your%20uniforms."
              target="_blank" rel="noopener noreferrer"
              className="inline-block border-2 border-white/50 hover:border-white hover:bg-white hover:text-[#1C1C1C] text-white font-bold py-3 px-7 transition-all duration-200 uppercase tracking-widest text-xs self-start"
            >
              Enquire Now
            </a>
          </div>

          {/* Right items grid */}
          <div className="lg:col-span-3 bg-white p-10">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6">
              {current.items.length} Items Available
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {current.items.map((item) => (
                <div key={item}
                  className="group flex items-center gap-3 py-3 border-b border-gray-100 hover:border-[#E8620A] transition-colors cursor-default"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-[#E8620A] shrink-0 group-hover:scale-150 transition-transform"></div>
                  <span className="text-sm font-semibold text-gray-700 group-hover:text-[#E8620A] transition-colors">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
