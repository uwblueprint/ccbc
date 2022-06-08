import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";

type ToastStatus = "info" | "warning" | "success" | "error" | undefined;

type ToastProps = {
  status: ToastStatus;
  title: string;
  message: string;
};

/**
 * Display a chakraUI toast for a notification
 * @param status from the predetermined list of ToastStatus
 * @param title of the toast
 * @param message to be displayed in the body of the toast
 * @returns the new state and displays a toast on the bottom right of the screen
 */
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
        //these settings are global
        title,
        description: message,
        status,
        duration: 3000,
        position: "bottom-right",
        isClosable: true,
      });
    }
  }, [state, toast]);

  return addToast;
};

export default useToasts;
