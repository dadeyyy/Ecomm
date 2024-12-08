import { TypeProduct } from '../../pages/products';
import Icon from '@mdi/react';
import { mdiMinusBox, mdiPlusBox } from '@mdi/js';

type CartItemType = {
  data: TypeProduct;
  handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>, data: TypeProduct) => void;
  handleIncrementCartProduct: (prod: TypeProduct) => Promise<void>;
  handleDecrementCartProduct: (prod: TypeProduct) => Promise<void>;
};

export default function CartItem({
  data,
  handleCheckboxChange,
  handleIncrementCartProduct,
  handleDecrementCartProduct,
}: CartItemType) {
  return (
    <div key={data.id} className="flex items-center justify-between gap-3 border border-slate-500 rounded-lg px-4 py-5">
      <div className="flex justify-center items-center gap-3">
        <input
          className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded-lg focus:ring-blue-500 focus:ring-2 "
          onChange={(e) => handleCheckboxChange(e, data)}
          type="checkbox"
          name="cb"
          id="cb"
        />
        <li className="text-md font-medium"> {data.name} </li>
      </div>

      <div className="flex gap-5 items-center">
        <div>
          <li className="flex justify-center items-center gap-2">
            <span className="font-medium">₱</span> <span>{data.price}</span>
          </li>
          <li className="opacity-50 text-sm"> x{data.quantity}</li>
        </div>
        <div className="flex flex-col">
          <button onClick={() => handleIncrementCartProduct(data)}>
            <Icon path={mdiPlusBox} size={1} />
          </button>
          <button onClick={() => handleDecrementCartProduct(data)}>
            <Icon path={mdiMinusBox} size={1} />
          </button>
        </div>
      </div>
    </div>
  );
}
