import { useState } from "react";
import axios from "axios";
import "./checkout-header.css";
import "./CheckoutPage.css";

export function CheckoutPage({ cart = [], setCart }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => {
      const price = parseFloat(item.Product?.price?.replace("$", "") || 0);
      return total + price * item.quantity;
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const tax = subtotal * 0.1; // 10% tax
  const shipping = subtotal > 50 ? 0 : 9.99;
  const total = subtotal + tax + shipping;

  const handleUpdateQuantity = async (cartItemId, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      await axios.put(`/api/cart-items/${cartItemId}`, { quantity: newQuantity });
      const response = await axios.get("/api/cart-items");
      setCart(response.data);
    } catch (error) {
      console.error("Failed to update quantity:", error);
    }
  };

  const handleRemoveItem = async (cartItemId) => {
    try {
      await axios.delete(`/api/cart-items/${cartItemId}`);
      const response = await axios.get("/api/cart-items");
      setCart(response.data);
    } catch (error) {
      console.error("Failed to remove item:", error);
    }
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    try {
      await axios.post("/api/orders", {
        items: cart,
        total: total.toFixed(2),
      });
      
      // Clear cart after successful order
      await axios.delete("/api/cart-items/clear");
      setCart([]);
      setOrderPlaced(true);
      
      setTimeout(() => {
        window.location.hash = "#/orders";
      }, 2000);
    } catch (error) {
      console.error("Failed to place order:", error);
      alert("Failed to place order. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (orderPlaced) {
    return (
      <div className="checkout-page">
        <div className="order-success">
          <div className="success-icon">✓</div>
          <h2>Order Placed Successfully!</h2>
          <p>Thank you for your purchase. Redirecting to orders page...</p>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="checkout-page">
        <div className="empty-cart">
          <h2>Your Cart is Empty</h2>
          <p>Add some items to your cart to checkout.</p>
          <a href="#/" className="btn btn-primary">
            Continue Shopping
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <div className="checkout-header-content">
          <div>
            <h1>Review Your Order</h1>
            <p className="checkout-subtitle">
              {cart.length} {cart.length === 1 ? "item" : "items"} in your cart
            </p>
          </div>
          <a href="#/" className="btn-back-to-shop">
            ← Back to Shop
          </a>
        </div>
      </div>

      <div className="checkout-content">
        <div className="cart-items-section">
          <h2>Shopping Cart</h2>
          <div className="cart-items-list">
            {cart.map((item) => (
              <div key={item.id} className="cart-item-card">
                <div className="cart-item-image">
                  <img
                    src={item.Product?.image || "/images/placeholder.png"}
                    alt={item.Product?.name || "Product"}
                  />
                </div>
                <div className="cart-item-details">
                  <h3>{item.Product?.name}</h3>
                  <p className="cart-item-price">
                    {item.Product?.price || "$0.00"}
                  </p>
                  <div className="cart-item-actions">
                    <div className="quantity-controls">
                      <button
                        onClick={() =>
                          handleUpdateQuantity(item.id, item.quantity - 1)
                        }
                        className="qty-btn"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="quantity-display">{item.quantity}</span>
                      <button
                        onClick={() =>
                          handleUpdateQuantity(item.id, item.quantity + 1)
                        }
                        className="qty-btn"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="remove-btn"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div className="cart-item-total">
                  ${(
                    parseFloat(item.Product?.price?.replace("$", "") || 0) *
                    item.quantity
                  ).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="order-summary-section">
          <div className="order-summary-card">
            <h2>Order Summary</h2>
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Tax (10%):</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping:</span>
              <span>{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
            </div>
            {shipping === 0 && (
              <p className="free-shipping-note">
                🎉 You qualify for free shipping!
              </p>
            )}
            <div className="summary-divider"></div>
            <div className="summary-row summary-total">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button
              className="place-order-btn"
              onClick={handlePlaceOrder}
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : "Place Order"}
            </button>
            <a href="#/" className="continue-shopping-btn">
              ← Continue Shopping
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
