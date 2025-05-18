import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Facebook, Twitter, Instagram, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 pt-12 pb-8 text-gray-700 dark:text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="mb-8 md:mb-0">
            <Link to="/" className="flex items-center">
              <ShoppingBag className="h-8 w-8 text-primary-600 dark:text-primary-400" />
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">ShopHub</span>
            </Link>
            <p className="mt-4">Your one-stop shop for high-quality products at affordable prices.</p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="hover:text-primary-600 dark:hover:text-primary-400">All Products</Link>
              </li>
              <li>
                <Link to="/products?category=electronics" className="hover:text-primary-600 dark:hover:text-primary-400">
                  Electronics
                </Link>
              </li>
              <li>
                <Link to="/products?category=furniture" className="hover:text-primary-600 dark:hover:text-primary-400">
                  Furniture
                </Link>
              </li>
              <li>
                <Link to="/products?category=kitchen" className="hover:text-primary-600 dark:hover:text-primary-400">
                  Kitchen
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-primary-600 dark:hover:text-primary-400">Contact Us</a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-600 dark:hover:text-primary-400">FAQs</a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-600 dark:hover:text-primary-400">Shipping & Returns</a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-600 dark:hover:text-primary-400">Track Order</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Subscribe</h3>
            <p className="mb-4">Subscribe to our newsletter for the latest products and offers.</p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="py-2 px-3 rounded-l-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white flex-grow"
              />
              <button type="submit" className="bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-r-lg transition-colors duration-300">
                <Mail size={20} />
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} ShopHub. All rights reserved.</p>
          <div className="mt-2 flex justify-center space-x-6">
            <a href="#" className="hover:text-primary-600 dark:hover:text-primary-400">Privacy Policy</a>
            <a href="#" className="hover:text-primary-600 dark:hover:text-primary-400">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;