import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  List,
  ListItemButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import DeleteIcon from '@mui/icons-material/Delete';
import LinkIcon from '@mui/icons-material/Link';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import LogoutIcon from '@mui/icons-material/Logout';
import SaveIcon from '@mui/icons-material/Save';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { useTranslation } from 'react-i18next';
import { API_BASE_URL } from '../services/catalog';
import { MATERIAL_OPTIONS, normalizeMaterialValues } from '../utils/productOptions';
import { formatUsdPrice, getProductPrice, hasProductOffer } from '../utils/pricing';

const ADMIN_TOKEN_KEY = 'aots-admin-token';

const emptyProductForm = {
  name: '',
  description: '',
  price: '',
  salePrice: '',
  materials: [],
  media: [],
};

const adminTextFieldSx = {
  '& .MuiInputBase-input': {
    color: '#ffffff',
  },
  '& .MuiInputBase-input:-webkit-autofill': {
    WebkitBoxShadow: '0 0 0 100px #111 inset',
    WebkitTextFillColor: '#ffffff',
    caretColor: '#ffffff',
  },
  '& .MuiInputLabel-root': {
    color: '#ffffff',
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: '#ffffff',
  },
  '& .MuiOutlinedInput-root': {
    color: '#ffffff',
    '& fieldset': {
      borderColor: '#ffffff',
    },
    '&:hover fieldset': {
      borderColor: '#ffffff',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#ffffff',
    },
  },
};

const readFileAsDataUrl = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = () => resolve(reader.result);
  reader.onerror = () => reject(reader.error);
  reader.readAsDataURL(file);
});

const productToForm = (product) => ({
  id: product.id,
  name: product.name || '',
  description: product.description || '',
  price: product.price ?? '',
  salePrice: product.salePrice ?? '',
  materials: normalizeMaterialValues(product.materials),
  media: Array.isArray(product.media) ? product.media : [],
});

const buildProductPayload = (form) => ({
  id: form.id,
  name: form.name,
  description: form.description,
  price: Number(form.price),
  salePrice: form.salePrice === '' ? null : Number(form.salePrice),
  materials: normalizeMaterialValues(form.materials),
  media: form.media
    .map((item) => ({ type: item.type === 'video' ? 'video' : 'image', src: String(item.src || '').trim() }))
    .filter((item) => item.src),
});

