import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard";
import AddProduct from "./Pages/AddProducts/AddProduct";
import Categories from "./Pages/Categories/Categories";
import Page from "./app/dashboard/page";
import Products from "./Pages/Products/Products";
import Orders from "./Pages/Orders/Orders";
import OrderPage from "./Pages/Orders/OrderPage";
import EditProduct from "./Pages/EditProduct/EditProduct";
import VideoAdd from "./Pages/VideoAdd/VideoAdd";
import Login from "./Pages/Auth/Login";
import RedirectAuthenticatedUser from "./ProtectedRoutes/RedirectAuthenticatedUser";
import ProtectedRoute from "./ProtectedRoutes/ProtectedRoute";
import Signup from "./Pages/Auth/Signup";
import CreateOrder from "./Pages/CreateOrder/CreateOrder";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Page />
      </ProtectedRoute>
    ),
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
        path: "/products/edit/:id",
        element: <EditProduct />,
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
        path: "/orders/create",
        element: <CreateOrder />,
      },
      {
        path: "/categories",
        element: <Categories />,
      },
      {
        path: "/video",
        element: <VideoAdd />,
      },
    ],
  },
  {
    path: "/login",
    element: (
      <RedirectAuthenticatedUser>
        <Login />
      </RedirectAuthenticatedUser>
    ),
  },
  {
    path: "/signup",
    element: (
      <RedirectAuthenticatedUser>
        <Signup />
      </RedirectAuthenticatedUser>
    ),
  },
]);
