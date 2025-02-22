import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const steps = ["Cart", "Shipping", "Payment", "Review"];

export default function Stepper() {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center text-white font-bold",
                index + 1 <= currentStep ? "bg-blue-600" : "bg-gray-300"
              )}
            >
              {index + 1}
            </div>
            <span
              className={cn(
                "mt-2 text-sm",
                index + 1 <= currentStep
                  ? "text-blue-600 font-semibold"
                  : "text-gray-500"
              )}
            >
              {step}
            </span>
          </div>
        ))}
      </div>

      <div className="flex justify-between">
        <Button
          onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 1))}
          disabled={currentStep === 1}
        >
          Back
        </Button>
        <Button
          onClick={() =>
            setCurrentStep((prev) => Math.min(prev + 1, steps.length))
          }
          disabled={currentStep === steps.length}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
