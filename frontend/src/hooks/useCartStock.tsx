import { CartContextType } from '../Context/CartContext';
import { TypeProduct } from '../pages/products';
import useUpdateStock from './useUpdateStock';

export default function useCartStock(
  CartContext: CartContextType,
  selectedProducts: TypeProduct[] | null,
  setSelectedProducts: React.Dispatch<React.SetStateAction<TypeProduct[] | null>>
) {
  const { increaseStock, decreaseStock } = useUpdateStock();

  const handleIncrementCartProduct = async (prod: TypeProduct) => {
    CartContext.addItem(prod);
    const updateSelectedProductIncrease = selectedProducts?.map((selected) => {
      if (selected.id === prod.id && selected.quantity && selected.quantity > 0) {
        return { ...selected, quantity: selected.quantity + 1 };
      }
      return selected;
    });
    setSelectedProducts(updateSelectedProductIncrease!);
    decreaseStock(prod.id);
  };

  const handleDecrementCartProduct = async (prod: TypeProduct) => {
    CartContext?.removeItem(prod);
    const updateSelectedProductDecrease = selectedProducts
      ?.map((item) => {
        if (item.id === prod.id && item.quantity && item.quantity > 0) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      })
      .filter((i) => i.quantity !== 0);
    setSelectedProducts(updateSelectedProductDecrease!);
    increaseStock(prod.id);
  };

  return { handleIncrementCartProduct, handleDecrementCartProduct };
}
