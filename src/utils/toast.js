import { toast } from "react-hot-toast";

export const successToast = ({ message = "" }) =>
  toast.success(message, {
    position: "top-center",
  });

export const errorToast = ({ message = "" }) =>
  toast.error(message, {
    position: "top-center",
  });
