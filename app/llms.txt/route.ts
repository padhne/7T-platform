// /llms.txt — a plain-text summary of the business for AI assistants (see llmstxt.org).
import { supabase } from '@/lib/supabase/client';
import { SITE, SITE_URL } from '@/lib/site';
import { FAQS } from '@/lib/faq';

export const revalidate = 3600;

export async function GET() {
  const { data: categories } = await supabase.from('categories').select('*').order('name');

  const collections = (categories ?? [])
    .map((c) => `- [${c.name}](${SITE_URL}/collections/${c.slug || c.id})`)
    .join('\n');

  const body = `# ${SITE.legalName}

> ${SITE.description}

Also known as: ${SITE.alternateNames.join(', ')}.

## Key facts
- Business: uniform maker and bespoke tailor
- Location: ${SITE.address.streetAddress}, ${SITE.address.addressLocality}, Qatar
- Phone / WhatsApp: +974 5501 6644, +974 6690 1189
- Email: ${SITE.email}
- Serving Qatar since: ${SITE.foundingYear}
- Area served: Doha and all of Qatar

## Main pages
- [Home](${SITE_URL}/): overview of Tip Top Uniforms
- [Collections](${SITE_URL}/collections): all uniform categories
- [Services](${SITE_URL}/services): tailoring, alterations and repairs
- [About](${SITE_URL}/about): company story, mission and values
- [FAQ](${SITE_URL}/faq): common questions with direct answers
- [Contact](${SITE_URL}/contact): address, phone and email

## Uniform collections
${collections || '- See ' + SITE_URL + '/collections'}

## FAQ
${FAQS.map(({ q, a }) => `### ${q}\n${a}`).join('\n\n')}
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
