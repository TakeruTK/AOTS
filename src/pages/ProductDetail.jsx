
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Box,
} from '@mui/material';
import useCartStore from '../store/cartStore';
import { v4 as uuidv4 } from 'uuid';

const products = [
  {
    id: 1,
    name: 'Anillo de Cráneo de Plata',
    price: 150,
    image: 'https://images.unsplash.com/photo-1588892888288-3964467385a4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 2,
    name: 'Anillo de Cráneo de Bronce',
    price: 120,
    image: 'https://images.unsplash.com/photo-1611645462295-2152a5c88746?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 3,
    name: 'Anillo de Tentáculos',
    price: 180,
    image: 'https://images.unsplash.com/photo-1599330283569-03a89372147a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
   {
    id: 4,
    name: 'Anillo de Huesos Entrelazados',
    price: 200,
    image: 'https://images.unsplash.com/photo-1598104134114-493396a5f795?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 5,
    name: 'Anillo de Gárgola Gótica',
    price: 220,
    image: 'https://images.unsplash.com/photo-1599330283569-03a89372147a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 6,
    name: 'Anillo de Sello de Calavera',
    price: 190,
    image: 'https://images.unsplash.com/photo-1611645462295-2152a5c88746?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

const materialOptions = {
  bronze: { label: 'Bronce', priceModifier: 0 },
  silver: { label: 'Plata', priceModifier: 50 },
  gold: { label: 'Oro', priceModifier: 200 },
};

const finishOptions = {
  polished: { label: 'Pulido', priceModifier: 0 },
  matte: { label: 'Mate', priceModifier: 10 },
  aged: { label: 'Envejecido', priceModifier: 20 },
};

function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));
  const addItemToCart = useCartStore((state) => state.addItem);

  const [material, setMaterial] = useState('bronze');
  const [size, setSize] = useState(7);
  const [finish, setFinish] = useState('polished');
  const [totalPrice, setTotalPrice] = useState(product.price);

  useEffect(() => {
    const calculatePrice = () => {
      const materialPrice = materialOptions[material].priceModifier;
      const finishPrice = finishOptions[finish].priceModifier;
      const finalPrice = product.price + materialPrice + finishPrice;
      setTotalPrice(finalPrice);
    };
    calculatePrice();
  }, [material, finish, product.price]);

  const handleAddToCart = () => {
    const cartItem = {
      id: uuidv4(),
      productId: product.id,
      name: product.name,
      image: product.image,
      price: totalPrice,
      material: materialOptions[material].label,
      size,
      finish: finishOptions[finish].label,
    };
    addItemToCart(cartItem);
  };

  if (!product) {
    return <Typography>Producto no encontrado</Typography>;
  }

  return (
    <Container sx={{ py: 4 }}>
      <Grid container spacing={{ xs: 2, md: 4 }}>
        <Grid item xs={12} md={6}>
          <Card sx={{ backgroundColor: '#1e1e1e' }}>
            <CardMedia
              component="img"
              image={product.image}
              alt={product.name}
              sx={{ filter: 'grayscale(80%) brightness(0.8)' }}
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h3" component="h1" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="h5" gutterBottom sx={{ color: '#c0c0c0', mb: 3 }}>
            ${totalPrice}
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Descripción del producto. Aquí puedes añadir más detalles sobre la inspiración, los materiales y el proceso de creación de esta joya.
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <FormControl fullWidth>
              <InputLabel id="material-select-label">Material</InputLabel>
              <Select
                labelId="material-select-label"
                value={material}
                label="Material"
                onChange={(e) => setMaterial(e.target.value)}
              >
                {Object.entries(materialOptions).map(([key, value]) => (
                  <MenuItem key={key} value={key}>{value.label} (+${value.priceModifier})</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="size-select-label">Talla</InputLabel>
              <Select
                labelId="size-select-label"
                value={size}
                label="Talla"
                onChange={(e) => setSize(e.target.value)}
              >
                {[...Array(10).keys()].map((i) => (
                  <MenuItem key={i + 5} value={i + 5}>Talla {i + 5}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="finish-select-label">Acabado</InputLabel>
              <Select
                labelId="finish-select-label"
                value={finish}
                label="Acabado"
                onChange={(e) => setFinish(e.target.value)}
              >
                {Object.entries(finishOptions).map(([key, value]) => (
                  <MenuItem key={key} value={key}>{value.label} (+${value.priceModifier})</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Button variant="contained" color="primary" sx={{ mt: 4, width: '100%' }} onClick={handleAddToCart}>
            Añadir al carrito
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ProductDetail;
