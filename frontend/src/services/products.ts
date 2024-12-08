import { backendUrl } from '../lib/backendUrl';

export const fetchProducts = async (accessToken: string) => {
  try {
    const req = await fetch(`${backendUrl}/products`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: 'include',
    });

    if (!req.ok) {
      throw new Error('Failed to fetch products');
    }
    const data = await req.json();
    return data;
  } catch (e) {
    throw e;
  }
};
