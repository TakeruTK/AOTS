
import React from 'react';

// Removed useCartStore as it's not used directly here anymore

const ProductCard = ({ product, onViewDetails }) => {
    // The entire card is now clickable
    return (
        <div className="product-card" onClick={onViewDetails}>
            <div className="product-image-container">
                <img src={product.image} alt={product.name} className="product-image" />
            </div>
            <div className="product-info">
                <p className="product-price">${product.price}</p>
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>
            </div>
        </div>
    );
};

export default ProductCard;
