# 🛒 FinCart

A mini e-commerce web app built with **React, Redux Toolkit, React Query, TailwindCSS, Vite, and TypeScript**.  
This project demonstrates clean and modular React code, modern state management, and attention to UI/UX.

---

## 🚀 Features

- ✅ Product listing with **search & category filter**
- ✅ Product card with **background image style**
- ✅ **Add to Cart** with loading spinner simulation
- ✅ Cart page with:
  - Increase / decrease quantity
  - Remove items
  - Sticky order summary card
- ✅ **Toast notifications** when adding items to cart
- ✅ Pagination with icons
- ✅ Skeleton loader for images while loading
- ✅ 404 **Not Found page**
- ✅ Error Boundary for safe rendering
- ✅ Responsive & modern **TailwindCSS** UI
- ✅ Lucide icons integration

---

## 🏗️ Project Structure

```bash
├── public/             # Public assets (favicon, index.html)
├── src/
│   ├── assets/         # Static images & icons
│   ├── components/     # Reusable UI components
│   ├── features/       # Redux slices (cart, etc.)
│   ├── hooks/          # Custom hooks (categories, products, etc.)
│   ├── pages/          # Pages (Home, CartPage, NotFound)
│   ├── types/          # TypeScript types
│   ├── App.tsx         # Main app with routes
│   ├── main.tsx        # Entry point
│   └── index.css       # TailwindCSS setup
├── package.json
├── vite.config.ts
└── README.md           # Project documentation
