import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Box } from '@mui/material';
import { useTranslation } from 'react-i18next'; // Import useTranslation
import Seo from '../components/Seo';

const sharedSectionBoxStyle = {
  position: 'relative',
  minHeight: 'clamp(260px, 48vw, 400px)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  color: 'white',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  padding: 'clamp(1.25rem, 4vw, 2rem)',
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
    <Container sx={{ pt: { xs: 10, md: 15 }, pb: 4, overflow: 'hidden' }}>
      <Seo
        title={t('seo.shop.title')}
        description={t('seo.shop.description')}
        keywords={[
          'shop gothic jewelry',
          'buy handmade rings',
          'skull rings online',
          'silver gothic jewelry',
          'bronze jewelry',
          'dark accessories',
          'international gothic jewelry',
          'comprar joyería gótica',
          'anillos artesanales',
        ]}
      />
      <Typography
        variant="h2"
        component="h1"
        gutterBottom
        align="center"
        sx={{
          fontFamily: "'Cinzel Light', 'Cormorant SC', serif",
          textTransform: 'uppercase',
          letterSpacing: { xs: '0.1em', sm: '0.16em', md: '0.2em' },
          fontSize: { xs: '1.7rem', sm: '2rem' },
          marginBottom: { xs: '2rem', md: '3rem' },
          color: '#FFFFFF'
        }}
      >
        {t('shop.title')} 
      </Typography>

      <Box sx={{ display: 'grid', justifyContent: 'center' }}>
        <Box sx={{ width: 'min(100%, 760px)' }} key={mainSection.title}>
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
                  fontSize: { xs: '1.45rem', sm: '1.75rem', md: '2rem' },
                  letterSpacing: { xs: '0.06em', sm: '0.1em' },
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
        </Box>
      </Box>

      {/* Other Sections */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' },
          gap: { xs: 3, md: 4 },
          mt: 4,
        }}
      >
        {otherSections.map((section) => (
          <Box key={section.title}>
            <Box
              component={section.enabled ? Link : 'div'}
              to={section.link}
              sx={{
                ...sharedSectionBoxStyle,
                backgroundImage: `url(${section.imageUrl})`,
                minHeight: { xs: '240px', md: '300px' },
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
                    fontSize: { xs: '1.3rem', sm: '1.55rem', md: '1.8rem' },
                    letterSpacing: { xs: '0.06em', sm: '0.1em' },
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
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default Shop;
