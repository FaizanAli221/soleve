"use client";

import { useState } from "react";
import { Star, Heart, Check } from "lucide-react";
import { Product } from "@/types";
import { useCartStore } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";

export default function ProductCard({
  product,
  onSelect,
}: {
  product: Product;
  onSelect?: (id: string) => void;
}) {
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [justAdded, setJustAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const toggleWishlist = useWishlistStore((s) => s.toggle);
  const isWished = useWishlistStore((s) => s.has(product.id));

  const discount =
    product.originalPrice > product.price
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) *
            100
        )
      : 0;

  const handleAddToCart = () => {
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
    <div className="group">
      <div
        onClick={() => onSelect?.(product.id)}
        className="relative overflow-hidden bg-white/60 aspect-[3/4] cursor-pointer"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
        />
        {product.badge && (
          <span
            className={`absolute top-3 left-3 text-[11px] tracking-wide px-2.5 py-1 text-white ${
              product.badge === "Sale" ? "bg-coral" : "bg-charcoal"
            }`}
          >
            {product.badge === "Sale" ? `-${discount}%` : "New"}
          </span>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          aria-label="Toggle wishlist"
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center hover:scale-105 transition-transform"
        >
          <Heart
            size={15}
            className={isWished ? "fill-coral text-coral" : "text-charcoal"}
          />
        </button>
      </div>

      <div className="pt-4">
        <p className="text-[11px] tracking-wide text-ink/50 mb-1">
          {product.category}
        </p>
        <h3
          onClick={() => onSelect?.(product.id)}
          className="font-serif text-[15px] text-charcoal leading-snug mb-1 cursor-pointer hover:text-champagne transition-colors"
        >
          {product.name}
        </h3>
        <div className="flex items-center gap-1 mb-2 text-[12px] text-ink/60">
          <Star size={12} className="fill-champagne text-champagne" />
          {product.rating} · {product.reviewCount} reviews
        </div>

        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-[15px] text-charcoal font-medium">
            Rs. {product.price.toLocaleString()}
          </span>
          {product.originalPrice > product.price && (
            <>
              <span className="text-[13px] text-ink/40 line-through">
                Rs. {product.originalPrice.toLocaleString()}
              </span>
              <span className="text-[12px] text-coral">
                Save {discount}%
              </span>
            </>
          )}
        </div>

        {product.sizes.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`text-[11px] w-8 h-8 border transition-colors ${
                  selectedSize === size
                    ? "border-charcoal bg-charcoal text-blush"
                    : "border-charcoal/20 text-ink/70 hover:border-charcoal/60"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        )}

        <button
          onClick={handleAddToCart}
          className={`w-full py-2.5 text-[13px] tracking-wide transition-colors flex items-center justify-center gap-2 ${
            justAdded
              ? "bg-ink text-blush"
              : "bg-charcoal text-blush hover:bg-ink"
          }`}
        >
          {justAdded ? (
            <>
              <Check size={14} /> Added
            </>
          ) : (
            "Add to Cart"
          )}
        </button>
      </div>
    </div>
  );
}
