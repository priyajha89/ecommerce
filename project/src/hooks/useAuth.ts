import { useState, useCallback } from 'react';
import { User, AuthState } from '../types/User';

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: false
  });

  const login = useCallback(async (email: string, password: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user: User = {
      id: '1',
      name: email.split('@')[0],
      email,
      avatar: `https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100`
    };
    
    setAuthState({
      user,
      isAuthenticated: true,
      isLoading: false
    });
    
    return { success: true };
  }, []);

  const signup = useCallback(async (name: string, email: string, password: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user: User = {
      id: '1',
      name,
      email,
      avatar: `https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100`
    };
    
    setAuthState({
      user,
      isAuthenticated: true,
      isLoading: false
    });
    
    return { success: true };
  }, []);

  const logout = useCallback(() => {
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false
    });
  }, []);

  return {
    ...authState,
    login,
    signup,
    logout
  };
};