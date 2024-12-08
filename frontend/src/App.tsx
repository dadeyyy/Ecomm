import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Products from './pages/products';
import CartPage from './pages/cartPage';
import ProductInfo from './pages/productInfo';
import NotFound from './pages/not-found';
import RequireAuth from './components/RequireAuth';
import { useEffect, useState } from 'react';
import useAuth from './hooks/useAuth';
import Purchased from './pages/Purchased';
import { backendUrl } from './lib/backendUrl';
import { useErrorBoundary } from 'react-error-boundary';

const App = () => {
  const { showBoundary } = useErrorBoundary();
  const auth = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (location.pathname === '/login') {
      setLoading(false);
      return;
    }

    const refresh = async () => {
      try {
        const req = await fetch(`${backendUrl}/api/auth/refresh-token`, {
          method: 'POST',
          credentials: 'include',
        });

        if (!req.ok) {
          throw new Error('Unauthorized!');
        }

        const data = await req.json();
        auth?.setAccessToken(data.newAccessToken);
        auth?.setUser(data.payload);
        auth?.setIsAuthenticated(true);
      } catch (e) {
        showBoundary(e);
      } finally {
        setLoading(false);
      }
    };

    refresh();
  }, []);

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />

      <Route element={<RequireAuth />}>
        <Route element={<Navbar />}>
          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<ProductInfo />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="purchased" element={<Purchased />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
