import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';

const SHIPPING = 6.5;
const TAX_RATE = 0.08;

export default function Checkout() {
  const { cartItems, subtotal, clearCart } = useCart();
  const [placed, setPlaced] = useState(false);
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    cardNumber: '',
    expiry: '',
  });

  const tax = subtotal * TAX_RATE;
  const total = subtotal + SHIPPING + tax;

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // No real payment processing — this is a portfolio checkout flow.
    setPlaced(true);
    clearCart();
  };

  if (cartItems.length === 0 && !placed) {
    return <Navigate to="/" replace />;
  }

  if (placed) {
    return (
      <div className="container">
        <div className="confirmation">
          <h1>Order placed.</h1>
          <p>
            Thanks, {form.fullName.split(' ')[0] || 'friend'} — a confirmation
            would normally land in {form.email || 'your inbox'} shortly.
          </p>
          <Link to="/" className="back-link">
            Continue shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="checkout-page">
        <div>
          <h1>Checkout</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="fullName">Full name</label>
              <input
                type="text"
                id="fullName"
                required
                value={form.fullName}
                onChange={handleChange('fullName')}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                required
                value={form.email}
                onChange={handleChange('email')}
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">Shipping address</label>
              <input
                type="text"
                id="address"
                required
                value={form.address}
                onChange={handleChange('address')}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  required
                  value={form.city}
                  onChange={handleChange('city')}
                />
              </div>
              <div className="form-group">
                <label htmlFor="zip">ZIP / Postal code</label>
                <input
                  type="text"
                  id="zip"
                  required
                  value={form.zip}
                  onChange={handleChange('zip')}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="cardNumber">Card number</label>
                <input
                  type="text"
                  id="cardNumber"
                  placeholder="4242 4242 4242 4242"
                  required
                  value={form.cardNumber}
                  onChange={handleChange('cardNumber')}
                />
              </div>
              <div className="form-group">
                <label htmlFor="expiry">Expiry</label>
                <input
                  type="text"
                  id="expiry"
                  placeholder="MM/YY"
                  required
                  value={form.expiry}
                  onChange={handleChange('expiry')}
                />
              </div>
            </div>

            <button type="submit" className="place-order-btn">
              Place order — ${total.toFixed(2)}
            </button>
          </form>
        </div>

        <div className="summary-box">
          <h2>Order summary</h2>
          {cartItems.map((item) => (
            <div className="summary-line" key={item.id}>
              <span>
                {item.title.slice(0, 28)}
                {item.title.length > 28 ? '…' : ''} × {item.quantity}
              </span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="summary-line">
            <span>Shipping</span>
            <span>${SHIPPING.toFixed(2)}</span>
          </div>
          <div className="summary-line">
            <span>Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="summary-line total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
