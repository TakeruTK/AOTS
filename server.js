import express from 'express';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import dotenv from 'dotenv';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path from 'path';
import process from 'node:process';
import { Buffer } from 'node:buffer';
import { products } from './src/data/products.js';

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));

const FRONTEND_URL = process.env.VITE_FRONTEND_URL || 'http://localhost:5173';
const MERCADOPAGO_CLP_RATE = Number(process.env.MERCADOPAGO_CLP_RATE || 950);
const PAYPAL_API_BASE = process.env.PAYPAL_API_BASE || 'https://api-m.sandbox.paypal.com';
const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID || process.env.VITE_PAYPAL_CLIENT_ID;
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;
const PAYPAL_CURRENCY = process.env.PAYPAL_CURRENCY || process.env.VITE_PAYPAL_CURRENCY || 'USD';
const mercadoPagoAccessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;
const isMercadoPagoConfigured = mercadoPagoAccessToken && !mercadoPagoAccessToken.startsWith('YOUR_');
const mercadoPagoClient = isMercadoPagoConfigured
  ? new MercadoPagoConfig({ accessToken: mercadoPagoAccessToken })
  : null;
const isPayPalConfigured = Boolean(
  PAYPAL_CLIENT_ID
  && PAYPAL_CLIENT_SECRET
  && !PAYPAL_CLIENT_ID.startsWith('YOUR_')
  && !PAYPAL_CLIENT_SECRET.startsWith('YOUR_')
  && PAYPAL_CLIENT_ID !== 'sb',
);

const toClp = (amount) => Math.max(Math.round(Number(amount || 0) * MERCADOPAGO_CLP_RATE), 1);
const parseProductId = (id) => Number(String(id).split('-')[0]);
const getCatalogProduct = (id) => products.find((product) => product.id === parseProductId(id));
const getValidatedCartItems = (items) => {
  if (!Array.isArray(items) || items.length === 0) {
    const error = new Error('El carrito esta vacio.');
    error.statusCode = 400;
    throw error;
  }

  return items.map((item) => {
    const product = getCatalogProduct(item.id);
    const quantity = Number(item.quantity || 1);

    if (!product || !Number.isInteger(quantity) || quantity < 1 || quantity > 20) {
      const error = new Error('El carrito contiene productos invalidos.');
      error.statusCode = 400;
      throw error;
    }

    return {
      id: product.id,
      name: product.name,
      price: Number(product.price),
      quantity,
    };
  });
};
const getUsdTotal = (items) => items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

const getPayPalAccessToken = async () => {
  const credentials = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString('base64');
  const response = await fetch(`${PAYPAL_API_BASE}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error_description || 'No se pudo autenticar con PayPal.');
  }

  return data.access_token;
};

app.get('/api/paypal/config', (_req, res) => {
  res.json({
    configured: isPayPalConfigured,
    clientId: isPayPalConfigured ? PAYPAL_CLIENT_ID : null,
    currency: PAYPAL_CURRENCY,
  });
});

app.post('/api/paypal/orders', async (req, res) => {
  if (!isPayPalConfigured) {
    return res.status(500).json({ error: 'PayPal no esta configurado en el servidor.' });
  }

  try {
    const cartItems = getValidatedCartItems(req.body.items);
    const accessToken = await getPayPalAccessToken();
    const response = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [
          {
            description: 'Ashes of the Souls order',
            amount: {
              currency_code: PAYPAL_CURRENCY,
              value: getUsdTotal(cartItems),
              breakdown: {
                item_total: {
                  currency_code: PAYPAL_CURRENCY,
                  value: getUsdTotal(cartItems),
                },
              },
            },
            items: cartItems.map((item) => ({
              name: item.name,
              quantity: String(item.quantity),
              unit_amount: {
                currency_code: PAYPAL_CURRENCY,
                value: item.price.toFixed(2),
              },
            })),
          },
        ],
      }),
    });
    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data.message || 'No se pudo crear la orden de PayPal.' });
    }

    res.json({ id: data.id });
  } catch (error) {
    console.error('Error al crear orden de PayPal:', error);
    res.status(error.statusCode || 500).json({ error: error.message || 'No se pudo crear la orden de PayPal.' });
  }
});

app.post('/api/paypal/orders/:orderId/capture', async (req, res) => {
  if (!isPayPalConfigured) {
    return res.status(500).json({ error: 'PayPal no esta configurado en el servidor.' });
  }

  try {
    const accessToken = await getPayPalAccessToken();
    const response = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders/${encodeURIComponent(req.params.orderId)}/capture`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data.message || 'No se pudo capturar la orden de PayPal.' });
    }

    res.json({
      id: data.id,
      status: data.status,
    });
  } catch (error) {
    console.error('Error al capturar orden de PayPal:', error);
    res.status(500).json({ error: error.message || 'No se pudo capturar la orden de PayPal.' });
  }
});

app.post('/api/mercadopago/preference', async (req, res) => {
  const { items } = req.body;

  if (!mercadoPagoClient) {
    return res.status(500).json({ error: 'Mercado Pago no esta configurado en el servidor.' });
  }

  try {
    const cartItems = getValidatedCartItems(items);
    const preference = {
      items: cartItems.map((item) => ({
        id: String(item.id),
        title: item.name,
        quantity: item.quantity,
        unit_price: toClp(item.price),
        currency_id: 'CLP',
      })),
      back_urls: {
        success: `${FRONTEND_URL}/payment-success`,
        failure: `${FRONTEND_URL}/payment-failed`,
        pending: `${FRONTEND_URL}/payment-failed`,
      },
      statement_descriptor: 'ASHES SOULS',
    };

    if (!/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?/.test(FRONTEND_URL)) {
      preference.auto_return = 'approved';
    }

    const response = await new Preference(mercadoPagoClient).create({ body: preference });
    res.json({
      preferenceId: response.id,
      initPoint: response.init_point,
      sandboxInitPoint: response.sandbox_init_point,
      totalClp: cartItems.reduce((total, item) => total + toClp(item.price) * item.quantity, 0),
    });
  } catch (error) {
    console.error('Error al crear preferencia de Mercado Pago:', error?.cause ?? error);
    res.status(error.statusCode || 500).json({ error: error.message || 'No se pudo crear el pago con Mercado Pago.' });
  }
});

app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 4242;
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
