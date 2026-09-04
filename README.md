# Fieldstock — E-commerce Product Page & Cart

A responsive storefront built with React, featuring live product data, a
persistent cart, search/category filtering, and a full checkout flow.

## Live features

- **Product catalog** pulled from the [Fake Store API](https://fakestoreapi.com)
- **Search + category filters** with instant client-side filtering
- **Cart** — add, adjust quantity, remove — powered by Context API + `useReducer`
- **Cart persistence** to `localStorage` (survives page refresh)
- **Checkout flow** with a real form, order summary, tax/shipping calculation, and a confirmation screen
- **Responsive layout** down to mobile
- Client-side routing with React Router (Home / Checkout)

## Tech stack

- React 18 + Vite
- React Router
- Context API + `useReducer` for cart state (no external state library needed)
- Plain CSS with a token-based design system (no UI framework — every style is intentional)

## Getting started

```bash
npm install
npm run dev
```

Open the printed local URL (usually `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview
```

## Deploying

This is a static Vite app — deploy the `dist/` output to Vercel, Netlify, or
GitHub Pages in a couple of clicks. Vercel is the fastest: import the repo at
vercel.com/new and it auto-detects the Vite build settings.

## Project structure

```
src/
  api/products.js          # Fake Store API calls
  context/CartContext.jsx  # Cart state, reducer, localStorage sync
  components/              # Header, Filters, ProductCard, ProductGrid, CartDrawer
  pages/                   # Home, Checkout
  App.jsx                  # Routing + cart drawer toggle
```

## Notes for interviews

- Cart state uses `useReducer` instead of multiple `useState` calls because
  cart actions (add/remove/update quantity/clear) are naturally modeled as
  discrete actions on one piece of state.
- Checkout does not process real payments — it's a front-end flow
  demonstrating form handling, validation, and derived calculations
  (subtotal, tax, shipping, total).
- Product images use `mix-blend-mode: multiply` to sit cleanly on the warm
  background without needing pre-processed transparent assets.
