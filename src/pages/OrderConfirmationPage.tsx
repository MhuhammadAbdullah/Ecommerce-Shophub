import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { CheckCircle, ShoppingBag, ChevronRight } from 'lucide-react';
import Button from '../components/ui/Button';

const OrderConfirmationPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const date = new Date();
  
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      <div className="text-center mb-10">
        <CheckCircle className="h-16 w-16 text-green-600 dark:text-green-500 mx-auto mb-4" />
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">Order Confirmed!</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Thank you for your purchase. Your order has been received and is being processed.
        </p>
      </div>
      
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden mb-8">
        <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Order Details</h2>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Order Number</h3>
              <p className="text-base font-semibold text-gray-900 dark:text-white">{orderId}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Order Date</h3>
              <p className="text-base font-semibold text-gray-900 dark:text-white">
                {date.toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Payment Method</h3>
              <p className="text-base font-semibold text-gray-900 dark:text-white">Credit Card</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Shipping Method</h3>
              <p className="text-base font-semibold text-gray-900 dark:text-white">Standard Shipping</p>
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Expected Delivery</h3>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <p className="text-base font-semibold text-gray-900 dark:text-white">
                {new Date(date.getTime() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Your order will be shipped within 1-2 business days.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden mb-8">
        <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">What's Next?</h2>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex">
              <div className="flex-shrink-0 h-8 w-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                <span className="text-primary-600 dark:text-primary-400 font-semibold">1</span>
              </div>
              <div className="ml-4">
                <h3 className="text-base font-medium text-gray-900 dark:text-white">Order Confirmation</h3>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  You'll receive an email confirmation with your order details.
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0 h-8 w-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                <span className="text-primary-600 dark:text-primary-400 font-semibold">2</span>
              </div>
              <div className="ml-4">
                <h3 className="text-base font-medium text-gray-900 dark:text-white">Processing Order</h3>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  We'll prepare your items and notify you when they ship.
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0 h-8 w-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                <span className="text-primary-600 dark:text-primary-400 font-semibold">3</span>
              </div>
              <div className="ml-4">
                <h3 className="text-base font-medium text-gray-900 dark:text-white">Shipping</h3>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  You'll receive tracking information by email once your order ships.
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0 h-8 w-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                <span className="text-primary-600 dark:text-primary-400 font-semibold">4</span>
              </div>
              <div className="ml-4">
                <h3 className="text-base font-medium text-gray-900 dark:text-white">Delivery</h3>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  Enjoy your new items! Don't forget to leave a review.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Link to="/">
          <Button variant="primary">
            <ShoppingBag className="h-5 w-5 mr-2" />
            Continue Shopping
          </Button>
        </Link>
        <Link to="/profile">
          <Button variant="outline">
            View Order History
            <ChevronRight className="h-5 w-5 ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;