import React from 'react';
import AboutSection from '@/components/home/AboutSection';
import CraftsmanshipSection from '@/components/home/CraftsmanshipSection';
import MissionVisionSection from '@/components/home/MissionVisionSection';
import ValuesSection from '@/components/home/ValuesSection';

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
