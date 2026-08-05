import React from 'react';
import type { Metadata } from 'next';
import AlterationsSection from '@/components/home/AlterationsSection';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Professional uniform alterations, repairs, and made-to-measure tailoring services in Doha, Qatar. Quick turnaround, premium finish.',
  alternates: { canonical: '/services' },
  openGraph: {
    title: 'Services | Tip Top Uniforms Trading',
    description:
      'Professional uniform alterations, repairs, and made-to-measure tailoring services in Doha, Qatar.',
    url: 'https://tiptopuniforms.com/services',
  },
};


export default function ServicesPage() {
  return (
    <div className="w-full">
      <AlterationsSection />
    </div>
  );
}
