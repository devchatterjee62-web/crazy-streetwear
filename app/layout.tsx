import type { Metadata } from "next";
import Script from "next/script";
import Footer from "./Footer"; 

export const metadata: Metadata = {
  title: "CRAZY | Premium Indian Streetwear",
  description: "The Genesis Drop. Limited 50-piece heavyweight streetwear collection.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-black">
      <head>
        <Script src="https://cdn.tailwindcss.com" strategy="beforeInteractive" />
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