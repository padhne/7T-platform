import React from 'react';

export default function ContactPage() {
  return (
    <div className="w-full bg-white pt-24 pb-20">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        
        {/* Main Header */}
        <h1 className="text-4xl md:text-5xl font-black text-[#4B525A] mb-6" style={{ fontFamily: "'Lato', sans-serif" }}>
          Get in touch
        </h1>
        
        {/* Thick divider */}
        <div className="w-full h-4 bg-[#F8F9FA] mb-12"></div>

        {/* Content columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
          
          {/* Left Column (takes 2/3 space) */}
          <div className="lg:col-span-2 flex flex-col">
            <h2 className="text-2xl md:text-3xl font-bold text-[#555C66] mb-4" style={{ fontFamily: "'Lato', sans-serif" }}>
              Can We Help? TIP TOP UNIFORMS TRADING W.L.L
            </h2>
            <p className="text-[#9CA3AF] mb-16 leading-relaxed text-[15px]">
              Our team was handpicked for their understanding of materials, process and passion for workwear. Whether you are browsing our site or visiting our store, we are always willing to share our deep knowledge and understanding of our makers and their craft.
            </p>

            {/* Inner Grid for Customer Service & Address */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Customer Service */}
              <div>
                <h3 className="text-[22px] font-bold text-[#555C66] mb-6" style={{ fontFamily: "'Lato', sans-serif" }}>Customer Service</h3>
                <div className="text-[15px] text-[#9CA3AF] space-y-1.5">
                  <p><strong className="text-[#555C66]">Email:</strong> info.tiptopuniforms@gmail.com</p>
                  <p className="pt-1"><strong className="text-[#555C66]">Telephone & Whatsapp:</strong></p>
                  <p>+974 5501 6644</p>
                  <p>+974 6690 1189</p>
                </div>
              </div>

              {/* Address */}
              <div>
                <h3 className="text-[22px] font-bold text-[#555C66] mb-6" style={{ fontFamily: "'Lato', sans-serif" }}>Address</h3>
                <div className="text-[15px] text-[#9CA3AF] space-y-1">
                  <p className="font-bold text-[#555C66] mb-2">TIP TOP UNIFORMS TRADING W.L.L</p>
                  <p>Shop No. F-62, Al Jaher Center,</p>
                  <p>Doha-Qatar</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (takes 1/3 space) */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold text-[#555C66] mb-4" style={{ fontFamily: "'Lato', sans-serif" }}>
              Contact TIP TOP UNIFORMS TRADING W.L.L
            </h2>
          </div>
        </div>
        
      </div>
    </div>
  );
}
