
import React from 'react';
import { Container, Typography, Box, Grid } from '@mui/material';

function About() {
  return (
    <Container sx={{ py: 4, color: '#CCCCCC' }}>
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
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={6}>
          <Box sx={{ 
            backgroundColor: 'rgba(10, 10, 10, 0.7)',
            padding: 3,
            border: '1px solid #222',
          }}>
            <Typography 
              variant="body1" 
              paragraph 
              sx={{ 
                fontFamily: "'Montserrat Light', 'Lato Light', sans-serif", 
                fontSize: '1.1rem',
                lineHeight: 1.7,
                textAlign: 'justify',
              }}
            >
              En el corazón de la oscuridad, donde la belleza y el misterio convergen, nació Art of the Stones. No somos meros joyeros; somos artesanos de lo arcano, forjadores de símbolos que susurran historias olvidadas. Cada pieza que creamos es un pacto con la sombra y la luz, un testamento a la dualidad que reside en el alma humana.
            </Typography>
            <Typography 
              variant="body1" 
              paragraph 
              sx={{ 
                fontFamily: "'Montserrat Light', 'Lato Light', sans-serif", 
                fontSize: '1.1rem',
                lineHeight: 1.7,
                textAlign: 'justify' 
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
                style={{ 
                    width: '100%', 
                    filter: 'grayscale(90%) brightness(0.7)',
                    border: '1px solid #222',
                }} 
            />
        </Grid>
      </Grid>
    </Container>
  );
}

export default About;
