import { toast } from "sonner";

const useCustomToast = () => {
  const fireToast = (title, description) => {
    toast(title, {
      description: description,
      action: {
        label: "Close",
      },
    });
  };

  return fireToast;
};

export default useCustomToast;
