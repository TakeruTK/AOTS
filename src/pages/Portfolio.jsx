
import React from 'react';
import {
  Container,
  Typography,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  useMediaQuery,
  useTheme
} from '@mui/material';

const itemData = [
    {
    img: 'https://images.unsplash.com/photo-1599330283569-03a89372147a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Anillo de Gárgola',
  },
  {
    img: 'https://images.unsplash.com/photo-1611645462295-2152a5c88746?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Anillo de Cráneo de Bronce',
  },
  {
    img: 'https://images.unsplash.com/photo-1588892888288-3964467385a4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Anillo de Cráneo de Plata',
  },
  {
    img: 'https://images.unsplash.com/photo-1598104134114-493396a5f795?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Anillo de Huesos Entrelazados',
  },
    {
    img: 'https://images.unsplash.com/photo-1620755995899-7313a7c64a85?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Colgante de Cuervo',
  },
  {
    img: 'https://images.unsplash.com/photo-1599330283569-03a89372147a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Anillo de Gárgola Gótica',
  },
  {
    img: 'https://images.unsplash.com/photo-1611645462295-2152a5c88746?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Anillo de Sello de Calavera',
  },
  {
    img: 'https://images.unsplash.com/photo-1619659618114-a9c1253b2796?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Estatua de Ángel Caído',
  },
];

function Portfolio() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));

  const getCols = () => {
    if (isSmallScreen) return 1;
    if (isMediumScreen) return 2;
    return 3;
  };

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
        Nuestro Legado
      </Typography>
      <ImageList variant="masonry" cols={getCols()} gap={16}>
        {itemData.map((item) => (
          <ImageListItem key={item.img} sx={{
            position: 'relative',
            overflow: 'hidden', // Hide the bar when it's outside
            '& .MuiImageListItemBar-root': {
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              transition: 'transform 0.35s ease-out, opacity 0.35s ease-out',
              opacity: 0,
              transform: 'translateY(100%)', // Initially hidden at the bottom
            },
            '&:hover .MuiImageListItemBar-root': {
              opacity: 1,
              transform: 'translateY(0)', // Slide in from the bottom
            },
            '& img': {
              transition: 'filter 0.3s ease-in-out, transform 0.3s ease-in-out',
            },
            '&:hover img': {
              filter: 'grayscale(20%) brightness(1)',
              transform: 'scale(1.05)',
            }
          }}>
            <img
              src={`${item.img}?w=248&fit=crop&auto=format`}
              srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={item.title}
              loading="lazy"
              style={{ filter: 'grayscale(80%) brightness(0.8)', borderRadius: '4px' }}
            />
            <ImageListItemBar
              title={item.title}
              sx={{
                fontFamily: "'Montserrat Light', 'Lato Light', sans-serif",
                textAlign: 'center',
                '& .MuiImageListItemBar-title': {
                  fontSize: '1.2rem',
                  letterSpacing: '0.1em',
                  textShadow: '0px 0px 8px rgba(184, 134, 11, 0.9)'
                },
              }}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Container>
  );
}

export default Portfolio;
