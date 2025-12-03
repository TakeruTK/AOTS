
import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

const AboutPage = () => {
  const { t } = useTranslation();

  return (
    <Box sx={{ backgroundColor: '#121212', color: 'white', minHeight: '100vh', py: 5 }}>
      <Container maxWidth="md">
        <Typography variant="h2" component="h1" gutterBottom align="center" sx={{ fontFamily: 'Cinzel, serif', fontWeight: 700 }}>
          {t('about.title')}
        </Typography>
        <Typography variant="body1" align="center" sx={{ fontFamily: 'Cinzel, serif', lineHeight: 1.8 }}>
          {t('about.description')}
        </Typography>
      </Container>
    </Box>
  );
};

export default AboutPage;
