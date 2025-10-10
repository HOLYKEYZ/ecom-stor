import { useState, useEffect } from "react";
import axios from "axios";
import ProductsGrid from "../components/ProductsGrid";
import "./homepage.css";

export function HomePage({ cart, addToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Fetching products...");
    axios
      .get("https://backend-images-app.onrender.com/api/products")
      .then((response) => {
        console.log("Products received:", response.data);
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);
  return (
    <main className="home-page container">
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Our Store</h1>
          <p>Discover the best products at unbeatable prices.</p>
          <button
            className="btn btn-primary"
            onClick={() =>
              document
                .querySelector(".featured-products")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            Shop Now
          </button>
        </div>
      </section>

      <section className="featured-products">
        <h2>Featured Products</h2>
        
        {loading && (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading products...</p>
          </div>
        )}
        
        {error && (
          <div className="error-message">
            <p>Error loading products: {error}</p>
          </div>
        )}
        
        {!loading && !error && products.length === 0 && (
          <div className="no-products">
            <p>No products available at the moment.</p>
          </div>
        )}
        
        {!loading && !error && products.length > 0 && (
          <ProductsGrid products={products} addToCart={addToCart} />
        )}
      </section>
    </main>
  );
}
