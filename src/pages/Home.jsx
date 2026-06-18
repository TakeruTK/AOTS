
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { Typography, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Seo from '../components/Seo';
import useProducts from '../hooks/useProducts';

const Home = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { products } = useProducts();

    const handleProductClick = (productId) => {
        navigate(`/product/${productId}`);
    };

    const featuredProducts = products.slice(0, 4);

    return (
        <Box sx={{ px: { xs: 2, sm: 3, md: 4 }, py: { xs: 2, md: 4 }, width: '100%', overflow: 'hidden' }}>
            <Seo
                title={t('seo.home.title')}
                description={t('seo.home.description')}
                keywords={[
                    'gothic jewelry',
                    'handmade gothic jewelry',
                    'skull rings',
                    'silver skull ring',
                    'dark jewelry',
                    'occult jewelry',
                    'artisan rings',
                    'international jewelry shipping',
                    'joyería gótica',
                    'anillos de calavera',
                    'joyería artesanal',
                ]}
                jsonLd={{
                    '@context': 'https://schema.org',
                    '@type': 'JewelryStore',
                    name: 'Ashes of the Souls',
                    description: t('seo.home.description'),
                    url: import.meta.env.VITE_SITE_URL || window.location.origin,
                    areaServed: 'Worldwide',
                    currenciesAccepted: 'USD',
                    paymentAccepted: 'PayPal',
                    priceRange: '$$',
                    image: `${import.meta.env.VITE_SITE_URL || window.location.origin}/imagenes/productos/Decay-Skull-A.O.T.S/IMG_20230912_150851_012.jpg`,
                }}
            />
            {/* ... Hero Section ... */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '50vh',
                    backgroundImage: 'url(https://source.unsplash.com/random/1600x900?gothic,dark,castle)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    color: 'white',
                    textAlign: 'center',
                    marginBottom: { xs: '2.5rem', md: '4rem' },
                    px: { xs: 2, sm: 3 },
                    py: { xs: 5, md: 6 }
                }}
            >
                <Typography
                    variant="h1"
                    component="h1"
                    gutterBottom
                    sx={{
                        fontFamily: "'Cinzel Light', 'Cormorant SC', serif",
                        textTransform: 'uppercase',
                        letterSpacing: { xs: '0.12em', sm: '0.22em', md: '0.35em' },
                        fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                        color: '#FFFFFF'
                    }}
                >
                    Ashes of the Souls
                </Typography>
                <Typography
                    className="subtitle"
                    sx={{
                        fontFamily: "'Playfair Display', 'Cormorant Italic', serif",
                        fontStyle: 'italic',
                        color: '#E0E0E0',
                        fontSize: { xs: '1.2rem', md: '1.5rem' }
                    }}
                >
                    {t('subtitle')}
                </Typography>
            </Box>

            <Typography
                variant="h2"
                component="h2"
                gutterBottom
                align="center"
                sx={{
                    fontFamily: "'Cinzel Light', 'Cormorant SC', serif",
                    textTransform: 'uppercase',
                    letterSpacing: { xs: '0.1em', sm: '0.16em', md: '0.2em' },
                    fontSize: { xs: '1.45rem', sm: '1.75rem', md: '2rem' },
                    marginBottom: { xs: '2rem', md: '3rem' },
                    color: '#FFFFFF'
                }}
            >
                {t('featured_products')}
            </Typography>

            <div className="product-grid">
                {featuredProducts.map((product) => (
                    <div className="product-grid-item" key={product.id}>
                        <ProductCard
                            product={product}
                            onViewDetails={() => handleProductClick(product.id)}
                        />
                    </div>
                ))}
            </div>
        </Box>
    );
};

export default Home;
