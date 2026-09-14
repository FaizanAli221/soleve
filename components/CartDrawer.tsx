"use client";

import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCartStore, FREE_SHIPPING_THRESHOLD } from "@/store/cart";

export default function CartDrawer() {
  const isOpen = useCartStore((s) => s.isOpen);
  const close = useCartStore((s) => s.close);
  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const subtotal = useCartStore((s) => s.subtotal());
  const shipping = useCartStore((s) => s.shipping());
  const total = useCartStore((s) => s.total());

  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-charcoal/50 z-50 animate-fade-in"
          onClick={close}
        />
      )}
      <aside
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-blush z-50 flex flex-col transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-charcoal/10">
          <h2 className="font-serif text-xl text-charcoal">Your Bag</h2>
          <button onClick={close} aria-label="Close cart">
            <X size={20} />
          </button>
        </div>

        <div className="px-6 py-4 border-b border-charcoal/10">
          {remaining > 0 ? (
            <p className="text-[12px] text-ink/60 mb-2">
              Add Rs. {remaining.toLocaleString()} more for free shipping
            </p>
          ) : (
            <p className="text-[12px] text-champagne mb-2">
              You've unlocked free shipping
            </p>
          )}
          <div className="h-1.5 bg-charcoal/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-champagne transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-ink/50 gap-3">
              <ShoppingBag size={32} className="opacity-40" />
              <p className="text-[14px]">Your bag is empty.</p>
            </div>
          ) : (
            <div className="space-y-5">
              {items.map((item) => (
                <div
                  key={`${item.productId}-${item.size}`}
                  className="flex gap-4"
                >
                  <div className="w-20 h-24 bg-white shrink-0 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-[14px] text-charcoal mb-1">
                      {item.name}
                    </h3>
                    <p className="text-[12px] text-ink/50 mb-2">
                      Size {item.size}
                    </p>
                    <p className="text-[13px] text-charcoal mb-3">
                      Rs. {item.price.toLocaleString()}
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center border border-charcoal/20">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.productId,
                              item.size,
                              item.quantity - 1
                            )
                          }
                          className="w-7 h-7 flex items-center justify-center"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-7 text-center text-[12px]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.productId,
                              item.size,
                              item.quantity + 1
                            )
                          }
                          className="w-7 h-7 flex items-center justify-center"
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.productId, item.size)}
                        className="text-[12px] text-coral"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-charcoal/10 space-y-2">
            <div className="flex justify-between text-[13px] text-ink/70">
              <span>Subtotal</span>
              <span>Rs. {subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-[13px] text-ink/70">
              <span>Shipping</span>
              <span>{shipping === 0 ? "Free" : `Rs. ${shipping}`}</span>
            </div>
            <div className="flex justify-between text-[15px] text-charcoal font-medium pt-2">
              <span>Total</span>
              <span>Rs. {total.toLocaleString()}</span>
            </div>
            <a
              href="/checkout"
              className="block text-center bg-charcoal text-blush py-3.5 text-[13px] tracking-wide mt-4 hover:bg-ink transition-colors"
            >
              Checkout
            </a>
          </div>
        )}
      </aside>
    </>
  );
}
