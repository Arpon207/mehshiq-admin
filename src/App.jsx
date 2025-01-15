import { RouterProvider, useLocation } from "react-router-dom";
import { router } from "./router";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";
import Loader from "./components/Loader/Loader";

const App = () => {
  const { checkAuth, user, isAuthenticated, isLoading, isCheckingAuth } =
    useAuthStore();
  console.log({ user, isAuthenticated, isLoading, isCheckingAuth });
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isLoading || isCheckingAuth) {
    return <Loader />;
  }
  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
