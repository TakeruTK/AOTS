import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Grid, Box } from '@mui/material';
import { useTranslation } from 'react-i18next'; // Import useTranslation

const sharedSectionBoxStyle = {
  position: 'relative',
  height: '400px',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  color: 'white',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  padding: '2rem',
  textDecoration: 'none',
  border: '1px solid #222',
  overflow: 'hidden',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
};

const overlayStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  transition: 'background-color 0.4s ease',
};

const Shop = () => {
  const { t } = useTranslation(); // Initialize useTranslation

  const sections = [
    {
      title: t('shop.jewelry.title'), // Translate title
      description: t('shop.jewelry.description'), // Translate description
      link: '/jewelry',
      imageUrl: 'https://images.unsplash.com/photo-1600172454294-8c679a4c8a2b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      enabled: true,
    },
    {
      title: t('shop.clothing.title'),
      description: t('shop.clothing.description'),
      link: '#',
      imageUrl: 'https://images.unsplash.com/photo-1512327428435-a7c55d6d1b17?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      enabled: false,
    },
    {
      title: t('shop.artifacts.title'),
      description: t('shop.artifacts.description'),
      link: '#',
      imageUrl: 'https://images.unsplash.com/photo-1563178229-37f95f206a30?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      enabled: false,
    },
  ];

  const mainSection = sections[0];
  const otherSections = sections.slice(1);

  return (
    <Container sx={{ pt: { xs: 12, md: 15 }, pb: 4 }}>
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
        {t('shop.title')} 
      </Typography>

      {/* Main Section */}
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={8} key={mainSection.title}>
          <Box
            component={mainSection.enabled ? Link : 'div'}
            to={mainSection.link}
            sx={{
              ...sharedSectionBoxStyle,
              backgroundImage: `url(${mainSection.imageUrl})`,
              cursor: mainSection.enabled ? 'pointer' : 'default',
              '& .overlay': {
                backgroundColor: mainSection.enabled ? 'rgba(0,0,0,0.6)' : 'rgba(0,0,0,0.9)',
              },
              '&:hover': {
                transform: mainSection.enabled ? 'translateY(-15px)' : 'none',
                boxShadow: mainSection.enabled ? `0 20px 40px rgba(0, 0, 0, 0.6), 0 0 30px 5px ${mainSection.enabled ? '#B8860B' : 'none'}` : 'none',
              },
              '&:hover .overlay': {
                backgroundColor: mainSection.enabled ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.9)',
              },
              '&:hover .section-content': {
                transform: mainSection.enabled ? 'translateY(-10px)' : 'none',
              }
            }}
          >
            <div className="overlay" style={overlayStyle}></div>
            <Box className="section-content" sx={{ zIndex: 1, transition: 'transform 0.3s ease' }}>
              <Typography
                variant="h3"
                component="h2"
                sx={{
                  fontFamily: "'Cinzel Light', 'Cormorant SC', serif",
                  fontSize: '2rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: mainSection.enabled ? '#FFFFFF' : '#444',
                  marginBottom: '1rem'
                }}
              >
                {mainSection.title}
              </Typography>
              <Typography 
                  sx={{ 
                      fontFamily: "'Montserrat Light', 'Lato Light', sans-serif",
                      color: mainSection.enabled ? '#CCCCCC' : '#333',
                  }}
              >
                  {mainSection.description}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* Other Sections */}
      <Grid container spacing={4} sx={{ mt: 4 }}>
        {otherSections.map((section) => (
          <Grid item xs={12} md={6} key={section.title}>
            <Box
              component={section.enabled ? Link : 'div'}
              to={section.link}
              sx={{
                ...sharedSectionBoxStyle,
                backgroundImage: `url(${section.imageUrl})`,
                height: '300px', // Smaller height for secondary sections
                cursor: section.enabled ? 'pointer' : 'default',
                '& .overlay': {
                    backgroundColor: section.enabled ? 'rgba(0,0,0,0.6)' : 'rgba(0,0,0,0.9)',
                },
                '&:hover': {
                    transform: section.enabled ? 'translateY(-15px)' : 'none',
                    boxShadow: section.enabled ? `0 20px 40px rgba(0, 0, 0, 0.6), 0 0 30px 5px ${section.enabled ? '#B8860B' : 'none'}` : 'none',
                },
                '&:hover .overlay': {
                    backgroundColor: section.enabled ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.9)',
                },
                '&:hover .section-content': {
                    transform: section.enabled ? 'translateY(-10px)' : 'none',
                }
              }}
            >
              <div className="overlay" style={overlayStyle}></div>
              <Box className="section-content" sx={{ zIndex: 1, transition: 'transform 0.3s ease' }}>
                <Typography
                  variant="h4" // Smaller title for secondary sections
                  component="h2"
                  sx={{
                    fontFamily: "'Cinzel Light', 'Cormorant SC', serif",
                    fontSize: '1.8rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: section.enabled ? '#FFFFFF' : '#444',
                    marginBottom: '1rem'
                  }}
                >
                  {section.title}
                </Typography>
                <Typography 
                    sx={{ 
                        fontFamily: "'Montserrat Light', 'Lato Light', sans-serif",
                        color: section.enabled ? '#CCCCCC' : '#333',
                    }}
                >
                    {section.description}
                </Typography>
                {!section.enabled && (
                  <Typography sx={{fontFamily: "'Montserrat Light', 'Lato Light', sans-serif", color: '#B8860B', marginTop: '1rem', letterSpacing: '0.1em'}}>
                      {t('shop.coming_soon')}
                  </Typography>
              )}
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Shop;
