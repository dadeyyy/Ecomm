import { useState } from 'react';
import { backendUrl } from '../lib/backendUrl';
import useAuth from './useAuth';

export const useUpdateStock = () => {
  const auth = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const decreaseStock = async (id: number) => {
    try {
      const req = await fetch(`${backendUrl}/products/decreaseStock`, {
        body: JSON.stringify({ id }),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth?.accessToken}`,
        },
        credentials: 'include',
      });
      const data = await req.json();
      if (!data.success) {
        throw new Error('Failed to update stock on the server! -');
      }
      return true;
    } catch (e: any) {
      console.log('CATCH', e);
      setError(e.message || 'An error occurred');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const increaseStock = async (id: number) => {
    try {
      const req = await fetch(`${backendUrl}/products/increaseStock`, {
        body: JSON.stringify({ id }),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth?.accessToken}`,
        },
        credentials: 'include',
      });

      const data = await req.json();
      if (!data.success) {
        throw new Error('Failed to update stock on the server! +');
      }
      return true;
    } catch (e: any) {
      setError(e.message || 'An error occurred');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { decreaseStock, increaseStock, loading, error };
};

export default useUpdateStock;
