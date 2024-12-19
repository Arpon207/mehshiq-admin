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

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { Ellipsis } from "lucide-react";

const ProductsTable = () => {
  const [products, setProducts] = useState([]);
  const [dialogueOpen, setDialogueOpen] = useState(false);

  const EditDialogue = () => {
    return (
      <Dialog open={dialogueOpen} onOpenChange={!dialogueOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  };

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
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="bg-gray-300 text-black hover:bg-gray-400">
                      <Ellipsis />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-fit flex flex-col"
                    align="end"
                  >
                    <DropdownMenuItem onClick={() => setDialogueOpen(true)}>
                      Edit Product
                    </DropdownMenuItem>
                    <DropdownMenuItem>Delete Product</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <EditDialogue />
    </div>
  );
};

export default ProductsTable;
