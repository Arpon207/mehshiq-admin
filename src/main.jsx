import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router.jsx";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AdminContext from "./Providers/AdminContext.jsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AdminContext>
        <RouterProvider router={router} />
      </AdminContext>
    </QueryClientProvider>
  </StrictMode>
);
