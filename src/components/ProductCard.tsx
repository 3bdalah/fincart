import React, { useState } from "react";
import type { Product } from "@/types/product";
import { useDispatch } from "react-redux";
import { addToCart } from "@/features/cart/cartSlice";
import { Loader2, ShoppingCart } from "lucide-react";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const img =
    product.images?.[0] || "https://via.placeholder.com/300x200?text=No+Image";

  const handleAddToCart = () => {
    setLoading(true);
    //  just han simulate  el request with 0.5s delay to show loading every time tmam :)
    setTimeout(() => {
      dispatch(addToCart(product));
      setLoading(false);
    }, 500);
  };

  return (
    <article
      className="relative rounded-lg overflow-hidden shadow-md border bg-gray-100 group h-72"
      aria-label={`Product: ${product.title}`}
    >
      <img
        src={img}
        alt={product.title || "Product image not available"}
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div
        className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition"
        aria-hidden="true"
      />

      <span
        className="absolute top-2 left-2 bg-white/80 text-gray-700 text-xs font-medium px-2 py-1 rounded-md shadow-sm"
        aria-label={`Category: ${product.category?.name || "Uncategorized"}`}
      >
        {product.category?.name}
      </span>

      <button
        onClick={handleAddToCart}
        disabled={loading}
        className="z-40 absolute top-2 right-2 bg-blue-600 hover:bg-blue-700 text-white p-2 px-4 rounded-md shadow-md flex items-center justify-center transition focus:outline-none focus:ring-2 focus:ring-blue-400"
        aria-label={
          loading ? "Adding product to cart..." : "Add product to cart"
        }
      >
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
        ) : (
          <ShoppingCart className="w-5 h-5" aria-hidden="true" />
        )}
      </button>

      <div className="absolute bottom-0 bg-gray-600 w-full py-3 flex flex-col justify-center items-center text-center px-1 text-white">
        <h3 className="text-md font-mono drop-shadow line-clamp-1">
          {product.title}
        </h3>
      </div>

      <div
        className="absolute bottom-14 left-2 bg-white/90 text-gray-800 px-3 py-1 rounded-md font-bold shadow-sm"
        aria-label={`Price: $${product.price}`}
      >
        ${product.price}
      </div>
    </article>
  );
}
