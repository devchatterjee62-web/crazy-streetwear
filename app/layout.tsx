import type { Metadata } from "next";
import Script from "next/script";
import Footer from "./Footer"; 

// The Ultimate SEO Engine for CRAZY Streetwear
export const metadata: Metadata = {
  title: "CRAZY | Premium Heavyweight Streetwear & Oversized Tees",
  description: "Shop the Genesis Drop. Limited edition, heavyweight oversized t-shirts and premium streetwear designed in India. Join the syndicate for exclusive drops.",
  keywords: ["oversized t-shirt", "premium streetwear India", "heavyweight tee", "luxury streetwear", "CRAZY streetwear", "graphic tees"],
  openGraph: {
    title: "CRAZY | Premium Indian Streetwear",
    description: "Limited 50-piece heavyweight streetwear collection. Secure your piece of the Genesis Drop.",
    url: "https://crazystreetwears.in",
    siteName: "CRAZY Streetwear",
    images: [
      {
        url: "/logo-white.png", // Make sure this matches the image name in your public folder
        width: 1200,
        height: 630,
        alt: "CRAZY Streetwear Genesis Drop",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CRAZY | Premium Streetwear",
    description: "The Genesis Drop. Heavyweight oversized tees.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-black">
      <head>
        {/* Forces Tailwind to compile properly */}
        <Script src="https://cdn.tailwindcss.com" strategy="beforeInteractive" />
        
        {/* Tidio Chat Bot - REPLACE THIS WITH YOUR UNIQUE TIDIO SCRIPT */}
        <script src="//code.tidio.co/YOUR_UNIQUE_ID.js" async></script>
      </head>
      <body className="min-h-screen bg-black text-white overflow-x-hidden antialiased flex flex-col">
        
        <main className="flex-grow">
          {children}
        </main>

        <Footer />
        
      </body>
    </html>
  );
}