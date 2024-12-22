import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard";
import AddProduct from "./Pages/AddProducts/AddProduct";
import Categories from "./Pages/Categories/Categories";
import Page from "./app/dashboard/page";
import Products from "./Pages/Products/Products";
import Orders from "./Pages/Orders/Orders";
import OrderPage from "./Pages/Orders/OrderPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Page />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/products/add",
        element: <AddProduct />,
      },
      {
        path: "/orders",
        element: <Orders />,
      },
      {
        path: "/orders/:id",
        element: <OrderPage />,
      },
      {
        path: "/categories",
        element: <Categories />,
      },
    ],
  },
]);
