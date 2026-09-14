"use client";

import Link from "next/link";
import { ArrowLeft, Sparkles, Award, HeartHandshake, ShieldCheck } from "lucide-react";
import PromoTicker from "@/components/PromoTicker";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-blush flex flex-col justify-between">
      <div>
        <PromoTicker />
        <Header
          onSearch={() => {}}
          onCategorySelect={() => {}}
          activeCategory="All"
        />

        <div className="max-w-4xl mx-auto px-5 md:px-8 py-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[13px] text-ink/60 hover:text-charcoal mb-8"
          >
            <ArrowLeft size={15} /> Back to storefront
          </Link>

          {/* Hero Banner */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-[12px] tracking-[0.25em] text-champagne uppercase font-medium mb-3">
              Our Heritage & Philosophy
            </p>
            <h1 className="font-serif text-3xl md:text-5xl text-charcoal leading-tight mb-6">
              The Story of SOLEVÉ
            </h1>
            <p className="text-ink/75 text-[15px] leading-relaxed">
              Born in Lahore and inspired by the enduring grace of Pakistani craftsmanship,
              SOLEVÉ is a tribute to deliberate design, hand-burnished leathers, and
              silhouettes crafted to transcend the ephemeral.
            </p>
          </div>

          {/* Story Narrative */}
          <div className="grid md:grid-cols-2 gap-10 items-center mb-16">
            <div className="aspect-[4/5] bg-white border border-charcoal/10 overflow-hidden shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1000&q=80"
                alt="SOLEVÉ Handcrafted Stiletto"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-5 text-[14px] text-ink/80 leading-relaxed">
              <h2 className="font-serif text-2xl text-charcoal">
                Crafted by Lahore’s Master Karigars
              </h2>
              <p>
                Every pair of SOLEVÉ shoes begins with raw, ethically sourced full-grain leather
                and the practiced hands of master artisans. Our workshop in Lahore unites traditional
                cobbler techniques with contemporary orthopedic padding, ensuring that luxury is as
                walkable as it is striking.
              </p>
              <p>
                From hand-embroidered metallic zari on velvet khussas to slender champagne stiletto
                architectures, we refuse mass factory shortcuts. Each piece undergoes 36 hands-on steps
                before it is stamped with the SOLEVÉ seal.
              </p>
              <div className="pt-2">
                <blockquote className="border-l-2 border-champagne pl-4 italic text-charcoal font-serif text-[15px]">
                  "Elegance is not about catching someone's eye for a second — it is about the quiet confidence that stays long after you leave."
                </blockquote>
              </div>
            </div>
          </div>

          {/* Core Pillars */}
          <div className="grid sm:grid-cols-3 gap-6 mb-16">
            <div className="bg-white border border-charcoal/10 p-6 space-y-3">
              <div className="w-10 h-10 rounded-full bg-blush flex items-center justify-center text-champagne mb-2">
                <Sparkles size={20} />
              </div>
              <h3 className="font-serif text-lg text-charcoal">Arch Comfort</h3>
              <p className="text-[13px] text-ink/70 leading-relaxed">
                Triple-density memory insoles engineered specifically for prolonged festive and formal wear.
              </p>
            </div>

            <div className="bg-white border border-charcoal/10 p-6 space-y-3">
              <div className="w-10 h-10 rounded-full bg-blush flex items-center justify-center text-champagne mb-2">
                <Award size={20} />
              </div>
              <h3 className="font-serif text-lg text-charcoal">Bespoke Finishes</h3>
              <p className="text-[13px] text-ink/70 leading-relaxed">
                24k-gold micro hardware, delicate crystal embroidery, and pure satin fabrics designed to outlast the season.
              </p>
            </div>

            <div className="bg-white border border-charcoal/10 p-6 space-y-3">
              <div className="w-10 h-10 rounded-full bg-blush flex items-center justify-center text-champagne mb-2">
                <ShieldCheck size={20} />
              </div>
              <h3 className="font-serif text-lg text-charcoal">Nationwide Care</h3>
              <p className="text-[13px] text-ink/70 leading-relaxed">
                14-day hassle-free doorstep returns and full size exchange guarantees with verified COD across Pakistan.
              </p>
            </div>
          </div>

          {/* Showroom Callout */}
          <div className="bg-charcoal text-blush p-8 md:p-12 text-center">
            <h3 className="font-serif text-2xl md:text-3xl mb-3">
              Visit Our Flagship Atelier
            </h3>
            <p className="text-blush/70 text-[14px] max-w-lg mx-auto mb-6">
              Experience the leather texture and tailored fittings in person at our flagship boutique:
              <br />
              <strong className="text-blush">14-L, M.M. Alam Road, Gulberg III, Lahore, Pakistan.</strong>
            </p>
            <div className="flex justify-center gap-4">
              <Link
                href="/contact"
                className="bg-champagne text-charcoal px-7 py-3 text-[13px] tracking-wide hover:bg-blush transition-colors"
              >
                Contact & Showroom Directions
              </Link>
              <Link
                href="/"
                className="border border-blush/30 text-blush px-7 py-3 text-[13px] tracking-wide hover:border-blush transition-colors"
              >
                Explore Collection
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
