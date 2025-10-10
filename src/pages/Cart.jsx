
import React from 'react';
import { Container, Typography, Button, Grid, Card, CardContent, CardMedia, IconButton } from '@mui/material';
import useCartStore from '../store/cartStore';
import DeleteIcon from '@mui/icons-material/Delete';

function Cart() {
  const { items, removeItem, clearCart } = useCartStore();

  const total = items.reduce((acc, item) => acc + item.price, 0);

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h2" component="h1" gutterBottom align="center">
        Carrito de Compras
      </Typography>
      {items.length === 0 ? (
        <Typography align="center">Tu carrito está vacío.</Typography>
      ) : (
        <Grid container spacing={2} sx={{ mb: 4 }}>
          {items.map((item) => (
            <Grid item xs={12} key={item.id}>
              <Card sx={{ display: 'flex', backgroundColor: '#1e1e1e', color: 'white' }}>
                <CardMedia
                  component="img"
                  sx={{ width: 151, filter: 'grayscale(80%) brightness(0.8)' }}
                  image={item.image}
                  alt={item.name}
                />
                <CardContent sx={{ flex: '1 0 auto' }}>
                  <Typography component="div" variant="h5">
                    {item.name}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary" component="div" sx={{color: '#c0c0c0'}}>
                    {item.material}, Talla {item.size}, {item.finish}
                  </Typography>
                  <Typography variant="h6" sx={{ mt: 1 }}>${item.price}</Typography>
                </CardContent>
                <IconButton onClick={() => removeItem(item.id)} sx={{ color: 'white' }}>
                  <DeleteIcon />
                </IconButton>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      {items.length > 0 && (
        <Grid container justifyContent="flex-end">
          <Grid item xs={12} sm={4} sx={{ textAlign: 'right' }}>
            <Typography variant="h4" sx={{ mb: 2 }}>
              Total: ${total}
            </Typography>
            <Button variant="contained" color="primary" fullWidth sx={{ mb: 1 }}>
              Proceder al Pago
            </Button>
            <Button variant="outlined" color="secondary" fullWidth onClick={clearCart}>
              Vaciar Carrito
            </Button>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}

export default Cart;
