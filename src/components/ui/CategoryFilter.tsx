import React from 'react';
import { Filter } from 'lucide-react';
import { getCategories } from '../../data/products';

interface CategoryFilterProps {
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ 
  selectedCategory, 
  onSelectCategory 
}) => {
  const categories = getCategories();
  
  return (
    <div className="mb-6 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
      <div className="flex items-center mb-3">
        <Filter className="h-5 w-5 text-gray-700 dark:text-gray-300 mr-2" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Categories</h3>
      </div>
      
      <div className="space-y-2">
        <button
          onClick={() => onSelectCategory(null)}
          className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
            selectedCategory === null
              ? 'bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          All Products
        </button>
        
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`w-full text-left px-3 py-2 rounded-md capitalize transition-colors ${
              selectedCategory === category
                ? 'bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;