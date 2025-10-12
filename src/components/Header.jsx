import "./header.css";

export default function Header({ cart }) {
  const totalQuantity = cart.reduce(
    (total, cartItem) => total + cartItem.quantity,
    0
  );

  return (
    <header className="site-header">
      <div className="header-inner container">
        <a href="#/" className="brand-link" aria-label="Home">
          AJ
        </a>
        <nav className="main-nav" aria-label="Main navigation">
          <a href="#/" className="nav-link">
            Home
          </a>
          <a href="#/orders" className="nav-link">
            Orders
          </a>
          <a href="#/checkout" className="nav-link">
            Checkout
          </a>
        </nav>
        <div className="header-cart">
          <a href="#/checkout" className="cart-link">
            <img
              className="cart-icon"
              src="https://img.icons8.com/?size=30&id=59997&format=png"
              alt="Cart"
            />
            <div className="cart-quantity">{totalQuantity}</div>
            <div className="cart-text">Cart</div>
          </a>
        </div>
      </div>
    </header>
  );
}
