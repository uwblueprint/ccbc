import { Circle } from "@chakra-ui/react";
import React from "react";

const CircleBadge = ({ count }: { count: number }): React.ReactElement => {
  return (
    <Circle
      bgColor="white"
      size={["42px", "42px", "50px"]}
      position="absolute"
      top="-20px"
      right="-10px"
      zIndex={10}
    >
      <Circle
        color="white"
        fontSize={["0.8rem", "0.8rem", "1rem"]}
        fontWeight="bold"
        bgColor="#110A23"
        borderRadius="100px"
        size={["34px", "34px", "40px"]}
      >
        +{count}
      </Circle>
    </Circle>
  );
};

export default CircleBadge;
