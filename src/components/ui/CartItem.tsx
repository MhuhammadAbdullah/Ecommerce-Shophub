import React from 'react';
import { MinusCircle, PlusCircle, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '../../types';
import { useCart } from '../../context/CartContext';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity } = item;

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center py-4 border-b border-gray-200 dark:border-gray-700 animate-fade-in">
      <div className="flex-shrink-0 w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-grow sm:ml-6 mt-2 sm:mt-0">
        <h3 className="text-base font-medium text-gray-900 dark:text-white">{product.name}</h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-1">{product.description}</p>
        <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white">${product.price.toFixed(2)}</p>
      </div>

      <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto mt-4 sm:mt-0">
        <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-md">
          <button
            onClick={() => updateQuantity(product.id, quantity - 1)}
            className="p-2 text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="Decrease quantity"
          >
            <MinusCircle className="h-5 w-5" />
          </button>
          <span className="px-3 py-1 text-gray-700 dark:text-gray-300">{quantity}</span>
          <button
            onClick={() => updateQuantity(product.id, quantity + 1)}
            className="p-2 text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="Increase quantity"
          >
            <PlusCircle className="h-5 w-5" />
          </button>
        </div>

        <div className="flex items-center ml-6">
          <span className="text-base font-medium text-gray-900 dark:text-white">
            ${(product.price * quantity).toFixed(2)}
          </span>
          <button
            onClick={() => removeFromCart(product.id)}
            className="ml-4 p-1 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400"
            aria-label="Remove item"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;