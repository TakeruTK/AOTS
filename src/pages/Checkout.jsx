import React, { useState } from 'react';
import useCartStore from '../store/cartStore';
import { Box, Typography, Container, Button, LinearProgress, Alert } from '@mui/material';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { useTranslation } from 'react-i18next';

const mercadopagoPublicKey = import.meta.env.VITE_MERCADOPAGO_PUBLIC_KEY;
if (mercadopagoPublicKey) {
  initMercadoPago(mercadopagoPublicKey);
} else {
  console.error("VITE_MERCADOPAGO_PUBLIC_KEY no está definida en .env");
}

const Checkout = () => {
  const { t } = useTranslation();
  const { items } = useCartStore();
  
  const [preferenceId, setPreferenceId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    if (items.length === 0) return;

    setIsLoading(true);
    setIsProcessing(true);
    setError(null);
    
    try {
      const response = await fetch('http://localhost:4242/api/mercadopago/preference', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      });

      const data = await response.json();

      if (!response.ok || !data.preferenceId) {
        throw new Error(t('checkout.mp_init_error'));
      }
      
      setPreferenceId(data.preferenceId);

    } catch (err) {
      console.error("Error al crear la preferencia de MP:", err);
      setError(err.message || t('checkout.mp_init_error'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 10, color: '#f5f5f5' }}>
      <Typography variant="h4" sx={{ fontFamily: 'Cinzel, serif', mb: 4 }}>
        {t('checkout.title')}
      </Typography>
      
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      
      {items.length === 0 ? (
        <Typography variant="h6">{t('cart.empty.title')}</Typography>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, width: '100%' }}>

          {!isProcessing && (
            <Button
              variant="contained"
              onClick={handlePayment}
              sx={{ 
                backgroundColor: 'goldenrod',
                color: 'black',
                width: '280px',
                height: '50px',
                fontSize: '1.1rem',
                '&:hover': { backgroundColor: '#c9b037' },
              }}
            >
              {t('cart.summary.checkout_button')}
            </Button>
          )}

          {isLoading && <LinearProgress sx={{ width: '80%', mt: 1, backgroundColor: '#444', '& .MuiLinearProgress-bar': { backgroundColor: 'goldenrod' } }} />}

          {preferenceId && !isLoading && (
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              <Wallet initialization={{ preferenceId }} />
            </Box>
          )}

          {!preferenceId && !isLoading && isProcessing && !error && (
            <Typography variant="body2" color="error">
              {t('checkout.mp_error')}
            </Typography>
          )}
        </Box>
      )}
    </Container>
  );
};

export default Checkout;
