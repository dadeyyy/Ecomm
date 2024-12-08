import { useContext } from 'react';
import { CartContext } from '../Context/CartContext';
import { useNavigate } from 'react-router-dom';
import CartItem from '../components/cart/CartItem';
import SelectedItem from '../components/cart/SelectedItem';
import useAuth from '../hooks/useAuth';
import useSelectedProducts from '../hooks/useSelectedProducts';
import useCartStock from '../hooks/useCartStock';
import { checkout } from '../services/checkout';

const CartPage = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const cartContext = useContext(CartContext);
  const { handleCheckboxChange, selectedProducts, setSelectedProducts, totalPrice } = useSelectedProducts();
  const { handleDecrementCartProduct, handleIncrementCartProduct } = useCartStock(
    cartContext!,
    selectedProducts,
    setSelectedProducts
  );

  const handleCheckOut = async () => {
    try {
      const data = await checkout(totalPrice, selectedProducts || [], auth?.user?.id!, auth?.accessToken!);
      window.location.href = data.link;
    } catch (error) {
      console.error(error);
    }
  };

  if (!auth?.isAuthenticated) {
    navigate('/login');
  }

  return (
    <div className="max-w-7xl mx-auto flex md:flex-row flex-col gap-20  p-5">
      <div className="max-w-xl flex-grow">
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-2xl font-bold ">Your cart:</h1>
        </div>
        <ul className="flex flex-col  gap-5">
          {cartContext?.items?.map((data) => (
            <CartItem
              key={data.id}
              data={data}
              handleCheckboxChange={(e) => handleCheckboxChange(e.currentTarget.checked, data)}
              handleDecrementCartProduct={handleDecrementCartProduct}
              handleIncrementCartProduct={handleIncrementCartProduct}
            />
          ))}
        </ul>
      </div>
      <div className="flex flex-col flex-grow p-5 bg-gray-100 border border-gray-300 rounded-lg ">
        <h1 className="text-2xl font-bold">Checkout :</h1>
        <div className={`${totalPrice !== 0 ? 'border-b-2 border-black' : ''} flex flex-col gap-5 pb-4 mb-5`}>
          <span className="font-medium">Items: </span>
          <ul className="flex flex-col gap-3">
            {selectedProducts?.map((data) => {
              return <SelectedItem key={data.id} data={data} />;
            })}
          </ul>
        </div>
        <div className="flex flex-col justify-center items-end gap-5">
          {totalPrice !== 0 ? (
            <>
              <p>
                Total = <span className="text-xl font-bold text-red-500">₱{totalPrice}</span>
              </p>
              <button
                onClick={handleCheckOut}
                className="cursor-pointer bg-blue-300 hover:bg-blue-400 rounded-md font-semibold px-4 py-2 hover:text-white"
              >
                Checkout
              </button>
            </>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
