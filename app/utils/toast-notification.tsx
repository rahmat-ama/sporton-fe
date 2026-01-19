import { Bounce, toast, ToastPosition } from "react-toastify";

const defaultOption = {
  position: "bottom-right" as ToastPosition,
  autoClose: 1500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
  transition: Bounce,
};

export const toastError = (message: string) => {
  toast.error(message, defaultOption);
};

export const toastSuccess = (message: string) => {
  toast.success(message, defaultOption);
};
