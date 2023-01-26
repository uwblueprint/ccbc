import {
  Center,
  FormControl,
  Grid,
  GridItem,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";

import UsersAPIClient from "../../APIClients/UsersAPIClient";
import CCBCLogo from "../../images/ccbc-logo.png";
import LoginGraphic from "../../images/Login-graphic.png";
import authUtils from "../../utils/AuthUtils";
import EmailForm from "./EmailForm";

const CreatorSignup = (): React.ReactElement => {
  const [isEmailInvalid, setIsEmailInvalid] = useState(false);
  const onSendEmailClick = async (email: string) => {
    if (!authUtils.validateEmail(email)) {
      setIsEmailInvalid(true);
    } else {
      await UsersAPIClient.register(email);
    }
  };
  return (
    <Grid
      overflow="hidden"
      w="100vw"
      h="100vh"
      templateColumns="repeat(2, 1fr)"
    >
      <GridItem bg="#F6F4F2">
        <Stack>
          <Image
            boxSize="50px"
            m="5vh 5vw"
            src={CCBCLogo}
            alt="ccbc-logo"
            objectFit="cover"
          />
          <Center p="5vh">
            <Image src={LoginGraphic} />
          </Center>
        </Stack>
      </GridItem>
      <GridItem>
        <Stack justify="center" p="25vh 10vw">
          <Text textStyle="heading" align="center">
            Create an Account
          </Text>
          <Text textStyle="body" color="gray.700">
            Please enter an email for a verification code to be sent
          </Text>
          <FormControl mt="1rem">
            <EmailForm
              onSendEmailClick={onSendEmailClick}
              isEmailInvalid={isEmailInvalid}
              setIsEmailInvalid={setIsEmailInvalid}
            />
          </FormControl>
        </Stack>
      </GridItem>
    </Grid>
  );
};

export default CreatorSignup;
