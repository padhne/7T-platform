'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export function ConditionalHeader() {
  const pathname = usePathname();
  if (pathname?.startsWith('/dashboard') || pathname?.startsWith('/login')) {
    return null;
  }
  return <Header />;
}

export function ConditionalFooter() {
  const pathname = usePathname();
  if (pathname?.startsWith('/dashboard') || pathname?.startsWith('/login')) {
    return null;
  }
  return <Footer />;
}
