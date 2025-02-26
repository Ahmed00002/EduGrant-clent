import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PageHeader from "@/components/PageHeader";
import useAuth from "@/hooks/useAuth";
import { useForm } from "react-hook-form";
import { Camera } from "lucide-react";
import axios from "axios";
import useSingleLoader from "@/hooks/useSingleLoader";
import useCustomToast from "@/hooks/useCustomToast";
import useStripeInstant from "@/hooks/useStripeInstant";
import { HashLoader } from "react-spinners";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useNavigate } from "react-router";
import useUserData from "@/hooks/useUserData";

export default function CheckoutForm() {
  // react hook form
  const { register, handleSubmit } = useForm();

  // custom sooner toast
  const customToast = useCustomToast();

  // load scholarship data
  const scholarship = useSingleLoader();
  const totalFee =
    parseInt(scholarship.application_fees) +
    parseInt(scholarship.service_charge);

  const { register: registerForm2, handleSubmit: handleSubmitForm2 } =
    useForm();

  // user datas
  const { user } = useAuth();
  const [uploadedImg, setUploadedImg] = useState(
    "https://placehold.co/100x120.png?text=UPLOAD"
  );

  const { userData } = useUserData();

  // stripe
  const stripe = useStripe();
  const elements = useElements();
  // const [clientSecret, setClientSecret] = useState(null);
  const clientSecret = useStripeInstant(totalFee);
  const [transactionId, setTransactionId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);

  // // axios
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const handleCheckout = async () => {
    setLoading(true);
    const card = elements.getElement(CardElement);
    if (!stripe || !elements || !card) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setLoading(false);
      customToast("Opps!", error.message);
      return;
    }

    const { error: confirmError, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card },
      });

    if (confirmError) {
      setLoading(false);
      customToast("Opps!", "Payment Failed. Please try again.");
    } else {
      setTransactionId(paymentIntent.id);
      setLoading(false);

      customToast(
        "Congratulations!",
        `You have successfully made payment for scholarship in ${scholarship.university_name}`
      );
    }
  };

  const [select, setSelect] = useState({
    applicantGender: "",
    applicantDegree: "",
    applicantStudyGap: "",
    applicantPhoto: "",
  });

  // get file data and generate local link
  const handleFileInput = async (e) => {
    const localUrl = URL.createObjectURL(e.target.files[0]);
    setUploadedImg(localUrl);
    handleSelect("applicantPhoto", e.target.files[0]);
  };

  // handle select inputs
  const handleSelect = (field, value) => {
    setSelect((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleApplicationSumbit = async (data) => {
    setLoading(true);

    const finalData = {
      ...data,
      applicantGender: select.applicantGender,
      applicantDegree: select.applicantDegree,
      applicantStudyGap: select.applicantStudyGap,
      appliedScholarshipId: scholarship._id,
      applicantEmail: user.email,
      applicantName: user.displayName,
      applicantId: userData._id,
    };

    if (!select.applicantPhoto) {
      customToast("Warning!", "Please upload a passport size picture");
      setLoading(false);
      return;
    }

    if (data.applicantHscResult > 5 || data.applicantSscResult > 5) {
      setLoading(false);
      customToast("Warning!", "SSC/HSC result cant be grater then 5");
      return;
    }

    const imgFile = {
      image: select.applicantPhoto,
    };
    const res = await axios.post(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgbb}`,
      imgFile,
      {
        headers: {
          "content-type": "multipart/form-data",
        },
      }
    );

    if (res.data.data.display_url) {
      setLoading(false);
      finalData.applicantPhoto = res.data.data.display_url;

      // upload data to server
      axiosSecure.post("/applications", finalData).then((res) => {
        if (res.data.insertedId) {
          navigate("/dashboard/user/applications");
          customToast(
            "Congratulations",
            "Your application has been submitted and will reviewed soon"
          );
        }

        if (res.data.isExist) {
          customToast(
            "Hey?",
            "You have already applied for this scholarship. Wait for the feedback form university"
          );
        }
      });
    }
  };

  return (
    <>
      <PageHeader
        title={"Checkout"}
        subTitle={"Secure & Fast Checkout – Complete Your Payment Safely!"}
      />
      <div className="flex flex-col justify-center items-center    center -translate-y-15">
        {!transactionId ? (
          // checkout form
          <div className="max-w-6xl mx-auto p-6 shadow-lg bg-white rounded-lg flex gap-8 text-text relative">
            {/* Payment Details */}
            <div className="w-1/2">
              <h2 className="text-2xl font-bold mb-4">Payment Details</h2>
              <form
                onSubmit={handleSubmit(handleCheckout)}
                className="space-y-4"
              >
                <input
                  className="w-full p-2 border rounded"
                  type="email"
                  placeholder="Email"
                  defaultValue={user?.email}
                  {...register("email", { required: true })}
                  required
                />
                <input
                  className="w-full p-2 border rounded"
                  type="text"
                  placeholder="Cardholder Name"
                  defaultValue={user?.displayName}
                  {...register("cardHolderName", { required: true })}
                  required
                />
                <div className="border p-3 rounded">
                  <CardElement
                    options={{ hidePostalCode: true, disableLink: true }}
                  />
                </div>
                <button
                  type="submit"
                  disabled={processing}
                  className="w-full p-2 bg-black text-white rounded cursor-pointer"
                >
                  {processing ? "Processing..." : "Pay Now"}
                </button>
              </form>
            </div>

            {/* Order Summary */}
            <div className="w-1/2 bg-gray-100 p-4 rounded-lg">
              <h2 className="text-lg font-bold">Scholarship</h2>
              <div className="flex justify-between my-2">
                <div>
                  <p className="font-semibold">
                    {scholarship.scholarship_name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {scholarship.university_name}
                  </p>
                </div>
                <p className="font-semibold">
                  $ {scholarship.application_fees}
                </p>
              </div>

              <div className="flex justify-between my-2">
                <div>
                  <p className="text-sm text-gray-500">Service Charge</p>
                </div>
                <p className="font-semibold">$ {scholarship.service_charge}</p>
              </div>

              <hr className="my-2" />
              <div className="flex justify-between">
                <p>Subtotal</p>
                <p>
                  ${" "}
                  {parseInt(scholarship.application_fees) +
                    parseInt(scholarship.service_charge)}
                </p>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between text-lg font-bold">
                <p>Total</p>
                <p>
                  ${" "}
                  {parseInt(scholarship.application_fees) +
                    parseInt(scholarship.service_charge)}
                </p>
              </div>
            </div>

            {/* loader */}
            {loading && (
              <div className="absolute top-0 left-0 w-full h-full flex flex-col gap-4 justify-center items-center backdrop-blur-xs">
                <HashLoader color="#004aad" size={40} />
                <p className="text-lg">Payment Proceccing</p>
              </div>
            )}
          </div>
        ) : (
          // {/* form after payment */}
          <Card className=" mx-auto p-6 w-7/12 shadow-lg relative">
            <CardContent>
              <div className="flex justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-4 text-left">
                    Scholarship Application
                  </h2>
                  <p>Fill This Form carefully to submit your application</p>
                </div>
                <label
                  htmlFor="fileInput"
                  className="relative group cursor-pointer"
                >
                  <img
                    src={uploadedImg}
                    alt="user passport size pic"
                    width="100"
                    height="120"
                    className="object-cover content-center h-[120px] w-[100px]"
                  />
                  <div className="flex items-center justify-center py-1 gap-2 text-xs font-medium text-gray-400 bg-black absolute bottom-0 left-0 w-full opacity-50">
                    <Camera size={15} /> Upload
                    {/* image upload */}
                    <input
                      {...register("applicantPhoto")}
                      id="fileInput"
                      type="file"
                      className="hidden"
                      onChange={handleFileInput}
                    />
                  </div>
                </label>
              </div>

              <form
                onSubmit={handleSubmitForm2(handleApplicationSumbit)}
                className="space-y-4 mt-6"
              >
                <Input
                  {...registerForm2("applicantNumber")}
                  className="shadow-none "
                  type="number"
                  name="applicantNumber"
                  placeholder="mobile"
                  required
                />
                <Input
                  {...registerForm2("applicantAddress")}
                  className="shadow-none "
                  type="text"
                  name="applicantAddress"
                  placeholder="Address (Village, District, Country)"
                  required
                />

                <Select
                  onValueChange={(value) =>
                    handleSelect("applicantGender", value)
                  }
                  className="shadow-none "
                  name="applicantGender"
                >
                  <SelectTrigger className="">
                    <SelectValue placeholder="Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Gender</SelectLabel>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Select
                  onValueChange={(value) =>
                    handleSelect("applicantDegree", value)
                  }
                  className="shadow-none "
                >
                  <SelectTrigger className="">
                    <SelectValue placeholder="Degree" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Degree</SelectLabel>
                      <SelectItem value="Diploma">Diploma</SelectItem>
                      <SelectItem value="Bachelor">Bachelor</SelectItem>
                      <SelectItem value="Masters">Masters</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Input
                  {...registerForm2("applicantSscResult")}
                  step="0.01"
                  className="shadow-none "
                  type="number"
                  max={5}
                  name="applicantSscResult"
                  placeholder="SSC Result in GPA"
                  required
                />

                <Input
                  {...registerForm2("applicantHscResult")}
                  step="0.01"
                  max={5}
                  className="shadow-none "
                  type="number"
                  name="applicantHscResult"
                  placeholder="HSC Result in GPA"
                  required
                />

                <Select
                  onValueChange={(value) =>
                    handleSelect("applicantStudyGap", value)
                  }
                  className="shadow-none "
                >
                  <SelectTrigger className="">
                    <SelectValue placeholder="Study Gap" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Study Gap</SelectLabel>
                      <SelectItem value="None">None</SelectItem>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Input
                  {...registerForm2("scholarshipUniversity")}
                  className="shadow-none "
                  type="text"
                  name="university"
                  value={scholarship.university_name}
                  readOnly
                />
                <Input
                  {...registerForm2("scholarshipCategory")}
                  className="shadow-none "
                  type="text"
                  name="category"
                  value={scholarship.scholarship_category}
                  readOnly
                />
                <Input
                  {...registerForm2("scholarshipSub")}
                  className="shadow-none "
                  type="text"
                  name="subject"
                  value={scholarship.subject_category}
                  readOnly
                />
                <Button type="submit" className="w-full bg-blue-600 text-white">
                  Submit Application
                </Button>
              </form>
            </CardContent>

            {/* loader */}
            {loading && (
              <div className="absolute top-0 left-0 w-full h-full flex flex-col gap-4 justify-center items-center backdrop-blur-xs">
                <HashLoader color="#004aad" size={40} />
                <p className="text-lg">Submitting Application</p>
              </div>
            )}
          </Card>
        )}
      </div>
    </>
  );
}
