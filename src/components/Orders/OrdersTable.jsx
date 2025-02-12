import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import moment from "moment/moment";
import { useNavigate } from "react-router-dom";
import { handleStatusUpdate } from "../../constants/handleStatusUpdate";
import Loading from "./OrderLoading";

const OrdersTable = ({
  showStatusUpdateDateBar,
  isLoading,
  orders,
  isFetching,
}) => {
  const navigate = useNavigate();

  if (isLoading || isFetching) {
    return <Loading />;
  }

  return (
    <div className="OrdersTable mt-5 h-[calc(100vh-200px)] overflow-y-scroll">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Order Id</TableHead>
            <TableHead>Customer Name</TableHead>
            <TableHead>Customer Number</TableHead>
            <TableHead>Date</TableHead>
            {showStatusUpdateDateBar && (
              <TableHead>Status Update Date</TableHead>
            )}
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders?.map((order, index) => (
            <TableRow
              key={index}
              onClick={() => navigate(`/orders/${order._id}`)}
              className={`cursor-pointer`}
            >
              <TableCell>{order?.orderId}</TableCell>
              <TableCell className="font-medium">
                {order?.customerName}
              </TableCell>
              <TableCell>{order.customerPhone}</TableCell>
              <TableCell>{moment(order?.createdAt).format("lll")}</TableCell>
              {showStatusUpdateDateBar && (
                <TableCell>
                  {order?.createdAt === order?.updatedAt
                    ? "---"
                    : moment(order?.updatedAt).format("lll")}
                </TableCell>
              )}

              <TableCell>BDT {order.subtotal}</TableCell>
              <TableCell>
                <Select
                  onValueChange={(value) =>
                    handleStatusUpdate(value, order._id, order.products)
                  }
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder={order.status} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem
                        disabled={order.status === "Confirmed"}
                        value="Confirmed"
                      >
                        Confirmed
                      </SelectItem>
                      <SelectItem
                        disabled={order.status === "Shipped"}
                        value="Shipped"
                      >
                        Shipped
                      </SelectItem>
                      <SelectItem
                        disabled={order.status === "Delivered"}
                        value="Delivered"
                      >
                        Delivered
                      </SelectItem>
                      <SelectItem
                        disabled={order.status === "Canceled"}
                        value="Canceled"
                      >
                        Canceled
                      </SelectItem>
                      <SelectItem
                        disabled={order.status === "Returned"}
                        value="Returned"
                      >
                        Returned
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrdersTable;
