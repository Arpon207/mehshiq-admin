import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const data = [
  { month: "Jan", revenue: 4000, profit: 2400 },
  { month: "Feb", revenue: 3000, profit: 1398 },
  { month: "Mar", revenue: 2000, profit: 9800 },
  { month: "Apr", revenue: 2780, profit: 3908 },
  { month: "May", revenue: 1890, profit: 4800 },
  { month: "Jun", revenue: 2390, profit: 3800 },
  { month: "Jul", revenue: 3490, profit: 4300 },
  { month: "Aug", revenue: 2490, profit: 4300 },
  { month: "Sep", revenue: 2490, profit: 4300 },
  { month: "Oct", revenue: 2490, profit: 4300 },
  { month: "Nov", revenue: 2490, profit: 4300 },
  { month: "Dec", revenue: 2490, profit: 4300 },
];

export function RevenueChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-medium">Revenue</CardTitle>
        <div className="flex gap-6">
          <div>
            <p className="text-sm text-muted-foreground">Revenue</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold">$37,802</span>
              <span className="text-sm text-green-500">↑ 0.56%</span>
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Profit</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold">$28,305</span>
              <span className="text-sm text-green-500">↑ 0.56%</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <XAxis
                dataKey="month"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value}`}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.3}
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="profit"
                stroke="#82ca9d"
                fill="#82ca9d"
                fillOpacity={0.3}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
