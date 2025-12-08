
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Grid } from '@mui/material';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products'; // Import the centralized product data
import '../App.css';

const Jewelry = () => {
  const navigate = useNavigate();

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const jewelryProducts = products;

  return (
    <Container sx={{ pt: { xs: 12, md: 15 }, pb: 4, textAlign: 'center' }}>
      <Typography
        variant="h2"
        component="h1"
        gutterBottom
        align="center"
        sx={{
          fontFamily: "'Cinzel Light', 'Cormorant SC', serif",
          textTransform: 'uppercase',
          letterSpacing: '0.2em',
          marginBottom: '3rem',
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
