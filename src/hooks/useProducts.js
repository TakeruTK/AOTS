import { useEffect, useState } from 'react';
import { fetchCatalogProducts, getFallbackProducts } from '../services/catalog';

const fallbackProducts = getFallbackProducts();

const useProducts = () => {
  const [products, setProducts] = useState(fallbackProducts);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    fetchCatalogProducts({ signal: controller.signal })
      .then((catalogProducts) => {
        setProducts(catalogProducts);
        setError(null);
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setError(err);
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      });

    return () => controller.abort();
  }, []);

  return { products, isLoading, error };
};

export default useProducts;
