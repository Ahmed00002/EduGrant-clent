import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "@/hooks/useAxiosPublic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

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

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
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
    </div>
  );
}
