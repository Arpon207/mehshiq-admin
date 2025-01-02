import { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { toast } from "sonner";

export const Context = createContext();

const socket = io("http://localhost:5000");

const AdminContext = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Listen for new order events
    socket.on("newOrder", (order) => {
      toast(`New Order Received: ${order.orderId} x ${order.customerName}`);
      const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
      const updatedOrders = [...existingOrders, order._id];
      localStorage.setItem("orders", JSON.stringify(updatedOrders));
      setNotifications(updatedOrders);
    });

    // Clean up the socket connection
    return () => {
      socket.off("newOrder");
    };
  }, []);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setNotifications(storedOrders);
  }, []);
  return (
    <Context.Provider value={{ notifications }}>{children}</Context.Provider>
  );
};

export default AdminContext;
