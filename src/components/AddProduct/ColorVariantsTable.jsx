import { Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

const ColorVariantsTable = ({ variants, setVariants }) => {
  const handleVariantDelete = (index) => {
    const newArray = [
      ...variants.slice(0, index),
      ...variants.slice(index + 1),
    ];
    setVariants(newArray);
  };

  return (
    <div className="colorVariantsTable">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead className={"w-[50px]"}>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {variants?.map(({ image, quantity }, i) => (
            <TableRow key={i}>
              <TableCell>
                <img
                  src={image}
                  alt=""
                  className="h-14 w-14 object-contain border border-red-100"
                />
              </TableCell>
              <TableCell>{quantity}</TableCell>
              <TableCell>
                <button
                  className="text-center h-7 w-7 text-red-600 flex items-center justify-center bg-gray-300 p-1 rounded"
                  onClick={() => handleVariantDelete(i)}
                >
                  <Trash2 />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ColorVariantsTable;
