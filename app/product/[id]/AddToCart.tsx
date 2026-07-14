"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// THE FIX: We don't need 'price' as a prop anymore because we pull the exact price directly from the selected variant
export default function AddToCart({ product }: { product: any }) {
  // 1. Dynamically extract the available sizes and colors straight from Shopify's data
  const sizeOptions = product?.options?.find((o: any) => o.name === 'Size' || o.name === 'Size (US)')?.values || [];
  const colorOptions = product?.options?.find((o: any) => o.name === 'Color' || o.name === 'Colour')?.values || [];

  // 2. Set default states to the first available options
  const [selectedSize, setSelectedSize] = useState(sizeOptions[0] || "");
  const [selectedColor, setSelectedColor] = useState(colorOptions[0] || "");
  const [isAdding, setIsAdding] = useState(false);
  const router = useRouter();

  const handleAddToCart = () => {
    setIsAdding(true);
    
    // 3. THE CRITICAL ENGINE: Find the exact Shopify Variant that matches the user's selected Size + Color
    const variant = product.variants.edges.find((edge: any) => {
      const options = edge.node.selectedOptions;
      
      const matchesSize = sizeOptions.length === 0 || options.some((opt: any) => (opt.name === 'Size' || opt.name === 'Size (US)') && opt.value === selectedSize);
      const matchesColor = colorOptions.length === 0 || options.some((opt: any) => (opt.name === 'Color' || opt.name === 'Colour') && opt.value === selectedColor);
      
      return matchesSize && matchesColor;
    })?.node;

    if (!variant) {
      alert("This specific combination is currently locked in the vault.");
      setIsAdding(false);
      return;
    }

    // 4. Build the correct payload
    const cartItem = {
      id: variant.id, // THE FIX: This is the REAL Shopify Variant ID. Your checkout will now work perfectly.
      title: product.title,
      price: parseFloat(variant.price.amount),
      size: selectedSize,
      color: selectedColor,
      // THE FIX: Grabs the exact photo of the selected color, or falls back to the main photo
      image: variant.image?.url || product.images?.edges?.[0]?.node?.url || ""
    };

    // 5. Save to local storage engine
    const existingCart = JSON.parse(localStorage.getItem("crazy_cart") || "[]");
    existingCart.push(cartItem);
    localStorage.setItem("crazy_cart", JSON.stringify(existingCart));

    // 6. Cinematic delay before taking them to the cart
    setTimeout(() => {
      router.push("/cart");
    }, 400);
  };

  return (
    <div className="mb-12">
      
      {/* COLOR SELECTOR (Only renders if colors actually exist in Shopify) */}
      {colorOptions.length > 0 && (
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
            <h3 className="text-[10px] font-bold tracking-[0.3em] uppercase text-gray-500">Select Color</h3>
          </div>
          <div className="flex gap-4 flex-wrap">
            {colorOptions.map((color: string) => (
              <button 
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`px-6 h-12 border flex items-center justify-center text-xs font-bold transition-all duration-300 uppercase ${
                  selectedColor === color 
                    ? 'bg-white text-black border-white' 
                    : 'border-white/20 hover:bg-white hover:text-black'
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* SIZE SELECTOR (Only renders if sizes actually exist in Shopify) */}
      {sizeOptions.length > 0 && (
        <div className="mb-12">
          <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
            <h3 className="text-[10px] font-bold tracking-[0.3em] uppercase text-gray-500">Select Size</h3>
            <span className="text-[10px] text-gray-500 uppercase tracking-widest cursor-pointer hover:text-white transition-colors">Size Guide</span>
          </div>
          <div className="flex gap-4 flex-wrap">
            {sizeOptions.map((size: string) => (
              <button 
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`w-12 h-12 border flex items-center justify-center text-xs font-bold transition-all duration-300 uppercase ${
                  selectedSize === size 
                    ? 'bg-white text-black border-white' 
                    : 'border-white/20 hover:bg-white hover:text-black'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ACTION BUTTON */}
      <button 
        onClick={handleAddToCart}
        disabled={isAdding}
        className="w-full bg-white text-black py-6 text-xs font-bold uppercase tracking-[0.25em] hover:bg-gray-300 transition-colors disabled:opacity-50"
      >
        {isAdding ? "SECURING ITEM..." : "ADD TO CART"}
      </button>
    </div>
  );
}