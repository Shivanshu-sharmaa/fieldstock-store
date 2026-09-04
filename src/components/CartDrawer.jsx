import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';

export default function CartDrawer({ onClose }) {
  const { cartItems, updateQuantity, removeItem, subtotal } = useCart();
  const navigate = useNavigate();

  const goToCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  return (
    <>
      <div className="cart-overlay" onClick={onClose} />
      <div className="cart-drawer" role="dialog" aria-label="Shopping bag">
        <div className="cart-drawer__header">
          <h2>Your bag</h2>
          <button className="close-btn" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        <div className="cart-items">
          {cartItems.length === 0 ? (
            <div className="empty-cart">Your bag is empty.</div>
          ) : (
            cartItems.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.image} alt={item.title} />
                <div className="cart-item__info">
                  <p className="cart-item__title">{item.title}</p>
                  <div className="qty-row">
                    <button
                      className="qty-btn"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="qty-btn"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                    <button
                      className="remove-link"
                      onClick={() => removeItem(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-drawer__footer">
            <div className="cart-total-row">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <button className="checkout-btn" onClick={goToCheckout}>
              Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}
