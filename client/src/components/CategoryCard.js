import React from 'react';
import { ShoppingBag, Pill, ShoppingCart, Utensils, Truck } from 'lucide-react';

const CategoryCard = ({ category }) => {
  const icons = {
    Grocery: ShoppingBag,
    Pharmacy: Pill,
    Shop: ShoppingCart,
    Food: Utensils,
    Parcel: Truck,
  };
  const Icon = icons[category.key] || ShoppingBag;
  return (
    <div className="category-card">
      <div className="icon"><Icon size={24} /></div>
      <span className="label">{category.label}</span>
    </div>
  );
};

export default CategoryCard;