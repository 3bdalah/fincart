import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '@/features/cart/cartSlice'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
})


store.subscribe(() => {
  try {
    const state = store.getState()
    const serialized = JSON.stringify(state.cart.items)
    localStorage.setItem('cart', serialized)
  } catch (e) {
    // ignore write errors
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
