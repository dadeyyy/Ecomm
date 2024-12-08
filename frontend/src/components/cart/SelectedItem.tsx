import { TypeProduct } from "../../pages/products";

export default function SelectedItem({data}: {data: TypeProduct}) {
    const quantity = data.quantity ?? 1;
    const productTotal = parseFloat(data.price) * quantity;
    return (
      <div key={data.id} className="flex justify-between">
        <div>
          <li>{data.name}</li>
        </div>
        <div className="flex gap-2">
          <div className="flex gap-3">
            <li>{data.price}</li>
            <span>x</span>
            <li>{data.quantity}</li>
            <span> = </span>
          </div>

          <span className="font-semibold text-red-500">₱{productTotal.toFixed(2)}</span>
        </div>
      </div>
    );
}
