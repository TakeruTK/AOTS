
import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from '@mui/material';
import useCartStore from '../store/cartStore';

const ProductCard = ({ product, onViewDetails }) => {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <Card 
      sx={{
        backgroundColor: 'transparent',
        boxShadow: 'none',
        border: 'none',
        color: '#CCCCCC',
        textAlign: 'center',
        transition: 'transform 0.3s ease',
        '&:hover': {
          transform: 'translateY(-5px)',
        },
      }}
    >
      <CardMedia
        component="img"
        sx={{
          height: 350,
          objectFit: 'cover',
          filter: 'grayscale(80%) brightness(0.8)', // Dark and artistic
          transition: 'filter 0.3s ease',
          '&:hover': {
            filter: 'grayscale(40%) brightness(1)'
          }
        }}
        image={product.image}
        alt={product.name}
      />
      <CardContent sx={{ padding: '1.5rem 0.5rem' }}>
        <Typography 
          gutterBottom 
          variant="h3" 
          component="div"
          sx={{
            fontFamily: "'Cinzel Light', 'Cormorant SC', serif",
            color: '#FFFFFF',
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            fontSize: '1.3rem'
          }}
        >
          {product.name}
        </Typography>
        <Typography 
          variant="h6"
          sx={{
            fontFamily: "'Montserrat Light', 'Lato Light', sans-serif",
            color: '#B8860B', // Burnt gold accent
            fontSize: '1.2rem',
            marginBottom: '1rem',
          }}
        >
          ${product.price}
        </Typography>
        <Button 
          onClick={onViewDetails} 
          sx={{
            color: '#CCCCCC',
            borderColor: '#B8860B',
            border: '1px solid',
            borderRadius: 0, // Sharp edges
            padding: '8px 20px',
            fontFamily: "'Montserrat Light', 'Lato Light', sans-serif",
            fontSize: '0.9rem',
            transition: 'background-color 0.3s, color 0.3s',
            '&:hover': {
              backgroundColor: '#B8860B',
              color: '#000000',
              borderColor: '#B8860B'
            }
          }}
        >
          Ver Detalles
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
