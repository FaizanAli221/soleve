"use client";

import { useEffect, useState } from "react";
import { X, Star, Heart, Check, Loader2 } from "lucide-react";
import { Product } from "@/types";
import { useCartStore } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";

export default function ProductModal({
  productId,
  onClose,
}: {
  productId: string | null;
  onClose: () => void;
}) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [justAdded, setJustAdded] = useState(false);

  const addItem = useCartStore((s) => s.addItem);
  const toggleWishlist = useWishlistStore((s) => s.toggle);
  const isWished = useWishlistStore((s) =>
    productId ? s.has(productId) : false
  );

  useEffect(() => {
    if (!productId) {
      setProduct(null);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);
    setSelectedSize(null);

    fetch(`/api/products/${encodeURIComponent(productId)}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load product details.");
        return res.json();
      })
      .then((data) => {
        setProduct(data.product);
        if (data.product?.sizes?.length > 0) {
          setSelectedSize(data.product.sizes[0]);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "An unexpected error occurred.");
        setLoading(false);
      });
  }, [productId]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!productId) return null;

  const isOutOfStock = product?.inStock === false;

  const discount =
    product && product.originalPrice > product.price
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) *
            100
        )
      : 0;

  const handleAddToCart = () => {
    if (!product || isOutOfStock) return;
    const size = selectedSize ?? product.sizes[0] ?? 0;
    addItem({
      productId: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      size,
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-charcoal/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-blush border border-charcoal/15 max-w-2xl w-full relative overflow-hidden shadow-2xl animate-pop my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close product view"
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/80 hover:bg-white flex items-center justify-center transition-colors"
        >
          <X size={18} />
        </button>

        {loading ? (
          <div className="py-32 flex flex-col items-center justify-center gap-3 text-charcoal">
            <Loader2 className="animate-spin text-champagne" size={32} />
            <p className="text-sm text-ink/60">Fetching piece details…</p>
          </div>
        ) : error || !product ? (
          <div className="py-20 px-8 text-center">
            <p className="text-coral mb-4">{error || "Product not found."}</p>
            <button
              onClick={onClose}
              className="bg-charcoal text-blush px-6 py-2.5 text-xs tracking-wide"
            >
              Close
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2">
            <div className="relative aspect-[3/4] bg-white">
              <img
                src={product.image}
                alt={product.name}
                className={`w-full h-full object-cover ${
                  isOutOfStock ? "grayscale-[25%]" : ""
                }`}
              />
              {isOutOfStock ? (
                <span className="absolute top-4 left-4 text-[11px] tracking-widest uppercase px-3 py-1 bg-charcoal text-blush font-medium">
                  Sold Out
                </span>
              ) : (
                product.badge && (
                  <span
                    className={`absolute top-4 left-4 text-[11px] tracking-wide px-2.5 py-1 text-white ${
                      product.badge === "Sale" ? "bg-coral" : "bg-charcoal"
                    }`}
                  >
                    {product.badge === "Sale" ? `-${discount}%` : "New"}
                  </span>
                )
              )}
            </div>

            <div className="p-6 md:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] tracking-widest uppercase text-ink/50">
                    {product.category}
                  </span>
                  <span className="text-[11px] font-mono text-ink/40">
                    {product.sku}
                  </span>
                </div>

                <h2 className="font-serif text-2xl text-charcoal mb-2">
                  {product.name}
                </h2>

                <div className="flex items-center gap-1 mb-4 text-[12px] text-ink/60">
                  <Star size={13} className="fill-champagne text-champagne" />
                  <span className="font-medium text-charcoal">
                    {product.rating}
                  </span>
                  <span>· {product.reviewCount} reviews</span>
                </div>

                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-xl text-charcoal font-medium">
                    Rs. {product.price.toLocaleString()}
                  </span>
                  {product.originalPrice > product.price && (
                    <>
                      <span className="text-sm text-ink/40 line-through">
                        Rs. {product.originalPrice.toLocaleString()}
                      </span>
                      <span className="text-xs text-coral font-medium">
                        Save {discount}%
                      </span>
                    </>
                  )}
                </div>

                <p className="text-[13px] text-ink/75 leading-relaxed mb-6">
                  {product.description}
                </p>

                {product.sizes.length > 0 && (
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[12px] font-medium text-charcoal">
                        Select EU Size:
                      </span>
                      {selectedSize && (
                        <span className="text-[12px] text-ink/50">
                          Selected: {selectedSize}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          disabled={isOutOfStock}
                          onClick={() => setSelectedSize(size)}
                          className={`text-xs w-9 h-9 border transition-colors ${
                            isOutOfStock
                              ? "border-charcoal/10 text-charcoal/30 cursor-not-allowed bg-transparent"
                              : selectedSize === size
                              ? "border-charcoal bg-charcoal text-blush font-medium"
                              : "border-charcoal/20 text-ink/70 hover:border-charcoal/60 bg-white"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-3 pt-4 border-t border-charcoal/10">
                <button
                  disabled={isOutOfStock}
                  onClick={handleAddToCart}
                  className={`flex-1 py-3 text-[13px] tracking-wide transition-colors flex items-center justify-center gap-2 ${
                    isOutOfStock
                      ? "bg-charcoal/20 text-charcoal/50 cursor-not-allowed border border-charcoal/10"
                      : justAdded
                      ? "bg-ink text-blush"
                      : "bg-charcoal text-blush hover:bg-ink"
                  }`}
                >
                  {isOutOfStock ? (
                    "Sold Out"
                  ) : justAdded ? (
                    <>
                      <Check size={15} /> Added to bag
                    </>
                  ) : (
                    "Add to Bag"
                  )}
                </button>
                <button
                  onClick={() => toggleWishlist(product.id)}
                  aria-label="Wishlist piece"
                  className="w-12 h-12 border border-charcoal/20 bg-white flex items-center justify-center hover:border-charcoal/60 transition-colors"
                >
                  <Heart
                    size={17}
                    className={
                      isWished ? "fill-coral text-coral" : "text-charcoal"
                    }
                  />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
