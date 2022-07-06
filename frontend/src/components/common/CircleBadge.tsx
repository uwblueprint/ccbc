import { Circle } from "@chakra-ui/react";
import React from "react";

const CircleBadge = ({ count }: { count: number }): React.ReactElement => {
  return (
    <Circle
      bgColor="white"
      size={["50px"]}
      position="absolute"
      top="-20px"
      right="-10px"
    >
      <Circle
        color="white"
        fontSize="1rem"
        fontWeight="bold"
        bgColor="#110A23"
        borderRadius="100px"
        size={["40px"]}
      >
        +{count}
      </Circle>
    </Circle>
  );
};

export default CircleBadge;
