import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ThreeBackground from "@/components/layout/ThreeBackground";
import { Providers } from "@/components/layout/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "GDG Community Platform",
    template: "%s | GDG Campus"
  },
  description: "Official community management platform for GDG university chapters. Grow, learn, and build with Google technologies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-black text-white transition-colors duration-300`}>
        <ThreeBackground />
        <Providers>
          <div className="flex flex-col min-h-screen relative z-10">
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
