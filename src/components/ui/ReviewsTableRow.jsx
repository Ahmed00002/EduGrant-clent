import { Delete, Pen } from "lucide-react";
import { TableCell, TableRow } from "./table";

const ReviewsRow = () => {
  return (
    <TableRow className="py-2">
      <TableCell>Free and fast</TableCell>
      <TableCell>Harvard University</TableCell>
      <TableCell>hello not bad</TableCell>
      <TableCell>12 Feb 2025</TableCell>

      <TableCell className="flex gap-2 items-center border-l">
        <button
          className="uppercase text-xs bg-orange-500 px-[4px] py-[2px] rounded-sm text-white cursor-pointer flex  items-center gap-1"
          size={"sm"}
        >
          <Pen size={10} /> Edit
        </button>
        <button
          className="uppercase text-xs bg-red-500 px-[4px] py-[2px] rounded-sm text-white cursor-pointer flex  items-center gap-1"
          size={"sm"}
        >
          <Delete size={10} /> Delete
        </button>
      </TableCell>
    </TableRow>
  );
};

export default ReviewsRow;
