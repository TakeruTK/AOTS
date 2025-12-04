
import React from 'react';
import { Container, Typography, Box, Grid } from '@mui/material';
import '../App.css'; // Import the CSS file

function About() {
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
          Nuestra Historia
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
                En el corazón de la oscuridad, donde la belleza y el misterio convergen, nació Ashes of the Souls. No somos meros joyeros; somos artesanos de lo arcano, forjadores de símbolos que susurran historias olvidadas. Cada pieza que creamos es un pacto con la sombra y la luz, un testamento a la dualidad que reside en el alma humana.
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
                Nuestros materiales son extraídos de las entrañas de la tierra y tratados con un respeto reverencial. La plata y el bronce se funden con la obsidiana y el ónix, creando no solo adornos, sino amuletos de poder. Creemos que la verdadera elegancia no grita, sino que acecha en las sombras, esperando ser descubierta por aquellos que se atreven a mirar más allá del velo.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
              <img 
                  src="https://images.unsplash.com/photo-1511393938983-9a135a969985?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                  alt="Mano del artesano" 
                  className="about-image"
              />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default About;
