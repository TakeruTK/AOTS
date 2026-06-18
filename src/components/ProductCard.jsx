
import React from 'react';
import { IconButton } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import useCartStore from '../store/cartStore';
import { useTranslation } from 'react-i18next';
import { getAvailableMaterials } from '../utils/productOptions';
import { formatUsdPrice, getProductPrice, hasProductOffer } from '../utils/pricing';

const ProductCard = ({ product, onViewDetails }) => {
  const { t } = useTranslation();
  const { addToCart } = useCartStore();
  const mainImage = product.media && product.media.find(m => m.type === 'image');
  const imageUrl = mainImage ? mainImage.src : '/path/to/default-image.jpg';
  const productPrice = getProductPrice(product);
  const productHasOffer = hasProductOffer(product);
  const defaultMaterial = getAvailableMaterials(product)[0] || { value: 'product.material.silver', labelKey: 'product.material.silver' };

  // This handler adds the product to the cart and stops the event from bubbling up
  // to the parent container, which would trigger `onViewDetails`.
  const handleAddToCart = (e) => {
    e.stopPropagation();
    
    // We create a slimmed-down product object for the cart
    const productToAdd = {
        id: `${product.id}-${defaultMaterial.value}-18mm-product.finish.polished`,
        name: product.name,
        price: productPrice,
        regularPrice: product.price,
        image: imageUrl,
        material: t(defaultMaterial.labelKey),
        materialKey: defaultMaterial.value,
        size: '18mm',
        finish: t('product.finish.polished'),
    };
    addToCart(productToAdd);
  };

  return (
    <div className="product-card" onClick={onViewDetails}>
      <div className="product-image-container">
        <img src={imageUrl} alt={product.name} className="product-image" />
        {
          // This IconButton is positioned absolutely within the image container.
          // It is made visible on hover via CSS in `App.css`.
        }
        <IconButton
            aria-label="add to cart"
            onClick={handleAddToCart}
            className="add-to-cart-btn" // Used for CSS hover effect
            sx={{
              position: 'absolute',
              bottom: 12,
              right: 12,
              color: '#121212', // Dark icon color
              backgroundColor: 'rgba(184, 134, 11, 0.85)', // Semi-transparent gold
              transition: 'opacity 0.3s ease, transform 0.2s ease',
              opacity: 0, // Hidden by default
              '&:hover': {
                backgroundColor: '#B8860B', // Solid gold on hover
                transform: 'scale(1.1)',
              },
            }}
          >
            <AddShoppingCartIcon />
          </IconButton>
      </div>
      <div className="product-info">
        <div className="product-price-row">
          {productHasOffer && <span className="product-price-old">{formatUsdPrice(product.price)}</span>}
          <p className="product-price">{formatUsdPrice(productPrice)}</p>
          {productHasOffer && <span className="product-offer-badge">OFERTA</span>}
        </div>
        <h3 className="product-name">{product.name}</h3>
      </div>
    </div>
  );
};

export default ProductCard;
