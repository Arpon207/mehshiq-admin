import { EllipsisVertical, Pencil, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useContext, useState } from "react";
import EditVariantDialogue from "./EditVariantDialogue";

import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import VariantsDeleteDialouge from "./VariantsDeleteDialouge";
import { ProductContext } from "../../Pages/EditProduct/EditProduct";

const ColorVariantsEdit = () => {
  const { product } = useContext(ProductContext);

  const [dialogueOpen, setDialogueOpen] = useState({
    value: false,
    colorName: "",
  });
  const [deletedialogueOpen, setDeleteDialogueOpen] = useState({
    value: false,
    colorName: "",
    public_id: "",
  });
  const { id } = useParams();

  return (
    <div className="colorVariantsTable">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Color Name</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead className={"w-[50px]"}>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {product.variants?.map(({ image, colorName, quantity }, i) => (
            <TableRow key={i}>
              <TableCell>
                <img
                  src={image?.url}
                  alt=""
                  className="h-14 w-14 object-contain border border-red-100"
                />
              </TableCell>
              <TableCell>{colorName}</TableCell>
              <TableCell>{quantity}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="text-center h-7 w-7 flex items-center justify-center bg-gray-300 p-1 rounded"
                    >
                      {" "}
                      <EllipsisVertical />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-26">
                    <DropdownMenuGroup>
                      <DropdownMenuItem
                        onClick={() =>
                          setDialogueOpen({
                            value: true,
                            colorName: colorName,
                          })
                        }
                      >
                        Edit
                        <DropdownMenuShortcut>
                          <Pencil />
                        </DropdownMenuShortcut>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          setDeleteDialogueOpen({
                            value: true,
                            colorName: colorName,
                            public_id: image.public_id,
                          })
                        }
                      >
                        Delete
                        <DropdownMenuShortcut>
                          <Trash2 />
                        </DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <EditVariantDialogue
        setDialogueOpen={setDialogueOpen}
        dialogueOpen={dialogueOpen}
        id={id}
      />
      <VariantsDeleteDialouge
        setDeleteDialogueOpen={setDeleteDialogueOpen}
        deletedialogueOpen={deletedialogueOpen}
        id={id}
      />
    </div>
  );
};

export default ColorVariantsEdit;
