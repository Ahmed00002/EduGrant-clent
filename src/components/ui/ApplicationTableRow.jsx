import { Pen, X } from "lucide-react";
import { TableCell, TableRow } from "./table";

const ApplicationTableRow = () => {
  return (
    <TableRow className="py-2">
      <TableCell>1</TableCell>
      <TableCell>Harvard University</TableCell>
      <TableCell></TableCell>
      <TableCell>Anatomy</TableCell>
      <TableCell>PHD</TableCell>
      <TableCell>$1200</TableCell>
      <TableCell>$200</TableCell>
      <TableCell className="border-l">
        <div className="px-[5px] py-[2px] rounded-full border-[1px] border-green-500 bg-green-100 text-green-500 text-center capitalize text-sm inline-block">
          <p className="text-xs">Approved</p>
        </div>
      </TableCell>
      <TableCell className="flex gap-2 items-center border-l">
        <button
          className="uppercase text-xs bg-green-500 px-[4px] py-[2px] rounded-sm text-white cursor-pointer"
          size={"sm"}
        >
          Details
        </button>
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
          <X size={10} /> Cancel
        </button>
      </TableCell>
    </TableRow>
  );
};

export default ApplicationTableRow;
