import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart } from "@/components/ui/line-chart";
import { Receipt, DollarSign, ShoppingCart, Users } from "lucide-react";

const metrics = [
  {
    title: "Total Sales",
    value: "34,945",
    change: "+1.56%",
    icon: Receipt,
    color: "text-green-500",
    chart: {
      data: [10, 20, 30, 25, 35, 30, 40],
      color: "#22c55e",
    },
  },
  {
    title: "Total Income",
    value: "$37,802",
    change: "-1.56%",
    icon: DollarSign,
    color: "text-orange-500",
    chart: {
      data: [40, 30, 25, 35, 30, 35, 40],
      color: "#f97316",
    },
  },
  {
    title: "Orders Paid",
    value: "34,945",
    change: "0.00%",
    icon: ShoppingCart,
    color: "text-gray-500",
    chart: {
      data: [30, 35, 25, 30, 35, 30, 35],
      color: "#6b7280",
    },
  },
  {
    title: "Total Visitor",
    value: "34,945",
    change: "+1.56%",
    icon: Users,
    color: "text-blue-500",
    chart: {
      data: [25, 30, 35, 30, 35, 40, 35],
      color: "#3b82f6",
    },
  },
];

export function MetricCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => {
        const Icon = metric.icon;
        return (
          <Card key={metric.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.title}
              </CardTitle>
              <Icon className={`h-4 w-4 ${metric.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <div
                className={`text-xs ${
                  metric.change.startsWith("+")
                    ? "text-green-500"
                    : metric.change.startsWith("-")
                    ? "text-red-500"
                    : "text-gray-500"
                }`}
              >
                {metric.change}
              </div>
              <div className="h-[40px] mt-3">
                <LineChart
                  data={metric.chart.data}
                  color={metric.chart.color}
                  className="h-full w-full"
                />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
