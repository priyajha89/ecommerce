import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2, ShoppingBag, ShoppingCart } from 'lucide-react';
import { CartItem } from '../types/Product';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  totalPrice: number;
}

export const CartModal: React.FC<CartModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  totalPrice
}) => {
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const modalVariants = {
    hidden: { 
      opacity: 0, 
      x: '100%',
      transition: { duration: 0.3, ease: "easeInOut" }
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
          />
          
          <motion.div
            className="fixed right-0 top-0 h-full w-full max-w-lg bg-white/95 backdrop-blur-md shadow-2xl z-50 overflow-y-auto border-l border-purple-100"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <div className="p-6 h-full flex flex-col">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-purple-100">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent flex items-center">
                  <ShoppingBag className="h-6 w-6 mr-2" />
                  Shopping Cart
                </h2>
                <motion.button
                  onClick={onClose}
                  className="p-3 hover:bg-purple-50 rounded-full transition-colors duration-200 text-gray-500 hover:text-purple-600"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="h-6 w-6" />
                </motion.button>
              </div>

              {cartItems.length === 0 ? (
                <div className="flex-1 flex items-center justify-center">
                  <motion.div
                    className="text-center py-16"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="relative mb-8">
                      <div className="w-32 h-32 mx-auto bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
                        <ShoppingCart className="h-16 w-16 text-purple-300" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">0</span>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Your cart is empty</h3>
                    <p className="text-gray-500 text-lg mb-8 max-w-sm mx-auto leading-relaxed">
                      Discover amazing products and add them to your cart to get started!
                    </p>
                    <motion.button
                      onClick={onClose}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Start Shopping
                    </motion.button>
                  </motion.div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col">
                  <div className="flex-1 space-y-6 mb-8 overflow-y-auto">
                    {cartItems.map((item, index) => (
                      <motion.div
                        key={item.product.id}
                        className="flex items-center space-x-4 p-4 bg-gradient-to-r from-purple-50/50 to-pink-50/50 rounded-2xl border border-purple-100 hover:shadow-md transition-all duration-200"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        layout
                      >
                        <div className="relative">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-20 h-20 object-cover rounded-xl border-2 border-white shadow-md"
                          />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-gray-900 truncate text-lg mb-1">
                            {item.product.name}
                          </h3>
                          <p className="text-purple-600 font-semibold text-lg">
                            ${item.product.price}
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            ${(item.product.price * item.quantity).toFixed(2)} total
                          </p>
                        </div>
                        
                        <div className="flex items-center space-x-3 bg-white rounded-xl p-2 shadow-sm">
                          <motion.button
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                            className="p-2 hover:bg-purple-50 rounded-lg transition-colors duration-200 text-purple-600"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Minus className="h-4 w-4" />
                          </motion.button>
                          
                          <span className="w-10 text-center font-bold text-lg text-gray-900">
                            {item.quantity}
                          </span>
                          
                          <motion.button
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                            className="p-2 hover:bg-purple-50 rounded-lg transition-colors duration-200 text-purple-600"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Plus className="h-4 w-4" />
                          </motion.button>
                        </div>
                        
                        <motion.button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors duration-200"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Trash2 className="h-5 w-5" />
                        </motion.button>
                      </motion.div>
                    ))}
                  </div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <motion.div
                      className="border-t border-purple-100 pt-6 bg-white/80 backdrop-blur-sm rounded-2xl p-6 -mx-6 -mb-6"
                    >
                      <div className="flex justify-between items-center mb-6">
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Total ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</p>
                          <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            ${totalPrice.toFixed(2)}
                          </span>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-green-600 font-medium">Free shipping</p>
                          <p className="text-xs text-gray-500">on orders over $50</p>
                        </div>
                      </div>
                      
                      <motion.button
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Proceed to Checkout
                      </motion.button>
                      
                      <motion.button
                        onClick={onClose}
                        className="w-full mt-3 text-purple-600 hover:text-purple-700 py-3 px-6 rounded-xl font-semibold transition-colors duration-200"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Continue Shopping
                      </motion.button>
                    </motion.div>
                  </motion.div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};