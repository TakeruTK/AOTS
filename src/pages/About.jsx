import React from 'react';
import { Container, Typography, Box, Grid } from '@mui/material';
import '../App.css'; // Import the CSS file
import { useTranslation } from 'react-i18next';

function About() {
  const { t } = useTranslation();

  return (
    <Box className="about-container">
      <div className="about-parallax-bg"></div>
      <Container sx={{ pt: { xs: 12, md: 15 }, pb: 4, color: '#CCCCCC', zIndex: 1, position: 'relative' }}>
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
          {t('about.title')}
        </Typography>
        <Grid container spacing={4} alignItems="center" justifyContent="center">
          <Grid item xs={12} md={6}>
            <Box className="about-text-box">
              <Typography 
                variant="body1" 
                paragraph 
                sx={{ 
                  fontFamily: "'Montserrat Light', 'Lato Light', sans-serif", 
                  fontSize: '1.1rem',
                  lineHeight: 1.8, // Slightly increased line height
                  textAlign: 'justify',
                }}
              >
                {t('about.p1')}
              </Typography>
              <Typography 
                variant="body1" 
                paragraph 
                sx={{ 
                  fontFamily: "'Montserrat Light', 'Lato Light', sans-serif", 
                  fontSize: '1.1rem',
                  lineHeight: 1.8,
                  textAlign: 'justify',
                  marginBottom: 0 // Remove bottom margin from last paragraph
                }}
              >
                {t('about.p2')}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
              <img 
                  src="https://images.unsplash.com/photo-1511393938983-9a135a969985?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                  alt={t('about.image_alt')} 
                  className="about-image"
              />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default About;
