import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./header.css";

export default function Header({ cart }) {
  const { user, logout } = useAuth();
  
  const totalQuantity = cart.reduce(
    (total, cartItem) => total + cartItem.quantity,
    0
  );

  return (
    <header className="site-header">
      <div className="header-inner container">
        <Link to="/" className="brand-link" aria-label="Home">
          AJ
        </Link>
        <nav className="main-nav" aria-label="Main navigation">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/orders" className="nav-link">
            Orders
          </Link>
          
          {user ? (
            <div className="auth-nav">
              <span className="user-greeting">Hi, {user.name}</span>
              <button onClick={logout} className="nav-link btn-logout">
                Logout
              </button>
            </div>
          ) : (
            <div className="auth-nav">
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/signup" className="nav-link">
                Sign Up
              </Link>
            </div>
          )}
        </nav>
        <div className="header-cart">
          <Link to="/checkout" className="cart-link">
            <img
              className="cart-image"
              src="https://img.icons8.com/?size=30&id=59997&format=png"
              alt="Cart"
            />
            <div className="cart-quantity">{totalQuantity}</div>
            <div className="cart-text">Cart</div>
          </Link>
        </div>
      </div>
    </header>
  );
}
