import { useState } from "react";

export default function ProductCard({
  id,
  image,
  name,
  rating = 5,
  ratingCount = 0,
  price = 0,
  addToCart,
}) {
  const [quantity, setQuantity] = useState(1);
  const [showAdded, setShowAdded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Format price correctly
  const formattedPrice = typeof price === 'number' 
    ? `$${(price / 100).toFixed(2)}` 
    : price;

  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      await addToCart(id, quantity);
      setShowAdded(true);
      setTimeout(() => setShowAdded(false), 2000);
    } catch (error) {
      console.error("Failed to add to cart:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="product-container" key={id}>
      <div className="product-image-container">
        <img className="product-image" src={image} alt={name} />
      </div>

      <div className="product-name limit-text-to-2-lines">{name}</div>

      <div className="product-rating-container">
        <img
          className="product-rating-stars"
          src="/images/ratings/rating-45.png"
          alt={`${rating} stars`}
        />
        <div className="product-rating-count link-primary">{ratingCount}</div>
      </div>

      <div className="product-price">{formattedPrice}</div>

      <div className="product-quantity-container">
        <label htmlFor={`quantity-${id}`} style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          Qty:
        </label>
        <select
          id={`quantity-${id}`}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          aria-label={`Quantity for ${name}`}
        >
          {Array.from({ length: 10 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
      </div>

      <div className="product-spacer" />

      {showAdded && (
        <div className="added-to-cart show">
          <img src="/images/icons/checkmark.png" alt="added" />
          Added to Cart!
        </div>
      )}

      <button
        className="add-to-cart-button button-primary"
        onClick={handleAddToCart}
        disabled={isLoading}
      >
        {isLoading ? "Adding..." : "Add to Cart"}
      </button>
    </div>
  );
}
