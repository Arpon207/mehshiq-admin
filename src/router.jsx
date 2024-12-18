import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard";
import AddProduct from "./Pages/AddProducts/AddProduct";
import Categories from "./Pages/Categories/Categories";
import Page from "./app/dashboard/page";
import Products from "./Pages/Products/Products";

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
        element: <p>Orders</p>,
      },
      {
        path: "/categories",
        element: <Categories />,
      },
    ],
  },
]);
