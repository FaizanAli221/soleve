"use client";

import { useState } from "react";
import { ChevronDown, X, Instagram, Facebook } from "lucide-react";

const FAQS = [
  {
    q: "What is your return policy?",
    a: "Unworn items in original packaging can be returned within 14 days of delivery for a full refund or exchange.",
  },
  {
    q: "How long does delivery take?",
    a: "Orders within major cities arrive in 2–4 working days. Other regions may take up to 7 working days.",
  },
  {
    q: "Do you offer Cash on Delivery?",
    a: "Yes — Cash on Delivery is available nationwide alongside secure online payment.",
  },
  {
    q: "How do I find my size?",
    a: "Use the size guide below to convert your usual size to our EU sizing, or contact us for fit advice.",
  },
];

const SIZE_GUIDE = [
  { eu: 36, uk: 3, us: 5.5, cm: 23 },
  { eu: 37, uk: 4, us: 6.5, cm: 23.5 },
  { eu: 38, uk: 5, us: 7.5, cm: 24 },
  { eu: 39, uk: 6, us: 8.5, cm: 24.5 },
  { eu: 40, uk: 7, us: 9.5, cm: 25 },
  { eu: 41, uk: 8, us: 10, cm: 25.5 },
];

export default function Footer() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [trackingOpen, setTrackingOpen] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [trackResult, setTrackResult] = useState<string | null>(null);
  const [trackError, setTrackError] = useState<string | null>(null);
  const [trackLoading, setTrackLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId.trim()) return;
    setTrackLoading(true);
    setTrackResult(null);
    setTrackError(null);

    try {
      const res = await fetch(
        `/api/orders?orderId=${encodeURIComponent(orderId.trim())}`
      );
      const data = await res.json();
      setTrackLoading(false);

      if (!res.ok) {
        setTrackError(
          data.error || "Order not found. Please verify your order ID."
        );
        return;
      }

      setTrackResult(
        `${data.message} (Status: ${data.status} · Total: Rs. ${data.order.total.toLocaleString()} · ${data.order.items.length} item(s))`
      );
    } catch (err) {
      setTrackLoading(false);
      setTrackError("Unable to connect to order server. Please try again.");
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
  };

  return (
    <footer className="bg-charcoal text-blush">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-16">
        <div className="mb-12 max-w-2xl">
          {FAQS.map((faq, i) => (
            <div key={faq.q} className="border-t border-blush/15 py-4">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between text-left text-[14px]"
              >
                {faq.q}
                <ChevronDown
                  size={16}
                  className={`transition-transform ${
                    openFaq === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openFaq === i && (
                <p className="text-[13px] text-blush/60 mt-3 leading-relaxed animate-fade-in">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
          <div className="border-t border-blush/15" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12 text-[13px]">
          <div>
            <p className="text-blush/50 mb-3 tracking-wide">Get in touch</p>
            <p className="text-blush/80 mb-1">+92-42-111-786-000</p>
            <p className="text-blush/80">care@soleve.pk</p>
          </div>
          <div>
            <p className="text-blush/50 mb-3 tracking-wide">Information</p>
            <button
              onClick={() => setTrackingOpen(true)}
              className="block text-blush/80 hover:text-champagne mb-2 text-left"
            >
              Track Your Order
            </button>
            <button
              onClick={() => setSizeGuideOpen(true)}
              className="block text-blush/80 hover:text-champagne text-left"
            >
              Size Guide
            </button>
          </div>
          <div>
            <p className="text-blush/50 mb-3 tracking-wide">About</p>
            <p className="text-blush/80 mb-2">Our Story</p>
            <p className="text-blush/80">Contact Us</p>
          </div>
          <div>
            <p className="text-blush/50 mb-3 tracking-wide">Explore</p>
            <p className="text-blush/80 mb-2">New In</p>
            <p className="text-blush/80">Clearance Sale</p>
          </div>
          <div className="col-span-2 md:col-span-1">
            <p className="text-blush/50 mb-3 tracking-wide">
              Sign up and save
            </p>
            {subscribed ? (
              <p className="text-champagne text-[13px]">
                You're subscribed — welcome to SOLEVÉ.
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="bg-transparent border border-blush/30 px-3 py-2 text-[13px] flex-1 outline-none focus:border-champagne"
                />
                <button className="border border-l-0 border-blush/30 px-3 text-[13px]">
                  →
                </button>
              </form>
            )}
            <div className="flex gap-3 mt-5">
              <Instagram size={16} className="text-blush/70" />
              <Facebook size={16} className="text-blush/70" />
            </div>
          </div>
        </div>

        <div className="border-t border-blush/15 pt-6 text-[12px] text-blush/40">
          © 2026 SOLEVÉ. All rights reserved.
        </div>
      </div>

      {trackingOpen && (
        <div
          className="fixed inset-0 bg-charcoal/70 z-50 flex items-center justify-center px-5 animate-fade-in"
          onClick={() => setTrackingOpen(false)}
        >
          <div
            className="bg-blush text-ink max-w-sm w-full p-7 animate-pop"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-serif text-lg text-charcoal">
                Track Your Order
              </h3>
              <button onClick={() => setTrackingOpen(false)}>
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleTrack} className="space-y-3">
              <input
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="Order ID (e.g. SLV-7842)"
                className="w-full border border-charcoal/20 px-4 py-2.5 text-[13px] outline-none focus:border-champagne"
              />
              <button
                disabled={trackLoading}
                className="w-full bg-charcoal text-blush py-2.5 text-[13px] tracking-wide disabled:opacity-60 transition-opacity"
              >
                {trackLoading ? "Checking Status…" : "Track Order"}
              </button>
            </form>
            {trackError && (
              <p className="text-[13px] text-coral mt-4 bg-coral/10 p-3 border border-coral/20">
                {trackError}
              </p>
            )}
            {trackResult && (
              <p className="text-[13px] text-ink/80 mt-4 bg-white p-3 border border-charcoal/15">
                {trackResult}
              </p>
            )}
          </div>
        </div>
      )}

      {sizeGuideOpen && (
        <div
          className="fixed inset-0 bg-charcoal/70 z-50 flex items-center justify-center px-5 animate-fade-in"
          onClick={() => setSizeGuideOpen(false)}
        >
          <div
            className="bg-blush text-ink max-w-md w-full p-7 animate-pop"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-serif text-lg text-charcoal">Size Guide</h3>
              <button onClick={() => setSizeGuideOpen(false)}>
                <X size={18} />
              </button>
            </div>
            <table className="w-full text-[13px]">
              <thead>
                <tr className="border-b border-charcoal/15 text-ink/50">
                  <th className="text-left py-2 font-normal">EU</th>
                  <th className="text-left py-2 font-normal">UK</th>
                  <th className="text-left py-2 font-normal">US</th>
                  <th className="text-left py-2 font-normal">Foot (cm)</th>
                </tr>
              </thead>
              <tbody>
                {SIZE_GUIDE.map((row) => (
                  <tr key={row.eu} className="border-b border-charcoal/10">
                    <td className="py-2">{row.eu}</td>
                    <td className="py-2">{row.uk}</td>
                    <td className="py-2">{row.us}</td>
                    <td className="py-2">{row.cm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </footer>
  );
}
