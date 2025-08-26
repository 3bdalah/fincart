import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import type { Product } from "@/types/product";
import type { RootState } from "@/app/store";
import toast from "react-hot-toast";

export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: (() => {
    try {
      const raw = localStorage.getItem("cart");
      return raw ? (JSON.parse(raw) as CartItem[]) : [];
    } catch {
      return [];
    }
  })(),
};

const slice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existing = state.items.find((i) => i.id === action.payload.id);
      if (existing) {
        existing.quantity += 1;
        toast.success(`${existing.title} increased successfully `);
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
        toast.success(`${action.payload.title} added to cart `);
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
       toast.success(` Removed Successfully from cart `);
    },
    decrement: (state, action: PayloadAction<number>) => {
      const existing = state.items.find((i) => i.id === action.payload);
      if (existing) {
        existing.quantity -= 1;
         toast.success(`${existing.title} decrement successfully `);
        if (existing.quantity <= 0) {
          state.items = state.items.filter((i) => i.id !== action.payload);
          
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
       toast.success(` Cleared  Successfully  cart `);
    },
  },
});

export const { addToCart, removeFromCart, decrement, clearCart } =
  slice.actions;
export default slice.reducer;

export const selectCartItems = (s: RootState) => s.cart.items;
export const selectCartCount = createSelector([selectCartItems], (items) =>
  items.reduce((acc, i) => acc + i.quantity, 0)
);
export const selectCartTotal = createSelector([selectCartItems], (items) =>
  items.reduce((acc, i) => acc + i.price * i.quantity, 0)
);
