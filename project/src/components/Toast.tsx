import React from 'react';
import { Toaster } from 'react-hot-toast';

export const ToastProvider: React.FC = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3000,
        style: {
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: '#fff',
          borderRadius: '12px',
          padding: '16px',
          fontSize: '14px',
          fontWeight: '500',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        },
        success: {
          style: {
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          },
        },
        error: {
          style: {
            background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
          },
        },
      }}
    />
  );
};