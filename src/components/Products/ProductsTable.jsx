import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { request } from "../../axios";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { Ellipsis } from "lucide-react";
import Loading from "./ProductsLoading";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ProductsTable = ({ products, isLoading, isFetching, refetch }) => {
  const [deleteDialogue, setDeleteDialogue] = useState({
    id: "",
    isOpen: false,
    variants: [],
  });
  const navigate = useNavigate();

  function ProductDeleteDialogue() {
    const handleDelete = async () => {
      if (deleteDialogue.id) {
        const { data: response } = await request.delete(
          `/products/delete?id=${deleteDialogue.id}`,
          { data: deleteDialogue.variants }
        );
        if (response?.message) {
          refetch();
          toast("Product Deleted Successfully");
          setDeleteDialogue({ id: "", isOpen: false });
        }
      }
    };
    return (
      <AlertDialog
        open={deleteDialogue.isOpen}
        onOpenChange={setDeleteDialogue}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you absolutely sure you want to delete this product?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              product from server.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button onClick={() => handleDelete()} className="bg-red-500">
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  if (isLoading || isFetching) {
    return <Loading />;
  }

  return (
    <div className="productsTable mt-5">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Image</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Total Quantity</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products?.map((product, index) => (
            <TableRow key={index}>
              <TableCell>
                <img
                  src={product?.variants[0]?.image?.url}
                  alt=""
                  className="h-14 w-14 object-contain"
                />
              </TableCell>
              <TableCell className="font-medium">{product?.title}</TableCell>
              <TableCell>{product?.category}</TableCell>
              <TableCell>{product?.price}</TableCell>
              <TableCell
                className={`${
                  product?.variants.find((variant) => variant.quantity === 0) &&
                  "text-yellow-600"
                }`}
              >
                {product?.variants.reduce(
                  (n, { quantity }) => n + parseInt(quantity),
                  0
                )}
              </TableCell>
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
                    <DropdownMenuItem
                      onClick={() => navigate(`/products/edit/${product._id}`)}
                    >
                      Edit Product
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        setDeleteDialogue({
                          id: product?._id,
                          isOpen: true,
                          variants: product?.variants,
                        })
                      }
                    >
                      Delete Product
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ProductDeleteDialogue />
    </div>
  );
};

export default ProductsTable;
