import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Typography } from '@mui/material';
import ProductCard from '../components/ProductCard';
import '../App.css';
import Seo from '../components/Seo';
import useProducts from '../hooks/useProducts';

const Jewelry = () => {
  const navigate = useNavigate();
  const { products } = useProducts();

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const jewelryProducts = products;

  return (
    <Container
      maxWidth={false}
      sx={{
        pt: { xs: 9, md: 12 },
        pb: { xs: 5, md: 8 },
        px: { xs: 2, sm: 3, md: 5 },
        textAlign: 'center',
        overflow: 'hidden',
      }}
    >
      <Seo
        title="Gothic Rings and Handmade Jewelry"
        description="Shop handmade gothic rings, skull rings, silver jewelry, bronze pieces, and dark artisan accessories by Ashes of the Souls."
        keywords={[
          'gothic rings',
          'skull rings',
          'handmade silver rings',
          'bronze rings',
          'occult accessories',
          'dark artisan jewelry',
          'anillos góticos',
          'anillos de plata',
          'joyería de calaveras',
        ]}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Gothic Rings and Handmade Jewelry',
          description: 'Handmade gothic rings, skull rings, silver jewelry, bronze pieces, and dark artisan accessories.',
          mainEntity: {
            '@type': 'ItemList',
            itemListElement: jewelryProducts.map((product, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              url: `${import.meta.env.VITE_SITE_URL || window.location.origin}/product/${product.id}`,
              name: product.name,
            })),
          },
        }}
      />
      <Typography
        variant="h2"
        component="h1"
        gutterBottom
        align="center"
        sx={{
          fontFamily: "'Cinzel Light', 'Cormorant SC', serif",
          textTransform: 'uppercase',
          letterSpacing: { xs: '0.1em', sm: '0.16em', md: '0.2em' },
          fontSize: { xs: '1.55rem', sm: '1.9rem', md: '2.15rem' },
          marginBottom: { xs: '1.75rem', md: '2.5rem' },
          color: '#FFFFFF',
        }}
      >
        Joyería
      </Typography>
      <Box className="product-grid shop-product-grid">
        {jewelryProducts.map((product) => (
          <Box className="product-grid-item" key={product.id}>
            <ProductCard
              product={product}
              onViewDetails={() => handleProductClick(product.id)}
            />
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default Jewelry;
