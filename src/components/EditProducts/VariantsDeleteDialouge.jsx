import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { request } from "../../axios";
import { useContext } from "react";
import { ProductContext } from "../../Pages/EditProduct/EditProduct";

export function VariantsDeleteDialouge({
  setDeleteDialogueOpen,
  deletedialogueOpen,
  id,
}) {
  const { refetch } = useContext(ProductContext);

  const handleDeleteVariant = async () => {
    const { data } = await request.put(
      `/products/deleteVariant?id=${id}&color=${deletedialogueOpen.colorName}&public_id=${deletedialogueOpen.public_id}`
    );
    if (data) {
      setDeleteDialogueOpen({ colorName: "", value: false, public_id: "" });
      refetch();
      toast("Variant deleted successfully");
    }
  };

  return (
    <AlertDialog
      open={deletedialogueOpen.value}
      onOpenChange={setDeleteDialogueOpen}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            variant of this product.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteVariant}
            className="bg-red-500"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default VariantsDeleteDialouge;
