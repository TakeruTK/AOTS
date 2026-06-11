import express from 'express';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import dotenv from 'dotenv';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path from 'path';
import process from 'node:process';

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));

const FRONTEND_URL = process.env.VITE_FRONTEND_URL || 'http://localhost:5173';
const MERCADOPAGO_CLP_RATE = Number(process.env.MERCADOPAGO_CLP_RATE || 950);
const mercadoPagoAccessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;
const isMercadoPagoConfigured = mercadoPagoAccessToken && !mercadoPagoAccessToken.startsWith('YOUR_');
const mercadoPagoClient = isMercadoPagoConfigured
  ? new MercadoPagoConfig({ accessToken: mercadoPagoAccessToken })
  : null;

const toClp = (amount) => Math.max(Math.round(Number(amount || 0) * MERCADOPAGO_CLP_RATE), 1);

app.post('/api/mercadopago/preference', async (req, res) => {
  const { items } = req.body;

  if (!mercadoPagoClient) {
    return res.status(500).json({ error: 'Mercado Pago no esta configurado en el servidor.' });
  }

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'El carrito esta vacio.' });
  }

  const preference = {
    items: items.map((item) => ({
      title: item.name,
      quantity: Number(item.quantity || 1),
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

  try {
    const response = await new Preference(mercadoPagoClient).create({ body: preference });
    res.json({
      preferenceId: response.id,
      initPoint: response.init_point,
      sandboxInitPoint: response.sandbox_init_point,
    });
  } catch (error) {
    console.error('Error al crear preferencia de Mercado Pago:', error?.cause ?? error);
    res.status(500).json({ error: 'No se pudo crear el pago con Mercado Pago.' });
  }
});

app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 4242;
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
