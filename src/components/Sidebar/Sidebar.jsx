import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar flex flex-col justify-between min-h-[calc(100vh-60px)] text-white">
      <div className="top">
        <h3 className="text-2xl mb-10">Mehshiq</h3>
        <div className="[&_div]:flex [&_div]:flex-col [&_div]:gap-2 [&_div]:mb-2 [&_a]:ml-2 [&_p]:text-sm">
          <div>
            <p>Main</p>
            <NavLink>Dashboard</NavLink>
          </div>
          <div>
            <p>Products</p>
            <NavLink>Products</NavLink>
            <NavLink to={"/products/add"}>Add Product</NavLink>
            <NavLink to={"/categories"}>Categories</NavLink>
          </div>
          <div>
            <p>Orders</p>
            <NavLink>Orders</NavLink>
            <NavLink>Add Order</NavLink>
            <NavLink>Invoices</NavLink>
          </div>
          <div>
            <p>Users</p>
            <NavLink>Users</NavLink>
          </div>
        </div>
      </div>
      <div className="bottom">Admin</div>
    </div>
  );
};

export default Sidebar;
