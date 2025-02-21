import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "@/hooks/useAxiosPublic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const [clientSecret, setClientSecret] = useState(null);
  const [transactionId, setTransactionId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const card = elements.getElement(CardElement);
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

  const [formData, setFormData] = useState({
    phone: "",
    photo: "",
    address: "",
    gender: "Male",
    degree: "Diploma",
    sscResult: "",
    hscResult: "",
    studyGap: "None",
    university: "Harvard University",
    category: "Full Scholarship",
    subject: "Computer Science",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleApplicationSumbim = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold">
            Checkout
          </CardTitle>
        </CardHeader>
        <CardContent>
          <h2 className="text-lg font-medium text-gray-700 text-center mb-4">
            Total Payable Amount:{" "}
            <span className="text-green-600 font-bold">$12</span>
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="p-4 border rounded-md bg-white shadow-sm">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#424770",
                      fontFamily: "Arial, sans-serif",
                      "::placeholder": { color: "#aab7c4" },
                    },
                    invalid: { color: "#9e2146" },
                  },
                }}
              />
            </div>
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg"
              type="submit"
              disabled={!stripe}
            >
              Pay Now
            </Button>
          </form>
          {transactionId && (
            <p className="text-center mt-4 text-green-600 font-medium">
              Transaction ID: {transactionId}
            </p>
          )}
        </CardContent>
      </Card>

      {/* form after payment */}
      <Card className=" mx-auto p-6 mt-10 w-6/12 shadow-lg">
        <CardContent>
          <h2 className="text-2xl font-bold mb-4 text-center">
            Scholarship Application
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              name="phone"
              placeholder="Phone Number"
              onChange={handleChange}
              required
            />
            <Input
              type="text"
              name="photo"
              placeholder="Photo URL"
              onChange={handleChange}
              required
            />
            <Input
              type="text"
              name="address"
              placeholder="Address (Village, District, Country)"
              onChange={handleChange}
              required
            />

            <Select onChange={handleChange}>
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

            <Select onChange={handleChange}>
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
              type="text"
              name="sscResult"
              placeholder="SSC Result"
              onChange={handleChange}
              required
            />
            <Input
              type="text"
              name="hscResult"
              placeholder="HSC Result"
              onChange={handleChange}
              required
            />

            <Select onChange={handleChange}>
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
              type="text"
              name="university"
              value={formData.university}
              readOnly
            />
            <Input
              type="text"
              name="category"
              value={formData.category}
              readOnly
            />
            <Input
              type="text"
              name="subject"
              value={formData.subject}
              readOnly
            />

            <Button type="submit" className="w-full bg-blue-600 text-white">
              Submit Application
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
