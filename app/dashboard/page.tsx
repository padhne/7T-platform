import React from 'react';
import { supabase } from '@/lib/supabase/client';
import { FolderPlus, Image as ImageIcon, Activity } from 'lucide-react';
import Link from 'next/link';

export default async function DashboardOverview() {
  // Fetch total categories
  const { count: categoriesCount } = await supabase
    .from('categories')
    .select('*', { count: 'exact', head: true });

  // Fetch total images
  const { count: imagesCount } = await supabase
    .from('category_images')
    .select('*', { count: 'exact', head: true });

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Categories Stat */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
              <FolderPlus className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Categories</p>
              <h3 className="text-2xl font-bold text-gray-900">{categoriesCount || 0}</h3>
            </div>
          </div>
        </div>

        {/* Images Stat */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-lg text-green-600">
              <ImageIcon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Images</p>
              <h3 className="text-2xl font-bold text-gray-900">{imagesCount || 0}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex items-center gap-3">
          <div className="bg-purple-100 p-2 rounded-lg">
            <Activity className="w-5 h-5 text-purple-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800">Quick Actions</h2>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link 
            href="/dashboard/categories" 
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100 hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center gap-3">
              <FolderPlus className="w-5 h-5 text-gray-400" />
              <span className="font-medium text-gray-700">Manage Categories</span>
            </div>
            <span className="text-gray-400">→</span>
          </Link>

          <Link 
            href="/dashboard/categories" 
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100 hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center gap-3">
              <ImageIcon className="w-5 h-5 text-gray-400" />
              <span className="font-medium text-gray-700">Upload Images</span>
            </div>
            <span className="text-gray-400">→</span>
          </Link>
        </div>
      </div>

    </div>
  );
}
