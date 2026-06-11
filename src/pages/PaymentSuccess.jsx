
import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useCartStore from '../store/cartStore';
import { Container, Typography, Button, Box, Paper } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Seo from '../components/Seo';

const PaymentSuccess = () => {
  const clearCart = useCartStore((state) => state.clearCart);
  const location = useLocation();

  useEffect(() => {
    // Clear the cart only when this component mounts
    // and a payment provider id is present, confirming a successful payment redirection.
    const queryParams = new URLSearchParams(location.search);
    if (queryParams.get('session_id') || queryParams.get('paypal_order_id') || queryParams.get('preference_id') || queryParams.get('collection_id')) {
      clearCart();
    }
  }, [clearCart, location.search]);

  return (
    <Container maxWidth="md" sx={{ mt: 15, textAlign: 'center' }}>
      <Seo title="Payment Successful" description="Your Ashes of the Souls order was received successfully." noindex />
      <Paper sx={{ p: 5, backgroundColor: '#1e1e1e', color: '#f5f5f5', borderRadius: 2 }}>
        <CheckCircleOutlineIcon sx={{ fontSize: 60, color: '#4CAF50' }} />
        <Typography variant="h3" gutterBottom sx={{ fontFamily: 'Cinzel, serif', mt: 2 }}>
          Payment Successful!
        </Typography>
        <Typography variant="h6" sx={{ color: '#ccc', mb: 4 }}>
          Thank you for your purchase. Your order is being processed.
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          You will receive a confirmation email shortly. If you have any questions, please contact our support team.
        </Typography>
        <Button 
          variant="contained" 
          component={Link} 
          to="/shop" 
          sx={{ 
            backgroundColor: '#B8860B', 
            color: '#121212',
            '&:hover': { backgroundColor: '#a0740a' },
            fontSize: '1.1rem',
            py: 1.5,
            px: 4
          }}
        >
          Continue Shopping
        </Button>
      </Paper>
    </Container>
  );
};

export default PaymentSuccess;
