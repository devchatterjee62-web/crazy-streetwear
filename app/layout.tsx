import type { Metadata } from "next";
import Script from "next/script";

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
        {/* This script bypasses your broken local compiler and forces Tailwind to work */}
        <Script src="https://cdn.tailwindcss.com" strategy="beforeInteractive" />
      </head>
      <body className="min-h-screen bg-black text-white overflow-x-hidden antialiased">
        {children}
      </body>
    </html>
  );
}