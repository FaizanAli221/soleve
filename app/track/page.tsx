"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Search,
  Package,
  CheckCircle2,
  Clock,
  Truck,
  MapPin,
  AlertCircle,
  Loader2,
} from "lucide-react";
import PromoTicker from "@/components/PromoTicker";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Order } from "@/types";

function TrackContent() {
  const searchParams = useSearchParams();
  const initialId = searchParams.get("orderId") || "";

  const [orderId, setOrderId] = useState(initialId);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orderData, setOrderData] = useState<{
    order: Order;
    status: string;
    message: string;
  } | null>(null);

  const fetchTracking = async (idToTrack: string) => {
    const cleanId = idToTrack.trim().toUpperCase();
    if (!cleanId) return;

    setLoading(true);
    setError(null);
    setOrderData(null);

    try {
      const res = await fetch(`/api/orders?orderId=${encodeURIComponent(cleanId)}`);
      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        setError(data.error || "Order not found. Please verify your Order ID.");
        return;
      }

      setOrderData(data);
    } catch (err) {
      setLoading(false);
      setError("Unable to reach tracking server. Please check your network connection.");
    }
  };

  useEffect(() => {
    if (initialId) {
      fetchTracking(initialId);
    }
  }, [initialId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchTracking(orderId);
  };

  return (
    <div className="max-w-4xl mx-auto px-5 md:px-8 py-12">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-[13px] text-ink/60 hover:text-charcoal mb-8"
      >
        <ArrowLeft size={15} /> Back to storefront
      </Link>

      <div className="mb-10 text-center max-w-xl mx-auto">
        <p className="text-[12px] tracking-[0.25em] text-champagne uppercase font-medium mb-2">
          Real-Time Courier Dispatch
        </p>
        <h1 className="font-serif text-3xl md:text-4xl text-charcoal mb-3">
          Track Your Order
        </h1>
        <p className="text-ink/60 text-[14px]">
          Enter your SOLEVÉ order identifier (e.g.{" "}
          <strong className="text-charcoal font-medium">SLV-7842</strong>) to view dispatch status, courier consignment number, and estimated arrival.
        </p>
      </div>

      {/* Search Input Bar */}
      <div className="bg-white border border-charcoal/15 p-6 md:p-8 max-w-2xl mx-auto mb-12 shadow-sm">
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/40"
            />
            <input
              required
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="e.g. SLV-7842"
              className="w-full pl-11 pr-4 py-3 border border-charcoal/20 text-[14px] outline-none focus:border-champagne"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-charcoal text-blush px-7 py-3 text-[13px] tracking-wide hover:bg-ink transition-colors disabled:opacity-60 flex items-center justify-center gap-2 whitespace-nowrap"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Checking…
              </>
            ) : (
              "Track Status"
            )}
          </button>
        </form>

        {error && (
          <div className="mt-4 p-4 bg-coral/10 border border-coral/20 text-coral text-[13px] flex items-center gap-2">
            <AlertCircle size={16} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </div>

      {/* Tracking Result View */}
      {orderData && (
        <div className="space-y-8 animate-fade-in">
          {/* Status Timeline */}
          <div className="bg-white border border-charcoal/10 p-6 md:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-charcoal/10 pb-5 mb-6">
              <div>
                <p className="text-[12px] text-ink/50 uppercase tracking-widest">
                  Order ID
                </p>
                <h2 className="font-serif text-2xl text-charcoal">
                  {orderData.order.orderId}
                </h2>
              </div>
              <div className="text-right">
                <span className="inline-block bg-champagne/20 text-charcoal border border-champagne/30 text-[12px] px-3 py-1 font-medium">
                  Status: {orderData.status}
                </span>
                <p className="text-[11px] text-ink/50 mt-1">
                  Placed on {new Date(orderData.order.createdAt).toLocaleDateString("en-PK", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>

            {/* Visual Timeline Steps */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4">
              <div className="text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-charcoal text-blush flex items-center justify-center mx-auto">
                  <CheckCircle2 size={18} className="text-champagne" />
                </div>
                <h4 className="text-[13px] font-medium text-charcoal">
                  Confirmed
                </h4>
                <p className="text-[11px] text-ink/50">Details verified</p>
              </div>

              <div className="text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-charcoal text-blush flex items-center justify-center mx-auto">
                  <Package size={18} className="text-champagne" />
                </div>
                <h4 className="text-[13px] font-medium text-charcoal">
                  Packaging
                </h4>
                <p className="text-[11px] text-ink/50">Atelier QC in Lahore</p>
              </div>

              <div className="text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-blush border-2 border-champagne text-charcoal flex items-center justify-center mx-auto">
                  <Truck size={18} className="text-champagne" />
                </div>
                <h4 className="text-[13px] font-medium text-charcoal">
                  Dispatched
                </h4>
                <p className="text-[11px] text-ink/50">TCS / Trax Express</p>
              </div>

              <div className="text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-blush border border-charcoal/20 text-ink/30 flex items-center justify-center mx-auto">
                  <Clock size={18} />
                </div>
                <h4 className="text-[13px] font-medium text-ink/40">
                  Delivered
                </h4>
                <p className="text-[11px] text-ink/30">2–4 working days</p>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-charcoal/10 bg-blush/60 p-4 text-[13px] text-ink/80 leading-relaxed">
              {orderData.message}
            </div>
          </div>

          {/* Order Details & Summary */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border border-charcoal/10 p-6 space-y-4">
              <h3 className="font-serif text-lg text-charcoal flex items-center gap-2">
                <MapPin size={18} className="text-champagne" /> Shipping Information
              </h3>
              <div className="text-[13px] space-y-1.5 text-ink/75">
                <p>
                  <strong className="text-charcoal font-medium">Customer:</strong>{" "}
                  {orderData.order.name}
                </p>
                <p>
                  <strong className="text-charcoal font-medium">Contact:</strong>{" "}
                  {orderData.order.phone}
                </p>
                <p>
                  <strong className="text-charcoal font-medium">City:</strong>{" "}
                  {orderData.order.city}
                </p>
                <p>
                  <strong className="text-charcoal font-medium">Address:</strong>{" "}
                  {orderData.order.address}
                </p>
                <p>
                  <strong className="text-charcoal font-medium">Payment Mode:</strong>{" "}
                  {orderData.order.paymentMethod}
                </p>
              </div>
            </div>

            <div className="bg-white border border-charcoal/10 p-6 space-y-4">
              <h3 className="font-serif text-lg text-charcoal">
                Order Items ({orderData.order.items.length})
              </h3>
              <div className="space-y-3 max-h-48 overflow-y-auto">
                {orderData.order.items.map((item, idx) => (
                  <div key={idx} className="flex gap-3 text-[13px] items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-14 object-cover bg-blush"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-charcoal">{item.name}</p>
                      <p className="text-[11px] text-ink/50">
                        Size {item.size} · Qty {item.quantity}
                      </p>
                    </div>
                    <p className="text-charcoal font-medium">
                      Rs. {(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
              <div className="pt-3 border-t border-charcoal/10 space-y-1.5 text-[13px]">
                <div className="flex justify-between text-ink/60">
                  <span>Subtotal</span>
                  <span>Rs. {orderData.order.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-ink/60">
                  <span>Shipping</span>
                  <span>
                    {orderData.order.shipping === 0
                      ? "Free"
                      : `Rs. ${orderData.order.shipping}`}
                  </span>
                </div>
                <div className="flex justify-between text-charcoal font-medium text-[15px] pt-2 border-t border-charcoal/10">
                  <span>Total Payable</span>
                  <span>Rs. {orderData.order.total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function TrackPage() {
  return (
    <main className="min-h-screen bg-blush flex flex-col justify-between">
      <div>
        <PromoTicker />
        <Header
          onSearch={() => {}}
          onCategorySelect={() => {}}
          activeCategory="All"
        />
        <Suspense
          fallback={
            <div className="py-24 text-center text-ink/50">
              Loading tracking portal…
            </div>
          }
        >
          <TrackContent />
        </Suspense>
      </div>
      <Footer />
    </main>
  );
}
