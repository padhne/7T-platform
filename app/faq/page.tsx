import React from 'react';
import type { Metadata } from 'next';
import { FAQS } from '@/lib/faq';
import { SITE_URL, jsonLd } from '@/lib/site';

export const metadata: Metadata = {
  title: 'FAQ: Uniforms & Tailoring in Qatar',
  description:
    'Answers about Tip Top Uniforms Qatar: location in Doha, contact numbers, uniform types, made-to-measure tailoring, and alteration services.',
  alternates: { canonical: '/faq' },
  openGraph: {
    title: 'FAQ | Tip Top Uniforms Qatar',
    description: 'Location, contact, uniform types and tailoring services of Tip Top Uniforms in Doha, Qatar.',
    url: '/faq',
  },
};

export default function FaqPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    url: `${SITE_URL}/faq`,
    about: { '@id': `${SITE_URL}/#organization` },
    mainEntity: FAQS.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };

  return (
    <div className="w-full bg-white pt-24 pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(structuredData)} />
      <div className="max-w-[900px] mx-auto px-4 md:px-8">
        <h1 className="text-4xl md:text-5xl font-black text-[#4B525A] mb-4" style={{ fontFamily: "'Lato', sans-serif" }}>
          Frequently Asked Questions
        </h1>
        <p className="text-[15px] text-gray-500 mb-12">About Tip Top Uniforms Trading W.L.L, Doha, Qatar.</p>

        <div className="divide-y divide-gray-200 border-y border-gray-200">
          {FAQS.map(({ q, a }) => (
            <section key={q} className="py-6">
              <h2 className="text-lg md:text-xl font-bold text-[#555C66] mb-2">{q}</h2>
              <p className="text-[15px] text-gray-600 leading-relaxed">{a}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
