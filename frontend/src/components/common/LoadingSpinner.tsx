import { Center, Spinner } from "@chakra-ui/react";
import React from "react";

/**
 * This component is the loading spinner that appears when data is being loaded onto the page
 */

type LoadingSpinnerProps = {
  h?: string;
  mt?: string;
  mb?: string;
};
const LoadingSpinner = ({
  h,
  mt,
  mb,
}: LoadingSpinnerProps): React.ReactElement => {
  return (
    <Center mt={mt || "10%"} mb={mb || "10%"} h={h || "0%"}>
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
