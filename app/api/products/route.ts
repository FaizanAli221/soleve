import { NextRequest, NextResponse } from "next/server";
import { products, CATEGORIES } from "@/data/products";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const search = searchParams.get("search")?.toLowerCase().trim();
  const sort = searchParams.get("sort");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const size = searchParams.get("size");

  let results = [...products];

  if (category && category !== "All") {
    results = results.filter((p) => p.category === category);
  }

  if (search) {
    results = results.filter(
      (p) =>
        p.name.toLowerCase().includes(search) ||
        p.category.toLowerCase().includes(search) ||
        p.sku.toLowerCase().includes(search)
    );
  }

  if (minPrice) {
    results = results.filter((p) => p.price >= Number(minPrice));
  }

  if (maxPrice) {
    results = results.filter((p) => p.price <= Number(maxPrice));
  }

  if (size) {
    results = results.filter((p) => p.sizes.includes(Number(size)));
  }

  switch (sort) {
    case "price_asc":
      results.sort((a, b) => a.price - b.price);
      break;
    case "price_desc":
      results.sort((a, b) => b.price - a.price);
      break;
    case "popularity":
      results.sort((a, b) => b.popularity - a.popularity);
      break;
    default:
      break;
  }

  return NextResponse.json({
    products: results,
    count: results.length,
    categories: CATEGORIES,
  });
}
