import React, { useState } from 'react';
import {
  AppBar,
  Badge,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LanguageSwitcher from './LanguageSwitcher';
import useCartStore from '../store/cartStore';

const Header = () => {
  const { t } = useTranslation();
  const totalItems = useCartStore((state) => state.totalItems);
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const navLinks = [
    { label: t('header.home'), to: '/' },
    { label: t('header.shop'), to: '/shop' },
    { label: t('header.portfolio'), to: '/portfolio' },
    { label: t('header.about'), to: '/about' },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen((open) => !open);
  };

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{
        width: 280,
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.96)',
        color: '#f5f5f5',
        borderLeft: '1px solid #B8860B',
      }}
    >
      <Typography
        variant="h6"
        sx={{
          px: 3,
          py: 3,
          fontFamily: 'Cinzel, serif',
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
        }}
      >
        Ashes of the Souls
      </Typography>
      <List>
        {navLinks.map((link) => (
          <ListItem key={link.to} disablePadding>
            <ListItemButton component={Link} to={link.to} sx={{ px: 3, py: 1.4 }}>
              <ListItemText
                primary={link.label}
                primaryTypographyProps={{
                  fontFamily: 'Cinzel, serif',
                  letterSpacing: '0.08em',
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/cart" sx={{ px: 3, py: 1.4 }}>
            <Badge badgeContent={totalItems} color="error" sx={{ mr: 2 }}>
              <ShoppingCartIcon />
            </Badge>
            <ListItemText
              primary={t('cart.title', 'Carrito')}
              primaryTypographyProps={{ fontFamily: 'Cinzel, serif', letterSpacing: '0.08em' }}
            />
          </ListItemButton>
        </ListItem>
        <ListItem sx={{ px: 3, py: 2 }}>
          <LanguageSwitcher />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: 'rgba(0, 0, 0, 0.86)',
          boxShadow: 'none',
          borderBottom: '1px solid #B8860B',
          backdropFilter: 'blur(10px)',
        }}
      >
        <Toolbar sx={{ minHeight: { xs: 56, md: 64 }, px: { xs: 1.5, sm: 2, md: 3 } }}>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              flexGrow: 1,
              minWidth: 0,
              mr: 1,
              color: 'inherit',
              textDecoration: 'none',
              fontFamily: 'Cinzel, serif',
              textTransform: 'uppercase',
              letterSpacing: { xs: '0.08em', sm: '0.14em' },
              fontSize: { xs: '0.92rem', sm: '1.05rem', md: '1.25rem' },
              lineHeight: 1.2,
            }}
          >
            Ashes of the Souls
          </Typography>

          {isMobile ? (
            <IconButton color="inherit" aria-label="abrir menu" edge="end" onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              {navLinks.map((link) => (
                <Button
                  key={link.to}
                  color="inherit"
                  component={Link}
                  to={link.to}
                  sx={{
                    fontFamily: 'Cinzel, serif',
                    textTransform: 'none',
                    whiteSpace: 'nowrap',
                    minWidth: 0,
                    px: 1.25,
                  }}
                >
                  {link.label}
                </Button>
              ))}
              <IconButton color="inherit" component={Link} to="/cart">
                <Badge badgeContent={totalItems} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
              <LanguageSwitcher />
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Header;
