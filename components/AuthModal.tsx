'use client';
import React, { useState } from 'react';
import { X } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-white p-8 shadow-2xl animate-fade-in-up">
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-black transition-colors"
        >
          <X size={24} />
        </button>

        {/* Header / Tabs */}
        <div className="flex gap-6 mb-8 border-b border-gray-200">
          <button 
            onClick={() => setIsLogin(true)}
            className={`pb-4 text-lg font-bold tracking-widest uppercase transition-colors ${
              isLogin ? 'text-[#8B1A3B] border-b-2 border-[#8B1A3B]' : 'text-gray-400 hover:text-black'
            }`}
          >
            Sign In
          </button>
          <button 
            onClick={() => setIsLogin(false)}
            className={`pb-4 text-lg font-bold tracking-widest uppercase transition-colors ${
              !isLogin ? 'text-[#8B1A3B] border-b-2 border-[#8B1A3B]' : 'text-gray-400 hover:text-black'
            }`}
          >
            Register
          </button>
        </div>

        {/* Form */}
        <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
          {!isLogin && (
            <div>
              <label className="block text-xs font-bold tracking-widest uppercase text-gray-700 mb-2">Full Name</label>
              <input 
                type="text" 
                className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-[#8B1A3B] transition-colors"
                placeholder="John Doe"
              />
            </div>
          )}
          
          <div>
            <label className="block text-xs font-bold tracking-widest uppercase text-gray-700 mb-2">Email Address</label>
            <input 
              type="email" 
              className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-[#8B1A3B] transition-colors"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-xs font-bold tracking-widest uppercase text-gray-700">Password</label>
              {isLogin && (
                <a href="#" className="text-[10px] font-bold text-gray-400 hover:text-[#8B1A3B] uppercase tracking-wider">Forgot?</a>
              )}
            </div>
            <input 
              type="password" 
              className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-[#8B1A3B] transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit"
            className="mt-4 w-full bg-[#1C1C1C] hover:bg-[#8B1A3B] text-white font-bold tracking-widest uppercase py-4 transition-colors"
          >
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  );
}
