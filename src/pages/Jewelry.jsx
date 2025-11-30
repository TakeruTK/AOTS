
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

  // Filter for products that should be displayed on the jewelry page
  // For now, we assume all products in the file are jewelry.
  const jewelryProducts = products;

  return (
    <Container sx={{ py: 4, textAlign: 'center' }}>
      <Typography
        variant="h1"
        component="h1"
        className="sinister-title"
        gutterBottom
      >
        Joyería Siniestra
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
