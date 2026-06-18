import { products as fallbackProducts } from '../data/products';

export const API_BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:4242' : '');

export const getFallbackProducts = () => fallbackProducts.map((product) => ({
  ...product,
  salePrice: product.salePrice ?? null,
  media: Array.isArray(product.media) ? product.media : [],
}));

export const fetchCatalogProducts = async ({ signal } = {}) => {
  const response = await fetch(`${API_BASE_URL}/api/products`, { signal });

  if (!response.ok) {
    throw new Error('No se pudo cargar el catalogo.');
  }

  const data = await response.json();
  return Array.isArray(data.products) ? data.products : [];
};
