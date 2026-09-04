import { useEffect, useMemo, useState } from 'react';
import { fetchProducts, fetchCategories } from '../api/products.js';
import Filters from '../components/Filters.jsx';
import ProductGrid from '../components/ProductGrid.jsx';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [status, setStatus] = useState('loading'); // loading | ready | error

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [productData, categoryData] = await Promise.all([
          fetchProducts(),
          fetchCategories(),
        ]);
        if (!cancelled) {
          setProducts(productData);
          setCategories(categoryData);
          setStatus('ready');
        }
      } catch (err) {
        if (!cancelled) setStatus('error');
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        activeCategory === 'all' || product.category === activeCategory;
      const matchesSearch = product.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, activeCategory, searchTerm]);

  return (
    <>
      <section className="hero">
        <div className="container">
          <h1>Clothes that earn their place in your closet.</h1>
          <p>
            Made for the days you actually remember.
          </p>
        </div>
      </section>

      <div className="container">
        {status === 'ready' && (
          <>
            <Filters
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />
            <p className="results-count">
              {filteredProducts.length} item
              {filteredProducts.length !== 1 ? 's' : ''}
            </p>
            <ProductGrid products={filteredProducts} />
          </>
        )}

        {status === 'loading' && (
          <div className="loading">Loading the catalog...</div>
        )}

        {status === 'error' && (
          <div className="error-msg">
            Couldn't load products right now. Refresh to try again.
          </div>
        )}
      </div>
    </>
  );
}
