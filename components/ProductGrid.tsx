"use client";

import { Product } from "@/types";
import ProductCard from "@/components/ProductCard";

export default function ProductGrid({
  products,
  title,
  loading,
  onSelectProduct,
}: {
  products: Product[];
  title: string;
  loading: boolean;
  onSelectProduct?: (id: string) => void;
}) {
  return (
    <section id="shop" className="max-w-7xl mx-auto px-5 md:px-8 py-6">
      <div className="flex items-end justify-between mb-8">
        <h2 className="font-serif text-2xl md:text-3xl text-charcoal">
          {title}
        </h2>
        <span className="text-[13px] text-ink/50">
          {products.length} {products.length === 1 ? "piece" : "pieces"}
        </span>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-10">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-[3/4] bg-charcoal/5 mb-4" />
              <div className="h-3 bg-charcoal/10 w-1/2 mb-2" />
              <div className="h-4 bg-charcoal/10 w-3/4" />
            </div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="py-24 text-center text-ink/50">
          No pieces match your filters. Try broadening your search.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-10">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
            />
          ))}
        </div>
      )}
    </section>
  );
}
