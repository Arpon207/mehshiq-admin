import {
  Table,
  TableBody,
  TableCaption,
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
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { request } from "../../axios";
import { X } from "lucide-react";

const OrderPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState([]);
  const [imageOpen, setImageOpen] = useState(false);

  const getOrder = async () => {
    const { data } = await request.get(
      `http://localhost:5000/api/orders/getOrderById?id=${id}`
    );
    setOrder(data);
  };

  useEffect(() => {
    getOrder();
  }, []);
  return (
    <>
      <div className="orderPage [&_strong]:font-medium">
        <div className="flex items-center justify-between">
          <p className="font-medium">Order Id: {order?.orderId}</p>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={order?.status} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Confirmed">Confirmed</SelectItem>
                <SelectItem value="Shipped">Shipped</SelectItem>
                <SelectItem value="Delivered">Delivered</SelectItem>
                <SelectItem value="Cancel">Cancel</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <p className="font-medium mt-2">Products</p>
        <div className="bg-slate-100 mt-2 p-5">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Variant</TableHead>
                <TableHead>Product Name</TableHead>
                <TableHead>Color</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order?.products?.map((order, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <img
                      src={order.variant.image.url}
                      alt=""
                      onClick={() => setImageOpen(order.variant.image.url)}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{order?.title}</TableCell>
                  <TableCell>{order.variant.color}</TableCell>
                  <TableCell>{order.quantity}</TableCell>
                  <TableCell>BDT {order.price}</TableCell>
                  <TableCell>{order.price * order.quantity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex items-end flex-col">
            <p>
              Subtotal : <strong> BDT {order?.subtotal}</strong>
            </p>
            <p>
              Shipping Charge : <strong>BDT {order?.shippingCharge}</strong>
            </p>
            <p>
              Total :{" "}
              <strong>BDT {order.subtotal + order.shippingCharge}</strong>
            </p>
          </div>
        </div>
        <div className="bg-slate-100 mt-5 p-5 [&_strong]:font-medium">
          <div className="grid grid-cols-2">
            <div>
              <p className="font-medium mb-2">Customer Info</p>
              <p>
                Customer Name : <strong>{order?.customerName}</strong>
              </p>
              {order?.customerEmail && (
                <p>
                  Customer Email : <strong>{order?.customerEmail}</strong>
                </p>
              )}
              <p>
                Customer Phone : <strong>+880{order?.customerPhone}</strong>
              </p>
            </div>
            <div>
              <p className="font-medium mb-2">Shipping</p>
              <p>
                Shipping Division : <strong>{order?.ShippingDivision}</strong>
              </p>
              <p>
                Shipping District : <strong>{order?.shippingDistrict}</strong>
              </p>
              <p>
                Shipping area : <strong>{order?.shippingArea}</strong>
              </p>
              <p>
                Shipping Charge : <strong>BDT {order?.shippingCharge}</strong>
              </p>
              <p>
                Payment Method : <strong>{order?.paymentMethod}</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
      {imageOpen && (
        <div className="fixed h-[100vh] w-[100vw] top-0 left-0 z-50 bg-[rgba(0,0,0,0.5)] flex items-center justify-center">
          <button
            onClick={() => setImageOpen("")}
            className="text-white absolute right-20 top-20"
          >
            <X />
          </button>
          <img src={imageOpen} alt="" className="h-[80%]" />
        </div>
      )}
    </>
  );
};

export default OrderPage;
