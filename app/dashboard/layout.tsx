import React from 'react';
import Link from 'next/link';
import { LayoutDashboard, LogOut, Settings, Image as ImageIcon, Home } from 'lucide-react';
import { logoutAction } from '@/app/login/actions';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:block">
        <div className="h-full flex flex-col">
          <div className="h-16 flex items-center px-6 border-b border-gray-200">
            <span className="text-xl font-bold text-gray-800">Dashboard</span>
          </div>
          
          <nav className="flex-1 px-4 py-6 space-y-1">
            <Link 
              href="/dashboard" 
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <LayoutDashboard className="w-5 h-5 mr-3" />
              Overview
            </Link>
            <Link 
              href="/dashboard/categories" 
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ImageIcon className="w-5 h-5 mr-3" />
              Categories & Images
            </Link>
            <Link 
              href="/dashboard/settings" 
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Settings className="w-5 h-5 mr-3" />
              Global Settings
            </Link>
            <Link 
              href="/" 
              className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <Home className="w-5 h-5 mr-3" />
              Back to Site
            </Link>
          </nav>
          
          <div className="p-4 border-t border-gray-200">
            <form action={logoutAction}>
              <button type="submit" className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                <LogOut className="w-4 h-4 mr-3" />
                Sign Out
              </button>
            </form>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:hidden">
          <span className="text-xl font-bold text-gray-800">Dashboard</span>
          <button className="p-2 rounded-md hover:bg-gray-100">
            <LayoutDashboard className="w-6 h-6 text-gray-600" />
          </button>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
