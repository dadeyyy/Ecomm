import { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import { backendUrl } from '../lib/backendUrl';

type PurchasedType = {
  name: string;
  category: string;
  price: string;
  quantity: number;
  purchased_date: string;
};
const Purchased = () => {
  const auth = useAuth();

  const [purchases, setPurchases] = useState<PurchasedType[] | null>(null);
  useEffect(() => {
    async function fetchPurchased() {
      try {
        const req = await fetch(`${backendUrl}/payment/purchased`, {
          credentials: 'include',
          headers: {
            Authorization: `Bearer ${auth?.accessToken}`,
          },
        });

        const data = (await req.json()) as PurchasedType[];
        setPurchases(data);
      } catch (e) {
        console.log(e);
      }
    }

    fetchPurchased();
  }, []);

  return (
    <div className="max-w-7xl mx-auto">
      <ul className="flex flex-col pt-10 gap-5">
        {purchases?.map((data) => {
          const purchasedDate = new Date(data.purchased_date).toLocaleString().split(' ');
          const date = purchasedDate[0];
          const time = purchasedDate[1];

          return (
            <div key={data.name} className="flex w-full justify-between items-center border-b border-slate-200 pb-2">
              {/* Name and Category */}
              <div className="flex flex-col items-center w-1/3">
                <li className="text-2xl font-medium">{data.name}</li>
                <li className="opacity-50">({data.category})</li>
              </div>

              {/* Price and Quantity */}
              <div className="flex flex-col items-center w-1/3">
                <li className="text-lg">₱{data.price}</li>
                <li className="opacity-50">x{data.quantity}</li>
              </div>

              {/* Date and Time */}
              <div className="flex flex-col items-center w-1/3">
                <li>{date}</li>
                <li>{time}</li>
              </div>
              
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default Purchased;
