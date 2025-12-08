
import React, { useState } from 'react';
import {
  Container,
  Typography,
  ImageList,
  useMediaQuery,
  useTheme,
  Button,
  Box
} from '@mui/material';
import Image from '../components/Image';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const portfolioImages = [
  { src: '/imagenes/portafolio/página_1.jpg', title: 'Diseño 1', id: 'portfolio-1' },
  { src: '/imagenes/portafolio/página_2.jpg', title: 'Diseño 2', id: 'portfolio-2' },
  { src: '/imagenes/portafolio/página_3.jpg', title: 'Diseño 3', id: 'portfolio-3' },
  { src: '/imagenes/portafolio/página_4.jpg', title: 'Diseño 4', id: 'portfolio-4' },
  { src: '/imagenes/portafolio/página_5.jpg', title: 'Diseño 5', id: 'portfolio-5' },
  { src: '/imagenes/portafolio/página_6.jpg', title: 'Diseño 6', id: 'portfolio-6' },
  { src: '/imagenes/portafolio/página_7.jpg', title: 'Diseño 7', id: 'portfolio-7' },
  { src: '/imagenes/portafolio/página_8.jpg', title: 'Diseño 8', id: 'portfolio-8' },
  { src: '/imagenes/portafolio/página_9.jpg', title: 'Diseño 9', id: 'portfolio-9' },
  { src: '/imagenes/portafolio/página_10.jpg', title: 'Diseño 10', id: 'portfolio-10' },
  { src: '/imagenes/portafolio/página_11.jpg', title: 'Diseño 11', id: 'portfolio-11' },
  { src: '/imagenes/portafolio/página_12.jpg', title: 'Diseño 12', id: 'portfolio-12' },
  { src: '/imagenes/portafolio/página_13.jpg', title: 'Diseño 13', id: 'portfolio-13' },
  { src: '/imagenes/portafolio/página_14.jpg', title: 'Diseño 14', id: 'portfolio-14' },
  { src: '/imagenes/portafolio/página_15.jpg', title: 'Diseño 15', id: 'portfolio-15' },
  { src: '/imagenes/portafolio/página_16.jpg', title: 'Diseño 16', id: 'portfolio-16' },
  { src: '/imagenes/portafolio/página_17.jpg', title: 'Diseño 17', id: 'portfolio-17' },
  { src: '/imagenes/portafolio/página_18.jpg', title: 'Diseño 18', id: 'portfolio-18' },
  { src: '/imagenes/portafolio/página_19.jpg', title: 'Diseño 19', id: 'portfolio-19' },
  { src: '/imagenes/portafolio/página_20.jpg', title: 'Diseño 20', id: 'portfolio-20' },
  { src: '/imagenes/portafolio/página_21.jpg', title: 'Diseño 21', id: 'portfolio-21' },
  { src: '/imagenes/portafolio/página_22.jpg', title: 'Diseño 22', id: 'portfolio-22' },
  { src: '/imagenes/portafolio/página_23.jpg', title: 'Diseño 23', id: 'portfolio-23' },
  { src: '/imagenes/portafolio/página_24.jpg', title: 'Diseño 24', id: 'portfolio-24' },
  { src: '/imagenes/portafolio/página_25.jpg', title: 'Diseño 25', id: 'portfolio-25' },
  { src: '/imagenes/portafolio/página_26.jpg', title: 'Diseño 26', id: 'portfolio-26' },
  { src: '/imagenes/portafolio/página_27.jpg', title: 'Diseño 27', id: 'portfolio-27' },
  { src: '/imagenes/portafolio/página_28.jpg', title: 'Diseño 28', id: 'portfolio-28' },
].map(item => ({ ...item, img: item.src }));

const INITIAL_VISIBLE_ITEMS = 9;
const ITEMS_TO_LOAD = 9;

function Portfolio() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));

  const [visibleItems, setVisibleItems] = useState(INITIAL_VISIBLE_ITEMS);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const getCols = () => {
    if (isSmallScreen) return 1;
    if (isMediumScreen) return 2;
    return 3;
  };

  const cols = getCols();

  const currentImages = portfolioImages.slice(0, visibleItems);

  const handleLoadMore = () => {
    setVisibleItems(prevVisibleItems => prevVisibleItems + ITEMS_TO_LOAD);
  };
  
  const handleImageClick = (currentIndex) => {
    setIndex(currentIndex);
    setOpen(true);
  };

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
        Nuestro Legado
      </Typography>
      <ImageList variant="standard" cols={cols} gap={16}>
        {currentImages.map((item, idx) => (
            <div key={item.id} onClick={() => handleImageClick(idx)} style={{ cursor: 'pointer' }}>
                <Image item={item} />
            </div>
        ))}
      </ImageList>
      {visibleItems < portfolioImages.length && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button
            variant="outlined"
            onClick={handleLoadMore}
            sx={{
              color: 'goldenrod',
              borderColor: 'goldenrod',
              '&:hover': {
                backgroundColor: 'rgba(218, 165, 32, 0.1)',
                borderColor: 'goldenrod',
              },
            }}
          >
            Cargar Más
          </Button>
        </Box>
      )}
       <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={currentImages.map(item => ({ src: item.img }))}
        index={index}
      />
    </Container>
  );
}

export default Portfolio;
