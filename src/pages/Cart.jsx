import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useCartStore from '../store/cartStore';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Card, 
  CardMedia, 
  CardContent, 
  IconButton, 
  TextField, 
  Button, 
  Divider, 
  Paper 
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

// Styled component for a subtle animation on item removal
const CartItemCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== 'isRemoving',
})(({ theme, isRemoving }) => ({
  display: 'flex',
  marginBottom: theme.spacing(2),
  backgroundColor: '#2e2e2e',
  color: '#f5f5f5',
  transition: 'opacity 0.5s ease, transform 0.5s ease',
  opacity: isRemoving ? 0 : 1,
  transform: isRemoving ? 'translateX(-100%)' : 'none',
}));

const Cart = () => {
  const { t } = useTranslation();
  const {
    items,
    totalPrice,
    updateQuantity,
    removeFromCart,
  } = useCartStore();
  const navigate = useNavigate();
  const [removingItemId, setRemovingItemId] = useState(null);

  const taxRate = 0.08; // 8% tax rate
  const taxes = totalPrice * taxRate;
  const totalWithTaxes = totalPrice + taxes;

  // Handle item removal with a delay for the animation
  const handleRemoveItem = (itemId) => {
    setRemovingItemId(itemId);
    setTimeout(() => {
      removeFromCart(itemId);
      setRemovingItemId(null);
    }, 500); // Match timeout with CSS transition duration
  };

  // Navigate to checkout page
  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (items.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ mt: 12, textAlign: 'center', color: '#f5f5f5' }}>
        <Typography variant="h4" gutterBottom sx={{ fontFamily: 'Cinzel, serif' }}>
          {t('cart.empty.title')}
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          {t('cart.empty.message')}
        </Typography>
        <Button 
          variant="contained" 
          component={Link} 
          to="/shop" 
          sx={{ 
            backgroundColor: '#B8860B', 
            color: '#121212',
            '&:hover': { backgroundColor: '#a0740a'}
          }}
        >
          {t('cart.empty.continue_shopping')}
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 12 }}>
      <Typography variant="h3" gutterBottom sx={{ fontFamily: 'Cinzel, serif', color: '#f5f5f5', textAlign: 'center', mb: 4 }}>
        {t('cart.title')}
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={7}>
          {items.map(item => (
            <CartItemCard key={item.id} isRemoving={removingItemId === item.id}>
              <CardMedia
                component="img"
                sx={{ width: 120, height: 120, objectFit: 'cover' }}
                image={item.image}
                alt={item.name}
              />
              <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, p: 2 }}>
                <CardContent sx={{ flex: '1 0 auto', p: 0 }}>
                  <Typography component="div" variant="h6" sx={{ fontFamily: 'Cinzel, serif' }}>
                    {item.name}
                  </Typography>
                  <Typography variant="subtitle1" color="#B8860B" sx={{ my: 1 }}>
                    ${item.price.toFixed(2)}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <TextField
                      type="number"
                      size="small"
                      variant="outlined"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, parseInt(e.target.value, 10))}
                      inputProps={{ min: 1, style: { color: '#f5f5f5', width: '40px', textAlign: 'center' } }}
                      sx={{ 
                        mr: 2,
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': { borderColor: '#555' },
                          '&:hover fieldset': { borderColor: '#B8860B' },
                        }
                      }}
                    />
                    <IconButton aria-label="delete" onClick={() => handleRemoveItem(item.id)} sx={{ color: '#aaa' }}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </CardContent>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
                  <Typography variant="h6" sx={{ fontFamily: 'Montserrat, sans-serif' }}>
                      ${item.subtotal.toFixed(2)}
                  </Typography>
              </Box>
            </CartItemCard>
          ))}
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, backgroundColor: '#1e1e1e', color: '#f5f5f5' }}>
            <Typography variant="h5" gutterBottom sx={{ fontFamily: 'Cinzel, serif' }}>
              {t('cart.summary.title')}
            </Typography>
            <Divider sx={{ my: 2, borderColor: '#444' }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 1 }}>
              <Typography>{t('cart.summary.subtotal')}</Typography>
              <Typography>${totalPrice.toFixed(2)}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 1 }}>
              <Typography>{t('cart.summary.taxes', { rate: (taxRate * 100).toFixed(0) })}</Typography>
              <Typography>${taxes.toFixed(2)}</Typography>
            </Box>
            <Divider sx={{ my: 2, borderColor: '#444' }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.2rem' }}>
              <Typography variant="h6" sx={{ fontFamily: 'Cinzel, serif' }}>{t('cart.summary.total')}</Typography>
              <Typography variant="h6">${totalWithTaxes.toFixed(2)}</Typography>
            </Box>
            <Button
              fullWidth
              variant="contained"
              onClick={handleCheckout}
              sx={{ 
                mt: 3,
                py: 1.5,
                backgroundColor: '#B8860B',
                color: '#121212',
                fontSize: '1.1rem',
                '&:hover': { backgroundColor: '#a0740a' },
              }}
            >
              {t('cart.summary.checkout_button')}
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Cart;
