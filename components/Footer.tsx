'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase/client';

export default function Footer() {
  const [categories, setCategories] = useState<{id: string, name: string, slug?: string}[]>([]);
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      const [catsRes, settingsRes] = await Promise.all([
        supabase.from('categories').select('id, name, slug').order('created_at', { ascending: false }),
        supabase.from('site_settings').select('*').eq('id', 1).single()
      ]);
      if (catsRes.data) setCategories(catsRes.data);
      if (settingsRes.data) setSettings(settingsRes.data);
    }
    fetchData();
  }, []);

  const phone1 = settings?.phone1 || '+974 5501 6644';
  const phone2 = settings?.phone2 || '';
  const email = settings?.email || 'info.tiptopuniforms@gmail.com';
  const address = settings?.address || 'Shop No. F-62, Al Jaher Center, Doha-Qatar';
  
  // Format phone for links by stripping non-numeric (except +)
  const phone1Link = phone1.replace(/[^\d+]/g, '');
  const phone2Link = phone2.replace(/[^\d+]/g, '');

  return (
    <footer className="bg-[#111111] text-white pt-20 pb-10 relative overflow-hidden">
      {/* Decorative 7T watermark */}
      <div className="absolute bottom-0 right-8 select-none pointer-events-none opacity-[0.04] leading-none"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        <span className="text-[18rem] font-black italic text-[#E8620A]">7</span>
        <span className="text-[18rem] font-black italic text-white">T</span>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 md:px-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Column 1: Brand */}
          <div>
            {/* Logo */}
            <div className="flex items-end gap-2 mb-6">
              <span className="text-[48px] font-black italic text-[#E8620A] leading-none"
                style={{ fontFamily: "'Playfair Display', serif" }}>7</span>
              <span className="text-[48px] font-black italic text-white/60 leading-none"
                style={{ fontFamily: "'Playfair Display', serif" }}>T</span>
            </div>
            <p className="text-[11px] font-black tracking-[0.22em] text-white uppercase mb-1">Tip Top Uniforms Trading</p>
            <p className="text-[9px] text-[#E8620A] font-bold tracking-[0.22em] uppercase mb-6">Doha, Qatar</p>

            <div className="space-y-3 text-sm text-gray-400">
              <div className="flex items-start gap-3">
                <MapPin size={14} className="text-[#E8620A] mt-0.5 shrink-0" />
                <span className="whitespace-pre-line">{address}</span>
              </div>
              <a href={`tel:${phone1Link}`} className="flex items-center gap-3 hover:text-[#E8620A] transition-colors">
                <Phone size={14} className="text-[#E8620A] shrink-0" />
                {phone1}
              </a>
              {phone2 && (
                <a href={`tel:${phone2Link}`} className="flex items-center gap-3 hover:text-[#E8620A] transition-colors">
                  <Phone size={14} className="text-[#E8620A] shrink-0" />
                  {phone2}
                </a>
              )}
              <a href={`mailto:${email}`} className="flex items-center gap-3 hover:text-[#E8620A] transition-colors">
                <Mail size={14} className="text-[#E8620A] shrink-0" />
                {email}
              </a>
            </div>

            <a href={`https://wa.me/${phone1Link.replace('+', '')}`} target="_blank" rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white text-xs font-bold py-2.5 px-5 rounded-full transition-colors"
            >
              <MessageCircle size={13} />
              WhatsApp Chat
            </a>
          </div>

          {/* Column 2: Collections */}
          <div className="md:col-span-1 lg:col-span-2 lg:pl-12">
            <h3 className="text-xs font-bold mb-6 tracking-[0.2em] uppercase text-white border-b border-white/10 pb-4">Collections</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-8 text-sm text-gray-400">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link href={`/collections/${cat.slug || cat.id}`} className="hover:text-[#E8620A] transition-colors flex items-center gap-2">
                    <span className="w-4 h-px bg-[#E8620A]/50 inline-block"></span>
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Column 3: Philosophy */}
          <div>
            <h3 className="text-xs font-bold mb-6 tracking-[0.2em] uppercase text-white border-b border-white/10 pb-4">Our Philosophy</h3>
            <div className="border-l-2 border-[#E8620A] pl-4">
              <p className="text-xs text-gray-500 italic leading-relaxed">
                "Think Big. Think Different. Think Fast. Aim for the best."
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600">
          <p>© 2026 Tip Top Uniforms Trading · Doha, Qatar. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <span className="text-[#E8620A] font-bold tracking-widest uppercase text-[10px]">Follow Us</span>
            {settings?.facebook_url && (
              <a href={settings.facebook_url} target="_blank" rel="noopener noreferrer" className="hover:text-[#E8620A] transition-colors font-semibold">
                Facebook
              </a>
            )}
            {settings?.instagram_url && (
              <a href={settings.instagram_url} target="_blank" rel="noopener noreferrer" className="hover:text-[#E8620A] transition-colors font-semibold">
                Instagram
              </a>
            )}
            {settings?.linkedin_url && (
              <a href={settings.linkedin_url} target="_blank" rel="noopener noreferrer" className="hover:text-[#E8620A] transition-colors font-semibold">
                LinkedIn
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
