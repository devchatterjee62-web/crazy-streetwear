import { shopifyFetch } from "../lib/shopify";
import Link from "next/link";
import Image from "next/image";

export default async function Home() {
  const query = `
    query {
      products(first: 4) {
        edges {
          node {
            id
            title
            featuredImage {
              url
              altText
            }
            variants(first: 1) {
              edges {
                node {
                  price {
                    amount
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const data = await shopifyFetch({ query });
  const products = data?.data?.products?.edges || [];

  return (
    <main className="min-h-screen bg-[#030303] text-white selection:bg-white selection:text-black font-sans scroll-smooth">
      
      {/* =========================================
          GLOBAL NAVIGATION
          ========================================= */}
      <nav className="fixed w-full px-8 py-6 md:px-12 md:py-8 flex justify-between items-center z-50 mix-blend-difference text-white pointer-events-auto">
        
        {/* THE FIX: Replaced the text with your white logo image */}
        <Link href="/" className="cursor-pointer flex items-center justify-center">
          <Image 
            src="/logo-white.png" 
            alt="Crazy Streetwear Logo" 
            width={120} 
            height={40} 
            priority 
            className="object-contain"
          />
        </Link>

        <div className="hidden lg:flex items-center gap-12 text-[10px] font-bold tracking-[0.25em] uppercase">
          <Link href="#shop" className="hover:text-gray-400 transition-colors">Shop All</Link>
          <Link href="#about" className="hover:text-gray-400 transition-colors">Philosophy</Link>
          <Link href="/campaigns" className="hover:text-gray-400 transition-colors">Campaigns</Link>
        </div>
        <button className="text-[10px] font-bold tracking-[0.25em] uppercase hover:text-gray-400 transition-colors">
          Cart (0)
        </button>
      </nav>

      {/* =========================================
          1. THE CAMPAIGN HERO 
          ========================================= */}
      <section className="relative w-full h-screen flex items-end justify-start overflow-hidden">
        <div className="absolute inset-0 w-full h-full bg-[#050505]">
          
          <video 
            src="/website.mp4"
            autoPlay 
            loop 
            muted 
            playsInline
            preload="auto" 
            className="w-full h-full object-cover opacity-70 scale-105"
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-black/20 to-transparent" />
          <div className="absolute inset-0 opacity-[0.04] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </div>
        
        <div className="relative z-10 p-8 md:p-16 w-full flex flex-col md:flex-row md:items-end justify-between pb-24">
          <div>
            <p className="text-[10px] md:text-xs font-bold tracking-[0.5em] uppercase mb-6 text-gray-400 drop-shadow-lg">
              Season 1 // Drop 001
            </p>
            <h1 className="text-7xl md:text-[10rem] font-black uppercase tracking-tighter leading-[0.8] mb-6 text-white drop-shadow-2xl">
              The<br />Genesis
            </h1>
          </div>
          <Link href="#shop" className="group flex items-center justify-between gap-8 bg-white text-black px-12 py-6 text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] hover:bg-gray-200 transition-all duration-300 w-max cursor-pointer">
            <span>Explore</span>
            <span className="group-hover:translate-x-3 transition-transform duration-500 ease-out">→</span>
          </Link>
        </div>
      </section>

      {/* =========================================
          2. THE VAULT (Shopify Grid)
          ========================================= */}
      <section id="shop" className="w-full px-6 py-32 md:px-12 max-w-[2000px] mx-auto min-h-screen bg-[#030303]">
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-20 border-b border-white/10 pb-8">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">The Vault</h2>
          <span className="text-xs font-bold tracking-[0.25em] text-gray-500 uppercase mt-4 md:mt-0">
            {products.length} Archive Pieces
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-x-6 gap-y-16">
          {products.map(({ node }: any) => {
            const formattedPrice = Math.round(parseFloat(node.variants.edges[0].node.price.amount));
            
            // BULLETPROOF ROUTING FIX: Calculate the URL safely outside of the JSX block.
            const safeId = encodeURIComponent(node.id);
            const productUrl = "/product/" + safeId;

            return (
              <Link href={productUrl} key={node.id} className="group cursor-pointer flex flex-col">
                <div className="w-full aspect-[3/4] bg-[#111] overflow-hidden mb-6 relative border border-white/5">
                  {node.featuredImage && (
                    <img 
                      src={node.featuredImage.url} 
                      alt={node.featuredImage.altText || node.title}
                      className="w-full h-full object-cover group-hover:scale-105 group-hover:opacity-80 transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
                    />
                  )}
                  <div className="absolute inset-0 flex items-end justify-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="w-full bg-white text-black py-4 text-center text-[10px] font-bold uppercase tracking-[0.2em]">
                      View Product
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center text-center">
                  <h3 className="text-sm font-bold uppercase tracking-[0.1em] mb-2 text-gray-100">{node.title}</h3>
                  <p className="text-sm text-gray-500 font-medium tracking-widest">INR {formattedPrice}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* =========================================
          3. THE PHILOSOPHY (About Page Section)
          ========================================= */}
      <section id="about" className="w-full flex flex-col-reverse md:flex-row items-center bg-[#050505] border-t border-white/5">
        <div className="w-full md:w-1/2 p-10 md:p-24 flex flex-col justify-center">
          <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-8 text-gray-500">The Manifesto</p>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-tight mb-8">
            Engineered for those who dictate the culture.
          </h2>
          <p className="text-gray-400 font-light leading-relaxed tracking-wide mb-12 max-w-lg">
            CRAZY is not just a label. It is a structural identity. We merge high-end microscopic detailing with aggressive streetwear silhouettes. Every seam, every graphic, and every drop is heavily calculated to ensure absolute exclusivity. When the vault closes, it's gone forever.
          </p>
          <Link href="/about" className="border-b border-white pb-1 text-xs font-bold uppercase tracking-[0.2em] hover:text-gray-400 hover:border-gray-400 transition-colors w-max">
            Read The Full Story
          </Link>
        </div>
        
        <div className="w-full md:w-1/2 h-[50vh] md:h-[90vh] relative overflow-hidden bg-black flex items-center justify-center">
           {/* ▶ PULLING YOUR CUSTOM LIFESTYLE MANIFESTO SHOT */}
           <img 
            src="/manifesto.jpg" 
            alt="CRAZY Streetwear Lifestyle Manifesto"
            className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-all duration-1000 ease-out"
           />
        </div>
      </section>

      {/* =========================================
          4. THE ARCHIVE FOOTER
          ========================================= */}
      <footer className="w-full bg-black text-white pt-24 pb-12 px-8 md:px-12 border-t border-white/10">
        <div className="max-w-[2000px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-24">
            
            <div className="md:col-span-2">
              <h2 className="text-4xl font-black tracking-tighter uppercase mb-6">CRAZY</h2>
              <p className="text-gray-500 text-sm max-w-sm font-light mb-8">
                Subscribe to the syndicate. Gain early access to limited drops, archive sales, and private lookbooks.
              </p>
              <div className="flex w-full max-w-sm border-b border-white/20 pb-2">
                <input type="email" placeholder="ENTER YOUR EMAIL" className="bg-transparent w-full outline-none text-xs tracking-widest placeholder-gray-700 uppercase" />
                <button className="text-xs font-bold tracking-widest uppercase hover:text-gray-400">Join</button>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase text-gray-500 mb-2">Explore</h4>
              <Link href="#shop" className="text-xs uppercase tracking-widest hover:text-gray-400">Shop All</Link>
              <Link href="/t-shirts" className="text-xs uppercase tracking-widest hover:text-gray-400">T-Shirts</Link>
              <Link href="/hoodies" className="text-xs uppercase tracking-widest hover:text-gray-400">Hoodies</Link>
              <Link href="#about" className="text-xs uppercase tracking-widest hover:text-gray-400">Philosophy</Link>
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase text-gray-500 mb-2">Social</h4>
              <a href="#" className="text-xs uppercase tracking-widest hover:text-gray-400">Instagram</a>
              <a href="#" className="text-xs uppercase tracking-widest hover:text-gray-400">Twitter (X)</a>
              <a href="#" className="text-xs uppercase tracking-widest hover:text-gray-400">TikTok</a>
            </div>

          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-[10px] text-gray-600 font-bold tracking-[0.2em] uppercase">
            <p>© 2026 CRAZY. ALL RIGHTS RESERVED.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link href="/privacy" className="hover:text-gray-400">Privacy</Link>
              <Link href="/terms" className="hover:text-gray-400">Terms</Link>
            </div>
          </div>
        </div>
      </footer>

    </main>
  );
}