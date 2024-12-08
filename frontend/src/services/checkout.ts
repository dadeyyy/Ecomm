import { backendUrl } from "../lib/backendUrl";


export const checkout = async (total: number, products: any[], userId: number, token: string) => {
  const response = await fetch(`${backendUrl}/payment/checkout`, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({ total, selectedProducts: products, userId }),
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-type': 'application/json',
    },
  });
  return response.json();
};