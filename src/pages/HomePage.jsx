import { useState, useEffect } from "react";
import api from "../utils/axios";
import ProductsGrid from "../components/ProductsGrid";
import { motion } from "framer-motion";

export function HomePage({ cart, addToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Backend missing single product endpoint, fetching all
    api.get("/products")
      .then((response) => {
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
    <div className="min-h-screen">
      {/* Editorial Hero */}
      <section className="relative h-[80vh] bg-vapor overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10" />
           {/* Abstract minimalist background or image could go here */}
           <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center grayscale opacity-20" />
        </div>
        
        <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-9xl font-black tracking-tighter mb-6 text-obsidian leading-none"
          >
            ESSENTIALS
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-neutral-600 font-medium tracking-wide max-w-2xl mx-auto mb-12"
          >
            Curated objects for the disciplined mind.
          </motion.p>
          <motion.button 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            onClick={() => document.getElementById('shop').scrollIntoView({ behavior: 'smooth' })}
            className="btn-editorial"
          >
            View Collection
          </motion.button>
        </div>
      </section>

      {/* Products Section */}
      <section id="shop" className="max-w-[1600px] mx-auto px-6 py-32">
        <div className="flex justify-between items-baseline mb-16 border-b border-concrete pb-6">
          <h2 className="text-4xl font-black tracking-tighter uppercase">Latest Drops</h2>
          <span className="text-sm font-bold tracking-widest text-neutral-400 uppercase">AW_2025</span>
        </div>
        
        {loading && (
          <div className="flex justify-center py-20">
             <div className="w-12 h-12 border-4 border-vapor border-t-obsidian rounded-full animate-spin" />
          </div>
        )}
        
        {error && (
          <div className="text-center py-20 text-red-600 font-medium">
            System Unavailable: {error}
          </div>
        )}
        
        {!loading && !error && (
          <ProductsGrid products={products} addToCart={addToCart} />
        )}
      </section>
    </div>
  );
}
