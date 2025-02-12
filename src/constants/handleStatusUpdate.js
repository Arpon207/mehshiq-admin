import { toast } from "sonner";
import { request } from "../axios";

export const handleStatusUpdate = async (value, id, products) => {
  const { data } = await request.put(`/orders/handleStatus?id=${id}`, {
    status: value,
    products,
  });
  if (data) {
    toast(data.message);
  }
};
