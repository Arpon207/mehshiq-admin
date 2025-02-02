import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useContext } from "react";
import { Context } from "../../Providers/AdminContext";
import moment from "moment/moment";
import { Skeleton } from "@/components/ui/skeleton";

export function RecentOrders() {
  const { orders, isOrderLoading } = useContext(Context);
  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base font-medium">Recent orders</CardTitle>
          <span className="text-sm text-muted-foreground hover:underline cursor-pointer">
            View all
          </span>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer Name</TableHead>
                <TableHead>Customer Number</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            {isOrderLoading ? (
              <TableBody>
                {[1, 2, 3, 4, 5]?.map((number, index) => (
                  <TableRow key={index} className="cursor-pointer">
                    {[1, 2, 3, 4, 5, 6, 7].map((number, index) => (
                      <TableCell key={index}>
                        <Skeleton className="h-5 w-full rounded-full" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            ) : (
              <TableBody>
                {orders?.slice(0, 5)?.map((order, index) => (
                  <TableRow key={index}>
                    <TableCell>{order?.orderId}</TableCell>
                    <TableCell>{order?.customerName}</TableCell>
                    <TableCell>{order?.customerPhone}</TableCell>
                    <TableCell>
                      {moment(order?.createdAt).format("lll")}
                    </TableCell>
                    <TableCell>{order.subtotal}</TableCell>
                    <TableCell>
                      <Badge variant="success">{order.status}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
