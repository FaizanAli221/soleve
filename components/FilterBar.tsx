"use client";

import { useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";

export interface Filters {
  priceRange: [number, number];
  size: number | null;
  sort: string;
}

const SIZES = [36, 37, 38, 39, 40, 41];
const PRICE_BANDS: { label: string; range: [number, number] }[] = [
  { label: "Under Rs. 4,000", range: [0, 4000] },
  { label: "Rs. 4,000 – 8,000", range: [4000, 8000] },
  { label: "Above Rs. 8,000", range: [8000, 999999] },
];

export default function FilterBar({
  filters,
  onChange,
}: {
  filters: Filters;
  onChange: (filters: Filters) => void;
}) {
  const [open, setOpen] = useState(false);

  const activeCount =
    (filters.priceRange[1] < 999999 ? 1 : 0) + (filters.size ? 1 : 0);

  return (
    <div className="max-w-7xl mx-auto px-5 md:px-8">
      <div className="flex items-center justify-between border-y border-charcoal/10 py-3">
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-2 text-[13px] text-ink/80"
        >
          <SlidersHorizontal size={15} />
          Filter{activeCount > 0 ? ` (${activeCount})` : ""}
        </button>

        <select
          value={filters.sort}
          onChange={(e) => onChange({ ...filters, sort: e.target.value })}
          className="text-[13px] bg-transparent text-ink/80 outline-none cursor-pointer"
        >
          <option value="">Sort: Featured</option>
          <option value="popularity">Sort: Popularity</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
        </select>
      </div>

      {open && (
        <div className="py-5 animate-fade-in border-b border-charcoal/10">
          <div className="mb-5">
            <p className="text-[12px] tracking-wide text-ink/50 mb-2">
              Price
            </p>
            <div className="flex flex-wrap gap-2">
              {PRICE_BANDS.map((band) => (
                <button
                  key={band.label}
                  onClick={() =>
                    onChange({
                      ...filters,
                      priceRange:
                        filters.priceRange[0] === band.range[0] &&
                        filters.priceRange[1] === band.range[1]
                          ? [0, 999999]
                          : band.range,
                    })
                  }
                  className={`text-[12px] px-3 py-1.5 border transition-colors ${
                    filters.priceRange[0] === band.range[0] &&
                    filters.priceRange[1] === band.range[1]
                      ? "border-charcoal bg-charcoal text-blush"
                      : "border-charcoal/20 text-ink/70"
                  }`}
                >
                  {band.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[12px] tracking-wide text-ink/50 mb-2">Size</p>
            <div className="flex flex-wrap gap-2">
              {SIZES.map((size) => (
                <button
                  key={size}
                  onClick={() =>
                    onChange({
                      ...filters,
                      size: filters.size === size ? null : size,
                    })
                  }
                  className={`text-[12px] w-9 h-9 border transition-colors ${
                    filters.size === size
                      ? "border-charcoal bg-charcoal text-blush"
                      : "border-charcoal/20 text-ink/70"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {activeCount > 0 && (
            <button
              onClick={() =>
                onChange({ priceRange: [0, 999999], size: null, sort: filters.sort })
              }
              className="mt-4 flex items-center gap-1 text-[12px] text-coral"
            >
              <X size={13} /> Clear filters
            </button>
          )}
        </div>
      )}
    </div>
  );
}
