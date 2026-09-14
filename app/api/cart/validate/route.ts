import { NextRequest, NextResponse } from "next/server";
import { products } from "@/data/products";
import { CartItem } from "@/types";

const FREE_SHIPPING_THRESHOLD = 3500;
const STANDARD_SHIPPING = 250;

export async function POST(request: NextRequest) {
  const body = await request.json();
  const items: CartItem[] = body.items ?? [];

  if (!Array.isArray(items) || items.length === 0) {
    return NextResponse.json(
      { error: "Cart is empty or malformed." },
      { status: 400 }
    );
  }

  const issues: string[] = [];
  let subtotal = 0;

  for (const item of items) {
    const product = products.find((p) => p.id === item.productId);
    if (!product) {
      issues.push(`Product ${item.productId} no longer exists.`);
      continue;
    }
    if (product.sizes.length > 0 && !product.sizes.includes(item.size)) {
      issues.push(`${product.name} is not available in size ${item.size}.`);
      continue;
    }
    subtotal += product.price * item.quantity;
  }

  const shipping =
    issues.length > 0 || subtotal === 0
      ? 0
      : subtotal >= FREE_SHIPPING_THRESHOLD
      ? 0
      : STANDARD_SHIPPING;

  const valid = issues.length === 0;

  return NextResponse.json({
    valid,
    issues,
    subtotal,
    shipping,
    total: subtotal + shipping,
    freeShippingRemaining: Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal),
  });
}
