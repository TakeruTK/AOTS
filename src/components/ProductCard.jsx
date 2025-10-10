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
    <Card sx={{ backgroundColor: '#1e1e1e', color: 'white', height: '100%' }}>
      <CardActionArea onClick={onViewDetails} sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <CardMedia
          component="img"
          image={product.image}
          alt={product.name}
          sx={{
            width: '100%',
            aspectRatio: '1 / 1',
            objectFit: 'cover',
            filter: 'grayscale(80%) brightness(0.8)',
          }}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="div">
            {product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ color: '#c0c0c0' }}>
            ${product.price}
          </Typography>
        </CardContent>
        <Box sx={{ p: 2, pt: 0, alignSelf: 'center' }}>
          <Button size="small" color="primary" variant="contained" onClick={onViewDetails}>
            Ver Detalles
          </Button>
        </Box>
      </CardActionArea>
    </Card>
  );
};

export default ProductCard;
