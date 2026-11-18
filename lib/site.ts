// Central business / SEO configuration. Used by metadata, sitemap, robots and JSON-LD.
// Set NEXT_PUBLIC_SITE_URL to the live domain (no trailing slash) in production.

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://tiptopuniforms.com').replace(/\/+$/, '');

export const SITE = {
  name: 'Tip Top Uniforms',
  legalName: 'Tip Top Uniforms Trading W.L.L',
  // Spellings people actually type into Google — used for WebSite/Organization alternateName.
  alternateNames: [
    'TipTop Uniforms',
    'Tip Top Uniforms Qatar',
    'TipTop Uniforms Qatar',
    'Tip Top Uniforms Doha',
    'Tip Top Uniforms Trading',
    'Tip Top Uniforms Trading WLL',
    'Tiptop Uniform Qatar',
  ],
  tagline: 'Uniforms & Bespoke Tailoring in Doha, Qatar',
  description:
    'Tip Top Uniforms (TipTop Uniforms Trading W.L.L) is a uniform manufacturer and bespoke tailor in Doha, Qatar — corporate, school, hospitality, hotel, restaurant, industrial and workwear uniforms, made to measure since 1998.',
  email: 'info.tiptopuniforms@gmail.com',
  phones: ['+97455016644', '+97466901189'],
  phoneDisplay: '+974 5501 6644',
  address: {
    streetAddress: 'Shop No. F-62, Al Jaher Center',
    addressLocality: 'Doha',
    addressCountry: 'QA',
  },
  foundingYear: '1998',
  logo: '/images/logo.png',
} as const;

export const SEO_KEYWORDS = [
  'Tip Top Uniforms',
  'TipTop Uniforms',
  'Tip Top Uniforms Qatar',
  'TipTop Uniforms Qatar',
  'Tip Top Uniforms Doha',
  'Tip Top Uniforms Trading W.L.L',
  'uniforms Qatar',
  'uniform company in Qatar',
  'uniform shop Doha',
  'uniform manufacturer Qatar',
  'school uniforms Qatar',
  'school uniforms Doha',
  'corporate uniforms Qatar',
  'hotel uniforms Qatar',
  'restaurant uniforms Doha',
  'chef uniforms Qatar',
  'hospitality uniforms Qatar',
  'workwear Qatar',
  'industrial uniforms Qatar',
  'bespoke tailoring Doha',
  'tailor Doha',
  'uniform alterations Doha',
];

/** Serialize JSON-LD safely for a <script> tag (per Next.js docs). */
export function jsonLd(data: unknown) {
  return { __html: JSON.stringify(data).replace(/</g, '\\u003c') };
}

/** Organization / LocalBusiness / WebSite graph shared across the site. */
export function siteJsonLd() {
  const orgId = `${SITE_URL}/#organization`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['Organization', 'ClothingStore'],
        '@id': orgId,
        name: SITE.name,
        legalName: SITE.legalName,
        alternateName: SITE.alternateNames,
        description: SITE.description,
        url: SITE_URL,
        logo: `${SITE_URL}${SITE.logo}`,
        image: `${SITE_URL}/images/hero_bg.png`,
        email: SITE.email,
        telephone: SITE.phones[0],
        foundingDate: SITE.foundingYear,
        priceRange: '$$',
        address: { '@type': 'PostalAddress', ...SITE.address },
        areaServed: { '@type': 'Country', name: 'Qatar' },
        contactPoint: SITE.phones.map((telephone) => ({
          '@type': 'ContactPoint',
          telephone,
          contactType: 'customer service',
          areaServed: 'QA',
          availableLanguage: ['English', 'Arabic'],
        })),
        knowsAbout: [
          'School uniforms',
          'Corporate uniforms',
          'Hospitality uniforms',
          'Chef uniforms',
          'Industrial workwear',
          'Bespoke tailoring',
          'Uniform alterations',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE.name,
        alternateName: SITE.alternateNames,
        inLanguage: 'en',
        publisher: { '@id': orgId },
      },
    ],
  };
}
