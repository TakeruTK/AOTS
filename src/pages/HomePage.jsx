import React from 'react';
import { Grid, Typography, Container, Box } from '@mui/material';
import ProductCard from '../components/ProductCard';
import { useNavigate } from 'react-router-dom';

const products = [
  {
    id: 1,
    name: 'Anillo de Ónix',
    price: 120.0,
    description: 'Anillo de plata de ley con una piedra de ónix negra. Perfecto para un look gótico y elegante. Fabricado con materiales de alta calidad, este anillo está diseñado para durar. La piedra de ónix pulida añade un toque de misterio y sofisticación.',
    image: '/images/products/onyx-ring.jpg',
  },
  {
    id: 2,
    name: 'Anillo de Calavera',
    price: 95.0,
    description: 'Anillo de acero inoxidable con un detallado diseño de calavera. Un accesorio audaz y llamativo para cualquier entusiasta del estilo gótico. El intrincado diseño de la calavera muestra una artesanía excepcional, lo que lo convierte en una pieza destacada.',
    image: '/images/products/skull-ring.jpg',
  },
  {
    id: 3,
    name: 'Anillo de Cuervo',
    price: 110.0,
    description: 'Anillo de plata con un diseño de cuervo grabado. Simboliza el misterio y la inteligencia. Este anillo único presenta un diseño de cuervo bellamente detallado, que simboliza la sabiduría y la magia. Es un complemento perfecto para tu colección de joyas góticas.',
    image: '/images/products/raven-ring.jpg',
  },
  {
    id: 4,
    name: 'Anillo de Murciélago',
    price: 85.0,
    description: 'Anillo de aleación de zinc con un diseño de murciélago. Ideal para un look nocturno y misterioso. Abraza la noche con este anillo de murciélago de diseño intrincado. Su construcción ligera pero duradera garantiza un uso cómodo, mientras que el diseño detallado del murciélago añade un toque de oscuridad.',
    image: '/images/products/bat-ring.jpg',
  },
  {
    id: 5,
    name: 'Anillo de Serpiente',
    price: 130.0,
    description: 'Anillo de plata de ley con una serpiente enroscada. Representa la transformación y el poder. Este cautivador anillo de serpiente está fabricado en plata de ley de alta calidad y presenta un diseño de serpiente enroscada que simboliza el renacimiento y la energía primigenia. Es una poderosa pieza de declaración.',
    image: '/images/products/snake-ring.jpg',
  },
  {
    id: 6,
    name: 'Anillo de Cruz Gótica',
    price: 100.0,
    description: 'Anillo de acero inoxidable con una cruz gótica ornamentada. Una pieza clásica para cualquier colección de joyas góticas. Este anillo presenta una cruz gótica bellamente detallada, que combina la fe con una estética oscura. Es un accesorio atemporal que complementa cualquier atuendo.',
    image: '/images/products/gothic-cross-ring.jpg',
  },
];

const HomePage = () => {
  const navigate = useNavigate();

  const handleViewDetails = (product) => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  return (
    <Box sx={{ backgroundColor: '#121212', color: 'white', minHeight: '100vh', py: 5 }}>
      <Container>
        <Typography variant="h2" component="h1" gutterBottom align="center" sx={{ fontFamily: 'Cinzel, serif', fontWeight: 700 }}>
          Attack on Titan Store
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom align="center" sx={{ fontFamily: 'Cinzel, serif', mb: 5 }}>
          Una colección curada de tesoros oscuros y misteriosos
        </Typography>
        <Grid container spacing={4}>
          {products.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <ProductCard product={product} onViewDetails={() => handleViewDetails(product)} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default HomePage;
