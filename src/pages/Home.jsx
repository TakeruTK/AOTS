
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { Grid, Typography, Box } from '@mui/material';

const products = [
  {
    id: 1,
    name: 'Anillo de Cuervo',
    price: 120,
    image: 'https://source.unsplash.com/random/800x600?gothic,jewelry,crow',
    description: 'Anillo de plata esterlina con un diseño de cuervo detallado, perfecto para un look oscuro y elegante.',
  },
  {
    id: 2,
    name: 'Collar de Luna Negra',
    price: 250,
    image: 'https://source.unsplash.com/random/800x600?gothic,jewelry,moon',
    description: 'Collar de obsidiana con un colgante de luna creciente, ideal para canalizar tu energía nocturna.',
  },
  {
    id: 3,
    name: 'Brazalete de Espinas',
    price: 180,
    image: 'https://source.unsplash.com/random/800x600?gothic,jewelry,thorns',
    description: 'Brazalete de plata con un diseño de espinas entrelazadas, una pieza audaz y llamativa.',
  },
];

const Home = () => {
  const navigate = useNavigate();

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <Box sx={{ padding: { xs: '1rem', md: '2rem' }, width: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '50vh',
          backgroundImage: 'url(https://source.unsplash.com/random/1600x900?gothic,dark,castle)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          textAlign: 'center',
          marginBottom: '4rem',
          padding: '2rem'
        }}
      >
        <Typography 
          variant="h1" 
          component="h1" 
          gutterBottom
          sx={{
            fontFamily: "'Cinzel Light', 'Cormorant SC', serif",
            textTransform: 'uppercase',
            letterSpacing: '0.35em',
            fontSize: { xs: '2rem', md: '3rem' },
            color: '#FFFFFF'
          }}
        >
          Ashes of the Souls
        </Typography>
        <Typography 
          className="subtitle"
          sx={{
            fontFamily: "'Playfair Display', 'Cormorant Italic', serif",
            fontStyle: 'italic',
            color: '#E0E0E0',
            fontSize: { xs: '1.2rem', md: '1.5rem' }
          }}
        >
          Joyería Artesanal para Almas Oscuras
        </Typography>
      </Box>

      <Typography 
        variant="h2" 
        component="h2" 
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
        Nuestros Diseños
      </Typography>

      <Grid container spacing={5}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <ProductCard
              product={product}
              onViewDetails={() => handleProductClick(product.id)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;
