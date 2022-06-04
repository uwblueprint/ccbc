import { useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

type ToastStatus = "error" | "warning" | "success" | "info" | undefined;

type ToastProps = {
  message: string;
  status: ToastStatus;
};

const UseToastHook = () => {
  const [state, setState] = useState<ToastProps | null>();
  const toast = useToast();

  const addToast = (message: string, status: ToastStatus) => {
    const newToast: ToastProps = { message, status };
    setState(newToast);
  };

  useEffect(() => {
    if (state) {
      const { message, status } = state;

      toast({
        title: status,
        description: message,
        status,
        duration: 9000,
        position: "top",
        isClosable: true,
      });
    }
  }, [state, toast]);

  return addToast;
};

export default UseToastHook;
