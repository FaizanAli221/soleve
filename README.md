# SOLEVÉ — Elegance in Every Step

A full-stack luxury footwear e-commerce storefront built with Next.js 14 (App Router), TypeScript, Tailwind CSS, and Zustand. Rebranded and elevated from a Pakistani footwear retailer reference into a modern luxury boutique concept, with a complete serverless API layer and zero external database dependencies.

## Stack

- **Framework:** Next.js 14 (App Router) + TypeScript
- **Styling:** Tailwind CSS, Playfair Display (serif) + Inter (sans)
- **State:** Zustand (cart, wishlist)
- **Icons:** lucide-react
- **Data:** In-memory JSON seed data (no database required)
- **Deployment:** Vercel (frontend + serverless API routes in `app/api`)

## Getting Started

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

## Build

```bash
npm run build
npm start
```

## Deploying to Vercel

1. Push this repository to GitHub.
2. Import the repo at [vercel.com/new](https://vercel.com/new).
3. Framework preset: Next.js (auto-detected). No environment variables are required.
4. Deploy — the API routes under `app/api` run as Vercel serverless functions automatically.

## Project Structure

```
app/
  layout.tsx           Root layout, fonts, metadata
  page.tsx              Storefront home page
  globals.css           Tailwind layers + base styles
  checkout/page.tsx     Checkout flow (shipping form, COD / online payment)
  api/
    products/route.ts          GET /api/products (filter by category, search, sort, price, size)
    products/[id]/route.ts     GET /api/products/:id
    cart/validate/route.ts     POST /api/cart/validate (subtotal, shipping, size checks)
    orders/route.ts            POST /api/orders (validation + order ID generation)
    reviews/route.ts           GET /api/reviews
components/
  Header.tsx, Hero.tsx, PromoTicker.tsx, CategoryScroller.tsx,
  ProductCard.tsx, ProductGrid.tsx, FilterBar.tsx,
  CartDrawer.tsx, Reviews.tsx, Footer.tsx
data/
  products.ts            Seed product catalog
  reviews.ts              Seed customer reviews
store/
  cart.ts                 Zustand cart store (items, shipping logic, drawer state)
  wishlist.ts              Zustand wishlist store
types/
  index.ts                 Shared TypeScript types
```

## Business Logic

- **Free shipping** on subtotals above PKR 3,500, otherwise a flat PKR 250 shipping fee — enforced consistently in the cart store, `/api/cart/validate`, and `/api/orders`.
- **Order IDs** are generated in the `SLV-####` format on order creation.
- **Size availability** is validated server-side before an order is accepted.

## Notes

- Product imagery is served from Unsplash via `next/image`-safe remote patterns configured in `next.config.js`.
- All data is in-memory seed data (`data/products.ts`, `data/reviews.ts`) — swap these for a real database or CMS when ready to go to production with persistent orders/inventory.
