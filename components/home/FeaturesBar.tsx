'use client';

import { Scissors, Sparkles, Clock, ShieldCheck } from 'lucide-react';

const features = [
  {
    icon: <Scissors size={36} strokeWidth={1.2} />,
    title: 'IN-HOUSE TAILORING',
    subtitle: 'BESPOKE & MTM',
  },
  {
    icon: <Sparkles size={36} strokeWidth={1.2} />,
    title: 'PREMIUM FABRICS',
    subtitle: 'FINEST SELECTIONS',
  },
  {
    icon: <Clock size={36} strokeWidth={1.2} />,
    title: 'FAST TURNAROUND',
    subtitle: 'RUSH SERVICES',
  },
  {
    icon: <ShieldCheck size={36} strokeWidth={1.2} />,
    title: 'FITTING GUARANTEE',
    subtitle: 'PERFECT FIT',
  },
];

export default function FeaturesBar() {
  return (
    <section className="w-full bg-black py-4 border-b border-gray-800">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0">
          {features.map((f, i) => (
            <div key={i} className="flex items-center gap-4 flex-1 justify-center first:justify-start last:justify-end">
              <div className="text-white">
                {f.icon}
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-white text-[13px] tracking-widest uppercase leading-tight">
                  {f.title}
                </span>
                <span className="font-medium text-gray-400 text-[10px] tracking-widest uppercase mt-0.5">
                  {f.subtitle}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
