"use client";

import Link from "next/link";
import {
  ArrowLeft,
  RotateCcw,
  Truck,
  CheckCircle2,
  HelpCircle,
  Clock,
  Banknote,
} from "lucide-react";
import PromoTicker from "@/components/PromoTicker";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ReturnsPage() {
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
              Customer Satisfaction Promise
            </p>
            <h1 className="font-serif text-3xl md:text-4xl text-charcoal">
              14-Day Nationwide Returns & Exchanges
            </h1>
            <p className="text-ink/60 text-[14px] mt-2">
              We understand that finding the quintessential shoe fit requires trying it on. If your SOLEVÉ piece isn't entirely perfect, our team makes returns and size swaps effortless.
            </p>
          </div>

          {/* 3 Pillars */}
          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            <div className="bg-white border border-charcoal/10 p-6 space-y-2.5">
              <RotateCcw size={22} className="text-champagne mb-2" />
              <h3 className="font-serif text-lg text-charcoal">14 Days Window</h3>
              <p className="text-[13px] text-ink/70 leading-relaxed">
                Initiate an exchange or refund within 14 calendar days from the date of courier delivery.
              </p>
            </div>

            <div className="bg-white border border-charcoal/10 p-6 space-y-2.5">
              <Truck size={22} className="text-champagne mb-2" />
              <h3 className="font-serif text-lg text-charcoal">Doorstep Pickup</h3>
              <p className="text-[13px] text-ink/70 leading-relaxed">
                We arrange reverse courier pickup via TCS or Trax straight from your doorstep nationwide.
              </p>
            </div>

            <div className="bg-white border border-charcoal/10 p-6 space-y-2.5">
              <Banknote size={22} className="text-champagne mb-2" />
              <h3 className="font-serif text-lg text-charcoal">Swift Refunds</h3>
              <p className="text-[13px] text-ink/70 leading-relaxed">
                Reimbursement processed to your Bank IBAN, JazzCash, or EasyPaisa within 4–5 business days.
              </p>
            </div>
          </div>

          {/* Simple 4-Step Process */}
          <div className="bg-white border border-charcoal/10 p-6 md:p-8 mb-12 shadow-sm">
            <h2 className="font-serif text-xl text-charcoal mb-6">
              How to Return or Exchange Your Pair
            </h2>
            <ol className="space-y-6">
              <li className="flex gap-4">
                <span className="w-8 h-8 rounded-full bg-charcoal text-blush text-xs flex items-center justify-center font-medium shrink-0">
                  1
                </span>
                <div>
                  <h4 className="font-medium text-[14px] text-charcoal mb-1">
                    Request via WhatsApp or Email
                  </h4>
                  <p className="text-[13px] text-ink/70 leading-relaxed">
                    Message our WhatsApp concierge at{" "}
                    <strong className="text-charcoal">+92 300 8492211</strong> or email{" "}
                    <strong className="text-charcoal">care@soleve.pk</strong> with your Order ID (e.g. SLV-7842) and reason for return or preferred exchange size.
                  </p>
                </div>
              </li>

              <li className="flex gap-4">
                <span className="w-8 h-8 rounded-full bg-charcoal text-blush text-xs flex items-center justify-center font-medium shrink-0">
                  2
                </span>
                <div>
                  <h4 className="font-medium text-[14px] text-charcoal mb-1">
                    Pack in Original Dust Bag & Box
                  </h4>
                  <p className="text-[13px] text-ink/70 leading-relaxed">
                    Ensure the footwear is unworn, clean, and placed inside its original satin dust bag and SOLEVÉ gift box.
                  </p>
                </div>
              </li>

              <li className="flex gap-4">
                <span className="w-8 h-8 rounded-full bg-charcoal text-blush text-xs flex items-center justify-center font-medium shrink-0">
                  3
                </span>
                <div>
                  <h4 className="font-medium text-[14px] text-charcoal mb-1">
                    Courier Doorstep Handover
                  </h4>
                  <p className="text-[13px] text-ink/70 leading-relaxed">
                    Our courier partner (TCS / Trax) will arrive at your address to collect the return parcel. No need to visit a franchise.
                  </p>
                </div>
              </li>

              <li className="flex gap-4">
                <span className="w-8 h-8 rounded-full bg-charcoal text-blush text-xs flex items-center justify-center font-medium shrink-0">
                  4
                </span>
                <div>
                  <h4 className="font-medium text-[14px] text-charcoal mb-1">
                    Dispatch of Replacement or Refund Transfer
                  </h4>
                  <p className="text-[13px] text-ink/70 leading-relaxed">
                    Once inspected, your new size is dispatched with express delivery or your refund is transferred directly to your bank account / digital wallet.
                  </p>
                </div>
              </li>
            </ol>
          </div>

          {/* Conditions Policy */}
          <div className="bg-white border border-charcoal/10 p-6 md:p-8 mb-12 space-y-3">
            <h3 className="font-serif text-lg text-charcoal mb-2">
              Eligibility Conditions
            </h3>
            <div className="space-y-2 text-[13px] text-ink/75">
              <p className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-champagne shrink-0" />
                Footwear must be unworn outdoors with pristine, scratch-free soles.
              </p>
              <p className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-champagne shrink-0" />
                Items must include all original packaging, shoe fillers, and dust bags.
              </p>
              <p className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-champagne shrink-0" />
                Clearance Sale items marked with -50% or above are eligible for size exchange only.
              </p>
            </div>
          </div>

          {/* Questions Banner */}
          <div className="bg-charcoal text-blush p-6 md:p-8 text-center sm:text-left sm:flex items-center justify-between">
            <div>
              <h3 className="font-serif text-xl mb-1">Need help with an exchange?</h3>
              <p className="text-blush/70 text-[13px]">
                Speak to our concierge directly: +92 (42) 3575-8921 or WhatsApp +92 300 8492211
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-block mt-4 sm:mt-0 bg-champagne text-charcoal px-6 py-3 text-[13px] tracking-wide hover:bg-blush transition-colors whitespace-nowrap"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
