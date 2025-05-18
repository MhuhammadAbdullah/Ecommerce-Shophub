import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { 
  ShoppingBag, 
  Users, 
  DollarSign, 
  Package, 
  PlusCircle, 
  BarChart2, 
  Search,
  Trash2, 
  Edit,
  X,
  Check
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Product } from '../types';
import { products } from '../data/products';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const AdminPage: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [productList, setProductList] = useState<Product[]>(products);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-16rem)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }
  
  if (!isAuthenticated || !user?.isAdmin) {
    return <Navigate to="/" />;
  }
  
  // Filter products based on search term
  const filteredProducts = productList.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Sample stats for the dashboard
  const stats = [
    { name: 'Total Sales', value: '$12,457.35', icon: DollarSign, change: '+12.5%', isPositive: true },
    { name: 'Orders', value: '156', icon: Package, change: '+8.2%', isPositive: true },
    { name: 'Customers', value: '84', icon: Users, change: '+5.1%', isPositive: true },
    { name: 'Products', value: productList.length.toString(), icon: ShoppingBag, change: '+2.3%', isPositive: true }
  ];
  
  // Handle product edit/create
  const handleProductChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSelectedProduct(prev => {
      if (!prev) return null;
      return { ...prev, [name]: name === 'price' || name === 'stock' ? parseFloat(value) : value };
    });
  };
  
  const handleSaveProduct = () => {
    if (!selectedProduct) return;
    
    if (selectedProduct.id) {
      // Update existing product
      setProductList(prev => 
        prev.map(p => p.id === selectedProduct.id ? selectedProduct : p)
      );
    } else {
      // Create new product
      const newProduct = {
        ...selectedProduct,
        id: Math.max(...productList.map(p => p.id)) + 1,
        rating: 0,
      };
      setProductList(prev => [...prev, newProduct]);
    }
    
    setIsModalOpen(false);
    setSelectedProduct(null);
  };
  
  const handleDeleteProduct = (id: number) => {
    setProductList(prev => prev.filter(p => p.id !== id));
  };
  
  const openEditModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };
  
  const openCreateModal = () => {
    setSelectedProduct({
      id: 0, // Will be replaced when saving
      name: '',
      price: 0,
      description: '',
      image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg',
      category: '',
      rating: 0,
      stock: 0
    });
    setIsModalOpen(true);
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
            <nav className="p-2">
              <button
                className={`w-full flex items-center px-4 py-2 rounded-md text-left ${
                  activeTab === 'dashboard'
                    ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                onClick={() => setActiveTab('dashboard')}
              >
                <BarChart2 className="h-5 w-5 mr-3" />
                Dashboard
              </button>
              
              <button
                className={`w-full flex items-center px-4 py-2 rounded-md text-left ${
                  activeTab === 'products'
                    ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                onClick={() => setActiveTab('products')}
              >
                <ShoppingBag className="h-5 w-5 mr-3" />
                Products
              </button>
              
              <button
                className={`w-full flex items-center px-4 py-2 rounded-md text-left ${
                  activeTab === 'orders'
                    ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                onClick={() => setActiveTab('orders')}
              >
                <Package className="h-5 w-5 mr-3" />
                Orders
              </button>
              
              <button
                className={`w-full flex items-center px-4 py-2 rounded-md text-left ${
                  activeTab === 'customers'
                    ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                onClick={() => setActiveTab('customers')}
              >
                <Users className="h-5 w-5 mr-3" />
                Customers
              </button>
            </nav>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="lg:col-span-4">
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
            {/* Dashboard Tab */}
            {activeTab === 'dashboard' && (
              <div className="animate-fade-in">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Dashboard Overview</h2>
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, index) => (
                      <div key={index} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-5">
                        <div className="flex justify-between">
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{stat.name}</p>
                            <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stat.value}</p>
                          </div>
                          <div className="p-2 rounded-full bg-primary-50 dark:bg-primary-900/30">
                            <stat.icon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                          </div>
                        </div>
                        <div className={`mt-2 text-sm ${
                          stat.isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                        }`}>
                          {stat.change} from last month
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                      <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Recent Orders</h3>
                      <div className="space-y-4">
                        {[...Array(5)].map((_, index) => (
                          <div key={index} className="flex justify-between items-center">
                            <div>
                              <p className="text-sm font-medium text-gray-900 dark:text-white">Order #{Math.floor(10000 + Math.random() * 90000)}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">{new Date(Date.now() - Math.random() * 10 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
                            </div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              ${(Math.random() * 200 + 50).toFixed(2)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                      <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Top Products</h3>
                      <div className="space-y-4">
                        {productList.slice(0, 5).map((product) => (
                          <div key={product.id} className="flex justify-between items-center">
                            <div className="flex items-center">
                              <div className="h-10 w-10 rounded-md overflow-hidden mr-3">
                                <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                              </div>
                              <p className="text-sm font-medium text-gray-900 dark:text-white">{product.name}</p>
                            </div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              ${product.price.toFixed(2)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Products Tab */}
            {activeTab === 'products' && (
              <div className="animate-fade-in">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Product Management</h2>
                  <Button onClick={openCreateModal}>
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Product
                  </Button>
                </div>
                
                <div className="p-6">
                  <div className="mb-6 relative">
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white"
                    />
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Product
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Category
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Price
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Stock
                          </th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {filteredProducts.map((product) => (
                          <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="h-10 w-10 rounded-md overflow-hidden">
                                  <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900 dark:text-white">{product.name}</div>
                                  <div className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1 max-w-xs">{product.description}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400 capitalize">
                              {product.category}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                              ${product.price.toFixed(2)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                              {product.stock}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button
                                onClick={() => openEditModal(product)}
                                className="text-primary-600 hover:text-primary-900 dark:text-primary-400 dark:hover:text-primary-300 mr-3"
                              >
                                <Edit className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(product.id)}
                                className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    
                    {filteredProducts.length === 0 && (
                      <div className="text-center py-8">
                        <p className="text-gray-600 dark:text-gray-400">No products found matching your search.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
            
            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="animate-fade-in">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Order Management</h2>
                </div>
                
                <div className="p-6">
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 dark:border-yellow-600 p-4 mb-6">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-yellow-400 dark:text-yellow-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-400">Under Construction</h3>
                        <div className="mt-2 text-sm text-yellow-700 dark:text-yellow-300">
                          <p>This feature is currently being developed. Check back soon!</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center py-12">
                    <Package className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Order Management Coming Soon</h3>
                    <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                      We're working on an advanced order management system. This section will be available in the next update.
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Customers Tab */}
            {activeTab === 'customers' && (
              <div className="animate-fade-in">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Customer Management</h2>
                </div>
                
                <div className="p-6">
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 dark:border-yellow-600 p-4 mb-6">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-yellow-400 dark:text-yellow-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-400">Under Construction</h3>
                        <div className="mt-2 text-sm text-yellow-700 dark:text-yellow-300">
                          <p>This feature is currently being developed. Check back soon!</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center py-12">
                    <Users className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Customer Management Coming Soon</h3>
                    <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                      We're working on an advanced customer management system. This section will be available in the next update.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Product Edit/Create Modal */}
      {isModalOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
            </div>
            
            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {selectedProduct.id ? 'Edit Product' : 'Create Product'}
                </h3>
                <button 
                  onClick={() => {
                    setIsModalOpen(false);
                    setSelectedProduct(null);
                  }}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  <Input
                    label="Product Name"
                    name="name"
                    value={selectedProduct.name}
                    onChange={handleProductChange}
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Price"
                      name="price"
                      type="number"
                      step="0.01"
                      value={selectedProduct.price.toString()}
                      onChange={handleProductChange}
                    />
                    
                    <Input
                      label="Stock"
                      name="stock"
                      type="number"
                      value={selectedProduct.stock.toString()}
                      onChange={handleProductChange}
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Category
                    </label>
                    <select
                      name="category"
                      value={selectedProduct.category}
                      onChange={handleProductChange}
                      className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-white"
                    >
                      <option value="">Select Category</option>
                      <option value="electronics">Electronics</option>
                      <option value="furniture">Furniture</option>
                      <option value="kitchen">Kitchen</option>
                      <option value="fitness">Fitness</option>
                      <option value="fashion">Fashion</option>
                      <option value="lifestyle">Lifestyle</option>
                    </select>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={selectedProduct.description}
                      onChange={handleProductChange}
                      rows={4}
                      className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-white"
                    />
                  </div>
                  
                  <Input
                    label="Image URL"
                    name="image"
                    value={selectedProduct.image}
                    onChange={handleProductChange}
                  />
                </div>
              </div>
              
              <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsModalOpen(false);
                    setSelectedProduct(null);
                  }}
                  className="mr-3"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSaveProduct}
                >
                  <Check className="h-4 w-4 mr-2" />
                  {selectedProduct.id ? 'Update Product' : 'Create Product'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;