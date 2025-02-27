import { useEffect, useState } from "react";
import useAxiosSecure from "./useAxiosSecure";

const useStripeInstant = (amount) => {
  const axiosSecure = useAxiosSecure();
  const [clientSecret, setClientSecret] = useState(null);

  useEffect(() => {
    if (!amount) {
      return;
    }

    axiosSecure
      .post("create-payment-intent", { amount: amount })
      .then((res) => {
        if (!res.data.clientSecret) {
          return;
        }
        setClientSecret(res.data.clientSecret);
      });
  }, [amount, axiosSecure]);
  return clientSecret;
};

export default useStripeInstant;
