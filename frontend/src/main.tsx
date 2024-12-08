import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
Products;
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Products from './pages/products.tsx';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './Context/AuthContext.tsx';
import { CartProvider } from './Context/CartContext.tsx';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './Error/ErrorFallback.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Routes>
              <Route path="/*" element={<App />} />
            </Routes>
          </ErrorBoundary>
          <ToastContainer position="top-center" autoClose={1500} />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
