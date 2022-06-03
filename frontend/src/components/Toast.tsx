import { useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

type ToastProps = {
  message: string;
  status: "error" | "warning" | "success" | "info" | undefined;
  prevState: null;
};

const UseToastHook = () => {
  const [state, setState] = useState<ToastProps | null>();
  const toast = useToast();

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

  return <div>{(state?.message, state?.status)}</div>;
};

export default UseToastHook;
