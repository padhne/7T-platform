import React from 'react';
import type { Metadata } from 'next';
import AboutSection from '@/components/home/AboutSection';
import CraftsmanshipSection from '@/components/home/CraftsmanshipSection';
import MissionVisionSection from '@/components/home/MissionVisionSection';
import ValuesSection from '@/components/home/ValuesSection';

export const metadata: Metadata = {
  title: 'About Tip Top Uniforms Trading W.L.L',
  description:
    'About Tip Top Uniforms (TipTop Uniforms Trading W.L.L): a Doha-based uniform maker and tailor serving Qatar since 1998. Our story, craftsmanship, mission and values.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About Tip Top Uniforms Qatar',
    description:
      'A Doha-based uniform maker and tailor serving Qatar since 1998.',
    url: '/about',
  },
};


export default function AboutPage() {
  return (
    <div className="w-full">
      <AboutSection />
      <CraftsmanshipSection />
      <MissionVisionSection />
      <ValuesSection />
    </div>
  );
}
