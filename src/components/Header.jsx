import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';

export default function Header({ onCartClick }) {
  const { itemCount } = useCart();

  return (
    <header className="site-header">
      <div className="site-header__bar">
        <Link to="/" className="wordmark">
          Attire<span>store</span>
        </Link>
        <nav className="site-header__actions">
          <Link to="/" className="cart-toggle">Home</Link>
          <Link to="/login" className="cart-toggle">Login</Link>
          <Link to="/signup" className="cart-toggle">Create account</Link>
          <button className="cart-toggle" onClick={onCartClick}>
            Bag {itemCount > 0 ? `(${itemCount})` : ''}
          </button>
        </nav>
      </div>
    </header>
  );
}
