"use client";

import { create } from "zustand";
import { CartItem } from "@/types";

export const FREE_SHIPPING_THRESHOLD = 3500;
export const STANDARD_SHIPPING = 250;

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (productId: string, size: number) => void;
  updateQuantity: (productId: string, size: number, quantity: number) => void;
  clear: () => void;
  subtotal: () => number;
  shipping: () => number;
  total: () => number;
  itemCount: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  toggle: () => set((s) => ({ isOpen: !s.isOpen })),
  addItem: (item) =>
    set((state) => {
      const existing = state.items.find(
        (i) => i.productId === item.productId && i.size === item.size
      );
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.productId === item.productId && i.size === item.size
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
          isOpen: true,
        };
      }
      return {
        items: [...state.items, { ...item, quantity: 1 }],
        isOpen: true,
      };
    }),
  removeItem: (productId, size) =>
    set((state) => ({
      items: state.items.filter(
        (i) => !(i.productId === productId && i.size === size)
      ),
    })),
  updateQuantity: (productId, size, quantity) =>
    set((state) => ({
      items: state.items
        .map((i) =>
          i.productId === productId && i.size === size
            ? { ...i, quantity: Math.max(1, quantity) }
            : i
        )
        .filter((i) => i.quantity > 0),
    })),
  clear: () => set({ items: [] }),
  subtotal: () =>
    get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
  shipping: () => {
    const sub = get().subtotal();
    if (sub === 0) return 0;
    return sub >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING;
  },
  total: () => get().subtotal() + get().shipping(),
  itemCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
}));
