import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";

const Layout = () => {
  return (
    <div className="layout bg-slate-800 p-7">
      <div className="grid grid-cols-[15%_85%]">
        <Sidebar />
        <div className="bg-white rounded p-5 min-h-[calc(100vh-60px)]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
