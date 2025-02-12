import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@/components/ui/pagination";
import { Button } from "../ui/button";

const OrderPagination = ({ totalPages, setPage, page }) => {
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };
  return (
    <div className="pagination">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <Button
              disabled={page === 1}
              onClick={() => handlePageChange(page - 1)}
            >
              Previous
            </Button>
          </PaginationItem>

          {page > 2 && (
            <>
              <PaginationItem>
                <Button onClick={() => handlePageChange(1)}>1</Button>
              </PaginationItem>
              {page > 3 && <PaginationEllipsis />}
            </>
          )}

          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter((p) => p === page || Math.abs(p - page) <= 1)
            .map((p) => (
              <PaginationItem key={p}>
                <Button
                  variant={p === page ? "default" : "outline"}
                  onClick={() => handlePageChange(p)}
                >
                  {p}
                </Button>
              </PaginationItem>
            ))}

          {page < totalPages - 1 && (
            <>
              {page < totalPages - 2 && <PaginationEllipsis />}
              <PaginationItem>
                <Button
                  variant={page === totalPages ? "default" : "outline"}
                  onClick={() => handlePageChange(totalPages)}
                >
                  {totalPages}
                </Button>
              </PaginationItem>
            </>
          )}

          <PaginationItem>
            <Button
              disabled={page === totalPages}
              onClick={() => handlePageChange(page + 1)}
            >
              Next
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default OrderPagination;
