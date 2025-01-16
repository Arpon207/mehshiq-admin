import { ProductOverview } from "../../components/Dashboard/ProductOverview";
import { RecentOrders } from "../../components/Dashboard/RecentOrders";
import { RevenueChart } from "../../components/Dashboard/RevenueChart";
import { SalesByCategory } from "../../components/Dashboard/SalesByCategory";
import { TopCountries } from "../../components/Dashboard/TopCountries";
import { TopCustomers } from "../../components/Dashboard/TopCustomers";
import { TopProducts } from "../../components/Dashboard/TopProducts";
import { WeeklyMetrics } from "../../components/Dashboard/WeeklyMetrics";
import { TotalOrders } from "../../components/Dashboard/TotalOrders";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen flex-col gap-6 p-8">
      <div className="col-span-1 md:col-span-3">
        <WeeklyMetrics />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <SalesByCategory />
        <RecentOrders />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <TopCustomers />
        <TopCountries />
        <TopProducts />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <ProductOverview />
        <RevenueChart />
      </div>
    </div>
  );
};

export default Dashboard;
