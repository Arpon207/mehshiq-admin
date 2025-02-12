import { useContext, useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import {
  CalendarIcon,
  ChevronsUpDown,
  RotateCw,
  Settings2,
} from "lucide-react";
import OrdersTable from "../../components/Orders/OrdersTable";
import { Context } from "../../Providers/AdminContext";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import moment from "moment";
import OrderPagination from "../../components/Orders/Pagination";

const Orders = () => {
  const [showStatusUpdateDateBar, setShowStatusUpdateDateBar] = useState(true);

  const {
    orders,
    isOrderLoading,
    orderRefetch,
    isOrderFetching,
    orderFilter,
    setOrderFilter,
    setOrderId,
    orderDate,
    setOrderDate,
    setPhone,
    setPage,
    page,
    count,
    limitPerPage,
  } = useContext(Context);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleRefresh = () => {
    setOrderId("");
    setOrderDate("");
    setOrderFilter("All");
    setPhone("");
    setPage(1);
    orderRefetch();
  };

  const handleDateSelect = (selectedDate) => {
    setOrderDate(selectedDate);
    setIsCalendarOpen(false);
    setPage(1);
  };

  const handleFilter = (value) => {
    setOrderFilter(value);
    setPage(1);
  };

  useEffect(() => {
    orderRefetch();
  }, []);

  const totalPages = Math.ceil(count / limitPerPage) || 1;

  return (
    <div className="products">
      {/* header starts */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Input
            placeholder="Search by Order Id..."
            className="grid w-full max-w-sm items-center gap-1.5"
            onChange={(e) => setOrderId(e.target.value)}
          />
          <Input
            placeholder="Search by number..."
            className="grid w-full max-w-sm items-center gap-1.5"
            onChange={(e) => setPhone(e.target.value)}
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-48">
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
              <DropdownMenuLabel>Filter By</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={orderFilter}
                onValueChange={handleFilter}
              >
                <DropdownMenuRadioItem value="All">All</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Pending">
                  Pending
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Shipped">
                  Shipped
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Delivered">
                  Delivered
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Canceled">
                  Canceled
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Returned">
                  Returned
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={`w-[280px] justify-start text-left font-normal ${
                  !orderDate ? "text-muted-foreground" : ""
                }`}
                onClick={() => setIsCalendarOpen(true)}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {orderDate ? (
                  moment(orderDate).format("MMMM D, YYYY")
                ) : (
                  <span>Filter By Date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={orderDate}
                onSelect={handleDateSelect}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Button
            variant="outline"
            className="w-48"
            onClick={() => handleRefresh()}
          >
            <RotateCw className={`${isOrderFetching && "animate-spin"}`} />{" "}
            Refresh
          </Button>
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-48">
                <Settings2 /> View <ChevronsUpDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
              <DropdownMenuLabel>Appearance</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuCheckboxItem
                checked={showStatusUpdateDateBar}
                onCheckedChange={setShowStatusUpdateDateBar}
              >
                Status Update Date
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <OrdersTable
        showStatusUpdateDateBar={showStatusUpdateDateBar}
        isLoading={isOrderLoading}
        orders={orders}
        isFetching={isOrderFetching}
      />
      <OrderPagination totalPages={totalPages} page={page} setPage={setPage} />
    </div>
  );
};

export default Orders;
