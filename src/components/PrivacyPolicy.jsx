import { Card, CardContent } from "@/components/ui/card";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import SetPageTitle from "./shared/SetPageTitle";

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Privacy Policy - EduGrant";
  }, []);

  return (
    <div className="center mx-auto p-6">
      <SetPageTitle title={"Privacy Policy"} />
      <div>
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>
          <p className="mb-4">
            Welcome to EduGrant. Your privacy is important to us. This Privacy
            Policy explains how we collect, use, and protect your information.
          </p>
          <h2 className="text-xl font-semibold mt-4 mb-2">
            Information We Collect
          </h2>
          <p>
            We may collect personal information such as your name, email, and
            payment details when you apply for scholarships.
          </p>
          <h2 className="text-xl font-semibold mt-4 mb-2">
            How We Use Your Information
          </h2>
          <p>
            We use your information to process scholarship applications, provide
            support, and improve our services.
          </p>
          <h2 className="text-xl font-semibold mt-4 mb-2">Data Security</h2>
          <p>
            We take reasonable measures to protect your data from unauthorized
            access and misuse.
          </p>
          <h2 className="text-xl font-semibold mt-4 mb-2">Contact Us</h2>
          <p>
            If you have any questions about our Privacy Policy, please contact
            us at <strong>support@edugrant.com</strong>.
          </p>
          <button
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            onClick={() => navigate("/")}
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
