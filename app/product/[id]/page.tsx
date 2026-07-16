import { shopifyFetch } from "../../../lib/shopify";
import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCart from "./AddToCart";
import { Metadata } from "next";

// 1. DYNAMIC SEO ENGINE: Tells Google exactly what this product is
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  let decodedId = decodeURIComponent(resolvedParams.id);
  let finalShopifyId = decodedId.includes("gid://") ? decodedId : `gid://shopify/Product/${decodedId}`;

  const query = `
    query {
      product(id: "${finalShopifyId}") {
        title
        description
        images(first: 1) {
          edges {
            node {
              url
            }
          }
        }
      }
    }
  `;

  const data = await shopifyFetch({ query });
  const product = data?.data?.product;

  if (!product) {
    return { title: 'Product Not Found | CRAZY' };
  }

  return {
    title: `${product.title} | CRAZY Premium Streetwear`,
    description: product.description || "Limited edition heavyweight oversized streetwear by CRAZY.",
    keywords: ["oversized t-shirt", "heavyweight tee", product.title.toLowerCase(), "premium streetwear India"],
    openGraph: {
      title: `${product.title} | CRAZY`,
      description: product.description,
      images: product.images?.edges?.[0] ? [{ url: product.images.edges[0].node.url }] : [],
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  // 1. Safely unwrap Next.js dynamic route parameters
  const resolvedParams = await params;
  let decodedId = decodeURIComponent(resolvedParams.id);
  
  // Ensure the string perfectly matches Shopify's Global ID structure
  let finalShopifyId = decodedId.includes("gid://") 
    ? decodedId 
    : `gid://shopify/Product/${decodedId}`;

  // 2. Comprehensive GraphQL Query capturing options, images, and full variant arrays
  const query = `
    query {
      product(id: "${finalShopifyId}") {
        id
        title
        description
        images(first: 5) {
          edges {
            node {
              url
              altText
            }
          }
        }
        options {
          name
          values
        }
        variants(first: 100) {
          edges {
            node {
              id
              title
              price {
                amount
              }
              selectedOptions {
                name
                value
              }
              image {
                url
              }
            }
          }
        }
      }
    }
  `;

  const data = await shopifyFetch({ query });
  const product = data?.data?.product;

  // 3. Fallback if product doesn't exist in Shopify backend
  if (!product) {
    return notFound();
  }

  // THE SECURITY FIX: Added optional chaining (?.) to prevent 500 server crashes
  const initialPriceAmount = product.variants?.edges?.[0]?.node?.price?.amount || "0";
  const price = Math.round(parseFloat(initialPriceAmount));
  
  // Extract images array cleanly
  const productImages = product.images?.edges?.map((edge: any) => edge.node) || [];

  // 4. JSON-LD SCHEMA: Tells Google the Price and Stock Status for Rich Search Results
  const schemaData = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.title,
    "image": productImages[0]?.url || "",
    "description": product.description || "Limited run archive piece.",
    "brand": {
      "@type": "Brand",
      "name": "CRAZY"
    },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "INR",
      "price": price,
      "availability": "https://schema.org/InStock"
    }
  };

  return (
    <main className="min-h-screen bg-[#030303] text-white selection:bg-white selection:text-black font-sans scroll-smooth antialiased">
      
      {/* INJECT SCHEMA FOR GOOGLE CRAWLERS */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* GLOBAL NAVIGATION LAYER */}
      <nav className="fixed w-full px-8 py-6 md:px-12 md:py-8 flex justify-between items-center z-50 mix-blend-difference text-white pointer-events-auto">
        <Link href="/" className="text-3xl md:text-4xl font-black tracking-tighter uppercase cursor-pointer">
          CRAZY
        </Link>
        <div className="flex gap-8">
          <Link href="/cart" className="text-[10px] font-bold tracking-[0.25em] uppercase hover:text-gray-400 transition-colors">
            Cart
          </Link>
          <Link href="/#shop" className="text-[10px] font-bold tracking-[0.25em] uppercase hover:text-gray-400 transition-colors">
            ← Back
          </Link>
        </div>
      </nav>

      {/* ARCHITECTURAL LAYOUT */}
      <div className="flex flex-col lg:flex-row min-h-screen pt-24 lg:pt-0">
        
        {/* LEFT COLUMN: Premium Continuous Scroll Image Gallery */}
        <div className="w-full lg:w-1/2 lg:h-screen lg:sticky top-0 bg-[#111] border-r border-white/10 overflow-y-auto flex flex-col p-8 md:p-16 gap-8 scrollbar-hide">
          {productImages.length > 0 ? (
            productImages.map((img: any, index: number) => (
              <img 
                key={index}
                src={img.url} 
                alt={img.altText || `${product.title} - CRAZY Premium Streetwear`}
                className="w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-700 ease-out bg-white/5"
              />
            ))
          ) : (
            <div className="text-gray-600 text-xs tracking-widest uppercase m-auto">No Image Available</div>
          )}
        </div>

        {/* RIGHT COLUMN: Static Drop Info & State Management */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 md:p-24 bg-[#050505]">
          <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-6 text-gray-500">Archive Item</p>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-6">
            {product.title}
          </h1>
          <p className="text-2xl font-light tracking-widest text-gray-300 mb-12">
            INR {price}
          </p>

          <div className="mb-12">
            <h3 className="text-[10px] font-bold tracking-[0.3em] uppercase text-gray-500 mb-4 border-b border-white/10 pb-2">The Specs</h3>
            <p className="text-gray-400 font-light leading-relaxed tracking-wide text-sm whitespace-pre-line">
              {product.description || "Heavily calculated drop. Exacting microscopic detailing. Limited run archive piece. No restocks once the vault is closed."}
            </p>
          </div>

          {/* Interactive Variant Selectors & Engine injection */}
          <AddToCart product={product} />

        </div>
      </div>
    </main>
  );
}