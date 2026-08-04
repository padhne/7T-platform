'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, User, ShoppingBag, Menu, X } from 'lucide-react';
import { uniformCategories } from '@/data/collections';
import AuthModal from '@/components/AuthModal';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'HOMEPAGE', href: '/' },
    { label: 'PRODUCTS', href: '/collections' },
    // { label: 'PROMOTIONAL PROJECTS', href: '/promotional' },
    { label: 'CONTACT', href: '/contact' },
  ];

  const subNavLinks = [
    { label: 'Aprons', href: '/collections/aprons' },
    { label: 'Tops', href: '/collections/tops' },
    { label: 'Bottoms', href: '/collections/bottoms' },
    { label: 'Chef', href: '/collections/chef' },
    { label: 'Suiting', href: '/collections/suiting' },
    { label: 'Products', href: '/collections' },
  ];

  return (
    <>
      <header className={`w-full bg-white z-50 transition-shadow duration-300 ${scrolled ? 'shadow-md sticky top-0' : 'relative'}`}>
        <div className="max-w-[1600px] mx-auto px-4 md:px-8">

          {/* Top Section */}
          <div className="flex flex-col md:flex-row items-center justify-between py-6">

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
              <a href="tel:+97455016644" className="text-[13px] font-medium text-[#1C1C1C] hover:text-[#8B1A3B] transition-colors">
                +974 5501 6644
              </a>
              <button className="text-gray-900 hover:text-[#8B1A3B] transition-colors" aria-label="Search">
                <Search size={20} strokeWidth={1.5} />
              </button>
            </div>

            {/* Actions (Right) */}
            {/* <div className="flex items-center gap-6 mt-4 md:mt-0">
              <Link href="#" className="flex items-center gap-2 text-gray-900 hover:text-[#8B1A3B] transition-colors" aria-label="Cart">
                <ShoppingBag size={20} strokeWidth={1.5} />
                <span className="bg-[#EFA7A7] text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">0</span>
              </Link>
              <button onClick={() => setAuthModalOpen(true)} className="text-gray-900 hover:text-[#8B1A3B] transition-colors" aria-label="User Account">
                <User size={22} strokeWidth={1.5} />
              </button>
              <a href="/catalog" className="text-[12px] font-bold text-[#1C1C1C] border-b-[1.5px] border-[#1C1C1C] hover:text-[#8B1A3B] hover:border-[#8B1A3B] pb-0.5 transition-colors uppercase tracking-wide">
                GET CATALOGUE
              </a>
              <button className="md:hidden text-gray-900 ml-2" onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div> */}
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

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white shadow-xl absolute w-full left-0 top-full z-50">
            <nav className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((item) => (
                <Link key={item.label} href={item.href} onClick={() => setMenuOpen(false)}
                  className="text-[13px] font-bold tracking-widest uppercase py-2 border-b border-gray-100 text-gray-700"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </>
  );
}
