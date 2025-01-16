import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const data = [
  { month: "Jan", revenue: 4000 },
  { month: "Feb", revenue: 6000 },
  { month: "Mar", revenue: 2000 },
  { month: "Apr", revenue: 4000 },
  { month: "May", revenue: 6000 },
  { month: "Jun", revenue: 4000 },
  { month: "Jul", revenue: 8000 },
  { month: "Aug", revenue: 3000 },
];

export function TotalOrders() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium">Earnings</CardTitle>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold">$37,802</span>
            <span className="text-xs text-green-500">↑ 0.56%</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold">$28,305</span>
            <span className="text-xs text-green-500">↑ 0.56%</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="month" />
              <YAxis />
              <Bar dataKey="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
