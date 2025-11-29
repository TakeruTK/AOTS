
import React from 'react';
import { Container, Typography, Button, Grid, Box, IconButton } from '@mui/material';
import useCartStore from '../store/cartStore';
import DeleteIcon from '@mui/icons-material/Delete';

function Cart() {
  const { items, removeItem, clearCart } = useCartStore();

  const total = items.reduce((acc, item) => acc + item.price, 0);

  return (
    <Container sx={{ py: 4, color: '#CCCCCC' }}>
      <Typography
        variant="h2"
        component="h1"
        gutterBottom
        align="center"
        sx={{
          fontFamily: "'Cinzel Light', 'Cormorant SC', serif",
          textTransform: 'uppercase',
          letterSpacing: '0.2em',
          marginBottom: '3rem',
          color: '#FFFFFF'
        }}
      >
        Carrito de Compras
      </Typography>
      {items.length === 0 ? (
        <Typography 
          align="center" 
          sx={{
            fontFamily: "'Montserrat Light', 'Lato Light', sans-serif", 
            fontSize: '1.2rem'
          }}
        >
          Tu carrito está vacío.
        </Typography>
      ) : (
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {items.map((item) => (
            <Grid item xs={12} key={item.id}>
              <Box sx={{
                display: 'flex',
                backgroundColor: 'rgba(10, 10, 10, 0.7)',
                padding: 2,
                border: '1px solid #222',
              }}>
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: 120,
                    height: 120,
                    objectFit: 'cover',
                    filter: 'grayscale(80%) brightness(0.8)',
                    marginRight: '1.5rem'
                  }}
                />
                <Box sx={{ flex: '1 0 auto', display: 'flex', flexDirection: 'column' }}>
                  <Typography 
                    component="div" 
                    variant="h5"
                    sx={{
                      fontFamily: "'Cinzel Light', 'Cormorant SC', serif",
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      color: '#FFFFFF',
                    }}
                  >
                    {item.name}
                  </Typography>
                  <Typography 
                    variant="subtitle1" 
                    component="div" 
                    sx={{
                      color: '#a9a9a9',
                      fontFamily: "'Montserrat Light', 'Lato Light', sans-serif",
                    }}
                  >
                    {item.material}, Talla {item.size}, {item.finish}
                  </Typography>
                  <Typography 
                    variant="h6" 
                    sx={{
                      mt: 'auto',
                      color: '#B8860B',
                      fontFamily: "'Montserrat Light', 'Lato Light', sans-serif",
                    }}
                  >
                    ${item.price}
                  </Typography>
                </Box>
                <IconButton 
                  onClick={() => removeItem(item.id)} 
                  sx={{
                    color: '#B8860B',
                    alignSelf: 'center',
                    '&:hover': {
                      color: '#FFFFFF'
                    }
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
      {items.length > 0 && (
        <Grid container justifyContent="flex-end">
          <Grid item xs={12} sm={5} md={4} sx={{ textAlign: 'right' }}>
            <Typography 
              variant="h4" 
              sx={{
                mb: 2, 
                fontFamily: "'Cinzel Light', 'Cormorant SC', serif",
                color: '#FFFFFF'
              }}
            >
              Total: ${total}
            </Typography>
            <Button 
              variant="contained" 
              fullWidth sx={{
                mb: 1,
                color: '#000000',
                backgroundColor: '#B8860B',
                borderColor: '#B8860B',
                border: '1px solid',
                borderRadius: 0, // Sharp edges
                padding: '10px 24px',
                fontFamily: "'Montserrat Light', 'Lato Light', sans-serif",
                fontSize: '1rem',
                transition: 'background-color 0.3s, color 0.3s',
                '&:hover': {
                  backgroundColor: '#a3790d',
                  borderColor: '#a3790d'
                }
              }}
            >
              Proceder al Pago
            </Button>
            <Button 
              variant="outlined" 
              fullWidth 
              onClick={clearCart}
              sx={{
                color: '#CCCCCC',
                borderColor: '#B8860B',
                borderWidth: '1px',
                borderRadius: 0,
                padding: '10px 24px',
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
              Vaciar Carrito
            </Button>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}

export default Cart;
