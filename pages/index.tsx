import Card from "@/components/card";
import dynamic from "next/dynamic";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { GetServerSideProps, NextPage } from "next";
import axios from "axios";

const Layout = dynamic(() => import("../components/layout"));

type Data = {
  name: string;
  orders: {
    label: string;
    count: number;
    orderTime: number;
    pickupTime: number;
    totalTime: number;
  }[];
};

const Main: NextPage<{
  data: Data[];
  orders: { total: number; store: { name: string; value: number }[] };
}> = ({ data, orders }) => {
  const orderSplineOptions = {
    chart: {
      type: "spline",
      scrollablePlotArea: {
        minWidth: 600,
        scrollPositionX: 1,
      },
    },
    title: {
      text: "Order Amount by time",
      align: "left",
    },
    subtitle: {
      text: "Each store order amount per hour",
      align: "left",
    },
    xAxis: {
      categories: [
        "12:00 pm",
        "1:00 am",
        "2:00 am",
        "3:00 am",
        "4:00 am",
        "5:00 am",
        "6:00 am",
        "7:00 am",
        "8:00 am",
        "9:00 am",
        "10:00 am",
        "11:00 am",
        "12:00 am",
        "1:00 pm",
        "2:00 pm",
        "3:00 pm",
        "4:00 pm",
        "5:00 pm",
        "6:00 pm",
        "7:00 pm",
        "8:00 pm",
        "9:00 pm",
        "10:00 pm",
        "11:00 pm",
      ],
    },
    yAxis: {
      title: {
        text: "Order amount (/h)",
      },
    },
    plotOptions: {
      spline: {
        marker: {
          enabled: false,
        },
      },
    },
    tooltip: {
      valueSuffix: " orders",
    },
    series: data.map((d) => ({
      name: d.name,
      data: d.orders.map((dd) => dd.count),
    })),
  };

  const orderTimeOptions = {
    chart: {
      type: "spline",
    },
    title: {
      text: "Order Time Comparison",
      align: "left",
    },
    xAxis: {
      categories: [
        "12:00 pm",
        "1:00 am",
        "2:00 am",
        "3:00 am",
        "4:00 am",
        "5:00 am",
        "6:00 am",
        "7:00 am",
        "8:00 am",
        "9:00 am",
        "10:00 am",
        "11:00 am",
        "12:00 am",
        "1:00 pm",
        "2:00 pm",
        "3:00 pm",
        "4:00 pm",
        "5:00 pm",
        "6:00 pm",
        "7:00 pm",
        "8:00 pm",
        "9:00 pm",
        "10:00 pm",
        "11:00 pm",
      ],
    },
    plotOptions: {
      spline: {
        marker: {
          enabled: false,
        },
      },
    },
    series: data.map((d) => ({
      name: d.name,
      data: d.orders.map((d) => Math.round(d.orderTime / (d.count || 1))),
      fillOpacity: 0.2,
    })),
  };

  const pickupTimeOptions = {
    chart: {
      type: "spline",
    },
    title: {
      text: "Pickup Time Comparison",
      align: "left",
    },
    xAxis: {
      categories: [
        "12:00 pm",
        "1:00 am",
        "2:00 am",
        "3:00 am",
        "4:00 am",
        "5:00 am",
        "6:00 am",
        "7:00 am",
        "8:00 am",
        "9:00 am",
        "10:00 am",
        "11:00 am",
        "12:00 am",
        "1:00 pm",
        "2:00 pm",
        "3:00 pm",
        "4:00 pm",
        "5:00 pm",
        "6:00 pm",
        "7:00 pm",
        "8:00 pm",
        "9:00 pm",
        "10:00 pm",
        "11:00 pm",
      ],
    },
    plotOptions: {
      spline: {
        marker: {
          enabled: false,
        },
      },
    },
    series: data.map((d) => ({
      name: d.name,
      data: d.orders.map((d) => Math.round(d.pickupTime / (d.count || 1))),
      fillOpacity: 0.2,
    })),
  };

  const totalTimeOptions = {
    chart: {
      type: "spline",
    },
    title: {
      text: "Total Time Comparison",
      align: "left",
    },
    xAxis: {
      categories: [
        "12:00 pm",
        "1:00 am",
        "2:00 am",
        "3:00 am",
        "4:00 am",
        "5:00 am",
        "6:00 am",
        "7:00 am",
        "8:00 am",
        "9:00 am",
        "10:00 am",
        "11:00 am",
        "12:00 am",
        "1:00 pm",
        "2:00 pm",
        "3:00 pm",
        "4:00 pm",
        "5:00 pm",
        "6:00 pm",
        "7:00 pm",
        "8:00 pm",
        "9:00 pm",
        "10:00 pm",
        "11:00 pm",
      ],
    },
    plotOptions: {
      spline: {
        marker: {
          enabled: false,
        },
      },
    },
    series: data.map((d) => ({
      name: d.name,
      data: d.orders.map((d) => Math.round(d.totalTime / (d.count || 1))),
      fillOpacity: 0.2,
    })),
  };

  const orderBarOptions = {
    chart: {
      type: "bar",
    },
    title: {
      text: "Store Total Orders",
    },
    subtitle: {
      text: "Comparion with order amount",
    },
    xAxis: {
      categories: ["Orders"],
      title: {
        text: null,
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: "Order Amount",
        align: "high",
      },
      labels: {
        overflow: "justify",
      },
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: false,
        },
      },
    },
    series: orders.store.map((order) => ({
      name: order.name,
      data: [order.value],
    })),
  };

  const orderPieOptions = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "pie",
    },
    title: {
      text: "Store Total Orders py percent",
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b>: {point.percentage:.1f} %",
        },
      },
    },
    series: [
      {
        name: "Orders",
        colorByPoint: true,
        data: orders.store.map((order) => ({
          name: order.name,
          y: (order.value * 100) / orders.total,
        })),
      },
    ],
  };

  return (
    <Layout>
      <div className="text-gray-700 text-lg font-medium">Dashboard</div>
      <div className="text-gray-500 text-sm font-normal">
        Store Analytics System
      </div>
      <div className="grid sm:grid-cols-4 grid-cols-1 gap-4 mt-6">
        <Card>
          <div className="flex w-full justify-between items-start mt-0">
            <p className="text-elem shrink-0 mt-0 text-left text-gray-500 text-sm font-normal">
              Total Stores
            </p>
          </div>
          <div className="flex w-full truncate whitespace-nowrap justify-start items-baseline space-x-3 mt-0">
            <div className="mt-0">
              <p className="shrink-0 text-left text-gray-700 text-3xl font-semibold">
                {data.length}
              </p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex w-full justify-between items-start mt-0">
            <p className="text-elem shrink-0 mt-0 text-left text-gray-500 text-sm font-normal">
              Total Orders
            </p>
          </div>
          <div className="flex w-full truncate whitespace-nowrap justify-start items-baseline space-x-3 mt-0">
            <div className="mt-0">
              <p className="shrink-0 text-left text-gray-700 text-3xl font-semibold">
                {orders.total}
              </p>
            </div>
            <p className="text-elem truncate whitespace-nowrap mt-0 text-left text-gray-500 text-sm font-normal">
              Avg {Math.round(orders.total / data.length)}
            </p>
          </div>
        </Card>
      </div>
      <Card className="mt-6 flex gap-2">
        <HighchartsReact highcharts={Highcharts} options={orderBarOptions} />
        <HighchartsReact highcharts={Highcharts} options={orderPieOptions} />
      </Card>
      <Card className="mt-6">
        <HighchartsReact highcharts={Highcharts} options={orderSplineOptions} />
      </Card>
      <Card className="mt-6">
        <HighchartsReact highcharts={Highcharts} options={orderTimeOptions} />
      </Card>
      <Card className="mt-6">
        <HighchartsReact highcharts={Highcharts} options={pickupTimeOptions} />
      </Card>
      <Card className="mt-6">
        <HighchartsReact highcharts={Highcharts} options={totalTimeOptions} />
      </Card>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await axios.get(`${process.env.server}/api/analytics`);
  const stores = res.data.map((store: any[]) =>
    store.map((row) => {
      let time = -1;
      if (row["Arrival Time"]) {
        const am = row["Arrival Time"].split(" ")[1] == "AM";
        const [h, m, s] = row["Arrival Time"]
          .split(" ")[0]
          .split(":")
          .map((v: string) => parseInt(v));
        if (am) {
          time = s + 60 * m + 3600 * h;
        } else {
          time = s + 60 * m + 3600 * h;
          if (h !== 12) time += 3600 * h;
        }
      }
      return {
        name: row.Store,
        arrivalTime: row["Arrival Time"],
        orderTime:
          !row["Order Time"] || isNaN(row["Order Time"])
            ? 0
            : parseInt(row["Order Time"]),
        pickupTime:
          !row["Pickup Time"] || isNaN(row["Pickup Time"])
            ? 0
            : parseInt(row["Pickup Time"]),
        totalTime:
          !row["Total Time"] || isNaN(row["Total Time"])
            ? 0
            : parseInt(row["Total Time"]),
        time,
      };
    })
  );

  let orders: any = { total: 0, store: [] };
  let data = [];
  for (const store of stores) {
    data.push({
      name: store[0].name,
      orders: [
        {
          label: "1 am",
          count: 0,
          orderTime: 0,
          pickupTime: 0,
          totalTime: 0,
        },
        { label: "2 am", count: 0, orderTime: 0, pickupTime: 0, totalTime: 0 },
        { label: "3 am", count: 0, orderTime: 0, pickupTime: 0, totalTime: 0 },
        { label: "4 am", count: 0, orderTime: 0, pickupTime: 0, totalTime: 0 },
        { label: "5 am", count: 0, orderTime: 0, pickupTime: 0, totalTime: 0 },
        { label: "6 am", count: 0, orderTime: 0, pickupTime: 0, totalTime: 0 },
        { label: "7 am", count: 0, orderTime: 0, pickupTime: 0, totalTime: 0 },
        { label: "8 am", count: 0, orderTime: 0, pickupTime: 0, totalTime: 0 },
        { label: "9 am", count: 0, orderTime: 0, pickupTime: 0, totalTime: 0 },
        {
          label: "10 am",
          count: 0,
          orderTime: 0,
          pickupTime: 0,
          totalTime: 0,
        },
        {
          label: "11 am",
          count: 0,
          orderTime: 0,
          pickupTime: 0,
          totalTime: 0,
        },
        {
          label: "12 pm",
          count: 0,
          orderTime: 0,
          pickupTime: 0,
          totalTime: 0,
        },
        { label: "1 pm", count: 0, orderTime: 0, pickupTime: 0, totalTime: 0 },
        { label: "2 pm", count: 0, orderTime: 0, pickupTime: 0, totalTime: 0 },
        { label: "3 pm", count: 0, orderTime: 0, pickupTime: 0, totalTime: 0 },
        { label: "4 pm", count: 0, orderTime: 0, pickupTime: 0, totalTime: 0 },
        { label: "5 pm", count: 0, orderTime: 0, pickupTime: 0, totalTime: 0 },
        { label: "6 pm", count: 0, orderTime: 0, pickupTime: 0, totalTime: 0 },
        { label: "7 pm", count: 0, orderTime: 0, pickupTime: 0, totalTime: 0 },
        { label: "8 pm", count: 0, orderTime: 0, pickupTime: 0, totalTime: 0 },
        { label: "9 pm", count: 0, orderTime: 0, pickupTime: 0, totalTime: 0 },
        {
          label: "10 pm",
          count: 0,
          orderTime: 0,
          pickupTime: 0,
          totalTime: 0,
        },
        {
          label: "11 pm",
          count: 0,
          orderTime: 0,
          pickupTime: 0,
          totalTime: 0,
        },
        {
          label: "12 am",
          count: 0,
          orderTime: 0,
          pickupTime: 0,
          totalTime: 0,
        },
      ],
    });
    orders.total += store.length;
    orders.store.push({ name: store[0].name, value: store.length });
    for (const row of store) {
      data[data.length - 1].orders[Math.floor(row.time / 3600)].count++;
      if (row.time > 0) {
        data[data.length - 1].orders[Math.floor(row.time / 3600)].orderTime +=
          row.orderTime;
        data[data.length - 1].orders[Math.floor(row.time / 3600)].pickupTime +=
          row.pickupTime;
        data[data.length - 1].orders[Math.floor(row.time / 3600)].totalTime +=
          row.totalTime;
      }
    }
  }
  return { props: { data, orders } };
};

export default Main;
