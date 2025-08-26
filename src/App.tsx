import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useSelector } from "react-redux";
import { selectCartCount } from "./features/cart/cartSlice";

import Home from "./pages/Home";
import CartPage from "./pages/CartPage";
import NotFound from "./pages/NotFound";
export default function App() {
  const cartCount = useSelector(selectCartCount);

  return (
    <BrowserRouter>
      <header className="sticky top-0 bg-white backdrop-blur border-b shadow-sm z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
        
          <Link to="/" className="text-2xl font-bold text-blue-600">
          <img src="/images/logo.png" alt="logo fincart" className="w-64 h-10"/>
          </Link>

       
          <Link
            to="/cart"
            className="relative flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-500 text-white hover:bg-gray-600 transition"
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="hidden sm:inline">Cart</span>

          
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full shadow">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
