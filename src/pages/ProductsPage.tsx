import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, Search, SlidersHorizontal, X } from 'lucide-react';
import { products, getProductsByCategory } from '../data/products';
import ProductCard from '../components/ui/ProductCard';
import CategoryFilter from '../components/ui/CategoryFilter';
import Button from '../components/ui/Button';

const ProductsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const searchQuery = searchParams.get('search') || '';
  
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryParam);
  const [searchTerm, setSearchTerm] = useState(searchQuery);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  // Apply filters
  useEffect(() => {
    let result = products;
    
    // Filter by category
    if (selectedCategory) {
      result = getProductsByCategory(selectedCategory);
    }
    
    // Filter by search term
    if (searchTerm) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredProducts(result);
    
    // Update URL parameters
    const params: { category?: string; search?: string } = {};
    if (selectedCategory) params.category = selectedCategory;
    if (searchTerm) params.search = searchTerm;
    setSearchParams(params);
  }, [selectedCategory, searchTerm, setSearchParams]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };
  
  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category);
    setShowMobileFilters(false);
  };
  
  const clearFilters = () => {
    setSelectedCategory(null);
    setSearchTerm('');
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          {selectedCategory ? `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Products` : 'All Products'}
        </h1>
        <Button 
          variant="outline"
          size="sm"
          className="md:hidden"
          onClick={() => setShowMobileFilters(true)}
        >
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Desktop Sidebar */}
        <div className="hidden md:block md:w-64 flex-shrink-0">
          <CategoryFilter 
            selectedCategory={selectedCategory} 
            onSelectCategory={handleCategorySelect} 
          />
        </div>
        
        {/* Mobile Filters */}
        {showMobileFilters && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden animate-fade-in">
            <div className="absolute right-0 top-0 bottom-0 w-4/5 max-w-xs bg-white dark:bg-gray-800 p-4 overflow-y-auto animate-slide-up">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Filters</h2>
                <button 
                  onClick={() => setShowMobileFilters(false)}
                  className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <X className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                </button>
              </div>
              <CategoryFilter 
                selectedCategory={selectedCategory} 
                onSelectCategory={handleCategorySelect} 
              />
            </div>
          </div>
        )}
        
        <div className="flex-1">
          {/* Search and Filters */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              {(searchTerm || selectedCategory) && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </form>
            
            <div className="flex items-center mt-4 text-sm text-gray-600 dark:text-gray-400">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              <span>
                Showing {filteredProducts.length} product{filteredProducts.length !== 1 && 's'}
                {selectedCategory && ` in ${selectedCategory}`}
                {searchTerm && ` matching "${searchTerm}"`}
              </span>
            </div>
          </div>
          
          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <Search className="h-12 w-12 mx-auto text-gray-400" />
              <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">No products found</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                We couldn't find any products matching your search. Try different keywords or clear your filters.
              </p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={clearFilters}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;