import ProductCard from './ProductCard.jsx';

export default function ProductGrid({ products }) {
  if (products.length === 0) {
    return (
      <div className="product-grid">
        <div className="empty-state">
          No gear matches that search. Try a different term or category.
        </div>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
