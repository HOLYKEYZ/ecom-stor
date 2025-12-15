import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/axios";
import { TrashIcon, PlusIcon, MinusIcon } from "@heroicons/react/24/outline";

export function CheckoutPage({ cart = [], setCart }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const navigate = useNavigate();

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => {
      // Handle potential string prices from backend "$10.00"
      const price = typeof item.Product?.price === 'string' 
        ? parseFloat(item.Product.price.replace(/[^0-9.]/g, '')) 
        : item.Product?.price;
        
      return total + (price || 0) * item.quantity;
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const shipping = subtotal > 50 ? 0 : 9.99;
  const total = subtotal + shipping;

  const handleUpdateQuantity = async (cartItemId, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      await api.put(`/cart-items/${cartItemId}`, { quantity: newQuantity });
      const response = await api.get("/cart-items");
      setCart(response.data);
    } catch (error) {
      console.error("Failed to update quantity:", error);
    }
  };

  const handleRemoveItem = async (cartItemId) => {
    try {
      await api.delete(`/cart-items/${cartItemId}`);
      const response = await api.get("/cart-items");
      setCart(response.data);
    } catch (error) {
      console.error("Failed to remove item:", error);
    }
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    try {
      await api.post("/orders", {
        items: cart,
        total: total.toFixed(2),
      });
      await api.delete("/cart-items/clear"); // Assuming backend has this, or handle loop
      setCart([]);
      setOrderPlaced(true);
      setTimeout(() => navigate("/orders"), 2500);
    } catch (error) {
      console.error("Failed order:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (orderPlaced) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-6xl font-black tracking-tighter mb-4">CONFIRMED.</h2>
        <p className="text-neutral-500 mb-8 uppercase tracking-widest">Your order has been placed.</p>
        <div className="w-16 h-1 bg-obsidian animate-pulse" />
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <h2 className="text-4xl font-bold tracking-tighter mb-4 text-neutral-300">CART IS EMPTY</h2>
        <Link to="/" className="btn-editorial">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1600px] mx-auto px-6 py-12">
      <h1 className="text-4xl font-black tracking-tighter mb-12 uppercase border-b border-concrete pb-4">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-24">
        {/* Left: Cart Items */}
        <div className="lg:col-span-2 space-y-8">
          {cart.map((item) => (
            <div key={item.id} className="flex gap-6 items-start">
              {/* Image */}
              <div className="w-24 h-24 bg-vapor shrink-0">
                <img
                  src={item.Product?.image}
                  alt={item.Product?.name}
                  className="w-full h-full object-contain p-2 mix-blend-multiply"
                />
              </div>

              {/* Details */}
              <div className="flex-grow pt-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold uppercase tracking-tight text-lg">{item.Product?.name}</h3>
                  <p className="font-medium tabular-nums text-neutral-500">
                    ${typeof item.Product?.price === 'string' ? item.Product.price.replace(/[^0-9.]/g, '') : item.Product?.price}
                  </p>
                </div>
                
                <div className="flex items-center gap-6 mt-4">
                  <div className="flex items-center border border-concrete">
                    <button 
                      onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                      className="p-1 hover:bg-vapor transition-colors"
                    >
                      <MinusIcon className="w-3 h-3" />
                    </button>
                    <span className="w-8 text-center text-sm font-mono">{item.quantity}</span>
                    <button 
                      onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                      className="p-1 hover:bg-vapor transition-colors"
                    >
                      <PlusIcon className="w-3 h-3" />
                    </button>
                  </div>
                  
                  <button 
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-xs uppercase tracking-widest text-neutral-400 hover:text-red-600 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right: Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-vapor p-8">
            <h2 className="text-xl font-bold uppercase tracking-widest mb-8">Summary</h2>
            
            <div className="space-y-4 text-sm mb-8 border-b border-concrete pb-8">
              <div className="flex justify-between text-neutral-500">
                <span>Subtotal</span>
                <span className="text-obsidian tabular-nums">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-neutral-500">
                <span>Shipping</span>
                <span className="text-obsidian tabular-nums">{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
              </div>
            </div>

            <div className="flex justify-between items-end mb-8">
              <span className="font-bold uppercase tracking-widest text-lg">Total</span>
              <span className="text-3xl font-light tabular-nums">${total.toFixed(2)}</span>
            </div>

            <button 
              onClick={handlePlaceOrder} 
              disabled={isProcessing}
              className="w-full btn-editorial"
            >
              {isProcessing ? "Processing..." : "Place Order"}
            </button>
            
            <p className="mt-4 text-xs text-center text-neutral-400">
              Secure Checkout • Free Returns
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
