import fs from 'node:fs';
import path from 'node:path';

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:4243';
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
const TEST_PREFIX = 'AOTS Admin CRUD Test';
const WORKSPACE_ROOT = process.cwd();
const DATA_FILE = path.join(WORKSPACE_ROOT, 'data', 'products.json');
const ADMIN_UPLOAD_ROOT = path.join(WORKSPACE_ROOT, 'public', 'imagenes', 'productos', 'admin');
const SAMPLE_IMAGE = '/imagenes/productos/Decay-Skull-A.O.T.S/IMG_20230912_150851_012.jpg';
const SAMPLE_IMAGE_ALT = '/imagenes/productos/Forgotten-skull-A.O.T.S/IMG_20240312_152338_617.jpg';
const ONE_PIXEL_PNG = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/p9sAAAAASUVORK5CYII=';

const backup = {
  existed: fs.existsSync(DATA_FILE),
  content: fs.existsSync(DATA_FILE) ? fs.readFileSync(DATA_FILE, 'utf8') : null,
};
const createdIds = new Set();
const uploadedFiles = new Set();
let adminToken = null;

const results = [];

const assert = (condition, message) => {
  if (!condition) {
    throw new Error(message);
  }
};

const addResult = (name, details = '') => {
  results.push({ name, details });
  console.log(`PASS ${name}${details ? ` - ${details}` : ''}`);
};

