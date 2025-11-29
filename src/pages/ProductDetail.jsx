
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
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
    name: 'Anillo de Cuervo',
    price: 120,
    image: 'https://source.unsplash.com/random/800x600?gothic,jewelry,crow',
    description: 'Anillo de plata esterlina con un diseño de cuervo detallado, perfecto para un look oscuro y elegante.',
  },
  {
    id: 2,
    name: 'Collar de Luna Negra',
    price: 250,
    image: 'https://source.unsplash.com/random/800x600?gothic,jewelry,moon',
    description: 'Collar de obsidiana con un colgante de luna creciente, ideal para canalizar tu energía nocturna.',
  },
  {
    id: 3,
    name: 'Brazalete de Espinas',
    price: 180,
    image: 'https://source.unsplash.com/random/800x600?gothic,jewelry,thorns',
    description: 'Brazalete de plata con un diseño de espinas entrelazadas, una pieza audaz y llamativa.',
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
  const [totalPrice, setTotalPrice] = useState(product ? product.price : 0);

  useEffect(() => {
    if (product) {
      const calculatePrice = () => {
        const materialPrice = materialOptions[material].priceModifier;
        const finishPrice = finishOptions[finish].priceModifier;
        const finalPrice = product.price + materialPrice + finishPrice;
        setTotalPrice(finalPrice);
      };
      calculatePrice();
    }
  }, [material, finish, product]);

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

  const selectStyles = {
    color: '#CCCCCC',
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#B8860B',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: '#FFFFFF',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#FFFFFF',
    },
    '& .MuiSvgIcon-root': {
      color: '#B8860B',
    },
  };

  const inputLabelStyles = {
    color: '#B8860B',
    '&.Mui-focused': {
      color: '#FFFFFF',
    },
  };

  const menuItemStyles = {
    backgroundColor: '#111',
    color: '#CCCCCC',
    fontFamily: "'Montserrat Light', 'Lato Light', sans-serif",
    '&:hover': {
      backgroundColor: '#222'
    },
    '&.Mui-selected': {
      backgroundColor: '#B8860B !important',
      color: '#000000',
    }
  };

  return (
    <Container sx={{ py: 4, color: '#CCCCCC' }}>
      <Grid container spacing={{ xs: 2, md: 6 }}>
        <Grid item xs={12} md={6}>
          <CardMedia
            component="img"
            image={product.image}
            alt={product.name}
            sx={{
              width: '100%',
              height: 'auto',
              maxHeight: '70vh',
              objectFit: 'cover',
              filter: 'grayscale(80%) brightness(0.8)'
            }}
          />
        </Grid>
        <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Typography
            variant="h1"
            component="h1"
            gutterBottom
            sx={{
              fontFamily: "'Cinzel Light', 'Cormorant SC', serif",
              color: '#FFFFFF',
              textTransform: 'uppercase',
              letterSpacing: '0.3em',
              fontSize: { xs: '2.5rem', md: '3.5rem' },
            }}
          >
            {product.name}
          </Typography>
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              color: '#B8860B',
              mb: 3,
              fontFamily: "'Montserrat Light', 'Lato Light', sans-serif",
              fontSize: '1.8rem'
            }}
          >
            ${totalPrice}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mb: 4,
              fontFamily: "'Montserrat Light', 'Lato Light', sans-serif",
              fontSize: '1.1rem',
              color: '#a9a9a9'
            }}
          >
            {product.description}
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, maxWidth: '400px' }}>
            <FormControl fullWidth>
              <InputLabel id="material-select-label" sx={inputLabelStyles}>Material</InputLabel>
              <Select
                labelId="material-select-label"
                value={material}
                label="Material"
                onChange={(e) => setMaterial(e.target.value)}
                sx={selectStyles}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      backgroundColor: '#111',
                    },
                  },
                }}
              >
                {Object.entries(materialOptions).map(([key, value]) => (
                  <MenuItem key={key} value={key} sx={menuItemStyles}>{value.label} (+${value.priceModifier})</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="size-select-label" sx={inputLabelStyles}>Talla</InputLabel>
              <Select
                labelId="size-select-label"
                value={size}
                label="Talla"
                onChange={(e) => setSize(e.target.value)}
                sx={selectStyles}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      backgroundColor: '#111',
                    },
                  },
                }}
              >
                {[...Array(10).keys()].map((i) => (
                  <MenuItem key={i + 5} value={i + 5} sx={menuItemStyles}>Talla {i + 5}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="finish-select-label" sx={inputLabelStyles}>Acabado</InputLabel>
              <Select
                labelId="finish-select-label"
                value={finish}
                label="Acabado"
                onChange={(e) => setFinish(e.target.value)}
                sx={selectStyles}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      backgroundColor: '#111',
                    },
                  },
                }}
              >
                {Object.entries(finishOptions).map(([key, value]) => (
                  <MenuItem key={key} value={key} sx={menuItemStyles}>{value.label} (+${value.priceModifier})</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Button
            variant="outlined"
            onClick={handleAddToCart}
            sx={{
              mt: 4,
              width: '100%',
              maxWidth: '400px',
              color: '#CCCCCC',
              borderColor: '#B8860B',
              borderWidth: '1px',
              borderRadius: 0,
              padding: '12px 24px',
              fontFamily: "'Montserrat Light', 'Lato Light', sans-serif",
              fontSize: '1rem',
              transition: 'background-color 0.3s, color 0.3s',
              '&:hover': {
                backgroundColor: '#B8860B',
                color: '#000000',
                borderColor: '#B8860B'
              }
            }}
          >
            Añadir al carrito
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ProductDetail;
