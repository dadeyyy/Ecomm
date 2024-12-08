import { useState } from 'react';
import { TypeProduct } from '../pages/products';
import { Link } from 'react-router-dom';
import Icon from '@mdi/react';
import { mdiCartOutline } from '@mdi/js';

type TypeCart = {
  handleCartOnClick: () => void;
  cartProducts: TypeProduct[];
};

const Cart = ({ cartProducts, handleCartOnClick }: TypeCart) => {
  const [isCartOnHover, setIsCartOnHover] = useState(false);

  const handleMouseHover = () => {
    setIsCartOnHover(true);
  };
  const handleMouseLeave = () => {
    setIsCartOnHover(false);
  };

  return (
    <div className="relative">
      <button
        className="cursor-pointer bg-green-300 rounded-md font-semibold px-5 py-1"
        onMouseOver={handleMouseHover}
        onClick={handleCartOnClick}
      >
        <Icon path={mdiCartOutline} size={1} />
      </button>

      {isCartOnHover && cartProducts.length > 0 && (
        <div
          onMouseLeave={handleMouseLeave}
          className="absolute top-8 right-10 border-slate-300 rounded-lg border p-3 w-max bg-white"
        >
          <ul className="flex flex-col justify-center items-center gap-5 font-medium">
            {cartProducts.map((product) => (
              <li key={product.id} className="flex justify-between gap-3 items-center hover:text-blue-500">
                <Link state={product} to={`/products/${product.id}`}>
                  <span>{product.name}</span> <span>₱{product.price}</span> <span>x{product.quantity}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Cart;
