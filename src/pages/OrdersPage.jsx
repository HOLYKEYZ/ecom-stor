import { useState, useEffect } from "react";
import axios from "axios";
import "./OrdersPage.css";

export function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/orders")
      .then((response) => {
        setOrders(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch orders:", error);
        setLoading(false);
      });
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="orders-page">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading your orders...</p>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="orders-page">
        <div className="empty-orders">
          <div className="empty-icon">📦</div>
          <h2>No Orders Yet</h2>
          <p>You haven't placed any orders yet. Start shopping to see your orders here!</p>
          <a href="#/" className="btn btn-primary">
            Start Shopping
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <div className="orders-header">
        <h1>Your Orders</h1>
        <p className="orders-subtitle">
          {orders.length} {orders.length === 1 ? "order" : "orders"} placed
        </p>
      </div>

      <div className="orders-list">
        {orders.map((order) => (
          <div key={order.id} className="order-card">
            <div className="order-card-header">
              <div className="order-info">
                <div className="order-info-item">
                  <span className="order-info-label">Order ID:</span>
                  <span className="order-info-value">#{order.id}</span>
                </div>
                <div className="order-info-item">
                  <span className="order-info-label">Order Date:</span>
                  <span className="order-info-value">
                    {formatDate(order.createdAt)}
                  </span>
                </div>
                <div className="order-info-item">
                  <span className="order-info-label">Total:</span>
                  <span className="order-info-value order-total">
                    ${parseFloat(order.total || 0).toFixed(2)}
                  </span>
                </div>
              </div>
              <div className="order-status">
                <span className="status-badge status-delivered">
                  ✓ Delivered
                </span>
              </div>
            </div>

            <div className="order-items">
              {order.OrderItems?.map((item, index) => (
                <div key={index} className="order-item">
                  <div className="order-item-image">
                    <img
                      src={item.Product?.image || "/images/placeholder.png"}
                      alt={item.Product?.name || "Product"}
                    />
                  </div>
                  <div className="order-item-details">
                    <h4>{item.Product?.name}</h4>
                    <p className="order-item-meta">
                      Quantity: {item.quantity} × {item.Product?.price}
                    </p>
                  </div>
                  <div className="order-item-price">
                    ${(
                      parseFloat(item.Product?.price?.replace("$", "") || 0) *
                      item.quantity
                    ).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="order-actions">
              <button className="btn-secondary">View Details</button>
              <button className="btn-secondary">Buy Again</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
