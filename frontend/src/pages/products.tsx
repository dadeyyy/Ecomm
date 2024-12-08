import { useNavigate } from 'react-router-dom';
import Button from '../components/button';
import { useEffect, useState } from 'react';
import Cart from '../components/cart';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { CartContext } from '../Context/CartContext';
import useUpdateStock from '../hooks/useUpdateStock';
import useAuth from '../hooks/useAuth';
import { useErrorBoundary } from 'react-error-boundary';
import { fetchProducts } from '../services/products';

export type TypeProduct = {
  id: number;
  name: string;
  category: string;
  price: string;
  stock: number;
  imageurl: string;
  quantity?: number;
};


const Products = () => {
  const auth = useAuth();
  const { decreaseStock } = useUpdateStock();
  const cartContext = useContext(CartContext);
  const navigate = useNavigate();
  const [products, setProducts] = useState<TypeProduct[]>([]);
  const { showBoundary } = useErrorBoundary();

  useEffect(() => {
    async function getProducts() {
      try {
        const productData = await fetchProducts(auth?.accessToken!);
        setProducts(productData);
      } catch (e) {
        showBoundary(e);
      }
    }

    getProducts();
  }, []);

  const handleProductClick = (e: React.MouseEvent<HTMLUListElement, MouseEvent>, prod: TypeProduct) => {
    const target = e.target as HTMLButtonElement;
    const name = target.name;

    if (name !== 'addToCartBtn') {
      navigate(`/products/${prod.id}`, { state: prod });
    } else {
      handleAddProduct(prod);
    }
  };

  const handleAddProduct = async (prod: TypeProduct) => {
    if (prod.stock === 0) {
      toast.error('Out of stock!');
      return;
    }
    cartContext?.addItem(prod);
    const productToUpdate = products.find((product) => product.id === prod.id);
    const decreaseProduct = products.map((p) => {
      if (p.id === productToUpdate?.id) {
        return { ...p, stock: p.stock - 1 };
      }
      return p;
    });
    setProducts(decreaseProduct);
    toast.success('Added!');

    const success = await decreaseStock(prod.id);
    if (!success) {
      showBoundary('Failed to update stock!')
    }
  };

  const handleCartClick = () => {
    navigate(`/cart`);
  };

  return (
    <div className="max-w-7xl mx-auto py-5">
      <div className="flex justify-between items-center mb-10 sm:px-0 px-5">
        <h1 className="text-2xl font-bold">Products:</h1>
        <div className="flex gap-3">
          <Cart cartProducts={cartContext?.items!} handleCartOnClick={handleCartClick} />
        </div>
      </div>

      <div className="flex flex-wrap gap-10 ">
        {products.map((prod) => (
          <ul
            key={prod.id}
            onClick={(e) => handleProductClick(e, prod)}
            className="flex flex-col justify-between items-center border border-black p-5 cursor-pointer max-w-56 rounded-md mx-auto"
          >
            <div className="flex flex-col items-center justify-between">
              <div>
                <li className="font-medium">{prod.name}</li>
                <li>₱{prod.price}</li>
                <li className="text-sm opacity-60"> {prod.category}</li>
                <li className="text-sm opacity-40">Stock: {prod.stock}</li>
              </div>
              <div>
                <img src={prod.imageurl} alt="" />
              </div>
            </div>
            <Button
              btnProps={{ name: 'addToCartBtn' }}
              btnClassName="bg-blue-300 rounded-lg py-1 w-full hover:bg-blue-400 hover:font-medium cursor-pointer"
              btnName="Add"
            />
          </ul>
        ))}
      </div>
    </div>
  );
};

export default Products;
