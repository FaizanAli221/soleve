"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, ArrowLeft } from "lucide-react";
import { useCartStore, FREE_SHIPPING_THRESHOLD } from "@/store/cart";
import { Order } from "@/types";

export default function CheckoutPage() {
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.subtotal());
  const shipping = useCartStore((s) => s.shipping());
  const total = useCartStore((s) => s.total());
  const clear = useCartStore((s) => s.clear);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    city: "",
    address: "",
    paymentMethod: "COD" as "COD" | "Online Payment",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  const [validationIssues, setValidationIssues] = useState<string[]>([]);
  const [serverValidated, setServerValidated] = useState(false);

  // Validate cart with backend on load
  useState(() => {
    if (items.length > 0) {
      fetch("/api/cart/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.issues && data.issues.length > 0) {
            setValidationIssues(data.issues);
          }
          setServerValidated(true);
        })
        .catch((err) => {
          console.error("Cart validation error:", err);
          setServerValidated(true);
        });
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrors({});

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, items }),
      });

      const data = await res.json();
      setSubmitting(false);

      if (!res.ok) {
        setErrors(data.errors ?? { general: data.error || "Failed to place order." });
        return;
      }

      setOrder(data.order);
      clear();
    } catch (err) {
      setSubmitting(false);
      setErrors({ general: "Network error. Please check your connection and try again." });
    }
  };

  if (order) {
    return (
      <main className="min-h-screen bg-blush flex items-center justify-center px-5">
        <div className="max-w-md w-full text-center py-16">
          <div className="w-14 h-14 rounded-full bg-charcoal text-blush flex items-center justify-center mx-auto mb-6">
            <Check size={24} />
          </div>
          <h1 className="font-serif text-2xl text-charcoal mb-2">
            Order confirmed
          </h1>
          <p className="text-ink/60 text-[14px] mb-6">
            Your order{" "}
            <span className="text-charcoal font-medium">
              {order.orderId}
            </span>{" "}
            has been placed. We'll reach out via {order.phone} to confirm
            delivery.
          </p>
          <div className="bg-white border border-charcoal/10 p-6 text-left text-[13px] space-y-2 mb-8">
            <div className="flex justify-between">
              <span className="text-ink/60">Subtotal</span>
              <span>Rs. {order.subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-ink/60">Shipping</span>
              <span>
                {order.shipping === 0 ? "Free" : `Rs. ${order.shipping}`}
              </span>
            </div>
            <div className="flex justify-between font-medium text-charcoal pt-2 border-t border-charcoal/10">
              <span>Total</span>
              <span>Rs. {order.total.toLocaleString()}</span>
            </div>
            <div className="flex justify-between pt-2">
              <span className="text-ink/60">Payment</span>
              <span>{order.paymentMethod}</span>
            </div>
          </div>
          <Link
            href="/"
            className="inline-block bg-charcoal text-blush px-7 py-3 text-[13px] tracking-wide hover:bg-ink transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-blush">
      <div className="max-w-5xl mx-auto px-5 md:px-8 py-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[13px] text-ink/60 hover:text-charcoal mb-8"
        >
          <ArrowLeft size={15} /> Back to shop
        </Link>

        {items.length === 0 ? (
          <div className="text-center py-24">
            <h1 className="font-serif text-2xl text-charcoal mb-3">
              Your bag is empty
            </h1>
            <p className="text-ink/60 mb-6 text-[14px]">
              Add something beautiful before checking out.
            </p>
            <Link
              href="/"
              className="inline-block bg-charcoal text-blush px-7 py-3 text-[13px] tracking-wide"
            >
              Return to shop
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-5 gap-12">
            <form
              onSubmit={handleSubmit}
              className="md:col-span-3 space-y-5"
            >
              <h1 className="font-serif text-2xl text-charcoal mb-6">
                Checkout
              </h1>

              {validationIssues.length > 0 && (
                <div className="bg-coral/10 border border-coral/20 p-3 space-y-1">
                  {validationIssues.map((issue, i) => (
                    <p key={i} className="text-coral text-[12px]">
                      ⚠️ {issue}
                    </p>
                  ))}
                </div>
              )}

              {errors.items && (
                <div className="bg-coral/10 border border-coral/20 p-3 text-coral text-[12px]">
                  ⚠️ {errors.items}
                </div>
              )}

              {errors.general && (
                <div className="bg-coral/10 border border-coral/20 p-3 text-coral text-[12px]">
                  ⚠️ {errors.general}
                </div>
              )}

              <div>
                <label className="block text-[12px] text-ink/60 mb-1.5">
                  Full Name
                </label>
                <input
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                  className="w-full border border-charcoal/20 px-4 py-2.5 text-[14px] outline-none focus:border-champagne bg-white"
                />
                {errors.name && (
                  <p className="text-coral text-[12px] mt-1">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-[12px] text-ink/60 mb-1.5">
                  Phone Number
                </label>
                <input
                  value={form.phone}
                  onChange={(e) =>
                    setForm({ ...form, phone: e.target.value })
                  }
                  placeholder="03xx-xxxxxxx"
                  className="w-full border border-charcoal/20 px-4 py-2.5 text-[14px] outline-none focus:border-champagne bg-white"
                />
                {errors.phone && (
                  <p className="text-coral text-[12px] mt-1">
                    {errors.phone}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-[12px] text-ink/60 mb-1.5">
                  City
                </label>
                <input
                  value={form.city}
                  onChange={(e) =>
                    setForm({ ...form, city: e.target.value })
                  }
                  className="w-full border border-charcoal/20 px-4 py-2.5 text-[14px] outline-none focus:border-champagne bg-white"
                />
                {errors.city && (
                  <p className="text-coral text-[12px] mt-1">
                    {errors.city}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-[12px] text-ink/60 mb-1.5">
                  Delivery Address
                </label>
                <textarea
                  value={form.address}
                  onChange={(e) =>
                    setForm({ ...form, address: e.target.value })
                  }
                  rows={3}
                  className="w-full border border-charcoal/20 px-4 py-2.5 text-[14px] outline-none focus:border-champagne bg-white resize-none"
                />
                {errors.address && (
                  <p className="text-coral text-[12px] mt-1">
                    {errors.address}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-[12px] text-ink/60 mb-2">
                  Payment Method
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {(["COD", "Online Payment"] as const).map((method) => (
                    <button
                      type="button"
                      key={method}
                      onClick={() =>
                        setForm({ ...form, paymentMethod: method })
                      }
                      className={`border px-4 py-3 text-[13px] text-left transition-colors ${
                        form.paymentMethod === method
                          ? "border-charcoal bg-charcoal text-blush"
                          : "border-charcoal/20 text-ink/70"
                      }`}
                    >
                      {method === "COD" ? "Cash on Delivery" : "Online Payment"}
                    </button>
                  ))}
                </div>
              </div>

              <button
                disabled={submitting}
                className="w-full bg-charcoal text-blush py-3.5 text-[13px] tracking-wide hover:bg-ink transition-colors disabled:opacity-60"
              >
                {submitting ? "Placing order…" : "Place Order"}
              </button>
            </form>

            <div className="md:col-span-2">
              <div className="bg-white border border-charcoal/10 p-6 sticky top-24">
                <h2 className="font-serif text-lg text-charcoal mb-5">
                  Order Summary
                </h2>
                <div className="space-y-4 mb-5 max-h-72 overflow-y-auto">
                  {items.map((item) => (
                    <div
                      key={`${item.productId}-${item.size}`}
                      className="flex gap-3"
                    >
                      <div className="w-14 h-16 bg-blush shrink-0 overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 text-[12px]">
                        <p className="text-charcoal">{item.name}</p>
                        <p className="text-ink/50">
                          Size {item.size} · Qty {item.quantity}
                        </p>
                      </div>
                      <p className="text-[12px] text-charcoal">
                        Rs. {(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="space-y-2 text-[13px] pt-4 border-t border-charcoal/10">
                  <div className="flex justify-between text-ink/70">
                    <span>Subtotal</span>
                    <span>Rs. {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-ink/70">
                    <span>Shipping</span>
                    <span>
                      {shipping === 0 ? "Free" : `Rs. ${shipping}`}
                    </span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-[11px] text-ink/40">
                      Free shipping on orders above Rs.{" "}
                      {FREE_SHIPPING_THRESHOLD.toLocaleString()}
                    </p>
                  )}
                  <div className="flex justify-between text-[15px] text-charcoal font-medium pt-2 border-t border-charcoal/10">
                    <span>Total</span>
                    <span>Rs. {total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
