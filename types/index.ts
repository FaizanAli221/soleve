export type Category =
  | "New In"
  | "Khussa & Flats"
  | "Heels"
  | "Sandals"
  | "Bags"
  | "Fragrances"
  | "Clearance Sale";

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: Category;
  price: number; // sale price in PKR
  originalPrice: number; // crossed-out price in PKR
  rating: number;
  reviewCount: number;
  image: string;
  sizes: number[];
  badge?: "New" | "Sale";
  isNew?: boolean;
  inStock?: boolean;
  popularity: number; // used for "sort by popularity"
  description: string;
}

export interface CartItem {
  productId: string;
  name: string;
  image: string;
  price: number;
  size: number;
  quantity: number;
}

export interface Review {
  id: string;
  author: string;
  verified: boolean;
  rating: number;
  title: string;
  body: string;
  product: string;
  daysAgo: number;
}

export interface OrderPayload {
  name: string;
  phone: string;
  city: string;
  address: string;
  paymentMethod: "COD" | "Online Payment";
  items: CartItem[];
}

export interface Order extends OrderPayload {
  orderId: string;
  subtotal: number;
  shipping: number;
  total: number;
  createdAt: string;
}
