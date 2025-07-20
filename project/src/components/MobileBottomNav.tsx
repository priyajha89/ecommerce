import React from 'react';
import { motion } from 'framer-motion';
import { Home, ShoppingCart, Package, User } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

interface MobileBottomNavProps {
  cartCount: number;
  onCartClick: () => void;
  isAuthenticated: boolean;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ 
  cartCount, 
  onCartClick, 
  isAuthenticated 
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { 
      icon: Home, 
      label: 'Home', 
      path: '/',
      onClick: () => navigate('/')
    },
    { 
      icon: ShoppingCart, 
      label: 'Cart', 
      path: '/cart',
      onClick: onCartClick,
      badge: cartCount
    },
    { 
      icon: Package, 
      label: 'Products', 
      path: '/products',
      onClick: () => navigate('/products')
    },
    { 
      icon: User, 
      label: 'Profile', 
      path: '/profile',
      onClick: () => navigate(isAuthenticated ? '/profile' : '/login')
    }
  ];

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-purple-100 px-4 py-2 z-50 md:hidden"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-around items-center">
        {navItems.map((item) => (
          <motion.button
            key={item.label}
            onClick={item.onClick}
            className={`relative flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors duration-200 ${
              location.pathname === item.path
                ? 'text-purple-600'
                : 'text-gray-500 hover:text-purple-600'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative">
              <item.icon className="h-5 w-5" />
              {item.badge && item.badge > 0 && (
                <motion.span
                  className="absolute -top-2 -right-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-medium"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                  {item.badge}
                </motion.span>
              )}
            </div>
            <span className="text-xs font-medium">{item.label}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};