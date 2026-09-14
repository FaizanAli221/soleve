"use client";

import Link from "next/link";
import { ArrowLeft, Ruler, HelpCircle, Check, MessageSquare } from "lucide-react";
import PromoTicker from "@/components/PromoTicker";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const SIZE_CHART = [
  { eu: 36, uk: 3, us: 5.5, cm: 23.0, in: "9.05" },
  { eu: 37, uk: 4, us: 6.5, cm: 23.5, in: "9.25" },
  { eu: 38, uk: 5, us: 7.5, cm: 24.0, in: "9.45" },
  { eu: 39, uk: 6, us: 8.5, cm: 24.5, in: "9.65" },
  { eu: 40, uk: 7, us: 9.5, cm: 25.0, in: "9.84" },
  { eu: 41, uk: 8, us: 10.0, cm: 25.5, in: "10.04" },
];

export default function SizeGuidePage() {
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

          <div className="mb-12">
            <p className="text-[12px] tracking-[0.25em] text-champagne uppercase font-medium mb-2">
              Fitting & Conversion Chart
            </p>
            <h1 className="font-serif text-3xl md:text-4xl text-charcoal">
              Footwear Size Guide
            </h1>
            <p className="text-ink/60 text-[14px] mt-2">
              All SOLEVÉ pieces are crafted on standard European (EU) shoe lasts. Use our precise measurement guide below to find your perfect fit.
            </p>
          </div>

          {/* Size Chart Table */}
          <div className="bg-white border border-charcoal/10 p-6 md:p-8 mb-12 shadow-sm">
            <h2 className="font-serif text-xl text-charcoal mb-6 flex items-center gap-2">
              <Ruler size={20} className="text-champagne" /> International Size Conversion
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[14px]">
                <thead>
                  <tr className="border-b border-charcoal/20 text-ink/50 text-[12px] tracking-wider uppercase">
                    <th className="py-3 px-4 font-semibold text-charcoal">EU (Standard)</th>
                    <th className="py-3 px-4 font-medium">UK Size</th>
                    <th className="py-3 px-4 font-medium">US Size</th>
                    <th className="py-3 px-4 font-medium">Foot Length (CM)</th>
                    <th className="py-3 px-4 font-medium">Foot Length (Inches)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-charcoal/10">
                  {SIZE_CHART.map((row) => (
                    <tr key={row.eu} className="hover:bg-blush/40 transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-charcoal">{row.eu}</td>
                      <td className="py-3.5 px-4 text-ink/80">{row.uk}</td>
                      <td className="py-3.5 px-4 text-ink/80">{row.us}</td>
                      <td className="py-3.5 px-4 font-medium text-champagne">{row.cm} cm</td>
                      <td className="py-3.5 px-4 text-ink/60">{row.in}"</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* How to Measure Step-by-Step */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white border border-charcoal/10 p-6">
              <span className="w-7 h-7 rounded-full bg-charcoal text-blush text-xs flex items-center justify-center font-medium mb-3">
                1
              </span>
              <h3 className="font-serif text-base text-charcoal mb-2">
                Place Paper on Hard Floor
              </h3>
              <p className="text-[13px] text-ink/70 leading-relaxed">
                Place a blank sheet of paper flat on a hard floor, tape one side flush against a straight wall.
              </p>
            </div>

            <div className="bg-white border border-charcoal/10 p-6">
              <span className="w-7 h-7 rounded-full bg-charcoal text-blush text-xs flex items-center justify-center font-medium mb-3">
                2
              </span>
              <h3 className="font-serif text-base text-charcoal mb-2">
                Trace Your Heel to Toe
              </h3>
              <p className="text-[13px] text-ink/70 leading-relaxed">
                Stand barefoot with your heel firmly touching the wall. Mark the tip of your longest toe with a pencil.
              </p>
            </div>

            <div className="bg-white border border-charcoal/10 p-6">
              <span className="w-7 h-7 rounded-full bg-charcoal text-blush text-xs flex items-center justify-center font-medium mb-3">
                3
              </span>
              <h3 className="font-serif text-base text-charcoal mb-2">
                Measure the Distance
              </h3>
              <p className="text-[13px] text-ink/70 leading-relaxed">
                Use a ruler to measure from the edge of the paper to your mark in centimeters. Compare to our chart.
              </p>
            </div>
          </div>

          {/* Category Fit Tips */}
          <div className="bg-white border border-charcoal/10 p-6 md:p-8 mb-12 space-y-4">
            <h2 className="font-serif text-xl text-charcoal mb-4 flex items-center gap-2">
              <HelpCircle size={20} className="text-champagne" /> Specific Silhouette Advice
            </h2>
            <div className="space-y-4 text-[13px] text-ink/80 leading-relaxed">
              <div className="flex gap-3">
                <Check size={16} className="text-champagne shrink-0 mt-0.5" />
                <div>
                  <strong className="text-charcoal">Pointed Stilettos:</strong> If you have wider feet or high arches, we recommend sizing up by 1 EU size for optimal evening comfort in pointed toe heels.
                </div>
              </div>

              <div className="flex gap-3">
                <Check size={16} className="text-champagne shrink-0 mt-0.5" />
                <div>
                  <strong className="text-charcoal">Handcrafted Khussa & Mojari:</strong> Genuine cowhide and goat leather khussas are crafted snugly. Within 2 to 3 wears, the pure leather naturally stretches and molds to the unique contours of your feet. We advise taking your exact true size.
                </div>
              </div>

              <div className="flex gap-3">
                <Check size={16} className="text-champagne shrink-0 mt-0.5" />
                <div>
                  <strong className="text-charcoal">Flat Sandals & Wedges:</strong> True to size with adjustable straps for customized fit.
                </div>
              </div>
            </div>
          </div>

          {/* Consultation CTA */}
          <div className="bg-charcoal text-blush p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-serif text-lg md:text-xl">
                Still uncertain about your size?
              </h3>
              <p className="text-blush/70 text-[13px] mt-1">
                Our Lahore atelier team will help you select the exact fit over WhatsApp.
              </p>
            </div>
            <a
              href="https://wa.me/923008492211?text=Hi%20SOLEVÉ%20team,%20I%20need%20help%20choosing%20my%20shoe%20size"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-champagne text-charcoal px-6 py-3 text-[13px] font-medium tracking-wide hover:bg-blush transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              <MessageSquare size={16} /> WhatsApp Fit Concierge
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
