
import React from 'react';
import { Container, Typography, ImageList, ImageListItem } from '@mui/material';

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
  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h2" component="h1" gutterBottom align="center">
        Nuestro Legado
      </Typography>
      <ImageList variant="masonry" cols={3} gap={8}>
        {itemData.map((item) => (
          <ImageListItem key={item.img}>
            <img
              src={`${item.img}?w=248&fit=crop&auto=format`}
              srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={item.title}
              loading="lazy"
              style={{ filter: 'grayscale(80%) brightness(0.8)', borderRadius: '4px' }}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Container>
  );
}

export default Portfolio;
