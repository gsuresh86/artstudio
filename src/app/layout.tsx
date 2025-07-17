import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ArtStudio - Handmade Art & Crafts",
  description: "Discover unique handmade art, canvas paintings, mandala art, and DIY crafts from talented artists.",
  keywords: "handmade art, canvas paintings, mandala art, DIY crafts, original artwork",
  authors: [{ name: "ArtStudio" }],
  openGraph: {
    title: "ArtStudio - Handmade Art & Crafts",
    description: "Discover unique handmade art, canvas paintings, mandala art, and DIY crafts from talented artists.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
