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
import { handleStatusUpdate } from "../../constants/handleStatusUpdate";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";

const OrderPage = () => {
  const { id } = useParams();
  const [imageOpen, setImageOpen] = useState(false);

  const { data: { data: order } = {}, isLoading } = useQuery({
    queryKey: ["singleOrder", id],
    queryFn: () => {
      return request.get(`/orders/getOrderById?id=${id}`);
    },
  });
  if (isLoading) {
    return <div>Please wait...</div>;
  }
  return (
    <>
      <div className="orderPage [&_strong]:font-medium bg-slate-100 p-5">
        <div className="flex items-center justify-between">
          <p className="font-medium">Order Id: {order?.orderId}</p>
          <Select
            onValueChange={(value) =>
              handleStatusUpdate(value, order._id, order.products)
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={order?.status} />
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
        </div>
        <div className="grid grid-cols-[60%_40%] mt-5 gap-5">
          <div>
            <div className="bg-white p-5 rounded-md shadow-sm">
              <p className="font-medium mt-2">Products</p>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Image</TableHead>
                    <TableHead>Product Name</TableHead>
                    <TableHead>Color</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {order?.products?.map((product, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <img
                          src={product?.variant.image.url}
                          alt=""
                          onClick={() => setImageOpen(order?.product?.image)}
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        {product?.title}
                      </TableCell>
                      <TableCell>{product?.variant.color}</TableCell>
                      <TableCell>{product?.quantity}</TableCell>
                      <TableCell>BDT {product?.price}</TableCell>
                      <TableCell>
                        {product?.price * product?.quantity}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="bg-white p-5 rounded-md shadow-sm mt-5">
              <div className="flex items-center justify-between">
                <p className="font-medium">Product Totals</p>
                <p className="font-medium">Price</p>
              </div>
              <hr className="my-3" />
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium">Subtotal</p>
                <p>
                  <strong> BDT {order.subtotal}</strong>
                </p>
              </div>
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium">Shipping Charge</p>
                <p>
                  <strong>BDT {order?.shippingCharge}</strong>
                </p>
              </div>
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium">Total</p>
                <p>
                  <strong>BDT {order?.subtotal + order?.shippingCharge}</strong>
                </p>
              </div>
            </div>
          </div>
          <div>
            <div className="[&_strong]:font-medium">
              <div className="bg-white p-5 rounded-md shadow-sm">
                <h3 className="font-medium">Date Summary</h3>
                <hr className="my-3" />
                <div className="flex items-center justify-between mt-3 mb-2">
                  <p className="text-sm font-medium">Order Date</p>
                  <p>
                    <strong> {moment(order?.createdAt).format("lll")}</strong>
                  </p>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium">Updated Date</p>
                  <p>
                    <strong> {moment(order?.createdAt).format("lll")}</strong>
                  </p>
                </div>
              </div>
              <div className="bg-white p-5 rounded-md shadow-sm mt-5">
                <p className="font-medium mb-2">Customer Info</p>
                <hr className="my-3" />
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium">Customer Name</p>
                  <p>
                    <strong>{order?.customerName}</strong>
                  </p>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium">Customer Phone</p>
                  <p>
                    <strong>{order?.customerPhone}</strong>
                  </p>
                </div>
                {order.customerEmail && (
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium">Customer Email</p>
                    <p>
                      <strong>{order?.customerEmail}</strong>
                    </p>
                  </div>
                )}
              </div>
              <div className="bg-white p-5 rounded-md shadow-sm mt-5">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium">Payment Method</p>
                  <hr className="my-3" />
                  <p>
                    <strong>{order?.paymentMethod}</strong>
                  </p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-md shadow-sm mt-5">
                <p className="font-medium mb-2">Shipping Address</p>
                <hr className="my-3" />
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium">Shipping Division</p>
                  <p>
                    <strong>{order?.ShippingDivision}</strong>
                  </p>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium">Shipping District</p>
                  <p>
                    <strong>{order?.shippingDistrict}</strong>
                  </p>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium">Shipping Area</p>
                  <p>
                    <strong>{order?.shippingArea}</strong>
                  </p>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium">Shipping Charge</p>
                  <p>
                    <strong>BDT {order?.shippingCharge}</strong>
                  </p>
                </div>
              </div>
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
