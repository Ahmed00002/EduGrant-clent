import { Input } from "@/components/ui/input";
import ReviewsRow from "@/components/ui/ReviewsTableRow";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Reviews = () => {
  return (
    <>
      <section className=" bg-white rounded-lg p-6 font-inter">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold font-railway">My Reviews</h1>
          <form>
            <Input
              className="border-none focus:border-none"
              type="search"
              placeholder="search"
            />
          </form>
        </div>

        {/**
         * university name,
Review comments,
Review date.
Delete button,
Edit Button,
User can delete his/her review by clicking the delete button.
User can edit his/her review by clicking the edit button.

         */}

        {/* applications data */}
        <Table className="mt-6">
          <TableHeader>
            <TableRow>
              <TableHead className="font-thin">Scholarship Name</TableHead>
              <TableHead className="font-thin">University</TableHead>
              <TableHead className="font-thin">Comments</TableHead>
              <TableHead className="font-thin">Date</TableHead>
              <TableHead className="font-thin">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <ReviewsRow />
            <ReviewsRow />
            <ReviewsRow />
          </TableBody>
        </Table>
      </section>
    </>
  );
};

export default Reviews;
