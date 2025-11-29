
import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Badge } from '@mui/material';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import useCartStore from '../store/cartStore';

const navBarStyle = {
    backgroundColor: '#1a1a1a',
    fontFamily: "'Creepster', cursive",
    borderBottom: '2px solid #e53935'
};

const titleStyle = {
    flexGrow: 1,
    textDecoration: 'none',
    color: '#e53935',
    fontFamily: "'Nosifer', cursive",
    textShadow: '2px 2px 4px #000',
    fontSize: '1.8rem'
};

const linkStyle = {
    color: '#f5f5f5',
    fontFamily: "'Creepster', cursive",
    fontSize: '1.5rem',
    margin: '0 10px',
    textShadow: '1px 1px 2px #000',
    '&:hover': {
        color: '#fdd835',
    }
};

function Navbar() {
  const cartItemCount = useCartStore((state) => state.items.length);

  return (
    <AppBar position="static" sx={navBarStyle}>
      <Toolbar>
        <Typography variant="h6" component={Link} to="/" sx={titleStyle}>
          Ashes of the Souls
        </Typography>
        <Button color="inherit" component={Link} to="/" sx={linkStyle}>Home</Button>
        <Button color="inherit" component={Link} to="/shop" sx={linkStyle}>Shop</Button>
        <Button color="inherit" component={Link} to="/portfolio" sx={linkStyle}>Portfolio</Button>
        <IconButton color="inherit" component={Link} to="/cart" sx={{color: '#f5f5f5'}}>
          <Badge badgeContent={cartItemCount} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
