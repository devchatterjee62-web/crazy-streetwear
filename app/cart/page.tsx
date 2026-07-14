"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function CartPage() {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // THE FIX: Added a loading state for the checkout button
  const [isCheckingOut, setIsCheckingOut] = useState(false); 

  // Pull items from the engine when the page loads
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("crazy_cart") || "[]");
    setCartItems(items);
    setIsLoaded(true);
  }, []);

  const removeItem = (id: string) => {
    const newCart = cartItems.filter(item => item.id !== id);
    setCartItems(newCart);
    localStorage.setItem("crazy_cart", JSON.stringify(newCart));
  };

  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  // THE FIX: The Shopify Checkout Bridge
  const handleCheckout = () => {
    setIsCheckingOut(true);

    try {
      // Shopify requires the raw numeric Variant ID for checkouts, not the full "gid://..." string
      const checkoutString = cartItems.map(item => {
        // This splits "gid://shopify/ProductVariant/123456789" and grabs just "123456789"
        const rawId = item.id.includes('/') ? item.id.split('/').pop() : item.id;
        
        // Formats to "ID:Quantity" (e.g., "123456789:1")
        // Note: If you add quantity selectors later, change the '1' to 'item.quantity'
        return `${rawId}:1`; 
      }).join(',');

      // Instantly teleport the user to your exact Shopify store checkout!
      const shopifyCheckoutUrl = `https://ck1cs0-cu.myshopify.com/cart/${checkoutString}`;
      
      window.location.href = shopifyCheckoutUrl;
    } catch (error) {
      console.error("Checkout failed:", error);
      setIsCheckingOut(false);
    }
  };

  if (!isLoaded) return null; // Prevents loading glitches

  return (
    <main className="min-h-screen bg-[#030303] text-white selection:bg-white selection:text-black font-sans scroll-smooth antialiased pb-24">
      
      {/* NAVIGATION */}
      <nav className="fixed w-full px-8 py-6 md:px-12 md:py-8 flex justify-between items-center z-50 mix-blend-difference text-white pointer-events-auto">
        <Link href="/" className="text-3xl md:text-4xl font-black tracking-tighter uppercase cursor-pointer">
          CRAZY
        </Link>
        <Link href="/#shop" className="text-[10px] font-bold tracking-[0.25em] uppercase hover:text-gray-400 transition-colors">
          ← Keep Exploring
        </Link>
      </nav>

      <section className="pt-32 px-8 md:px-24 max-w-[1400px] mx-auto">
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-16">
          The Vault <br/><span className="text-gray-600">Cart</span>
        </h1>

        {cartItems.length === 0 ? (
          <div className="border-t border-white/10 pt-12 flex flex-col items-start">
            <p className="text-gray-400 uppercase tracking-widest text-sm mb-8">Your vault is currently empty.</p>
            <Link href="/#shop" className="bg-white text-black px-12 py-4 text-[10px] font-bold uppercase tracking-[0.25em] hover:bg-gray-300 transition-colors">
              Access Archive
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            
            {/* CART ITEMS LIST */}
            <div className="lg:col-span-2 flex flex-col gap-8">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-6 border-b border-white/10 pb-8 items-center">
                  <div className="w-24 h-32 bg-[#111] flex-shrink-0">
                    {item.image && (
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    )}
                  </div>
                  <div className="flex-grow flex flex-col justify-between h-full">
                    <div>
                      <h3 className="text-lg font-bold uppercase tracking-tight">{item.title}</h3>
                      <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] mt-1">Size: {item.size || "Oversized"}</p>
                    </div>
                    <p className="text-sm font-light tracking-widest text-gray-300">INR {item.price}</p>
                  </div>
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="text-[10px] font-bold tracking-widest uppercase text-gray-600 hover:text-white transition-colors"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* ORDER SUMMARY */}
            <div className="bg-[#0a0a0a] p-8 md:p-12 h-max border border-white/5 sticky top-32">
              <h3 className="text-[10px] font-bold tracking-[0.3em] uppercase text-gray-500 mb-8 border-b border-white/10 pb-4">
                Order Summary
              </h3>
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-light tracking-widest text-gray-400">Subtotal</span>
                <span className="text-sm font-light tracking-widest">INR {total}</span>
              </div>
              <div className="flex justify-between items-center mb-8 pb-8 border-b border-white/10">
                <span className="text-sm font-light tracking-widest text-gray-400">Shipping</span>
                <span className="text-sm font-light tracking-widest text-gray-500">Calculated Next</span>
              </div>
              <div className="flex justify-between items-center mb-12">
                <span className="text-lg font-bold tracking-widest uppercase">Total</span>
                <span className="text-lg font-bold tracking-widest">INR {total}</span>
              </div>
              
              {/* THE FIX: Wired up the checkout button */}
              <button 
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full bg-white text-black py-6 text-xs font-bold uppercase tracking-[0.25em] hover:bg-gray-300 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
              >
                {isCheckingOut ? "Securing Vault..." : "Secure Checkout"}
              </button>
              
              <p className="text-[8px] text-center text-gray-600 uppercase tracking-[0.2em] mt-4">
                Taxes & duties calculated at checkout.
              </p>
            </div>
            
          </div>
        )}
      </section>
    </main>
  );
}