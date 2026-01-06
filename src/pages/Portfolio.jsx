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
import { useTranslation } from 'react-i18next';

const INITIAL_VISIBLE_ITEMS = 9;
const ITEMS_TO_LOAD = 9;

function Portfolio() {
  const theme = useTheme();
  const { t } = useTranslation();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));

  const portfolioImages = Array.from({ length: 28 }, (_, i) => ({
    src: `/imagenes/portafolio/página_${i + 1}.jpg`,
    title: `${t('portfolio.design')} ${i + 1}`,
    id: `portfolio-${i + 1}`,
    img: `/imagenes/portafolio/página_${i + 1}.jpg`
  }));

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
        {t('portfolio.title')}
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
            {t('portfolio.load_more')}
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
