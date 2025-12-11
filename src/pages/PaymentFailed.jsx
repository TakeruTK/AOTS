
import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button, Box, Paper } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const PaymentFailed = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 15, textAlign: 'center' }}>
      <Paper sx={{ p: 5, backgroundColor: '#1e1e1e', color: '#f5f5f5', borderRadius: 2 }}>
        <ErrorOutlineIcon sx={{ fontSize: 60, color: '#f44336' }} />
        <Typography variant="h3" gutterBottom sx={{ fontFamily: 'Cinzel, serif', mt: 2 }}>
          Payment Failed
        </Typography>
        <Typography variant="h6" sx={{ color: '#ccc', mb: 4 }}>
          Unfortunately, we were unable to process your payment.
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          This could be due to a variety of reasons. Please check your payment details and try again. If the problem persists, please contact your bank or our support team.
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Button 
            variant="contained" 
            component={Link} 
            to="/cart" 
            sx={{ 
              backgroundColor: '#B8860B', 
              color: '#121212',
              '&:hover': { backgroundColor: '#a0740a' },
              fontSize: '1rem',
              py: 1.5,
              px: 4
            }}
          >
            Return to Cart
          </Button>
          <Button 
            variant="outlined" 
            component={Link} 
            to="/shop" 
            sx={{ 
              borderColor: '#B8860B', 
              color: '#B8860B',
              '&:hover': { borderColor: '#a0740a', color: '#a0740a' },
              fontSize: '1rem',
              py: 1.5,
              px: 4
            }}
          >
            Continue Shopping
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default PaymentFailed;
