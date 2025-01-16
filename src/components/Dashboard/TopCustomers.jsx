import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import image from "../../assets/eco-bag.png";

const customers = [
  {
    name: "Devon Lane",
    purchases: "73 Purchases",
    amount: "$8.99",
  },
  {
    name: "Jenny Wilson",
    purchases: "23 Purchases",
    amount: "$6.48",
  },
  {
    name: "Eleanor Pena",
    purchases: "73 Purchases",
    amount: "$14.81",
  },
  {
    name: "Albert Flores",
    purchases: "15 Purchases",
    amount: "$5.22",
  },
  {
    name: "Ronald Richards",
    purchases: "73 Purchases",
    amount: "$17.84",
  },
];

export function TopCustomers() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base font-medium">Top Customers</CardTitle>
        <span className="text-sm text-muted-foreground hover:underline cursor-pointer">
          View all
        </span>
      </CardHeader>
      <CardContent className="space-y-6">
        {customers.map((customer) => (
          <div
            key={customer.name}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={image} alt={customer.name} />
                <AvatarFallback>{customer.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{customer.name}</p>
                <p className="text-xs text-muted-foreground">
                  {customer.purchases}
                </p>
              </div>
            </div>
            <p className="text-sm font-medium">{customer.amount}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
