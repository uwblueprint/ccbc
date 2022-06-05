import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";

type ToastStatus = "info" | "warning" | "success" | "error" | undefined;

type ToastProps = {
  status: ToastStatus;
  title: string;
  message: string;
};

const useToasts = (): ((
  status: ToastStatus,
  title: string,
  message: string,
) => void) => {
  const [state, setState] = useState<ToastProps | null>();
  const toast = useToast();

  const addToast = (status: ToastStatus, title: string, message: string) => {
    const newToast: ToastProps = { status, title, message };
    setState(newToast);
  };

  useEffect(() => {
    if (state) {
      const { status, title, message } = state;
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

export default useToasts;
