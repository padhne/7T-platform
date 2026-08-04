import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh] px-4 text-center">
      <div className="mb-6 relative">
        <span className="text-[120px] md:text-[180px] font-black italic text-[#8B1A3B]/10 leading-none select-none" style={{ fontFamily: "'Playfair Display', serif" }}>
          404
        </span>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
           <span className="text-4xl md:text-5xl font-black italic text-[#8B1A3B] leading-none" style={{ fontFamily: "'Playfair Display', serif" }}>7T</span>
        </div>
      </div>
      
      <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 uppercase tracking-widest">Page Not Found</h3>
      <p className="text-gray-500 mb-10 max-w-md mx-auto font-light text-base md:text-lg">
        The page you are looking for doesn't exist, has been removed, name changed, or is temporarily unavailable.
      </p>
      
      <Link 
        href="/"
        className="text-[12px] font-bold text-white bg-[#1C1C1C] hover:bg-[#8B1A3B] px-10 py-4 uppercase tracking-[0.2em] transition-colors"
      >
        BACK TO HOMEPAGE
      </Link>
    </div>
  )
}
