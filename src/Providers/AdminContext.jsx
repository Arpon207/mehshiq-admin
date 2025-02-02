import { useQuery } from "@tanstack/react-query";
import { createContext } from "react";
import { toast } from "sonner";
import { request } from "../axios";

export const Context = createContext();

const AdminContext = ({ children }) => {
  const {
    data: { data: orders } = {},
    isLoading: isOrderLoading,
    refetch: orderRefetch,
    isFetching: isOrderFetching,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: () => {
      return request.get("/orders/all");
    },
  });

  const { data: { data } = {} } = useQuery({
    queryKey: ["dashboardMetrics"],
    queryFn: () => {
      return request.get("/orders/dashboard-metrics");
    },
  });

  const values = {
    orders,
    isOrderLoading,
    orderRefetch,
    isOrderFetching,
  };

  return <Context.Provider value={values}>{children}</Context.Provider>;
};

export default AdminContext;
