"use client";

import { useEffect, useState } from "react";
import PromoTicker from "@/components/PromoTicker";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CategoryScroller from "@/components/CategoryScroller";
import FilterBar, { Filters } from "@/components/FilterBar";
import ProductGrid from "@/components/ProductGrid";
import ProductModal from "@/components/ProductModal";
import Reviews from "@/components/Reviews";
import Footer from "@/components/Footer";
import { Product } from "@/types";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [filters, setFilters] = useState<Filters>({
    priceRange: [0, 999999],
    size: null,
    sort: "",
  });

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (category !== "All") params.set("category", category);
    if (search) params.set("search", search);
    if (filters.sort) params.set("sort", filters.sort);
    if (filters.priceRange[1] < 999999) {
      params.set("minPrice", String(filters.priceRange[0]));
      params.set("maxPrice", String(filters.priceRange[1]));
    }
    if (filters.size) params.set("size", String(filters.size));

    fetch(`/api/products?${params.toString()}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
      })
      .then((data) => {
        setProducts(data.products ?? []);
        if (data.categories && data.categories.length > 0) {
          setCategories(data.categories);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading products:", err);
        setProducts([]);
        setLoading(false);
      });
  }, [category, search, filters]);

  const gridTitle =
    category === "All" ? "Trending This Week" : category;

  return (
    <main>
      <PromoTicker />
      <Header
        onSearch={setSearch}
        onCategorySelect={setCategory}
        activeCategory={category}
        categories={categories.length > 0 ? categories : undefined}
      />
      <Hero
        onShopHeels={() => setCategory("Heels")}
        onShopKhussa={() => setCategory("Khussa & Flats")}
      />
      <CategoryScroller onSelect={setCategory} />
      <FilterBar filters={filters} onChange={setFilters} />
      <ProductGrid
        products={products}
        title={gridTitle}
        loading={loading}
        onSelectProduct={setSelectedProductId}
      />
      <Reviews />
      <Footer />
      <ProductModal
        productId={selectedProductId}
        onClose={() => setSelectedProductId(null)}
      />
    </main>
  );
}
