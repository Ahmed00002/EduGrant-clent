import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useUserLoader from "@/hooks/useUserLoader";
import { ChevronDown, Trash } from "lucide-react";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useCustomToast from "@/hooks/useCustomToast";
import Swal from "sweetalert2";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import SetPageTitle from "@/components/shared/SetPageTitle";

const roles = ["All", "user", "moderator", "admin"];

const AllUsers = () => {
  const [sortBy, setSortBy] = useState("All");
  const { users, refetch, isLoading } = useUserLoader(sortBy);
  const axiosSecure = useAxiosSecure();
  const customToast = useCustomToast();

  const handleUpdateRole = (role, id) => {
    Swal.fire({
      title: "Alert",
      text: "Are you sure to update this user role?",
      // icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#004aad",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Update",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`users/${id}`, { role: role })
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              customToast("Successful..!", `User role updated to ${role}`);
              refetch();
            }
          })
          .catch(() => {
            customToast(
              "Opps!",
              `Something went wrong while updating user role to ${role}`
            );
          });
      }
    });
  };

  const handleDeleteUser = (id) => {
    Swal.fire({
      title: "Alert",
      text: "Are you sure to delete this user?",
      // icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#004aad",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`users/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            customToast("Successful..!", `User deleted successfully`);
            refetch();
          }
        });
      }
    });
  };

  return (
    <>
      <SetPageTitle title={"Users"} />
      <section className=" bg-white rounded-lg p-6 font-inter">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold font-railway">All Users</h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                {sortBy} <ChevronDown />{" "}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {roles.map((role) => (
                <DropdownMenuItem onClick={() => setSortBy(role)} key={role}>
                  {role}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.userName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">
                        {user.role} <ChevronDown />{" "}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {roles.map((role) => (
                        <DropdownMenuItem
                          onClick={() => handleUpdateRole(role, user._id)}
                          key={role}
                        >
                          {role}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleDeleteUser(user._id)}
                    variant="destructive"
                  >
                    <Trash />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {isLoading && (
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
                </TableRow>
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
                </TableRow>
              </>
            )}
          </TableBody>
        </Table>

        {users.length === 0 && (
          <p className="text-center mt-6 text-gray-400 font-medium font-inter">
            No User Found
          </p>
        )}
      </section>
    </>
  );
};

export default AllUsers;
