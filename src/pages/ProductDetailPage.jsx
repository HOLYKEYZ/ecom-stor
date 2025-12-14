import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/axios";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/outline";

export function ProductDetailPage({ addToCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    // Backend missing single product endpoint, fetching all
    api.get("/products")
      .then((response) => {
        const found = response.data.find(p => p.id === id);
        setProduct(found);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = async () => {
    if (!product) return;
    setIsAdding(true);
    await addToCart(product.id, quantity);
    setIsAdding(false);
    // Could add toast here
  };

  if (loading) return <div className="h-screen flex items-center justify-center"><div className="w-8 h-8 border-2 border-obsidian border-t-transparent animate-spin rounded-full"/></div>;
  if (!product) return <div className="h-screen flex items-center justify-center">Product not found.</div>;

  const price = typeof product.priceCents === 'number' ? `$${(product.priceCents / 100).toFixed(2)}` : product.priceCents;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
      {/* Left: Image Gallery */}
      <div className="bg-vapor relative h-[50vh] md:h-screen sticky top-0">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-contain p-12 mix-blend-multiply"
        />
      </div>

      {/* Right: Info */}
      <div className="p-8 md:p-24 flex flex-col justify-center bg-white">
        <div className="max-w-xl">
          <span className="text-xs font-bold tracking-widest uppercase text-neutral-400 mb-4 block">New Arrival</span>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 text-obsidian leading-[0.9]">{product.name}</h1>
          <p className="text-3xl font-light text-neutral-600 mb-12">{price}</p>

          <div className="prose prose-lg text-neutral-500 mb-12">
            <p>
              Meticulously engineered for the modern workflow. 
              Premium materials meet uncompromising utility. 
              The {product.name} defines the standard for its class.
            </p>
          </div>

          <div className="flex items-center gap-6 mb-12">
            <div className="flex items-center border border-concrete p-2 gap-4">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 hover:bg-vapor transition-colors"
              >
                <MinusIcon className="w-4 h-4" />
              </button>
              <span className="font-mono text-lg w-8 text-center">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 hover:bg-vapor transition-colors"
              >
                <PlusIcon className="w-4 h-4" />
              </button>
            </div>
            
            <button 
              onClick={handleAddToCart}
              disabled={isAdding}
              className="flex-1 btn-editorial"
            >
              {isAdding ? "Adding..." : "Add to Cart"}
            </button>
          </div>

          <div className="border-t border-concrete pt-8 space-y-4">
            <details className="cursor-pointer group">
              <summary className="flex justify-between items-center font-bold uppercase tracking-widest text-sm list-none">
                Details
                <PlusIcon className="w-4 h-4 group-open:rotate-45 transition-transform" />
              </summary>
              <div className="mt-4 text-neutral-500 text-sm leading-relaxed">
                Constructed from industrial-grade materials. Designed in Tokyo.
              </div>
            </details>
             <details className="cursor-pointer group">
              <summary className="flex justify-between items-center font-bold uppercase tracking-widest text-sm list-none">
                Shipping
                <PlusIcon className="w-4 h-4 group-open:rotate-45 transition-transform" />
              </summary>
              <div className="mt-4 text-neutral-500 text-sm leading-relaxed">
                Free worldwide shipping on orders over $200.
              </div>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
}
