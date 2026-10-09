import React from 'react';
import { Star, Heart } from 'lucide-react';

const ProductCard = ({ product }) => {
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;
  return (
    <div className="card product-card">
      <div className="img-wrap">
        <img src={product.image} alt={product.name} loading="lazy" />
        {discount > 0 && <span className="discount-badge ribbon">{discount}% OFF</span>}
        <button className="fav-btn">
          <Heart size={16} color="#EF4444" fill="#EF4444" />
        </button>
      </div>
      <div className="info">
        <div className="name">{product.name}</div>
        <div className="store-name">{product.storeName || 'Yalla Store'}</div>
        <div className="rating">
          <Star size={12} fill="#F59E0B" /> {product.rating}
        </div>
        <span className="unit-badge">{product.unit || 'Kg'}</span>
        <div className="price-row">
          <span className="current-price">${product.price.toFixed(2)}</span>
          {product.originalPrice && <span className="original-price">${product.originalPrice.toFixed(2)}</span>}
        </div>
        <button className="add-cart-btn">+ Add</button>
      </div>
    </div>
  );
};

export default ProductCard;