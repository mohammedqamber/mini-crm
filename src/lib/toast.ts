import { toast } from "sonner";

type ToastVariant = "success" | "error" | "info" | "warning";

interface ShowToastOptions {
  variant: ToastVariant;
  message: string;
}

export function showToast({ variant, message }: ShowToastOptions) {
  switch (variant) {
    case "success":
      toast.success(message);
      break;

    case "error":
      toast.error(message);
      break;

    case "warning":
      toast.warning(message);
      break;

    case "info":
    default:
      toast.info(message);
      break;
  }
}
