
import React from 'react';

const ProductCard = ({ product, onViewDetails }) => {
  // Find the first image in the media array to display on the card.
  const mainImage = product.media && product.media.find(m => m.type === 'image');

  // Fallback if no image is found, although every product should have one.
  const imageUrl = mainImage ? mainImage.src : '/path/to/default-image.jpg';

  return (
    <div className="product-card" onClick={onViewDetails}>
      <div className="product-image-container">
        <img src={imageUrl} alt={product.name} className="product-image" />
      </div>
      <div className="product-info">
        <p className="product-price">${product.price.toFixed(2)}</p>
        <h3 className="product-name">{product.name}</h3>
        {/* The description is no longer shown on the card to keep it clean */}
      </div>
    </div>
  );
};

export default ProductCard;
