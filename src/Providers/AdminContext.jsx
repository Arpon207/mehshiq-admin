import { useQuery } from "@tanstack/react-query";
import { createContext, useState } from "react";
import { request } from "../axios";

export const Context = createContext();

const AdminContext = ({ children }) => {
  const [orderFilter, setOrderFilter] = useState("All");
  const [orderId, setOrderId] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [phone, setPhone] = useState("");
  const [page, setPage] = useState(1);
  const limitPerPage = 10;

  const {
    data: { data: { result: orders, count } = {} } = {},
    isLoading: isOrderLoading,
    refetch: orderRefetch,
    isFetching: isOrderFetching,
  } = useQuery({
    queryKey: ["orders", orderFilter, orderId, orderDate, phone, page],
    queryFn: () => {
      return request.get(
        `/orders/all?filter=${
          orderFilter === "All" ? "" : orderFilter
        }&date=${orderDate}&orderId=${orderId}&phone=${phone}&limitPerPage=${limitPerPage}&currentPage=${page}`,
        {
          headers: {
            authorization: `bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
    },
  });

  const { data: { data: salesData } = {} } = useQuery({
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
    salesData: salesData?.salesData,
    orderFilter,
    setOrderFilter,
    setOrderId,
    orderDate,
    setOrderDate,
    setPhone,
    page,
    setPage,
    count,
    limitPerPage,
  };

  return <Context.Provider value={values}>{children}</Context.Provider>;
};

export default AdminContext;
