import { TableCell, TableRow } from "./table";
import { Skeleton } from "./skeleton";

const TableSkeleton = () => {
  return (
    <>
      <TableRow>
        <TableCell>
          <Skeleton className={"w-full py-4"} />
        </TableCell>
        <TableCell>
          <Skeleton className={"w-full py-4"} />
        </TableCell>
        <TableCell>
          <Skeleton className={"w-full py-4"} />
        </TableCell>
        <TableCell>
          <Skeleton className={"w-full py-4"} />
        </TableCell>
        <TableCell>
          <Skeleton className={"w-full py-4"} />
        </TableCell>
        <TableCell>
          <Skeleton className={"w-full py-4"} />
        </TableCell>
      </TableRow>
    </>
  );
};

export default TableSkeleton;
