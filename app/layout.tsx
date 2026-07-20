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
        {/* Meta Pixel Code Injected Securely via Next.js Script */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '4712080449020705');
            fbq('track', 'PageView');
          `}
        </Script>

        {/* Forces Tailwind to compile properly */}
        <Script src="https://cdn.tailwindcss.com" strategy="beforeInteractive" />
        
        {/* Tidio Chat Bot - REPLACE THIS WITH YOUR UNIQUE TIDIO SCRIPT */}
        <script src="//code.tidio.co/YOUR_UNIQUE_ID.js" async></script>
      </head>
      <body className="min-h-screen bg-black text-white overflow-x-hidden antialiased flex flex-col">
        
        {/* Meta Pixel Fallback for browsers with JS disabled */}
        <noscript>
          <img 
            height="1" 
            width="1" 
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=4712080449020705&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>

        <main className="flex-grow">
          {children}
        </main>

        <Footer />
        
      </body>
    </html>
  );
}