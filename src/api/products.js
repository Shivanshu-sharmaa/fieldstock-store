const BASE_URL = 'https://fakestoreapi.com';

export async function fetchProducts() {
  const res = await fetch(`${BASE_URL}/products`);
  if (!res.ok) throw new Error('Failed to load products');
  return res.json();
}

export async function fetchCategories() {
  const res = await fetch(`${BASE_URL}/products/categories`);
  if (!res.ok) throw new Error('Failed to load categories');
  return res.json();
}
