'use client';
import React from 'react';

export default function MissionVisionSection() {
  return (
    <section className="w-full bg-[#FAF8F4] py-28">
      <div className="max-w-[1600px] mx-auto px-4 md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* Text side */}
          <div>
            <span className="text-[#E8620A] font-bold tracking-[0.28em] uppercase text-xs mb-4 block">Mission &amp; Vision</span>
            <h2 className="text-4xl md:text-5xl font-black text-[#1C1C1C] mb-10 leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Building a<br />
              <span className="italic text-[#E8620A]">World-Class Brand</span>
            </h2>

            <div className="space-y-10">
              {/* Mission */}
              <div className="relative pl-8 before:absolute before:left-0 before:top-0 before:h-full before:w-[3px] before:bg-[#E8620A]">
                <h3 className="font-black text-[#1C1C1C] text-lg uppercase tracking-wider mb-3">Our Mission</h3>
                <p className="text-gray-600 leading-relaxed font-light text-base">
                  Providing quality product and highest service with standards platform to clients, ensuring career opportunities for employees and continued support to society.
                </p>
              </div>

              {/* Vision */}
              <div className="relative pl-8 before:absolute before:left-0 before:top-0 before:h-full before:w-[3px] before:bg-[#3A3A3A]">
                <h3 className="font-black text-[#1C1C1C] text-lg uppercase tracking-wider mb-3">Our Vision</h3>
                <p className="text-gray-600 leading-relaxed font-light text-base">
                  A world-class, unbeatable quality and fitting guarantee across all clothing lines, backed by proprietary Retro Uniform bespoke tailoring.
                </p>
              </div>

              {/* Philosophy */}
              <div className="bg-[#1C1C1C] text-white px-8 py-6">
                <p className="text-[#E8620A] text-xs font-bold tracking-widest uppercase mb-3">Our Philosophy</p>
                <p className="font-black text-lg leading-relaxed" style={{ fontFamily: "'Playfair Display', serif" }}>
                  "Think Big. Think Different. Think Fast. Think Ahead. Aim for the best."
                </p>
              </div>
            </div>
          </div>

          {/* Image side */}
          <div className="relative">
            <div className="relative h-[520px] overflow-hidden">
              <img
                src="/images/mission_vision.png"
                alt="Tailoring tools flat lay — mission and vision"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Accent border */}
            <div className="absolute -top-4 -left-4 w-3/4 h-3/4 border-2 border-[#E8620A] -z-10 pointer-events-none"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
