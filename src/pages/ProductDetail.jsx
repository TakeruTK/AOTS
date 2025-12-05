
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
import { useTranslation } from 'react-i18next';
import { products } from '../data/products';
import useCartStore from '../store/cartStore';

function ProductDetail() {
  const { id } = useParams();
  const { t } = useTranslation();
  const { addItem } = useCartStore();
  const product = products.find(p => p.id === parseInt(id));

  // State hooks
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [material, setMaterial] = useState('product.materials.silver_925');
  const [size, setSize] = useState('18mm');
  const [finish, setFinish] = useState('product.finishes.polished');
  const [isAdding, setIsAdding] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const productImages = product?.media?.filter(m => m.type === 'image') || [];

  useEffect(() => {
    window.scrollTo(0, 0);
    setCurrentImageIndex(0);
  }, [id]);

  const handleNextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex(prevIndex => (prevIndex + 1) % productImages.length);
  };

  const handlePrevImage = (e) => {
    e.stopPropagation();
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
          {t('productDetail.notFound.title')}
        </Typography>
        <Typography sx={{ color: '#CCCCCC', mt: 2 }}>
          {t('productDetail.notFound.message')}
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
                <Typography sx={{ color: '#555' }}>{t('productDetail.noImage')}</Typography>
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
            {t(product.description)}
          </Typography>

          {/* Options */}
          <FormControl fullWidth sx={{ my: 1.5 }}>
            <InputLabel id="material-label" sx={{color: '#CCCCCC'}}>{t('productDetail.materialLabel')}</InputLabel>
            <Select
              labelId="material-label"
              value={material}
              label={t('productDetail.materialLabel')}
              onChange={(e) => setMaterial(e.target.value)}
              sx={{color: 'white', '.MuiOutlinedInput-notchedOutline': {borderColor: '#444'}, '&.Mui-focused .MuiOutlinedInput-notchedOutline': {borderColor: '#B8860B'}, '.MuiSvgIcon-root': {color: '#CCCCCC'}}}
            >
              <MenuItem value="product.materials.silver_925">{t('product.materials.silver_925')}</MenuItem>
              <MenuItem value="product.materials.bronze">{t('product.materials.bronze')}</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ my: 1.5 }}>
            <InputLabel id="size-label" sx={{color: '#CCCCCC'}}>{t('productDetail.sizeLabel')}</InputLabel>
            <Select
              labelId="size-label"
              value={size}
              label={t('productDetail.sizeLabel')}
              onChange={(e) => setSize(e.target.value)}
              sx={{color: 'white', '.MuiOutlinedInput-notchedOutline': {borderColor: '#444'}, '&.Mui-focused .MuiOutlinedInput-notchedOutline': {borderColor: '#B8860B'}, '.MuiSvgIcon-root': {color: '#CCCCCC'}}}
            >
              {[...Array(15)].map((_, i) => (
                  <MenuItem key={i} value={`${15 + i * 0.5}mm`}>{`${15 + i * 0.5}mm`}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ my: 1.5 }}>
            <InputLabel id="finish-label" sx={{color: '#CCCCCC'}}>{t('productDetail.finishLabel')}</InputLabel>
            <Select
              labelId="finish-label"
              value={finish}
              label={t('productDetail.finishLabel')}
              onChange={(e) => setFinish(e.target.value)}
              sx={{color: 'white', '.MuiOutlinedInput-notchedOutline': {borderColor: '#444'}, '&.Mui-focused .MuiOutlinedInput-notchedOutline': {borderColor: '#B8860B'}, '.MuiSvgIcon-root': {color: '#CCCCCC'}}}
            >
              <MenuItem value="product.finishes.polished">{t('product.finishes.polished')}</MenuItem>
              <MenuItem value="product.finishes.matte">{t('product.finishes.matte')}</MenuItem>
              <MenuItem value="product.finishes.aged">{t('product.finishes.aged')}</MenuItem>
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
            {isAdding ? <CircularProgress size={24} sx={{ color: '#000' }} /> : t('product.addToCart')}
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
