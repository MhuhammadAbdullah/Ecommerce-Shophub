import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ShoppingCart, 
  Star, 
  Truck, 
  Shield, 
  RefreshCw, 
  MinusCircle, 
  PlusCircle,
  ChevronDown,
  ChevronUp,
  Heart
} from 'lucide-react';
import { getProductById, getProductsByCategory } from '../data/products';
import Button from '../components/ui/Button';
import ProductCard from '../components/ui/ProductCard';
import { useCart } from '../context/CartContext';

const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [expandedSection, setExpandedSection] = useState<string | null>('description');
  const { addToCart } = useCart();
  
  const product = productId ? getProductById(parseInt(productId)) : null;
  
  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Product Not Found</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">The product you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate('/products')}>
          Back to Products
        </Button>
      </div>
    );
  }
  
  const relatedProducts = getProductsByCategory(product.category)
    .filter(p => p.id !== product.id)
    .slice(0, 4);
  
  const handleQuantityChange = (value: number) => {
    setQuantity(Math.max(1, Math.min(product.stock, value)));
  };
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
  };
  
  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        <ol className="flex items-center space-x-2">
          <li><a href="/" className="hover:text-primary-600 dark:hover:text-primary-400">Home</a></li>
          <li>/</li>
          <li><a href="/products" className="hover:text-primary-600 dark:hover:text-primary-400">Products</a></li>
          <li>/</li>
          <li className="text-gray-700 dark:text-gray-300 truncate">{product.name}</li>
        </ol>
      </nav>
      
      {/* Product Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {/* Product Image */}
        <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover aspect-square"
          />
        </div>
        
        {/* Product Info */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">{product.name}</h1>
          
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-5 w-5 ${
                    i < Math.floor(product.rating) 
                      ? 'text-yellow-400 fill-current' 
                      : 'text-gray-300 dark:text-gray-600'
                  }`} 
                />
              ))}
            </div>
            <span className="ml-2 text-gray-600 dark:text-gray-400">{product.rating} rating</span>
          </div>
          
          <p className="text-3xl font-bold text-gray-900 dark:text-white mb-6">${product.price.toFixed(2)}</p>
          
          <p className="text-gray-700 dark:text-gray-300 mb-6">{product.description}</p>
          
          <div className="mb-6">
            <p className="flex items-center text-sm mb-2">
              <span className={`font-medium mr-2 ${
                product.stock > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
              }`}>
                {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
              </span>
              {product.stock > 0 && <span className="text-gray-600 dark:text-gray-400">({product.stock} available)</span>}
            </p>
            
            <div className="flex items-center mb-6">
              <button
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
                className="p-2 text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 disabled:text-gray-300 dark:disabled:text-gray-600 disabled:cursor-not-allowed"
                aria-label="Decrease quantity"
              >
                <MinusCircle className="h-5 w-5" />
              </button>
              <input
                type="number"
                min="1"
                max={product.stock}
                value={quantity}
                onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                className="w-16 py-1 px-2 text-center border border-gray-300 dark:border-gray-700 rounded mx-2 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white"
              />
              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={quantity >= product.stock}
                className="p-2 text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 disabled:text-gray-300 dark:disabled:text-gray-600 disabled:cursor-not-allowed"
                aria-label="Increase quantity"
              >
                <PlusCircle className="h-5 w-5" />
              </button>
            </div>
            
            <div className="flex space-x-4">
              <Button 
                onClick={handleAddToCart} 
                variant="primary"
                size="lg"
                className="flex-1"
                disabled={product.stock === 0}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="p-0 w-12 flex items-center justify-center"
              >
                <Heart className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              </Button>
            </div>
          </div>
          
          {/* Product Features/Benefits (Mobile Accordion, Desktop Tabs) */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6 md:hidden">
            {/* Mobile Accordion */}
            <div className="space-y-4">
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleSection('description')}
                  className="flex items-center justify-between w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 text-left font-medium"
                >
                  <span>Description</span>
                  {expandedSection === 'description' ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </button>
                {expandedSection === 'description' && (
                  <div className="p-4 bg-white dark:bg-gray-800">
                    <p className="text-gray-700 dark:text-gray-300">{product.description}</p>
                  </div>
                )}
              </div>
              
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleSection('shipping')}
                  className="flex items-center justify-between w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 text-left font-medium"
                >
                  <span>Shipping & Returns</span>
                  {expandedSection === 'shipping' ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </button>
                {expandedSection === 'shipping' && (
                  <div className="p-4 bg-white dark:bg-gray-800">
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                      <li className="flex items-start">
                        <Truck className="h-5 w-5 mr-2 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-0.5" />
                        <span>Free shipping on orders over $50</span>
                      </li>
                      <li className="flex items-start">
                        <RefreshCw className="h-5 w-5 mr-2 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-0.5" />
                        <span>30-day hassle-free returns</span>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
              
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleSection('warranty')}
                  className="flex items-center justify-between w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 text-left font-medium"
                >
                  <span>Warranty</span>
                  {expandedSection === 'warranty' ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </button>
                {expandedSection === 'warranty' && (
                  <div className="p-4 bg-white dark:bg-gray-800">
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                      <li className="flex items-start">
                        <Shield className="h-5 w-5 mr-2 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-0.5" />
                        <span>1-year warranty included</span>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Desktop Tabs */}
          <div className="hidden md:block border-t border-gray-200 dark:border-gray-700 pt-6">
            <div className="flex border-b border-gray-200 dark:border-gray-700">
              <button
                className={`py-2 px-4 font-medium ${
                  activeTab === 'description'
                    ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-600 dark:border-primary-400'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
                onClick={() => setActiveTab('description')}
              >
                Description
              </button>
              <button
                className={`py-2 px-4 font-medium ${
                  activeTab === 'shipping'
                    ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-600 dark:border-primary-400'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
                onClick={() => setActiveTab('shipping')}
              >
                Shipping & Returns
              </button>
              <button
                className={`py-2 px-4 font-medium ${
                  activeTab === 'warranty'
                    ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-600 dark:border-primary-400'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
                onClick={() => setActiveTab('warranty')}
              >
                Warranty
              </button>
            </div>
            
            <div className="py-4">
              {activeTab === 'description' && (
                <p className="text-gray-700 dark:text-gray-300">{product.description}</p>
              )}
              
              {activeTab === 'shipping' && (
                <ul className="space-y-4 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start">
                    <Truck className="h-5 w-5 mr-3 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">Free Shipping</h4>
                      <p>Free standard shipping on orders over $50. Expedited and international shipping options available at checkout.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <RefreshCw className="h-5 w-5 mr-3 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">Easy Returns</h4>
                      <p>Not satisfied with your purchase? Return it within 30 days for a full refund. See our return policy for details.</p>
                    </div>
                  </li>
                </ul>
              )}
              
              {activeTab === 'warranty' && (
                <ul className="space-y-4 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start">
                    <Shield className="h-5 w-5 mr-3 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">1-Year Warranty</h4>
                      <p>This product includes a 1-year manufacturer's warranty against defects in materials and workmanship. Extended warranty options available at checkout.</p>
                    </div>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(relatedProduct => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;