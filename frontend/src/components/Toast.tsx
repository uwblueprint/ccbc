import "react-toastify/dist/ReactToastify.css";

import React from "react";
import { toast, ToastContainer } from "react-toastify";

type ToastProps = {
  message: string;
  type: "error" | "warning" | "success" | "info" | "default";
};

// const GlobalToast = ({ message, type }: ToastProps) => {
// console.log(`LETS GO`);
// if (type === "error") {
//   toast.error(message);
// } else if (type === "warning") {
//   toast.warning(message);
// } else if (type === "success") {
//   toast.success(message);
// } else if (type === "info") {
//   toast.info(message);
// } else if (type === "default") {
//   toast(message);
// }
// <ToastContainer />;
// return notify;
// };

const GlobalToast = ({ message, type }: ToastProps) => {
  const notify = () => {
    console.log("hi");
    toast("Default!", { position: toast.POSITION.TOP_LEFT });
    toast.success("Success!", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 8000,
    });
    toast.info("Info!", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: false,
    });
    toast.warn("info", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
    toast.error("Error!", { position: toast.POSITION.BOTTOM_CENTER });
    toast("Wow so easy !", { position: toast.POSITION.BOTTOM_RIGHT });
  };
  return (
    <div>
      <button type="button" onClick={notify}>
        Notify !
      </button>
      <ToastContainer />;
    </div>
  );
};

export default GlobalToast;
