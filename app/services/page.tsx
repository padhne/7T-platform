import React from 'react';
import type { Metadata } from 'next';
import AlterationsSection from '@/components/home/AlterationsSection';

export const metadata: Metadata = {
  title: 'Tailoring, Alterations & Uniform Repairs in Doha',
  description:
    'Tip Top Uniforms offers uniform alterations, repairs and made-to-measure tailoring in Doha, Qatar, with quick turnaround.',
  alternates: { canonical: '/services' },
  openGraph: {
    title: 'Tailoring & Alterations in Doha | Tip Top Uniforms',
    description:
      'Uniform alterations, repairs and made-to-measure tailoring in Doha, Qatar.',
    url: '/services',
  },
};


export default function ServicesPage() {
  return (
    <div className="w-full">
      <AlterationsSection />
    </div>
  );
}
