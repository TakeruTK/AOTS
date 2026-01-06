import React, { useState, useEffect } from 'react';
import useCartStore from '../store/cartStore';
import { Box, Typography, Container, LinearProgress, Alert } from '@mui/material';
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
  const [isLoading, setIsLoading] = useState(true); // Start loading immediately
  const [error, setError] = useState(null);

  useEffect(() => {
    const createPreference = async () => {
      if (items.length === 0) {
        setIsLoading(false);
        return;
      }

      setError(null);
      
      try {
        const response = await fetch('http://localhost:4242/api/mercadopago/preference', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ items }),
        });

        const data = await response.json();

        if (!response.ok || !data.preferenceId) {
          throw new Error(t('checkout.mp_init_error', 'Error al iniciar el pago con MercadoPago.'));
        }
        
        setPreferenceId(data.preferenceId);

      } catch (err) {
        console.error("Error al crear la preferencia de MP:", err);
        setError(err.message || t('checkout.mp_init_error', 'Error al iniciar el pago con MercadoPago.'));
      } finally {
        setIsLoading(false);
      }
    };

    createPreference();
  }, [items, t]);

  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 10, color: '#f5f5f5' }}>
      <Typography variant="h4" sx={{ fontFamily: 'Cinzel, serif', mb: 4 }}>
        {t('checkout.title', 'Finalizar Compra')}
      </Typography>
      
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      
      {isLoading && <LinearProgress sx={{ width: '80%', margin: 'auto', mt: 4, backgroundColor: '#444', '& .MuiLinearProgress-bar': { backgroundColor: 'goldenrod' } }} />}

      {!isLoading && !error && preferenceId && (
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Wallet initialization={{ preferenceId }} />
        </Box>
      )}

      {!isLoading && !error && !preferenceId && items.length > 0 && (
         <Typography variant="body2" color="error">
            {t('checkout.mp_error', 'No se pudo generar el enlace de pago. Por favor, intente de nuevo.')}
         </Typography>
      )}

      {!isLoading && items.length === 0 && (
        <Typography variant="h6">{t('cart.empty.title', 'Tu carrito está vacío')}</Typography>
      )}
    </Container>
  );
};

export default Checkout;
