import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowLeft, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import CartItem from '../components/ui/CartItem';
import Button from '../components/ui/Button';

const CartPage: React.FC = () => {
  const { items, getTotalPrice, clearCart } = useCart();
  
  // Calculate shipping cost
  const calculateShipping = () => {
    const subtotal = getTotalPrice();
    return subtotal >= 50 ? 0 : 4.99;
  };
  
  // Calculate tax (assume 7%)
  const calculateTax = () => {
    return getTotalPrice() * 0.07;
  };
  
  const shippingCost = calculateShipping();
  const tax = calculateTax();
  const total = getTotalPrice() + shippingCost + tax;
  
  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Your Cart</h1>
        
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 text-center">
          <ShoppingCart className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Your cart is empty</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Looks like you haven't added any products to your cart yet.</p>
          <Link to="/products">
            <Button>
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8">Your Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Items ({items.reduce((total, item) => total + item.quantity, 0)})
              </h2>
              <button 
                onClick={clearCart}
                className="text-sm text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
              >
                Clear Cart
              </button>
            </div>
            
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {items.map((item) => (
                <CartItem key={item.product.id} item={item} />
              ))}
            </div>
            
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <Link 
                to="/products" 
                className="flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
        
        <div>
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 sticky top-20">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Subtotal</span>
                <span>${getTotalPrice().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Shipping</span>
                <span>
                  {shippingCost === 0 ? (
                    <span className="text-green-600 dark:text-green-400">Free</span>
                  ) : (
                    `$${shippingCost.toFixed(2)}`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Tax (7%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-3 mt-3">
                <div className="flex justify-between font-semibold text-lg text-gray-900 dark:text-white">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            <Link to="/checkout">
              <Button variant="primary" fullWidth className="flex items-center justify-center">
                <ShoppingBag className="h-5 w-5 mr-2" />
                Proceed to Checkout
              </Button>
            </Link>
            
            <div className="mt-6 text-sm text-gray-600 dark:text-gray-400">
              <p className="mb-2">We accept:</p>
              <div className="flex space-x-2">
                <div className="w-12 h-8 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
                <div className="w-12 h-8 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
                <div className="w-12 h-8 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
                <div className="w-12 h-8 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;