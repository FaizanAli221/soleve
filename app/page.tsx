"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
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

function StorefrontContent() {
  const searchParams = useSearchParams();
  const urlCategory = searchParams.get("category");
  const urlSearch = searchParams.get("search");

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(urlCategory || "All");
  const [search, setSearch] = useState(urlSearch || "");
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [filters, setFilters] = useState<Filters>({
    priceRange: [0, 999999],
    size: null,
    sort: "",
  });

  useEffect(() => {
    if (urlCategory) {
      setCategory(urlCategory);
      const el = document.getElementById("shop");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }, [urlCategory]);

  useEffect(() => {
    if (urlSearch !== null) {
      setSearch(urlSearch);
    }
  }, [urlSearch]);

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

  const handleCategorySelect = (newCat: string) => {
    setCategory(newCat);
    const el = document.getElementById("shop");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const gridTitle =
    category === "All" ? "Trending This Week" : category;

  return (
    <main>
      <PromoTicker />
      <Header
        onSearch={setSearch}
        onCategorySelect={handleCategorySelect}
        activeCategory={category}
        categories={categories.length > 0 ? categories : undefined}
      />
      <Hero
        onShopHeels={() => handleCategorySelect("Heels")}
        onShopKhussa={() => handleCategorySelect("Khussa & Flats")}
      />
      <CategoryScroller onSelect={handleCategorySelect} />
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

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-blush flex items-center justify-center font-serif text-charcoal">
          Loading SOLEVÉ…
        </div>
      }
    >
      <StorefrontContent />
    </Suspense>
  );
}
