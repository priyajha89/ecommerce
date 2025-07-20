import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navigation } from './components/Navigation';
import { CartModal } from './components/CartModal';
import { MobileBottomNav } from './components/MobileBottomNav';
import { ToastProvider } from './components/Toast';
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Profile } from './pages/Profile';
import { useCart } from './hooks/useCart';
import { useAuth } from './hooks/useAuth';
import { products } from './data/products';

function App() {
  const {
    cartItems,
    isCartOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    getTotalItems,
    getTotalPrice,
    openCart,
    closeCart
  } = useCart();

  const {
    user,
    isAuthenticated,
    isLoading,
    login,
    signup,
    logout
  } = useAuth();

  return (
    <Router>
      <ToastProvider />
      <div className="min-h-screen bg-gradient-to-br from-purple-50/30 via-white to-pink-50/30">
        <Navigation 
          cartCount={getTotalItems()} 
          onCartClick={openCart}
          user={user}
          isAuthenticated={isAuthenticated}
          onLogout={logout}
        />
        
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Routes>
            <Route 
              path="/" 
              element={<Home products={products} onAddToCart={addToCart} />} 
            />
            <Route 
              path="/products" 
              element={<Products onAddToCart={addToCart} />} 
            />
            <Route 
              path="/login" 
              element={
                isAuthenticated ? 
                <Navigate to="/" replace /> : 
                <Login onLogin={login} isLoading={isLoading} />
              } 
            />
            <Route 
              path="/signup" 
              element={
                isAuthenticated ? 
                <Navigate to="/" replace /> : 
                <Signup onSignup={signup} isLoading={isLoading} />
              } 
            />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route 
              path="/profile" 
              element={
                isAuthenticated ? 
                <Profile user={user} /> : 
                <Navigate to="/login" replace />
              } 
            />
          </Routes>
        </motion.main>
        
        <CartModal
          isOpen={isCartOpen}
          onClose={closeCart}
          cartItems={cartItems}
          onUpdateQuantity={updateQuantity}
          onRemoveItem={removeFromCart}
          totalPrice={getTotalPrice()}
        />
        
        <MobileBottomNav 
          cartCount={getTotalItems()}
          onCartClick={openCart}
          isAuthenticated={isAuthenticated}
        />
      </div>
    </Router>
  );
}

export default App;