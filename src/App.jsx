import axios from "axios";
import { useEffect, useState } from "react";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import { HomePage } from "./pages/HomePage";
import { OrdersPage } from "./pages/OrdersPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import "./App.css";
import "./pages/homepage.css";
import "./components/header.css";
import "./components/footer.css";
import "./components/productcard.css";

function getRouteFromHash() {
  const h = (window.location.hash || "#/").replace(/^#/, "");
  if (h === "/" || h === "") return "home";
  if (h.startsWith("/orders")) return "orders";
  if (h.startsWith("/checkout")) return "checkout";
  return "home";
}

export default function App() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios.get("https://backend-images-app.onrender.com/api/cart-items").then((response) => {
      setCart(response.data);
    });
  }, []);

  const addToCart = (productId, quantity = 1) => {
    axios.post("https://backend-images-app.onrender.com/api/cart-items", { productId, quantity }).then(() => {
      // Refetch cart after adding
      axios.get("https://backend-images-app.onrender.com/api/cart-items").then((response) => {
        setCart(response.data);
      });
    });
  };

  const [route, setRoute] = useState(getRouteFromHash());

  useEffect(() => {
    const onHash = () => setRoute(getRouteFromHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  return (
    <div className="app-root">
      <Header cart={cart} />
      <main className="app-main container">
        {route === "home" && <HomePage cart={cart} addToCart={addToCart} />}
        {route === "orders" && <OrdersPage />}
        {route === "checkout" && <CheckoutPage cart={cart} setCart={setCart} />}
      </main>
      <Footer />
    </div>
  );
}
