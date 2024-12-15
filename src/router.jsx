import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout/Layout";
import Dashboard from "./Pages/Dashboard/Dashboard";
import AddProduct from "./Pages/AddProducts/AddProduct";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/products",
        element: <p>Products</p>,
      },
      {
        path: "/products/add",
        element: <AddProduct />,
      },
      {
        path: "/orders",
        element: <p>Orders</p>,
      },
    ],
  },
]);
