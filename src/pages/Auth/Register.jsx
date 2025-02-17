import { toast } from "react-toastify";
import SetPageTitle from "../../components/shared/SetPageTitle";
import Swal from "sweetalert2";

const Register = () => {
  const check = () => {
    toast.success("working");
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire("Saved!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };
  return (
    <div>
      <SetPageTitle title={"Register"} />
      Register
      <button onClick={check}>Click me</button>
    </div>
  );
};

export default Register;
