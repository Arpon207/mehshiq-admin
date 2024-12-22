import { useState } from "react";
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
import { ChevronsUpDown, Settings2 } from "lucide-react";
import ProductsTable from "../../components/Products/ProductsTable";
import OrdersTable from "../../components/Orders/OrdersTable";

const Orders = () => {
  const [position, setPosition] = useState("outOfStock");

  const [showDateBar, setShowDateBar] = useState(true);
  const [showStatusUpdateDateBar, setShowStatusUpdateDateBar] = useState(false);
  const [showTotal, setShowTotal] = useState(false);
  return (
    <div className="products">
      {/* header starts */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Input
            placeholder="Search by Order Id..."
            className="grid w-full max-w-sm items-center gap-1.5"
          />
          <Input
            placeholder="Search by number..."
            className="grid w-full max-w-sm items-center gap-1.5"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-48">
                Sort
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
              <DropdownMenuLabel>Sort By</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={position}
                onValueChange={setPosition}
              >
                <DropdownMenuRadioItem value="pending">
                  Pending
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="shipped">
                  Shipped
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="delivered">
                  Delivered
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="canceled">
                  Canceled
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
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
                checked={showDateBar}
                onCheckedChange={setShowDateBar}
              >
                Date
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={showStatusUpdateDateBar}
                onCheckedChange={setShowStatusUpdateDateBar}
              >
                Status Update Date
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={showTotal}
                onCheckedChange={setShowTotal}
              >
                Total
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <OrdersTable
        showDateBar={showDateBar}
        showStatusUpdateDateBar={showStatusUpdateDateBar}
        showTotal={showTotal}
      />
    </div>
  );
};

export default Orders;