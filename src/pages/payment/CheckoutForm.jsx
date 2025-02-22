import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
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

export default function CheckoutForm() {
  // react hook form
  const { register, handleSubmit } = useForm();

  const { register: registerForm2, handleSubmit: handleSubmitForm2 } =
    useForm();

  // user datas
  const { user } = useAuth();
  const [uploadedImg, setUploadedImg] = useState(
    "https://placehold.co/100x120.png?text=UPLOAD"
  );

  // stripe
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState(null);
  const [transactionId, setTransactionId] = useState(true);
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);

  // axios
  const axiosSecure = useAxiosPublic();

  const handleCheckout = async (data) => {
    // e.preventDefault();
    const card = elements.getElement(CardElement);
    console.log(data, card);
    if (!stripe || !elements || !card) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    const { error: confirmError, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card },
      });

    if (confirmError) {
      toast.error("Payment Failed. Please try again.");
    } else {
      setTransactionId(paymentIntent.id);
      toast.success("Payment Successful!");
    }
  };

  const [select, setSelect] = useState({
    applicantGender: "",
    applicantDegree: "",
    applicantStudyGap: "",
    applicantPhoto: "",
  });

  const handleFileInput = async (e) => {
    const localUrl = URL.createObjectURL(e.target.files[0]);
    setUploadedImg(localUrl);
    handleSelect("applicantPhoto", e.target.files[0]);

    const imgFile = {
      image: e.target.files[0],
    };
    const res = await axios.post(
      `https://api.imgbb.com/1/upload?key=16ad715e21266e431725fd0d0253ddfc`,
      imgFile,
      {
        headers: {
          "content-type": "multipart/form-data",
        },
      }
    );
    const data = res.data;
    console.log(data);
  };

  const handleSelect = (field, value) => {
    // e.preventDefault();
    // console.log(e.target);
    // setSelect({ ...select, [e.target.name]: e.target.value });
    setSelect((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  console.log(select);

  const handleApplicationSumbit = (data) => {
    console.log("Form Submitted:", data);
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
          <div className="max-w-6xl mx-auto p-6 shadow-lg bg-white rounded-lg flex gap-8 text-text">
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
                  className="w-full p-2 bg-black text-white rounded"
                >
                  {processing ? "Processing..." : "Pay Now"}
                </button>
              </form>
            </div>

            {/* Order Summary */}
            <div className="w-1/2 bg-gray-100 p-4 rounded-lg">
              <h2 className="text-lg font-bold">Checkout Summary</h2>
              <div className="flex justify-between my-2">
                <div>
                  <p className="font-semibold">Scholarship Name</p>
                  <p className="text-sm text-gray-500">University Name</p>
                </div>
                <p className="font-semibold">$ 7000</p>
              </div>

              <hr className="my-2" />
              <div className="flex justify-between">
                <p>Subtotal</p>
                <p>$ 13000</p>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between text-lg font-bold">
                <p>Total</p>
                <p>$ 13200</p>
              </div>
            </div>
          </div>
        ) : (
          // {/* form after payment */}
          <Card className=" mx-auto p-6 w-7/12 shadow-lg">
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
                  className="shadow-none "
                  type="text"
                  name="applicantSscResult"
                  placeholder="SSC Result"
                  required
                />
                <Input
                  {...registerForm2("applicantHscResult")}
                  className="shadow-none "
                  type="text"
                  name="applicantHscResult"
                  placeholder="HSC Result"
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
                  value={"harvard university"}
                  readOnly
                />
                <Input
                  {...registerForm2("scholarshipCategory")}
                  className="shadow-none "
                  type="text"
                  name="category"
                  value={"RObotix"}
                  readOnly
                />
                <Input
                  {...registerForm2("scholarshipSub")}
                  className="shadow-none "
                  type="text"
                  name="subject"
                  value={"formData.subject"}
                  readOnly
                />
                <Button type="submit" className="w-full bg-blue-600 text-white">
                  Submit Application
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
}
