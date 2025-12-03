
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Badge, Drawer, List, ListItem, ListItemButton, ListItemText, Box, useTheme, useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import useCartStore from '../store/cartStore';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

function Navbar() {
  const cartItemCount = useCartStore((state) => state.items.length);
  const { t } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navLinks = [
    { text: t('header.home'), to: '/' },
    { text: t('header.shop'), to: '/shop' },
    { text: t('header.portfolio'), to: '/portfolio' },
    { text: t('header.about'), to: '/about' },
  ];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', backgroundColor: 'rgba(0, 0, 0, 0.9)', height: '100%', color: '#fff' }}>
      <Typography variant="h6" sx={{ my: 2, fontFamily: "'Cinzel Light', serif" }}>
        Ashes of the Souls
      </Typography>
      <List>
        {navLinks.map((link) => (
          <ListItem key={link.text} disablePadding>
            <ListItemButton component={Link} to={link.to} sx={{ textAlign: 'center' }}>
              <ListItemText primary={link.text} primaryTypographyProps={{ fontFamily: "'Montserrat Light', sans-serif" }}/>
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding sx={{ justifyContent: 'center', pt: 2, pb: 1 }}>
           <LanguageSwitcher />
        </ListItem>
        <ListItem disablePadding>
            <ListItemButton component={Link} to="/cart" sx={{ justifyContent: 'center' }}>
                 <IconButton color="inherit">
                    <Badge badgeContent={cartItemCount} color="error">
                        <ShoppingCartIcon />
                    </Badge>
                </IconButton>
            </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  const desktopNav = (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        {navLinks.map((link) => (
            <Button 
                key={link.text}
                color="inherit" 
                component={Link} 
                to={link.to} 
                sx={{
                    fontFamily: "'Montserrat Light', 'Lato Light', sans-serif",
                    color: '#CCCCCC',
                    fontSize: '1rem',
                    textTransform: 'none',
                    whiteSpace: 'nowrap', 
                    '&:hover': {
                        color: '#B8860B',
                        backgroundColor: 'transparent'
                    }
                }}
            >
                {link.text}
            </Button>
        ))}
        <LanguageSwitcher />
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
    </Box>
  );

  return (
    <>
      <AppBar 
        position="fixed" 
        sx={{ 
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          boxShadow: 'none',
          borderBottom: '1px solid #B8860B',
          backdropFilter: 'blur(10px)'
        }}
      >
        <Toolbar sx={{ padding: { xs: '0 1em', md: '0 2em' } }}>
          <Typography 
            variant="h1" 
            component={Link} 
            to="/" 
            sx={{
              flexGrow: 1,
              fontFamily: "'Cinzel Light', 'Cormorant SC', serif",
              fontSize: { xs: '1.2rem', md: '1.5rem' },
              color: '#FFFFFF',
              textDecoration: 'none',
              textTransform: 'uppercase',
              letterSpacing: '0.3em'
            }}
          >
            Ashes of the Souls
          </Typography>
          
          {isMobile ? (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            desktopNav
          )}
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          variant="temporary"
          anchor="right"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240, backgroundColor: 'rgba(0,0,0,0.9)' },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </>
  );
}

export default Navbar;
