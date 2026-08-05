'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, User, ShoppingBag, Menu, X, Home, Grid, Phone } from 'lucide-react';
import AuthModal from '@/components/AuthModal';
import { supabase } from '@/lib/supabase/client';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const pathname = usePathname();

  const [subNavLinks, setSubNavLinks] = useState<{label: string, href: string}[]>([]);
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    // Fetch categories and settings
    const fetchData = async () => {
      const [catsRes, settingsRes] = await Promise.all([
        supabase.from('categories').select('id, name').order('created_at', { ascending: false }),
        supabase.from('site_settings').select('phone1').eq('id', 1).single()
      ]);
      if (catsRes.data) {
        setSubNavLinks(catsRes.data.map((cat: any) => ({
          label: cat.name,
          href: `/collections/${cat.id}`
        })));
      }
      if (settingsRes.data) {
        setSettings(settingsRes.data);
      }
    };
    fetchData();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'HOMEPAGE', href: '/' },
    { label: 'PRODUCTS', href: '/collections' },
    // { label: 'PROMOTIONAL PROJECTS', href: '/promotional' },
    { label: 'CONTACT', href: '/contact' },
  ];

  // subNavLinks is now state

  return (
    <>
      <header className={`w-full bg-white z-50 transition-shadow duration-300 ${scrolled ? 'shadow-md sticky top-0' : 'relative'}`}>
        <div className="max-w-[1600px] mx-auto px-4 md:px-8">

          {/* Top Section */}
          <div className="flex flex-row items-center justify-between py-4 md:py-6">

            {/* Logo (Left) */}
            <Link href="/" className="flex items-center gap-3 group" aria-label="Tip Top Uniforms Trading">
              <div className="relative flex items-end leading-none select-none">
                <span className="text-[42px] font-black italic text-[#8B1A3B] leading-none tracking-tighter" style={{ fontFamily: "'Playfair Display', serif" }}>7</span>
                <span className="text-[42px] font-black italic text-[#8B1A3B] leading-none tracking-tighter" style={{ fontFamily: "'Playfair Display', serif" }}>T</span>
              </div>
              <div className="flex flex-col border-l-2 border-gray-300 pl-3">
                <span className="text-[14px] font-bold tracking-widest leading-tight text-[#1C1C1C] uppercase">TIP TOP UNIFORMS</span>
                <span className="text-[9px] font-medium text-gray-500 uppercase tracking-widest mt-0.5">MADE IN QATAR</span>
              </div>
            </Link>

            {/* Middle Info (Phone & Search) */}
            <div className="hidden md:flex items-center gap-6">
              <a href={`tel:${(settings?.phone1 || '+974 5501 6644').replace(/[^\d+]/g, '')}`} className="text-[13px] font-medium text-[#1C1C1C] hover:text-[#8B1A3B] transition-colors">
                {settings?.phone1 || '+974 5501 6644'}
              </a>
              <button className="text-gray-900 hover:text-[#8B1A3B] transition-colors" aria-label="Search">
                <Search size={20} strokeWidth={1.5} />
              </button>
            </div>

            {/* Mobile Top Right Actions */}
            <div className="flex md:hidden items-center gap-4">
              <button className="text-gray-900" aria-label="Search">
                <Search size={22} strokeWidth={1.5} />
              </button>
              <button className="text-gray-900" onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <X size={26} strokeWidth={1.5} /> : <Menu size={26} strokeWidth={1.5} />}
              </button>
            </div>
          </div>

          {/* Main Nav (Bottom of top section) */}
          <nav className="hidden md:flex items-center gap-8 pb-5">
            {navLinks.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
              return (
                <Link key={item.label} href={item.href}
                  className={`text-[13px] font-bold uppercase tracking-wider transition-colors ${isActive ? 'text-[#1C1C1C] border-b-2 border-[#1C1C1C] pb-1' : 'text-gray-600 hover:text-[#1C1C1C]'
                    }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sub Nav / Category Strip (Light Gray) */}
        <div className="bg-[#F5F5F5] border-y border-gray-200 hidden md:block">
          <div className="max-w-[1600px] mx-auto px-4 md:px-8">
            <ul className="flex items-center gap-8 py-3 overflow-x-auto text-[13px] font-medium text-gray-700">
              {subNavLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="whitespace-nowrap hover:text-black transition-colors capitalize"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Mobile Hamburger Menu (Categories) */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white shadow-xl absolute w-full left-0 top-full z-50">
            <div className="px-6 py-4 flex flex-col gap-1">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Categories</h3>
              {subNavLinks.map((item) => (
                <Link key={item.label} href={item.href} onClick={() => setMenuOpen(false)}
                  className="text-[14px] font-semibold py-3 border-b border-gray-50 text-gray-800 flex items-center justify-between"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] z-50 pb-safe">
        <div className="flex justify-around items-center h-16">
          <Link href="/" className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${pathname === '/' ? 'text-[#8B1A3B]' : 'text-gray-500'}`}>
            <Home size={22} strokeWidth={pathname === '/' ? 2.5 : 1.5} />
            <span className="text-[10px] font-semibold">Home</span>
          </Link>
          <Link href="/collections" className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${pathname.startsWith('/collections') ? 'text-[#8B1A3B]' : 'text-gray-500'}`}>
            <Grid size={22} strokeWidth={pathname.startsWith('/collections') ? 2.5 : 1.5} />
            <span className="text-[10px] font-semibold">Products</span>
          </Link>
          <Link href="/contact" className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${pathname === '/contact' ? 'text-[#8B1A3B]' : 'text-gray-500'}`}>
            <Phone size={22} strokeWidth={pathname === '/contact' ? 2.5 : 1.5} />
            <span className="text-[10px] font-semibold">Contact</span>
          </Link>
        </div>
      </div>

      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </>
  );
}
