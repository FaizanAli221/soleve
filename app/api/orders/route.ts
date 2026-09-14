import { NextRequest, NextResponse } from "next/server";
import { products } from "@/data/products";
import { Order, OrderPayload } from "@/types";

const FREE_SHIPPING_THRESHOLD = 3500;
const STANDARD_SHIPPING = 250;

// In-memory order storage (persists while server is active)
const ordersStore: Order[] = [
  {
    orderId: "SLV-7842",
    name: "Fatima Noor",
    phone: "0300-1234567",
    city: "Lahore",
    address: "Gulberg III, Lahore",
    paymentMethod: "COD",
    items: [
      {
        productId: "p01",
        name: "Aurelia Champagne Stiletto",
        image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=900&q=80",
        price: 6900,
        size: 38,
        quantity: 1,
      },
    ],
    subtotal: 6900,
    shipping: 0,
    total: 6900,
    createdAt: new Date().toISOString(),
  },
];

function generateOrderId() {
  const num = Math.floor(1000 + Math.random() * 9000);
  return `SLV-${num}`;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const orderId = searchParams.get("orderId")?.trim().toUpperCase();

  if (!orderId) {
    return NextResponse.json(
      { error: "Order ID parameter is required." },
      { status: 400 }
    );
  }

  const order = ordersStore.find(
    (o) => o.orderId.toUpperCase() === orderId
  );

  if (!order) {
    return NextResponse.json(
      { error: `No order found with ID ${orderId}. Please verify and try again.` },
      { status: 404 }
    );
  }

  return NextResponse.json({
    found: true,
    order,
    status: "Processing",
    message: `Order ${order.orderId} for ${order.name} is confirmed and in dispatch preparation.`,
  });
}

export async function POST(request: NextRequest) {
  const body: OrderPayload = await request.json();
  const { name, phone, city, address, paymentMethod, items } = body;

  const errors: Record<string, string> = {};

  if (!name || name.trim().length < 2) errors.name = "Enter your full name.";
  if (!phone || !/^[0-9+\-\s]{7,15}$/.test(phone))
    errors.phone = "Enter a valid phone number.";
  if (!city || city.trim().length < 2) errors.city = "Enter your city.";
  if (!address || address.trim().length < 5)
    errors.address = "Enter your delivery address.";
  if (paymentMethod !== "COD" && paymentMethod !== "Online Payment")
    errors.paymentMethod = "Select a payment method.";
  if (!items || items.length === 0) errors.items = "Your cart is empty.";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  let subtotal = 0;
  for (const item of items) {
    const product = products.find((p) => p.id === item.productId);
    if (!product) {
      return NextResponse.json(
        { errors: { items: `Product ${item.productId} no longer exists.` } },
        { status: 400 }
      );
    }
    subtotal += product.price * item.quantity;
  }

  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING;
  const total = subtotal + shipping;

  const order: Order = {
    orderId: generateOrderId(),
    name,
    phone,
    city,
    address,
    paymentMethod,
    items,
    subtotal,
    shipping,
    total,
    createdAt: new Date().toISOString(),
  };

  ordersStore.unshift(order);

  return NextResponse.json({ order }, { status: 201 });
}
