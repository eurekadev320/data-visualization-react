import Card from "@/components/card";
import StoresTable, { Stores } from "@/components/table/stores";
import axios from "axios";
import { GetServerSideProps, NextPage } from "next";
import dynamic from "next/dynamic";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Papa from "papaparse";

const Layout = dynamic(() => import("../../components/layout"));

const Store: NextPage<{ stores: Stores[] }> = ({ stores }) => {
  const totalOrders = stores.reduce((t, s) => {
    t += s.orders;
    return t;
  }, 0);
  const averageOptions = {
    chart: {
      type: "column",
    },
    title: {
      text: "Store average level",
    },
    subtitle: {
      text: "Comparion with order, pickup and total Time",
    },
    xAxis: {
      categories: ["Average Level"],
      crosshair: true,
    },
    yAxis: {
      min: 0,
      title: {
        text: "Time",
      },
    },
    plotOptions: {
      column: {
        stacking: "normal",
        pointPadding: 0.2,
        borderWidth: 0,
      },
    },
    series: [
      ...stores.map((s) => ({
        name: s.name + ": Extra Time",
        data: [s.avgTotalTime - s.avgOrderTime - s.avgPickupTime],
        stack: s.name,
      })),
      ...stores.map((s) => ({
        name: s.name + ": Pickup Time",
        data: [s.avgPickupTime],
        stack: s.name,
      })),
      ...stores.map((s) => ({
        name: s.name + ": Order Time",
        data: [s.avgOrderTime],
        stack: s.name,
      })),
    ],
  };

  return (
    <Layout>
      <div className="text-gray-700 text-lg font-medium">Stores</div>
      <div className="text-gray-500 text-sm font-normal">A list of Stores</div>
      <Card className="mt-6">
        <StoresTable stores={stores} />
      </Card>
      <Card className="mt-6">
        <HighchartsReact highcharts={Highcharts} options={averageOptions} />
      </Card>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await axios.get(`${process.env.server}/api/stores`);
  return { props: { stores: res.data } };
};

export default Store;
