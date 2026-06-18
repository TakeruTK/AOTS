import express from 'express';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import dotenv from 'dotenv';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path from 'path';
import process from 'node:process';
import { Buffer } from 'node:buffer';
import fs from 'node:fs';
import crypto from 'node:crypto';
import { products as seedProducts } from './src/data/products.js';
import { getProductPrice } from './src/utils/pricing.js';
import { MATERIAL_OPTIONS, getAvailableMaterials, isMaterialAllowed, normalizeMaterialValues } from './src/utils/productOptions.js';

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'dist')));

const FRONTEND_URL = process.env.VITE_FRONTEND_URL || 'http://localhost:5173';
const MERCADOPAGO_CLP_RATE = Number(process.env.MERCADOPAGO_CLP_RATE || 950);
const PAYPAL_API_BASE = process.env.PAYPAL_API_BASE || 'https://api-m.sandbox.paypal.com';
const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID || process.env.VITE_PAYPAL_CLIENT_ID;
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;
const PAYPAL_CURRENCY = process.env.PAYPAL_CURRENCY || process.env.VITE_PAYPAL_CURRENCY || 'USD';
const mercadoPagoAccessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
const PRODUCTS_DATA_DIR = path.join(__dirname, 'data');
const PRODUCTS_DATA_FILE = path.join(PRODUCTS_DATA_DIR, 'products.json');
const UPLOADS_ROOT = path.join(__dirname, 'public', 'imagenes', 'productos', 'admin');
const adminSessions = new Set();
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

const cloneProducts = (products) => JSON.parse(JSON.stringify(products));

const normalizeMedia = (media) => (
  Array.isArray(media)
    ? media
      .map((item) => ({
        type: item?.type === 'video' ? 'video' : 'image',
        src: String(item?.src || '').trim(),
      }))
      .filter((item) => item.src)
    : []
);

const normalizeProduct = (rawProduct, existingProducts = []) => {
  const id = Number.isInteger(Number(rawProduct?.id)) && Number(rawProduct.id) > 0
    ? Number(rawProduct.id)
    : Math.max(0, ...existingProducts.map((product) => Number(product.id) || 0)) + 1;
  const name = String(rawProduct?.name || '').trim();
  const description = String(rawProduct?.description || '').trim();
  const price = Number(rawProduct?.price);
  const salePrice = rawProduct?.salePrice === '' || rawProduct?.salePrice === null || rawProduct?.salePrice === undefined
    ? null
    : Number(rawProduct.salePrice);

  if (!name) {
    const error = new Error('El nombre del producto es obligatorio.');
    error.statusCode = 400;
    throw error;
  }

  if (!Number.isFinite(price) || price < 0) {
    const error = new Error('El precio del producto no es valido.');
    error.statusCode = 400;
    throw error;
  }

  if (salePrice !== null && (!Number.isFinite(salePrice) || salePrice < 0)) {
    const error = new Error('El precio de oferta no es valido.');
    error.statusCode = 400;
    throw error;
  }

  return {
    id,
    name,
    description,
    price,
    salePrice,
    materials: normalizeMaterialValues(rawProduct?.materials),
    media: normalizeMedia(rawProduct?.media),
  };
};

const readProducts = () => {
  try {
    if (fs.existsSync(PRODUCTS_DATA_FILE)) {
      const parsedProducts = JSON.parse(fs.readFileSync(PRODUCTS_DATA_FILE, 'utf8'));
      if (Array.isArray(parsedProducts)) {
        return parsedProducts.map((product) => normalizeProduct(product, parsedProducts));
      }
    }
  } catch (error) {
    console.error('Error al leer productos guardados:', error);
  }

  return cloneProducts(seedProducts).map((product) => normalizeProduct(product, seedProducts));
};

const writeProducts = (products) => {
  fs.mkdirSync(PRODUCTS_DATA_DIR, { recursive: true });
  const normalizedProducts = products.map((product) => normalizeProduct(product, products));
  const tempFile = `${PRODUCTS_DATA_FILE}.tmp`;
  fs.writeFileSync(tempFile, JSON.stringify(normalizedProducts, null, 2), 'utf8');
  fs.renameSync(tempFile, PRODUCTS_DATA_FILE);
  return normalizedProducts;
};

const requireAdmin = (req, res, next) => {
  const token = req.get('authorization')?.replace(/^Bearer\s+/i, '');

  if (!token || !adminSessions.has(token)) {
    return res.status(401).json({ error: 'Acceso no autorizado.' });
  }

  return next();
};

const sanitizeSegment = (value) => (
  String(value || 'producto')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase()
    .slice(0, 80) || 'producto'
);

