
import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Badge } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LanguageSwitcher from './LanguageSwitcher';
import useCartStore from '../store/cartStore';

const Header = () => {
  const { t } = useTranslation();
  // We now get the total number of items directly from our zustand store
  const totalItems = useCartStore((state) => state.totalItems);

  return (
    <AppBar position="fixed" sx={{ 
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      boxShadow: 'none', 
      borderBottom: '1px solid #B8860B',
      backdropFilter: 'blur(10px)'
    }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontFamily: 'Cinzel, serif', textTransform: 'uppercase' }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            Ashes of the Souls
          </Link>
        </Typography>
        <Button color="inherit" component={Link} to="/" sx={{ fontFamily: 'Cinzel, serif' }}>{t('header.home')}</Button>
        <Button color="inherit" component={Link} to="/shop" sx={{ fontFamily: 'Cinzel, serif' }}>{t('header.shop')}</Button>
        <Button color="inherit" component={Link} to="/portfolio" sx={{ fontFamily: 'Cinzel, serif' }}>{t('header.portfolio')}</Button>
        <Button color="inherit" component={Link} to="/about" sx={{ fontFamily: 'Cinzel, serif' }}>{t('header.about')}</Button>
        
        {/* The Cart icon now links to the /cart page and displays the total number of items */}
        <IconButton color="inherit" component={Link} to="/cart">
          <Badge badgeContent={totalItems} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>

        <LanguageSwitcher />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