const Admin = () => {
  const { t } = useTranslation();
  const [token, setToken] = useState(() => localStorage.getItem(ADMIN_TOKEN_KEY) || '');
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [form, setForm] = useState(emptyProductForm);
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');

  const selectedProduct = useMemo(
    () => products.find((product) => product.id === selectedProductId),
    [products, selectedProductId],
  );

  const authHeaders = (extraHeaders = {}) => ({
    ...extraHeaders,
    Authorization: `Bearer ${token}`,
  });

  const clearSession = useCallback(() => {
    localStorage.removeItem(ADMIN_TOKEN_KEY);
    setToken('');
    setProducts([]);
    setSelectedProductId(null);
    setForm(emptyProductForm);
  }, []);

  const loadProducts = useCallback(async () => {
    if (!token) {
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/products`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();

      if (response.status === 401) {
        clearSession();
        throw new Error('La sesion expiro.');
      }

      if (!response.ok) {
        throw new Error(data.error || 'No se pudo cargar el catalogo.');
      }

      setProducts(data.products || []);
      setSelectedProductId((currentSelectedId) => {
        if (currentSelectedId && data.products?.some((product) => product.id === currentSelectedId)) {
          return currentSelectedId;
        }

        const nextProduct = data.products?.[0];
        setForm(nextProduct ? productToForm(nextProduct) : emptyProductForm);
        return nextProduct?.id || null;
      });
    } catch (err) {
      setError(err.message || 'No se pudo cargar el catalogo.');
    } finally {
      setIsLoading(false);
    }
  }, [clearSession, token]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const handleLogin = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginForm),
      });
      const data = await response.json();

      if (!response.ok || !data.token) {
        throw new Error(data.error || 'No se pudo iniciar sesion.');
      }

      localStorage.setItem(ADMIN_TOKEN_KEY, data.token);
      setToken(data.token);
      setLoginForm({ username: '', password: '' });
      setStatus('Sesion iniciada.');
    } catch (err) {
      setError(err.message || 'No se pudo iniciar sesion.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectProduct = (product) => {
    setSelectedProductId(product.id);
    setForm(productToForm(product));
    setImageUrl('');
    setError('');
    setStatus('');
  };

  const handleNewProduct = () => {
    setSelectedProductId(null);
    setForm(emptyProductForm);
    setImageUrl('');
    setError('');
    setStatus('');
  };

  const handleFieldChange = (field) => (event) => {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: event.target.value,
    }));
  };

  const handleMaterialToggle = (materialValue) => (event) => {
    setForm((currentForm) => {
      const materials = normalizeMaterialValues(currentForm.materials);
      const nextMaterials = event.target.checked
        ? [...materials, materialValue]
        : materials.filter((material) => material !== materialValue);

      return {
        ...currentForm,
        materials: normalizeMaterialValues(nextMaterials),
      };
    });
  };

  const handleAddImageUrl = () => {
    const src = imageUrl.trim();

    if (!src) {
      return;
    }

    setForm((currentForm) => ({
      ...currentForm,
      media: [...currentForm.media, { type: 'image', src }],
    }));
    setImageUrl('');
  };

  const handleRemoveImage = (indexToRemove) => {
    setForm((currentForm) => ({
      ...currentForm,
      media: currentForm.media.filter((_item, index) => index !== indexToRemove),
    }));
  };

  const handleUploadFiles = async (event) => {
    const files = Array.from(event.target.files || []);
    event.target.value = '';

    if (!files.length) {
      return;
    }

    setIsUploading(true);
    setError('');

    try {
      const uploadedMedia = [];

      for (const file of files) {
        const dataUrl = await readFileAsDataUrl(file);
        const response = await fetch(`${API_BASE_URL}/api/admin/uploads`, {
          method: 'POST',
          headers: authHeaders({ 'Content-Type': 'application/json' }),
          body: JSON.stringify({
            fileName: file.name,
            dataUrl,
            productName: form.name || selectedProduct?.name || 'producto',
          }),
        });
        const data = await response.json();

        if (!response.ok || !data.src) {
          throw new Error(data.error || 'No se pudo subir una imagen.');
        }

        uploadedMedia.push({ type: 'image', src: data.src });
      }

      setForm((currentForm) => ({
        ...currentForm,
        media: [...currentForm.media, ...uploadedMedia],
      }));
      setStatus('Imagen subida.');
    } catch (err) {
      setError(err.message || 'No se pudo subir la imagen.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSaveProduct = async (event) => {
    event.preventDefault();
    setIsSaving(true);
    setError('');
    setStatus('');

    try {
      const payload = buildProductPayload(form);
      const isEditing = Boolean(selectedProductId);
      const response = await fetch(
        isEditing
          ? `${API_BASE_URL}/api/admin/products/${selectedProductId}`
          : `${API_BASE_URL}/api/admin/products`,
        {
          method: isEditing ? 'PUT' : 'POST',
          headers: authHeaders({ 'Content-Type': 'application/json' }),
          body: JSON.stringify(payload),
        },
      );
      const data = await response.json();

      if (!response.ok || !data.product) {
        throw new Error(data.error || 'No se pudo guardar el producto.');
      }

      setProducts((currentProducts) => {
        const exists = currentProducts.some((product) => product.id === data.product.id);
        return exists
          ? currentProducts.map((product) => (product.id === data.product.id ? data.product : product))
          : [...currentProducts, data.product];
      });
      setSelectedProductId(data.product.id);
      setForm(productToForm(data.product));
      setStatus('Producto guardado.');
    } catch (err) {
      setError(err.message || 'No se pudo guardar el producto.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteProduct = async () => {
    if (!selectedProductId || !window.confirm('Eliminar este producto del catalogo?')) {
      return;
    }

    setIsSaving(true);
    setError('');
    setStatus('');

    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/products/${selectedProductId}`, {
        method: 'DELETE',
        headers: authHeaders(),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'No se pudo eliminar el producto.');
      }

      const nextProducts = products.filter((product) => product.id !== selectedProductId);
      setProducts(nextProducts);
      setSelectedProductId(nextProducts[0]?.id || null);
      setForm(nextProducts[0] ? productToForm(nextProducts[0]) : emptyProductForm);
      setStatus('Producto eliminado.');
    } catch (err) {
      setError(err.message || 'No se pudo eliminar el producto.');
    } finally {
      setIsSaving(false);
    }
  };

  if (!token) {
    return (
      <Container maxWidth="xs" sx={{ pt: { xs: 10, md: 14 }, pb: 6 }}>
        <Paper sx={{ p: { xs: 2.5, sm: 4 }, backgroundColor: '#111', color: '#f5f5f5', border: '1px solid #2c2c2c', borderRadius: 1 }}>
          <Typography variant="h4" component="h1" sx={{ fontFamily: 'Cinzel, serif', mb: 3, fontSize: { xs: '1.6rem', sm: '2rem' } }}>
            Acceso administrador
          </Typography>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <Stack component="form" spacing={2} onSubmit={handleLogin}>
            <TextField
              label="Usuario"
              value={loginForm.username}
              onChange={(event) => setLoginForm((currentForm) => ({ ...currentForm, username: event.target.value }))}
              autoComplete="username"
              required
              sx={adminTextFieldSx}
            />
            <TextField
              label="Contrasena"
              type="password"
              value={loginForm.password}
              onChange={(event) => setLoginForm((currentForm) => ({ ...currentForm, password: event.target.value }))}
              autoComplete="current-password"
              required
              sx={adminTextFieldSx}
            />
            <Button type="submit" variant="contained" disabled={isLoading} sx={{ backgroundColor: '#B8860B', color: '#111', py: 1.2 }}>
              Entrar
            </Button>
          </Stack>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ pt: { xs: 9, md: 12 }, pb: 6 }}>
      <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ xs: 'stretch', md: 'center' }} gap={2} sx={{ mb: 3 }}>
        <Box>
          <Typography variant="h3" component="h1" sx={{ fontFamily: 'Cinzel, serif', fontSize: { xs: '1.7rem', md: '2.4rem' } }}>
            Panel administrador
          </Typography>
          <Typography sx={{ color: '#aaa', fontSize: '1rem' }}>
            Catalogo de productos
          </Typography>
        </Box>
        <Stack direction="row" gap={1} flexWrap="wrap">
          <Button startIcon={<AddIcon />} variant="outlined" onClick={handleNewProduct} sx={{ borderColor: '#B8860B', color: '#B8860B' }}>
            Nuevo
          </Button>
          <Button startIcon={<LogoutIcon />} variant="outlined" onClick={clearSession} sx={{ borderColor: '#555', color: '#ddd' }}>
            Salir
          </Button>
        </Stack>
      </Stack>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {status && <Alert severity="success" sx={{ mb: 2 }}>{status}</Alert>}

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ backgroundColor: '#111', color: '#f5f5f5', border: '1px solid #2c2c2c', borderRadius: 1, overflow: 'hidden' }}>
            <Box sx={{ p: 2, borderBottom: '1px solid #2c2c2c' }}>
              <Typography variant="h6" sx={{ fontFamily: 'Cinzel, serif' }}>
                Productos
              </Typography>
            </Box>
            <List disablePadding>
              {products.map((product) => {
                const productHasOffer = hasProductOffer(product);
                const productMaterials = normalizeMaterialValues(product.materials);
                return (
                  <ListItemButton
                    key={product.id}
                    selected={product.id === selectedProductId}
                    onClick={() => handleSelectProduct(product)}
                    sx={{
                      alignItems: 'flex-start',
                      gap: 1.5,
                      borderBottom: '1px solid #222',
                      color: '#f5f5f5',
                      '&.Mui-selected': { backgroundColor: 'rgba(184, 134, 11, 0.18)' },
                      '&.Mui-selected:hover': { backgroundColor: 'rgba(184, 134, 11, 0.24)' },
                    }}
                  >
                    <Box
                      component="img"
                      src={product.media?.[0]?.src || '/path/to/default-image.jpg'}
                      alt={product.name}
                      sx={{ width: 64, height: 64, objectFit: 'cover', backgroundColor: '#222', flex: '0 0 auto' }}
                    />
                    <Box sx={{ minWidth: 0 }}>
                      <Typography sx={{ color: '#fff', fontWeight: 700, overflowWrap: 'anywhere' }}>{product.name}</Typography>
                      <Stack direction="row" gap={1} alignItems="center" flexWrap="wrap">
                        {productHasOffer && <LocalOfferIcon sx={{ fontSize: 16, color: '#ef4444' }} />}
                        <Typography sx={{ color: '#B8860B', fontSize: '0.95rem' }}>
                          {formatUsdPrice(getProductPrice(product))}
                        </Typography>
                        <Typography sx={{ color: '#aaa', fontSize: '0.85rem' }}>
                          {productMaterials.length
                            ? productMaterials.map((material) => t(material)).join(', ')
                            : 'Cualquier material'}
                        </Typography>
                      </Stack>
                    </Box>
                  </ListItemButton>
                );
              })}
              {!products.length && (
                <Box sx={{ p: 2 }}>
                  <Typography sx={{ color: '#aaa' }}>{isLoading ? 'Cargando...' : 'Sin productos.'}</Typography>
                </Box>
              )}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper sx={{ p: { xs: 2, sm: 3 }, backgroundColor: '#111', color: '#f5f5f5', border: '1px solid #2c2c2c', borderRadius: 1 }}>
            <Stack component="form" spacing={2.5} onSubmit={handleSaveProduct}>
              <TextField label="Nombre" value={form.name} onChange={handleFieldChange('name')} required fullWidth sx={adminTextFieldSx} />
              <TextField
                label="Descripcion"
                value={form.description}
                onChange={handleFieldChange('description')}
                multiline
                minRows={4}
                fullWidth
                sx={adminTextFieldSx}
              />
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Precio USD"
                    type="number"
                    value={form.price}
                    onChange={handleFieldChange('price')}
                    inputProps={{ min: 0, step: '0.01' }}
                    required
                    fullWidth
                    sx={adminTextFieldSx}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Precio oferta USD"
                    type="number"
                    value={form.salePrice}
                    onChange={handleFieldChange('salePrice')}
                    inputProps={{ min: 0, step: '0.01' }}
                    fullWidth
                    sx={adminTextFieldSx}
                  />
                </Grid>
              </Grid>

              <Box>
                <Typography variant="h6" sx={{ fontFamily: 'Cinzel, serif', mb: 1 }}>
                  Materiales permitidos
                </Typography>
                <Typography sx={{ color: '#aaa', fontSize: '0.95rem', mb: 1.5 }}>
                  Si no marcas ninguno, el producto se podra pedir en cualquier material.
                </Typography>
                <FormGroup row sx={{ gap: { xs: 0.5, sm: 2 } }}>
                  {MATERIAL_OPTIONS.map((option) => (
                    <FormControlLabel
                      key={option.value}
                      control={
                        <Checkbox
                          checked={form.materials.includes(option.value)}
                          onChange={handleMaterialToggle(option.value)}
                          sx={{
                            color: '#ffffff',
                            '&.Mui-checked': { color: '#B8860B' },
                          }}
                        />
                      }
                      label={t(option.labelKey)}
                      sx={{
                        color: '#ffffff',
                        mr: 0,
                        '& .MuiFormControlLabel-label': {
                          color: '#ffffff',
                        },
                      }}
                    />
                  ))}
                </FormGroup>
              </Box>

              <Divider sx={{ borderColor: '#2c2c2c' }} />

              <Box>
                <Typography variant="h6" sx={{ fontFamily: 'Cinzel, serif', mb: 1.5 }}>
                  Imagenes
                </Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ mb: 2 }}>
                  <TextField
                    label="URL o ruta de imagen"
                    value={imageUrl}
                    onChange={(event) => setImageUrl(event.target.value)}
                    fullWidth
                    sx={adminTextFieldSx}
                  />
                  <Button startIcon={<LinkIcon />} variant="outlined" onClick={handleAddImageUrl} sx={{ borderColor: '#B8860B', color: '#B8860B', minWidth: 160 }}>
                    Agregar
                  </Button>
                  <Button component="label" startIcon={<UploadFileIcon />} variant="outlined" disabled={isUploading} sx={{ borderColor: '#555', color: '#ddd', minWidth: 160 }}>
                    Subir
                    <input hidden multiple accept="image/*" type="file" onChange={handleUploadFiles} />
                  </Button>
                </Stack>

                <Grid container spacing={1.5}>
                  {form.media.map((item, index) => (
                    <Grid item xs={6} sm={4} md={3} key={`${item.src}-${index}`}>
                      <Box sx={{ position: 'relative', border: '1px solid #333', backgroundColor: '#1d1d1d', aspectRatio: '1 / 1' }}>
                        <Box
                          component="img"
                          src={item.src}
                          alt=""
                          sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        <IconButton
                          aria-label="Eliminar imagen"
                          onClick={() => handleRemoveImage(index)}
                          sx={{
                            position: 'absolute',
                            top: 6,
                            right: 6,
                            backgroundColor: 'rgba(0,0,0,0.7)',
                            color: '#fff',
                            '&:hover': { backgroundColor: '#7f1d1d' },
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Grid>
                  ))}
                  {!form.media.length && (
                    <Grid item xs={12}>
                      <Box sx={{ border: '1px dashed #444', p: 3, textAlign: 'center', color: '#aaa' }}>
                        <AddPhotoAlternateIcon sx={{ mb: 1 }} />
                        <Typography>Sin imagenes.</Typography>
                      </Box>
                    </Grid>
                  )}
                </Grid>
              </Box>

              <Stack direction={{ xs: 'column', sm: 'row' }} gap={1.5} justifyContent="space-between">
                <Button
                  type="submit"
                  startIcon={<SaveIcon />}
                  variant="contained"
                  disabled={isSaving}
                  sx={{ backgroundColor: '#B8860B', color: '#111', py: 1.2, minWidth: 180 }}
                >
                  Guardar
                </Button>
                <Button
                  startIcon={<DeleteIcon />}
                  color="error"
                  variant="outlined"
                  disabled={!selectedProductId || isSaving}
                  onClick={handleDeleteProduct}
                  sx={{ py: 1.2, minWidth: 180 }}
                >
                  Eliminar
                </Button>
              </Stack>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Admin;
