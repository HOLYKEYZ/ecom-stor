import "./footer.css";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-minimal">
        <div>
          <Link to="/" className="footer-logo">AJ Store</Link>
          <p className="footer-desc">Premium goods for the modern professional. Curated quality for your workspace and life.</p>
        </div>
        
        <div className="footer-right">
             <div className="social-links">
                <a href="#" aria-label="Twitter">𝕏</a>
                <a href="#" aria-label="Instagram">📸</a>
                <a href="#" aria-label="Github">🐙</a>
             </div>
             <small>© {new Date().getFullYear()} AJ Store. All rights reserved.</small>
        </div>
      </div>
    </footer>
  );
}
