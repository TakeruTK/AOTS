import React, { useState, useEffect } from 'react';
import useCartStore from '../store/cartStore';
import { Box, Typography, Container, Button, CircularProgress, Divider, Alert } from '@mui/material';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { loadStripe } from '@stripe/stripe-js';

// --- INICIALIZACIÓN DE SDKs con Claves Públicas ---

// 1. Mercado Pago: La clave pública se carga desde las variables de entorno de Vite.
const mercadopagoPublicKey = import.meta.env.VITE_MERCADOPAGO_PUBLIC_KEY;
if (mercadopagoPublicKey) {
  initMercadoPago(mercadopagoPublicKey);
} else {
  console.error("VITE_MERCADOPAGO_PUBLIC_KEY no está definida en .env");
}

// 2. Stripe: La clave pública se carga de forma asíncrona.
const stripePromise = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
  ? loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)
  : null;
if (!stripePromise) {
    console.error("VITE_STRIPE_PUBLISHABLE_KEY no está definida en .env. Stripe no funcionará");
}

// --- COMPONENTE DE CHECKOUT ---

const Checkout = () => {
  const { items } = useCartStore();
  const [preferenceId, setPreferenceId] = useState(null);
  const [isLoading, setIsLoading] = useState({ stripe: false, mercadopago: true });
  const [error, setError] = useState(null);

  // Efecto para crear la preferencia de Mercado Pago en cuanto el componente se monta
  useEffect(() => {
    if (items.length > 0 && mercadopagoPublicKey) {
      setIsLoading(prev => ({ ...prev, mercadopago: true }));
      fetch('http://localhost:4242/api/mercadopago/preference', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      })
      .then(res => res.json())
      .then(data => {
        if(data.preferenceId) {
          setPreferenceId(data.preferenceId);
        } else {
          throw new Error('No se recibió el preferenceId');
        }
      })
      .catch(err => {
        console.error("Error al crear preferencia de MP:", err);
        setError('No se pudo inicializar el pago con Mercado Pago.');
      })
      .finally(() => setIsLoading(prev => ({ ...prev, mercadopago: false })));
    } else {
        setIsLoading(prev => ({ ...prev, mercadopago: false }));
    }
  }, [items]);

  // Manejador para el checkout con Stripe
  const handleStripeCheckout = async () => {
    if (!stripePromise || items.length === 0) return;

    setIsLoading(prev => ({ ...prev, stripe: true }));
    setError(null);

    try {
        const response = await fetch('http://localhost:4242/api/stripe/checkout-session', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ items }),
        });

        const session = await response.json();
        if (!response.ok || !session.id) {
            throw new Error('No se pudo crear la sesión de Stripe.');
        }

        const stripe = await stripePromise;
        const { error } = await stripe.redirectToCheckout({ sessionId: session.id });

        if (error) {
            setError(error.message);
        }
    } catch (err) {
        console.error("Error en el proceso de Stripe:", err);
        setError('No se pudo redirigir a Stripe.');
    } finally {
        setIsLoading(prev => ({ ...prev, stripe: false }));
    }
  };

  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 10, color: '#f5f5f5' }}>
      <Typography variant="h4" sx={{ fontFamily: 'Cinzel, serif', mb: 4 }}>
        Elige tu método de pago
      </Typography>
      
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      
      {items.length === 0 ? (
        <Typography variant="h6">Tu carrito está vacío.</Typography>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          
          {/* Botón de Stripe */}
          {stripePromise && (
            <Button
              variant="contained"
              onClick={handleStripeCheckout}
              disabled={isLoading.stripe || isLoading.mercadopago}
              sx={{ 
                backgroundColor: '#6772e5', 
                '&:hover': { backgroundColor: '#5469d4' },
                width: '250px',
                height: '50px'
              }}
            >
              {isLoading.stripe ? <CircularProgress size={24} color="inherit" /> : 'Pagar con Tarjeta'}
            </Button>
          )}

          <Divider sx={{ width: '100%', my: 1, backgroundColor: '#555' }}>O</Divider>

          {/* Botón de Mercado Pago */}
          <Box sx={{ width: '250px', minHeight: '50px' }}>
            {isLoading.mercadopago ? (
                <CircularProgress sx={{ color: '#009ee3' }} />
            ) : preferenceId ? (
                <Wallet initialization={{ preferenceId }} />
            ) : (
                <Typography variant="body2" color="error">Error al cargar Mercado Pago.</Typography>
            )}
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default Checkout;