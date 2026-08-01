'use client';
import React from 'react';

export default function CraftsmanshipSection() {
  return (
    <section className="w-full relative overflow-hidden bg-[#111]">
      {/* Full-bleed split layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">

        {/* Left: Image */}
        <div className="relative h-[400px] lg:h-auto">
          <img
            src="/images/craftsmanship.png"
            alt="Tailoring precision — cinematic black and white"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#111]/70 lg:block hidden"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#111] to-transparent lg:hidden"></div>
        </div>

        {/* Right: Text */}
        <div className="flex flex-col justify-center px-10 md:px-16 py-20">
          <span className="text-[#E8620A] font-bold tracking-[0.28em] uppercase text-xs mb-5 block">Creativity</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-8 leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Craftsmanship<br />
            <span className="italic text-[#E8620A]">&amp; Dedication</span>
          </h2>

          <p className="text-xl text-gray-300 leading-relaxed font-light border-l-[3px] border-[#E8620A] pl-6 mb-10">
            At Tip Top Uniforms, we believe our work goes beyond fabric — it&apos;s about the trust parents and learners place in us. We craft each uniform with care, precision, and a genuine desire to be part of a student&apos;s journey — helping them feel confident, comfortable, and ready to take on the world.
          </p>

          <p className="text-base text-gray-400 leading-relaxed font-light mb-10">
            Through daily craftsmanship and attention to detail, we stay devoted to delivering the best possible experience in the uniform industry — for schools, parents, and students alike.
          </p>

          <div className="flex flex-col gap-5">
            {[
              'Expert in-house tailoring team',
              'Embroidered & handmade artwork',
              'Laser-cut silk, wool & cotton',
              'Sustainable fabric focus',
            ].map((point) => (
              <div key={point} className="flex items-center gap-4">
                <div className="w-8 h-px bg-[#E8620A] shrink-0"></div>
                <span className="text-sm text-gray-400 uppercase tracking-wider font-semibold">{point}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
