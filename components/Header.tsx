'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, User, ShoppingBag, Menu, X, Phone, Mail, MapPin } from 'lucide-react';
import { uniformCategories } from '@/data/collections';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Collections', href: '/collections' },
    { label: 'Services', href: '/services' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <header className={`w-full bg-white sticky top-0 z-50 transition-shadow duration-300 ${scrolled ? 'shadow-md' : ''}`}>

      {/* Top Info Bar */}
      <div className="bg-[#1C1C1C] text-white text-xs py-2 px-4 md:px-8">
        <div className="max-w-[1600px] mx-auto flex justify-between items-center gap-4">
          <div className="flex items-center gap-6">
            <a href="tel:+97433513924" className="flex items-center gap-1.5 hover:text-orange-400 transition-colors">
              <Phone size={11} />
              <span>+974 3351 3924</span>
            </a>
            <a href="mailto:info.tiptopuniforms@gmail.com" className="hidden md:flex items-center gap-1.5 hover:text-orange-400 transition-colors">
              <Mail size={11} />
              <span>info.tiptopuniforms@gmail.com</span>
            </a>
          </div>
          <div className="flex items-center gap-1.5 text-gray-400">
            <MapPin size={11} />
            <span className="hidden md:block">Umm Ghuwalina St. 874, Zone 27, Doha, Qatar</span>
            <span className="md:hidden">Doha, Qatar</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-5 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group" aria-label="Tip Top Uniforms Trading">
          {/* 7T Mark */}
          <div className="relative flex items-end leading-none select-none">
            <span className="text-[42px] font-black italic text-[#E8620A] leading-none tracking-tighter" style={{ fontFamily: "'Playfair Display', serif" }}>7</span>
            <span className="text-[42px] font-black italic text-[#3A3A3A] leading-none tracking-tighter" style={{ fontFamily: "'Playfair Display', serif" }}>T</span>
          </div>
          <div className="flex flex-col border-l-2 border-[#E8620A] pl-3">
            <span className="text-[13px] font-black tracking-[0.18em] leading-tight text-[#1C1C1C] uppercase">Tip Top Uniforms</span>
            <span className="text-[9px] font-bold text-[#E8620A] uppercase tracking-[0.22em] mt-0.5">Trading · Doha, Qatar</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
            return (
              <Link key={item.label} href={item.href}
                className={`nav-link text-[13px] font-bold tracking-widest uppercase transition-colors ${
                  isActive ? 'text-[#E8620A] border-b-2 border-[#E8620A]' : 'text-gray-700 hover:text-[#E8620A]'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-5">
          <button className="text-gray-700 hover:text-[#E8620A] transition-colors hidden md:block" aria-label="Search">
            <Search size={20} strokeWidth={1.8} />
          </button>
          <Link href="#" className="relative text-gray-700 hover:text-[#E8620A] transition-colors" aria-label="Cart">
            <ShoppingBag size={20} strokeWidth={1.8} />
            <span className="absolute -top-1.5 -right-2 bg-[#E8620A] text-white text-[9px] font-black rounded-full w-4 h-4 flex items-center justify-center">0</span>
          </Link>
          <a
            href="https://wa.me/97433513924"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-xs font-bold py-2.5 px-5 rounded-full transition-colors tracking-wider"
          >
            WhatsApp
          </a>
          {/* Mobile Menu Toggle */}
          <button className="lg:hidden text-gray-700 hover:text-[#E8620A] transition-colors" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Category Strip */}
      <div className="border-t border-gray-100 bg-[#FAF8F4] hidden md:block">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8">
          <ul className="flex items-center gap-8 py-2.5 overflow-x-auto text-[11px] font-bold tracking-widest uppercase">
            {uniformCategories.map((cat) => {
              const isActive = pathname === `/collections/${cat.id}`;
              return (
                <li key={cat.id}>
                  <Link 
                    href={`/collections/${cat.id}`} 
                    className={`whitespace-nowrap transition-colors ${
                      isActive ? 'text-[#E8620A]' : 'text-gray-500 hover:text-[#E8620A]'
                    }`}
                  >
                    {cat.label}
                  </Link>
                </li>
              );
            })}
            <li>
              <Link 
                href="/services" 
                className={`whitespace-nowrap transition-colors ${
                  pathname === '/services' ? 'text-[#E8620A]' : 'text-gray-500 hover:text-[#E8620A]'
                }`}
              >
                Alterations
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {menuOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white shadow-xl absolute w-full left-0 top-full z-50">
          <nav className="max-w-[1600px] mx-auto px-6 py-6 flex flex-col gap-4">
            {navLinks.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
              return (
                <Link key={item.label} href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`text-sm font-bold tracking-widest uppercase py-2 border-b border-gray-100 ${
                    isActive ? 'text-[#E8620A]' : 'text-gray-700 hover:text-[#E8620A]'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <a
              href="https://wa.me/97433513924"
              className="mt-2 inline-flex items-center justify-center gap-2 bg-green-600 text-white text-xs font-bold py-3 px-6 rounded-full"
            >
              Chat on WhatsApp
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
