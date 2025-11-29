
import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Badge } from '@mui/material';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import useCartStore from '../store/cartStore';

function Navbar() {
  const cartItemCount = useCartStore((state) => state.items.length);

  return (
    <AppBar 
      position="static" 
      sx={{ 
        backgroundColor: 'transparent', 
        boxShadow: 'none',
        borderBottom: '1px solid #B8860B',
        marginBottom: '2em'
      }}
    >
      <Toolbar sx={{ padding: '0 2em' }}>
        <Typography 
          variant="h1" 
          component={Link} 
          to="/" 
          sx={{
            flexGrow: 1,
            fontFamily: "'Cinzel Light', 'Cormorant SC', serif",
            fontSize: '1.5rem', // Adjust size for navbar
            color: '#FFFFFF',
            textDecoration: 'none',
            textTransform: 'uppercase',
            letterSpacing: '0.3em'
          }}
        >
          Ashes of the Souls
        </Typography>
        <Button 
          color="inherit" 
          component={Link} 
          to="/" 
          sx={{
            fontFamily: "'Montserrat Light', 'Lato Light', sans-serif",
            color: '#CCCCCC',
            fontSize: '1rem',
            textTransform: 'none',
            '&:hover': {
              color: '#B8860B',
              backgroundColor: 'transparent'
            }
          }}
        >
          Home
        </Button>
        <Button 
          color="inherit" 
          component={Link} 
          to="/shop" 
          sx={{
            fontFamily: "'Montserrat Light', 'Lato Light', sans-serif",
            color: '#CCCCCC',
            fontSize: '1rem',
            textTransform: 'none',
            '&:hover': {
              color: '#B8860B',
              backgroundColor: 'transparent'
            }
          }}
        >
          Shop
        </Button>
        <Button 
          color="inherit" 
          component={Link} 
          to="/portfolio" 
          sx={{
            fontFamily: "'Montserrat Light', 'Lato Light', sans-serif",
            color: '#CCCCCC',
            fontSize: '1rem',
            textTransform: 'none',
            '&:hover': {
              color: '#B8860B',
              backgroundColor: 'transparent'
            }
          }}
        >
          Portfolio
        </Button>
        <IconButton 
          color="inherit" 
          component={Link} 
          to="/cart" 
          sx={{ 
            color: '#CCCCCC',
            '&:hover': {
              color: '#B8860B',
              backgroundColor: 'transparent'
            }
          }}
        >
          <Badge 
            badgeContent={cartItemCount} 
            sx={{
              '& .MuiBadge-badge': {
                backgroundColor: '#B8860B',
                color: '#000000'
              }
            }}
          >
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
