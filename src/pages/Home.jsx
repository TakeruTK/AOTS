
import React from 'react';
import { Container, Typography, Grid, Box } from '@mui/material';
import ProductCard from '../components/ProductCard';

const products = [
  {
    id: 1,
    name: 'Anillo de Cráneo de Plata',
    price: 150,
    image: 'https://images.unsplash.com/photo-1588892888288-3964467385a4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 2,
    name: 'Anillo de Cráneo de Bronce',
    price: 120,
    image: 'https://images.unsplash.com/photo-1611645462295-2152a5c88746?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 3,
    name: 'Anillo de Tentáculos',
    price: 180,
    image: 'https://images.unsplash.com/photo-1599330283569-03a89372147a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
   {
    id: 4,
    name: 'Anillo de Huesos Entrelazados',
    price: 200,
    image: 'https://images.unsplash.com/photo-1598104134114-493396a5f795?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 5,
    name: 'Anillo de Gárgola Gótica',
    price: 220,
    image: 'https://images.unsplash.com/photo-1599330283569-03a89372147a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 6,
    name: 'Anillo de Sello de Calavera',
    price: 190,
    image: 'https://images.unsplash.com/photo-1611645462295-2152a5c88746?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

function Home() {
  return (
    <Container sx={{ py: 4 }}>
      <Box 
        sx={{ 
          textAlign: 'center', 
          mb: 8, 
          py: 10,
          background: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://images.unsplash.com/photo-1506442693354-52a2f68b3f75?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D) no-repeat center center',
          backgroundSize: 'cover',
          color: 'white',
          borderRadius: 2,
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom>
          Ashes of the Souls
        </Typography>
        <Typography variant="h5">
          Forjando joyas desde las cenizas de almas olvidadas.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Home;
