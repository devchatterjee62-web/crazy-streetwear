import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#030303] text-white selection:bg-white selection:text-black font-sans scroll-smooth antialiased">
      
      {/* GLOBAL NAVIGATION */}
      <nav className="fixed w-full px-8 py-6 md:px-12 md:py-8 flex justify-between items-center z-50 mix-blend-difference text-white pointer-events-auto">
        <Link href="/" className="text-3xl md:text-4xl font-black tracking-tighter uppercase cursor-pointer">
          CRAZY
        </Link>
        <Link href="/" className="text-[10px] font-bold tracking-[0.25em] uppercase hover:text-gray-400 transition-colors">
          ← Return to Vault
        </Link>
      </nav>

      {/* VISUAL HERO SECTION */}
      <section className="relative w-full h-[70vh] md:h-screen flex flex-col justify-center items-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full bg-[#050505]">
          <img 
            src="/manifesto.jpg" 
            alt="CRAZY Culture"
            className="w-full h-full object-cover opacity-40 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#030303]/20 via-[#030303]/60 to-[#030303]" />
        </div>
        
        <div className="relative z-10 text-center px-4 mt-20">
          <h1 className="text-6xl md:text-[9rem] font-black uppercase tracking-tighter leading-none mb-6 drop-shadow-2xl">
            The<br />Culture
          </h1>
          <p className="text-[10px] md:text-xs font-bold tracking-[0.5em] uppercase text-gray-300 drop-shadow-lg">
            Beyond the Garment
          </p>
        </div>
      </section>

      {/* EDITORIAL SPLIT SECTION 1 */}
      <section className="px-8 py-24 md:px-24 md:py-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-[2000px] mx-auto">
        <div>
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-gray-500 block mb-6 border-b border-white/10 pb-2 w-max">
            01 // The Materiality
          </span>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-white leading-[0.9] mb-8">
            Silent Luxury.<br /><span className="text-gray-600">Absolute Presence.</span>
          </h2>
          <p className="text-gray-400 font-light leading-relaxed tracking-wide text-base md:text-lg mb-6">
            CRAZY was built on a singular obsession: the balance between luxury precision and aggressive urban subcultures. Inspired by the strict discipline of luxury tailoring and modern brutalist architecture, we treat fabric as stone.
          </p>
          <p className="text-gray-400 font-light leading-relaxed tracking-wide text-base md:text-lg">
            Every loop, every fiber of our high-grade combed cotton is evaluated under microscopic scrutiny. We engineered custom-weight textiles to drop effortlessly off the shoulders, creating a luxury drape that balances raw power with immaculate elegance.
          </p>
        </div>
        
        <div className="w-full aspect-[4/5] bg-[#111] overflow-hidden relative group">
          <img 
            src="/manifesto.jpg" 
            alt="Editorial Shot" 
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 ease-out group-hover:scale-105" 
          />
        </div>
      </section>

      {/* TEXT MARQUEE */}
      <section className="w-full py-12 md:py-24 bg-white text-black overflow-hidden flex items-center justify-center">
        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-center px-4">
          Engineered for those who dictate the culture.
        </h2>
      </section>

      {/* EDITORIAL SPLIT SECTION 2 */}
      <section className="px-8 py-24 md:px-24 md:py-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-[2000px] mx-auto">
        
        <div className="w-full aspect-[4/5] bg-[#111] overflow-hidden relative group hidden lg:block">
          <img 
            src="/manifesto.jpg" 
            alt="Editorial Shot" 
            className="w-full h-full object-cover transition-all duration-1000 ease-out group-hover:scale-105" 
          />
        </div>

        <div>
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-gray-500 block mb-6 border-b border-white/10 pb-2 w-max">
            02 // Exclusivity
          </span>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-white leading-[0.9] mb-8">
            Finite.<br /><span className="text-gray-600">Unrepeatable.</span>
          </h2>
          <p className="text-gray-400 font-light leading-relaxed tracking-wide text-base md:text-lg mb-6">
            We operate outside the traditional patterns of fashion cycles. Our drops are archival expressions—finite, numbered, and entirely unrepeatable. 
          </p>
          <p className="text-gray-400 font-light leading-relaxed tracking-wide text-base md:text-lg">
            To wear a CRAZY silhouette is to possess a calculated artifact of modern luxury culture. We do not restock. We do not compromise. We simply advance to the next drop. When the archive closes, the design belongs entirely to time.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full bg-black py-24 px-8 md:px-24 border-t border-white/10 flex flex-col items-center text-center">
        <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-6 text-gray-500">Become part of the lineage</p>
        <Link href="/#shop" className="text-4xl md:text-6xl font-black uppercase tracking-tighter hover:text-gray-400 transition-colors cursor-pointer">
          ENTER THE VAULT →
        </Link>
      </footer>

    </main>
  );
}