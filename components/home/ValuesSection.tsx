'use client';
import React from 'react';
import { Heart, Shield, Lightbulb } from 'lucide-react';

const values = [
  {
    icon: <Heart size={32} strokeWidth={1.5} />,
    title: 'Dedication',
    desc: 'Dedication to every client\'s success.',
  },
  {
    icon: <Shield size={32} strokeWidth={1.5} />,
    title: 'Trust & Personal Responsibility',
    desc: 'Trust and personal responsibility in all relationships.',
  },
  {
    icon: <Lightbulb size={32} strokeWidth={1.5} />,
    title: 'Innovation',
    desc: 'Innovation that matters for our company and for the world.',
  },
];

export default function ValuesSection() {
  return (
    <section className="w-full bg-white py-28">
      <div className="max-w-[1600px] mx-auto px-4 md:px-16">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-[#E8620A] font-bold tracking-[0.28em] uppercase text-xs mb-4 block">Our Values</span>
          <h2 className="text-4xl md:text-5xl font-black text-[#1C1C1C] mb-6 leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            What We<br />
            <span className="italic text-[#E8620A]">Stand For</span>
          </h2>
          <div className="w-12 h-[3px] bg-[#E8620A] rounded-full mx-auto mb-8"></div>
          <p className="text-gray-500 font-light leading-relaxed">
            Three core values guide every decision we make — from fabric selection to final fitting.
          </p>
        </div>

        {/* Values grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {values.map((v, i) => (
            <div key={i}
              className="group relative p-10 border border-gray-100 hover:border-[#E8620A] hover:-translate-y-2 transition-all duration-300 hover:shadow-xl cursor-default"
            >
              {/* Number watermark */}
              <span className="absolute top-6 right-8 text-7xl font-black text-gray-50 group-hover:text-[#E8620A]/10 transition-colors select-none"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>

              <div className="text-[#E8620A] mb-6">{v.icon}</div>
              <div className="w-8 h-[3px] bg-[#E8620A] mb-5"></div>
              <h3 className="font-black text-[#1C1C1C] text-lg uppercase tracking-wider mb-4">{v.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed font-light">{v.desc}</p>
            </div>
          ))}
        </div>

        {/* Philosophy banner */}
        <div className="bg-[#1C1C1C] p-12 text-center relative overflow-hidden">
          <div className="absolute left-0 top-0 h-full w-1.5 bg-[#E8620A]"></div>
          <div className="absolute right-0 top-0 h-full w-1.5 bg-[#E8620A]"></div>
          <p className="text-[#E8620A] text-xs font-bold tracking-widest uppercase mb-4">Our Philosophy</p>
          <p className="text-white font-black text-2xl md:text-4xl leading-tight max-w-3xl mx-auto"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            "Think Big. Think Different.<br />Think Fast. Think Ahead.<br />
            <span className="italic text-[#E8620A]">Aim for the best."</span>
          </p>
        </div>
      </div>
    </section>
  );
}
