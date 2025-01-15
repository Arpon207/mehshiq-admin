import {
  BadgeDollarSign,
  DollarSign,
  PackageSearch,
  ShoppingBag,
} from "lucide-react";

const Dashboard = () => {
  return (
    <div className="px-7 py-3">
      <div className="dashboardTop grid grid-cols-4 gap-5 [&>div]:shadow-md [&>div]:rounded [&>div]:p-10 [&>div]:border [&>div]:border-[rgba(0,0,0,0.1)] ">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm">Total Sales</p>
            <h3 className="text-xl font-medium">BDT 40000</h3>
          </div>
          <BadgeDollarSign />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm">Total Revenue</p>
            <h3 className="text-xl font-medium">BDT 40000</h3>
          </div>
          <DollarSign />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm">Total Products</p>
            <h3 className="text-xl font-medium">60</h3>
          </div>
          <PackageSearch />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm">Products Sold</p>
            <h3 className="text-xl font-medium">40</h3>
          </div>
          <ShoppingBag />
        </div>
      </div>
      <div>
        <div className="revenueVsCost">
          
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
