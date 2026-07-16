import { shopifyFetch } from "../lib/shopify";
import Link from "next/link";
import Image from "next/image";

// 🔥 THE CACHE KILLER: This commands Vercel to fetch fresh data from Shopify instantly.
export const revalidate = 0;

export default async function Home() {
  const query = `
    query {
      collectionByHandle(handle: "shop-all") {
        products(first: 8) {
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
    }
  `;

  const data = await shopifyFetch({ query });
  const products = data?.data?.collectionByHandle?.products?.edges || [];

  return (
    <main className="min-h-screen bg-[#030303] text-white selection:bg-white selection:text-black font-sans scroll-smooth">
      
      {/* GLOBAL NAVIGATION */}
      <nav className="fixed w-full px-8 py-6 md:px-12 md:py-8 flex justify-between items-center z-50 mix-blend-difference text-white pointer-events-auto">
        <Link href="/" className="cursor-pointer flex items-center justify-center">
          <Image src="/logo-white.png" alt="Crazy Streetwear Logo" width={120} height={40} priority className="object-contain" />
        </Link>
        <div className="hidden lg:flex items-center gap-12 text-[10px] font-bold tracking-[0.25em] uppercase">
          <Link href="#shop" className="hover:text-gray-400 transition-colors">Shop All</Link>
          <Link href="#about" className="hover:text-gray-400 transition-colors">Philosophy</Link>
          <Link href="/campaigns" className="hover:text-gray-400 transition-colors">Campaigns</Link>
        </div>
        <button className="text-[10px] font-bold tracking-[0.25em] uppercase hover:text-gray-400 transition-colors">Cart (0)</button>
      </nav>

      {/* 1. CAMPAIGN HERO */}
      <section className="relative w-full h-screen flex items-end justify-start overflow-hidden">
        <div className="absolute inset-0 w-full h-full bg-[#050505]">
          <video src="/website.mp4" autoPlay loop muted playsInline preload="auto" className="w-full h-full object-cover opacity-70 scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-black/20 to-transparent" />
        </div>
        <div className="relative z-10 p-8 md:p-16 w-full flex flex-col md:flex-row md:items-end justify-between pb-24">
          <h1 className="text-7xl md:text-[10rem] font-black uppercase tracking-tighter leading-[0.8] mb-6">The<br />Genesis</h1>
          <Link href="#shop" className="bg-white text-black px-12 py-6 text-xs font-bold uppercase tracking-[0.25em] hover:bg-gray-200 transition-all">Explore →</Link>
        </div>
      </section>

      {/* 2. THE VAULT */}
      <section id="shop" className="w-full px-6 py-32 md:px-12 max-w-[2000px] mx-auto min-h-screen bg-[#030303]">
        <div className="flex justify-between items-baseline mb-20 border-b border-white/10 pb-8">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">The Vault</h2>
          <span className="text-xs font-bold tracking-[0.25em] text-gray-500 uppercase">{products.length} Archive Pieces</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-x-6 gap-y-16">
          {products.map(({ node }: any) => (
            <Link href={`/product/${encodeURIComponent(node.id)}`} key={node.id} className="group cursor-pointer flex flex-col">
              <div className="w-full aspect-[3/4] bg-[#111] overflow-hidden mb-6 relative border border-white/5">
                {node.featuredImage && <img src={node.featuredImage.url} alt={node.title} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" />}
              </div>
              <h3 className="text-sm font-bold uppercase text-center">{node.title}</h3>
              <p className="text-sm text-gray-500 text-center">INR {Math.round(parseFloat(node.variants.edges[0].node.price.amount))}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. PHILOSOPHY */}
      <section id="about" className="w-full flex flex-col-reverse md:flex-row items-center bg-[#050505] border-t border-white/5">
        <div className="w-full md:w-1/2 p-10 md:p-24">
          <h2 className="text-4xl md:text-6xl font-black uppercase mb-8">Engineered for those who dictate the culture.</h2>
          <p className="text-gray-400 mb-12 max-w-lg">CRAZY is a structural identity. We merge high-end microscopic detailing with aggressive streetwear silhouettes. When the vault closes, it's gone forever.</p>
          <Link href="/about" className="border-b border-white pb-1 text-xs font-bold uppercase">Read The Full Story</Link>
        </div>
        <div className="w-full md:w-1/2 h-[50vh] md:h-[90vh] bg-black"><img src="/manifesto.jpg" className="w-full h-full object-cover" /></div>
      </section>

      {/* 4. FOOTER */}
      <footer className="w-full bg-black text-white pt-24 pb-12 px-8 md:px-12 border-t border-white/10">
        <div className="max-w-[2000px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2"><h2 className="text-4xl font-black uppercase mb-6">CRAZY</h2><p className="text-gray-500 text-sm max-w-sm">Subscribe for early access.</p></div>
          <div className="flex flex-col gap-4"><h4 className="text-[10px] font-bold uppercase text-gray-500">Explore</h4><Link href="#shop">Shop All</Link></div>
          <div className="flex flex-col gap-4"><h4 className="text-[10px] font-bold uppercase text-gray-500">Social</h4><a href="#">Instagram</a></div>
        </div>
      </footer>
    </main>
  );
}