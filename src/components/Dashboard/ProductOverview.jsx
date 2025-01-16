import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const products = [
  {
    name: "Dog Food, Chicken & Chicken Liver Recipe",
    id: "#70668",
    price: "$450",
    sale: "$28,672.36",
    revenue: "$928.41",
    status: "Available",
  },
  {
    name: "Grain Free Dry Dog Food | Rachael Ray Nutrish®",
    id: "#70668",
    price: "$450",
    sale: "$28,672.36",
    revenue: "$928.41",
    status: "Not Available",
  },
  {
    name: "Weruva Pumpkin Patch Up! Pumpkin With Ginger",
    id: "#70668",
    price: "$450",
    sale: "$28,672.36",
    revenue: "$928.41",
    status: "Available",
  },
  {
    name: "Milk-Bone Mini's Flavor Snacks Dog Treats, 15",
    id: "#70668",
    price: "$450",
    sale: "$28,672.36",
    revenue: "$928.41",
    status: "Available",
  },
  {
    name: "Weruva Pumpkin Patch Up! Dog & Cat Food",
    id: "#70668",
    price: "$450",
    sale: "$28,672.36",
    revenue: "$928.41",
    status: "Not Available",
  },
];

export function ProductOverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-medium">
          Product overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>ID</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Sale</TableHead>
              <TableHead>Revenue</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.name}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.sale}</TableCell>
                <TableCell>{product.revenue}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      product.status === "Available" ? "success" : "destructive"
                    }
                  >
                    {product.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
