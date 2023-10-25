import { Card, LineChart, Title } from "@tremor/react";

const chartdata = [
  {
    month: "Jan 2023",
    "Instagram": 1782,
    "Tiktok": 1500,
  },
  {
    month: "Feb 2023",
    "Instagram": 1820,
    "Tiktok": 2000,
  },
  {
    month: "Mar 2023",
    "Instagram": 1845,
    "Tiktok": 2750,
  },
  {
    month: "Apr 2023",
    "Instagram": 1894,
    "Tiktok": 3340,
  },
  {
    month: "May 2023",
    "Instagram": 1945,
    "Tiktok": 4500,
  },
  //...
];

// const valueFormatter = (number: any) => `$ ${new Intl.NumberFormat("us").format(number).toString()}`;

const LineChartComponent = () => (
  <Card>
    <Title>Follower Growth</Title>
    <LineChart
      className="mt-6"
      data={chartdata}
      index="month"
      categories={["Instagram", "Tiktok"]}
      colors={["emerald", "gray"]}
    //   valueFormatter={valueFormatter}
      yAxisWidth={40}
    />
  </Card>
);

export default LineChartComponent;
