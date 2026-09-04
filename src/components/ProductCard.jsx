import { useCart } from '../context/CartContext.jsx';

export default function ProductCard({ product }) {
  const { addItem, cartItems } = useCart();
  const inCart = cartItems.some((item) => item.id === product.id);

  return (
    <div className="product-card">
      <div className="product-card__image">
        <img src={product.image} alt={product.title} loading="lazy" />
      </div>
      <div className="product-card__category">{product.category}</div>
      <h3 className="product-card__title">{product.title}</h3>
      <div className="product-card__footer">
        <span className="product-card__price">${product.price.toFixed(2)}</span>
        <button className="add-btn" onClick={() => addItem(product)}>
          {inCart ? 'Add another' : 'Add to bag'}
        </button>
      </div>
    </div>
  );
}
