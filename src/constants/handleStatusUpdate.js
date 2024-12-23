import axios from "axios";
import { toast } from "sonner";

export const handleStatusUpdate = async (value, id) => {
  const { data } = await axios.put(
    `http://localhost:5000/api/orders/handleStatus?id=${id}`,
    { status: value }
  );
  if (data) {
    toast(data.message);
  }
};
