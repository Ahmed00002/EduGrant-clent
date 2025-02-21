import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51QsyY7Rp6trY62j7UKoqmX0LwkyiHxXEyAusCdEOffIkkE5p97nGJ0DXFiyvOZSFfzu3hlyl3i8p5iyRaLqCJVsU00bE2ZaFYs"
);
const Payment = () => {
  return (
    <div>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};

export default Payment;
