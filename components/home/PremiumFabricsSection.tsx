'use client';
import React from 'react';

export default function PremiumFabricsSection() {
  const fabrics = [
    { name: 'Premium Wool', desc: 'Wrinkle-resistant, breathable and long-lasting', color: '#1B2B4B' },
    { name: 'Laser-Cut Silk', desc: 'Ultra-precision cuts for luxury garments', color: '#6B2D3E' },
    { name: 'Egyptian Cotton', desc: 'Soft, durable and ideal for daily workwear', color: '#C9A84C' },
    { name: 'Embroidered Fabric', desc: 'Handmade artwork for branding and identity', color: '#1C6B5A' },
    { name: 'Safety Hi-Vis', desc: 'ANSI-compliant high-visibility materials', color: '#D9620A' },
    { name: 'Sustainable Blends', desc: 'Eco-conscious textiles, growing collection', color: '#3A5A3A' },
  ];

  return (
    <section className="w-full bg-white py-28">
      <div className="max-w-[1600px] mx-auto px-4 md:px-16">

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end mb-16">
          <div>
            <span className="text-[#E8620A] font-bold tracking-[0.28em] uppercase text-xs mb-4 block">Premium Materials</span>
            <h2 className="text-4xl md:text-5xl font-black text-[#1C1C1C] leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Fabrics for<br />
              <span className="italic text-[#E8620A]">Every Occasion</span>
            </h2>
          </div>
          <div>
            <div className="w-12 h-[3px] bg-[#E8620A] rounded-full mb-6"></div>
            <p className="text-gray-600 leading-relaxed font-light text-lg">
              Quality isn&apos;t just about material — it&apos;s about intention. At Tip Top, we work with a wide variety of fabric compositions, chosen to bring performance and comfort to every uniform we create. But we go beyond offering premium fabric alone — we deliver something more: the subtlety of design paired with the true composition of fabric. Embroidered handwork, wool, laser-cut silk, and cotton are just a few of the materials that place our garments in the luxury segment. As we look to the future, our commitment to premium fabric will only grow, defined through sustainability and complete satisfaction for our valued customers.
            </p>
          </div>
        </div>

        {/* Two-column layout: fabrics grid + image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Fabric cards grid */}
          <div className="grid grid-cols-2 gap-4">
            {fabrics.map((fabric) => (
              <div key={fabric.name}
                className="group relative overflow-hidden border border-gray-100 hover:border-[#E8620A] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-default"
              >
                <div className="w-8 h-1 mb-4 transition-all duration-300 group-hover:w-12"
                  style={{ backgroundColor: fabric.color }}
                ></div>
                <h3 className="font-black text-[#1C1C1C] text-sm uppercase tracking-wider mb-2">{fabric.name}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{fabric.desc}</p>
                <div className="absolute top-4 right-4 w-3 h-3 rounded-full opacity-60"
                  style={{ backgroundColor: fabric.color }}
                ></div>
              </div>
            ))}
          </div>

          {/* Image */}
          <div className="relative h-[500px] overflow-hidden">
            <img
              src="/images/fabrics.png"
              alt="Premium fabric swatches in jewel tones"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C]/40 to-transparent"></div>
            <div className="absolute bottom-6 left-6 text-white">
              <p className="text-xs font-bold tracking-widest uppercase text-[#E8620A] mb-1">Now Available</p>
              <p className="font-black text-xl" style={{ fontFamily: "'Playfair Display', serif" }}>Sustainable Collection</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
