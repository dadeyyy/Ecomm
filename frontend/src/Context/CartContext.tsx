import { createContext, useEffect, useState } from 'react';
import { TypeProduct } from '../pages/products';
import useAuth from '../hooks/useAuth';

export type CartContextType = {
  items: TypeProduct[] | null;
  addItem: (item: TypeProduct) => void;
  removeItem: (item: TypeProduct) => void;
};

export const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const auth = useAuth();
  const username = auth?.user?.username;
  const [cart, setCart] = useState<TypeProduct[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem(`${username} cart`);
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    } else {
      setCart([]);
    }
  }, [username]);

  const addItem = (item: TypeProduct) => {
    //Find product in cart
    const findProductInCart = cart?.find((prod) => prod.name === item.name);
    if (!findProductInCart) {
      setCart([...cart, { ...item, quantity: 1 }]);
      localStorage.setItem(`${username} cart`, JSON.stringify([...cart, { ...item, quantity: 1 }]));
    } else {
      //Map through the cart and update the quality of the cart:
      const newUpdatedQuantityCart = cart.map((c) => {
        if (c.id === item.id && c.quantity) {
          return { ...c, quantity: c.quantity + 1 };
        }
        return c;
      });
      setCart(newUpdatedQuantityCart);
      localStorage.setItem(`${username} cart`, JSON.stringify(newUpdatedQuantityCart));
    }
  };

  const removeItem = (item: TypeProduct) => {
    const findProductInCart = cart?.find((prod) => prod.name === item.name);
    if (!findProductInCart) {
      return;
    }

    const updatedDecreaseQuantity = cart
      .map((prod) => {
        if (prod.id === item.id && prod.quantity && prod.quantity > 0) {
          return { ...prod, quantity: prod.quantity - 1 };
        }
        return prod;
      })
      .filter((i) => i.quantity !== 0);
    setCart(updatedDecreaseQuantity);
    localStorage.setItem(`${username} cart`, JSON.stringify(updatedDecreaseQuantity));
  };

  return <CartContext.Provider value={{ addItem, items: cart, removeItem }}>{children}</CartContext.Provider>;
};
