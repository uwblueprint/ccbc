import { Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

import logo from "../../assets/ccbc.png";
import background from "../../assets/NotFoundBack.png";
import character from "../../assets/sitting.svg";

const NotFound = (): React.ReactElement => {
  return (
    <Flex
      direction="column"
      h="100vh"
      w="100vw"
      justify="center"
      align="center"
      bgImage={background}
      bgPosition="center"
      bgRepeat="no-repeat"
      backgroundAttachment="scroll"
      overflowY="scroll"
      padding="50px 30px"
    >
      <Link to="/">
        <Image
          src={logo}
          alt="CCBC Logo"
          boxSize="48px"
          borderRadius="full"
          position="absolute"
          top="40px"
          left="50px"
          boxShadow="base"
        />
      </Link>

      <Text textStyle="heading" fontSize="42px" fontWeight="extrabold">
        Oops! Something went wrong!
      </Text>

      <Text textStyle="body" marginTop="10px" marginBottom="70px" zIndex="1">
        Please refresh the page and try again.
      </Text>

      <Image
        src={character}
        alt="character sitting"
        boxSize="350px"
        zIndex="1"
      />
    </Flex>
  );
};

export default NotFound;
