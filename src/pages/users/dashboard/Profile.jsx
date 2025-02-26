import SetPageTitle from "@/components/shared/SetPageTitle";
import EditButton from "@/components/ui/EditButton";
import useAuth from "@/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

const Profile = () => {
  const { user } = useAuth();
  return (
    <>
      <SetPageTitle title={"Profile"} />
      <section className=" bg-white  rounded-lg p-6 font-inter">
        <h1 className="text-xl font-bold font-railway">My Profile</h1>
        {/* profile image  */}
        <div className="mt-6 border-[1.5px] border-dashed rounded-lg p-4 flex justify-between relative">
          <div className="flex flex-col md:flex-row gap-2 md:gap-4">
            <Avatar>
              <AvatarImage
                className="rounded-full w-18"
                src={user?.photoURL}
                alt="@shadcn"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-lg font-bold text-text">
                {user?.displayName}
              </h1>
              <p className="text-md text-gray-600">{user?.email}</p>
              <p className="text-xs text-gray-600">Bangladesh</p>
            </div>
          </div>
          <div className="absolute top-4 right-4">
            <EditButton />
          </div>
        </div>

        <div className="mt-6 border-[1.5px] border-dashed rounded-lg p-4 flex justify-between relative">
          <div className="space-y-2 grow">
            <h1 className="text-lg text-text">Personal Information</h1>
            {/* info container */}
            <div className="flex flex-col gap-4 md:gap-0 md:flex-row justify-between mt-4  md:w-7/12">
              {/* user name */}
              <div className="text-gray-500 text-md">
                <h1 className="text-md font-inter">Full Name</h1>
                <input
                  className="font-medium mt-1"
                  type="text"
                  defaultValue={user?.displayName}
                />
              </div>
              {/* user name */}
              <div className="text-gray-500 text-md">
                <h1 className="text-md font-inter">Email</h1>
                <input
                  className="font-medium mt-1 w-full"
                  type="text"
                  defaultValue={user?.email}
                />
              </div>
            </div>
            {/* info container */}
            <div className="flex flex-col gap-4 md:gap-0 md:flex-row justify-between mt-4  md:w-7/12">
              {/* user name */}
              <div className="text-gray-500 text-md">
                <h1 className="text-md font-inter">Age</h1>
                <input
                  className="font-medium mt-1"
                  type="text"
                  defaultValue={"0"}
                />
              </div>
              {/* user name */}
              <div className="text-gray-500 text-md">
                <h1 className="text-md font-inter">Phone</h1>
                <input
                  className="font-medium mt-1"
                  type="text"
                  defaultValue={"017123438"}
                />
              </div>
            </div>
          </div>
          <div className="absolute top-4 right-4">
            <EditButton />
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
