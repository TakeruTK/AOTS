import React, { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Button,
  Container,
  ImageList,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { useTranslation } from 'react-i18next';
import Image from '../components/Image';
import Seo from '../components/Seo';
import { API_BASE_URL } from '../services/catalog';

const INITIAL_VISIBLE_ITEMS = 9;
const ITEMS_TO_LOAD = 9;

function Portfolio() {
  const theme = useTheme();
  const { t } = useTranslation();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));
  const fallbackPortfolioImages = useMemo(() => Array.from({ length: 28 }, (_, index) => ({
    src: `/imagenes/portafolio/página_${index + 1}.jpg`,
    title: `${t('portfolio.design')} ${index + 1}`,
    id: `portfolio-${index + 1}`,
    img: `/imagenes/portafolio/página_${index + 1}.jpg`,
  })), [t]);

  const [portfolioImages, setPortfolioImages] = useState(fallbackPortfolioImages);
  const [visibleItems, setVisibleItems] = useState(INITIAL_VISIBLE_ITEMS);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let isMounted = true;

    fetch(`${API_BASE_URL}/api/portfolio`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('No se pudo cargar el portafolio.');
        }
        return response.json();
      })
      .then((data) => {
        if (!isMounted || !Array.isArray(data.images)) {
          return;
        }

        setPortfolioImages(data.images.map((image, imageIndex) => ({
          id: image.id || `portfolio-${imageIndex + 1}`,
          title: image.title || `${t('portfolio.design')} ${imageIndex + 1}`,
          src: image.src,
          img: image.src,
        })));
      })
      .catch(() => {
        if (isMounted) {
          setPortfolioImages(fallbackPortfolioImages);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [fallbackPortfolioImages, t]);

  const cols = isSmallScreen ? 1 : isMediumScreen ? 2 : 3;
  const currentImages = portfolioImages.slice(0, visibleItems);

  const handleLoadMore = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + ITEMS_TO_LOAD);
  };

  const handleImageClick = (currentIndex) => {
    setIndex(currentIndex);
    setOpen(true);
  };

  return (
    <Container sx={{ pt: { xs: 10, md: 15 }, pb: 4, overflow: 'hidden' }}>
      <Seo
        title={t('seo.portfolio.title')}
        description={t('seo.portfolio.description')}
        keywords={[
          'custom gothic jewelry',
          'gothic jewelry portfolio',
          'custom skull rings',
          'handmade jewelry designs',
          'silver jewelry portfolio',
          'portafolio joyeria gotica',
          'joyeria personalizada',
        ]}
        image="/imagenes/portafolio/página_1.jpg"
      />
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
          color: '#FFFFFF',
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
        slides={currentImages.map((item) => ({ src: item.img }))}
        index={index}
      />
    </Container>
  );
}

export default Portfolio;
