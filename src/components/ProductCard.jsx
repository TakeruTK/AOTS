import React from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
} from '@mui/material';

const ProductCard = ({ product, onViewDetails }) => {
  return (
    <Card sx={{ backgroundColor: '#1e1e1e', color: 'white' }}>
      <CardActionArea onClick={onViewDetails}>
        <CardMedia
          component="img"
          height="200"
          image={product.image}
          alt={product.name}
          sx={{ filter: 'grayscale(80%) brightness(0.8)' }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ color: '#c0c0c0' }}>
            ${product.price}
          </Typography>
        </CardContent>
      </CardActionArea>
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
        <Button size="small" color="primary" variant="contained" onClick={onViewDetails}>
          Ver Detalles
        </Button>
      </Box>
    </Card>
  );
};

export default ProductCard;
