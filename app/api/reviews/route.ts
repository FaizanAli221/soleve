import { NextResponse } from "next/server";
import { reviews } from "@/data/reviews";

export async function GET() {
  const aggregate =
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  return NextResponse.json({
    reviews,
    aggregateRating: Math.round(aggregate * 10) / 10,
    count: reviews.length,
  });
}
