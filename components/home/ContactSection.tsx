'use client';
import React from 'react';
import { MapPin, Phone, Mail, MessageCircle } from 'lucide-react';

export default function ContactSection() {
  return (
    <section id="contact" className="w-full bg-[#FAF8F4] py-28">
      <div className="max-w-[1600px] mx-auto px-4 md:px-16">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">

          {/* Left: Info */}
          <div>
            <span className="text-[#E8620A] font-bold tracking-[0.28em] uppercase text-xs mb-4 block">Get In Touch</span>
            <h2 className="text-4xl md:text-5xl font-black text-[#1C1C1C] mb-8 leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Let's Create<br />
              <span className="italic text-[#E8620A]">Your Uniform</span>
            </h2>
            <div className="w-12 h-[3px] bg-[#E8620A] rounded-full mb-10"></div>

            <div className="space-y-8">
              <div className="flex gap-5 items-start group">
                <div className="w-12 h-12 bg-[#E8620A] flex items-center justify-center shrink-0 text-white">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="font-black text-[#1C1C1C] text-sm uppercase tracking-wider mb-1">Our Address</p>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    Umm Ghuwalina Street no. 874<br />
                    Zone no. 27, Doha, Qatar
                  </p>
                </div>
              </div>

              <div className="flex gap-5 items-start">
                <div className="w-12 h-12 bg-[#1C1C1C] flex items-center justify-center shrink-0 text-white">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="font-black text-[#1C1C1C] text-sm uppercase tracking-wider mb-1">Mobile</p>
                  <a href="tel:+97433513924" className="text-gray-500 text-sm hover:text-[#E8620A] transition-colors block">+974 3351 3924</a>
                  <a href="tel:+97455016644" className="text-gray-500 text-sm hover:text-[#E8620A] transition-colors block">+974 5501 6644</a>
                </div>
              </div>

              <div className="flex gap-5 items-start">
                <div className="w-12 h-12 bg-[#3A3A3A] flex items-center justify-center shrink-0 text-white">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="font-black text-[#1C1C1C] text-sm uppercase tracking-wider mb-1">Email</p>
                  <a href="mailto:info.tiptopuniforms@gmail.com" className="text-gray-500 text-sm hover:text-[#E8620A] transition-colors">
                    info.tiptopuniforms@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/97433513924?text=Hello!%20I%20would%20like%20to%20enquire%20about%20uniforms."
              target="_blank" rel="noopener noreferrer"
              className="mt-10 inline-flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 transition-all duration-200 uppercase tracking-widest text-sm"
            >
              <MessageCircle size={18} />
              Chat on WhatsApp
            </a>
          </div>

          {/* Right: Contact form */}
          <div className="bg-white p-10 shadow-sm border border-gray-100">
            <h3 className="font-black text-[#1C1C1C] text-xl uppercase tracking-wider mb-8">Send an Enquiry</h3>
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">First Name</label>
                  <input
                    type="text"
                    className="w-full border border-gray-200 focus:border-[#E8620A] outline-none px-4 py-3 text-sm text-gray-700 transition-colors"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Last Name</label>
                  <input
                    type="text"
                    className="w-full border border-gray-200 focus:border-[#E8620A] outline-none px-4 py-3 text-sm text-gray-700 transition-colors"
                    placeholder="Doe"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full border border-gray-200 focus:border-[#E8620A] outline-none px-4 py-3 text-sm text-gray-700 transition-colors"
                  placeholder="john@company.com"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Uniform Category</label>
                <select className="w-full border border-gray-200 focus:border-[#E8620A] outline-none px-4 py-3 text-sm text-gray-700 transition-colors bg-white">
                  <option value="">Select a category...</option>
                  {['Corporate', 'Industrial', 'Hospitality', 'School', 'Healthcare', 'Aviation', 'Chef', 'Alterations'].map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Message</label>
                <textarea
                  rows={4}
                  className="w-full border border-gray-200 focus:border-[#E8620A] outline-none px-4 py-3 text-sm text-gray-700 transition-colors resize-none"
                  placeholder="Tell us about your uniform requirements..."
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#E8620A] hover:bg-[#CF5507] text-white font-bold py-4 px-8 transition-all duration-200 uppercase tracking-widest text-sm"
              >
                Send Enquiry
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
