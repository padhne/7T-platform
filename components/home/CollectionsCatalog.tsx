'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { uniformCategories, type UniformItem } from '@/data/collections';

/* ─────────────────────────────────────────────────────────────
 * All data lives in  /data/collections.ts
 * Import it from there — no data lives in this file.
 * ──────────────────────────────────────────────────────────── */

/* ─── Professional Product Card ─────────────────────────── */
export function ProductCard({ item, categoryLabel }: { item: UniformItem; categoryLabel: string }) {
  return (
    <div
      className="group relative flex flex-col bg-[#242424] border border-[#333] overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:border-[#E8620A]/60 hover:shadow-[0_20px_60px_rgba(232,98,10,0.15)]"
      style={{ borderRadius: 2 }}
    >
      {/* Orange accent bar on top */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#E8620A] to-[#CF5507] z-10" />

      {/* Image area */}
      <div className="relative w-full bg-[#1a1a1a] overflow-hidden" style={{ height: 260 }}>
        <Image
          src={item.img}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Category badge */}
        <span className="absolute top-4 left-4 px-3 py-1 text-[10px] font-bold uppercase tracking-widest bg-[#E8620A] text-white z-10">
          {categoryLabel}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        {/* Title */}
        <h3 className="text-white font-black text-sm uppercase tracking-widest mb-3 group-hover:text-[#E8620A] transition-colors duration-200">
          {item.title}
        </h3>

        {/* Divider */}
        <div className="w-8 h-[2px] bg-[#E8620A] mb-4" />

        {/* Description */}
        <p className="text-gray-400 text-sm leading-relaxed font-light flex-1 mb-6">
          {item.desc}
        </p>

        {/* CTA */}
        <a
          href="https://wa.me/97433513924?text=Hello!%20I%20am%20interested%20in%20your%20uniforms."
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[#E8620A] border border-[#E8620A]/40 px-4 py-2.5 w-fit transition-all duration-200 hover:bg-[#E8620A] hover:text-white hover:border-[#E8620A]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
          Enquire Now
        </a>
      </div>
    </div>
  );
}

/* ─── Main Component ──────────────────────────────────────── */
export default function CollectionsCatalog() {
  const [active, setActive] = useState(uniformCategories[0].id);
  const current = uniformCategories.find((c) => c.id === active) ?? uniformCategories[0];

  return (
    <section id="collections" className="w-full bg-[#1C1C1C] py-0">

      {/* ── Category tab bar ── */}
      <div className="max-w-[1600px] mx-auto px-4 md:px-16 pt-10 pb-0">
        <div className="flex flex-wrap gap-3">
          {uniformCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className={`px-6 py-2.5 text-xs font-bold uppercase tracking-widest border transition-all duration-200 ${
                active === cat.id
                  ? 'bg-[#E8620A] border-[#E8620A] text-white'
                  : 'bg-transparent border-gray-600 text-gray-400 hover:border-[#E8620A] hover:text-[#E8620A]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Panel ── */}
      <div className="max-w-[1600px] mx-auto px-4 md:px-16 pt-14 pb-20">

        {/* Header row */}
        <div className="flex items-start justify-between mb-16 gap-6">
          <h2
            className="text-white font-black text-3xl md:text-5xl leading-tight tracking-wide"
            style={{ fontFamily: "var(--font-condensed), 'Barlow Condensed', 'Oswald', sans-serif", letterSpacing: '0.05em' }}
          >
            {current.heading}
          </h2>
          {/* 7T logo badge */}
          <div
            className="shrink-0 w-20 h-20 flex items-center justify-center border border-gray-600 text-white font-black text-2xl"
            style={{
              background: 'linear-gradient(135deg, #555 0%, #888 50%, #444 100%)',
              clipPath: 'polygon(12px 0%, 100% 0%, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0% 100%, 0% 12px)',
            }}
          >
            <span style={{ color: '#E8620A', fontFamily: "'Barlow Condensed', sans-serif", fontSize: '2.5rem' }}>7</span>
            <span className="text-white text-xl">T</span>
          </div>
        </div>

        {/* 3-column product card grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {current.items.map((item, idx) => (
            <ProductCard key={idx} item={item} categoryLabel={current.label} />
          ))}
        </div>
      </div>
    </section>
  );
}
