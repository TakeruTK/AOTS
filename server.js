
import express from 'express';
import Stripe from 'stripe';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import dotenv from 'dotenv';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path from 'path';

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

// Serve static files from the React app build directory
app.use(express.static(path.join(__dirname, 'dist')));


const mercadoPagoAccessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;
if (!mercadoPagoAccessToken) {
  console.error("ERROR: MERCADOPAGO_ACCESS_TOKEN no encontrado en .env");
}

const client = new MercadoPagoConfig({
  accessToken: mercadoPagoAccessToken,
});

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
let stripe;
if (!stripeSecretKey) {
  console.warn("ADVERTENCIA: STRIPE_SECRET_KEY no encontrado en .env. La funcionalidad de Stripe estará deshabilitada.");
} else {
  stripe = new Stripe(stripeSecretKey);
}

const FRONTEND_URL = process.env.VITE_FRONTEND_URL || 'http://localhost:5173';

app.post('/api/mercadopago/preference', async (req, res) => {
  const { items } = req.body;

  if (!mercadoPagoAccessToken) {
    return res.status(500).json({ error: 'El servidor no está configurado para Mercado Pago.' });
  }

  const line_items = items.map(item => ({
    title: item.name,
    unit_price: Number(item.price),
    quantity: Number(item.quantity),
    currency_id: "ARS",
  }));

  const preference = {
    items: line_items,
    back_urls: {
      success: `${FRONTEND_URL}/payment-success`,
      failure: `${FRONTEND_URL}/payment-failed`,
      pending: `${FRONTEND_URL}/payment-pending`
    },
  };

  if (!/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?/.test(FRONTEND_URL)) {
    preference.auto_return = 'approved';
  }
  
  try {
    console.log('DEBUG: Mercado Pago preference body ->', JSON.stringify(preference));
    const response = await new Preference(client).create({ body: preference });
    res.json({ preferenceId: response.id });
  } catch (error) {
    console.error('Error al crear la preferencia de Mercado Pago:', error?.cause ?? error);
    res.status(500).json({ error: 'No se pudo crear la preferencia de pago.' });
  }
});

app.post('/api/stripe/checkout-session', async (req, res) => {
  const { items } = req.body;
  
  if (!stripe) {
    return res.status(500).json({ error: 'El servidor no está configurado para Stripe.' });
  }

  const line_items = items.map(item => ({
    price_data: {
      currency: 'usd',
      product_data: {
        name: item.name,
        images: [item.image],
      },
      unit_amount: Math.round(item.price * 100),
    },
    quantity: item.quantity,
  }));

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `${FRONTEND_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${FRONTEND_URL}/payment-failed`,
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("Error al crear la sesión de Stripe:", error);
    res.status(500).json({ error: 'No se pudo crear la sesión de pago.' });
  }
});

// The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
// Catch-all handler: send React's index.html for any unmatched route
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});


const PORT = process.env.PORT || 4242;
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
