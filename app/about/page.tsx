import React from 'react';
import type { Metadata } from 'next';
import AboutSection from '@/components/home/AboutSection';
import CraftsmanshipSection from '@/components/home/CraftsmanshipSection';
import MissionVisionSection from '@/components/home/MissionVisionSection';
import ValuesSection from '@/components/home/ValuesSection';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about Tip Top Uniforms Trading W.L.L — our story, craftsmanship, mission, and core values. Based in Doha, Qatar, we deliver bespoke workwear built to last.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About Us | Tip Top Uniforms Trading',
    description:
      'Learn about Tip Top Uniforms Trading W.L.L — our story, craftsmanship, mission, and core values. Based in Doha, Qatar.',
    url: 'https://tiptopuniforms.com/about',
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
