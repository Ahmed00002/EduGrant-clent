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
              <TableHead className="font-thin">#SL</TableHead>
              <TableHead className="font-thin">University</TableHead>
              <TableHead className="font-thin">Feedback</TableHead>
              <TableHead className="font-thin">Subject</TableHead>
              <TableHead className="font-thin">Degree</TableHead>
              <TableHead className="font-thin">Fees</TableHead>
              <TableHead className="font-thin">Charge</TableHead>
              <TableHead className="font-thin">Status</TableHead>
              <TableHead className="font-thin">Actions</TableHead>
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
