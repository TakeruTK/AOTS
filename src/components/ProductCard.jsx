
import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, CardActions } from '@mui/material';
import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  return (
    <Card sx={{ maxWidth: 345, backgroundColor: '#1e1e1e', border: '1px solid #333' }}>
      <CardMedia
        component="img"
        height="240"
        image={product.image}
        alt={product.name}
        sx={{ filter: 'grayscale(80%) brightness(0.8)' }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Desde ${product.price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" component={Link} to={`/product/${product.id}`}>
          Ver Detalles
        </Button>
      </CardActions>
    </Card>
  );
}

export default ProductCard;
