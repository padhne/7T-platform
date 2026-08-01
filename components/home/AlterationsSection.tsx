'use client';
import React from 'react';
import { Scissors, Ruler, Zap } from 'lucide-react';

const services = [
  { icon: <Scissors size={22} />, label: 'Suit Alterations' },
  { icon: <Scissors size={22} />, label: 'Shirt Alterations' },
  { icon: <Scissors size={22} />, label: 'Trouser Hemming' },
  { icon: <Scissors size={22} />, label: 'Dress Alterations' },
  { icon: <Ruler size={22} />, label: 'Curtain Alterations' },
  { icon: <Scissors size={22} />, label: 'Zipper Replacement' },
  { icon: <Scissors size={22} />, label: 'Buttonholes' },
  { icon: <Scissors size={22} />, label: 'Re-lining' },
  { icon: <Zap size={22} />, label: 'Emergency Rush Service' },
];

export default function AlterationsSection() {
  return (
    <section id="alterations" className="w-full bg-[#1C1C1C] py-28">
      <div className="max-w-[1600px] mx-auto px-4 md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* Text */}
          <div>
            <span className="text-[#E8620A] font-bold tracking-[0.28em] uppercase text-xs mb-4 block">Services</span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Expert<br />
              <span className="italic text-[#E8620A]">Alteration Services</span>
            </h2>
            <div className="w-12 h-[3px] bg-[#E8620A] rounded-full mb-8"></div>

            <p className="text-gray-400 leading-relaxed font-light text-base mb-10">
              Professional alteration and repair services for every garment. From simple hemming to full re-lining — even emergency rush alterations available.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
              {services.map((svc) => (
                <div key={svc.label}
                  className="flex items-center gap-4 px-5 py-4 border border-white/10 hover:border-[#E8620A] hover:bg-[#E8620A]/5 transition-all duration-200 group cursor-default"
                >
                  <span className="text-[#E8620A] group-hover:scale-110 transition-transform">{svc.icon}</span>
                  <span className="text-sm font-semibold text-gray-300 group-hover:text-white transition-colors">{svc.label}</span>
                </div>
              ))}
            </div>

            <a href="https://wa.me/97433513924?text=Hi!%20I%20need%20alteration%20services."
              target="_blank" rel="noopener noreferrer"
              className="inline-block bg-[#E8620A] hover:bg-[#CF5507] text-white font-bold py-4 px-9 transition-all duration-200 uppercase tracking-widest text-sm"
            >
              Book Alteration
            </a>
          </div>

          {/* Visual panel */}
          <div className="relative">
            <div className="bg-[#111] border border-white/10 p-10">
              <div className="flex items-end gap-2 mb-8">
                <span className="text-[52px] font-black italic text-[#E8620A] leading-none" style={{ fontFamily: "'Playfair Display', serif" }}>7</span>
                <span className="text-[52px] font-black italic text-white/40 leading-none" style={{ fontFamily: "'Playfair Display', serif" }}>T</span>
              </div>
              <h3 className="font-black text-white text-2xl mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                Why Choose Tip Top?
              </h3>
              <div className="space-y-5 mt-6">
                {[
                  { title: 'In-House Atelier', desc: 'All work done on premises — no outsourcing.' },
                  { title: 'Skilled Tailors', desc: 'Experienced craftsmen with years of expertise.' },
                  { title: 'Quality Guarantee', desc: 'If you\'re not satisfied, we fix it free of charge.' },
                  { title: 'Rush Available', desc: 'Emergency same-day service for urgent needs.' },
                ].map((point) => (
                  <div key={point.title} className="flex gap-4 items-start group">
                    <div className="w-1.5 h-1.5 bg-[#E8620A] mt-2 shrink-0 rounded-full"></div>
                    <div>
                      <p className="font-black text-white text-sm uppercase tracking-wider">{point.title}</p>
                      <p className="text-gray-500 text-xs mt-1 leading-relaxed">{point.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
