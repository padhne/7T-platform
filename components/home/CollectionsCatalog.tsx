import React from 'react';
import { supabase } from '@/lib/supabase/client';
import CollectionsClient, { type DynamicCategory } from './CollectionsClient';

export default async function CollectionsCatalog() {
  // Fetch categories
  const { data: categoriesData } = await supabase
    .from('categories')
    .select('*')
    .order('created_at', { ascending: false });

  // Fetch images
  const { data: imagesData } = await supabase
    .from('category_images')
    .select('*')
    .order('created_at', { ascending: false });

  // Map to the required structure
  const dynamicCategories: DynamicCategory[] = (categoriesData || []).map((cat) => {
    const catImages = (imagesData || []).filter(img => img.category_id === cat.id);
    
    return {
      id: cat.id,
      label: cat.name,
      heading: cat.name,
      items: catImages.map(img => ({
        id: img.id,
        img: img.image_url,
        title: cat.name, // Fallback since we don't have individual titles for images yet
        desc: '' // Empty for now as per our discussion
      }))
    };
  });

  return <CollectionsClient categories={dynamicCategories} />;
}
