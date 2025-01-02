import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner";

export function VariantsDeleteDialouge({
  setDeleteDialogueOpen,
  deletedialogueOpen,
  id,
}) {
  const handleDeleteVariant = async () => {
    const { data } = await axios.put(
      `http://localhost:5000/api/products/deleteVariant?id=${id}&color=${deletedialogueOpen.colorName}&public_id=${deletedialogueOpen.public_id}`
    );
    if (data) {
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
