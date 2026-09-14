"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Heart, ShoppingBag, ChevronDown, X } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";

const DEFAULT_CATEGORIES = [
  "New In",
  "Khussa & Flats",
  "Heels",
  "Sandals",
  "Bags",
  "Fragrances",
  "Clearance Sale",
];

export default function Header({
  onSearch,
  onCategorySelect,
  activeCategory,
  categories = DEFAULT_CATEGORIES,
}: {
  onSearch: (query: string) => void;
  onCategorySelect: (category: string) => void;
  activeCategory: string;
  categories?: string[];
}) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const itemCount = useCartStore((s) => s.itemCount());
  const openCart = useCartStore((s) => s.open);
  const wishlistCount = useWishlistStore((s) => s.ids.length);

  return (
    <header className="sticky top-0 z-40 bg-blush/95 backdrop-blur border-b border-charcoal/10">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="flex items-center justify-between h-20">
          <Link
            href="/"
            onClick={() => onCategorySelect("All")}
            className="font-serif text-2xl md:text-[28px] tracking-wide text-charcoal"
          >
            SOLEVÉ
          </Link>

          <nav className="hidden lg:flex items-center gap-6 text-[13px] tracking-wide text-ink/80">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => onCategorySelect(cat)}
                className={`py-2 border-b-2 transition-colors ${
                  activeCategory === cat
                    ? "border-champagne text-charcoal"
                    : "border-transparent hover:text-charcoal"
                }`}
              >
                {cat}
              </button>
            ))}
            <Link
              href="/about"
              className="py-2 border-b-2 border-transparent hover:text-charcoal text-ink/70"
            >
              Our Story
            </Link>
            <Link
              href="/contact"
              className="py-2 border-b-2 border-transparent hover:text-charcoal text-ink/70"
            >
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-4 md:gap-5 text-charcoal">
            <div className="hidden sm:flex items-center gap-1 text-[13px] text-ink/70 border border-charcoal/15 rounded-full px-3 py-1.5">
              PKR <ChevronDown size={14} />
            </div>
            <button
              aria-label="Search"
              onClick={() => setSearchOpen((v) => !v)}
              className="hover:opacity-60 transition-opacity"
            >
              {searchOpen ? <X size={20} /> : <Search size={20} />}
            </button>
            <button
              aria-label="Wishlist"
              className="relative hover:opacity-60 transition-opacity"
            >
              <Heart size={20} />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-coral text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>
            <button
              aria-label="Cart"
              onClick={openCart}
              className="relative hover:opacity-60 transition-opacity"
            >
              <ShoppingBag size={20} />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-coral text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {searchOpen && (
          <div className="pb-4 animate-fade-in">
            <input
              autoFocus
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                onSearch(e.target.value);
              }}
              placeholder="Search for heels, khussa, bags…"
              className="w-full bg-white border border-charcoal/15 rounded-full px-5 py-3 text-sm focus:border-champagne outline-none"
            />
          </div>
        )}

        <nav className="lg:hidden flex items-center gap-5 overflow-x-auto no-scrollbar pb-3 text-[13px] text-ink/80">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategorySelect(cat)}
              className={`whitespace-nowrap py-1 border-b-2 ${
                activeCategory === cat
                  ? "border-champagne text-charcoal"
                  : "border-transparent"
              }`}
            >
              {cat}
            </button>
          ))}
          <Link
            href="/about"
            className="whitespace-nowrap py-1 border-b-2 border-transparent text-ink/70"
          >
            Our Story
          </Link>
          <Link
            href="/contact"
            className="whitespace-nowrap py-1 border-b-2 border-transparent text-ink/70"
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
