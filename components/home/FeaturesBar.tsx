'use client';

import { Scissors, Star, Clock, Award } from 'lucide-react';

const features = [
  {
    icon: <Scissors size={28} strokeWidth={1.5} />,
    title: 'In-House Tailoring',
    desc: 'Every garment crafted in our own atelier by skilled, experienced tailors.',
  },
  {
    icon: <Star size={28} strokeWidth={1.5} />,
    title: 'Premium Fabrics',
    desc: 'Wool, silk, cotton, laser-cut, embroidered, and handmade artwork options.',
  },
  {
    icon: <Clock size={28} strokeWidth={1.5} />,
    title: 'Fast Turnaround',
    desc: 'Rush services available. Emergency alterations done same day.',
  },
  {
    icon: <Award size={28} strokeWidth={1.5} />,
    title: 'Fitting Guarantee',
    desc: 'World-class bespoke tailoring — we guarantee the fit or we fix it free.',
  },
];

export default function FeaturesBar() {
  return (
    <section className="w-full bg-[#1C1C1C] py-0">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
          {features.map((f, i) => (
            <div key={i}
              className="group flex flex-col items-start gap-3 px-8 py-10 hover:bg-[#E8620A] transition-all duration-300 cursor-default"
            >
              <div className="text-[#E8620A] group-hover:text-white transition-colors duration-300">
                {f.icon}
              </div>
              <h3 className="font-black text-white text-sm tracking-widest uppercase leading-tight">
                {f.title}
              </h3>
              <p className="text-gray-400 group-hover:text-white/80 text-xs leading-relaxed transition-colors duration-300">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
