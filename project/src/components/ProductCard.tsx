import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Check } from 'lucide-react';
import { Product } from '../types/Product';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  viewMode?: 'grid' | 'list';
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, viewMode = 'grid' }) => {
  const [isAdding, setIsAdding] = React.useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    onAddToCart(product);
    
    // Show success toast
    toast.success(`${product.name} added to cart!`, {
      icon: '🛒',
    });
    
    // Reset button state after animation
    setTimeout(() => setIsAdding(false), 1000);
  };

  if (viewMode === 'list') {
    return (
      <motion.div
        className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-purple-100 overflow-hidden group hover:shadow-2xl transition-all duration-500 flex"
        whileHover={{ 
          y: -4, 
          scale: 1.01,
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        layout
      >
        <div className="relative overflow-hidden w-48 flex-shrink-0">
          <motion.img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-400" />
        </div>
        
        <div className="flex-1 p-6 flex flex-col justify-between">
          <div>
            <div className="mb-2">
              <span className="text-xs font-semibold text-purple-600 bg-gradient-to-r from-purple-50 to-pink-50 px-3 py-1 rounded-full border border-purple-100">
                {product.category}
              </span>
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors duration-200">
              {product.name}
            </h3>
            
            <p className="text-gray-600 mb-4 leading-relaxed">
              {product.description}
            </p>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              ${product.price}
            </span>
            
            <motion.button
              onClick={handleAddToCart}
              disabled={isAdding}
              className={`${
                isAdding 
                  ? 'bg-green-500 hover:bg-green-600' 
                  : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
              } text-white px-6 py-3 rounded-xl flex items-center space-x-2 transition-all duration-300 shadow-lg hover:shadow-xl disabled:cursor-not-allowed font-medium`}
              whileHover={{ scale: isAdding ? 1 : 1.05 }}
              whileTap={{ scale: 0.98 }}
              animate={isAdding ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              {isAdding ? (
                <>
                  <Check className="h-5 w-5" />
                  <span>Added!</span>
                </>
              ) : (
                <>
                  <Plus className="h-5 w-5" />
                  <span>Add to Cart</span>
                </>
              )}
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-purple-100 overflow-hidden group hover:shadow-2xl transition-all duration-500"
      whileHover={{ 
        y: -8, 
        scale: 1.02,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      layout
    >
      <div className="relative overflow-hidden">
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full h-56 sm:h-48 object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-400" />
        
        {/* Quick add button overlay */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
          initial={{ scale: 0.8 }}
          whileHover={{ scale: 1 }}
        >
          <motion.button
            onClick={handleAddToCart}
            className="bg-white/90 backdrop-blur-sm text-purple-600 px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-white transition-all duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Quick Add
          </motion.button>
        </motion.div>
      </div>
      
      <div className="p-6">
        <div className="mb-2">
          <span className="text-xs font-semibold text-purple-600 bg-gradient-to-r from-purple-50 to-pink-50 px-3 py-1 rounded-full border border-purple-100">
            {product.category}
          </span>
        </div>
        
        <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-purple-600 transition-colors duration-200">
          {product.name}
        </h3>
        
        <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            ${product.price}
          </span>
          
          <motion.button
            onClick={handleAddToCart}
            disabled={isAdding}
            className={`${
              isAdding 
                ? 'bg-green-500 hover:bg-green-600' 
                : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
            } text-white px-5 py-2.5 rounded-xl flex items-center space-x-2 transition-all duration-300 shadow-lg hover:shadow-xl disabled:cursor-not-allowed font-medium`}
            whileHover={{ scale: isAdding ? 1 : 1.05 }}
            whileTap={{ scale: 0.98 }}
            animate={isAdding ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 0.3 }}
          >
            {isAdding ? (
              <>
                <Check className="h-4 w-4" />
                <span className="hidden sm:inline">Added!</span>
              </>
            ) : (
              <>
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">Add to Cart</span>
              </>
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};