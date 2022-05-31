import "react-toastify/dist/ReactToastify.css";

import React, { MouseEventHandler } from "react";
import { toast, ToastContainer } from "react-toastify";

type ToastProps = {
  message: string;
  type: "error" | "warning" | "success" | "info" | "default";
};

const GlobalToast = ({ message, type }: ToastProps) => {
  let notify: MouseEventHandler<HTMLButtonElement> | undefined = undefined;
  console.log(`LETS GO`);
  if (type === "error") {
    notify = () => toast.error(message);
  } else if (type === "warning") {
    notify = () => toast.warning(message);
  } else if (type === "success") {
    notify = () => toast.success(message);
  } else if (type === "info") {
    notify = () => toast.info(message);
  } else if (type === "default") {
    notify = () => toast(message);
  }
  return (
    <div>
      <button type="button" onClick={notify}>
        Notify !
      </button>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default GlobalToast;
