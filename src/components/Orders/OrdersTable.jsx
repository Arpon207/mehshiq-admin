import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { request } from "../../axios";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { Ellipsis } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import moment from "moment/moment";
import { useNavigate } from "react-router-dom";
import { handleStatusUpdate } from "../../Hooks/handleStatusUpdate";

const OrdersTable = ({ showDateBar, showStatusUpdateDateBar, showTotal }) => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const getOrders = async () => {
    const { data } = await request.get("http://localhost:5000/api/orders/all");
    setOrders(data);
  };

  useEffect(() => {
    getOrders();
  }, []);
  return (
    <div className="OrdersTable mt-5">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Order Id</TableHead>
            <TableHead>Customer Name</TableHead>
            <TableHead>Customer Number</TableHead>
            {showDateBar && <TableHead>Date</TableHead>}
            <TableHead>Status Update Date</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders?.map((order, index) => (
            <TableRow
              key={index}
              onClick={() => navigate(`/orders/${order._id}`)}
              className="cursor-pointer"
            >
              <TableCell>{order?.orderId}</TableCell>
              <TableCell className="font-medium">
                {order?.customerName}
              </TableCell>
              <TableCell>+880{order.customerPhone}</TableCell>
              {showDateBar && (
                <TableCell>{moment(order?.createdAt).format("lll")}</TableCell>
              )}
              <TableCell>
                {order?.createdAt === order?.updatedAt
                  ? "---"
                  : moment(order?.updatedAt).format("lll")}
              </TableCell>
              <TableCell>BDT {order.subtotal}</TableCell>
              <TableCell>
                <Select
                  onValueChange={(value) =>
                    handleStatusUpdate(value, order._id)
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
                        disabled={order.status === "Cancel"}
                        value="Cancel"
                      >
                        Cancel
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
