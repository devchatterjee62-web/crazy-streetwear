import Link from "next/link";

export default function CampaignsPage() {
  return (
    <main className="min-h-screen bg-[#030303] text-white selection:bg-white selection:text-black font-sans scroll-smooth antialiased">
      
      {/* GLOBAL NAVIGATION */}
      <nav className="fixed w-full px-8 py-6 md:px-12 md:py-8 flex justify-between items-center z-50 mix-blend-difference text-white pointer-events-auto">
        <Link href="/" className="text-3xl md:text-4xl font-black tracking-tighter uppercase cursor-pointer">
          CRAZY
        </Link>
        <div className="flex gap-8">
          <Link href="/cart" className="text-[10px] font-bold tracking-[0.25em] uppercase hover:text-gray-400 transition-colors">
            Cart
          </Link>
          <Link href="/" className="text-[10px] font-bold tracking-[0.25em] uppercase hover:text-gray-400 transition-colors">
            ← Vault
          </Link>
        </div>
      </nav>

      {/* CAMPAIGN HERO (Cinematic Video Header) */}
      <section className="relative w-full h-[80vh] md:h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full bg-[#050505]">
          <video 
            src="/website.mp4"
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover opacity-50 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#030303]/40 to-[#030303]" />
        </div>
        
        <div className="relative z-10 text-center flex flex-col items-center mt-20">
          <span className="text-[10px] md:text-xs font-bold tracking-[0.6em] uppercase text-gray-400 mb-6 border-b border-white/20 pb-2">
            Editorial Archive
          </span>
          <h1 className="text-6xl md:text-[11rem] font-black uppercase tracking-tighter leading-none text-white drop-shadow-2xl mix-blend-overlay">
            Campaigns
          </h1>
        </div>
      </section>

      {/* CAMPAIGN 001: THE GENESIS */}
      <section className="px-6 py-24 md:px-12 md:py-32 max-w-[2000px] mx-auto border-t border-white/5">
        
        {/* Campaign Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-24 gap-8">
          <div>
            <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] mb-4">
              Season 1<br/><span className="text-gray-600">Genesis</span>
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-gray-400 font-light leading-relaxed tracking-wide text-sm md:text-base">
              The inaugural structural drop. Heavy-weight fabrics, microscopic detailing, and brutalist silhouettes designed to disrupt the luxury streetwear landscape. 
            </p>
          </div>
        </div>

        {/* Editorial Staggered Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-start">
          
          {/* Left Large Portrait */}
          <div className="md:col-span-7 aspect-[4/5] bg-[#111] overflow-hidden relative group">
            <img 
              src="/manifesto.jpg" 
              alt="Genesis Campaign 1" 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 ease-out group-hover:scale-105"
            />
            <div className="absolute bottom-6 left-6 mix-blend-difference text-white">
              <p className="text-[10px] font-bold tracking-[0.3em] uppercase">Look 01 // Heavy Cotton</p>
            </div>
          </div>

          {/* Right Column Stack */}
          <div className="md:col-span-5 flex flex-col gap-6 md:gap-12 md:mt-32">
            
            {/* Right Medium Image */}
            <div className="w-full aspect-square bg-[#0a0a0a] overflow-hidden relative group">
              <img 
                src="/manifesto.jpg" 
                alt="Genesis Campaign 2" 
                className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-all duration-1000 ease-out"
              />
            </div>
            
            {/* Text Interstitial */}
            <div className="p-8 border border-white/10 bg-[#050505]">
              <h3 className="text-xl font-bold uppercase tracking-widest mb-4">The Architecture</h3>
              <p className="text-gray-500 font-light text-sm tracking-wide leading-relaxed">
                We approach garment construction like structural engineering. Every seam is heavily calculated to ensure absolute exclusivity and a timeless, rigid drape that dictates the culture.
              </p>
            </div>
            
          </div>
        </div>
      </section>

      {/* FULL WIDTH CINEMATIC BREAK */}
      <section className="w-full h-[50vh] md:h-[80vh] relative overflow-hidden bg-black">
        <video 
          src="/website.mp4"
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover opacity-40 grayscale"
        />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
           <h2 className="text-4xl md:text-8xl font-black uppercase tracking-tighter text-white mix-blend-overlay opacity-50">
             Dictate The Culture
           </h2>
        </div>
      </section>

      {/* FOOTER CALL TO ACTION */}
      <footer className="w-full bg-black py-24 px-8 md:px-24 border-t border-white/10 flex flex-col items-center text-center">
        <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-6 text-gray-500">End of Editorial</p>
        <Link href="/#shop" className="text-4xl md:text-6xl font-black uppercase tracking-tighter hover:text-gray-400 transition-colors cursor-pointer">
          SHOP THE DROP →
        </Link>
      </footer>

    </main>
  );
}