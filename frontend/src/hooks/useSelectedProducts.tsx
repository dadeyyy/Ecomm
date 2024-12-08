import { useState, useEffect } from 'react';
import { TypeProduct } from '../pages/products';

export default function useSelectedProducts() {
  const [selectedProducts, setSelectedProducts] = useState<TypeProduct[] | null>(null);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (!selectedProducts || selectedProducts.length === 0) {
      setTotalPrice(0);
      return;
    }
    const total = selectedProducts.reduce((acc, { price, quantity = 1 }) => {
      return acc + parseFloat(price) * quantity;
    }, 0);
    setTotalPrice(Number(total.toFixed(2)));
  }, [selectedProducts]);

  const handleCheckboxChange = (isChecked: boolean, product: TypeProduct) => {
    if (isChecked) {
      setSelectedProducts((prev) => (prev ? [...prev, product] : [product]));
    } else {
      setSelectedProducts((prev) => prev?.filter((item) => item.id !== product.id) || null);
    }
  };

  return { selectedProducts, totalPrice, handleCheckboxChange, setSelectedProducts };
}
