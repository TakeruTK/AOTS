
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { Grid, Typography, Button } from '@mui/material';

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
    <div style={{ padding: '2rem' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '400px',
          backgroundImage: 'url(https://source.unsplash.com/random/1600x900?gothic,dark)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          textAlign: 'center',
          marginBottom: '2rem',
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom style={{ fontFamily: 'serif' }}>
          Ashes of the Souls
        </Typography>
        <Typography variant="h5" component="p" style={{ fontFamily: 'serif' }}>
          Joyería Artesanal para Almas Oscuras
        </Typography>
      </div>

      <Typography variant="h4" component="h2" gutterBottom align="center" style={{ fontFamily: 'serif', marginBottom: '2rem' }}>
        Nuestros Diseños
      </Typography>

      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <ProductCard
              product={product}
              onViewDetails={() => handleProductClick(product.id)}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Home;
