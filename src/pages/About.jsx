import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import '../App.css'; // Import the CSS file
import { useTranslation } from 'react-i18next';
import Seo from '../components/Seo';

function About() {
  const { t } = useTranslation();

  return (
    <Box className="about-container">
      <Seo
        title={t('seo.about.title')}
        description={t('seo.about.description')}
        keywords={[
          'about gothic jewelry brand',
          'handmade jewelry artisan',
          'dark jewelry artist',
          'occult inspired jewelry',
          'artisan silver rings',
          'marca de joyería gótica',
          'joyería artesanal oscura',
        ]}
      />
      <div className="about-parallax-bg"></div>
      <Container sx={{ pt: { xs: 10, md: 15 }, pb: 4, color: '#CCCCCC', zIndex: 1, position: 'relative', overflow: 'hidden' }}>
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          align="center"
          sx={{
            fontFamily: "'Cinzel Light', 'Cormorant SC', serif",
            textTransform: 'uppercase',
            letterSpacing: { xs: '0.1em', sm: '0.16em', md: '0.2em' },
            fontSize: { xs: '1.65rem', sm: '2rem' },
            marginBottom: { xs: '2rem', md: '3rem' },
            color: '#FFFFFF'
          }}
        >
          {t('about.title')}
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' },
            gap: { xs: 3, md: 4 },
            alignItems: 'center',
          }}
        >
          <Box>
            <Box className="about-text-box">
              <Typography 
                variant="body1" 
                paragraph 
                sx={{ 
                  fontFamily: "'Montserrat Light', 'Lato Light', sans-serif", 
                  fontSize: { xs: '1rem', sm: '1.1rem' },
                  lineHeight: 1.8, // Slightly increased line height
                  textAlign: { xs: 'left', sm: 'justify' },
                }}
              >
                {t('about.p1')}
              </Typography>
              <Typography 
                variant="body1" 
                paragraph 
                sx={{ 
                  fontFamily: "'Montserrat Light', 'Lato Light', sans-serif", 
                  fontSize: { xs: '1rem', sm: '1.1rem' },
                  lineHeight: 1.8,
                  textAlign: { xs: 'left', sm: 'justify' },
                  marginBottom: 0 // Remove bottom margin from last paragraph
                }}
              >
                {t('about.p2')}
              </Typography>
            </Box>
          </Box>
          <Box>
              <img 
                  src="https://images.unsplash.com/photo-1511393938983-9a135a969985?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                  alt={t('about.image_alt')} 
                  className="about-image"
              />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default About;
