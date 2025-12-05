import React, { useState, useMemo } from 'react';
import {
  Container,
  Typography,
  ImageList,
  useMediaQuery,
  useTheme,
  Button,
  Box
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import Image from '../components/Image'; // Import the Image component

// New data source for the portfolio gallery, sorted numerically
const portfolioImages = [
  { img: '/imagenes/portafolio/página_1.jpg', id: 'portfolio-1' },
  { img: '/imagenes/portafolio/página_2.jpg', id: 'portfolio-2' },
  { img: '/imagenes/portafolio/página_3.jpg', id: 'portfolio-3' },
  { img: '/imagenes/portafolio/página_4.jpg', id: 'portfolio-4' },
  { img: '/imagenes/portafolio/página_5.jpg', id: 'portfolio-5' },
  { img: '/imagenes/portafolio/página_6.jpg', id: 'portfolio-6' },
  { img: '/imagenes/portafolio/página_7.jpg', id: 'portfolio-7' },
  { img: '/imagenes/portafolio/página_8.jpg', id: 'portfolio-8' },
  { img: '/imagenes/portafolio/página_9.jpg', id: 'portfolio-9' },
  { img: '/imagenes/portafolio/página_10.jpg', id: 'portfolio-10' },
  { img: '/imagenes/portafolio/página_11.jpg', id: 'portfolio-11' },
  { img: '/imagenes/portafolio/página_12.jpg', id: 'portfolio-12' },
  { img: '/imagenes/portafolio/página_13.jpg', id: 'portfolio-13' },
  { img: '/imagenes/portafolio/página_14.jpg', id: 'portfolio-14' },
  { img: '/imagenes/portafolio/página_15.jpg', id: 'portfolio-15' },
  { img: '/imagenes/portafolio/página_16.jpg', id: 'portfolio-16' },
  { img: '/imagenes/portafolio/página_17.jpg', id: 'portfolio-17' },
  { img: '/imagenes/portafolio/página_18.jpg', id: 'portfolio-18' },
  { img: '/imagenes/portafolio/página_19.jpg', id: 'portfolio-19' },
  { img: '/imagenes/portafolio/página_20.jpg', id: 'portfolio-20' },
  { img: '/imagenes/portafolio/página_21.jpg', id: 'portfolio-21' },
  { img: '/imagenes/portafolio/página_22.jpg', id: 'portfolio-22' },
  { img: '/imagenes/portafolio/página_23.jpg', id: 'portfolio-23' },
  { img: '/imagenes/portafolio/página_24.jpg', id: 'portfolio-24' },
  { img: '/imagenes/portafolio/página_25.jpg', id: 'portfolio-25' },
  { img: '/imagenes/portafolio/página_26.jpg', id: 'portfolio-26' },
  { img: '/imagenes/portafolio/página_27.jpg', id: 'portfolio-27' },
  { img: '/imagenes/portafolio/página_28.jpg', id: 'portfolio-28' },
];

const INITIAL_VISIBLE_ITEMS = 9;
const ITEMS_TO_LOAD = 9;

function Portfolio() {
  const theme = useTheme();
  const { t } = useTranslation();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));

  const [visibleItems, setVisibleItems] = useState(INITIAL_VISIBLE_ITEMS);

  const getCols = () => {
    if (isSmallScreen) return 1;
    if (isMediumScreen) return 2;
    return 3;
  };

  const cols = getCols();

  const portfolioItems = useMemo(() => {
    return portfolioImages.map((item, index) => ({
      ...item,
      title: `${t('portfolio.design')} ${index + 1}`
    }));
  }, [t]);

  // Reorder images for masonry layout to fill row by row
  const orderedImages = useMemo(() => {
    const currentImages = portfolioItems.slice(0, visibleItems);
    if (cols === 1) {
      return currentImages;
    }
    
    const reordered = [];
    for (let i = 0; i < cols; i++) {
      for (let j = i; j < currentImages.length; j += cols) {
        reordered.push(currentImages[j]);
      }
    }
    return reordered;
  }, [visibleItems, cols, portfolioItems]);


  const handleLoadMore = () => {
    setVisibleItems(prevVisibleItems => prevVisibleItems + ITEMS_TO_LOAD);
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
        {t('portfolio.title')}
      </Typography>
      <ImageList variant="masonry" cols={cols} gap={16}>
        {orderedImages.map((item) => (
          <Image key={item.id} item={item} />
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
            {t('portfolio.loadMore')}
          </Button>
        </Box>
      )}
    </Container>
  );
}

export default Portfolio;
