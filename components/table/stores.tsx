import { useRouter } from "next/router";

export type Stores = {
  name: string;
  orders: number;
  avgOrderTime: number;
  avgPickupTime: number;
  avgTotalTime: number;
};

const StoresTable: React.FC<{ stores: Stores[] }> = ({ stores }) => {
  const router = useRouter();

  return (
    <table className="w-full mt-0 text-gray-500 text-sm font-normal">
      <thead className="text-left text-gray-500 font-semibold">
        <tr>
          <th className="whitespace-nowrap text-left text-gray-500 top-0 pl-4 pr-4 pt-3.5 pb-3.5 font-semibold">
            #
          </th>
          <th className="whitespace-nowrap text-left text-gray-500 top-0 pl-4 pr-4 pt-3.5 pb-3.5 font-semibold">
            Name
          </th>
          <th className="whitespace-nowrap text-left text-gray-500 top-0 pl-4 pr-4 pt-3.5 pb-3.5 font-semibold">
            Total Orders
          </th>
          <th className="whitespace-nowrap text-left text-gray-500 top-0 pl-4 pr-4 pt-3.5 pb-3.5 font-semibold">
            Average Order Time
          </th>
          <th className="whitespace-nowrap text-left text-gray-500 top-0 pl-4 pr-4 pt-3.5 pb-3.5 font-semibold">
            Average Pickup Time
          </th>
          <th className="whitespace-nowrap text-left text-gray-500 top-0 pl-4 pr-4 pt-3.5 pb-3.5 font-semibold">
            Average Total Time
          </th>
        </tr>
      </thead>
      <tbody className="align-top overflow-x-auto divide-y divide-gray-200">
        {stores.map((store, index) => (
          <tr
            key={index}
            className="hover:bg-gray-100 cursor-pointer"
            onClick={() => router.push("/store/" + store.name)}
          >
            <td className="align-middle whitespace-nowrap tabular-nums text-left pl-4 pr-4 pt-4 pb-4">
              {index + 1}
            </td>
            <td className="align-middle whitespace-nowrap tabular-nums text-left pl-4 pr-4 pt-4 pb-4">
              {store.name}
            </td>
            <td className="align-middle whitespace-nowrap tabular-nums text-left pl-4 pr-4 pt-4 pb-4">
              {store.orders}
            </td>
            <td className="align-middle whitespace-nowrap tabular-nums text-left pl-4 pr-4 pt-4 pb-4">
              {store.avgOrderTime}
            </td>
            <td className="align-middle whitespace-nowrap tabular-nums text-left pl-4 pr-4 pt-4 pb-4">
              {store.avgPickupTime}
            </td>
            <td className="align-middle whitespace-nowrap tabular-nums text-left pl-4 pr-4 pt-4 pb-4">
              {store.avgTotalTime}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StoresTable;
