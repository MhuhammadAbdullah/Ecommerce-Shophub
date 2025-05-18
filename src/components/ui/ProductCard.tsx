import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { Product } from '../../types';
import Button from './Button';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, isInCart } = useCart();
  const isProductInCart = isInCart(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <Link 
      to={`/products/${product.id}`} 
      className="group bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative aspect-square overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <button 
          className="absolute top-3 right-3 p-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            // Wishlist functionality would go here
          }}
        >
          <Heart className="h-5 w-5 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400" />
        </button>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">{product.name}</h3>
        </div>
        
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating) 
                    ? 'text-yellow-400 fill-current' 
                    : 'text-gray-300 dark:text-gray-600'
                }`} 
              />
            ))}
          </div>
          <span className="ml-1 text-sm text-gray-600 dark:text-gray-400">({product.rating})</span>
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <span className="text-xl font-bold text-gray-900 dark:text-white">${product.price.toFixed(2)}</span>
          <Button
            size="sm"
            variant={isProductInCart ? "secondary" : "primary"}
            onClick={handleAddToCart}
            className="flex items-center"
          >
            <ShoppingCart className="h-4 w-4 mr-1" />
            {isProductInCart ? 'Added' : 'Add'}
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;