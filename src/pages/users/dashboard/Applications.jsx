import ApplicationTableRow from "@/components/ui/ApplicationTableRow";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Applications = () => {
  return (
    <>
      <section className=" bg-white rounded-lg p-6 font-inter">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold font-railway">My Applications</h1>
          <form>
            <Input
              className="border-none focus:border-none"
              type="search"
              placeholder="search"
            />
          </form>
        </div>

        {/* applications data */}
        <Table className="mt-6">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">#SL</TableHead>
              <TableHead>University</TableHead>
              <TableHead>Feedback</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Degree</TableHead>
              <TableHead>Fees</TableHead>
              <TableHead>Charge</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <ApplicationTableRow />
            <ApplicationTableRow />
            <ApplicationTableRow />
            <ApplicationTableRow />
          </TableBody>
        </Table>
      </section>
    </>
  );
};

export default Applications;
