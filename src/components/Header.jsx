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
        <button className="cart-toggle" onClick={onCartClick}>
          Bag {itemCount > 0 ? `(${itemCount})` : ''}
        </button>
      </div>
    </header>
  );
}
