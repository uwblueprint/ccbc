import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

import background from "../../../assets/NotFoundBack.png";
import { CREATOR_PROFILE_SETUP } from "../../../constants/Routes";

const FinishProfileLanding = (): React.ReactElement => {
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
      backgroundSize="cover"
      backgroundAttachment="scroll"
      overflowY="scroll"
      padding="50px 30px"
      textAlign="center"
    >
      <Text textStyle="heading" fontSize="42px" fontWeight="extrabold">
        Let&apos;s create your profile!
      </Text>
      <Text textStyle="h2" marginY="24px">
        This is where bookers can get to know you and your work better.
      </Text>

      <Text
        textStyle="body"
        marginTop="10px"
        marginBottom="102px"
        zIndex="1"
        maxWidth="50%"
      >
        The following process will take you through the set up for your profile
        which includes information regarding your basic bio, presentation
        offerings, some of pieces of your work, and general availability.
      </Text>
      <Link to={CREATOR_PROFILE_SETUP}>
        <Button
          w="159px"
          h="48px"
          leftIcon={<ArrowForwardIcon />}
          colorScheme="teal"
        >
          Get Started
        </Button>
      </Link>
    </Flex>
  );
};

export default FinishProfileLanding;
