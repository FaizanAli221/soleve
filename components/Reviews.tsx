"use client";

import { useEffect, useState } from "react";
import { Star, BadgeCheck } from "lucide-react";
import { Review } from "@/types";

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [aggregate, setAggregate] = useState<number>(4.8);

  useEffect(() => {
    fetch("/api/reviews")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load reviews");
        return res.json();
      })
      .then((data) => {
        if (data.reviews) setReviews(data.reviews);
        if (data.aggregateRating) setAggregate(data.aggregateRating);
      })
      .catch((err) => console.error("Error loading reviews:", err));
  }, []);

  return (
    <section className="bg-white/50 py-20">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-2xl md:text-3xl text-charcoal mb-3">
            What our customers say
          </h2>
          <div className="inline-flex items-center gap-2 text-[14px] text-ink/70">
            <span className="font-medium text-charcoal">{aggregate}</span>
            <span className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={
                    i < Math.round(aggregate)
                      ? "fill-champagne text-champagne"
                      : "text-charcoal/15"
                  }
                />
              ))}
            </span>
            {reviews.length > 0 && <span>{reviews.length} reviews</span>}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-blush border border-charcoal/10 p-5"
            >
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={12}
                    className={
                      i < review.rating
                        ? "fill-champagne text-champagne"
                        : "text-charcoal/15"
                    }
                  />
                ))}
              </div>
              <h3 className="font-medium text-[14px] text-charcoal mb-1.5">
                {review.title}
              </h3>
              <p className="text-[13px] text-ink/70 leading-relaxed mb-4">
                {review.body}
              </p>
              <div className="flex items-center gap-1.5 text-[12px] text-ink/50">
                {review.author}
                {review.verified && (
                  <BadgeCheck size={13} className="text-champagne" />
                )}
                <span className="text-ink/30">·</span>
                {review.product}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
