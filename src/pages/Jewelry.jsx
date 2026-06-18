
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Grid } from '@mui/material';
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
    <Container sx={{ pt: { xs: 10, md: 15 }, pb: 4, textAlign: 'center', overflow: 'hidden' }}>
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
          fontSize: { xs: '1.7rem', sm: '2rem' },
          marginBottom: { xs: '2rem', md: '3rem' },
          color: '#FFFFFF'
        }}
      >
        Joyería
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {jewelryProducts.map(product => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <ProductCard 
              product={product} 
              onViewDetails={() => handleProductClick(product.id)}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Jewelry;
