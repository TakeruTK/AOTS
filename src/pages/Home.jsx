
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { Typography, Box } from '@mui/material';
import { products } from '../data/products'; // Import real product data
import { useTranslation } from 'react-i18next';

const Home = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleProductClick = (productId) => {
        navigate(`/product/${productId}`);
    };

    // Select a few featured products to display on the home page
    const featuredProducts = products.slice(0, 4);

    return (
        <Box sx={{ padding: { xs: '1rem', md: '2rem' }, width: '100%' }}>
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
                    marginBottom: '4rem',
                    padding: '2rem'
                }}
            >
                <Typography
                    variant="h1"
                    component="h1"
                    gutterBottom
                    sx={{
                        fontFamily: "'Cinzel Light', 'Cormorant SC', serif",
                        textTransform: 'uppercase',
                        letterSpacing: '0.35em',
                        fontSize: { xs: '2rem', md: '3rem' },
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
                    letterSpacing: '0.2em',
                    marginBottom: '3rem',
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
