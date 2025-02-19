"use client";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import PropTypes from "prop-types";

export function CustomToast(title, description) {
  return (
    <Button
      variant="outline"
      onClick={() =>
        toast(
          { title },
          {
            description: { description },
            action: {
              label: "Undo",
              onClick: () => console.log("Undo"),
            },
          }
        )
      }
    >
      Show Toast
    </Button>
  );
}

CustomToast.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};