const uploadImageFromDataUrl = ({ dataUrl, fileName, productName }) => {
  const match = String(dataUrl || '').match(/^data:(image\/(?:png|jpe?g|webp|gif));base64,([\s\S]+)$/i);

  if (!match) {
    const error = new Error('La imagen no tiene un formato valido.');
    error.statusCode = 400;
    throw error;
  }

  const mimeType = match[1].toLowerCase();
  const extension = mimeType.includes('png')
    ? 'png'
    : mimeType.includes('webp')
      ? 'webp'
      : mimeType.includes('gif')
        ? 'gif'
        : 'jpg';
  const imageBuffer = Buffer.from(match[2], 'base64');

  if (imageBuffer.length > 8 * 1024 * 1024) {
    const error = new Error('La imagen no puede superar 8 MB.');
    error.statusCode = 400;
    throw error;
  }

  const productFolder = sanitizeSegment(productName);
  const originalName = sanitizeSegment(path.parse(fileName || 'imagen').name);
  const storedName = `${Date.now()}-${crypto.randomUUID()}-${originalName}.${extension}`;
  const targetDir = path.join(UPLOADS_ROOT, productFolder);
  const targetFile = path.join(targetDir, storedName);

  fs.mkdirSync(targetDir, { recursive: true });
  fs.writeFileSync(targetFile, imageBuffer);

  return `/imagenes/productos/admin/${productFolder}/${storedName}`;
};

const getCatalogProduct = (id) => readProducts().find((product) => product.id === parseProductId(id));
const getCartItemMaterialKey = (item) => {
  const explicitMaterial = String(item?.materialKey || '').trim();

  if (explicitMaterial) {
    return explicitMaterial;
  }

  const itemId = String(item?.id || '');
  return MATERIAL_OPTIONS.find((option) => itemId.includes(option.value))?.value || null;
};

const getValidatedCartItems = (items) => {
  if (!Array.isArray(items) || items.length === 0) {
    const error = new Error('El carrito esta vacio.');
    error.statusCode = 400;
    throw error;
  }

  return items.map((item) => {
    const product = getCatalogProduct(item.id);
    const quantity = Number(item.quantity || 1);
    const requestedMaterial = getCartItemMaterialKey(item);
    const materialKey = requestedMaterial || getAvailableMaterials(product)[0]?.value;

    if (!product || !Number.isInteger(quantity) || quantity < 1 || quantity > 20) {
      const error = new Error('El carrito contiene productos invalidos.');
      error.statusCode = 400;
      throw error;
    }

    if (requestedMaterial && !isMaterialAllowed(product, requestedMaterial)) {
      const error = new Error('El carrito contiene un material no disponible para uno de los productos.');
      error.statusCode = 400;
      throw error;
    }

    return {
      id: product.id,
      name: product.name,
      price: getProductPrice(product),
      quantity,
      materialKey,
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

app.get('/api/products', (_req, res) => {
  res.json({ products: readProducts() });
});

app.post('/api/admin/login', (req, res) => {
  const username = String(req.body?.username || '');
  const password = String(req.body?.password || '');

  if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Usuario o contrasena incorrectos.' });
  }

  const token = crypto.randomBytes(32).toString('hex');
  adminSessions.add(token);
  return res.json({ token });
});

app.get('/api/admin/products', requireAdmin, (_req, res) => {
  res.json({ products: readProducts() });
});

app.post('/api/admin/products', requireAdmin, (req, res) => {
  try {
    const products = readProducts();
    const product = normalizeProduct(req.body, products);
    const savedProducts = writeProducts([...products, product]);
    return res.status(201).json({ product: savedProducts.find((item) => item.id === product.id) });
  } catch (error) {
    return res.status(error.statusCode || 500).json({ error: error.message || 'No se pudo crear el producto.' });
  }
});

app.put('/api/admin/products/:id', requireAdmin, (req, res) => {
  try {
    const productId = parseProductId(req.params.id);
    const products = readProducts();
    const productIndex = products.findIndex((product) => product.id === productId);

    if (productIndex === -1) {
      return res.status(404).json({ error: 'Producto no encontrado.' });
    }

    const updatedProduct = normalizeProduct({ ...req.body, id: productId }, products);
    const nextProducts = products.map((product, index) => (index === productIndex ? updatedProduct : product));
    const savedProducts = writeProducts(nextProducts);
    return res.json({ product: savedProducts.find((item) => item.id === productId) });
  } catch (error) {
    return res.status(error.statusCode || 500).json({ error: error.message || 'No se pudo actualizar el producto.' });
  }
});

app.delete('/api/admin/products/:id', requireAdmin, (req, res) => {
  const productId = parseProductId(req.params.id);
  const products = readProducts();
  const nextProducts = products.filter((product) => product.id !== productId);

  if (nextProducts.length === products.length) {
    return res.status(404).json({ error: 'Producto no encontrado.' });
  }

  writeProducts(nextProducts);
  return res.json({ ok: true });
});

app.post('/api/admin/uploads', requireAdmin, (req, res) => {
  try {
    const src = uploadImageFromDataUrl(req.body || {});
    return res.status(201).json({ src });
  } catch (error) {
    return res.status(error.statusCode || 500).json({ error: error.message || 'No se pudo subir la imagen.' });
  }
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
