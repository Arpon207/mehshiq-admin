import { Card, CardContent } from "@/components/ui/card";
import { Receipt, DollarSign, Users } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, XAxis } from "recharts";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const metrics = [
  {
    title: "Total Sales",
    value: "34,945",
    change: "+1.56%",
    icon: Receipt,
    color: "text-green-500",
    data: [40, 50, 60, 45, 35, 30, 25],
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
    value: "34,945",
    change: "+1.56%",
    icon: Users,
    color: "text-blue-500",
    data: [30, 40, 50, 45, 55, 40, 35],
  },
];

export function WeeklyMetrics() {
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
                  <p
                    className={`text-sm ${
                      metric.change.startsWith("+")
                        ? "text-green-500"
                        : metric.change.startsWith("-")
                        ? "text-red-500"
                        : ""
                    }`}
                  >
                    {metric.change}
                  </p>
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
