import axios from "axios";
import { toast } from "sonner";

export const handleStatusUpdate = async (value, id) => {
  const { data } = await axios.put(`/orders/handleStatus?id=${id}`, {
    status: value,
  });
  if (data) {
    toast(data.message);
  }
};
