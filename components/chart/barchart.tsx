
import { useState } from "react"
import CountUp from "react-countup"
import { BarChart, Text, Metric } from "@tremor/react"

const dataFormatter = (number: number) => {
  return Intl.NumberFormat("us").format(number).toString();
};

interface ChartDataItem {
  date: string;
  TikTok: number;
  Instagram: number;
}

const chartdata: ChartDataItem[] = [
  {
    date: "Jan 23",
    TikTok: 167,
    Instagram: 145,
  },
  {
    date: "Feb 23",
    TikTok: 125,
    Instagram: 110,
  },
  {
    date: "Mar 23",
    TikTok: 156,
    Instagram: 149,
  },
  {
    date: "Apr 23",
    TikTok: 165,
    Instagram: 112,
  },
  {
    date: "May 23",
    TikTok: 153,
    Instagram: 138,
  },
  {
    date: "Jun 23",
    TikTok: 124,
    Instagram: 145,
  },
  {
    date: "Jul 23",
    TikTok: 164,
    Instagram: 134,
  },
  {
    date: "Aug 23",
    TikTok: 123,
    Instagram: 110,
  },
  {
    date: "Sep 23",
    TikTok: 132,
    Instagram: 113,
  },
];

const categories = ["TikTok", "Instagram"]
const initialAverageValue = chartdata.reduce((sum, dataPoint: any) => {
  categories.forEach(category => {
    sum += dataPoint[category];
  });
  return sum;
}, 0) / (chartdata.length * categories.length);

export default function Home() {
  const [values, setValues] = useState({
    start: 0,
    end: initialAverageValue
  })
  return (
    <div className="border light:border-gray-200 dark:border-white-700 p-7 rounded-md">
      <Text>Average Follower Growth (monthly)</Text>
      <Metric className="font-bold">
        <CountUp
          start={values.start}
          end={values.end}
          duration={0.8}
        />
      </Metric>
      <BarChart
        className="hidden sm:block mt-6 h-72"
        data={chartdata}
        index="date"
        categories={categories}
        colors={["blue", "indigo"]}
        valueFormatter={dataFormatter}
        yAxisWidth={60}
        onValueChange={(v: any) => {
          switch (v?.eventType) {
            case 'bar':
              setValues((prev) => ({
                start: prev.end,
                end: v[v.categoryClicked]
              }))
              break;
            case 'category':
              const averageCategoryValue = chartdata.reduce((sum, dataPoint: any) => sum + dataPoint[v.categoryClicked], 0) / chartdata.length;

              setValues((prev) => ({
                start: prev.end,
                end: averageCategoryValue
              }))
              break;
            default:
              setValues((prev) => ({
                start: prev.end,
                end: initialAverageValue
              }))
              break;
          }
        }}
      />
    </div>
  )
}