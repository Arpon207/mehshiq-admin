import { Label } from "@/components/ui/label";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";
import { request } from "../../axios";

const EditVariantDialogue = ({ dialogueOpen, setDialogueOpen, id }) => {
  const updateQuantity = async (e) => {
    e.preventDefault();
    const { data } = await request.put(
      `/products/updateQuantity?id=${id}&color=${dialogueOpen.colorName}&quantity=${e.target.quantity.value}`
    );
    if (data) {
      setDialogueOpen({ value: false, colorName: "" });
    }
  };

  return (
    <Dialog open={dialogueOpen.value} onOpenChange={setDialogueOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Variant</DialogTitle>
          <DialogDescription>
            Make changes to your Product Variant here. Click save when you're
            done.
          </DialogDescription>
        </DialogHeader>
        <form action="" onSubmit={updateQuantity}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Quantity
              </Label>
              <Input
                id="quantity"
                name="quantity"
                type="number"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditVariantDialogue;
