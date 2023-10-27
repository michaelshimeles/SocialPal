
import { useState } from "react"
import CountUp from "react-countup"
import { BarChart, Text, Metric } from "@tremor/react"

const dataFormatter = (number: number) => {
  return Intl.NumberFormat("us").format(number).toString() + "bpm";
};

interface ChartDataItem {
  date: string;
  Running: number;
  Cycling: number;
}

const chartdata: ChartDataItem[] = [
  {
    date: "Jan 23",
    Running: 167,
    Cycling: 145,
  },
  {
    date: "Feb 23",
    Running: 125,
    Cycling: 110,
  },
  {
    date: "Mar 23",
    Running: 156,
    Cycling: 149,
  },
  {
    date: "Apr 23",
    Running: 165,
    Cycling: 112,
  },
  {
    date: "May 23",
    Running: 153,
    Cycling: 138,
  },
  {
    date: "Jun 23",
    Running: 124,
    Cycling: 145,
  },
  {
    date: "Jul 23",
    Running: 164,
    Cycling: 134,
  },
  {
    date: "Aug 23",
    Running: 123,
    Cycling: 110,
  },
  {
    date: "Sep 23",
    Running: 132,
    Cycling: 113,
  },
];

const categories = ["Running", "Cycling"]
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
      <Text>Average BPM</Text>
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