import { useRouter } from "next/router";
import Card from "@/components/card";
import dynamic from "next/dynamic";
import axios from "axios";
import { useEffect, useState } from "react";
import StoreTable from "@/components/table/store";

const Layout = dynamic(() => import("../../components/layout"));

export type Store = {
  arrivalTime: string;
  orderTime: number;
  pickupTime: number;
  totalTime: number;
};

export type Query = {
  page: number;
  sortBy: string;
  desc: number;
};

const Store = () => {
  const router = useRouter();
  const [data, setData] = useState<Store[]>([]);
  const [count, setCount] = useState(0);
  const [query, setQuery] = useState<Query>({
    page: 0,
    sortBy: "arrivalTime",
    desc: 1,
  });

  const fetchStore = async () => {
    axios
      .get(
        `/api/stores/${router.query.store}?page=${query.page}&sortBy=${query.sortBy}&desc=${query.desc}`
      )
      .then((res) => {
        setData(res.data.data);
        setCount(res.data.count);
      });
  };

  useEffect(() => {
    if (router.query.store) {
      fetchStore();
    }
  }, [query, router.query.store]);

  return (
    <Layout>
      <div className="text-gray-700 text-lg font-medium">
        Store {router.query.store} Details
      </div>
      <div className="text-gray-500 text-sm font-normal">Store Detail View</div>
      <Card className="mt-6">
        <StoreTable
          data={data}
          count={count}
          query={query}
          setQuery={setQuery}
        />
      </Card>
    </Layout>
  );
};

export default Store;
