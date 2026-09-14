import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import CartDrawer from "@/components/CartDrawer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "SOLEVÉ — Elegance in Every Step",
  description:
    "Modern luxury footwear, bags, and fragrances. SOLEVÉ — Elegance in Every Step.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${inter.variable} font-sans bg-blush text-ink antialiased`}
      >
        {children}
        <CartDrawer />
      </body>
    </html>
  );
}
