import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import api from "./utils/axios";

// Components
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import { HomePage } from "./pages/HomePage";
import { OrdersPage } from "./pages/OrdersPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { ProductDetailPage } from "./pages/ProductDetailPage"; 
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";

// CSS - Only Tailwind
import "./index.css"; 

export default function App() {
  const [cart, setCart] = useState([]);

  // Fetch initial cart
  useEffect(() => {
    api.get("/cart-items")
      .then((response) => {
        setCart(response.data);
      })
      .catch((err) => console.error("Error fetching cart:", err));
  }, []);

  const addToCart = (productId, quantity = 1) => {
    api.post("/cart-items", { productId, quantity }).then(() => {
      // Refetch cart after adding
      api.get("/cart-items").then((response) => {
        setCart(response.data);
      });
    }).catch(err => console.error("Error adding to cart:", err));
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col bg-white font-sans text-obsidian">
        <Navbar cartCount={cartCount} />
        <main className="flex-grow pt-20">
          <Routes>
            <Route path="/" element={<HomePage cart={cart} addToCart={addToCart} />} />
            <Route path="/product/:id" element={<ProductDetailPage addToCart={addToCart} />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            
            <Route 
              path="/orders" 
              element={
                <ProtectedRoute>
                  <OrdersPage />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/checkout" 
              element={<CheckoutPage cart={cart} setCart={setCart} />} 
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}
