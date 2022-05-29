import { Center, Spinner } from "@chakra-ui/react";
import React from "react";

const LoadingSpinner = (): React.ReactElement => {
  return (
    <Center mt="21%">
      <Spinner
        boxSize="84px"
        color="cyan.500"
        emptyColor="gray.200"
        thickness="6px"
      />
    </Center>
  );
};

export default LoadingSpinner;
