
import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
} from '@mui/material';
import { Link } from 'react-router-dom';
import useCartStore from '../store/cartStore';

const cardStyle = {
  backgroundColor: '#2a2a2a',
  color: '#f5f5f5',
  border: '1px solid #444',
  borderRadius: '10px',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: '0 10px 20px rgba(229, 57, 53, 0.5)',
  },
};

const mediaStyle = {
  height: 280,
  filter: 'grayscale(50%) brightness(0.9) contrast(1.1)',
};

const contentStyle = {
  textAlign: 'center',
  padding: '1.5rem',
};

const nameStyle = {
  fontFamily: "'Creepster', cursive",
  color: '#e53935',
  fontSize: '1.8rem',
  textShadow: '1px 1px 2px #000',
  marginBottom: '0.5rem',
};

const descriptionStyle = {
    color: '#ccc',
    marginBottom: '1rem',
    minHeight: '60px'
};

const priceStyle = {
  fontFamily: "'Nosifer', cursive",
  color: '#fdd835',
  fontSize: '1.5rem',
  marginBottom: '1rem',
  textShadow: '1px 1px 2px #000',
};

const buttonStyle = {
  backgroundColor: '#e53935',
  color: '#fff',
  fontFamily: "'Creepster', cursive",
  fontSize: '1.2rem',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
  '&:hover': {
    backgroundColor: '#c62828',
  },
};


const ProductCard = ({ product }) => {
    const addToCart = useCartStore((state) => state.addToCart)
  return (
    <Card sx={cardStyle}>
        <CardMedia
          component="img"
          sx={mediaStyle}
          image={product.image}
          alt={product.name}
        />
        <CardContent sx={contentStyle}>
          <Typography sx={nameStyle} gutterBottom variant="h5" component="div">
            {product.name}
          </Typography>
          <Typography sx={descriptionStyle} variant="body2">
            {product.description}
          </Typography>
           <Typography sx={priceStyle} variant="h6">
            ${product.price}
          </Typography>
           <Button sx={buttonStyle} onClick={() => addToCart(product)}>
            Añadir al Carrito
          </Button>
        </CardContent>
    </Card>
  );
};

export default ProductCard;
