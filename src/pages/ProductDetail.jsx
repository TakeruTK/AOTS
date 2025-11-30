
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Select, 
  MenuItem, 
  Button, 
  FormControl, 
  InputLabel,
  CircularProgress 
} from '@mui/material';
import { products } from '../data/products'; // Import the centralized product data
import useCartStore from '../store/cartStore';

function ProductDetail() {
  const { id } = useParams();
  const { addItem } = useCartStore();
  const product = products.find(p => p.id === parseInt(id));

  // State hooks
  const [mainImage, setMainImage] = useState('');
  const [material, setMaterial] = useState('Plata 925');
  const [size, setSize] = useState('18mm');
  const [finish, setFinish] = useState('Pulido');
  const [isAdding, setIsAdding] = useState(false);

  // Effect to safely set the initial image when the product is found
  useEffect(() => {
    if (product && product.media && product.media.length > 0) {
      const firstImage = product.media.find(m => m.type === 'image');
      if (firstImage) {
        setMainImage(firstImage.src);
      }
    }
  }, [product]);

  const handleAddToCart = () => {
    setIsAdding(true);
    const cartItem = { 
      id: `${product.id}-${material}-${size}-${finish}`,
      name: product.name,
      price: product.price,
      image: mainImage,
      material, 
      size, 
      finish, 
    };
    setTimeout(() => {
      addItem(cartItem);
      setIsAdding(false);
    }, 1000);
  };

  // Early return if product is not found
  if (!product) {
    return (
      <Container sx={{ py: 5, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" sx={{ color: '#FFFFFF' }}>
          Producto no encontrado
        </Typography>
        <Typography sx={{ color: '#CCCCCC', mt: 2 }}>
          El producto que buscas no existe o ha sido movido.
        </Typography>
      </Container>
    );
  }

  // Render the component if the product exists
  return (
    <Container sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {/* Image Gallery */}
        <Grid item xs={12} md={6}>
          <Box sx={{ mb: 2, textAlign: 'center' }}>
            {mainImage ? (
              <img src={mainImage} alt={product.name} style={{ width: '100%', maxWidth: '500px', border: '1px solid #333' }} />
            ) : (
              <Box sx={{ width: '100%', height: '500px', backgroundColor: '#222', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography sx={{ color: '#555' }}>Sin imagen</Typography>
              </Box>
            )}
          </Box>
          <Grid container spacing={1} justifyContent="center">
            {product.media.filter(m => m.type === 'image').map((image, index) => (
              <Grid item key={index} xs={3} sm={2}>
                <img 
                  src={image.src} 
                  alt={`${product.name} thumbnail ${index + 1}`} 
                  style={{ width: '100%', cursor: 'pointer', border: mainImage === image.src ? '2px solid #B8860B' : '1px solid #333' }}
                  onClick={() => setMainImage(image.src)}
                />
              </Grid>
            ))}\
          </Grid>
        </Grid>

        {/* Product Details */}
        <Grid item xs={12} md={6}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ fontFamily: "'Cinzel Light', serif", color: '#FFFFFF' }}>
            {product.name}
          </Typography>
          <Typography variant="h5" sx={{ color: '#B8860B', mb: 2 }}>
            ${product.price.toFixed(2)} USD
          </Typography>
          <Typography variant="body1" paragraph sx={{ color: '#CCCCCC', lineHeight: 1.7, fontFamily: "'Montserrat Light', sans-serif"}}>
            {product.description}
          </Typography>

          {/* Options */}
          <FormControl fullWidth sx={{ my: 1.5 }}>
            <InputLabel id="material-label" sx={{color: '#CCCCCC'}}>Material</InputLabel>
            <Select
              labelId="material-label"
              value={material}
              label="Material"
              onChange={(e) => setMaterial(e.target.value)}
              sx={{color: 'white', '.MuiOutlinedInput-notchedOutline': {borderColor: '#444'}, '&.Mui-focused .MuiOutlinedInput-notchedOutline': {borderColor: '#B8860B'}, '.MuiSvgIcon-root': {color: '#CCCCCC'}}}
            >
              <MenuItem value="Plata 925">Plata 925</MenuItem>
              <MenuItem value="Bronce">Bronce</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ my: 1.5 }}>
            <InputLabel id="size-label" sx={{color: '#CCCCCC'}}>Talla (Diámetro Interno)</InputLabel>
            <Select
              labelId="size-label"
              value={size}
              label="Talla (Diámetro Interno)"
              onChange={(e) => setSize(e.target.value)}
              sx={{color: 'white', '.MuiOutlinedInput-notchedOutline': {borderColor: '#444'}, '&.Mui-focused .MuiOutlinedInput-notchedOutline': {borderColor: '#B8860B'}, '.MuiSvgIcon-root': {color: '#CCCCCC'}}}
            >
              {[...Array(15)].map((_, i) => (
                  <MenuItem key={i} value={`${15 + i * 0.5}mm`}>{`${15 + i * 0.5}mm`}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ my: 1.5 }}>
            <InputLabel id="finish-label" sx={{color: '#CCCCCC'}}>Acabado</InputLabel>
            <Select
              labelId="finish-label"
              value={finish}
              label="Acabado"
              onChange={(e) => setFinish(e.target.value)}
              sx={{color: 'white', '.MuiOutlinedInput-notchedOutline': {borderColor: '#444'}, '&.Mui-focused .MuiOutlinedInput-notchedOutline': {borderColor: '#B8860B'}, '.MuiSvgIcon-root': {color: '#CCCCCC'}}}
            >
              <MenuItem value="Pulido">Pulido (Brillante)</MenuItem>
              <MenuItem value="Mate">Mate (Sin Brillo)</MenuItem>
              <MenuItem value="Envejecido">Envejecido (Oscurecido)</MenuItem>
            </Select>
          </FormControl>

          {/* Add to Cart Button */}
          <Button 
            variant="contained" 
            size="large" 
            onClick={handleAddToCart}
            disabled={isAdding}
            sx={{
              mt: 3,
              backgroundColor: '#B8860B',
              color: '#000',
              fontWeight: 'bold',
              letterSpacing: '1px',
              transition: 'background-color 0.3s ease, transform 0.2s ease',
              '&:hover': {
                backgroundColor: '#d4a017',
                transform: 'scale(1.02)'
              }
            }}
          >
            {isAdding ? <CircularProgress size={24} sx={{ color: '#000' }} /> : 'Añadir al Carrito'}
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ProductDetail;