const request = async (pathname, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${pathname}`, {
    ...options,
    headers: {
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...(options.headers || {}),
    },
  });
  const text = await response.text();
  let data = null;

  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  return { response, data };
};

const authHeaders = () => ({ Authorization: `Bearer ${adminToken}` });

const login = async () => {
  const badLogin = await request('/api/admin/login', {
    method: 'POST',
    body: JSON.stringify({ username: ADMIN_USERNAME, password: 'wrong-password' }),
  });
  assert(badLogin.response.status === 401, 'El login incorrecto debe devolver 401.');
  addResult('rechaza credenciales incorrectas');

  const goodLogin = await request('/api/admin/login', {
    method: 'POST',
    body: JSON.stringify({ username: ADMIN_USERNAME, password: ADMIN_PASSWORD }),
  });
  assert(goodLogin.response.ok, `Login admin fallo: ${goodLogin.data?.error || goodLogin.response.status}`);
  assert(goodLogin.data?.token, 'El login admin no devolvio token.');
  adminToken = goodLogin.data.token;
  addResult('acepta credenciales admin');
};

const createProduct = async (payload, expectedMaterials) => {
  const result = await request('/api/admin/products', {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });
  assert(result.response.status === 201, `No se pudo crear "${payload.name}": ${result.data?.error || result.response.status}`);

  const product = result.data.product;
  createdIds.add(product.id);
  assert(product.name === payload.name, 'El nombre guardado no coincide.');
  assert(product.price === payload.price, 'El precio guardado no coincide.');
  assert((product.salePrice ?? null) === (payload.salePrice ?? null), 'El precio de oferta guardado no coincide.');
  assert(JSON.stringify(product.materials) === JSON.stringify(expectedMaterials), `Materiales inesperados para "${payload.name}".`);
  assert(product.media.length === payload.media.length, `Cantidad de medios inesperada para "${payload.name}".`);
  addResult(`crea producto: ${payload.name}`, `id ${product.id}`);
  return product;
};

const cleanupUploadedFiles = () => {
  for (const file of uploadedFiles) {
    const resolved = path.resolve(WORKSPACE_ROOT, file);

    if (!resolved.startsWith(ADMIN_UPLOAD_ROOT) || !fs.existsSync(resolved)) {
      continue;
    }

    fs.rmSync(resolved, { force: true });
    let currentDir = path.dirname(resolved);

    while (currentDir.startsWith(ADMIN_UPLOAD_ROOT) && currentDir !== ADMIN_UPLOAD_ROOT) {
      if (fs.existsSync(currentDir) && fs.readdirSync(currentDir).length === 0) {
        fs.rmdirSync(currentDir);
        currentDir = path.dirname(currentDir);
      } else {
        break;
      }
    }
  }

  if (fs.existsSync(ADMIN_UPLOAD_ROOT) && fs.readdirSync(ADMIN_UPLOAD_ROOT).length === 0) {
    fs.rmdirSync(ADMIN_UPLOAD_ROOT);
  }
};

const cleanupProducts = async () => {
  if (!adminToken) {
    return;
  }

  const listing = await request('/api/admin/products', { headers: authHeaders() });

  if (!listing.response.ok || !Array.isArray(listing.data?.products)) {
    return;
  }

  const testProducts = listing.data.products.filter((product) => (
    createdIds.has(product.id) || String(product.name || '').startsWith(TEST_PREFIX)
  ));

  for (const product of testProducts) {
    await request(`/api/admin/products/${product.id}`, {
      method: 'DELETE',
      headers: authHeaders(),
    });
  }
};

const restoreDataFile = () => {
  if (backup.existed) {
    fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
    fs.writeFileSync(DATA_FILE, backup.content, 'utf8');
    return;
  }

  if (fs.existsSync(DATA_FILE)) {
    fs.rmSync(DATA_FILE, { force: true });
  }

  const dataDir = path.dirname(DATA_FILE);
  if (fs.existsSync(dataDir) && fs.readdirSync(dataDir).length === 0) {
    fs.rmdirSync(dataDir);
  }
};

const run = async () => {
  const health = await request('/api/products');
  assert(health.response.ok, `La API publica no responde en ${API_BASE_URL}.`);
  assert(Array.isArray(health.data?.products), 'La API publica no devolvio una lista de productos.');
  addResult('API publica responde', `${health.data.products.length} productos visibles`);

  const unauthorized = await request('/api/admin/products');
  assert(unauthorized.response.status === 401, 'La lista admin sin token debe devolver 401.');
  addResult('protege productos admin sin token');

  await login();

  const createdProducts = [];
  createdProducts.push(await createProduct({
    name: `${TEST_PREFIX} - cualquier material sin imagen`,
    description: 'Temporal: producto sin restriccion de material y sin imagen.',
    price: 111,
    salePrice: null,
    materials: [],
    media: [],
  }, []));
  createdProducts.push(await createProduct({
    name: `${TEST_PREFIX} - solo plata con oferta`,
    description: 'Temporal: producto restringido a plata y con oferta.',
    price: 222,
    salePrice: 199,
    materials: ['product.material.silver'],
    media: [{ type: 'image', src: SAMPLE_IMAGE }],
  }, ['product.material.silver']));
  createdProducts.push(await createProduct({
    name: `${TEST_PREFIX} - solo bronce`,
    description: 'Temporal: producto restringido a bronce.',
    price: 333,
    salePrice: null,
    materials: ['product.material.bronze'],
    media: [{ type: 'image', src: SAMPLE_IMAGE }, { type: 'image', src: SAMPLE_IMAGE_ALT }],
  }, ['product.material.bronze']));
  createdProducts.push(await createProduct({
    name: `${TEST_PREFIX} - plata y bronce con video`,
    description: 'Temporal: producto con ambos materiales y media mixta.',
    price: 444,
    salePrice: 399,
    materials: ['product.material.silver', 'product.material.bronze'],
    media: [
      { type: 'image', src: SAMPLE_IMAGE },
      { type: 'video', src: 'https://example.com/aots-test-video.mp4' },
    ],
  }, ['product.material.silver', 'product.material.bronze']));
  createdProducts.push(await createProduct({
    name: `${TEST_PREFIX} - normaliza material invalido`,
    description: 'Temporal: producto con material invalido que debe ser ignorado.',
    price: 555,
    salePrice: null,
    materials: ['product.material.gold', 'product.material.bronze'],
    media: [{ type: 'image', src: SAMPLE_IMAGE }],
  }, ['product.material.bronze']));

  const productToEdit = createdProducts[1];
  const editResult = await request(`/api/admin/products/${productToEdit.id}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify({
      ...productToEdit,
      name: `${TEST_PREFIX} - editado`,
      description: 'Temporal: descripcion editada por la prueba.',
      price: 250,
      salePrice: 210,
      materials: ['product.material.bronze'],
      media: [{ type: 'image', src: SAMPLE_IMAGE_ALT }],
    }),
  });
  assert(editResult.response.ok, `No se pudo editar producto: ${editResult.data?.error || editResult.response.status}`);
  assert(editResult.data.product.name.endsWith('editado'), 'La edicion de nombre no se guardo.');
  assert(editResult.data.product.materials.length === 1 && editResult.data.product.materials[0] === 'product.material.bronze', 'La edicion de material no se guardo.');
  assert(editResult.data.product.media[0].src === SAMPLE_IMAGE_ALT, 'La edicion de imagen no se guardo.');
  addResult('edita producto existente', `id ${productToEdit.id}`);

  const uploadResult = await request('/api/admin/uploads', {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({
      fileName: 'crud-test.png',
      productName: `${TEST_PREFIX} Upload`,
      dataUrl: ONE_PIXEL_PNG,
    }),
  });
  assert(uploadResult.response.status === 201, `No se pudo subir imagen: ${uploadResult.data?.error || uploadResult.response.status}`);
  assert(uploadResult.data?.src?.startsWith('/imagenes/productos/admin/'), 'La subida no devolvio una ruta publica esperada.');
  const uploadedRelative = path.join('public', uploadResult.data.src.replace(/^\/+/, '').replaceAll('/', path.sep));
  uploadedFiles.add(uploadedRelative);
  assert(fs.existsSync(path.resolve(WORKSPACE_ROOT, uploadedRelative)), 'La imagen subida no existe en disco.');
  const servedUpload = await fetch(`${API_BASE_URL}${uploadResult.data.src}`);
  assert(servedUpload.ok, 'La imagen subida no se sirve desde el backend.');
  addResult('sube y sirve imagen admin', uploadResult.data.src);

  const publicCatalog = await request('/api/products');
  assert(publicCatalog.response.ok, 'El catalogo publico fallo despues de crear productos.');
  const publicNames = publicCatalog.data.products.map((product) => product.name);
  for (const product of createdProducts) {
    assert(publicNames.some((name) => name === product.name || name === `${TEST_PREFIX} - editado`), `El catalogo publico no incluye "${product.name}".`);
  }
  addResult('catalogo publico refleja altas y edicion');

  for (const product of createdProducts) {
    const deleteResult = await request(`/api/admin/products/${product.id}`, {
      method: 'DELETE',
      headers: authHeaders(),
    });
    assert(deleteResult.response.ok, `No se pudo eliminar producto ${product.id}.`);
    createdIds.delete(product.id);
  }
  addResult('elimina todos los productos temporales', `${createdProducts.length} productos`);

  const finalCatalog = await request('/api/products');
  const leftovers = finalCatalog.data.products.filter((product) => String(product.name || '').startsWith(TEST_PREFIX));
  assert(leftovers.length === 0, 'Quedaron productos temporales en el catalogo.');
  addResult('catalogo queda sin productos temporales');

  console.log(`\n${results.length} pruebas completadas correctamente.`);
};

try {
  await run();
} catch (error) {
  console.error(`FAIL ${error.message}`);
  process.exitCode = 1;
} finally {
  await cleanupProducts();
  cleanupUploadedFiles();
  restoreDataFile();
}
