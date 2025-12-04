
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
  CircularProgress,
  IconButton,
  Dialog,
  DialogContent,
  DialogActions
} from '@mui/material';
import { ArrowBackIos, ArrowForwardIos, Close } from '@mui/icons-material';
import { products } from '../data/products';
import useCartStore from '../store/cartStore';

function ProductDetail() {
  const { id } = useParams();
  const { addItem } = useCartStore();
  const product = products.find(p => p.id === parseInt(id));

  // State hooks
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [material, setMaterial] = useState('Plata 925');
  const [size, setSize] = useState('18mm');
  const [finish, setFinish] = useState('Pulido');
  const [isAdding, setIsAdding] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const productImages = product?.media?.filter(m => m.type === 'image') || [];

  useEffect(() => {
    window.scrollTo(0, 0);
    setCurrentImageIndex(0);
  }, [id]);

  const handleNextImage = (e) => {
    e.stopPropagation(); // Prevent modal from opening
    setCurrentImageIndex(prevIndex => (prevIndex + 1) % productImages.length);
  };

  const handlePrevImage = (e) => {
    e.stopPropagation(); // Prevent modal from opening
    setCurrentImageIndex(prevIndex => (prevIndex - 1 + productImages.length) % productImages.length);
  };

  const handleOpenModal = () => {
    if (productImages.length > 0) {
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  
  const handleAddToCart = () => {
    setIsAdding(true);
    const cartItem = { 
      id: `${product.id}-${material}-${size}-${finish}`,
      name: product.name,
      price: product.price,
      image: productImages.length > 0 ? productImages[currentImageIndex].src : '',
      material, 
      size, 
      finish, 
    };
    setTimeout(() => {
      addItem(cartItem);
      setIsAdding(false);
    }, 1000);
  };

  if (!product) {
    return (
      <Container sx={{ py: 5, textAlign: 'center', pt: { xs: 10, md: 12 } }}>
        <Typography variant="h4" component="h1" sx={{ color: '#FFFFFF' }}>
          Producto no encontrado
        </Typography>
        <Typography sx={{ color: '#CCCCCC', mt: 2 }}>
          El producto que buscas no existe o ha sido movido.
        </Typography>
      </Container>
    );
  }

  const mainImageSrc = productImages.length > 0 ? productImages[currentImageIndex].src : '';

  return (
    <Container sx={{ pt: { xs: 12, md: 15 }, pb: 4 }}>
      <Grid container spacing={4} justifyContent="center" alignItems="center">
        <Grid item xs={12} md={6}>
          <Box 
            onClick={handleOpenModal}
            sx={{
              position: 'relative',
              mb: 2,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: { xs: '400px', md: '500px' },
              backgroundColor: '#222',
              border: '1px solid #333',
              cursor: productImages.length > 0 ? 'pointer' : 'default',
            }}
          >
            {productImages.length > 0 ? (
              <>
                <img 
                  src={mainImageSrc} 
                  alt={product.name} 
                  style={{ 
                    maxWidth: '100%', 
                    maxHeight: '100%', 
                    objectFit: 'contain', 
                  }}
                />
                <IconButton
                  onClick={handlePrevImage}
                  sx={{ 
                    position: 'absolute', 
                    left: 10, 
                    top: '50%', 
                    transform: 'translateY(-50%)', 
                    color: 'white', 
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.7)'}
                  }}
                >
                  <ArrowBackIos />
                </IconButton>
                <IconButton
                  onClick={handleNextImage}
                  sx={{ 
                    position: 'absolute', 
                    right: 10, 
                    top: '50%', 
                    transform: 'translateY(-50%)', 
                    color: 'white', 
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.7)'}
                  }}
                >
                  <ArrowForwardIos />
                </IconButton>
              </>
            ) : (
                <Typography sx={{ color: '#555' }}>Sin imagen</Typography>
            )}
          </Box>
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
      <Dialog
        open={isModalOpen}
        onClose={handleCloseModal}
        maxWidth="lg"
        PaperProps={{
          style: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            boxShadow: 'none',
            position: 'relative',
          },
        }}
      >
        <DialogContent sx={{ position: 'relative', p: 0, overflow: 'hidden' }}>
            <img src={mainImageSrc} alt={product.name} style={{ width: '100%', maxHeight: '90vh', objectFit: 'contain' }} />
            <IconButton
              onClick={handlePrevImage}
              sx={{ 
                position: 'absolute', 
                left: 10, 
                top: '50%', 
                transform: 'translateY(-50%)', 
                color: 'white', 
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.7)'}
              }}
            >
              <ArrowBackIos />
            </IconButton>
            <IconButton
              onClick={handleNextImage}
              sx={{ 
                position: 'absolute', 
                right: 10, 
                top: '50%', 
                transform: 'translateY(-50%)', 
                color: 'white', 
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.7)'}
              }}
            >
              <ArrowForwardIos />
            </IconButton>
        </DialogContent>
        <DialogActions sx={{position: 'absolute', top: 0, right: 0}}>
            <IconButton onClick={handleCloseModal} sx={{ color: 'white' }}>
                <Close />
            </IconButton>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default ProductDetail;
