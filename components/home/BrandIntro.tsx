import React from 'react';

export default function BrandIntro() {
  return (
    <section className="max-w-[1000px] mx-auto px-4 md:px-8 py-16 text-center">
      <div className="flex flex-col items-center justify-center">
        <p className="text-gray-600 text-lg md:text-2xl font-light leading-relaxed mb-12">
          Tip Top Uniforms has been providing Tailoring, Alteration & Repair Services 
          to the people of QATAR for over 22 years Since the 1998.
        </p>
        
        {/* Simple Text Logo instead of image for the intro block */}
        <div className="flex flex-col items-center">
          <span className="text-5xl text-red-900 font-serif italic font-bold tracking-tight mb-2">7T</span>
          <div className="flex flex-col items-center border-t border-gray-300 pt-2">
            <span className="text-xs font-black tracking-widest leading-none">TIP TOP UNIFORMS</span>
            <span className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Made in Qatar</span>
          </div>
        </div>
      </div>
    </section>
  );
}
