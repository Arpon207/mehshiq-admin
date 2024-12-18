import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { request } from "../../axios";

const ProductsTable = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const { data } = await request.get("/products/all");
    setProducts(data);
  };

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <div className="productsTable mt-5">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Image</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product, index) => (
            <TableRow key={index}>
              <TableCell>
                <img
                  src={product?.variants[0].image.url}
                  alt=""
                  className="h-14 w-14 object-contain"
                />
              </TableCell>
              <TableCell className="font-medium">{product?.title}</TableCell>
              <TableCell>{product?.category}</TableCell>
              <TableCell>{product?.price}</TableCell>
              <TableCell>20</TableCell>
              <TableCell className="text-right">action</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductsTable;
