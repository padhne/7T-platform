import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import FeaturesBar from '@/components/home/FeaturesBar';
import AboutSection from '@/components/home/AboutSection';
import CraftsmanshipSection from '@/components/home/CraftsmanshipSection';
import MissionVisionSection from '@/components/home/MissionVisionSection';
import PremiumFabricsSection from '@/components/home/PremiumFabricsSection';
import ProductCategories from '@/components/home/ProductCategories';
import AlterationsSection from '@/components/home/AlterationsSection';
import ValuesSection from '@/components/home/ValuesSection';
import ContactSection from '@/components/home/ContactSection';

export default function Home() {
  return (
    <div className="w-full">
      {/* 1. Hero */}
      <HeroSection />

      {/* 2. Features bar */}
      <FeaturesBar />

      {/* 3. About / Brand Story */}
      <AboutSection />

      {/* 4. Craftsmanship */}
      {/* <CraftsmanshipSection /> */}

      {/* 5. Mission & Vision */}
      {/* <MissionVisionSection /> */}

      {/* 6. Premium Fabrics */}
      {/* <PremiumFabricsSection /> */}

      {/* 7. Product Categories */}
      <ProductCategories />

      {/* 8. Alterations */}
      {/* <AlterationsSection /> */}

      {/* 9. Values */}
      <ValuesSection />

      {/* 10. Contact */}
      {/* <ContactSection /> */}
    </div>
  );
}
