
import React, { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import useCartStore from '../store/cartStore';
import { Box, Typography, CircularProgress, Container } from '@mui/material';

// Load Stripe with your publishable key
const stripePromise = loadStripe('pk_test_51Pbm5sRpHc4qMwxC3AFY4B8A5w2k3c3X4g5E6F7g8H9i8J7k6L5a4b3c2d1e0f0g1h2i3j4k5l'); // Replace with your actual publishable key

const Checkout = () => {
  const { items } = useCartStore();
  const taxRate = 0.08; // 8% tax rate, should match the backend

  useEffect(() => {
    const createCheckoutSession = async () => {
      if (items.length === 0) {
        // Don't proceed if cart is empty
        return;
      }

      try {
        const stripe = await stripePromise;

        const response = await fetch('http://localhost:4242/create-checkout-session', { // Make sure the port matches your server
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ items, taxRate }), // Send items and tax rate to the server
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const session = await response.json();

        const result = await stripe.redirectToCheckout({
          sessionId: session.id,
        });

        if (result.error) {
          console.error(result.error.message);
          // Optionally, redirect to a payment failed page
        }
      } catch (error) {
        console.error("Error creating checkout session:", error);
        // Handle error, e.g., show a notification to the user
      }
    };

    createCheckoutSession();

  }, [items, taxRate]);

  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 20, color: '#f5f5f5' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <CircularProgress sx={{ color: '#B8860B' }} />
            <Typography variant="h6" sx={{ mt: 2, fontFamily: 'Cinzel, serif' }}>
                Redirecting to secure payment...
            </Typography>
            <Typography variant="body2" sx={{ mt: 1, color: '#aaa' }}>
                Please wait while we prepare your transaction.
            </Typography>
        </Box>
    </Container>
  );
};

export default Checkout;
