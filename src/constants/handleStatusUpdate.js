import { toast } from "sonner";
import { request } from "../axios";

export const handleStatusUpdate = async (value, id) => {
  const { data } = await request.put(`/orders/handleStatus?id=${id}`, {
    status: value,
  });
  if (data) {
    toast(data.message);
  }
};
