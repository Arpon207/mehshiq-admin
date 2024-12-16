import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = () => {
  return (
    <div className="layout bg-slate-800 p-7">
      <div className="grid grid-cols-[15%_85%]">
        <Sidebar />
        <div className="bg-white rounded p-5 min-h-[calc(100vh-60px)]">
          <Outlet />
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition:Bounce
      />
    </div>
  );
};

export default Layout;
