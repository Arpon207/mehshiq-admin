import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

const orders = [
  {
    product: "Prodotti per il tuo cane...",
    image: "/products/01.png",
    date: "20 Nov 2023",
    delivery: "20 Nov 2023",
  },
  {
    product: "Wholesome Pride...",
    image: "/products/02.png",
    date: "20 Nov 2023",
    delivery: "20 Nov 2023",
  },
  {
    product: "Benefut Baked Delights...",
    image: "/products/03.png",
    date: "20 Nov 2023",
    delivery: "20 Nov 2023",
  },
];

export function OrdersList() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium">Orders</CardTitle>
        <button className="hover:opacity-75">⋮</button>
      </CardHeader>
      <CardContent className="space-y-4">
        {orders.map((order) => (
          <div key={order.product} className="flex items-center gap-4">
            <div className="relative h-12 w-12">
              <Image
                src={order.image || "/placeholder.svg"}
                alt={order.product}
                fill
                className="rounded-lg object-cover"
              />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{order.product}</p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{order.date}</span>
                <span>•</span>
                <span>{order.delivery}</span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
