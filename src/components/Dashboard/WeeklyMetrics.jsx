import { Card, CardContent } from "@/components/ui/card";
import { Receipt, DollarSign, Users } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis } from "recharts";
import { Context } from "../../Providers/AdminContext";

export function WeeklyMetrics() {
  const { salesData } = useContext(Context);

  const [totalSales, setTotalSales] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);

  // const [totalChartData, setTotalChartData] = useState([]);
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  useEffect(() => {
    const total = salesData.reduce((sum, day) => sum + day.totalSales, 0);
    setTotalSales(total);
    const orders = salesData.reduce((sum, day) => sum + day.totalOrders, 0);
    setTotalOrders(orders);

    // setTotalChartData(chartData);
  }, [salesData]);

  const totalSalesData = days.map((dayLabel, index) => {
    const matchingData = salesData?.find((d) => d._id.dayOfWeek === index + 1); // Map dayOfWeek to labels
    return matchingData ? matchingData.totalSales : 0;
  });

  const totalOrdersData = days.map((dayLabel, index) => {
    const matchingData = salesData?.find((d) => d._id.dayOfWeek === index + 1); // Map dayOfWeek to labels
    return matchingData ? matchingData.totalOrders : 0;
  });

  const metrics = [
    {
      title: "Total Sales",
      value: totalSales,
      icon: Receipt,
      color: "text-green-500",
      data: totalSalesData,
    },
    {
      title: "Total Income",
      value: "$37,802",
      change: "-1.56%",
      icon: DollarSign,
      color: "text-orange-500",
      data: [35, 45, 55, 50, 40, 35, 30],
    },
    {
      title: "Total Visitor",
      value: "34,945",
      change: "+1.56%",
      icon: Users,
      color: "text-blue-500",
      data: [30, 40, 50, 45, 55, 40, 35],
    },
    {
      title: "Total Orders",
      value: totalOrders,
      change: "+1.56%",
      icon: Users,
      color: "text-blue-500",
      data: totalOrdersData,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-4">
      {metrics.map((metric) => {
        const Icon = metric.icon;
        return (
          <Card key={metric.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {metric.title}
                  </p>
                  <h3 className="text-2xl font-bold">{metric.value}</h3>
                </div>
                <Icon className={`h-5 w-5 ${metric.color}`} />
              </div>
              <div className="h-[60px] mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={metric.data.map((value, i) => ({
                      value,
                      day: days[i],
                    }))}
                  >
                    <XAxis
                      dataKey="day"
                      tickLine={false}
                      axisLine={false}
                      fontSize={12}
                    />
                    <Bar
                      dataKey="value"
                      fill="currentColor"
                      className={metric.color}
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
