import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Box, Button, Container, Divider, Paper, Typography } from '@mui/material';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { useTranslation } from 'react-i18next';
import useCartStore from '../store/cartStore';
import Seo from '../components/Seo';

const mercadoPagoPublicKey = import.meta.env.VITE_MERCADOPAGO_PUBLIC_KEY;
const isMercadoPagoConfigured = mercadoPagoPublicKey && !mercadoPagoPublicKey.startsWith('YOUR_');
const isMercadoPagoTest = mercadoPagoPublicKey?.startsWith('TEST-');
const API_BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:4242' : '');

const Checkout = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { items, totalPrice } = useCartStore();
  const paypalClientId = import.meta.env.VITE_PAYPAL_CLIENT_ID || 'sb';
  const paypalCurrency = import.meta.env.VITE_PAYPAL_CURRENCY || 'USD';
  const mercadoPagoClpRate = Number(import.meta.env.VITE_MERCADOPAGO_CLP_RATE || 950);
  const [error, setError] = useState(null);
  const [mercadoPagoCheckoutUrl, setMercadoPagoCheckoutUrl] = useState(null);
  const [mercadoPagoLoading, setMercadoPagoLoading] = useState(false);
  const [mercadoPagoError, setMercadoPagoError] = useState(null);
  const [paypalConfig, setPaypalConfig] = useState({ configured: false, clientId: null, currency: paypalCurrency });
  const [paypalLoading, setPaypalLoading] = useState(true);
  const [paypalRenderKey, setPaypalRenderKey] = useState(0);

  const paypalOptions = useMemo(() => ({
    clientId: paypalClientId,
    currency: paypalCurrency,
    intent: 'capture',
  }), [paypalClientId, paypalCurrency]);

  const orderAmount = Math.max(Number(totalPrice || 0), 0).toFixed(2);
  const mercadoPagoAmount = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
  }).format(Math.max(Math.round(Number(totalPrice || 0) * mercadoPagoClpRate), 0));

  useEffect(() => {
    const loadPayPalConfig = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/paypal/config`);
        const config = await response.json();
        setPaypalConfig(config);
      } catch (err) {
        console.error('Error al cargar configuracion de PayPal:', err);
        setPaypalConfig({ configured: false, clientId: null, currency: paypalCurrency });
      } finally {
        setPaypalLoading(false);
      }
    };

    loadPayPalConfig();
  }, [paypalCurrency]);

  useEffect(() => {
    const remountPaypalButtons = () => {
      setPaypalRenderKey((key) => key + 1);
    };

    window.addEventListener('pageshow', remountPaypalButtons);
    window.addEventListener('focus', remountPaypalButtons);

    return () => {
      window.removeEventListener('pageshow', remountPaypalButtons);
      window.removeEventListener('focus', remountPaypalButtons);
    };
  }, []);

  useEffect(() => {
    const createMercadoPagoPreference = async () => {
      if (!items.length || !isMercadoPagoConfigured) {
        return;
      }

      setMercadoPagoLoading(true);
      setMercadoPagoError(null);
      setMercadoPagoCheckoutUrl(null);

      try {
        const response = await fetch(`${API_BASE_URL}/api/mercadopago/preference`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ items }),
        });
        const data = await response.json();

        const checkoutUrl = isMercadoPagoTest
          ? data.sandboxInitPoint || data.initPoint
          : data.initPoint || data.sandboxInitPoint;

        if (!response.ok || !checkoutUrl) {
          throw new Error(data.error || t('checkout.mercadopago_init_error', 'No se pudo iniciar Mercado Pago.'));
        }

        setMercadoPagoCheckoutUrl(checkoutUrl);
      } catch (err) {
        console.error('Error al crear preferencia de Mercado Pago:', err);
        setMercadoPagoError(err.message || t('checkout.mercadopago_init_error', 'No se pudo iniciar Mercado Pago.'));
      } finally {
        setMercadoPagoLoading(false);
      }
    };

    createMercadoPagoPreference();
  }, [items, t]);

  const createOrder = () => {
    setError(null);

    return fetch(`${API_BASE_URL}/api/paypal/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items }),
    })
      .then((response) => response.json().then((data) => {
        if (!response.ok || !data.id) {
          throw new Error(data.error || t('checkout.paypal_init_error', 'Error al iniciar el pago con PayPal.'));
        }

        return data.id;
      }))
      .catch((err) => {
        console.error('Error al crear orden de PayPal:', err);
        setError(err.message || t('checkout.paypal_init_error', 'Error al iniciar el pago con PayPal.'));
        return Promise.reject(err);
      });
  };

  const handleApprove = async (data) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/paypal/orders/${data.orderID}/capture`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const details = await response.json();

      if (!response.ok || details.status !== 'COMPLETED') {
        throw new Error(details.error || t('checkout.paypal_capture_error', 'No se pudo confirmar el pago con PayPal.'));
      }

      navigate(`/payment-success?paypal_order_id=${details.id}`);
    } catch (err) {
      console.error('Error al capturar el pago de PayPal:', err);
      setError(t('checkout.paypal_capture_error', 'No se pudo confirmar el pago con PayPal.'));
    }
  };

  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', mt: { xs: 8, md: 10 }, color: '#f5f5f5', px: { xs: 2, sm: 3 } }}>
      <Seo title={t('seo.checkout.title')} description={t('seo.checkout.description')} noindex />
      <Typography
        variant="h4"
        sx={{
          fontFamily: 'Cinzel, serif',
          mb: { xs: 3, md: 4 },
          fontSize: { xs: '1.55rem', sm: '2.125rem' },
          letterSpacing: { xs: '0.08em', sm: '0.12em' },
        }}
      >
        {t('checkout.title', 'Finalizar Compra')}
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {items.length > 0 && (
        <Box sx={{ width: '100%', mt: 4 }}>
          <Typography variant="h6" sx={{ mb: 3 }}>
            {paypalCurrency} {orderAmount}
          </Typography>
          <Paper sx={{ p: { xs: 2, sm: 3 }, mb: 3, backgroundColor: '#111', border: '1px solid #2c2c2c' }}>
            <Typography variant="h6" sx={{ mb: 1, color: '#fff', fontFamily: 'Cinzel, serif' }}>
              PayPal
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, color: '#bbb' }}>
              {t('checkout.paypal_description', 'Recommended for international payments.')}
            </Typography>
            {paypalLoading && (
              <Typography sx={{ color: '#bbb' }}>{t('checkout.loading_payment', 'Cargando pago...')}</Typography>
            )}
            {!paypalLoading && !paypalConfig.configured && (
              <Alert severity="warning">
                {t('checkout.paypal_missing_key', 'PayPal necesita PAYPAL_CLIENT_ID y PAYPAL_CLIENT_SECRET en .env.')}
              </Alert>
            )}
            {!paypalLoading && paypalConfig.configured && (
            <PayPalScriptProvider
              key={`paypal-provider-${paypalRenderKey}`}
              options={{
                ...paypalOptions,
                clientId: paypalConfig.clientId,
                currency: paypalConfig.currency,
              }}
            >
              <PayPalButtons
                key={`paypal-buttons-${paypalRenderKey}`}
                style={{ layout: 'vertical', color: 'gold', shape: 'rect', label: 'paypal' }}
                forceReRender={[orderAmount, paypalConfig.currency, paypalRenderKey]}
                createOrder={createOrder}
                onApprove={handleApprove}
                onCancel={() => navigate('/payment-failed')}
                onError={(err) => {
                  console.error('Error en PayPal:', err);
                  setError(t('checkout.paypal_init_error', 'Error al iniciar el pago con PayPal.'));
                }}
              />
            </PayPalScriptProvider>
            )}
          </Paper>

          <Divider sx={{ my: 3, borderColor: '#333' }}>
            <Typography variant="body2" sx={{ color: '#999', px: 1 }}>
              {t('checkout.or_pay_with', 'or pay with')}
            </Typography>
          </Divider>

          <Paper sx={{ p: { xs: 2, sm: 3 }, backgroundColor: '#111', border: '1px solid #2c2c2c' }}>
            <Typography variant="h6" sx={{ mb: 1, color: '#fff', fontFamily: 'Cinzel, serif' }}>
              Mercado Pago Chile
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, color: '#bbb' }}>
              {t('checkout.mercadopago_description', 'For customers paying from Chile. Approximate total: {{amount}}.', { amount: mercadoPagoAmount })}
            </Typography>

            {!isMercadoPagoConfigured && (
              <Alert severity="warning">
                {t('checkout.mercadopago_missing_key', 'Mercado Pago needs VITE_MERCADOPAGO_PUBLIC_KEY and MERCADOPAGO_ACCESS_TOKEN in .env.')}
              </Alert>
            )}

            {mercadoPagoError && <Alert severity="error">{mercadoPagoError}</Alert>}
            {mercadoPagoLoading && <Typography sx={{ color: '#bbb' }}>{t('checkout.loading_payment', 'Loading payment...')}</Typography>}

            {!mercadoPagoLoading && mercadoPagoCheckoutUrl && (
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                  component="a"
                  href={mercadoPagoCheckoutUrl}
                  variant="contained"
                  sx={{
                    width: { xs: '100%', sm: 280 },
                    py: 1.4,
                    backgroundColor: '#ffe600',
                    color: '#063a80',
                    fontWeight: 800,
                    fontSize: '1rem',
                    textTransform: 'none',
                    '&:hover': {
                      backgroundColor: '#fff159',
                    },
                  }}
                >
                  {t('checkout.pay_with_mercadopago', 'Pagar con Mercado Pago')}
                </Button>
              </Box>
            )}
          </Paper>
        </Box>
      )}

      {items.length === 0 && (
        <Typography variant="h6">{t('cart.empty.title', 'Tu carrito esta vacio')}</Typography>
      )}
    </Container>
  );
};

export default Checkout;
