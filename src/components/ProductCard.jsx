import { useState } from "react";
import { Link } from "react-router-dom";
import { PlusIcon } from "@heroicons/react/24/outline";

export default function ProductCard({
  id,
  image,
  name,
  price = 0,
  addToCart,
}) {
  const [isAdding, setIsAdding] = useState(false);
  
  const formattedPrice = typeof price === 'number' 
    ? `$${(price / 100).toFixed(2)}` 
    : price;

  const handleAddToCart = async (e) => {
    e.preventDefault(); // Prevent navigation if clicked on add button
    e.stopPropagation();
    
    setIsAdding(true);
    try {
      await addToCart(id, 1);
    } catch (error) {
      console.error("Failed to add to cart:", error);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="group relative">
      <Link to={`/product/${id}`} className="block">
        {/* Image Container */}
        <div className="aspect-square w-full bg-vapor overflow-hidden relative">
          <img 
            src={image} 
            alt={name} 
            className="h-full w-full object-contain object-center group-hover:scale-105 transition-transform duration-700 ease-out p-8 mix-blend-multiply" 
          />
          
          {/* Quick Add Overlay (Desktop) */}
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className="absolute bottom-4 right-4 bg-obsidian text-white p-3 rounded-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-neutral-800 disabled:opacity-50"
            aria-label="Quick Add"
          >
            <PlusIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Info */}
        <div className="mt-4 flex justify-between items-start gap-4">
          <h3 className="text-sm font-bold uppercase tracking-tight text-obsidian leading-snug">
            {name}
          </h3>
          <p className="text-sm font-medium text-neutral-500 tabular-nums">
            {formattedPrice}
          </p>
        </div>
      </Link>
    </div>
  );
}
