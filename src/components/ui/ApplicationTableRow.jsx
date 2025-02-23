import { Pen, X } from "lucide-react";
import { TableCell, TableRow } from "./table";
import PropTypes from "prop-types";

const ApplicationTableRow = ({ application }) => {
  console.log(application);
  const {
    // _id,
    // applicantNumber,
    // applicantAddress,
    // applicantSscResult,
    // applicantHscResult,
    // scholarshipUniversity,
    // scholarshipCategory,
    // scholarshipSub,
    // applicantGender,
    applicantDegree,
    applicationStatus,
    // applicantStudyGap,
    // applicantPhoto,
    // applied_ScholarshipId,
    // applicant_email,
    // applicant_Id,
    // appliedData,
  } = application;

  const {
    application_fees = "2000",
    service_charge = "200",
    subject_name = "Bangla",
    university_name = "Pabna University",
    _id,
  } = application.scholarshipDetails;

  // handle cancel
  const hadleCancelApplication = () => {
    alert("clicked");
  };
  return (
    <TableRow className="py-2">
      <TableCell>1</TableCell>
      <TableCell>{university_name}</TableCell>
      <TableCell></TableCell>
      <TableCell>{subject_name}</TableCell>
      <TableCell>{applicantDegree}</TableCell>
      <TableCell>${application_fees}</TableCell>
      <TableCell>${service_charge}</TableCell>
      <TableCell className="border-l">
        <div
          className={`px-[5px] py-[2px] rounded-full border-[1px] ${
            applicationStatus === "pending" ||
            applicationStatus === "processing"
              ? "border-yellow-600 bg-yellow-100 text-yellow-600"
              : applicationStatus === "completed"
              ? "border-green-600 bg-green-100 text-green-600"
              : "border-red-600 bg-red-100 text-red-600"
          }  text-center capitalize text-sm inline-block`}
        >
          <p className="text-xs capitalize">{applicationStatus}</p>
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
          onClick={hadleCancelApplication}
          disabled={
            applicationStatus === "rejected" ||
            applicationStatus === "completed"
          }
          className={`uppercase text-xs bg-red-500 px-[4px] py-[2px] rounded-sm text-white  flex  items-center gap-1 ${
            applicationStatus === "rejected"
              ? "cursor-not-allowed"
              : "cursor-pointer"
          }`}
          size={"sm"}
        >
          <X size={10} /> Cancel
        </button>
      </TableCell>
    </TableRow>
  );
};

export default ApplicationTableRow;

ApplicationTableRow.propTypes = {
  application: PropTypes.object,
};
