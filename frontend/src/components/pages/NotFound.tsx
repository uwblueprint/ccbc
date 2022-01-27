import { Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

import logo from "../../assets/ccbc.png";
import ellipse from "../../assets/ellipse.svg";
import ellipse2 from "../../assets/ellipse2.svg";
import background from "../../assets/NotFoundBack.png";
import polygon from "../../assets/polygon.svg";
import character from "../../assets/sitting.svg";
import star from "../../assets/star.svg";

const NotFound = (): React.ReactElement => {
  return (
    <Flex
      direction="column"
      h="100vh"
      w="100vw"
      justify="center"
      align="center"
      // bgColor="#F6F4F2"
      bg={background}
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
      <Text
        textStyle="heading"
        fontSize="42px"
        fontWeight="bold"
        marginTop="40px"
        zIndex="1"
      >
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
      {/* <Image
        src={star}
        alt="orange star"
        boxSize="270px"
        bottom="-40px"
        left="60px"
        position="fixed"
        zIndex="0"
      /> */}
      {/* 
      <Image
        src={ellipse}
        alt="red half circle"
        boxSize="230px"
        position="fixed"
        zIndex="0"
        right="-10px"
        bottom="60px"
      />
      <Image
        src={ellipse2}
        alt="yellow half circle"
        boxSize="200px"
        position="fixed"
        zIndex="0"
        right="-10px"
        top="80px"
      />
      <Image
        src={polygon}
        alt="light blue triangle"
        boxSize="200px"
        position="fixed"
        zIndex="0"
        left="260px"
        top="120px"
      /> */}
    </Flex>
  );
};

export default NotFound;
