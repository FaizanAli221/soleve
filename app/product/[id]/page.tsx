"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Star,
  Heart,
  Check,
  ShoppingBag,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  Loader2,
} from "lucide-react";
import PromoTicker from "@/components/PromoTicker";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Product } from "@/types";
import { useCartStore } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params?.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const addItem = useCartStore((s) => s.addItem);
  const toggleWishlist = useWishlistStore((s) => s.toggle);
  const isWished = useWishlistStore((s) => (product ? s.has(product.id) : false));

  useEffect(() => {
    if (!productId) return;
    setLoading(true);
    setError(null);

    fetch(`/api/products/${encodeURIComponent(productId)}`)
      .then((res) => {
        if (!res.ok) throw new Error("Product not found");
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
        setError(err.message || "Failed to load product");
        setLoading(false);
      });
  }, [productId]);

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
    for (let i = 0; i < quantity; i++) {
      addItem({
        productId: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
        size,
      });
    }
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  return (
    <main className="min-h-screen bg-blush flex flex-col justify-between">
      <div>
        <PromoTicker />
        <Header
          onSearch={() => {}}
          onCategorySelect={() => {}}
          activeCategory="All"
        />

        <div className="max-w-6xl mx-auto px-5 md:px-8 py-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[13px] text-ink/60 hover:text-charcoal mb-8"
          >
            <ArrowLeft size={15} /> Back to all pieces
          </Link>

          {loading ? (
            <div className="py-32 flex flex-col items-center justify-center gap-3">
              <Loader2 className="animate-spin text-champagne" size={32} />
              <p className="text-sm text-ink/60 font-serif">Loading piece details…</p>
            </div>
          ) : error || !product ? (
            <div className="py-24 text-center">
              <h2 className="font-serif text-2xl text-charcoal mb-3">
                Piece Not Found
              </h2>
              <p className="text-ink/60 text-[14px] mb-6">
                The requested item could not be located in our catalog.
              </p>
              <Link
                href="/"
                className="bg-charcoal text-blush px-7 py-3 text-[13px] tracking-wide"
              >
                Return to Shop
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
              {/* Product Photography */}
              <div className="relative aspect-[3/4] bg-white border border-charcoal/10 overflow-hidden shadow-sm">
                <img
                  src={product.image}
                  alt={product.name}
                  className={`w-full h-full object-cover ${
                    isOutOfStock ? "grayscale-[20%]" : ""
                  }`}
                />
                {isOutOfStock ? (
                  <span className="absolute top-4 left-4 text-[11px] tracking-widest uppercase px-3 py-1 bg-charcoal text-blush font-medium shadow-sm">
                    Sold Out
                  </span>
                ) : (
                  product.badge && (
                    <span
                      className={`absolute top-4 left-4 text-[11px] tracking-wide px-3 py-1 text-white ${
                        product.badge === "Sale" ? "bg-coral" : "bg-charcoal"
                      }`}
                    >
                      {product.badge === "Sale" ? `-${discount}%` : "New"}
                    </span>
                  )
                )}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  aria-label="Toggle wishlist"
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-transform hover:scale-105 shadow-sm"
                >
                  <Heart
                    size={18}
                    className={
                      isWished ? "fill-coral text-coral" : "text-charcoal"
                    }
                  />
                </button>
              </div>

              {/* Product Details & Actions */}
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[12px] tracking-widest uppercase text-ink/50 font-medium">
                      {product.category}
                    </span>
                    <span className="text-[12px] font-mono text-ink/40">
                      {product.sku}
                    </span>
                  </div>

                  <h1 className="font-serif text-3xl sm:text-4xl text-charcoal leading-tight mb-3">
                    {product.name}
                  </h1>

                  <div className="flex items-center gap-2 text-[13px] text-ink/70">
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className="fill-champagne text-champagne"
                        />
                      ))}
                    </div>
                    <span className="font-medium text-charcoal">{product.rating}</span>
                    <span className="text-ink/30">·</span>
                    <span>{product.reviewCount} customer reviews</span>
                  </div>
                </div>

                {/* Price Display */}
                <div className="flex items-baseline gap-3 pt-2 pb-2 border-y border-charcoal/10">
                  <span className="text-2xl sm:text-3xl font-medium text-charcoal">
                    Rs. {product.price.toLocaleString()}
                  </span>
                  {product.originalPrice > product.price && (
                    <>
                      <span className="text-base text-ink/40 line-through">
                        Rs. {product.originalPrice.toLocaleString()}
                      </span>
                      <span className="text-xs text-coral font-medium bg-coral/10 px-2 py-0.5 rounded">
                        Save {discount}%
                      </span>
                    </>
                  )}
                  <span className="ml-auto text-[12px] text-ink/50">
                    Tax included · Free shipping over Rs. 3,500
                  </span>
                </div>

                {/* Description */}
                <p className="text-[14px] text-ink/80 leading-relaxed">
                  {product.description}
                </p>

                {/* Size Selector */}
                {product.sizes.length > 0 && (
                  <div className="space-y-2.5 pt-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[13px] font-medium text-charcoal">
                        Select EU Size:
                      </span>
                      <Link
                        href="/size-guide"
                        className="text-[12px] text-champagne hover:underline"
                      >
                        Size Guide & Fit Advice →
                      </Link>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          disabled={isOutOfStock}
                          onClick={() => setSelectedSize(size)}
                          className={`text-[13px] w-11 h-11 border transition-colors ${
                            isOutOfStock
                              ? "border-charcoal/10 text-charcoal/30 cursor-not-allowed"
                              : selectedSize === size
                              ? "border-charcoal bg-charcoal text-blush font-medium shadow-sm"
                              : "border-charcoal/20 text-ink/80 hover:border-charcoal/60 bg-white"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity & Add to Cart */}
                <div className="pt-3 space-y-4">
                  <div className="flex gap-4">
                    <div className="flex items-center border border-charcoal/20 bg-white">
                      <button
                        disabled={isOutOfStock || quantity <= 1}
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="w-10 h-12 flex items-center justify-center text-charcoal disabled:opacity-40"
                      >
                        -
                      </button>
                      <span className="w-10 text-center text-[13px] font-medium">
                        {quantity}
                      </span>
                      <button
                        disabled={isOutOfStock}
                        onClick={() => setQuantity((q) => q + 1)}
                        className="w-10 h-12 flex items-center justify-center text-charcoal disabled:opacity-40"
                      >
                        +
                      </button>
                    </div>

                    <button
                      disabled={isOutOfStock}
                      onClick={handleAddToCart}
                      className={`flex-1 py-3.5 text-[13px] tracking-wide transition-colors flex items-center justify-center gap-2 ${
                        isOutOfStock
                          ? "bg-charcoal/20 text-charcoal/50 cursor-not-allowed border border-charcoal/10"
                          : justAdded
                          ? "bg-ink text-blush"
                          : "bg-charcoal text-blush hover:bg-ink"
                      }`}
                    >
                      {isOutOfStock ? (
                        "Sold Out for Restocking"
                      ) : justAdded ? (
                        <>
                          <Check size={16} /> Added to Your Bag
                        </>
                      ) : (
                        <>
                          <ShoppingBag size={16} /> Add to Cart · Rs.{" "}
                          {(product.price * quantity).toLocaleString()}
                        </>
                      )}
                    </button>
                  </div>

                  {!isOutOfStock && (
                    <Link
                      href="/checkout"
                      onClick={handleAddToCart}
                      className="block text-center w-full py-3 border border-charcoal text-charcoal text-[13px] tracking-wide hover:bg-charcoal hover:text-blush transition-colors"
                    >
                      Buy Now with Cash on Delivery (COD)
                    </Link>
                  )}
                </div>

                {/* Boutique Assurance Pillars */}
                <div className="pt-6 border-t border-charcoal/10 grid grid-cols-2 gap-4 text-[12px] text-ink/75">
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck size={18} className="text-champagne shrink-0" />
                    <span>Pure Handcrafted Leather</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <RotateCcw size={18} className="text-champagne shrink-0" />
                    <span>14-Day Free Exchange</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Truck size={18} className="text-champagne shrink-0" />
                    <span>TCS / Trax Nationwide COD</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Sparkles size={18} className="text-champagne shrink-0" />
                    <span>Lahore Atelier Quality</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}
