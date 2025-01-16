import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import image from "../../assets/handbag (1).png";

const products = [
  {
    name: "Patimax Fragrance Long...",
    items: "100 Items",
    discount: "-15%",
    price: "$27.00",
    image: image,
    flag: "🇪🇸",
  },
  {
    name: "Nulo MedalSeries Adult Cat...",
    items: "100 Items",
    discount: "-15%",
    price: "$27.00",
    image: image,
    flag: "🇮🇳",
  },
  // Add more products...
];

export function TopProducts() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium">Top Products</CardTitle>
        <span className="text-sm text-muted-foreground hover:underline cursor-pointer">
          View all
        </span>
      </CardHeader>
      <CardContent className="space-y-4">
        {products.map((product) => (
          <div key={product.name} className="flex items-center gap-4">
            <div className="relative h-12 w-12">
              <img
                src={product.image}
                alt={product.name}
                fill
                className="rounded-lg object-cover"
              />
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">{product.name}</p>
                <span className="text-xl">{product.flag}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{product.items}</span>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">Coupon Code</Badge>
                  <span className="font-medium text-red-500">
                    {product.discount}
                  </span>
                  <span>{product.price}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
