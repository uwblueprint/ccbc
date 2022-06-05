import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";

type ToastStatus = "error" | "warning" | "success" | "info" | undefined;

type ToastProps = {
  title: string;
  message: string;
  status: ToastStatus;
};

const ToastHook = (): ((
  title: string,
  message: string,
  status: ToastStatus,
) => void) => {
  const [state, setState] = useState<ToastProps | null>();
  const toast = useToast();

  const addToast = (title: string, message: string, status: ToastStatus) => {
    const newToast: ToastProps = { title, message, status };
    setState(newToast);
  };

  useEffect(() => {
    if (state) {
      const { title, message, status } = state;
      toast({
        title,
        description: message,
        status,
        duration: 5000,
        position: "bottom-right",
        isClosable: true,
      });
    }
  }, [state, toast]);

  return addToast;
};

export default ToastHook;
