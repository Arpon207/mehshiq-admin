import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
} from "@/components/ui/table";

const Loading = () => {
  return (
    <div className="loading min-h-[calc(100vh-200px)]">
      <Table>
        <TableHeader>
          <TableRow>
            {[1, 2, 3, 4, 5, 6, 7].map((number, index) => (
              <TableHead key={index}>
                <Skeleton className="h-5 w-full rounded" />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]?.map((number, index) => (
            <TableRow key={index} className="cursor-pointer">
              {[1, 2, 3, 4, 5, 6, 7].map((number, index) => (
                <TableCell key={index}>
                  <Skeleton className="h-5 w-full rounded-full" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Loading;
