import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCartItems,
  selectCartTotal,
  addToCart,
  decrement,
  removeFromCart,
  clearCart,
} from "@/features/cart/cartSlice";
import type { CartItem } from "@/features/cart/cartSlice";
import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react";

export default function CartPage() {
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const dispatch = useDispatch();

  if (items.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500 text-lg">
        Your cart is empty 🛒
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      <div className="lg:col-span-2 space-y-4">
        <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>

        {items.map((item: CartItem) => (
          <div
            key={item.id}
            className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm border"
          >
            <img
              src={item.images?.[0]}
              alt={item.title}
              className="w-24 h-24 object-cover rounded"
            />
            <div className="flex-1">
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-gray-500 text-sm">{item.category?.name}</p>
              <p className="font-bold">${item.price}</p>
            </div>

         
            <div className="flex items-center gap-2">
              <button
                onClick={() => dispatch(decrement(item.id))}
                className="p-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-2">{item.quantity}</span>
              <button
                onClick={() => dispatch(addToCart(item))}
                className="p-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

         
            <div className="w-24 text-right font-semibold">
              ${(item.price * item.quantity).toFixed(2)}
            </div>

          
            <button
              onClick={() => dispatch(removeFromCart(item.id))}
              className="ml-4 text-red-600 hover:text-red-800"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>

      
      <div className="lg:col-span-1">
        <div className="sticky top-24 p-6 bg-white rounded-xl shadow-lg border space-y-4">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-blue-600" />
            Orders
          </h3>

          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-gray-600">
            <span>Shipping</span>
            <span className="text-green-600">Free</span>
          </div>

          <div className="flex justify-between text-gray-600">
            <span>Taxes</span>
            <span>$0.00</span>
          </div>

          <hr />

          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <button
            onClick={() => dispatch(clearCart())}
            className="w-full mt-4 py-2 rounded-lg border text-red-600 hover:bg-red-50"
          >
            Clear Cart
          </button>

          <button className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
