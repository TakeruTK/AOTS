
import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Grid, Box } from '@mui/material';

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
  overflow: 'hidden', // Keep the glow inside
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
  const sections = [
    {
      title: 'Joyería Siniestra',
      description: 'Anillos, collares y pendientes forjados en las llamas del inframundo.',
      link: '/jewelry',
      imageUrl: 'https://images.unsplash.com/photo-1600172454294-8c679a4c8a2b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      enabled: true,
    },
    {
      title: 'Ropa',
      description: 'Viste la oscuridad. Próximamente, camisetas, sudaderas y más.',
      link: '#',
      imageUrl: 'https://images.unsplash.com/photo-1512327428435-a7c55d6d1b17?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      enabled: false,
    },
    {
      title: 'Artefactos',
      description: 'Decora tu guarida con arte y objetos malditos.',
      link: '#',
      imageUrl: 'https://images.unsplash.com/photo-1563178229-37f95f206a30?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      enabled: false,
    },
  ];

  return (
    <Container sx={{ py: 4 }}>
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
            Tienda
        </Typography>
        <Grid container spacing={4}>
            {sections.map((section) => (
                <Grid item xs={12} md={4} key={section.title}>
                    <Box
                        component={section.enabled ? Link : 'div'}
                        to={section.link}
                        sx={{
                            ...sharedSectionBoxStyle,
                            backgroundImage: `url(${section.imageUrl})`,
                            cursor: section.enabled ? 'pointer' : 'default',
                            '& .overlay': {
                                backgroundColor: section.enabled ? 'rgba(0,0,0,0.6)' : 'rgba(0,0,0,0.9)',
                            },
                            '&:hover': {
                                transform: section.enabled ? 'translateY(-15px)' : 'none',
                                boxShadow: section.enabled ? `0 20px 40px rgba(0, 0, 0, 0.6), 0 0 30px 5px ${'#B8860B'}` : 'none',
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
                                variant="h3"
                                component="h2"
                                sx={{
                                    fontFamily: "'Cinzel Light', 'Cormorant SC', serif",
                                    fontSize: '2rem',
                                    letterSpacing: '0.1em',
                                    textTransform: 'uppercase',
                                    color: section.enabled ? '#FFFFFF' : '#444', // Darker text for disabled
                                    marginBottom: '1rem'
                                }}
                            >
                                {section.title}
                            </Typography>
                            <Typography 
                                sx={{ 
                                    fontFamily: "'Montserrat Light', 'Lato Light', sans-serif",
                                    color: section.enabled ? '#CCCCCC' : '#333', // Even darker for description
                                }}
                            >
                                {section.description}
                            </Typography>
                             {!section.enabled && (
                                <Typography sx={{fontFamily: "'Montserrat Light', 'Lato Light', sans-serif", color: '#B8860B', marginTop: '1rem', letterSpacing: '0.1em'}}>
                                    (Próximamente)
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
