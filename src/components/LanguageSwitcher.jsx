
import React, { useState, useEffect } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  // Initialize state from localStorage or default to 'es'
  const [currentLang, setCurrentLang] = useState(localStorage.getItem('aots-lang') || 'es');

  // Effect to set language on initial load and sync with i18n
  useEffect(() => {
    const savedLang = localStorage.getItem('aots-lang') || 'es';
    if (i18n.language.split('-')[0] !== savedLang) {
      i18n.changeLanguage(savedLang);
    }
    setCurrentLang(savedLang);
  }, [i18n]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('aots-lang', lang); // Persist language
    setCurrentLang(lang);
    handleClose();
  };

  return (
    <div>
      <Button
        id="language-button"
        aria-controls={open ? 'language-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        variant="outlined"
        sx={{
          fontFamily: "'Montserrat Light', sans-serif",
          color: '#FFFFFF',
          borderColor: '#B8860B',
          minWidth: '40px',
          height: '40px',
          padding: '0 8px',
          textTransform: 'uppercase',
          '&:hover': {
            borderColor: '#B8860B',
            backgroundColor: 'rgba(184, 134, 11, 0.1)',
          },
        }}
      >
        {currentLang}
      </Button>
      <Menu
        id="language-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'language-button',
          disablePadding: true,
        }}
        sx={{
          '& .MuiPaper-root': {
            backgroundColor: 'rgba(18, 18, 18, 0.95)',
            border: '1px solid #B8860B',
            color: '#FFFFFF',
            backdropFilter: 'blur(5px)',
          },
        }}
      >
        <MenuItem 
          onClick={() => changeLanguage('es')} 
          sx={{ fontFamily: "'Montserrat Light', sans-serif", minWidth: '60px', justifyContent: 'center' }}
          selected={currentLang === 'es'}
        >
          ES
        </MenuItem>
        <MenuItem 
          onClick={() => changeLanguage('en')} 
          sx={{ fontFamily: "'Montserrat Light', sans-serif", justifyContent: 'center' }}
          selected={currentLang === 'en'}
        >
          EN
        </MenuItem>
      </Menu>
    </div>
  );
};

export default LanguageSwitcher;
